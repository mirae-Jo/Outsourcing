import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteCommentStore, updateCommentStore } from 'shared/firebase';
import { deleteComment, updateComment } from 'shared/redux/modules/commentSlice';
import styled from 'styled-components';


export default function CommentList() {
    const [editComment, setEditComment] = useState();
    const [text, setText] = useState('');
    const { comments } = useSelector((state) => state.comments);
    console.log(comments);
    const { user } = useSelector((state) => state.user_auth);
    const [getComments, setGetComments] = useState(comments);
    const { mountainName } = useParams();
    const dispatch = useDispatch();
    const filterComments = getComments.filter(comment => comment.mountainName === mountainName);
    const handleDelete = (id) => {
        if (window.confirm('삭제하시겠습니까?')) {
            deleteCommentStore(id);
            dispatch(deleteComment(id));
        }
    }

    const handleEdit = (id) => {
        setEditComment(id);
    }

    const handleUpdate = (id) => {
        if (window.confirm('수정하시겠습니까?')) {
            updateCommentStore(id, text);
            dispatch(updateComment({ id, comment: text }));
            //이제 더이상 수정 상태가 아님
            setEditComment(null);
        }
    }

    useEffect(() => {
        //댓글이 추가 또는 삭제될 때 마다 업데이트
        setGetComments(comments);
    }, [comments])



    return (
        <ScCommentListLayout>
            <h1>Comment</h1>
            {filterComments?.map(c => {
                const { id, uid, displayName, comment, photoURL, createdAt } = c;
                return (
                    <li key={id}>
                        <div>
                            {editComment === id ? (<ScEditComment defaultValue={comment} onChange={(e) => setText(e.target.value)} />) : (<p>{comment}</p>)}
                            <ScUserInfo>
                                <p>{displayName}</p>
                                <img src={photoURL} alt='avatar' />
                            </ScUserInfo>
                        </div>
                        <time>{new Date(createdAt).toLocaleString()}</time>
                        {(user.uid && uid) && user?.uid === uid && editComment !== id && <button onClick={() => handleEdit(id)}>수정하기</button>}
                        {editComment === id && <button disabled={text === comment || !text} onClick={() => handleUpdate(id)}>수정 완료</button>}
                        {editComment === id && <button onClick={() => setEditComment(null)}>취소하기</button>}
                        {(user.uid && uid) && user?.uid === uid && <button onClick={() => handleDelete(id)}>삭제하기</button>}
                    </li>
                );
            }
            )}

        </ScCommentListLayout>
    );
}

const ScCommentListLayout = styled.ul`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:0.5rem;

    h1{
        padding:1rem;
    }

    li{
        width:450px;
        padding:1rem 1.5rem;
        background-color: var(--color-background);
        border-radius: 1rem;

        &:hover{
            cursor:pointer;
            transform: scale(1.1);
        }
    }
    div{
        display:flex;
        justify-content:space-between;
    }
    img{
        width:2rem;
        height: 2rem;
        border-radius: 50%;
    }
  
`
const ScEditComment = styled.textarea`
    padding:0.3rem 0.5rem;
`;

const ScUserInfo = styled.div`
    display:flex;
    align-items: center;
    gap:0.5rem;
`

