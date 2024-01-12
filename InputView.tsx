import {ScrollView, Text, View} from 'moti';
import {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Keyboard,
  StatusBar,
  TextInput,
} from 'react-native';
import {useAnimatedKeyboard, useAnimatedStyle} from 'react-native-reanimated';
import {DATA} from './DATA';
const {height, width} = Dimensions.get('screen');

export default function () {
  const [ipFocused, setIpFocused] = useState(false);
  const [search, setSearch] = useState('');
  const focusclose = () => setIpFocused(false);
  const focusopen = () => setIpFocused(true);

  const searchData = DATA;
  return (
    <ScrollView
      keyboardDismissMode="interactive"
      style={{
        flex: 1,
        backgroundColor: '#efefef',
      }}
      contentContainerStyle={{
        flex: 1,
      }}>
      <StatusBar backgroundColor={'#efefef'} barStyle={'dark-content'} />
      <View
        from={{
          translateY: ipFocused ? 0 : 40,
        }}
        animate={{
          translateY: ipFocused ? 40 : 0,
        }}>
        <View
          style={[
            {
              borderRadius: 100,
              borderWidth: 1,
              borderColor: '#eeeeee',
              backgroundColor: '#fff',
              margin: 15,
              elevation: 3,
              shadowColor: '#000',
              paddingHorizontal: 12,
              height: 60,
            },
          ]}>
          <TextInput
            onFocus={focusopen}
            onBlur={focusclose}
            defaultValue={search}
            onChangeText={setSearch}
          />
        </View>
        <FlatList
          data={searchData.filter(itm => itm.first_name.includes(search))}
          style={{
            backgroundColor: '#fff',
            marginHorizontal: 15,
            height: height - 200,
          }}
          renderItem={({item, index}) => (
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 15,
                borderColor: '#eeeeee',
                borderBottomWidth: 0.5,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                }}>
                {item.first_name}
              </Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}
