import React, { useEffect } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from './Redux/action';

export default function () {
  const dispatch = useDispatch();

  const userList = useSelector(state => state.reducer);

  useEffect(() => {
    dispatch(getUserList());
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <ScrollView>
        {userList[0].users.map((itm, idx) => <Text key={idx}>{`${itm.firstName} ${itm.lastName}`}</Text>)}
      </ScrollView>
    </View>
  );
}
