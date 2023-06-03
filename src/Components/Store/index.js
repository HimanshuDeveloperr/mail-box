import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import ClassSlice from "./ClassSlice";




const Store=configureStore({
    reducer:{auth:AuthSlice.reducer,class:ClassSlice.reducer}
})

export default Store