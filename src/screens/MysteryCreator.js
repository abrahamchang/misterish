import React, { Component } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Picker,
    Text,
    TextInput,
    View
} from 'react-native';
import { ImagePicker } from 'expo';
import Button from '../components/common/Button';

class MysteryCreator extends Component {
    state = {
        main: true,
        name: '',
        error: false,
        errorMsg: '',
        clueNumber: 1,
        difficulty: 'Easy',
        image: null,
        clues: null,
        cargando: false
    };

    buttonOrLoad() {
        if (this.state.cargando) {
            return (
                <ActivityIndicator size="large" color="#36175E" />
            );
        } else {
            return (
                <View>
                    {this.displayError()}
                    <View style={styles.finalButtonContainer}>
                        <Button onPress={this.onClickCreate.bind(this)}>Create Mistery!</Button>
                    </View>
                    <View style={styles.finalButtonContainer}>
                        <Button onPress={this.onClickReturn.bind(this)}>Return</Button>
                    </View>
                </View>
            );
        }
    }

    componentDidMount() {
        this.temporaryImageLoader();
    }

    temporaryImageLoader() {
        this.setState({ image: 'https://firebasestorage.googleapis.com/v0/b/misterish-2078a.appspot.com/o/unimet-saman-excelencia.jpg?alt=media&token=b63e1db4-8ee7-47c7-900a-fc0b27bca06e' });
    }

    displayError() {
        if (this.state.error) {
            return <Text style={styles.errorText}>{this.state.errorMsg}</Text>;
        }
    }

    async loadImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            aspect: [4, 3],
            base64: true
        });
        if (!result.cancelled) {
            let imageData = result.base64;
            this.setState({ image: imageData, error: false, errorMsg: '' });
        }
    }

    populateClueNumberPicker() {
        const array = [];
        for (let i = 0; i < 8; i++) {
            array[i] = i;
        }
        return array.map(num => {
            return <Picker.Item key={num} label={(num + 1).toString()} value={(num + 1).toString()} />
        });
    }

    continue() {
        if (this.state.name.length === 0) {
            this.setState({ error: true, errorMsg: 'Please, write a name for the mistery' });
        } else if (this.state.image === null) {
            this.setState({ error: true, errorMsg: 'Please, select an image for the mistery' });
        } else {
            const array = [];
            for (let i = 0; i <= this.state.clueNumber; i++) {
                array.push({
                    clue: '',
                    id: i,
                    sol: '',
                    title: '',
                    type: 'text'
                });
            }
            this.setState({ clues: array, main: false });
        }
    }

    loadOrImage() {
        return (
            <Text
                style={{
                    color: 'green',
                    fontSize: 14,
                    textAlign: 'center'
                }}
            >
                    Default Image Used (in development)
            </Text>
        );
    }

    mainOrCards() {
        if (this.state.main) {
            return (
                <View style={styles.mainCardStyle}>
                    <View style={styles.basicFormContainer}>
                        <View style={styles.titleContainer} >
                            <Text style={styles.title} >Create a New Mistery!</Text>
                        </View>
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
                            placeholderTextColor={'rgba(54, 23, 94, 0.7)'}
                        />
                    </View>
                    <View>
                        <Text style={styles.errorText}>{this.state.errorMsg}</Text>
                    </View>
                    <View style={styles.pickerMainContainer}>
                        <View style={styles.clueNumberPickerContainer}>
                            <Text style={styles.pickerText}>Pick the Number of Clues</Text>
                            <Picker
                                selectedValue={this.state.clueNumber.toString()}
                                style={styles.cluePicker}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({ clueNumber: parseInt(itemValue) });
                                }}
                            >
                                {this.populateClueNumberPicker()}
                            </Picker>
                        </View>
                        <View style={styles.clueNumberPickerContainer}>
                            <Text style={styles.pickerText}>Choose a Difficulty</Text>
                            <Picker
                                selectedValue={this.state.difficulty}
                                style={styles.difficultyPicker}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({ difficulty: itemValue });
                                }}
                            >
                                <Picker.Item key="Easy" label="Easy" value="Easy"/>
                                <Picker.Item key="Medium" label="Medium" value="Medium"/>
                                <Picker.Item key="Hard" label="Hard" value="Hard"/>
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        {this.loadOrImage()}
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button onPress={this.continue.bind(this)}>
                            Continue
                        </Button>
                    </View>
                </View>
            );
        } else {
            return (
                <FlatList
                    data={this.state.clues}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={(item) => this.renderClueMaker(item)}
                />
            );
        }
    }

    onClickCreate() {
        // Aquí falta validar que cada clue tenga todos los campos correspondientes
        // si falta alguno, hay que colocar el state a error: true y errorMsg: mensaje
        this.setState({ cargando: true });
        for (let i = 0; i < this.state.clues.length; i++) {
            const clue = this.state.clues[i];
            if (clue.type.length === 0 || clue.sol.length === 0 || clue.title.length === 0) {
                this.setState({ error: true, errorMsg: `Empty field in ${(i + 1).toString()}` });
                break;
            }
        }
        // Si pasa todas las validaciones, aquí hay que llamar a la BD
    }

    onClickReturn() {
        this.setState({
            main: true,
            name: '',
            error: false,
            errorMsg: '',
            clueNumber: 1,
            difficulty: 'Easy',
            image: null,
            clues: null,
            cargando: false
        });
        this.temporaryImageLoader();
    }

    renderClueMaker(clue) {
        if (clue.item.id < this.state.clueNumber) {
            return (
                <View style={styles.secondaryCardStyle}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title2}>
                            Set the Text for Clue n° {(clue.item.id + 1).toString()}
                        </Text>
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            placeholder={'Title'}
                            onChangeText={(text) => {
                                this.setState({ title: text });
                            }}
                            value={this.state.title}
                            style={styles.clueField}
                            underlineColorAndroid={'#36175E'}
                            selectionColor={'rgba(54, 23, 94, 0.7)'}
                            placeholderTextColor={'rgba(54, 23, 94, 0.7)'}
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            placeholder={'Write your clue'}
                            onChangeText={(text) => {
                                this.setState({ clue: text });
                            }}
                            value={this.state.clue}
                            style={styles.clueField}
                            underlineColorAndroid={'#36175E'}
                            selectionColor={'rgba(54, 23, 94, 0.7)'}
                            placeholderTextColor={'rgba(54, 23, 94, 0.7)'}
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            placeholder={'Write the solution'}
                            onChangeText={(text) => {
                                this.setState({ sol: text });
                            }}
                            value={this.state.sol}
                            style={styles.clueField}
                            underlineColorAndroid={'#36175E'}
                            selectionColor={'rgba(54, 23, 94, 0.7)'}
                            placeholderTextColor={'rgba(54, 23, 94, 0.7)'}
                        />
                    </View>
                </View>
            );
        } else {
            return (
                <View>
                    {this.buttonOrLoad()}
                </View>
            );
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.mainOrCards()}
            </View>
        );
    }
}

const styles = {
    mainCardStyle: {
        marginTop: '5%',
        marginBottom: '5%',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'rgba(50,50,50,0.7)',
        height: 400,
        width: '93%',
        alignSelf: 'center',
        backgroundColor: 'rgba(54, 23, 94, 0.1)'
    },
    secondaryCardStyle: {
        marginTop: '5%',
        marginBottom: '5%',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'rgba(50,50,50,0.7)',
        height: 200,
        width: '93%',
        alignSelf: 'center',
        backgroundColor: 'rgba(54, 23, 94, 0.1)'
    },
    titleContainer: {
        alignSelf: 'center'
    },
    title: {
        fontSize: 18
    },
    nameInput: {
        width: '70%',
        paddingLeft: 5,
        paddingBottom: 8
    },
    basicFormContainer: {
        alignItems: 'center',
        paddingTop: '10%',
        height: '20%',
        width: '100%',
        justifyContent: 'center'
    },
    pickerMainContainer: {
        width: '100%',
        height: '25%',
        flexDirection: 'row',
        paddingTop: '10%'
    },
    difficultyPicker: {
        width: '90%',
        height: '70%',
        paddingTop: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cluePicker: {
        width: '50%',
        height: '70%',
        paddingTop: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    clueNumberPickerContainer: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    pickerText: {
        fontSize: 10,
        color: 'rgba(54, 23, 94, 0.7)',
        marginBottom: 10
    },
    buttonContainer: {
        alignSelf: 'center',
        height: '16%',
        width: '40%',
        paddingTop: '5%'
    },
    titleContainer: {
        height: '10%',
        marginTop: '5%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title2: {
        fontSize: 18,
        color: '#36175E'
    },
    textInputContainer: {
        height: '15%',
        marginTop: '5%',
        width: '100%',
        alignItems: 'center'
    },
    clueField: {
        width: '70%',
        paddingLeft: 5,
        paddingBottom: 8
    },
    finalButtonContainer: {
        alignSelf: 'center',
        height: 50,
        width: '60%',
        paddingBottom: '5%'
    },
    errorText: {
        alignSelf: 'center',
        color: 'red',
        fontSize: 12
    }
};

export default MysteryCreator;
