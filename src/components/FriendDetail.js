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
        padding: '1%',
        borderRadius: 5,
        height: 60, 
        margin: 4 
    }
};

export default FriendDetail;