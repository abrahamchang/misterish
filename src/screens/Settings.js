import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import firebase from 'firebase'
import { StackActions, NavigationActions } from 'react-navigation';

class Settings extends Component {

    logOut() {
        firebase.auth().signOut();
        const resetItems = StackActions.reset({
            index: 0,
            actions: [{
                type: 'Navigation/INIT',
                routeName: 'Login'
                //AQUI ME FALTA ALGO PERO NO ME ACUERDO
            }]
        });
        this.props.navigation.dispatch(resetItems);
    }

    render() {
        const { ventanaStyle, buttonStyle } = styles;
        return (
            <View style={{ flex: 1 }}>
            <View style={ventanaStyle}>
                <Text style={{ color: 'white' }}>Vista en Desarrollo: Settings</Text>
            </View>

            <View style={ventanaStyle}>
                <TouchableOpacity style={buttonStyle} onPress={() => this.logOut()}>
                    <Text style={{ color: '#553285' }}>Logout</Text>
                </TouchableOpacity>
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
    buttonStyle: {
        width: '30%',
        height: '20%',
        backgroundColor: 'white',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
}

export default Settings;