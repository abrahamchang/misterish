import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { BarCodeScanner, Camera, Permissions } from 'expo';
import { StackActions, NavigationActions } from 'react-navigation';
import Modal from 'react-native-modal';
import Notepad from '../components/Notepad';

class CameraScanner extends Component {
    state = {
        doIHaveCameraPermission: null,
        cargando: true,
        clues: [],
        clueIndex: 0,
        GIF: false,
        modalVisible: false
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ doIHaveCameraPermission: status === 'granted' });
    }

    findClues() {
        const index = this.props.navigation.state.params;
        firebase.database().ref(`/misteryClues/${index}`).once('value')
            .then((snapshotClues) => {
                const clues = snapshotClues.val();
                this.setState({ cargando: false, clues });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getMeOut() {
        this.setState({ modalVisible: true });
    }

    render() {
        const { doIHaveCameraPermission } = this.state;

        if (this.state.cargando) {
            this.findClues();
            return (
                <View style={styles.loadingView}>
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            );
        } else {
            if (doIHaveCameraPermission === null) {
                return (
                    <View>
                        <Text>Requesting Permission to use Your Camera</Text>
                    </View>
                );
            } else if (doIHaveCameraPermission === false) {
                // Handling error
                return (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>You Did Not Gave Us Permission to User Your Camera</Text>
                    </View>
                );
            } else {
                if (this.state.GIF) {
                    return (
                        <View style={styles.gifContainer}>
                            <Image style={styles.GIF} source={require('../assets/celebration.gif')}/>
                        </View>
                    );
                } else {
                    return (
                        <BarCodeScanner style={{height: '100%', width: '100%'}} onBarCodeRead={this._handleBarCodeRead}>
                            <Notepad clues={this.state.clues} index={this.state.clueIndex} exitToApp={this.getMeOut}/>
                        </BarCodeScanner>
                    );
                }
            }
        }
    }

    _handleBarCodeRead = ({ type, data }) => {
        const clue = this.state.clues[this.state.clueIndex];
        if (type === 256 || type === 'org.iso.QRCode') {
            if (clue.sol === data) {
               this.solvedClue();
            }
        }
    };

    goHome() {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Root' })]
        });
        navigation.dispatch(resetAction);
    }

    solvedClue() {
        // Indicador de que se resolvió, sonido o algo
        let index = this.state.clueIndex;
        index++;
        if (index === this.state.clues.length) {
            // Se terminó, llamar modal y de modal a Loading

        } else {
            this.setState({ clueIndex: index, GIF: true });
            setTimeout(() => this.setState({ GIF: false }), 6200);
        }
    }
}

const styles = {
    loadingView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(54,23,94,0.8)',
        height: '100%',
        width: '100%'
    },
    loadingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f4f4f4'
    },
    errorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(54,23,94,0.8)',
        height: '100%',
        width: '100%'
    },
    errorText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red'
    },
    GIF: {
        resizeMode: 'contain',
        height: '100%',
        width: '100%'
    },
    gifContainer: {
        width: '100%',
        height: '100%'
    }
};

export default CameraScanner;