/* eslint-disable  no-unused-vars */
import React, { Component } from 'react'; 
import { Text,
		View,
		Animated,
		Image,
		PanResponder,
		Dimensions,
		FlatList,
 } from 'react-native';	
 import { CheckBox, Button } from 'react-native-elements'
 import Clue from './Clue'	

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
		const position = new Animated.ValueXY({x: 0, y: SCREEN_HEIGHT});
		const panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (event, gesture) => {
				position.setValue({ y:gesture.moveY- SCREEN_HEIGHT*0.50 });
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


	componentDidMount(){
		this.onSwipeUp();
	}

	renderMidImg(){
		//Todo
	}

	renderMidText(){
		//Todo
	}

	renderClue(item){
		if(item.id < this.props.index){
			return ( 
			<Clue
			key={item.id}
			type={item.type}
			title={item.title}
			description={item.clue}
			checked={this.state.checked}

			/>
			);
		}else if (item.id === this.props.index){
			return(
			<Clue
			key={item.id}
			type={item.type}
			title={item.title}
			description={item.clue}
			checked={this.state.unchecked}

			/>
			)
		}
	}

	renderNotepad(){
		return (
                <FlatList
                    data={this.props.clues}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => this.renderClue(item)}
                    extraData={this.props.index}
                />);
	}

	render() {
		return (
		<View style={{ position: 'absolute',top: 0, height: SCREEN_HEIGHT}}>
			<Animated.View
				style={this.state.position.getLayout()}
				{...this.state.panResponder.panHandlers}
			>
			<View style={styles.middleView}>
				{this.props.children}
			</View>
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
		</View>
		);
	}



	onSwipeUp(){
		Animated.spring(this.state.position, {
			toValue: {x: 0, y: SCREEN_HEIGHT*0.075}
		}).start();
	}

	onSwipeDown(){
		Animated.spring(this.state.position, {
			toValue: {x: 0, y: SCREEN_HEIGHT*0.45}
		}).start();
	}

}

const styles = {
	middleView: {
		width: SCREEN_WIDTH*0.9,
		backgroundColor: 'rgba(255,255,255,0)',
		height: SCREEN_HEIGHT*0.35,
		marginTop: SCREEN_HEIGHT*0.1,
		margin: SCREEN_WIDTH*0.05,
		borderRadius: 20,
	},
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
		marginLeft: SCREEN_WIDTH*0.05,
		width: NOTEPAD_WIDTH,
		backgroundColor: '#f5f5f5',
		height: SCREEN_HEIGHT*0.075,
	},
	pad: {
		borderBottomRightRadius: 10,
		borderBottomLeftRadius: 10,
		marginLeft: SCREEN_WIDTH*0.05,
		width: NOTEPAD_WIDTH,
		backgroundColor: '#f5f5f5',
		height: SCREEN_HEIGHT*0.35
	},
	tabText: {
		textAlign: 'center',
		fontSize: 50,
		color: '#553285'
	},
	padText: {
		fontSize: 16,
	},
};