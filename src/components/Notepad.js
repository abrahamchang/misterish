/* eslint-disable  no-unused-vars */
import React, { Component } from 'react'; 
import { Text,
		View,
		Animated,
		PanResponder,
		Dimensions,
 } from 'react-native';	
 import { CheckBox, Button } from 'react-native-elements'	

 /* eslint-enable no-unused-vars */

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const NOTEPAD_WIDTH = SCREEN_WIDTH * 0.9;
const NOTEPAD_BOUNDARY = SCREEN_HEIGHT*0.65;

// Hay que pasarle los clues como prop llamado clues


export default class Notepad extends Component {

	constructor(props) {
		super(props);
		const checked = true;
		const unchecked = false;
		const position = new Animated.ValueXY({x: 0, y: SCREEN_HEIGHT - SCREEN_HEIGHT*0.075});
		const panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (event, gesture) => {
				position.setValue({ y:gesture.moveY });
			},
			onPanResponderRelease: (event, gesture) => {
				if(gesture.moveY < NOTEPAD_BOUNDARY){
					this.onSwipeUp();
				} else if (gesture.moveY > NOTEPAD_BOUNDARY){
					this.onSwipeDown();
				}
			}

		});
		this.state = { panResponder, position, checked, unchecked };
	}


	renderClue(item){
		if(item.id < this.props.index){
			return ( //Modificar los clues aqui
			<CheckBox style={{paddingLeft: SCREEN_WIDTH*0.05}}
			key={item.id}
			left
			checked= {this.state.checked}
			title={item.clue}
			iconLeft
			iconType='material'
			checkedIcon='done'
			uncheckedIcon='search'
			uncheckedColor='gray'
			checkedColor='purple'
			checked={this.state.checked}
			containerStyle={{padding: 3}}
			textStyle={{flexWrap: "wrap"}}
			/>
			);
		}else if (item.id === this.props.index){
			return(
			<CheckBox style={{paddingLeft: SCREEN_WIDTH*0.05}}
			key={item.id}
			left
			checked= {this.state.checked}
			title={item.clue}
			iconLeft
			iconType='material'
			checkedIcon='done'
			uncheckedIcon='search'
			uncheckedColor='gray'
			checkedColor='purple'
			checked={this.state.unchecked}
			containerStyle={{padding: 3}}
			textStyle={{flexWrap: "wrap"}}
			/>
			)
		}
	}

	renderNotepad(){
		return this.props.clues.map(item =>{
				return this.renderClue(item);
			}	);
	}

	render() {
		return (
			<Animated.View
				style={this.state.position.getLayout()}
				{...this.state.panResponder.panHandlers}
			>
                <View style={styles.tab}>
					<Text style={styles.tabText}>^</Text>
				</View>
				<View style={styles.pad}>
					{this.renderNotepad()}
					<Button 
					raised
					iconRight={{name: 'exit-to-app'}}
					title='Get me out!'
					containerViewStyle={styles.buttonContainerStyle}
					backgroundColor= '#ff0000'
					borderRadius={5}
					onPress={this.props.exitToApp}
					/>
				</View>
			</Animated.View>
		);
	}



	onSwipeUp(){
		Animated.spring(this.state.position, {
			toValue: {x: 0, y: SCREEN_HEIGHT*0.40}
		}).start();
	}

	onSwipeDown(){
		Animated.spring(this.state.position, {
			toValue: {x: 0, y: SCREEN_HEIGHT - SCREEN_HEIGHT*0.075}
		}).start();
	}

}

const styles = {
	buttonContainerStyle: {
		borderRadius: 5,
		margin:NOTEPAD_WIDTH*0.025,
		position: 'absolute',
		bottom: 0,
		width: NOTEPAD_WIDTH*0.90,
	},
	tab: {
		borderTopRightRadius: 40,
		borderTopLeftRadius: 40,
		marginLeft: SCREEN_WIDTH*0.095,
		marginRight: SCREEN_WIDTH*0.095,
		width: NOTEPAD_WIDTH*0.9,
		backgroundColor: '#f5f5f5',
		height: SCREEN_HEIGHT*0.075,
	},
	pad: {
		borderRadius: 10,
		marginLeft: SCREEN_WIDTH*0.05,
		marginRight: SCREEN_WIDTH*0.05,
		width: NOTEPAD_WIDTH,
		backgroundColor: '#f5f5f5',
		height: SCREEN_HEIGHT*0.5
	},
	tabText: {
		textAlign: 'center',
		fontSize: 50,
		color: '#553285'
	},
	padText: {
		fontSize: 16,
	},
	notepadLines:{
		width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#66ccff',
	},
	leftMarginColor:{
		borderLeftColor: '#ff0000',
        borderLeftWidth: 2,
	},
};