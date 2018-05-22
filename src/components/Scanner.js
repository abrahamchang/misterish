import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Scanner extends Component {
  state = {
      cameraPermission: null
  };

  async componentWillMount() {
    console.log(this.props);
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ cameraPermission: status === 'granted' });
  }

  render() {
    const { cameraPermission } = this.state;

    if (cameraPermission === null) {
      return ()
    }
  }

}