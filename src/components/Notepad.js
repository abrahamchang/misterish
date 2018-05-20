/* eslint-disable  no-unused-vars */
import React, { Component } from 'react'; 
import { Text,
		View,
		Animated,
		PanResponder,
		Dimensions
 } from 'react-native';		
 /* eslint-enable no-unused-vars */

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const NOTEPAD_WIDTH = SCREEN_WIDTH * 0.9;
const NOTEPAD_BOUNDARY = SCREEN_HEIGHT*0.65;

// Hay que pasarle los clues como prop llamado clues


export default class Notepad extends Component {

	constructor(props) {
		super(props);
	
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
		this.state = { panResponder, position };
	}

	renderClue(item){
		return ( //Modificar los clues aqui
				<Text style={styles.padText} key={item.id}>{item.clue}</Text>
			);
	}

	renderNotepad(){
		return this.props.clues.map(item =>{
			return this.renderClue(item);
		});
	}

	render() {
		return (
			<Animated.View
			style={this.state.position.getLayout()}
			{...this.state.panResponder.panHandlers}
			>	<View style={styles.tab}>
				<Text style={styles.tabText}>^</Text>
				</View>
				<View style={styles.pad}>
					{this.renderNotepad()}
				</View>
			</Animated.View>
		);
	}

	onSwipeUp(){
		Animated.spring(this.state.position, {
			toValue: {x: 0, y: SCREEN_HEIGHT*0.5}
		}).start();
	}

	onSwipeDown(){
		Animated.spring(this.state.position, {
			toValue: {x: 0, y: SCREEN_HEIGHT - SCREEN_HEIGHT*0.075}
		}).start();
	}

}

const styles = {
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
		padding: SCREEN_WIDTH*0.05,
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
		color: '#9900ff'
	},
	padText: {
		fontSize: 16,
	},
}