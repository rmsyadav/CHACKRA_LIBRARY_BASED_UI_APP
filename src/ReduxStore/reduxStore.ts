import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "../Reducers/rootReducer";
import { AppStore } from "../Types";


const store:AppStore = configureStore({
    reducer:rootReducer,
    devTools: true  
})

export default store;