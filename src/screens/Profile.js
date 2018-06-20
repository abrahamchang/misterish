{/*  */}
import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Text, Image, Button, ScrollView } from 'react-native';
import { Permissions } from 'expo';
import { StackActions, NavigationActions } from 'react-navigation';
{/*  */}
import Card from '../components/common/Card';
import CardSection from '../components/common/CardSection';
import MisteryDetail from '../components/MisteryDetail';
import Input from '../components/common/Input';

class Profile extends Component {

    state = { text: '' };

    prepareData() {
        console.log(this.props.navigation.state.params.user);
    }

    render() {
        this.prepareData();
        return (
            <Card>
                <ScrollView>
                {/* Nickname + Avatar + Level + Add Friend Button Section */}
                <CardSection style={{ flex: 1 }}>
                    {/* 1 Colum n*/}
                    <View style={ styles.thumbnailContainerStyle }>
                        <Image
                            style={ styles.thumbnailStyle }
                            source={require('../assets/avatar/level1male.png')}
                        />
                    </View>
                    {/* 2 Column */}
                    <View style={styles.headerContentStyle}>
                            <Text style={styles.headerTextStyle}>CrazyBK</Text>
                            {/* Input to Change Nickname */}
                            <Input
                                label = "Change Nickname"
                                value={this.state.text}
                                onChangeText={text => this.setState({ text })}
                            />
                        <Text style={styles.levelTextStyle}>Level 0</Text>
                    </View>
                </CardSection>

                {/* Mistery List */}
                <CardSection>

                    <View>
                        <Text style={styles.titleTextStyle}>Misteries List</Text>
                    </View>

                </CardSection>

                <CardSection>
                    {/* 1 Colum n*/}
                    <View style={styles.thumbnailContainerStyle}>
                        <Image
                            style={styles.mlThumbnailStyle}
                            source={require('../assets/mistery/unimet1.png')}
                        />
                    </View>
                    {/* 2 Column */}
                    <View style={styles.headerContentStyle}>
                            <Text style={styles.mlHeaderTextStyle}>Misterio Loco</Text>
                            <Text style={styles.flLevelTextStyle}>Difficulty:</Text>
                    </View>
                </CardSection>

                {/* High Scores List */}
                <CardSection>

                    <View>
                        <Text style = { styles.titleTextStyle }>High Scores</Text>
                    </View>

                    <ScrollView>
                        {/*<HighscoreList />*/}
                    </ScrollView>

                </CardSection>


                {/* Friend List */}
                <CardSection>
                    <View>
                        <Text style = { styles.titleTextStyle }>Friend List</Text>
                    </View>
                </CardSection>

                <CardSection>
                    {/* 1 Colum n*/}
                    <View style={styles.thumbnailContainerStyle}>
                        <Image
                            style={styles.flThumbnailStyle}
                            source={require('../assets/avatar/level1female.png')}
                        />
                    </View>
                    {/* 2 Column */}
                    <View style={styles.headerContentStyle}>
                        <Text style={styles.flHeaderTextStyle}>Princess00</Text>
                        <Text style={styles.flLevelTextStyle}>Level 4</Text>
                    </View>
                </CardSection>

                <CardSection>
                    {/* 1 Colum n*/}
                    <View style={styles.thumbnailContainerStyle}>
                        <Image
                            style={styles.flThumbnailStyle}
                            source={require('../assets/avatar/level5.png')}
                        />
                    </View>
                    {/* 2 Column */}
                    <View style={styles.headerContentStyle}>
                        <Text style={styles.flHeaderTextStyle}>420BlazeIt</Text>
                        <Text style={styles.flLevelTextStyle}>Level 5</Text>
                    </View>
                </CardSection>

                <CardSection>
                    {/* 1 Colum n*/}
                    <View style={styles.thumbnailContainerStyle}>
                        <Image
                            style={styles.flThumbnailStyle}
                            source={require('../assets/avatar/level10.png')}
                        />
                    </View>
                    {/* 2 Column */}
                    <View style={styles.headerContentStyle}>
                        <Text style={styles.flHeaderTextStyle}>IWearFedoras</Text>
                        <Text style={styles.flLevelTextStyle}>Level 10</Text>
                    </View>
                </CardSection>

                </ScrollView>
            </Card>


        );
    }
}

const styles = {

    buttonContentStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonStyle: {
        height: 50,
        width: 50,
    },

    headerContentStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },

    headerTextStyle: {
        fontSize: 30
    },

    titleTextStyle: {
        fontSize: 30,
        marginLeft: 10
    },

    flHeaderTextStyle: {
        fontSize: 24
    },

    mlHeaderTextStyle: {
        fontSize: 24
    },

    levelTextStyle: {
        fontSize: 18
    },

    flLevelTextStyle: {
        fontSize: 12
    },

    thumbnailStyle: {
        height: 100,
        width: 100
    },

    flThumbnailStyle: {
        height: 80,
        width: 80
    },

    mlThumbnailStyle: {
        height: 80,
        width: 80
    },

    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },

};

export default Profile;