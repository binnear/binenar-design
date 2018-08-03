import { combineReducers } from 'redux';
import {
  TEST
} from '../actions';

export let initialState = {
  test: {
    data: 'test'
  }
}

let reducers = combineReducers({
  test(state = {}, action: any) {
    switch (action.type) {
      case TEST:
        return {
          ...state,
          data: action.payload
        }
        break
      default:
       return state
    }
  }
})

export default reducers