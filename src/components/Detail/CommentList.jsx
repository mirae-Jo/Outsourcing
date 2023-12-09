import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteCommentStore } from 'shared/firebase';
import { deleteComment } from 'shared/redux/modules/commentSlice';
import defaultUserImg from 'assets/imgs/profilenormal.jpg';
import styled from 'styled-components';


export default function CommentList() {
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
            //setGetComments(comments);
        }
    }

    useEffect(() => {
        //댓글이 추가될 때 바로 추가
        setGetComments(comments);
        console.log('comments가 추가되거나 삭제 되고 있음', comments);
    }, [comments])



    return (
        <ScCommentListLayout>
            <h1>Comment</h1>
            {filterComments?.map(c => {
                const { id, uid, displayName, comment, photoURL, createdAt } = c;
                return (
                    <li key={id}>
                        <div>
                            <p>{comment}</p>
                            <ScUserInfo>
                                <p>{displayName}</p>
                                <img src={photoURL ? photoURL : defaultUserImg} alt='avatar' />
                            </ScUserInfo>
                        </div>
                        <time>{new Date(createdAt).toLocaleString()}</time>
                        {(user.uid && uid) && user?.uid === uid && <button>수정하기</button>}
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
const ScUserInfo = styled.div`
    display:flex;
    align-items: center;
    gap:0.5rem;
`

