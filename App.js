import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InDevelopment from './src/components/issues/InDevelopment';

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <InDevelopment />
      </View>
    );
  }
}


