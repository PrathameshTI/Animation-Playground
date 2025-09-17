import React from 'react';
import {View} from 'react-native';
import {put, takeEvery} from 'redux-saga/effects';
import {SET_USER_DATA, USER_LIST} from './constants';

// saga is for async function
// auth api calls

// using yield in place of await
function* userList() {
  const url = 'https://dummyjson.com/users';
  let data = yield fetch(url);
  data = yield data.json();
  // console.log(data);
  // console.log('saga function called');
  yield put({type: SET_USER_DATA, data});
}
function* SagaData() {
  yield takeEvery(USER_LIST, userList);
}

export default SagaData;
