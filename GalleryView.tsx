import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {Image, Text, View} from 'moti';
const {width, height} = Dimensions.get('screen');

const API_KEY = 'hb5ajziuIZ3xwT0O2evLM2CpMGTpV6WXSwZSBdRTmOXQ9FpQS1BGYQUR';
const API_URL =
  'https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20';
const IMAGESIZE = 80;
const SPACING = 10;

const fetchImagesfromPexes = async () => {
  const data = await fetch(API_URL, {
    headers: {
      Authorization: API_KEY,
    },
  });
  const {photos} = await data.json();
  return photos;
};

function GalleryView(): React.JSX.Element {
  const [images, setImages] = useState(null);
  const [indexIndex, setIndex] = useState(0);
  const topRef = useRef<FlatList>(null);

  const thumbRef = useRef<FlatList>(null);
  useEffect(() => {
    const fetchImages = async () => {
      const images = await fetchImagesfromPexes();
      //   console.log(images)
      setImages(images);
    };
    fetchImages();
  }, []);

  const setActiveIndex = (index: number) => {
    console.log('index', index);
    setIndex(index);
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    if (index * (IMAGESIZE + SPACING) - IMAGESIZE / 2 > width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (IMAGESIZE + SPACING) - width / 2 + IMAGESIZE / 2,
        animated: true,
      });
    } else {
      thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };
  if (!images) {
    return <Text style={{color: '#000', fontSize: 34}}>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
   
      <FlatList
        ref={topRef}
        data={images}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={ev => {
          setActiveIndex(Math.round(ev.nativeEvent.contentOffset.x / width));
        }}
        renderItem={({item}) => {
          return (
            <View style={{width, height}}>
              <Image
                source={{uri: item.src.portrait}}
                style={[StyleSheet.absoluteFillObject]}
              />
            </View>
          );
        }}
      />

      <FlatList
        ref={thumbRef}
        data={images}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          position: 'absolute',
          bottom: 80,
          left: SPACING,
          right: SPACING,
        }}
        contentContainerStyle={{
          gap: SPACING,
        }}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setActiveIndex(index);
                // topRef.current.
              }}>
              <Image
                source={{uri: item.src.portrait}}
                style={{
                  width: IMAGESIZE,
                  height: IMAGESIZE,
                  borderRadius: SPACING,
                  borderWidth: 2,
                  borderColor: index === indexIndex ? '#fff' : 'transparent',
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GalleryView;
