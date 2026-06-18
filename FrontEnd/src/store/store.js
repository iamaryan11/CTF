import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../authSlice";
import questionReducer from "../questionSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionReducer,
  },
});
export default store;
