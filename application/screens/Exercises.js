import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Grid, Row } from 'react-native-easy-grid';
import { Container, Text } from 'native-base';
import * as firebase from 'firebase';

import Strings from '../utils/Strings';

var styles = require('../../assets/files/Styles');

export default class Exercises extends Component {
  static navigationOptions = {
    title: `${Strings.ST2}`
  };

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }
  constructor(props) {

    super(props);

    this.state = {
      BodypartsImage: null,
      GymRoutineImage: null,
      HomeRoutineImage: null,
      ChallengeImage: null,
    }

  }

  async componentDidMount() {
    
    var that = this;
    await firebase.database().ref('BackgroundImages').child('Bodyparts').once('value').then(function (snapshot) {
      imagebodyparts = (snapshot.val() && snapshot.val().Image);
      that.setState({
        BodypartsImage: imagebodyparts
      });
    });
    await firebase.database().ref('BackgroundImages').child('GymRoutine').once('value').then(function (snapshot) {
      imagegym = (snapshot.val() && snapshot.val().Image);
      that.setState({
        GymRoutineImage: imagegym
      });
    });
    await firebase.database().ref('BackgroundImages').child('Challenge').once('value').then(function (snapshot) {
      imagehome = (snapshot.val() && snapshot.val().Image);
      that.setState({
        ChallengeImage: imagehome
      });
    });
  }

  render() {

    return (

      <Container style={styles.background_general}>
        <Grid>

          <Row onPress={this.navigateToScreen('EBodypartsScreen')} activeOpacity={1}>
            <ImageBackground source={{ uri: this.state.BodypartsImage }} style={styles.card_general}>
              <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']} style={styles.gradient_general}>
                <Text style={styles.title_general}>GET SLICKFIT</Text>
                <Text style={styles.subtitle_general}>weekly plan each body part</Text>
              </LinearGradient>
            </ImageBackground>
          </Row>

          <Row onPress={this.navigateToScreen('EquipmentsScreen')} activeOpacity={1}>

            <ImageBackground source={{ uri: this.state.GymRoutineImage }} style={styles.card_general}>
              <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']} style={styles.gradient_general}>
                <Text style={styles.title_general}>SLICKFIT COACH</Text>
                <Text style={styles.subtitle_general}>plans design by your favorite SlickFit Coach</Text>
              </LinearGradient>
            </ImageBackground>
          </Row>

          <Row onPress={this.navigateToScreen('Challenge')} activeOpacity={1}>

            <ImageBackground source={{ uri: this.state.ChallengeImage }} style={styles.card_general}>
              <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']} style={styles.gradient_general}>
                <Text style={styles.title_general}>{Strings.ST116}</Text>
                <Text style={styles.subtitle_general}>{Strings.ST117}</Text>
              </LinearGradient>
            </ImageBackground>
          </Row>

        </Grid>
      </Container>

    );
  }
}
