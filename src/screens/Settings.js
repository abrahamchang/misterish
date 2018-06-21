import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import firebase from 'firebase'
import { StackActions, NavigationActions } from 'react-navigation';

class Settings extends Component {


    render() {
        const { ventanaStyle } = styles;
        return (
            <View style={{ flex: 1 }}>
                <View style={ventanaStyle}>
                    <Text style={{ color: 'white' }}>Vista en Desarrollo: Settings</Text>
                </View>
            </View>
        );
    }

}

const styles = {
    ventanaStyle: {
        flex: 1,
        backgroundColor: '#553285',
        alignItems: 'center',
        justifyContent: 'center'
    },
}

export default Settings;