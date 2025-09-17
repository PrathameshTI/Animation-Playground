import {ADD_TO_CART, REMOVE_TO_CART, USER_LIST} from './constants';

export function addToCart(item) {
  return {
    type: ADD_TO_CART,
    data: item,
  };
}

export function removeFromCart(id) {
  return {
    type: REMOVE_TO_CART,
    data: id,
  };
}

export function getUserList() {
  return {
    type: USER_LIST,
  };
}
