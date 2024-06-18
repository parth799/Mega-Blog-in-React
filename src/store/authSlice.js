/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    status : false,
    userDate: null
}

const authSlice = createSlice({
    name : "name",
    initialState,
    reducers: {
        login : (state, action) =>{
            state.status = true;
            state.userDate = action.payload.userData
        },
        logout: (state) =>{
            state.status = false;
            state.userDate = null;
        }
    }
})
export const {login,logout } = authSlice.actions
export default authSlice.reducer