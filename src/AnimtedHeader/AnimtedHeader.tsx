import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  withTiming,
  Extrapolation,
} from 'react-native-reanimated';
import {DATA} from '../../DATA';
import {MotiView} from 'moti';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import { useScrollToTop } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const BIG_HEADER = 140;
const SMALL_HEADER = 70;
const AnimtedHeader = () => {
  const scrollRef = useRef(null);
  const scrollY = useSharedValue(0);
  const isScrollAtTop = useSharedValue(true);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: event => {
  
      console.log(event.contentOffset.y);
      scrollY.value = event.contentOffset.y;
      // isScrollAtTop.value = event.contentOffset.y === 0;
    },
  });

  const headerHeight = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 50],
        [BIG_HEADER, SMALL_HEADER],
        Extrapolation.CLAMP,
      ),
    };
  });

  const scrollViewStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 50],
        [100, 40],
        Extrapolation.CLAMP,
      ),
      width: interpolate(
        scrollY.value,
        [0, 50],
        [width, 80],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          translateX: interpolate(
            scrollY.value,
            [0, 50],
            [0, width / 2 - 40],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  const itemsCompo = (idx: number) => {
    const mainItm = idx === 1 || idx === 2;
    const itemViewStyle = useAnimatedStyle(() => {
      return {
        height: mainItm
          ? interpolate(scrollY.value, [0, 50], [80, 40], Extrapolation.CLAMP)
          : interpolate(scrollY.value, [0, 25], [80, 0], Extrapolation.CLAMP),
        width: mainItm
          ? interpolate(scrollY.value, [0, 50], [80, 40], Extrapolation.CLAMP)
          : interpolate(scrollY.value, [0, 25], [80, 0], Extrapolation.CLAMP),
        opacity: mainItm
          ? 1
          : interpolate(scrollY.value, [0, 25], [1, 0], Extrapolation.CLAMP),
        // display: mainItm ? 'flex' : scrollY.value > 25 ? 'none' : 'flex',
        transform: [
          {
            translateX:
              idx === 1
                ? interpolate(
                    scrollY.value,
                    [0, 50],
                    [0, 5],
                    Extrapolation.CLAMP,
                  )
                : idx === 2
                ? interpolate(
                    scrollY.value,
                    [0, 50],
                    [0, -5],
                    Extrapolation.CLAMP,
                  )
                : 0,
          },
        ],
        marginHorizontal: interpolate(
          scrollY.value,
          [0, 50],
          [10, 0],
          Extrapolation.CLAMP,
        ),
      };
    });
    return (
      <Animated.View
        style={[
          itemViewStyle,
          {
            borderRadius: 80,

            borderWidth: 1,
          },
        ]}
        key={idx}
      />
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <Animated.ScrollView
        onScroll={handleScroll}
        
        contentContainerStyle={{
          paddingTop: BIG_HEADER,
        }}>
        {DATA.map((itm, idx) => (
          <View
            style={{
              height: 120,
              borderColor: 'rgba(0,0,0,0.1)',
              borderWidth: 1,
            }}
            key={idx}
          />
        ))}
      </Animated.ScrollView>
      <Animated.View
        style={[
          headerHeight,
          {
            borderWidth: 1,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            backgroundColor: '#fff',
            justifyContent: 'space-between',
          },
        ]}>
        <View style={{flex: 1}}></View>
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          contentContainerStyle={{
            alignItems: 'center',
          }}
          style={[
            scrollViewStyle,
            {
              borderWidth: 1,
              // flex: 1,
            },
          ]}>
          {DATA.map((itm, idx) => itemsCompo(idx))}
        </Animated.ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
});

export default AnimtedHeader;
