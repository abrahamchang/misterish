import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import firebase from 'firebase'
import config from '../../Keys'


class Loading extends Component {
  
    getItem(item) {
        return firebase.database().ref(item).once("value");
    }

    componentDidMount() {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        this.getItem('/misteryMetadata').then((result) => {
            const datos = result.val();
            firebase.auth().onAuthStateChanged((user) => {
                if (/*user !== null*/ false) {
                    const resetAction = StackActions.reset({
                       index: 0,
                       actions: [NavigationActions.navigate({ routeName: 'Root', params: datos })]
                    });
                    this.props.navigation.dispatch(resetAction);
                } else {
                    const resetAction = StackActions.reset({
                       index: 0,
                       actions: [NavigationActions.navigate({ routeName: 'Login', params: datos })]
                    });
                    this.props.navigation.dispatch(resetAction);
                }
            })
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        const { ventanaStyle, rellenoStyle, contenedorTexto, logoStyle, textoStyle, contenedorImagen } = styles;

        return (
            <View style={ventanaStyle}>
                <View style={rellenoStyle} />

                <View style={contenedorImagen}>
                    <Image
                        source={require('../assets/LogoC.png')}
                        style={logoStyle}
                    />
                </View>

                <View style={contenedorTexto}>
                    <Text style={textoStyle}>Misterish</Text>
                </View>

                <View style={rellenoStyle} />
            </View>
        );
    }
}

const styles = {
    ventanaStyle: {
        backgroundColor: '#36175E',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'

    },
    rellenoStyle: {
        flex: 1
    },
    logoStyle: {
        resizeMode: 'contain',
        flex: 1
    },
    contenedorImagen: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    contenedorTexto: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1

    },
    textoStyle: {
        color: 'white',
        fontSize: 36

    }
};

export default Loading;