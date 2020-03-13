// ngvReducer.js
import {
  SET_NGV
} from '../actions/ngvAction'

const initialState = {
  cars: {}
}

function reducer(state=initialState, action) {
  switch (action.type) {
    case SET_NGV:
      return { ...state, cars:{...state.cars, ...action.payload }}
    default: return state;
  }
}

export default reducer;