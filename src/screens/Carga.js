import React from 'react';
import { View, Text, Image } from 'react-native';
import firebase from 'firebase';

const Carga = () => {
    const config = {
        apiKey: "AIzaSyCwzC4NGYv4QuOb6lMtFI1NNFIfR0N4L8E",
        authDomain: "misterish-2078a.firebaseapp.com",
        databaseURL: "https://misterish-2078a.firebaseio.com",
        projectId: "misterish-2078a",
        storageBucket: "misterish-2078a.appspot.com",
        messagingSenderId: "963406820616"
    };
    firebase.initializeApp(config);

    return(
        <View style={styles.contenedorStyle}>
            <Image source={require('../assets/icons8-trabajador-con-barricada-filled-100.png')} />
            <Text style={styles.tituloStyle}>Misterish</Text>
            <Text style={styles.subtituloStyle}>Disculpe. Estamos trabajando para usted, vuelva pronto.</Text>
        </View>
    );
};

const styles = {
    tituloStyle: {
        color: 'white',
        fontSize: 30,
        borderWidth: 10,
        borderColor: 'transparent',
        textAlign: 'center',
        textAlignVertical: 'bottom'
    },
    subtituloStyle: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center'
    },
    contenedorStyle: {
        backgroundColor: '#381e61',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
};

export default Carga;