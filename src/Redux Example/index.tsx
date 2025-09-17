import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React, { memo, useEffect, useState } from 'react';
import {
  BackHandler,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { Text, View } from 'moti';
import ReduxCart from './ReduxCart';

const data = [
  {
    id: 1,
    text: 'Redux Cart',
  },
  {
    id: 2,
    text: 'Redux Auth',
  },
 
];

export default function (): React.JSX.Element {
  const [screenIndex, setScreenIndex] = useState(0);


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
  ({
    onPress,
    text,
    color,
  }: {
    onPress: () => void;
    text: string;
    color: string;
  }) => (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={[styles.buttonTxt, { color }]}>{text}</Text>
    </Pressable>
  ),
);

const ListDisp = memo(({ onPress }: { onPress: (id: number) => void }) => {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <View style={{ flex: 1, backgroundColor: darkMode ? '#000' : '#fff' }}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        renderItem={({ item, index }) => (
          <ListDispItem
            key={index}
            onPress={() => onPress(item.id)}
            text={item.text}
            color={darkMode ? '#dcdcdc' : '#212121'}
          />
        )}
      />
    </View>
  );
});

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
        return <ReduxCart />;
      case 2:
        return <ReduxCart />;
   
      default:
        return <ListDisp onPress={onPress} />;
    }
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  seperator: {
    borderBottomWidth: 0.9,
    borderColor: '#eeeeee',
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  buttonTxt: {
    fontSize: 18,
  },
});

