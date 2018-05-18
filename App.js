import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Router } from "./Router";

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Router />
      </View>
    );
  }
}
