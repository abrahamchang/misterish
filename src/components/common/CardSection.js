import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        borderColor: 'transparent',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative'
    }

};

export default CardSection;