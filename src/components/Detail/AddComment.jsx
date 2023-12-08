import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from 'shared/redux/modules/commentSlice';
import { styled } from 'styled-components';

export default function AddComment() {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addComment({ comment: text, date: new Date() }));
        setText('');
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
