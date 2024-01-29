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
import {Gesture} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';
const {width} = Dimensions.get('screen');
const HEIGHT = 250;
const WIDTH = width * 0.9;
export default function () {
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const gesture = Gesture.Pan().onChange(e => {
    rotateX.value = e.changeX / 300;
    rotateY.value = e.changeY / 300;
  });
  const clip = Skia.Path.Make();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      }}>
      {/* <BackgroundGradient height={HEIGHT} width={WIDTH} /> */}
    </View>
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
