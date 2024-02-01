import {
  Canvas,
  Group,
  Rect,
  RoundedRect,
  SweepGradient,
  usePathValue,
  useTouchHandler,
  vec,
  useValue,
  interpolate,
} from '@shopify/react-native-skia';
import React from 'react';
import {Dimensions, View} from 'react-native';
import {
  Extrapolation,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

const SQUARES_AMOUNT_HORIZONTAL = 8;
const SQUARE_CONTAINER_SIZE = SCREEN_WIDTH / SQUARES_AMOUNT_HORIZONTAL;
const PADDING = 20;
const SQUARE_SIZE = SQUARE_CONTAINER_SIZE - PADDING;
const SQUARES_AMOUNT_VERTICAL =
  Math.floor(SCREEN_HEIGHT / SQUARE_CONTAINER_SIZE) - 3;

const CANVAS_WIDTH = SCREEN_WIDTH;
const CANVAS_HEIGHT = SQUARES_AMOUNT_VERTICAL * SQUARE_CONTAINER_SIZE;
export default function () {
  const touchedPoint = useSharedValue(null);
  const progress = useSharedValue(0);
  const touchHandler = useTouchHandler({
    onStart: e => {
      progress.value = withTiming(1, {duration: 300});
      touchedPoint.value = {
        x: e.x,
        y: e.y,
      };
    },
    onActive: e => {
      touchedPoint.value = {
        x: e.x,
        y: e.y,
      };
    },
    onEnd: e => {
      progress.value = withTiming(0, {duration: 300});
      touchedPoint.value = null;
    },
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <Canvas
        style={{
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
        }}
        onTouch={touchHandler}>
        <Group>
          {new Array(SQUARES_AMOUNT_HORIZONTAL).fill(0).map((_, i) => {
            return new Array(SQUARES_AMOUNT_VERTICAL).fill(0).map((_, j) => {
              return (
                <RoundedItem
                  key={`i${i}=${j}`}
                  x={i * SQUARE_CONTAINER_SIZE + PADDING / 2}
                  y={j * SQUARE_CONTAINER_SIZE + PADDING / 2}
                  width={SQUARE_SIZE}
                  height={SQUARE_SIZE}
                  point={touchedPoint}
                  progress={progress}
                />
              );
            });
          })}
          <SweepGradient
            c={vec(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)}
            colors={['cyan', 'magenta', 'yellow', 'cyan']}
          />
        </Group>
      </Canvas>
    </View>
  );
}

const MAX_DISTANCE = Math.sqrt(CANVAS_WIDTH ** 2 + CANVAS_HEIGHT ** 2);

const RoundedItem = ({x, y, width, height, point, progress}) => {
  const preDistance = useSharedValue(0);

  const preTouchPoint = useSharedValue({
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
  });

  const distance = useDerivedValue(() => {
    if (point?.value === null) return preDistance.value;
    preDistance.value = Math.sqrt(
      (point?.value.x - x) ** 2 + (point?.value.y - y) ** 2,
    );
    return preDistance.value;
  }, [point]);

  const scale = useDerivedValue(() => {
    return interpolate(
      distance.value * progress?.value,
      [0, MAX_DISTANCE / 2],
      [1, 0],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      },
    );
  }, [distance, progress]);

  // const scaleWidth = useDerivedValue(() => {
  //   return scale.value * width;
  // }, [scale]);

  // const scaleHeight = useDerivedValue(() => {
  //   return scale.value * height;
  // }, [scale]);

  const transform = useDerivedValue(() => {
    return [{scale: scale.value}];
  }, [scale]);

  const origin = useDerivedValue(() => {
    if (point?.value == null) {
      return preTouchPoint.value;
    }
    preTouchPoint.value = point?.value;
    return preTouchPoint?.value;
  }, [point]);

  return (
    <Group origin={origin} transform={transform}>
      <RoundedRect
        r={4}
        x={x}
        y={y}
        width={width}
        height={height}
        //  width={scaleWidth} height={scaleHeight}
      />
    </Group>
  );
};
