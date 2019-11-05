import React, { Component } from 'react';
import AppPreLoader from '../components/AppPreLoader';
import { FlatList, ScrollView } from 'react-native';
import { Container, Text, Body, List, Left, ListItem } from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';
import { Ionicons } from '@expo/vector-icons';


var styles = require('../../assets/files/Styles');

export default class Tags extends Component {
  static navigationOptions = {
    title: `${Strings.ST55}`,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {

    return fetch(ConfigApp.URL + 'json/data_tags.php')
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

  PostsByTag = (tag_id, tag_title) => {
    this.props.navigation.navigate('PostsByTagScreen', { IdTag: tag_id, TitleTag: tag_title });
  }

  render() {

    if (this.state.isLoading) {
      return (
        <AppPreLoader />
      );
    }

    return (

      <Container style={styles.background_general}>
        <ScrollView>
          <List>
            <FlatList
              data={this.state.dataSource}
              renderItem={({ item, index }) =>
                <ListItem icon onPress={this.PostsByTag.bind(this, item.tag_id, item.tag_title)}>
                  <Body>
                    <Text>{item.tag_title}</Text>
                  </Body>
                  <Left>
                    <Ionicons name="ios-arrow-forward" style={styles.icon_menu} />
                  </Left>
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
