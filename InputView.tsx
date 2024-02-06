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
import {DATA} from './DATA';
const {height, width} = Dimensions.get('screen');

export default function () {
  const gravity = useAnimatedSensor(SensorType.MAGNETIC_FIELD);

  const animatedStyle = useAnimatedStyle(() => {
    console.log(gravity);
    return {
    //   transform: [
    //     {translateX: withSpring(gravity.sensor.value.x * 20)},
    //     {translateY: withSpring(-(gravity.sensor.value.y * 20))},
    //   ],
    };
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Animated.View
        style={[
          {
            width: '60%',
            height: '60%',
            backgroundColor: 'grey',
            // transform:[{translateX}]
          },
          animatedStyle,
        ]}></Animated.View>
    </View>
  );
}
