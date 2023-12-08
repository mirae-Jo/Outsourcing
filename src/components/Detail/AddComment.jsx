import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addCommentStore } from 'shared/firebase';
import { addComment } from 'shared/redux/modules/commentSlice';
import { styled } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

export default function AddComment() {
    const [text, setText] = useState('');
    const { user } = useSelector((state) => state.user_auth);
    const { mountainName } = useParams();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        setText('');
        if (!user.uid) {
            alert('로그인 후 댓글을 작성해주세요!');
            return;
        }
        const newComment = { ...user, id: uuidv4(), comment: text, mountainName, createdAt: new Date() };
        addCommentStore(newComment);
        dispatch(addComment(newComment));

    }
    const handleChange = (e) => {
        setText(e.target.value);
    }

    return (
        <ScAddCommentLayout onSubmit={handleSubmit}>
            <ScComment type='text' value={text} onChange={handleChange} placeholder='댓글을 작성해주세요' />
            <button>등록하기</button>
        </ScAddCommentLayout>
    );
}

const ScAddCommentLayout = styled.form`
    display:flex;
    justify-content: center;
    margin-top:1rem;

    button{
        width:5rem;
        background-color: #B0D9B1;
    }
`

const ScComment = styled.input`
    width:300px;
    padding:0.3rem 0.5rem;
`

