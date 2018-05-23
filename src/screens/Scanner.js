import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import { BarCodeScanner, Camera, Permissions } from 'expo';

import Notepad from '../components/Notepad';

class CameraScanner extends Component {
    state = {
        doIHaveCameraPermission: null,
        cargando: true,
        clues: [],
        clueIndex: 0
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ doIHaveCameraPermission: status === 'granted' });
    }

    findClues() {
        const index = this.props.navigation.state.params;
        console.log(this.props.navigation.state);
        debugger;
        firebase.database().ref(`/misteryClues/${index}`).once('value')
            .then((snapshotClues) => {
                const clues = snapshotClues.val();
                console.log(clues);
                this.setState({ cargando: false, clues });
            })
            .catch((error) => {
                console.error(error);
            })
    }

    render() {
        const { doIHaveCameraPermission } = this.state;

        if (this.state.cargando) {
            this.findClues();
            return (
                <View>
                    <Text>Loading</Text>
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
                    <View>
                        <Text>You Did Not Gave Us Permission to User Your Camera</Text>
                    </View>
                );
            } else {
                return (
                    <BarCodeScanner style={{ height: '100%', width: '100%' }} onBarCodeRead={this._handleBarCodeRead}>
                        <Notepad clues={this.state.clues} index={this.state.clueIndex}/>
                    </BarCodeScanner>
                );
            }
        }
    }

    _handleBarCodeRead = ({ type, data }) => {
        const clue = this.state.clues[this.state.clueIndex];
        if (type === 256) {
            if (clue.sol === data) {
               this.solvedClue();
            }
        }
    };

    solvedClue() {
        console.log('resuelto!');
        // Indicador de que se resolvió, sonido o algo
        let index = this.state.clueIndex;
        index++;
        if (index === this.state.clues.length) {
            // Se terminó, llamar modal y de modal a Loading

        } else {
            this.setState({ clueIndex: index });
        }
    }
}

export default CameraScanner;