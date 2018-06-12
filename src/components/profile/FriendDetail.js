import React from 'react';
import { View, Text, Image } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

const FriendDetail = ({ friend }) => {

    const { userID, lvl, avatar } = friend;
    const {
        thumbnailContainerStyle,
        flThumbnailStyle,
        headerContentStyle,
        flHeaderTextStyle,
        flLevelTextStyle
    } = styles;

    return (
        <CardSection>
            {/* Column 1 */}
            <View style={thumbnailContainerStyle}>
                <Image
                    style={flThumbnailStyle}
                    source={require('../assets/avatar/{avatar}')}
                />
            </View>
            {/* Column 2 */}
            <View style={headerContentStyle}>
                <Text style={flHeaderTextStyle}>{userID}</Text>
                <Text style={flLevelTextStyle}>Level {lvl}</Text>
            </View>
        </CardSection>
    );

};

const styles = {

    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },

    flThumbnailStyle: {
        height: 80,
        width: 80
    },

    headerContentStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },

    flHeaderTextStyle: {
        fontSize: 30,
        marginLeft: 10
    },

    flLevelTextStyle: {
        fontSize: 12
    }

};

export default FriendDetail;