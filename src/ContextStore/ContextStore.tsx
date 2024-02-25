import { createContext } from "react";
import { pageContextType } from "../Types";

export const pageContext = createContext<pageContextType|null>(null);