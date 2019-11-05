import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import AppPreLoader from '../components/AppPreLoader';
import {  FlatList, ScrollView } from 'react-native';
import { Container, Text, Body, Right, List, Thumbnail, ListItem } from 'native-base';

import ConfigApp from '../utils/ConfigApp';


var styles = require('../../assets/files/Styles');

export default class HomeExercise extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.TitleBodypart}`,
  });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {

    return fetch(ConfigApp.URL + 'json/data_muscle.php?muscle=' + this.props.navigation.state.params.IdMuscle)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        }, function () {
        });
      })
      .catch((error) => {
        console.error(error);
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
              data={this.state.dataSource}
              refreshing="false"
              inverted="true"
              renderItem={({ item }) =>

                <ListItem style={{ paddingLeft: 0, marginLeft: 0, backgroundColor: '#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1 }} onPress={() => this.ExerciseDetails(item)} >
                  <Thumbnail square size={80} source={{ uri: ConfigApp.URL + 'images/' + item.exercise_image }} style={{ paddingLeft: 10, marginLeft: 10 }} />
                  <Body style={{ paddingLeft: 0, marginLeft: 0 }}>
                    <Text numberOfLines={1} style={{ fontSize: 14, marginBottom: 3 }}>
                      {item.exercise_title}
                    </Text>
                    <Text note>
                      {item.level_title}
                    </Text>
                  </Body>
                  <Right>
                    <Text note>
                      <Icon name="ios-arrow-forward" style={styles.icon_menu} />
                    </Text>
                  </Right>
                </ListItem>

              }
              keyExtractor={(item, index) => index.toString()}


            />

          </List>

        </ScrollView>


      </Container>
    );
  }
}

