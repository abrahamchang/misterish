import React from 'react';
import { View, Text, Image } from 'react-native';

import firebase from 'firebase';
import config from '../../Keys';

const Carga = () => {

    const { ventanaStyle, logoStyle, contenedorImagen, contenedorTexto, textoStyle, rellenoStyle } = styles;

    firebase.initializeApp(config);

    return (
        <View style={ventanaStyle}>
            <View style={rellenoStyle} />
            
            <View style={contenedorImagen}>
                <Image
                    source={require('../assets/Logo.png')}
                    style={logoStyle}
                />
            </View>

            <View style={contenedorTexto}>
                <Text style={textoStyle}>Misterish</Text>
            </View>

            <View style={rellenoStyle} />
        </View>
    );
};

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

export default Carga;