import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Permissions } from 'expo';
import { StackActions, NavigationActions } from 'react-navigation';
import firebase from 'firebase';
import { connect } from 'react-redux';
import MisteryDetail from '../components/MisteryDetail';
import MisteryOfTheDay from '../components/MisteryOfTheDay';
import { reloadHomeData } from '../actions';

class Home extends Component {
    state = {
        cargando: false,
        tabIndex: 1,

        newMysteries: [],
        new: false,

        completedMysteries: [],
        completed: false,

        unfinishedMysteries: [],
        unfinished: false,
    };

    onPress(id) {
        this.props.navigation.navigate({ routeName: 'Scanner', params: { id, user: this.props.user } });
    }

    prepareData() {
        if (this.props.data) {
            const mysteries = this.props.data;
            const allKeys = Object.keys(mysteries);
            if (this.props.user) {
                if (this.props.user.playingList.unfinishedMysteries) {
                    const unfinishedKeys = Object.keys(this.props.user.playingList.unfinishedMysteries);
                    const dataUnfinished = [];
                    unfinishedKeys.forEach((key) => {
                        dataUnfinished.push(mysteries[key]);
                        delete allKeys[key];
                    });
                    this.setState({ unfinishedMysteries: dataUnfinished, unfinished: true });
                }
                if (this.props.user.playingList.completedMysteries) {
                    const completedKeys = Object.keys(this.props.user.playingList.completedMysteries);
                    const dataCompleted = [];
                    completedKeys.forEach((key) => {
                        dataCompleted.push(mysteries[key]);
                        delete allKeys[key];
                    });
                    this.setState({ completedMysteries: dataCompleted, completed: true });
                }
            }
            const dataNew = [];
            allKeys.forEach((key) => {
                if (key != undefined) {
                    dataNew.push(mysteries[key]);
                }
            });
            this.setState({ newMysteries: dataNew, new: true });
        } else {
            console.log("Ocurrio un problema muy grave en Home > 'this.props.data' no existe. ");
        }
    }

    prepareMistOfTheDay() {
        const params = this.props.data;
        const keys = Object.keys(params);
        const data = [];
        keys.forEach((key) => {
            data.push(params[key]);
        });
        return data;
    }

    componentDidMount() {
        const { status } = Permissions.askAsync(Permissions.CAMERA);
        this.prepareData();

    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.cargando) {
            this.setState({ cargando: true });

            firebase.database().ref('/misteryMetadata').once('value')
                .then((datos) => {
                    const data = datos.val();
                    datos = {
                        user: this.props.user,
                        data,
                        reload: this.props.reload
                    };
                    this.props.reloadHomeData(datos);
                    this.prepareData();
                    this.setState({ cargando: false });
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    changeTab(toTab) {
        this.setState({ tabIndex: toTab });
    }

    amIActive(currentTab) {
        return this.state.tabIndex === currentTab;
    }

    renderTab() {
        const { tabSectionContainer, loadingText } = styles;

        if (this.state.tabIndex === 0) {
            if (this.state.unfinished) {
                return (
                    <View style={tabSectionContainer}>
                        <FlatList
                            numColumns={2}
                            data={this.state.unfinishedMysteries}
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
            } else {
                return (
                    <View style={tabSectionContainer}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            <ActivityIndicator size='large' color="#36175E" />
                            <Text style={loadingText}>Wow ... It seems you have no mystery in progress!</Text>
                        </View>
                    </View>
                );
            }
        }
        else if (this.state.tabIndex === 1) {
            if (this.state.new) {
                return (
                    <View style={tabSectionContainer}>
                        <FlatList
                            numColumns={2}
                            data={this.state.newMysteries}
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
            } else {
                return (
                    <View style={tabSectionContainer}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                            <ActivityIndicator size='large' color="#36175E" />
                            <Text style={loadingText}>Wait a bit, great mysteries await you!</Text>
                        </View>
                    </View>
                );
            }
        }
        else {
            if (this.state.completed) {
                return (
                    <View style={tabSectionContainer}>
                        <FlatList
                            numColumns={2}
                            data={this.state.completedMysteries}
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
            } else {
                return (
                    <View style={tabSectionContainer}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            <ActivityIndicator size='large' color="#36175E" />
                            <Text style={loadingText}>Wow ... It seems you have no mystery completed!</Text>
                        </View>
                    </View>
                );
            }
        }
    }

    render() {
        const { tabContainer, buttonContainerIn, buttonContainerAc } = styles;
        let dairyMist = this.props.mistOfDay;
        console.log(dairyMist);
        let daily;
        if (this.prepareMistOfTheDay()[dairyMist]) {
            daily = this.prepareMistOfTheDay()[dairyMist];
        } else {
            daily = {
                id: '',
                imageURL: '',
                name: '',
                description: '',
                dificulty: '',
                userID: '',
                reviews: '',
            }
        }
        if (this.state.cargando) {
            return <ActivityIndicator size="large" color="#36175E" />;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: 'center', color: '#553285', fontSize: 18, margin: 2 }}>
                        Mistery of the day
                    </Text>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#553285', padding: '1%' }}>
                        <MisteryOfTheDay
                            id={daily.id}
                            imageURL={daily.imageURL}
                            name={daily.name}
                            description={daily.description}
                            difficulty={daily.dificulty}
                            userID={daily.userID}
                            reviews={daily.reviews}
                            onPress={() => this.onPress(daily.id)}
                        />
                    </View>
                    <View style={{ flex: 3 }}>
                        <View style={tabContainer}>
                            <TouchableOpacity style={this.amIActive(0) ? buttonContainerIn : buttonContainerAc} onPress={() => this.changeTab(0)}>
                                <Text style={{ color: 'white' }}>In Progress</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={this.amIActive(1) ? buttonContainerIn : buttonContainerAc} onPress={() => this.changeTab(1)}>
                                <Text style={{ color: 'white' }}>New Mysteries</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={this.amIActive(2) ? buttonContainerIn : buttonContainerAc} onPress={() => this.changeTab(2)}>
                                <Text style={{ color: 'white' }}>Completed</Text>
                            </TouchableOpacity>
                        </View>
                        {this.renderTab()}
                    </View>
                </View>
            );
        }
    }
}

const mapStateToProps = state => {
    if (state.data.data.params && state.data.mistOfDay !== undefined) {
        return {
            data: state.data.data.params,
            reload: state.reload ? state.reload.reload : false,
            user: state.data.data.user,
            mistOfDay: state.data.mistOfDay
        };
    } else {
        if ((state.reload && typeof state.reload !== 'object') || state.reload === null) {
            return {
                data: state.data.data,
                reload: state.reload ? state.reload : false,
                user: state.data.user,
                mistOfDay: state.data.mistOfDay
            };
        } else if (state.reload.reload === true || state.reload.reload === false) {
            return {
                data: state.data.data,
                reload: state.reload.reload,
                user: state.data.user,
                mistOfDay: state.data.mistOfDay
            };
        }
    }
};

const styles = {
    tabSectionContainer: {
        backgroundColor: '#553285',
        flex: 1,
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
        height: 50,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        flexDirection: 'row',
    },
    loadingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    }
};

export default connect(mapStateToProps, { reloadHomeData })(Home);