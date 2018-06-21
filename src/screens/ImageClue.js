import React, { Component } from 'react';
import { Picker, TextInput, Text, View } from 'react-native';
import { ImagePicker } from 'expo';
import firebase from 'firebase';
import Button from '../components/common/Button';

class ImageClue extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTintColor: 'rgba(54,23,94,0.4)',
		headerTitle: (
			<View style={{ 
				alignSelf: 'center',
				alignItems: 'center',
				width: '100%',
				height: '100%',
				justifyContent: 'center'
			}}>
				<Text style={{
					fontSize: 18,
					color: 'rgb(54,23,94)',
					alignSelf: 'center'
				}}>
					Clue Number {navigation.state.params.clueIndex + 1}
				</Text>
			</View>
		),
		headerRight: <View />
	})

	state = {
		clue: null,
		title: '',
		main: true,
		sol: '',
		nextClueType: 'text'
	};

	onPressNext() {
		if (this.state.clue !== null && this.state.title !== '' && this.state.title !== '') {
			this.setState({ main: false });
		}
	}

	generateRandomString() {
		let cadena = '';
		const abc = 'abcdefghijklmnopqrstuvwxyz';
		for (let i = 0; i < 16; i++) {
			const index = Math.random() * 26;
			cadena += abc.substring(index, index + 1);
		}
		return cadena;
	}

	onPressFinish() {
		const nombre = this.generateRandomString();
		const cadena = this.props.navigation.state.params.image;
		firebase.storage().ref('/' + nombre + '.jpg').putString(cadena).then((algo) => {
			console.log(algo);
		}).catch((err) => {
			console.log(err);
		});
	}

	onPressConfirm() {
		const index = this.props.navigation.state.params.clueIndex + 1;
		const clues = this.props.navigation.state.params.clues;
		clues.push({
			clue: this.state.clue,
			id: this.props.navigation.state.params.clueIndex,
			sol: this.state.sol,
			title: this.state.title,
			type: 'img'
		});
		let data = {
			clueNumber: this.props.navigation.state.params.clueNumber,
			clueIndex: index,
			name: this.props.navigation.state.params.name,
			image: this.props.navigation.state.params.image,
			difficulty: this.props.navigation.state.params.difficulty,
			clues
		};
        switch (this.state.nextClueType) {
            case 'text':
                this.props.navigation.navigate({ key: index, routeName: 'TextClue', params: data });
                break;
            case 'audio':
                break;
            case 'img':
            	this.props.navigation.navigate({ key: index, routeName: 'ImageClue', params: data });
                break;
            case 'location':
                break;
            default:

        }
	}

    async loadImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            aspect: [4, 3],
            base64: true
        });
        if (!result.cancelled) {
            this.setState({ clue: result.base64 });
        }
    }

    imageOrSelected() {
        if (this.state.clue === null) {
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
                        alignItems: 'center'
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

	renderButton() {
		const index = this.props.navigation.state.params.clueIndex;
		const total = this.props.navigation.state.params.clueNumber;
		if (index !== total - 1) {
			return (
				<Button onPress={this.onPressNext.bind(this)}>
					Next Clue
				</Button>
			);
		} else {
			return (
				<Button onPress={this.onPressFinish.bind(this)}>
					Finish and Create
				</Button>
			);
		}
	}

	render() {
		if (this.state.main) {
			return (
				<View style={styles.mainContainer}>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>
							Set the Text for the Clue!
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
	                    />
					</View>
					{this.imageOrSelected()}
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
	                    />
					</View>
					<View style={styles.buttonContainer}>
						{this.renderButton()}
					</View>
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
    },
	mainContainer: {
		height: '100%',
		width: '100%',
		backgroundColor: '#fff',
		alignItems: 'center'
	},
	titleContainer: {
		height: '10%',
		marginTop: '5%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
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
	buttonContainer: {
		height: '10%',
		width: '50%',
		alignSelf: 'center',
		marginTop: '5%'
	}
};

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
        fontSize: 18,
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

export default ImageClue;
