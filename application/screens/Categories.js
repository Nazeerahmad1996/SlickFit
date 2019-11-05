import React, { Component } from 'react';
import AppPreLoader from '../components/AppPreLoader';
import { FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Container, Text, Body, Right, List,  Thumbnail, ListItem } from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';


var styles = require('../../assets/files/Styles');

export default class Categories extends Component {
  static navigationOptions = {
    title: `${Strings.ST41}`,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {

    return fetch(ConfigApp.URL + 'json/data_categories.php')
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

  DietsByCategory = (category_id, category_title) => {
    this.props.navigation.navigate('DietsByCategoryScreen', { IdCategory: category_id, TitleCategory: category_title });
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
              refreshing="false"
              renderItem={({ item }) =>

                <ListItem style={{ paddingLeft: 0, marginLeft: 0, backgroundColor: '#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1 }} onPress={this.DietsByCategory.bind(this, item.category_id, item.category_title)} >
                  <Thumbnail rounded size={80} source={{ uri: ConfigApp.URL + 'images/' + item.category_image }} style={{ paddingLeft: 10, marginLeft: 10 }} />
                  <Body style={{ paddingLeft: 0, marginLeft: 0 }}>
                    <Text numberOfLines={1} style={{ marginTop: 3 }}>
                      {item.category_title}
                    </Text>
                  </Body>
                  <Right>
                    <Text note>
                      <Ionicons name="md-arrow-forward" style={styles.icon_menu} />

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
