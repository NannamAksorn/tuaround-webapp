// ngvReducer.js
import {
  SET_FROM_PLACE,
  SET_TO_PLACE,
  SET_PLANS,
} from '../actions/directionAction';

const initialState = {
  fromPlace: {},
  toPlace: {},
  diplayPlans: [],
  plans: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_FROM_PLACE:
      return { ...state, fromPlace: action.payload };
    case SET_TO_PLACE:
      return { ...state, toPlace: action.payload };
    case SET_PLANS:
      return { ...state, plans: action.payload };
    default:
      return state;
  }
}

export default reducer;
