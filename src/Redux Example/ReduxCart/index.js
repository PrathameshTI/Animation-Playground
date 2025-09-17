import React from 'react';
import {Button, Image, ScrollView, Text, View} from 'react-native';
import Header from './Header';
import Product from './Product';
import {Provider} from 'react-redux';
import store from './Redux/store';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserList from './UserList';
const products = [
  {
    id: 1,
    name: 'samsung',
    color: 'white',
    price: 30000,
    image: 'https://picsum.photos/200/300.jpg',
    count: 5,
  },
  {
    id: 2,
    name: 'Apple',
    color: 'red',
    price: 80000,
    image: 'https://picsum.photos/200/300.jpg',
    count: 10,
  },
  {
    id: 3,
    name: 'Nokia',
    color: 'Blue',
    price: 40000,
    image: 'https://picsum.photos/200/300.jpg',
    count: 5,
  },
  {
    id: 4,
    name: 'OnePluse',
    color: 'Green',
    price: 50000,
    image: 'https://picsum.photos/200/300.jpg',
    count: 10,
  },
];
export default AppRedux = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={App} />
            <Stack.Screen name="UserList" component={UserList} />
          </Stack.Navigator>
      </NavigationContainer>
      {/* <App /> */}
    </Provider>
  );
};

function App() {
  const navigation = useNavigation()
  return (
    <View
      style={{
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
        paddingHorizontal: 30,
      }}>
        <Button title='UserList' onPress={()=>navigation.navigate('UserList')} />
      <Header />
      <ScrollView>
        {products.map((itm, idx) => (
          <Product itm={itm} key={idx} />
        ))}
      </ScrollView>
    </View>
  );
}
