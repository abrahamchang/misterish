import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import firebase from 'firebase'
import { connect } from 'react-redux';

import MisteryDetail from '../components/MisteryDetail';
import FriendDetail from '../components/FriendDetail';

class Profile extends Component {

    state = {
        tabIndex: 1,
        username: 'Guest',
        lvl: '0',
        description: 'Register for a more complete gaming experience.',
        creations: [],
        creationsLoaded: false,
        progress: [],
        progressLoaded: false,
        friends: [],
        friendsLoaded: false
    };

    onPress(id) {
        this.props.navigation.navigate({ routeName: 'Scanner', params: id });
    }

    async prepareCreations() {
        const creations = this.props.user.mstrList.id;
        const size = creations.length;
        const data = [];

        for (let i = 0; i < size; i++) {
            await firebase.database().ref(`/misteryMetadata/${creations[i]}`)
                .once('value')
                .then((snapshot) => {
                    data.push(snapshot.val());
                })
                .catch(() => {
                    console.log('Ocurrio un error muy grave');
                });
        }
        this.setState({ creations: data, creationsLoaded: true });
    }

    async prepareProgress() {
        const progress = Object.keys(this.props.user.playingList.completedMysteries);
        const size = progress.length;
        const data = [];

        for (let i = 0; i < size; i++) {
            await firebase.database().ref(`/misteryMetadata/${progress[i]}`)
                .once('value')
                .then((snapshot) => {
                    data.push(snapshot.val());
                })
                .catch(() => {
                    console.log('Ocurrió un error muy grave');
                });
        }
        this.setState({ progress: data, progressLoaded: true });
    }

    async prepareFriends() {
        const friends = Object.keys(this.props.user.fndList.userID);
        const size = friends.length;
        const data = [];

        for (let i = 0; i < size; i++) {
            await firebase.database().ref(`/users/${friends[i]}`)
                .once('value')
                .then((snapshot) => {
                    data.push(snapshot.val());
                })
                .catch(() => {
                    console.log('Ocurrio un error muy grave');
                });
        }
        this.setState({ friends: data, friendsLoaded: true });
    }

    componentWillMount() {
        if (this.props.user) {
            this.setState({
                username: this.props.user.username,
                lvl: this.props.user.lvl,
                description: this.props.user.description
            });
            this.prepareCreations();
            this.prepareProgress();
            this.prepareFriends();
        }
    }

    renderTab() {
        const { tabSectionContainer } = styles;
        
        if (this.state.tabIndex === 0) {
            if (this.state.creationsLoaded) {
                return (
                    <View style={tabSectionContainer}>
                        <FlatList
                            numColumns={2}
                            data={this.state.creations}
                            keyExtractor={(item) => item.id}
                            renderItem={(item) => <MisteryDetail
                                id={item.id}
                                imageURL={item.item.imageURL}
                                name={item.item.name}
                                description={item.item.description}
                                difficulty={item.item.dificulty}
                                userID={item.item.userID}
                                reviews={item.item.reviews}
                                onPress={() => this.onPress(item.item.id)}
                            />}
                        />
                    </View>
                );
            }
            else {
                return (
                    <View style={tabSectionContainer}>
                        <ActivityIndicator size='large' color="#36175E" />
                    </View>
                );
            }
        }
        else if (this.state.tabIndex === 1) {
            if (this.state.progressLoaded) {
                return (
                    <View style={tabSectionContainer}>
                        <FlatList
                            numColumns={2}
                            data={this.state.progress}
                            keyExtractor={(item) => item.id}
                            renderItem={(item) => <MisteryDetail
                                id={item.id}
                                imageURL={item.item.imageURL}
                                name={item.item.name}
                                description={item.item.description}
                                difficulty={item.item.dificulty}
                                userID={item.item.userID}
                                reviews={item.item.reviews}
                                onPress={() => this.onPress(item.item.id)}
                            />}
                        />
                    </View>
                );
            }
            else {
                return (
                    <View style={tabSectionContainer}>
                        <ActivityIndicator size='large' color="#36175E" />
                    </View>
                );
            }
        }
        else {
            if (this.state.friendsLoaded) {
                return (
                    <View style={tabSectionContainer}>
                        <ScrollView style={{ flex: 1 }}>
                            {this.renderFriends()}
                        </ScrollView>
                    </View>
                );
            }
            else {
                return (
                    <View style={tabSectionContainer}>
                        <ActivityIndicator size='large' color="#36175E" />
                    </View>
                );
            }
        }
    }

    renderFriends() {
        return this.state.friends.map(friends => {
            return <FriendDetail username={friends.username} description={friends.description} lvl={friends.lvl}/>
        }
        );
    }

    changeTab(toTab) {
        this.setState({ tabIndex: toTab });
    }

    amIActive(currentTab) {
        return this.state.tabIndex === currentTab;
    }

    logOut() {
        firebase.auth().signOut().then(() => {
            const resetItems = StackActions.reset({
                index: 0,
                actions: [{
                    type: 'Navigation/INIT',
                    routeName: 'Login'
                }]
            });
            this.props.navigation.dispatch(resetItems);
        });
    }

    render() {
        const {
            imageContainer,
            detailsContainer,
            imageStyle,
            headerStyle,
            buttonContainerIn,
            buttonContainerAc,
            tabContainer,
            tabSectionContainer
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
                            {this.state.username} | Lvl. {this.state.lvl}
                        </Text>
                        <View style={detailsContainer}>
                            <View style={{ marginHorizontal: '10%' }}>
                                <Text style={{
                                    textAlign: 'center',
                                    color: 'white',
                                }}>
                                    {this.state.description}
                                </Text>
                            </View>
                            <View style={{
                                height: '20%',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <TouchableOpacity
                                    style={{
                                        width: '30%',
                                        height: '100%',
                                        backgroundColor: 'white',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                        margin: 4
                                    }}
                                /*onPress={() => this.logOut()}*/
                                >
                                    <Text style={{ color: '#553285' }}>Change photo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        width: '30%',
                                        height: '100%',
                                        backgroundColor: 'white',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                        margin: 4
                                    }}
                                    onPress={() => this.logOut()}
                                >
                                    <Text style={{ color: '#553285' }}>Logout</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={tabContainer}>
                    <TouchableOpacity style={this.amIActive(0) ? buttonContainerIn : buttonContainerAc} onPress={() => this.changeTab(0)}>
                        <Text style={{ color: 'white' }}>Creations</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={this.amIActive(1) ? buttonContainerIn : buttonContainerAc} onPress={() => this.changeTab(1)}>
                        <Text style={{ color: 'white' }}>Progress</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={this.amIActive(2) ? buttonContainerIn : buttonContainerAc} onPress={() => this.changeTab(2)}>
                        <Text style={{ color: 'white' }}>Friends</Text>
                    </TouchableOpacity>
                </View>
                {this.renderTab()}
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
        backgroundColor: '#553285',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 5,
    },
    imageStyle: {
        resizeMode: 'contain',
        flex: 1,
        borderRadius: 50
    },
    buttonContainerIn: {
        backgroundColor: '#36175E',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        margin: 1
    },
    buttonContainerAc: {
        backgroundColor: '#7B52AB',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        margin: 1
    },
    tabContainer: {
        height: '7%',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        flexDirection: 'row',
    },
    tabSectionContainer: {
        backgroundColor: '#553285',
        height: '42%',
        width: '100%',
        marginBottom: 1,
        marginTop: 1,
        borderRadius: 5,
    }
};

const mapStateToProps = state => {
    if (state.data.data.user) {
        return {
            user: state.data.data.user
        };
    } else {
        return {
            user: state.data.user
        };
    }
};

export default connect(mapStateToProps)(Profile);