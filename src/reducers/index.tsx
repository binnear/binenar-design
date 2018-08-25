import { combineReducers } from 'redux';
import {
  UPDATECSS
} from '../actions';

export let initialState = {
  cssProper: {
    transform: 'rotate(0deg)'
  }
}

interface Action {
  type: string,
  payload: object
}

let reducers = combineReducers({
  cssProper(state = {}, action: Action) {
    switch (action.type) {
      case UPDATECSS:
        return {
          ...state,
          ...action.payload
        }
        break
      default:
       return state
    }
  }
})

export default reducers