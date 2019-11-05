import React, { Component } from 'react';
import AppPreLoader from '../components/AppPreLoader';
import { TouchableOpacity, Dimensions, View, Image, ScrollView } from 'react-native';
import { Container, Text } from 'native-base';
import ConfigApp from '../utils/ConfigApp';

import Strings from '../utils/Strings';


var styles = require('../../assets/files/Styles');

export default class AboutUs extends Component {
  static navigationOptions = {
    title: `${Strings.ST9}`,
  };


  constructor(props) {

    super(props);

    this.state = {
      isLoading: true
    }

  }

  componentDidMount() {

    return fetch(ConfigApp.URL + 'json/data_strings.php')
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


  render() {

    if (this.state.isLoading) {
      return (
        <AppPreLoader />
      );
    }

    return (
      < Container style={styles.background_general} >
        <ScrollView>

          <View style={{ flex: 0.8, padding: 20 }} >
            <View style={{ flex: 0.8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
              <Image source={require('../../assets/images/logo_dark.png')} style={styles.logo_start} resizeMode="contain" />
            </View>
            <Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, fontSize: 26, fontWeight: 'bold', textAlign: 'center' }}>
              {Strings.ST9}
            </Text>
            <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
              Welcome to Slickfitness, Find a trainer to reach your goals or Find your a competitive Gym Squad.We can all agree that being fit is more fun with others at your fitness level! Motivation, Accountability and Friendly Competition has proven to effectively push human to perform higher.Slickfitness App is a social platform that connect fitfam nation all around the world embarking on a fitness journey.Download to be a member slickfit squad. 100’s of workouts, trainers, meal guides everything you need to reach your goal and a REAL COMMUNITY.
              </Text>

          </View>
        </ScrollView>

      </Container >

    )
  }

}