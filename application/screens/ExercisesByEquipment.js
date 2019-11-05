import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import AppPreLoader from '../components/AppPreLoader';
import { View, FlatList, ScrollView } from 'react-native';

import { Container, Text, Body, Right, List, Thumbnail, ListItem } from 'native-base';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';



var styles = require('../../assets/files/Styles');

export default class ExercisesByEquipment extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.TitleEquipment}`,
  });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      message: '',
      messages: [],
      isTrue: true
    };
  }

  componentDidMount() {




    firebase
      .database()
      .ref()
      .child('Equipment').child(this.props.navigation.state.params.TitleEquipment)
      .on("value", snapshot => {

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

        }
      });
    this.setState({ isLoading: false })
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
    const IdEquipment = params ? params.IdEquipment : null;

    return (
      <Container style={styles.background_general}>
        <ScrollView>

          <List>

            <FlatList
              data={this.state.messages}
              renderItem={
                ({ item, index }) =>
                  <View>
                    <ListItem style={{ paddingLeft: 0, marginLeft: 0, backgroundColor: '#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1 }} onPress={() => this.ExerciseDetails(item)} >
                    <Text note style={{paddingRight:3,paddingLeft:10,}}>
                        {index + 1}.
                      </Text>
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

