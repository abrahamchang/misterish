import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Permissions } from 'expo';
import { StackActions, NavigationActions } from 'react-navigation';
import firebase from 'firebase';
import { connect } from 'react-redux';
import MisteryDetail from '../components/MisteryDetail';
import { reloadHomeData } from '../actions';

class Home extends Component {
    state = {
        cargando: false,
        completedMysteries: [],
        progressMysteries: []
    };

    onPress(id) {
       this.props.navigation.navigate({ routeName: 'Scanner', params: id });
    }

    prepareData() {
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
                    this.setState({ cargando: false });
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    render() {
        if (this.state.cargando) {
            return (
                <View style={{ flex: 1, backgroundColor: '#553285' }}>
                    <ActivityIndicator size="large" color='#36175E'/>
                </View>
            );
        } else {
            return (
                <View style={{ flex: 1, backgroundColor: '#553285' }}>
                    <FlatList
                        numColumns={3}
                        data={this.prepareData()}
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
    }
}

const mapStateToProps = state => {
    if (state.data.data.params) {
        return {
            data: state.data.data.params,
            reload: state.reload ? state.reload.reload : false,
            user: state.data.data.user
        };
    } else {
        if ((state.reload && typeof state.reload !== 'object') || state.reload === null) {
            return {
                data: state.data.data,
                reload: state.reload ? state.reload : false,
                user: state.data.user
            };
        } else if (state.reload.reload === true || state.reload.reload === false) {
            return {
                data: state.data.data,
                reload: state.reload.reload,
                user: state.data.user
            };
        }
    }
};

export default connect(mapStateToProps, { reloadHomeData })(Home);