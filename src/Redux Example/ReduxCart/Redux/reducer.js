import {ADD_TO_CART, REMOVE_TO_CART, SET_USER_DATA} from './constants';

const initialState = []; //to store items more than 1

// taker two parameters
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [
        ...state, //prev All data
        action.data, // new Data
      ];
    case REMOVE_TO_CART:
    
      return state.filter(
        (_, idx) => state.findIndex(itm => itm.id === action.data) !== idx,
      );

    case SET_USER_DATA:
      return [...state, action.data ];
    default:
      return state;
  }
};
export {reducer};
