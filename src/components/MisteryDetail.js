import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import FlipCard from 'react-native-flip-card';

const MisteryDetail = ({ imageURL, name, description, difficulty, userID, reviews, onPress }) => {
    const { ventanaStyle, faceStyle, backStyle, contenedorImagen, contenedorTexto, imagenStyle, textoStyle, contenedorBoton, textoBoton } = styles;

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
                            source={{ uri: imageURL }}
                            style={imagenStyle}
                        />
                    </View>
                    <View style={contenedorTexto}>
                        <Text style={textoStyle}>{name}</Text>
                    </View>
                </View>
                <View style={backStyle}>
                    <Text style={textoStyle}>{name}</Text>
                    <Text style={textoStyle}>{description}</Text>
                    <Text style={textoStyle}>Difficulty: {difficulty}</Text>
                    <Text style={textoStyle}>Author: {userID}</Text>
                    <Text style={textoStyle}>Reviews: {reviews}</Text>
                    <TouchableOpacity onPress={onPress} style={contenedorBoton}>
                        <Text style={textoBoton}>Play!</Text>
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
        marginTop: '7%'
    },
    contenedorTexto: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%'
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
};

export default MisteryDetail;