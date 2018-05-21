import React from 'react';
import { View, Text, Image } from 'react-native';
import CardSection from './common/CardSection';


const MisteryDetail = ({ misterio }) => {

    //const { name, body } = misterio;
    const { ventanaStyle, contenedorImagen, contenedorTexto, imagenStyle, textoStyle } = style;

    return (
        <View style={ventanaStyle}>
            <View style={contenedorImagen}>
                <Image
                    source={require('../assets/LogoC.png')}
                    style={imagenStyle}
                />
            </View>
            <View style={contenedorTexto}>
                <Text style={textoStyle}>   El titulo del misterio</Text>
                <Text style={textoStyle}>66%</Text>
            </View>
        </View>
    );

};

const style = {
    ventanaStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        margin: '1%',
        width: '48%',
        aspectRatio: 1 / 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    contenedorImagen: {
        flex: 3,
        alignItems: 'center',
        marginTop: '10%'
    },
    contenedorTexto: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imagenStyle: {
        resizeMode: 'contain',
        flex: 1
    },
    textoStyle: {
        color: 'white',
        textAlign: 'center'
    }


}

export default MisteryDetail;