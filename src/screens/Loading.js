import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import firebase from 'firebase';
import { connect } from 'react-redux';
import config from '../../Keys';
import { sendData } from '../actions';

class Loading extends Component {
  
    getItem(item) {
        return firebase.database().ref(item).once("value");
    }
     dataLength(result){
        const params = result;
        const keys = Object.keys(params);
        const data = [];
        keys.forEach((key) => {
            data.push(params[key]);
        });
        return new Promise((resolve) => {
            resolve(data.length);
        });
    }

    async componentDidMount() {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        this.getItem('/misteryMetadata').then( (result) => {            //aca solicita todos los misterios
            this.dataLength(result).then(  async (size) => {                  //cuento cuantos son exitosamente
                firebase.database().ref('misteryOfTheDay').once('value').then((result) => {
                    if (result) {
                        var mistID = result.child('id').val();
                        var mistDate = result.child('date').val().toString();
                        var today = new Date();
                        today = today.toISOString().substring(0, 10);
                        if (mistDate === today) {
                            console.log('aquí');
                            this.props.sendData('mystery_of_the_day', mistID);
                        } else {
                            console.log('allá');    
                            var newID = Math.floor((Math.random() * size));
                            firebase.database().ref('/misteryOfTheDay').set({
                                date: today,
                                id: newID
                            });
                            this.props.sendData('mystery_of_the_day', newID);
                        }
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
            }).catch(err => {
                console.log('aqui si '+err);
            });

            firebase.auth().onAuthStateChanged((user) => {
                if (user !== null) {
                    firebase.database().ref(`/users/${user.uid}`).once('value').then((response) => {
                        let datos = {
                            params: result.val(),
                            user: response.val(),
                            
                        };
                        const resetAction = StackActions.reset({
                           index: 0,
                           actions: [NavigationActions.navigate({ routeName: 'Root'})]
                        });
                        this.props.sendData('data_load', datos);
                        this.props.navigation.dispatch(resetAction);
                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    let datos = {
                        params: result.val(),
                        user: null
                    };
                    const resetAction = StackActions.reset({
                       index: 0,
                       actions: [NavigationActions.navigate({ routeName: 'Login' })]
                    });
                    this.props.sendData('data_load', datos);
                    this.props.navigation.dispatch(resetAction);
                }
            });
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

export default connect(null, { sendData })(Loading);