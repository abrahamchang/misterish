import React, { Component } from 'react';
import { ActivityIndicator, Image, Text, TextInput, View } from 'react-native';
import * as EmailValidator from 'email-validator';
import firebase from 'firebase';

import Button from '../components/common/Button';

class Recovery extends Component {
	state = {
		email: '',
		error: false,
		cargando: false
	};

    underlineColor() {
        return this.state.error ? 'red' : '#36175E';
    }

    loadOrButton() {
        return this.state.cargando ? <ActivityIndicator size="large" color='#36175E'/> : <Button onPress={this.onPressSubmit.bind(this)}>Submit</Button>
    }

    onPressSubmit() {
    	this.setState({ cargando: true });
    	if (EmailValidator.validate(this.state.email)) {
    		firebase.auth().sendPasswordResetEmail(this.state.email)
    			.then(() => {
					this.props.navigation.goBack(null);
    			})
    			.catch(() => {
    				this.setState({ email: '', error: true, cargando: false });
    			});
    	} else {
    		this.setState({ error: true, cargando: false });
    	}
    }

	render() {
		return (
			<View styles={{ height: '100%', width: '100%' }}>
                <View style={{ height: '10%' }}/>
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
		                            if (this.state.error) {
		                                this.setState({ error: false });
		                            }
		                        }}
		                        value={this.state.email}
		                        style={styles.emailField}
		                        underlineColorAndroid={this.underlineColor()}
		                        selectionColor={'rgba(54, 23, 94, 0.7)'}
		                    />
    	                	<Text style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '10%', color: '#a9a9a9'}} >
		                		You will be sent a password reset
		                	</Text>
		                	<Text style={{ alignItems: 'center', justifyContent: 'center', color: '#a9a9a9'}}>
		                		email to this address!
	                		</Text>
		                </View>
	                </View>
	                <View style={styles.otherOptionsContainer}>
	                	{this.loadOrButton()}
	                </View>
                </View>
			</View>
		);
	}
}

export default Recovery;

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
    textContainer: {
        paddingBottom: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emailField: {
        width: '70%',
        paddingLeft: 5,
        paddingBottom: 8
    },
    form: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '40%'
    },
    otherOptionsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        alignSelf: 'center',
        height: '10%'
    }
};
