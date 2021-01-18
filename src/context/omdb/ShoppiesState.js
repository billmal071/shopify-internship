import React, {useReducer} from 'react';
import ShoppiesReducer from './shoppiesReducer';
import ShoppiesContext from './shoppiesContext';
import { LOADING, GET_NOMINATED_MOVIES, GET_MOVIES, CLEAR_ERRORS, ERROR } from '../types';

const ShoppiesState = props => {
  const initialState = {
    omdbMovies: null,
    error: null,
    loading: false
  }

  const [state, dispatch] = useReducer(ShoppiesReducer, initialState);

  const getMovie = async (movie) => {
    setLoading()

    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDBAPIKEY}&s=${movie}&type=movie`)
      const data = await res.json();
      dispatch({
        type: GET_MOVIES,
        payload: data
      })
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response
      })
    }
  }

  const setLoading = () => {
    dispatch({
      type: LOADING
    })
  }

  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    })
  }

  return (
    <ShoppiesContext.Provider value={{
      omdbMovies: state.omdbMovies,
      error: state.error,
      loading: state.loading,
      getMovie,
      clearErrors,
      setLoading
    }}>
      {props.children}
    </ShoppiesContext.Provider>
  )
}

export default ShoppiesState;