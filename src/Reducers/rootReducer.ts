import { Reducer, combineReducers } from "redux";
import moviesReducer from "./moviesReducer";
import { RootState } from "../Types";


const rootReducer:Reducer<RootState> = combineReducers({
   moviesReducer:moviesReducer
})

export default rootReducer;