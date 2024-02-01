import {
  Blur,
  Canvas,
  Circle,
  ColorMatrix,
  Group,
  Paint,
  SweepGradient,
  vec,
} from '@shopify/react-native-skia';
import React, {useMemo} from 'react';
import {View, useWindowDimensions} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';

const RADIUS = 80;

export default function () {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();

  const cx = useSharedValue(windowWidth / 2);
  const cy = useSharedValue(windowHeight / 2);
  const gesture = Gesture.Pan()
    .onBegin(e => {
      cx.value = e.x;
      cy.value = e.y;
      // translateX.value += e.changeX;
    })
    .onChange(e => {
      cx.value = e.x;
      cy.value = e.y;
      // translateX.value += e.changeX;
    })
    .onEnd(e => {
      // translateX.value = withDecay({
      //   velocity: e.velocityX,
      //   clamp: [leftBoundary, rightBoundary],
      // });
    });

  const layer = useMemo(() => {
    return (
      <Paint>
        {/* PixelOpacity > BluredOpacity *  60 - 30 */}
        <Blur blur={30} />
        <ColorMatrix
          matrix={[
            // R, G, B, A, Bias (offset)
            1, 0, 0, 0, 0,
            //
            0, 1, 0, 0, 0,
            //
            0, 0, 1, 0, 0,
            //
            0, 0, 0, 60, -30,
          ]}
        />
      </Paint>
    );
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}>
        <GestureDetector gesture={gesture}>
          <Canvas
            style={{
              flex: 1,
              backgroundColor: '#000',
            }}>
            <Group layer={layer}>
              <Circle cx={cx} cy={cy} r={RADIUS} color={'blue'}>
                <SweepGradient
                  c={vec(0, 0)}
                  colors={['magenta', 'cyan', 'magenta']}
                />
              </Circle>

              <Circle
                cx={windowWidth / 2}
                cy={windowHeight / 2}
                r={RADIUS}
                color={'blue'}>
                <SweepGradient
                  c={vec(0, 0)}
                  colors={['cyan', 'magenta', 'cyan']}
                />
              </Circle>
            </Group>
          </Canvas>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
}
