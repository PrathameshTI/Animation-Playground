import {MotiView, useAnimationState} from 'moti';
import React, {useState} from 'react';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import switchTheme from 'react-native-theme-switch-animation';

export default function ({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}) {
  const onThemeChange = (e: any) => {
    e.currentTarget.measure(
      (
        x1: number,
        y1: number,
        width: number,
        height: number,
        px: number,
        py: number,
      ) => {
        switchTheme({
          switchThemeFunction: () => {
            setDarkMode(!darkMode);
          },
          animationConfig: {
            type: 'circular',
            duration: 900,
            startingPoint: {
              cy: StatusBar.currentHeight
                ? py + height / 2 + StatusBar.currentHeight
                : py + height / 2,
              cx: px + width / 2,
            },
          },
        });
      },
    );
  };
  return (
    <View
      style={[styles.header, {backgroundColor: darkMode ? '#000' : '#fff'}]}>
      <StatusBar
        backgroundColor={darkMode ? '#000' : '#fff'}
        barStyle={darkMode ? 'light-content' : 'dark-content'}
      />
      <View></View>
      <View>
        <TouchableOpacity onPress={onThemeChange}>
          <Switch isOn={darkMode} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const Switch = ({isOn}: {isOn: boolean}) => {
  return (
    <MotiView
      style={{
        margin: 10,
        borderRadius: 30,
        width: 30,
        height: 30,
      }}
      from={{
        backgroundColor: isOn ? '#454545' : '#dcdcdc',
      }}
      animate={{
        backgroundColor: isOn ? '#dcdcdc' : '#454545',
      }}
      transition={{
        type: 'timing',
        duration: 300,
      }}></MotiView>
  );
};
const styles = StyleSheet.create({
  header: {
    // height: 60,
    borderBottomWidth: 1,
    elevation: 4,
    marginBottom: 10,
    borderColor: '#eeeeee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
