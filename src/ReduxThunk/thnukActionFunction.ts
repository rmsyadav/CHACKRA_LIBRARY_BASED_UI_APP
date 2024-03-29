import { createAsyncThunk } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { ApiResponse, RootState } from '../Types';

export const fetchData = createAsyncThunk<
	ApiResponse,
	void,
	{ dispatch: Dispatch; state: RootState }
>('data/fetchData', async () => {
	try {
		const response = await fetch('https://www.omdbapi.com/?apikey=aaf66081&s=spyder'); // Replace with your API endpoint
		const data: any = await response.json();
		return data;
	} catch (error: any) {
		throw new Error('something wrong');
	}
});
