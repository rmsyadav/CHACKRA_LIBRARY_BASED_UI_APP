import { Reducer, combineReducers } from "redux";
import moviesReducer from "./moviesReducer";
import { RootState } from "../Types";
import usersReducer from "./usersReducer";


const rootReducer:Reducer<RootState> = combineReducers({
   moviesReducer:moviesReducer,
   usersReducer:usersReducer
})

export default rootReducer;