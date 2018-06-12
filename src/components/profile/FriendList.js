import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import FriendDetail from './FriendDetail';


class FriendList extends Component {

    state = { friends: [] };

    componentWillMount() {
    }

    renderFriends() {
        return this.state.friends.map(friend =>
            <FriendDetail key={friend.userID} lvl={lvl} avatar={avatar} />);
    }

    render() {

        return (
            <ScrollView>
                {this.renderFriends()}
            </ScrollView>
        );
    }

}

export default FriendList;