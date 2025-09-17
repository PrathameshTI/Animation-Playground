import React from 'react';
import {Text, View} from 'react-native';
import { useSelector } from 'react-redux';

export default function () {
    const cartData = useSelector((state)=>state.reducer)   //state is redux state
    // state.reducer reducer coz in store file redure is defined
    // you can write any name
    // console.log(cartData)
  return (
    <View
      style={{
        // flex:1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          marginVertical: 10,
          color: '#000',
          fontSize: 22,
        }}>
        {cartData.length}
      </Text>
    </View>
  );
}
