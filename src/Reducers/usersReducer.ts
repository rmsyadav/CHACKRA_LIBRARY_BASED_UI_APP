import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialUserState } from '../Types';


let initialState:initialUserState[]= [{
    id: "",
	useremail: "",
	username: "",
	usermobileno: ""
}];



const usersSlice = createSlice({
	name: 'users',
	initialState: initialState,
	reducers: { addNewUser: (state:initialUserState[],action:PayloadAction<initialUserState, string,never,never>) => {} }
});

export const {addNewUser} = usersSlice.actions;

export default usersSlice.reducer;
