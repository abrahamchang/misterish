import React, { Component } from 'react';
import { View, Text, Image, Button } from 'react-native';

class Developing extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTintColor: 'rgba(54,23,94,0.4)',
        headerTitle: (
            <View style={{ 
                alignSelf: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                justifyContent: 'center'
            }}>
                <Text style={{
                    fontSize: 18,
                    color: 'rgb(54,23,94)',
                    alignSelf: 'center'
                }}>
                    In Development
                </Text>
            </View>
        ),
        headerRight: <View />
    })
    
render() {
    const { ventanaStyle, rellenoStyle, contenedorTexto, logoStyle, textoStyle, contenedorImagen } = styles;

    return(
        <View style={ventanaStyle}>
        <View style={rellenoStyle}/>

        <View style={contenedorImagen}>
            <Image
                source={require('../assets/Developing.png')}
                style={logoStyle}
            />
        </View>

        <View style={contenedorTexto}>
            <Text style={textoStyle}>We're working on it. Hang tight!</Text>
        </View>

        <View style={rellenoStyle}/>
    </View>
    );}
}

const styles = {
    ventanaStyle: {
        backgroundColor: 'rgba(54,23,94,0.8)',
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
        fontSize: 20

    }
};

export default Developing;