import { createSlice } from "@reduxjs/toolkit";
import { getComments } from "shared/firebase";

let initialState = {
    comments: []
};

//댓글 초기값은 파이어스토어에서 값 가져오기
initialState.comments = await getComments();
console.log(initialState.comments);

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment: (state, action) => {
            const { uid, id, comment, mountainName, displayName, photoURL, createdAt } = action.payload;
            console.log({ uid, id, comment, mountainName, displayName, photoURL, createdAt });
            state.comments.push(action.payload);
        },
        deleteComment: (state, action) => {
            state.comments = state.comments.filter(comment => comment.id !== action.payload);
        }
    }
})

export const { addComment, deleteComment } = commentSlice.actions;
export default commentSlice.reducer;