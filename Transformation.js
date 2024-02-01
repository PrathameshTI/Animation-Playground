import {
  BlurMask,
  Canvas,
  RoundedRect,
  Skia,
  SweepGradient,
  vec,
} from '@shopify/react-native-skia';
import React from 'react';
import {Dimensions, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
const {width} = Dimensions.get('screen');
const HEIGHT = 250;
const WIDTH = width * 0.9;

const card_HEIGHT = HEIGHT - 5;
const card_WIDTH = WIDTH - 5;

export default function () {
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin(e => {
      rotateX.value = withTiming(
        interpolate(e.y, [0, card_HEIGHT], [10, -10], Extrapolation.CLAMP),
      );
      rotateY.value = withTiming(
        interpolate(e.x, [0, card_HEIGHT], [-10, 10], Extrapolation.CLAMP),
      );
    })
    .onChange(e => {
      // topleft [10deg, -10deg]
      // topRight [10deg, 10deg]
      // BottomRight [-10deg, 10deg]
      // Bottomleft [-10deg, -10deg]
      rotateX.value = interpolate(
        e.y,
        [0, card_HEIGHT],
        [10, -10],
        Extrapolation.CLAMP,
      );
      rotateY.value = interpolate(
        e.x,
        [0, card_HEIGHT],
        [-10, 10],
        Extrapolation.CLAMP,
      );
      console.log(e.x, e.y);
    })
    .onFinalize(() => {
      rotateX.value = withTiming(0);
      rotateY.value = withTiming(0);
    });

  const clip = Skia.Path.Make();
  const rstyle = useAnimatedStyle(() => {
    const rotateXVal = `${rotateX.value}deg`;
    const rotateYVal = `${rotateY.value}deg`;
    console.log(rotateX.value, rotateY.value);
    return {
      transform: [
        {
          perspective: 300,
        },
        {rotateX: rotateXVal},
        {rotateY: rotateYVal},
      ],
    };
  });
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
        }}>
        <BackgroundGradient height={HEIGHT} width={WIDTH} />

        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[
              {
                width: card_WIDTH,
                height: card_HEIGHT,
                position: 'absolute',
                borderRadius: 20,
                backgroundColor: '#000',
                zIndex: 300,
              },
              rstyle,
            ]}
          />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const BackgroundGradient = ({width, height}) => {
  const CanvasPadding = 40;
  return (
    <Canvas
      style={{width: width + CanvasPadding, height: height + CanvasPadding}}>
      <RoundedRect
        x={CanvasPadding / 2}
        y={CanvasPadding / 2}
        width={width}
        height={height}
        r={20}
        color={'white'}>
        <SweepGradient
          c={vec((width + CanvasPadding) / 2, (height + CanvasPadding) / 2)}
          colors={['cyan', 'magenta', 'yellow', 'cyan']}
        />
        <BlurMask blur={10} style={'solid'} />
      </RoundedRect>
    </Canvas>
  );
};
