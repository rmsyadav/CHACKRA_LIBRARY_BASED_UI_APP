import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../Reducers/moviesReducer';
import usersReducer from '../Reducers/usersReducer';

export interface Movie {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
}
export type dataType ={
	Response:string;
	Search:Movie[];
	TotalResults:string
}
export interface MoviesState {
	loading: boolean;
	error: null | string | undefined; // Assume error can be a string or null
	data: dataType;
}

export interface RootState {
	moviesReducer: ReturnType<typeof moviesReducer>;
	usersReducer: ReturnType<typeof usersReducer>
}

export type AppStore = ReturnType<typeof configureStore>;

export interface ApiResponse {
	Search: Movie[];
}
export type initialUserState ={
    id: String;
	useremail: String;
	username: String;
	usermobileno: String;
}

