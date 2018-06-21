import React, { Component } from 'react';
import { ActivityIndicator, Picker, TextInput, Text, View } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import firebase from 'firebase';
import Button from '../components/common/Button';

class TextClue extends Component {
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
		clue: '',
		title: '',
		main: true,
		sol: '',
		nextClueType: 'text',
		cargando: false
	};

	onPressNext() {
		if (this.state.text !== '' && this.state.title !== '' && this.state.title !== '') {
			this.setState({ main: false });
		}
	}

	onPressFinish() {
		if (this.state.clue !== '' && this.state.title !== '' && this.state.sol !== '') {
			this.setState({ cargando: true });
			const datos = this.props.navigation.state.params;
			let pistas = datos.clues;
			pistas.push({
				clue: this.state.clue,
				id: this.props.navigation.state.params.clueIndex,
				sol: this.state.sol,
				title: this.state.title,
				type: 'text'
			});
			firebase.database().ref('/users/ZAmXmdpQl9X9ACPxe3JeB0AVPOi1').once('value')
			.then((userSnapshot) => {
				firebase.database().ref('/misteryMetadata').once('value')
				.then((metadatos) => {
					const user = userSnapshot.val();
					const id = user.mstrList.id;
					const misterios = metadatos.val();
					const index = misterios.length;
					id[index] = index;
					firebase.database().ref(`/misteryMetadata/${index}`).set({
						description: 'UNIMET',
						dificulty: datos.difficulty,
						id: index,
						imageURL: 'https://firebasestorage.googleapis.com/v0/b/misterish-2078a.appspot.com/o/unimet-saman-excelencia.jpg?alt=media&token=b63e1db4-8ee7-47c7-900a-fc0b27bca06e',
						name: datos.name,
						reviews: 0,
						userID: 'Misterish'
					}).then(() => {
						firebase.database().ref(`/misteryClues/${index}`).set(
							pistas
						).then(() => {
							firebase.database().ref('/users/ZAmXmdpQl9X9ACPxe3JeB0AVPOi1/mstrList/').set({
								id
							}).then(() => {
								const resetAction = StackActions.reset({
								   index: 0,
								   actions: [NavigationActions.navigate({ routeName: 'Main', params: datos })]
								});
								this.props.navigation.dispatch(resetAction);
							});
						});
					}).catch((err) => console.log(err));
				}).catch((err) => console.log(err));
			}).catch((err) => console.log(err));
		}
	}

	onPressConfirm() {
		const index = this.props.navigation.state.params.clueIndex + 1;
		const clues = this.props.navigation.state.params.clues;
		clues.push({
			clue: this.state.clue,
			id: this.props.navigation.state.params.clueIndex,
			sol: this.state.sol,
			title: this.state.title,
			type: 'text'
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
                this.props.navigation.navigate('Developing');
                break;
            case 'img':
                this.props.navigation.navigate('Developing');
                break;
            case 'location':
                this.props.navigation.navigate('Developing');
                break;
            default:

        }
	}

	renderButton() {
		const index = this.props.navigation.state.params.clueIndex;
		const total = this.props.navigation.state.params.clueNumber;
		if (!this.state.cargando) {
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
		} else {
			return (
				<ActivityIndicator size="large" color='#36175E'/>
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

export default TextClue;
