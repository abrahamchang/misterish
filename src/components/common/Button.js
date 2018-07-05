import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, disabled }) => {

    const { buttonStyle, textStyle, disabledStyle } = styles;
    if (disabled || disabled === undefined) {
        return (
            <TouchableOpacity onPress={onPress} style={buttonStyle}>
                <Text style={textStyle}>
                    {children}
                </Text>
            </TouchableOpacity>
        );
    } else {
        return (
            <TouchableOpacity
                onPress={onPress}
                style={disabledStyle}
                disabled={true}
            >
                <Text style={textStyle}>
                    {children}
                </Text>
            </TouchableOpacity>
        );
    }
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#36175E',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#36175E',
        marginLeft: 5,
        marginRight: 5
    },
    disabledStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#36175E',
        marginLeft: 5,
        marginRight: 5,
        opacity: 0.5
    }
};

export default Button;
