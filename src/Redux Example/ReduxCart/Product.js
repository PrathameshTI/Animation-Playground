import React, {useMemo} from 'react';
import {Button, Image, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, removeFromCart} from './Redux/action';

export default function ({itm}) {
  const dispatch = useDispatch();

  const cartData = useSelector(itm => itm.reducer);

  const handleAddToCart = item => dispatch(addToCart(item));

  const handleRemoveToCart = id => dispatch(removeFromCart(id));

  const valueData = useMemo(
    () => cartData.filter(item => item.id === itm.id).length,
    [cartData.length],
  );
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        gap: 10,
        paddingVertical: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <Image
          source={{uri: itm.image}}
          style={{
            width: 100,
            height: 100,
          }}
        />
        <View>
          <Text style={{color: '#000', fontSize: 20}}>{itm?.name}</Text>
          <Text style={{color: '#000', fontSize: 20}}>{itm?.price}</Text>
          <Text style={{color: '#000', fontSize: 20}}>{itm?.color}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <Button title="Remove -" onPress={() => handleRemoveToCart(itm.id)} />
        <Text style={{color: '#000'}}>
          {valueData}
        </Text>
        <Button title="Add +" onPress={() => handleAddToCart(itm)} />
      </View>
    </View>
  );
}
