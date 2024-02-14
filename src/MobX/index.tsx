import React, {useState} from 'react';
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Observer} from 'mobx-react-lite';
import { personStore } from './store/store';

export default function () {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');

  return (
    <View style={styles.container}>
      <TextInput onChangeText={setName} style={styles.txtInput} />
      <TextInput onChangeText={setAge} style={styles.txtInput} />
      <Button
        title="Add"
        onPress={() => {
          const newID = Math.random().toString();
          personStore.addHero({name, age, id: newID});
        }}
      />
      <Observer>
        {() => (
          <FlatList
            data={personStore.personList}
            renderItem={({item, index}) => (
              <Pressable
                style={styles.box}
                onLongPress={() => personStore.deleteHero(item.id)}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.age}</Text>
              </Pressable>
            )}
          />
        )}
      </Observer>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    gap: 20,
  },
  txtInput: {
    color: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
  },
  text: {
    color: '#fff',
  },
  box: {
    paddingVertical: 10,
    marginVertical: 10,
  },
});
