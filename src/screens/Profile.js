import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import firebase from 'firebase'

class Profile extends Component {

    state = {
        tabIndex: 1
    };

    ensayoError() {
        console.log('hola');
        //console.log(this.props.navigation.state.params.params.params.user);
    }

    renderTab() {
        this.ensayoError();
        const { tabSectionContainer } = styles;
        if (this.state.tabIndex === 0) {
            return (
                <View style={tabSectionContainer}>
                    <Text>A</Text>
                </View>
            );
        }
        else if (this.state.tabIndex === 1) {
            return (
                <View style={tabSectionContainer}>
                    <Text>B</Text>
                </View>
            );
        }
        else {
            return (
                <View style={tabSectionContainer}>
                    <Text>C</Text>
                </View>
            );
        }
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
                    routeName: 'Loading'
                    //AQUI ME FALTA ALGO PERO NO ME ACUERDO
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
                            Abraham Chang | Lvl. 1
                        </Text>

                        <View style={detailsContainer}>
                            <Text style={{ textAlign: 'center' }}>Espera lo mejor, preparate para lo peor y acepta lo que venga.</Text>


                            <TouchableOpacity
                                style={{
                                    width: '30%',
                                    height: '20%',
                                    backgroundColor: 'white',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10
                                }}
                                onPress={() => this.logOut()}
                            >
                                <Text style={{ color: '#553285' }}>Logout</Text>
                            </TouchableOpacity>

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
        borderColor: '#553285',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: '1%',
        marginRight: '1%',
        borderWidth: 2,
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
        backgroundColor: 'yellow',
        height: '42%',
        width: '100%',
        marginBottom: 1,
        marginTop: 1
    }
};

export default Profile;