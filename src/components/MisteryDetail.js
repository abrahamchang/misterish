import React from 'react';
import { View, Text, Image } from 'react-native';
import CardSection from './common/CardSection';


const MisteryDetail = ({ misterio }) => {

    const { name, body } = misterio;
    const { contenedorImagen, contenedorHeader, imagenStyle, tituloStyle, descripcionStyle } = style;

    return (
        <View style={{ padding: 5 }}>
            <CardSection>
                <View style={contenedorImagen}>
                    <Image 
                    style={imagenStyle}
                    source={require('../assets/gatito.png')}
                    />
                </View>

                <View style={contenedorHeader}>
                    <Text style={tituloStyle}>
                        Misterio titulo misterio
                    </Text>
                    <Text style={descripcionStyle}>
                        Descripcion del misterio descripcion del misterio.
                    </Text>
                </View>
            </CardSection>
        </View>
    );

};

const style = {
    contenedorImagen: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    contenedorHeader: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    imagenStyle: {
        height: 60,
        width: 60
    },
    tituloStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'notoserif'

    },
    descripcionStyle: {
        fontSize: 12,
        color: 'white',
        fontFamily: 'notoserif'
    }
}

export default MisteryDetail;