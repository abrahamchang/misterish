import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const MenuBar = () => {

    const { ventanaStyle, contenedorBoton, botonesStyle } = styles;

    return (
        <View style={ventanaStyle}>
            <TouchableOpacity style={contenedorBoton}>
                <Image style={botonesStyle} source={require('../assets/id-cardButton.png')} />
            </TouchableOpacity>

            <TouchableOpacity style={contenedorBoton}>
                <Image style={botonesStyle} source={require('../assets/homeButton.png')} />
            </TouchableOpacity>

            <TouchableOpacity style={contenedorBoton}>
                <Image style={botonesStyle} source={require('../assets/settingsButton.png')} />
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    botonesStyle: {
        resizeMode: 'contain', 
        flex: 1
    },
    contenedorBoton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12
    },
    ventanaStyle: {
        backgroundColor: '#715696',
        height: 65,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'absolute',
        flexDirection: 'row',
        bottom: 0,
        left: 0,
        right: 0
    }
};

export default MenuBar;