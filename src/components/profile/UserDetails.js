import React from 'react';
import ReactNative from 'react-native';
import { Text, Image, View } from 'react-native';
import CardSection from '../../components/common/CardSection';

const UserDetails = () => {
    
    var user = {
        name: 'IWearFedoras',
        lvl: '1'
    };

    const {
        thumbnailContainerStyle,
        headerContentStyle,
        headerTextStyle,
        thumbnailStyle,
        levelTextStyle
    } = styles;

    return (

        <CardSection style={{ flex: 1 }}>

            <View style={thumbnailContainerStyle}>

                <Image
                    style={thumbnailStyle}
                    source={require('../../assets/avatar/level1male.png')}
                />

            </View>

            <View style={headerContentStyle}>

                <Text style={headerTextStyle}>{user.name}</Text>

                <Text style={levelTextStyle}>{user.lvl}</Text>

            </View>

        </CardSection>

    );

};

const styles = {
    thumbnailContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },

    headerContentStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },

    headerTextStyle: {

    },

    thumbnailStyle: {
        height: 100,
        width: 100
    },

    levelTextStyle: {

    }
}

export default UserDetails;