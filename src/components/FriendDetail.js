import React from 'react';
import { View, Text } from 'react-native';

const FriendDetail = ({ username, description, lvl }) => {
    const { viewStyle } = styles;
    return (
        <View style={viewStyle}>
            <Text style={{ color: '#553285', fontWeight: 'bold' }}>{username} | Lvl. {lvl}</Text>
            <Text style={{ color: '#7B52AB' }}>{description}</Text>
        </View>
    );
}

const styles = {
    viewStyle: {
        backgroundColor: 'white',
        width: '48%',
        margin: '1%',
        padding: '1%',
        borderRadius: 5
    }
};

export default FriendDetail;