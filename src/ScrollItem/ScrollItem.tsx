import {faker} from '@faker-js/faker';
import {MotiView, motify} from 'moti';
import * as React from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
  useAnimatedValue,
} from 'react-native';
const {width, height} = Dimensions.get('screen');

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.string.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.arrayElement([
      'men',
      'women',
    ])}/${faker.number.int(99)}.jpg`,
    name: faker.person.fullName(),
    jobTitle: faker.person.jobTitle(),
    email: faker.internet.email(),
  };
});

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
const BG_IMG =
  'https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&w=600';

const MotiFlatlist = motify(FlatList)();
export default () => {
  console.log(faker.helpers.arrayElement(['men', 'women']));
//   const scrollY = React.useRef(new Animated.Value(0)).current;

const scrollY = useAnimatedValue(0)
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <StatusBar hidden />
      <Image
        source={{uri: BG_IMG}}
        style={StyleSheet.absoluteFillObject}
        blurRadius={10}
      />
    
      <Animated.FlatList
        data={DATA}
        contentContainerStyle={{
          padding: SPACING,
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        renderItem={({item, index}) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
          const inputRangeTwo = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 0.5),
          ];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const opacity = scrollY.interpolate({
            inputRange:inputRangeTwo,
            outputRange: [1, 1, 1, 0],
          });
          console.log(scrollY)
          return (
            <Animated.View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: SPACING / 2,
                padding: SPACING,
                marginBottom: SPACING,
                borderRadius: SPACING,
                elevation: 4,
                shadowColor: '#000',
                backgroundColor: 'rgba(255,255,255,0.95)',
                transform: [{scale}],
                opacity:opacity
              }}>
              <Image
                source={{uri: `${item.image}`}}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                }}
              />
              <View
                style={{
                  flex: 1,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 18,
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: '#212121',
                    fontSize: 16,
                  }}>
                  {item.jobTitle}
                </Text>
                <Text
                  style={{
                    color: '#0099cc',
                    fontSize: 16,
                    fontStyle: 'italic',
                  }}>
                  {item.email}
                </Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};
