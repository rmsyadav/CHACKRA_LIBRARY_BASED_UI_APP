import React, { useEffect }  from 'react';
import {useDispatch, useSelector} from "react-redux"
import { fetchData } from '../../ReduxThunk/thnukActionFunction';
import {ThunkDispatch} from "@reduxjs/toolkit";
import { Stack } from '@chakra-ui/react';
import MovieCard from './Card';
import { RootState } from '../../Types';


function AirbnbCard ():React.ReactElement{
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const moviesList:any = useSelector<RootState>((state)=>state.moviesReducer)
  console.log(moviesList);
  useEffect(()=>{
   dispatch(fetchData())

  },[dispatch])
  
  return (
     <Stack spacing={10} direction='row' flexWrap="wrap" margin="15px" justifyContent="center">
      {
        moviesList && moviesList?.data?.Search?.map((item)=><MovieCard item={item}></MovieCard>)
      }
    </Stack>
  );
}

export default AirbnbCard;
