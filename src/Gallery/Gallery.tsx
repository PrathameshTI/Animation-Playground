import React, {useState, useRef, useEffect, Component} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnUI,
  useAnimatedGestureHandler,
  interpolate,
  Extrapolation,
  withTiming,
  Easing,
  runOnJS,
  SharedValue,
} from 'react-native-reanimated';
import {Dimensions, StyleSheet, View, Image, Platform} from 'react-native';
import {
  ScrollView,
  PanGestureHandler,
  TouchableWithoutFeedback,
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const dimensions = Dimensions.get('window');
const GUTTER_WIDTH = 3;
const NUMBER_OF_IMAGES = 4;
const IMAGE_SIZE =
  (dimensions.width - GUTTER_WIDTH * (NUMBER_OF_IMAGES - 1)) / NUMBER_OF_IMAGES;

type ExampleImage = {
  uri: string;
  width: number;
  height: number;
};

type ActiveExampleImage = {
  // @ts-ignore: FIXME AnimatedImage type
  // animatedRef: RefObject<ActiveExampleImage>;
  item: ExampleImage;
  width: number;
  height: number;
  x: number;
  y: number;
  targetHeight: number;
  targetWidth: number;
  sv: Animated.SharedValue<number>;
};

type onItemPressFn = (
  imageRef: React.MutableRefObject<Component>,
  item: ExampleImage,
  sv: Animated.SharedValue<number>,
) => void;

type ImageListProps = {
  images: ExampleImage[];
  onItemPress: onItemPressFn;
};

function ImageList({images, onItemPress}: ImageListProps) {
  const IMAGE_SIZE_NEW =
    (dimensions.width - GUTTER_WIDTH * (NUMBER_OF_IMAGES - 1)) /
    NUMBER_OF_IMAGES;
  const ImageWidth = useSharedValue(IMAGE_SIZE_NEW);

  const pinchGesture = Gesture.Pinch()
    .onUpdate(e => {
      //   console.log(e.scale);
      //   scale.value = savedScale.value * e.scale;
      //   (dimensions.width - GUTTER_WIDTH * (NUMBER_OF_IMAGES - 1)) /
      //   NUMBER_OF_IMAGES;
      if (e.scale > 1) {
        if (ImageWidth.value < dimensions.width)
          ImageWidth.value = ImageWidth.value + e.scale * 2;
      } else {
        if (ImageWidth.value > dimensions.width * 0.2)
          ImageWidth.value = ImageWidth.value - e.scale * 4;
      }
    })
    .onEnd(() => {
      //   savedScale.value = scale.value;
    });

  return (
    <GestureDetector gesture={pinchGesture}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {images.map((item, i) => (
          <ListItem
            onPress={onItemPress}
            key={i}
            index={i}
            imageSize={ImageWidth}
            item={item}
          />
        ))}
      </ScrollView>
      {/* <Animated.FlatList
        // numColumns={3}
        data={images}
        renderItem={({item, index}) => (
          <ListItem
            onPress={onItemPress}
            key={index}
            index={index}
            imageSize={ImageWidth}
            item={item}
          />
        )}
      /> */}
    </GestureDetector>
  );
}

type ListItemProps = {
  item: ExampleImage;
  imageSize: SharedValue<number>;
  index: number;
  onPress: onItemPressFn;
};
function ListItem({item, imageSize, index, onPress}: ListItemProps) {
  // @ts-ignore FIXME)TS) createAnimatedComponent type
  const ref = useRef<AnimatedImage>();
  const opacity = useSharedValue(1);

  const containerStyle = {
    marginRight: (index + 1) % 4 === 0 ? 0 : GUTTER_WIDTH,
    marginBottom: GUTTER_WIDTH,
  };

  const styles = useAnimatedStyle(() => {

    return {
      width: imageSize.value,
      height: imageSize.value,
      marginBottom:
        // (dimensions.width -
        //   Math.floor(dimensions.width / imageSize.value) * imageSize.value) /
        //   (Math.floor(dimensions.width / imageSize.value) +
        //     GUTTER_WIDTH * Math.floor(dimensions.width / imageSize.value)) >
        // 45
        //   ? 45
        //   : 
      (    (dimensions.width -
              Math.floor(dimensions.width / imageSize.value) *
                imageSize.value) /
            (Math.floor(dimensions.width / imageSize.value) 
            // +
            //   GUTTER_WIDTH * Math.floor(dimensions.width / imageSize.value)
              ))- GUTTER_WIDTH ,

      opacity: opacity.value,
    };
  });

  return (
    <TouchableWithoutFeedback
      style={containerStyle}
      onPress={() => onPress(ref, item, opacity)}>
      <AnimatedImage ref={ref} source={{uri: item.uri}} style={styles} />
    </TouchableWithoutFeedback>
  );
}

const timingConfig = {
  duration: 350,
  easing: Easing.bezierFn(0.33, 0.01, 0, 1),
};

type ImageTransitionProps = {
  activeImage: ActiveExampleImage;
  onClose: () => void;
};
function ImageTransition({activeImage, onClose}: ImageTransitionProps) {
  const {
    x,
    item,
    width,
    height,
    targetWidth,
    targetHeight,
    sv: imageOpacity,
  } = activeImage;
  const {uri} = item;

  const headerHeight = 55;
  const y = activeImage.y - headerHeight;

  const animationProgress = useSharedValue(0);

  const backdropOpacity = useSharedValue(0);
  const scale = useSharedValue(1);

  const targetX = useSharedValue(0);
  const targetY = useSharedValue(
    (dimensions.height - targetHeight) / 2 - headerHeight,
  );

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onPan = useAnimatedGestureHandler({
    onActive: event => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;

      scale.value = interpolate(
        translateY.value,
        [-200, 0, 200],
        [0.65, 1, 0.65],
        Extrapolation.CLAMP,
      );

      backdropOpacity.value = interpolate(
        translateY.value,
        [-100, 0, 100],
        [0, 1, 0],
        Extrapolation.CLAMP,
      );
    },

    onEnd: () => {
      if (Math.abs(translateY.value) > 40) {
        targetX.value = translateX.value - targetX.value * -1;
        targetY.value = translateY.value - targetY.value * -1;

        translateX.value = 0;
        translateY.value = 0;

        animationProgress.value = withTiming(0, timingConfig, () => {
          imageOpacity.value = 1;
          runOnJS(onClose)();
        });

        backdropOpacity.value = withTiming(0, timingConfig);
      } else {
        backdropOpacity.value = withTiming(1, timingConfig);
        translateX.value = withTiming(0, timingConfig);
        translateY.value = withTiming(0, timingConfig);
      }

      scale.value = withTiming(1, timingConfig);
    },
  });

  const imageStyles = useAnimatedStyle(() => {
    const interpolateProgress = (range: [number, number]) =>
      interpolate(animationProgress.value, [0, 1], range, Extrapolation.CLAMP);

    const top = translateY.value + interpolateProgress([y, targetY.value]);
    const left = translateX.value + interpolateProgress([x, targetX.value]);

    return {
      position: 'absolute',
      top,
      left,
      width: interpolateProgress([width, targetWidth]),
      height: interpolateProgress([height, targetHeight]),
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });

  const backdropStyles = useAnimatedStyle(() => {
    return {
      opacity: backdropOpacity.value,
    };
  });

  useEffect(() => {
    runOnUI(() => {
      animationProgress.value = withTiming(1, timingConfig, () => {
        imageOpacity.value = 0;
      });
      backdropOpacity.value = withTiming(1, timingConfig);
    })();
  }, [animationProgress, backdropOpacity, imageOpacity]);

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <Animated.View style={[styles.backdrop, backdropStyles]} />
      <PanGestureHandler onGestureEvent={onPan}>
        <Animated.View style={StyleSheet.absoluteFillObject}>
          <AnimatedImage source={{uri}} style={imageStyles} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const images: ExampleImage[] = Array.from({length: 30}, (_, index) => {
  return {
    uri: `https://picsum.photos/id/${index + 10}/400/400`,
    width: dimensions.width,
    height: 400,
  };
});

export default function () {
  const [activeImage, setActiveImage] = useState<ActiveExampleImage | null>(
    null,
  );

  function onItemPress(
    imageRef: React.MutableRefObject<Component>,
    item: ExampleImage,
    sv: Animated.SharedValue<number>,
  ) {
    imageRef.current?.measure?.((_x, _y, width, height, pageX, pageY) => {
      if (width === 0 && height === 0) {
        return;
      }

      const targetWidth = dimensions.width;
      const scaleFactor = item.width / targetWidth;
      const targetHeight = item.height / scaleFactor;

      setActiveImage({
        item,
        width,
        height,
        x: pageX,
        y: pageY,
        targetHeight,
        targetWidth,
        sv,
      });
    });
  }

  function onClose() {
    setActiveImage(null);
  }

  const headerHeight = 55;
  const height =
    Platform.OS === 'web' ? dimensions.height - headerHeight : undefined;

  return (
    <View
      style={[
        styles.container,
        // {height}
      ]}>
      <GestureHandlerRootView style={{flex: 1}}>
        <ImageList onItemPress={onItemPress} images={images} />
        {activeImage && (
          <ImageTransition onClose={onClose} activeImage={activeImage} />
        )}
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    backgroundColor: '#fff',
    flex: 1,
  },

  scrollContainer: {
    flexDirection: 'row',
    justifyContent:'space-evenly',
    flexWrap: 'wrap',
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
});
