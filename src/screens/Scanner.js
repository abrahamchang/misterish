import React, { Component } from 'react';
import { Image, Text, View, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import { BarCodeScanner, Camera, Permissions, Audio } from 'expo';
import { StackActions, NavigationActions } from 'react-navigation';
import Alert from '../components/Alert';
import Modal from 'react-native-modal';
import Notepad from '../components/Notepad';

class CameraScanner extends Component {
    state = {
        doIHaveCameraPermission: null,
        cargando: true,
        clues: [],
        clueIndex: 0,
        GIF: false,
        modalVisible: false,
        victoria: false
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
                    <ActivityIndicator size='large' color="#36175E" />
                    <Text style={styles.loadingText}>Loading clues</Text>
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
                        <Text style={styles.errorText}>You did not gave us permission to user your camera</Text>
                    </View>
                );
            } else {
                if (this.state.GIF) {
                    return (
                        <BarCodeScanner style={{ height: '100%', width: '100%' }} onBarCodeRead={this._handleBarCodeRead}>
                            <Notepad clues={this.state.clues} index={this.state.clueIndex} childOn={true} exitToApp={this.getMeOut.bind(this)}>
                                <Image style={styles.GIF} source={require('../assets/celebration.gif')} />
                            </Notepad>
                        </BarCodeScanner>

                    );
                } else if (this.state.victoria) {
                    return (
                        <BarCodeScanner style={{ height: '100%', width: '100%' }} onBarCodeRead={this._handleBarCodeRead}>
                            <Notepad clues={this.state.clues} index={this.state.clueIndex} exitToApp={this.getMeOut.bind(this)}>
                                <Alert
                                    title={'Congratulations, you did it!'}
                                    text={'You completed the mistery!\nPress the below button to continue.'}
                                    onPressOk={this.goHome.bind(this)}
                                />
                            </Notepad>
                        </BarCodeScanner>
                    );
                } else if (this.state.modalVisible) {
                    return (
                        <BarCodeScanner style={{ height: '100%', width: '100%' }} onBarCodeRead={this._handleBarCodeRead}>
                            <Notepad clues={this.state.clues} index={this.state.clueIndex} exitToApp={this.getMeOut.bind(this)}>
                                <Alert
                                    title={'Exit'}
                                    text={'Are you sure you want to leave?\nYou will lose your progress'}
                                    onPressCancel={this.onPressCancel.bind(this)}
                                    onPressOk={this.onPressOk.bind(this)}
                                />
                            </Notepad>
                        </BarCodeScanner>
                    );
                } else {
                    return (
                        <BarCodeScanner style={{ height: '100%', width: '100%' }} onBarCodeRead={this._handleBarCodeRead}>
<<<<<<< HEAD
                            <Notepad clues={this.state.clues} index={this.state.clueIndex} childOn={this.state.childOn} exitToApp={this.getMeOut.bind(this)}/>
=======
                            <Notepad clues={this.state.clues} index={this.state.clueIndex} exitToApp={this.getMeOut.bind(this)} />
>>>>>>> 9b3e89967cb5f4cb3cbbdf7321ef09d94e049411
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
            actions: [NavigationActions.navigate({ routeName: 'Loading' })]
        });
        this.props.navigation.dispatch(resetAction);
    }

    onPressCancel() {
        this.setState({ modalVisible: false });
    }

    onPressOk() {
        this.goHome();
    }

    async solvedClue() {
        const SoundObject = new Audio.Sound();
        // Indicador de que se resolvió, sonido o algo
        let index = this.state.clueIndex;
        index++;
        if (index === this.state.clues.length) {
            // Se terminó, llamar modal y de modal a Loading
            try {
                await SoundObject.loadAsync(require('../assets/mistery-complete.mp3'));
                await SoundObject.playAsync();
            }
            catch (err) {
                //error
            }
            this.setState({ victoria: true });
        } else {
            try {
                await SoundObject.loadAsync(require('../assets/clue-solved.wav'));
                await SoundObject.playAsync();
            }
            catch (err) {
                //error
            }
            this.setState({ clueIndex: index, GIF: true });
            setTimeout(() => this.setState({ GIF: false, childOn: true }), 6200);
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
        color: 'white'
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