import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import AppPreLoader from '../components/AppPreLoader';
import { View, FlatList, ScrollView } from 'react-native';


import { Container, Text, Body, Right, List, Thumbnail, ListItem } from 'native-base';
import * as firebase from 'firebase';
import Strings from '../utils/Strings'
import { Ionicons } from '@expo/vector-icons';


var styles = require('../../assets/files/Styles');

export default class ExercisesByHome extends Component {
  static navigationOptions = {
    title: `${Strings.ST113}`,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      message: '',
      messages: [],
    };
  }

  componentDidMount() {

    firebase
      .database()
      .ref()
      .child('HomeWorkout')
      .once("value", snapshot => {

        const data = snapshot.val()
        if (snapshot.val()) {
          const initMessages = [];
          Object
            .keys(data)
            .forEach(message => initMessages.push(data[message]));


          var reversed = initMessages.reverse()
          this.setState({
            messages: reversed,

          });
          this.setState({ isLoading: false })
        }
      });

  }

  ExerciseDetails(item) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'ExerciseDetailsScreen',
      params: { item }
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {

    if (this.state.isLoading) {
      return (
        <AppPreLoader />
      );
    }

    const { params } = this.props.navigation.state;
    const IdMuscle = params ? params.IdMuscle : null;

    return (
      <Container style={styles.background_general}>
        <ScrollView>

          <List>



            <FlatList
              data={this.state.messages}
              refreshing="false"
              renderItem={
                ({ item }) =>
                  <View>
                    <ListItem style={{ paddingLeft: 0, marginLeft: 0, backgroundColor: '#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1 }} onPress={() => this.ExerciseDetails(item)} >

                      <Thumbnail square size={80} source={{ uri: item.Thumbnail }} style={{ paddingLeft: 10, marginLeft: 10 }} />
                      <Body style={{ paddingLeft: 0, marginLeft: 0 }}>
                        <Text numberOfLines={1} style={{ fontSize: 14, marginBottom: 3 }}>
                          {item.Title}
                        </Text>
                        <Text note>
                          {item.Type}
                        </Text>
                      </Body>
                      <Right>
                        <Text note>
                          <Ionicons name="ios-arrow-forward" style={styles.icon_menu} />

                        </Text>
                      </Right>

                    </ListItem>
                  </View>




              }

            />
          </List>

        </ScrollView>

      </Container>
    );
  }
}

