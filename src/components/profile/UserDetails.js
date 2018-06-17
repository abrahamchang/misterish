import React from 'react';
import ReactNative from 'react-native';
import { Text, Image, View } from 'react-native';
import CardSection from '../../components/common/CardSection';

const UserDetails = () => {
    
    var dummy = {
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

                <Text style={headerTextStyle}>{dummy.name}</Text>

                <Text style={levelTextStyle}>{dummy.lvl}</Text>

            </View>

        </CardSection>

    );

};

const styles = {
    thumbnailContainerStyle: {
    
    },

    headerContentStyle: {

    },

    headerTextStyle: {

    },

    thumbnailStyle: {

    },

    levelTextStyle: {

    }
}

export default UserDetails;