import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers=createAsyncThunk('users/fetchUsers', async()=>{
    const response=await fetch('https://jsonplaceholder.typicode.com/users');
    const data=await response.json();
    return data;
})
const userSlice=createSlice({
    name:'users',
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    reducers:{
        deleteUser:(state,action)=>{
            state.data=state.data.filter((user)=>user.id!==action.payload);
        },
        updateUser:(state,action)=>{
            const list=state.data.map((user)=>user.id==action.payload.id?action.payload.user:user);
            state.data=list;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUsers.pending,(state)=>{
            state.loading=true;
        })
        builder
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        })
        builder
        .addCase(fetchUsers.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
    }
});
export const {deleteUser,updateUser}=userSlice.actions;
export const users=(state)=>state.users;
export default userSlice.reducer;