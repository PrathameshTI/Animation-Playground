import {ScrollView, Text, View} from 'moti';
import {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Keyboard,
  StatusBar,
  TextInput,
} from 'react-native';
import Animated, {
  SensorType,
  useAnimatedKeyboard,
  useAnimatedSensor,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import {DATA} from '../../DATA';
const {height, width} = Dimensions.get('screen');

export default function () {
  const gravity = useAnimatedSensor(SensorType.MAGNETIC_FIELD);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      
    </View>
  );
}
