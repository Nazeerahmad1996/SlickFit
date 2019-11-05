import React, { Component } from 'react';
import { } from "react-native";
import { ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import * as firebase from 'firebase';

import avatar from '../../assets/images/avatar.png';
import StarRating from 'react-native-star-rating';
export default class CommentList extends Component {
  render() {
    const { comment } = this.props;
    var user = firebase.auth().currentUser;
    var photoUrl;

    if (comment.Profile != null) {
      photoUrl = comment.Profile;
    }
    return (

      <ListItem avatar style={{ marginBottom: 15, marginLeft: 0 }}>
        <Left>
          <Thumbnail source={photoUrl ? { uri: comment.Profile } : avatar} />
        </Left>
        <Body>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={comment.rating}
            containerStyle={{ width: 80 }}
            starSize={15}
            starStyle={{ color: '#f39c12' }}
          />

          <Text note numberOfLines={2}>{comment.comment}</Text>
        </Body>
        <Right>
          <Text note>{comment.user}</Text>
        </Right>
      </ListItem>

    )
  }
}