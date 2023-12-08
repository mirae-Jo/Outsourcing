import { configureStore } from "@reduxjs/toolkit";
import user_auth from "../modules/authSlice";
import comments from "../modules/commentSlice";


const store = configureStore({
    reducer: {
        user_auth,
        comments,
    }
})

export default store;