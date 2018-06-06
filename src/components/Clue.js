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

	render() {
		if (this.props.type === 'text') {
			return (
				<View style={{ padding: '2%' }}>
					<TouchableOpacity onPress={this.props.renderMidView} style={this.props.checked ? styles.containerCheck : styles.containerNotCheck } >
						<Icon
							name={this.props.checked ? 'done' : 'search'}
							color={this.props.checked ? '#553285' : '#00D972'}
							size={40}
						/>
						<Text style={styles.textStyle}>{this.props.title}</Text>
					</TouchableOpacity>
				</View>
			);
		} else if (this.props.type === 'img') {
			return (
				<View style={{ padding: '2%' }}>
					<TouchableOpacity style={this.props.checked ? styles.containerCheck : styles.containerNotCheck }>
						<Icon
							name={this.props.checked ? 'done' : 'image'}
							color={this.props.checked ? '#553285' : '#00D972'}
							size={40}
						/>
						<Text style={styles.textStyle}> {this.props.checked ? 'Done!' : 'Tap to view'} </Text>
					</TouchableOpacity>
				</View>
			);
		} else if (this.props.type === 'audio') {
			return (
				<View style={{ padding: '2%' }}>
					<View style={this.props.checked ? styles.containerCheck : styles.containerNotCheck }>
						<TouchableOpacity>
							<Icon
								name={this.props.checked ? 'done' : 'play-arrow'}
								color={this.props.checked ? '#553285' : '#00D972'}
								size={40}
								onPress={this.props.playClueAudio}
							/>
						</TouchableOpacity>
						<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
							<Progress.Bar
								progress={1}/*devolver el progreso interpolado entre 0 y 1 donde 1 es la duracion del audio}*/
								color={'#553285'}
								unfilledColor={'#fafafa'}
								borderWidth={2}
								borderColor={'#553285'}
							/>
						</View>
					</View>
				</View>
			);
		} else if (this.props.type === 'location') {
			return (
				<View style={{ padding: '2%' }}>
					<TouchableOpacity onPress={this.props.renderMidView} style={this.props.checked ? styles.containerCheck : styles.containerNotCheck } >
						<Icon
							name={this.props.checked ? 'done' : 'add-location'}
							color={this.props.checked ? '#553285' : '#00D972'}
							size={40}
						/>
						<Text style={styles.textStyle}>{this.props.title}</Text>
					</TouchableOpacity>
				</View>
			);
		}
	}
}


const styles = {
	containerNotCheck: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		borderColor: '#A6A6A6',
		borderRadius: 5,
		borderWidth: 2,
	},
	containerCheck: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		borderColor: '#553285',
		borderRadius: 5,
		borderWidth: 2,
	},
	textStyle: {
		fontSize: 18,
		color: '#292929'
	},
};