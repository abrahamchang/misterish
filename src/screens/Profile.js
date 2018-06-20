import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

import Developing from './Developing';

import { createBottomTabNavigator } from 'react-navigation';

class Profile extends Component {
    render() {
        const {
            imageContainer,
            detailsContainer,
            imageStyle,
            headerStyle
        } = styles;

        return (
            <View style={{ flex: 1, margin: '2%', alignItems: 'center' }}>
                <View style={headerStyle}>
                    <View style={imageContainer}>
                        <Image
                            source={require('../assets/avatar/level1female.png')}
                            style={imageStyle}
                        />
                    </View>
                    <View style={{ height: '60%' }}>
                        <Text 
                        style={{
                            fontSize: 16,
                            color: '#553285',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>
                        Abraham Chang | Lvl. 1
                        </Text>

                        <View style={detailsContainer}>
                            <Text style={{ textAlign: 'center' }}>Espera lo mejor, preparate para lo peor y acepta lo que venga.</Text>
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = {
    headerStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50%',
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1 / 1,
        height: '40%',
    },
    detailsContainer: {        
        flex: 1,
        borderColor: '#553285',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: '1%',
        marginRight: '1%',
        borderWidth: 2,
        borderRadius: 5,
    },
    imageStyle: {
        resizeMode: 'contain',
        flex: 1,
        borderRadius: 50
    },

};

export default Profile;