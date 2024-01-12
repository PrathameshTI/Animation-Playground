import {Text} from 'moti';
import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface PaletteProp {
  colors: string;
  index: number;
  gestureDegree: SharedValue<number>;
  activeColor: string;
  onColorPress: (color: string) => void;
  palleteHeight: SharedValue<number>;
}

const PALETTE_WIDTH = 60;

const PALETTE_HEIGHT = 120;

const ANGLE = 360;
// 360 - gestureDegree.value / (COLOR_PALETTE.length - 1)
const COLOR_PALETTE = [
  'rgb(195, 107, 88)',
  'rgb(216, 160, 164)',
  'rgb(209, 178, 195)',
  'rgb(202, 106, 123)',
  'rgb(224, 156, 192)',
  'rgb(212, 171, 215)',
  'rgb(187, 122, 248)',
  'rgb(212, 172, 250)',
  'rgb(216, 191, 251)',
  'rgb(118, 134, 247)',
  'rgb(157, 183, 259)',
  'rgb(168, 198, 250)',
  //   ['rgb(103, 130, 169)', 'rgb(182, 208, 237)', 'rgb(195, 218, 246)'],
  //   ['rgb(0, 0, 0)', 'rgb(64, 68, 88)', 'rgb(122, 128, 159)'],
];

const PaletteItem: React.FC<PaletteProp> = ({
  colors,
  index,
  gestureDegree,
  activeColor,
  onColorPress,
  palleteHeight,
}) => {
  const viewStyle = useAnimatedStyle(() => {
    const angle = (gestureDegree.value / (COLOR_PALETTE.length - 1)) * index;

    return {
      transform: [
        // {translateY: palleteHeight.value},
        {rotate: withSpring(`${angle}deg`, {mass: 0.4})},
        {translateY: withSpring(-palleteHeight.value / 2)},
      ],
      height: withSpring(palleteHeight.value),
    };
  }, []);

  return (
    <Animated.View
      style={[
        styles.paletteContainer,
        {
          width: PALETTE_WIDTH,
        },
        viewStyle,
      ]}>
      <Pressable
        style={[
          styles.colorItem,
          {
            backgroundColor: colors,
            marginBottom: 0,
          },
        ]}
        onPress={() => onColorPress(colors)}
      />
    </Animated.View>
  );
};

const ColorSwatch = () => {
  const gestureDegree = useSharedValue(0);

  const palleteHeight = useSharedValue(PALETTE_WIDTH);

  const [activeColor, setActiveColor] = useState('rgb(64, 68, 88)');

  const calculateDegree = (
    e: GestureUpdateEvent<PanGestureHandlerEventPayload>,
  ) => {
    'worklet';
    let degree =
      Math.atan2(palleteHeight.value - e.y, e.x - PALETTE_WIDTH / 2) *
      (180 / Math.PI);
    degree < -90 && (degree = degree + 360);

    return 90 - degree;
  };

  const dragGesture = Gesture.Pan()
    .onStart(e => {
    //   gestureDegree.value = calculateDegree(e);
    //   palleteHeight.value = (PALETTE_HEIGHT * calculateDegree(e)) / ANGLE;
    })
    .onUpdate(e => {
    //   gestureDegree.value = calculateDegree(e);
    //   palleteHeight.value = (PALETTE_HEIGHT * calculateDegree(e)) / ANGLE;
    })
    .onEnd(() => {
      //   gestureDegree.value = gestureDegree.value > 90 ? 90 : 0;
    });
  const onAnchorPress = () => {
    palleteHeight.value =
      gestureDegree.value === 0 ? PALETTE_HEIGHT : PALETTE_WIDTH;

    gestureDegree.value = gestureDegree.value === 0 ? ANGLE : 0;
  };

  const animatedSty = useAnimatedStyle(() => {
    return {
      backgroundColor: '#efefef',
      width: withSpring(palleteHeight.value * 2 + 10),
      height: withSpring(palleteHeight.value * 2 + 10),
      borderRadius: 1000,
      padding: 10,
      position: 'absolute',
    };
  });
  const mainViewSty = useAnimatedStyle(() => {
    return {
      transform: [{translateY: withSpring(-palleteHeight.value)}],
    };
  });
  return (
    // <GestureHandlerRootView style={{flex: 1}}>
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor={activeColor} />

      <SafeAreaView style={[styles.container, {backgroundColor: activeColor}]}>
        {/* <GestureDetector gesture={dragGesture}> */}
          <View
            style={{
              //   borderWidth: 1,
              width: PALETTE_HEIGHT * 2,
              height: PALETTE_HEIGHT * 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Animated.View style={animatedSty} />
            <Animated.View
              style={[
                mainViewSty,
                {
                  right: PALETTE_WIDTH / 2,
                  top: PALETTE_WIDTH,
                },
              ]}>
              <View
                style={
                  {
                    //   margin: 40,
                  }
                }>
                {COLOR_PALETTE.map((colors, index) => (
                  <PaletteItem
                    key={index}
                    onColorPress={setActiveColor}
                    {...{
                      activeColor,
                      colors,
                      index,
                      gestureDegree,
                      palleteHeight,
                    }}
                  />
                ))}
              </View>
            </Animated.View>
          </View>
        {/* </GestureDetector> */}
        <Pressable
          style={{
            position: 'absolute',
            bottom: 60,
            alignSelf: 'center',
            elevation: 3,
            shadowColor: '#000',
            paddingVertical: 12,
            borderRadius: 50,
            paddingHorizontal: 20,
            backgroundColor: '#efefef80',
          }}
          onPress={onAnchorPress}>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
            Click
          </Text>
        </Pressable>
      </SafeAreaView>
      </View>
    // </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paletteSize: {},
  paletteContainer: {
    position: 'absolute',
  },
  colorItem: {
    flex: 1,
    width: '100%',
    borderRadius: PALETTE_WIDTH,
  },
});

export default ColorSwatch;
