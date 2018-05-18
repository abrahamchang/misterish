import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const Header = ({ tituloHeader }) => {
    const { ventanaStyle, textoStyle, contenedorBoton, botonesStyle } = styles;
    return (
        <View style={ventanaStyle}>
            <TouchableOpacity style={contenedorBoton}>
                <Image style={botonesStyle} source={require('../assets/refresh.png')}/>
            </TouchableOpacity>

            <View>
                <Text style={textoStyle}>{tituloHeader}</Text>
            </View>

            <TouchableOpacity style={contenedorBoton}>
                <Image style={botonesStyle} source={require('../assets/search.png')} />
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    botonesStyle: {
        resizeMode: 'contain', 
        flex: 1
    },
    ventanaStyle: {
        backgroundColor: '#36175E',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 65,
        paddingTop: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative',
        flexDirection: 'row'
    },
    textoStyle: {
        fontSize: 20,
        color: 'white'
    },
    contenedorBoton: {
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12
    }

};

export default Header;