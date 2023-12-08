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
                const { displayName, comment, photoURL, createdAt } = c;
                return (
                    <li>
                        <div>
                            <p>{comment}</p>
                            <ScUserInfo>
                                <p>{displayName}</p>
                                <img src={photoURL} alt='avatar' />
                            </ScUserInfo>
                        </div>
                        <time>{new Date(createdAt).toLocaleString()}</time>
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

