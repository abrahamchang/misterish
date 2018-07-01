import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { reloadHome } from '../actions';

class Header extends Component {
    onPressReload() {
        this.props.reloadHome(this.props.reloadState);
    }

    render() {
        return (
            <View style={styles.ventanaStyle}>
                <TouchableOpacity style={styles.contenedorBoton} onPress={this.onPressReload.bind(this)}>
                    <Image style={styles.botonesStyle} source={require('../assets/refresh.png')}/>
                </TouchableOpacity>

                <View>
                    <Text style={styles.textoStyle}>{this.props.tituloHeader}</Text>
                </View>

                <TouchableOpacity style={styles.contenedorBoton}>
                    <Image style={styles.botonesStyle} source={require('../assets/search.png')} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    botonesStyle: {
        resizeMode: 'contain', 
        flex: 1
    },
    ventanaStyle: {
        backgroundColor: '#36175E',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 65,
        paddingTop: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative',
        flexDirection: 'row'
    },
    textoStyle: {
        fontSize: 20,
        color: 'white'
    },
    contenedorBoton: {
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12
    }

};

const mapStateToProps = state => {
    if ((state.reload && typeof state.reload !== 'object') || state.reload === null) {
        return {
            reloadState: state.reload ? state.reload : false
        };
    } else if (state.reload.reload === true || state.reload.reload === false) {
        return {
            reloadState: state.reload.reload
        };
    }
};

export default connect(mapStateToProps, { reloadHome })(Header);