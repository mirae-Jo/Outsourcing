import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments: []
};

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment: (state, action) => {
            //나중에 추가할 내용들
            //const {userId,comment,date,mountain} = action.payload;
            const { uid, comment, displayName, photoURL, createdAt } = action.payload;
            console.log({ uid, comment, displayName, photoURL, createdAt });
            state.comments.push(action.payload);
        }
    }
})

export const { addComment } = commentSlice.actions;
export default commentSlice.reducer;