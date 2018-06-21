import React, { Component } from 'react';
import { ActivityIndicator, Image, Text, TextInput, View } from 'react-native';
import firebase from 'firebase';

import Button from '../components/common/Button';

class Register extends Component {
    state = {
        email: '',
        password: '',
        verificacionPassword: '',
        cargando: false,
        emailError: false,
        passwordError: false,
        errorText: ''
    };

    underlineColorEmail() {
        return this.state.emailError ? 'red' : '#36175E';
    }

    underlineColorPassword() {
        return this.state.passwordError ? 'red' : '#36175E';
    }

    loadOrButton() {
        return this.state.cargando ? <ActivityIndicator size="large" color='#36175E' /> : <Button onPress={this.onPressSubmit.bind(this)}>Submit</Button>
    }

    onPressSubmit() {
        this.setState({ cargando: true });
        if (this.state.password === this.state.verificacionPassword && this.state.password.length > 5) {
            firebase.auth().createUserWithEmailAndPassword(this.state.email.toLowerCase(), this.state.password)
                .then((authUser) => {
                    const { email, uid } = authUser.user;
                    firebase.database()
                        .ref(`users/${uid}`)
                        .set({
                            userID: uid,
                            username: 'Abraham98',
                            description: 'Espera lo mejor, preparate para lo peor y acepta lo que venga',
                            email: email,
                            lvl: '0',
                            fndList: {
                                userID: [
                                    {
                                        id: ''
                                    }
                                ]
                            },
                            mstrList: {
                                id: [
                                    {
                                        id: ''
                                    }
                                ]
                            },
                            playingList: {
                                completedMysteries: [
                                    {
                                        id: ''
                                    }
                                ],
                                unfinishedMysteries: [
                                    {
                                        id: '',
                                        clueIndex: 0
                                    }
                                ]
                            },
                            playingList: {
                                completedMysteries: '',
                                unfinishedMysteries: ''
                            }
                        }).then(() => {
                            this.props.navigation.goBack(null);                            
                        });
                    this.props.navigation.goBack(null);
                })
                .catch(() => {
                    this.setState({ errorText: 'Invalid email address', emailError: true, cargando: false });
                });
        } else {
            if (this.state.password === this.state.verificacionPassword) {
                this.setState({
                    cargando: false,
                    passwordError: true,
                    errorText: 'Passwords Don\'t Match'
                });
            } else {
                this.setState({
                    cargando: false,
                    passwordError: true,
                    errorText: 'Passwords Is Too Short'
                });
            }
        }
    }

    errorText() {
        if (this.state.emailError || this.state.passwordError) {
            return (
                <View style={{ height: '10%' }}>
                    <Text style={styles.errorText}>{this.state.errorText}</Text>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={{ height: '100%', width: '100%' }}>
                <View style={{ height: '10%' }} />
                <View style={styles.contenedorImagen}>
                    <Image
                        source={require('../assets/LogoC.png')}
                        style={styles.logoStyle}
                    />
                </View>
                <View style={{ height: '70%' }}>
                    <View style={styles.form}>
                        <View style={styles.textContainer}>
                            <TextInput
                                placeholder={'Email'}
                                autoCorrect={false}
                                onChangeText={(text) => {
                                    this.setState({ email: text });
                                    if (this.state.emailError) {
                                        this.setState({ emailError: false });
                                    }
                                }}
                                value={this.state.email}
                                style={styles.emailField}
                                underlineColorAndroid={this.underlineColorEmail()}
                                selectionColor={'rgba(54, 23, 94, 0.7)'}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <TextInput
                                placeholder={'Password (6 or more characters)'}
                                autoCorrect={false}
                                secureTextEntry
                                onChangeText={(text) => {
                                    this.setState({ password: text });
                                    if (this.state.passwordError) {
                                        this.setState({ passwordError: false });
                                    }
                                }}
                                value={this.state.password}
                                style={styles.passwordField}
                                underlineColorAndroid={this.underlineColorPassword()}
                                selectionColor={'rgba(54, 23, 94, 0.7)'}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <TextInput
                                placeholder={'Verify Password'}
                                autoCorrect={false}
                                secureTextEntry
                                onChangeText={(text) => {
                                    this.setState({ verificacionPassword: text });
                                    if (this.state.passwordError) {
                                        this.setState({ passwordError: false });
                                    }
                                }}
                                value={this.state.verificacionPassword}
                                style={styles.emailField}
                                underlineColorAndroid={this.underlineColorPassword()}
                                selectionColor={'rgba(54, 23, 94, 0.7)'}
                            />
                        </View>
                    </View>
                    <View style={styles.loginButtonContainer}>
                        {this.loadOrButton()}
                    </View>
                    {this.errorText()}
                </View>
            </View>
        );
    }
}

export default Register;

const styles = {
    logoStyle: {
        resizeMode: 'contain',
        flex: 1
    },
    contenedorImagen: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '20%'
    },
    form: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '40%'
    },
    emailField: {
        width: '70%',
        paddingLeft: 5,
        paddingBottom: 8
    },
    passwordField: {
        width: '70%',
        paddingLeft: 5,
        paddingBottom: 8
    },
    textContainer: {
        paddingBottom: 10,
        width: '100%',
        alignItems: 'center'
    },
    loginButtonContainer: {
        height: '10%',
        width: '50%',
        alignSelf: 'center'
    },
    errorText: {
        alignSelf: 'center',
        color: 'red',
        fontSize: 12
    }
};
