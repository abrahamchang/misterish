import React, { Component } from 'react';
import { Picker, Text, TextInput, View, TouchableOpacity } from 'react-native';
import firebase from 'firebase'
import { ImagePicker } from 'expo';
import { StackActions, NavigationActions } from 'react-navigation';
import Button from '../components/common/Button';

class MysteryCreator extends Component {
    state = {
        name: '',
        clueNumber: -1,
        difficulty: '',
        image: null,
        error: false,
        errorMsg: '',
        main: true,
        nextClueType: 'text'
    };

    errorText() {
        if (this.state.error) {
            return (
                <View style={{ height: '7%', alignSelf: 'center' }}>
                    <Text style={{ alignSelf: 'center', color: 'red', fontSize: 12 }}>
                        {this.state.errorMsg}
                    </Text>
                </View>
            );
        }
    }

    imageOrSelected() {
        if (this.state.image === null) {
            return (
                <View style={styles.imageLoaderContainer}>
                    <Text style={styles.imageText}>
                        Image
                    </Text>
                    <Button onPress={this.loadImage.bind(this)}>
                        Select
                    </Button>
                </View>
            );
        } else {
            return (
                <View
                    style={{
                        height: '15%',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '10%'
                    }}
                >
                    <Text style={{
                        color: 'green',
                        fontSize: 14
                    }}
                    >
                        Image Successfully Loaded
                    </Text>
                </View>
            );
        }
    }

    async loadImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            aspect: [4, 3]
        });

        if (!result.cancelled) {
            console.log(result.uri);
            this.setState({ image: result.uri });
        }
    }

    populatePicker() {
        const array = [];
        for (let i = 0; i < 10; i++) {
            array[i] = i;
        }
        return array.map(algo => {
            return <Picker.Item key={algo} label={(algo + 1).toString()} value={(algo + 1).toString()} />
        });
    }

    onPressBegin() {
        if (this.state.name === '') {
            this.setState({ error: true, errorMsg: 'No name' });
        } else if (this.state.difficulty === '') {
            this.setState({ error: true, errorMsg: 'No difficulty selected' });
        } else if (this.state.clueNumber === -1) {
            this.setState({ error: true, errorMsg: 'Please, select a number of clues' })
        } else {
            this.setState({ main: false });
        }
    }

    onPressConfirm() {
        switch (this.state.nextClueType) {
            case 'text':
                this.props.navigation.navigate('TextClue');
                break;
            case 'audio':
                break;
            case 'img':
                break;
            case 'location':
                break;
            default:

        }
    }

    render() {
        if (this.state.main) {
            return (
                <View style={styles.mainContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            Create a Mystery!
                        </Text>
                    </View>
                    <View style={styles.basicFormContainer}>
                        <TextInput
                            placeholder={'Mystery Name'}
                            onChangeText={(text) => {
                                this.setState({ name: text, error: false, errorMsg: '' });
                            }}
                            style={styles.nameInput}
                            value={this.state.name}
                            underlineColorAndroid={'#36175E'}
                            selectionColor={'rgba(54, 23, 94, 0.7)'}
                        />
                        <View style={styles.pickerContainer}>
                            <Text style={styles.pickerTextStyle}>
                                Number of Clues
                            </Text>
                            <Picker
                                selectedValue={this.state.clueNumber.toString()}
                                style={styles.cluePicker}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({ clueNumber: parseInt(itemValue) });
                                }}
                            >
                                {this.populatePicker()}
                            </Picker>
                        </View>
                        <View style={styles.pickerContainer}>
                            <Text style={styles.pickerTextStyle}>
                                Difficulty
                            </Text>
                            <Picker
                                selectedValue={this.state.difficulty}
                                style={styles.difficultyPicker}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({ difficulty: itemValue });
                                }}
                            >
                                <Picker.Item key="Easy" label="Easy" value="Easy" />
                                <Picker.Item key="Medium" label="Medium" value="Medium" />
                                <Picker.Item key="Hard" label="Hard" value="Hard" />
                            </Picker>
                        </View>
                        {this.imageOrSelected()}              
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button onPress={this.onPressBegin.bind(this)}>Begin!</Button>
                    </View>
                    {this.errorText()}
                </View>
            );
        } else {
            return (
                <View style={secStyles.mainContainer}>
                    <View style={secStyles.textContainer}>
                        <Text style={secStyles.text}>
                            Select the Next Type of Clue
                        </Text>
                    </View>
                    <View style={secStyles.pickerContainer}>
                        <Picker
                            selectedValue={this.state.nextClueType}
                            style={secStyles.picker}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({ nextClueType: itemValue });
                            }}
                        >
                            <Picker.Item key="Text" label="Text" value="text" />
                            <Picker.Item key="Audio" label="Audio" value="audio" />
                            <Picker.Item key="Image" label="Image" value="img" />
                            <Picker.Item key="Location" label="Location" value="location" />
                        </Picker>
                    </View>
                    <View style={secStyles.buttonContainer}>
                        <Button onPress={this.onPressConfirm.bind(this)}>
                            Confirm
                        </Button>
                    </View>
                </View>
            );
        }
    }

}

const styles = {
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    titleContainer: {
        height: '10%',
        width: '70%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(54,23,94,0.1)',
        alignSelf: 'center',
        marginTop: '7%',
        borderColor: 'rgba(54,23,94,0.4)',
        borderWidth: 2
    },
    title: {
        fontSize: 22,
        color: '#36175E',
        paddingTop: 7
    },
    basicFormContainer: {
        alignItems: 'center',
        paddingTop: '10%',
        height: '50%'
    },
    nameInput: {
        width: '70%',
        paddingLeft: 5,
        paddingBottom: 8
    },
    pickerContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: '7%'
    },
    pickerTextStyle: {
        paddingRight: '10%',
        fontSize: 14,
        color: '#36175E'
    },
    cluePicker: {
        width: '25%',
        height: '10%',
        paddingTop: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    difficultyPicker: {
        width: '35%',
        height: '10%',
        paddingTop: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        height: '15%',
        width: '60%',
        alignSelf: 'center',
        marginTop: '20%'
    },
    imageLoaderContainer: {
        width: '60%',
        height: '15%',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: '10%'
    },
    imageText: {
        paddingRight: '30%',
        fontSize: 14,
        color: '#36175E'
    }
}

const secStyles = {
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    textContainer: {
        height: '10%',
        marginTop: '15%'     
    },
    text: {
        fontSize: 12,
        color: '#36175E'
    },
    pickerContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: '7%'
    },
    picker: {
        width: '60%',
        height: '10%',
        paddingTop: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        height: '12%',
        width: '50%',
        marginTop: '10%'
    }
};

export default MysteryCreator;
