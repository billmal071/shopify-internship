// eslint-disable-next-line no-unused-vars
import {ERROR, CLEAR_ERRORS, GET_MOVIES, GET_NOMINATED_MOVIES, LOADING } from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        loading: false,
        error: null,
        omdbMovies: action.payload
      }
    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    case LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}