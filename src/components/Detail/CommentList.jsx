import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';


export default function CommentList() {
    const { comments } = useSelector((state) => state.comments);
    console.log(comments);
    return (
        <ScCommentListLayout>
            <h1>Comment</h1>
            {comments?.map(c => {
                const { comment, date } = c;
                return (
                    <li>
                        <p>{comment}</p>
                        <time>{new Date(date).toLocaleString()}</time>
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
`

