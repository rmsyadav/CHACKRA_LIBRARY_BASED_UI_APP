import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchData } from '../ReduxThunk/thnukActionFunction';
import { MoviesState, dataType } from '../Types';

let initialState: MoviesState = { loading: false, error: null, data: {
	Response:"",
	Search:[{Poster:"",Title:"",Type:"",Year:"",imdbID:""}],
	TotalResults:""
} };



const dataSlice = createSlice({
	name: 'data',
	initialState: initialState,
	reducers: { setSelectedMoview: (state:MoviesState,action:PayloadAction<dataType, string,never,never>) => {} },
	extraReducers: (builder) => {
		builder
			.addCase(fetchData.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchData.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(fetchData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ;
			});
	},
});

export default dataSlice.reducer;
