import React, { Component } from 'react';
import { Text, View } from 'react-native';

class TarjetaNM extends Component {
	render() {
		return (
			<View style={styles.mainCardStyle}>
				{this.props.children}
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
		height: '60%',
		width: '93%',
		alignSelf: 'center',
		backgroundColor: 'rgba(54, 23, 94, 0.1)'
	}
};

export default TarjetaNM;