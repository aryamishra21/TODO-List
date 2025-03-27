import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import listSlice from "./listSlice";
const store=configureStore({
    reducer:{
        auth:authSlice,
        list:listSlice
    }
})
export default store;