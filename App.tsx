import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React, {memo, useEffect, useState} from 'react';
import {
  BackHandler,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import GalleryView from './GalleryView';
import {Text, View} from 'moti';
import ScrollItem from './ScrollItem';
import InputView from './InputView';
import WifiLoader from './WifiLoader';
import AnimatedChat from './AnimatedChat';
import AnimatedTimer from './AnimatedTimer';
import BlurFocus from './BlurFocus';
import AnimtedHeader from './AnimtedHeader';
import ScratchCard from './ScratchCard/ScratchCard';
import ColorSwatch from './colorSwatch';
import Gallery from './Gallery';
import ParallaxEffect from './ParallaxEffect';

const data = [
  {
    id: 1,
    text: 'Gallery View Horizontal',
  },
  {
    id: 2,
    text: 'Scroll Item animation effect',
  },
  {
    id: 3,
    text: 'Input View [Test]',
  },
  {
    id: 4,
    text: 'Wifi Loader',
  },
  {
    id: 5,
    text: 'Animated Chat',
  },
  {
    id: 6,
    text: 'Animated Timer',
  },
  {
    id: 7,
    text: 'Blur Focus',
  },
  {
    id: 8,
    text: 'AnimtedHeader',
  },
  {
    id: 9,
    text: 'ScratchCard',
  },
  {
    id: 10,
    text: 'ColorSwatch',
  },
  {
    id: 11,
    text: 'Gallery',
  },
  {
    id: 12,
    text: 'ParallaxEffect',
  },
];

function App(): React.JSX.Element {
  const [screenIndex, setScreenIndex] = useState(0);
  useEffect(() => {
    const backAction = () => {
      if (screenIndex === 0) {
        BackHandler.exitApp();
      } else {
        setScreenIndex(0);
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [screenIndex]);

  return (
    <SafeAreaView style={styles.container}>
      <DisplayView
        screenIndex={screenIndex}
        onPress={(id: number) => setScreenIndex(id)}
      />
    </SafeAreaView>
  );
}
const ListDispItem = memo(
  ({onPress, text}: {onPress: () => void; text: string}) => (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.buttonTxt}>{text}</Text>
    </Pressable>
  ),
);

const ListDisp = memo(({onPress}: {onPress: (id: number) => void}) => (
  <View>
    <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />
    <View style={styles.header}></View>
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={() => <View style={styles.seperator} />}
      renderItem={({item, index}) => (
        <ListDispItem
          key={index}
          onPress={() => onPress(item.id)}
          text={item.text}
        />
      )}
    />
  </View>
));

const DisplayView = memo(
  ({
    screenIndex,
    onPress,
  }: {
    screenIndex: number;
    onPress: (id: number) => void;
  }) => {
    switch (screenIndex) {
      case 0:
        return <ListDisp onPress={onPress} />;
      case 1:
        return <GalleryView />;
      case 2:
        return <ScrollItem />;
      case 3:
        return <InputView />;
      case 4:
        return <WifiLoader />;
      case 5:
        return <AnimatedChat />;
      case 6:
        return <AnimatedTimer />;
      case 7:
        return <BlurFocus />;
      case 8:
        return <AnimtedHeader />;
      case 9:
        return <ScratchCard />;
      case 10:
        return <ColorSwatch />;
      case 11:
        return <Gallery />;
      case 12:
        return <ParallaxEffect />;
      default:
        return <ListDisp onPress={onPress} />;
    }
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    height: 60,
    borderBottomWidth: 1,
    elevation: 4,
    backgroundColor: '#000',
    marginBottom: 10,
    borderColor: '#eeeeee',
  },
  seperator: {
    borderBottomWidth: 0.9,
    borderColor: '#eeeeee',
  },
  button: {
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  buttonTxt: {
    color: '#dcdcdc',
    fontSize: 18,
  },
});

export default App;
