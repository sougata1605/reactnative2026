
import { useState } from 'react';

import {
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

const Index = () => {

  const [text, onChangeText] = useState('');
  const [number, onChangeNumber] = useState('');

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Subhas Chandra Chatterjee
      </Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Enter your name"
      />

      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Enter your number"
        keyboardType="numeric"
      />

      <Text style={styles.result}>
        Your name: {text}
      </Text>

      <Text style={styles.result}>
        Your number: {number}
      </Text>

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    height: 45,
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    borderRadius: 8,
  },

  result: {
    fontSize: 16,
    marginTop: 10,
  },

});

export default Index;
