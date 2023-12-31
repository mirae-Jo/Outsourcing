import {createSlice} from '@reduxjs/toolkit';
import {getComments} from 'shared/firebase';

let initialState = {
  comments: [],
};

//댓글 초기값은 파이어스토어에서 값 가져오기
initialState.comments = await getComments();

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      const {uid, id, comment, mountainName, displayName, photoURL, createdAt} = action.payload;
      state.comments.push({uid, id, comment, mountainName, displayName, photoURL, createdAt});
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(comment => comment.id !== action.payload);
    },
    updateComment: (state, action) => {
      const {id, comment} = action.payload;
      state.comments = state.comments.map(cmt => (cmt.id === id ? {...cmt, comment} : cmt));
    },
  },
});

export const {addComment, deleteComment, updateComment} = commentSlice.actions;
export default commentSlice.reducer;
