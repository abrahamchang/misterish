import React from 'react';
import { View, Text, Image } from 'react-native';
import Card from '../common/Card';
import CardSection from '../common/CardSection';
import Button from '../common/Button';

const MisteryDetail = ({ mistery }) => {

    const { image, misteryName, userID } = mistery;
    const {
        thumbnailContainerStyle,
        mlThumbnailStyle,
        headerContentStyle,
        mlHeaderTextStyle,
        flLevelTextStyle
    } = styles;

    return (

        <CardSection>
            {/* 1 Colum n*/}
            <View style={styles.thumbnailContainerStyle}>
                <Image
                    style={styles.mlThumbnailStyle}
                    source={{uri: image }}
                />
            </View>
            {/* 2 Column */}
            <View style={styles.headerContentStyle}>
                <Text style={styles.mlHeaderTextStyle}>{misteryNAme}</Text>
                <Text style={styles.flLevelTextStyle}>Difficulty:</Text>
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

    mlThumbnailStyle: {
        height: 80,
        width: 80
    },

    headerContentStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },

    mlHeaderTextStyle: {
        fontSize: 24
    },

    flLevelTextStyle: {
        fontSize: 12
    },

};

export default MisteryDetail;