import { createContext } from "react";
import { argType } from "../Components/UserFormComponents/UserForm";

export type usersContextType ={
    usersList:argType[],
    handleAddUser:(user:argType)=>void;
    handleDelUser:(id:String)=>void;
    handleUpdateUser:(user:argType)=>void;
}

export const usersContext = createContext<usersContextType|null>(null);