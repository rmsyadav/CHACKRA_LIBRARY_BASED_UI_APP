import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../Reducers/moviesReducer';

export interface Movie {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
}

export interface MoviesState {
	loading: boolean;
	error: null | string | undefined; // Assume error can be a string or null
	data: any | null;
}

export interface RootState {
	moviesReducer: ReturnType<typeof moviesReducer>;
}

export type AppStore = ReturnType<typeof configureStore>;

export interface ApiResponse {
	Search: Movie[];
}
