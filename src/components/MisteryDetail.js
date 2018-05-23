import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import FlipCard from 'react-native-flip-card';

const MisteryDetail = () => {

    const { ventanaStyle, faceStyle, backStyle, contenedorImagen, contenedorTexto, imagenStyle, textoStyle, contenedorBoton, textoBoton } = styles;

    const misterio = {
        name: 'Titulo del Misterio',
        description: 'Esta es una descripcion del misterio, tengo sueño.',
        dificulty: 'Normal',
        imageURL: 'https://pm1.narvii.com/6741/6d81eba0d86186404e6c92a54954478233775dd5v2_128.jpg',
        userID: 'UserID',
        reviews: '100'
    };

    return (
        <View style={ventanaStyle}>
            <FlipCard
                friction={20}
                perspective={2000}
                flipHorizontal={true}
                flipVertical={false}
            >
                <View style={faceStyle}>
                    <View style={contenedorImagen}>
                        <Image
                            source={{ uri: misterio.imageURL }}
                            style={imagenStyle}
                        />
                    </View>
                    <View style={contenedorTexto}>
                        <Text style={textoStyle}>{misterio.name}</Text>
                    </View>
                </View>
                <View style={backStyle}>
                    <Text style={textoStyle}>{misterio.name}</Text>
                    <Text style={textoStyle}>{misterio.description}</Text>
                    <Text style={textoStyle}>Dificultad: {misterio.dificulty}</Text>
                    <Text style={textoStyle}>Autor: {misterio.userID}</Text>
                    <Text style={textoStyle}>Reviews: {misterio.reviews}</Text>
                    <TouchableOpacity style={contenedorBoton}>
                        <Text style={textoBoton}>¡Resolver!</Text>
                    </TouchableOpacity>
                </View>
            </FlipCard>
        </View>
    );
};

const styles = {
    contenedorImagen: {
        flex: 3,
        alignItems: 'center',
        marginTop: '10%'
    },
    contenedorTexto: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagenStyle: {
        resizeMode: 'contain',
        flex: 1,
        width: '100%',
        height: '100%'
    },
    textoStyle: {
        color: 'white',
        textAlign: 'center'
    },
    ventanaStyle: {
        width: '48%',
        margin: '1%',
    },
    faceStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        aspectRatio: 1 / 1,
        padding: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    backStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        aspectRatio: 1 / 1,
        padding: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contenedorBoton: {
        alignSelf: 'stretch',
        backgroundColor: '#36175E',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        marginLeft: 5,
        marginRight: 5
    },
    textoBoton: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }

}

export default MisteryDetail;