import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialUserState } from '../Types';


let initialState: initialUserState[] = [];

const usersSlice = createSlice({
	name: 'users',
	initialState: initialState,
	reducers: {
		addNewUser: (
			state: initialUserState[],
			action: PayloadAction<initialUserState, string, never, never>
		) => {
           return([...state,action.payload])
        },
		deleteExistingUser: (
			state: initialUserState[],
			action: PayloadAction<string, string, never, never>
		) => {
             console.log(action.payload);
             state = state.filter(element => element.userid !== action.payload);
             return state;
             
        },
		updateExistingUser: (
			state: initialUserState[],
			action: PayloadAction<initialUserState, string, never, never>
		) => {
            state = state.map((item)=>{
                if(item.userid === action.payload.userid)
                {
                    item.useremail = action.payload.useremail;
                    item.username = action.payload.username;
                    item.usermobileno = action.payload.usermobileno;
                }
                return item;
            })
        },
	},
});

export const { addNewUser,deleteExistingUser,updateExistingUser } = usersSlice.actions;

export default usersSlice.reducer;
