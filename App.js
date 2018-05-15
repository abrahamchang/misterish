import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Carga from './src/screens/Carga';

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Carga />
      </View>
    );
  }
}


