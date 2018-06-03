/* eslint-disable  no-unused-vars */
import React, { Component } from 'react'; 
import { View, TouchableOpacity, Text } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import * as Progress from 'react-native-progress';
 /* eslint-enable no-unused-vars */



export default class Clue extends Component {
	constructor(props) {
	  super(props);
	  this.state = {};
	}
	
/** Este componente debe recibir como props:
	type= 'tipo de pista'
	checked= 'true or false, si fue resuelta o no'
	description= 'titulo de la pista, imgURL o audio'
	renderMidView = function para renderizar los detalles en el padre.
*/

	render(){		
		if(this.props.type === 'text'){
			return(
				<TouchableOpacity>
					<View style={styles.container}>
						<Icon 
						name={this.props.checked ? 'done' : 'search'}
						color={this.props.checked ? '#553285': '#aaaaaa'}
						/>
						<Text style={styles.textStyle}>{this.props.title}</Text>
					</View>
				</TouchableOpacity>
			);
		}else if(this.props.type === 'img'){
			return(
				<TouchableOpacity>
					<View style={styles.container}>
						<Icon 
							name={this.props.checked ? 'done' : 'image_search'}
							color={this.props.checked ? '#553285': '#aaaaaa'}
						/>
						<Button 
							raised
							title='Tap to view'
							containerViewStyle={styles.buttonContainerStyle}
							backgroundColor= '#553285'
							borderRadius={5}
							onPress={this.props.renderMidView}
						/>
					</View>
				</TouchableOpacity>
			);
		}else if(this.props.type === 'audio'){
			return(
				<TouchableOpacity>
					<View style={styles.container}>
						<TouchableOpacity /*onPress={funcion para cargar el audio y darle play}*/>
							<Icon 
								name={this.props.checked ? 'done' : 'play_arrow'}
								color={this.props.checked ? '#553285': '#aaaaaa'}
							/>
						</TouchableOpacity>
						<Progress.Bar 
							/*progress={devolver el progreso interpolado entre 0 y 1 donde 1 es la duracion del audio}*/
							color={'#553285'}
							unfilledColor={'#fafafa'}
							borderWidth={2}
							borderColor={'#553285'}
						/>
					</View>
				</TouchableOpacity>
			);
		}
	}
 }


const styles = {
	container: {
		marginLeft:'5%',
		marginTop: 1,
		width: '90%',
		borderColor: '#553285',
		backgroundColor: '#f0f0f0',
		borderRadius: 5,
		borderWidth: 1,
		flexDirection: 'row'
	},
	textStyle: {
		flexWrap: 'wrap',
		fontSize: 16,
		textAlign: 'center', 
	},
};