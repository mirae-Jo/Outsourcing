import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {addCommentStore} from 'shared/firebase';
import {addComment} from 'shared/redux/modules/commentSlice';
import {styled} from 'styled-components';
import {v4 as uuidv4} from 'uuid';
import CommentList from './CommentList';

export default function AddComment() {
  const [text, setText] = useState('');
  const {user} = useSelector(state => state.user_auth);
  const {mountainName} = useParams();
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    if (!user.uid) {
      alert('로그인 후 댓글을 작성해주세요!');
      return;
    }
    const newComment = {...user, id: uuidv4(), comment: text, mountainName, createdAt: new Date()};
    addCommentStore(newComment);
    dispatch(addComment(newComment));
    setText('');
  };
  const handleChange = e => {
    setText(e.target.value);
  };

  return (
    <>
      <ScAddCommentLayout onSubmit={handleSubmit}>
        <h1>'{mountainName}'에 대한 등산 후기를 들려주세요!</h1>
        <div>
          <ScComment type="text" value={text} onChange={handleChange} placeholder="댓글을 작성해주세요" />
          <ScSubmitBtn>등록하기</ScSubmitBtn>
        </div>
      </ScAddCommentLayout>
      <CommentList />
    </>
  );
}

const ScAddCommentLayout = styled.form`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem auto;
  padding: 2rem;
  gap: 1.5rem;
  background-color: var(--color-yellow);
  border-radius: 1rem;
  & div {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }
  & h1 {
    font-size: large;
  }
`;

const ScSubmitBtn = styled.button`
  width: 100px;
  height: 35px;
  color: white;
  background-color: var(--color-main);
  border-radius: 30px;
`;

const ScComment = styled.input`
  width: 400px;
  height: 35px;
  padding: 1rem;
  border: none;
  border-radius: 30px;
`;
