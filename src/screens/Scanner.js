import React, { Component } from 'react';
import { Image, Text, View, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import { Audio, BarCodeScanner, Camera, Location, Permissions } from 'expo';
import moment from 'moment';

import { StackActions, NavigationActions } from 'react-navigation';
import Alert from '../components/Alert';
import Modal from 'react-native-modal';
import Notepad from '../components/Notepad';

const MAXIMUM_RADIUS = 0.15;
const MAXIMUM_TIME_DIFFERENCE = 5;
const LOCATION_TIME_INTERVAL = 5000;

class CameraScanner extends Component {
    state = {
        doIHaveCameraPermission: null,
        doIHaveLocationPermission: null,
        location: undefined,
        cargando: true,
        clues: [],
        sounds: [],
        clueIndex: 0,
        GIF: false,
        modalVisible: false,
        victoria: false,
        isGPSActive: true
    };

    async componentWillMount() {
        await this.askForLocationPermission();
        await this.askForCameraPermission();
    }

    async askForCameraPermission() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ doIHaveCameraPermission: status === 'granted' });
    }

    async askForLocationPermission() {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        this.setState({ doIHaveLocationPermission: status === 'granted', isMounted: true });
    }

    async getLocationAsync() {
        if (this.state.doIHaveLocationPermission) {
            const estado = await Location.getProviderStatusAsync();
            if (estado.locationServicesEnabled) {
                let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
                this.setState({ isGPSActive:  true, location });
            } else {
                this.setState({ isGPSActive: false });
            }
        }
        this.scheduleLocation();
    }

    async componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    async scheduleLocation() {
        if (this.state.clues[this.state.clueIndex].type === 'location') {
            setTimeout(() => this.getLocationAsync(), LOCATION_TIME_INTERVAL);
        }
    }

    findClues() {
        const index = this.props.navigation.state.params;
        firebase.database().ref(`/misteryClues/${index}`).once('value')
            .then((snapshotClues) => {
                const clues = snapshotClues.val();
                this.setState({ cargando: false, clues });
                this.scheduleLocation();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getMeOut() {
        this.setState({ modalVisible: true });
    }

    render() {
        const { doIHaveCameraPermission, doIHaveLocationPermission } = this.state;
        if (this.state.cargando) {
            this.findClues();
            return (
                <View style={styles.loadingView}>
                    <ActivityIndicator size='large' color="#36175E" />
                    <Text style={styles.loadingText}>Loading clues</Text>
                </View>
            );
        } else {
            if (doIHaveCameraPermission === null || doIHaveLocationPermission === null) {
                return (
                    <View style={styles.errorContainer}>
                        <Text style={errorText}>Requesting Permissions</Text>
                    </View>
                );
            } else if (doIHaveCameraPermission === false || doIHaveLocationPermission === false) {
                return (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>We Didn't Get the Required Permissions to Play this Mystery</Text>
                    </View>
                );
            } else {
                if (this.state.GIF) {
                    return (
                        <BarCodeScanner style={{ height: '100%', width: '100%' }} onBarCodeRead={this._handleBarCodeRead}>
                            <Notepad clues={this.state.clues} index={this.state.clueIndex} exitToApp={this.getMeOut.bind(this)}>
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
                            <Notepad clues={this.state.clues} index={this.state.clueIndex} exitToApp={this.getMeOut.bind(this)} />
                        </BarCodeScanner>
                    );
                }
            }
        }
    }

    _handleBarCodeRead = ({ type, data }) => {
        const clue = this.state.clues[this.state.clueIndex];
        if (clue.sol === data) {
            this.solvedClue();
        }
    };

    _handleLocationReading() {
        if (this.state.clues[this.state.clueIndex].type === 'location' && this.state.location) {
            const clue = this.state.clues[this.state.clueIndex];
            const separatedString = clue.sol.split('|');
            if (separatedString.length > 0) {
                const longitude = separatedString[0];
                const actualLongitude = this.state.location.coords.longitude;
                const latitude = separatedString[1];
                const actualLatitude = this.state.location.coords.latitude;
                const time = separatedString[2];
                const actualTime = moment().format('DD/MM/YYYY HH:mm');
                console.log()
                if (time.length > 0) {
                    if (this.getDistanceFromLatLonInKm(latitude, longitude, actualLatitude, actualLongitude) < MAXIMUM_RADIUS
                        && Math.abs(moment(time).diff(moment(actualTime), 'minutes')) < MAXIMUM_TIME_DIFFERENCE) {
                        this.solvedClue();
                    }
                } else {
                    if (this.getDistanceFromLatLonInKm(latitude, longitude, actualLatitude, actualLongitude) < MAXIMUM_RADIUS) {
                        this.solvedClue();
                    }
                }
            }
        }
    }

    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371;
        var dLat = this.deg2rad(lat2 - lat1);
        var dLon = this.deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

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
            this.scheduleLocation();
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