import PropTypes from 'prop-types';
import React, { Component } from 'react';
var styles = require('../../assets/files/Styles');
import { NavigationActions } from 'react-navigation';
import { Dimensions, ScrollView, View, Image, TouchableOpacity,Alert } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Thumbnail, Body, Right, Switch } from 'native-base';
var { height, width } = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import Strings from '../utils/Strings';



class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  }

  navigateToScreenExercise = (route) => async () => {
    var Payments;
    var userId = firebase.auth().currentUser.uid;
    await firebase.database().ref('users').child(userId).once('value').then(function (snapshot) {
      Payments = (snapshot.val() && snapshot.val().payment);
    });
    if(Payments == "yes"){
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  }
  else{
    Alert.alert("This feature is only for premium users!")
  }
}

  constructor(props) {
    super(props);
    this.state = {
      Payment: null,

    };
  }

  async componentDidMount() {

  }

  render() {

    return (
      <View style={styles.container_menu}>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', height: height * 0.30, marginTop: 30, padding: 30 }}>
          <Image
            source={require('../../assets/images/logo_dark.png')}
            style={{ flex: 1, width: 120, height: 120 }}
            resizeMode='contain' />
        </View>

        <ScrollView>

          <ListItem style={styles.item_menu} onPress={this.navigateToScreen('WorkoutsScreen')}>
            <Body>
              <Text style={styles.text_menu}>{Strings.ST1}</Text>
            </Body>
            <Right>
              <Ionicons name="ios-arrow-forward" style={styles.icon_menu} />
            </Right>
          </ListItem>
            <ListItem style={styles.item_menu} onPress={this.navigateToScreenExercise('ExercisesScreen')}>
              <Body>
                <Text style={styles.text_menu}>{Strings.ST2}</Text>
              </Body>
              <Right>
                <Ionicons name="ios-arrow-forward" style={styles.icon_menu} />
              </Right>
            </ListItem>
          <ListItem style={styles.item_menu} onPress={this.navigateToScreenExercise('DietsScreen')}>
            <Body>
              <Text style={styles.text_menu}>{Strings.ST3}</Text>
            </Body>
            <Right>
              <Ionicons name="ios-arrow-forward" style={styles.icon_menu} />
            </Right>
          </ListItem>

          <ListItem style={styles.item_menu} onPress={this.navigateToScreen('PostsScreen')}>
            <Body>
              <Text style={styles.text_menu}>{Strings.ST4}</Text>
            </Body>
            <Right>
              <Ionicons name="ios-arrow-forward" style={styles.icon_menu} />
            </Right>
          </ListItem>

          <ListItem style={styles.item_menu} onPress={this.navigateToScreen('Meetup')}>
            <Body>
              <Text style={styles.text_menu}>{Strings.ST5}</Text>
            </Body>
            <Right>
              <Ionicons name="ios-arrow-forward" style={styles.icon_menu} />
            </Right>
          </ListItem>

          {/* <ListItem style={styles.item_menu} onPress={this.navigateToScreen('Payment')}>
            <Body>
              <Text style={styles.text_menu}>{Strings.ST125}</Text>
            </Body>
            <Right>
              <Icon name="ios-arrow-forward-outline" style={styles.icon_menu} />
            </Right>
          </ListItem> */}

          <ListItem style={styles.item_menu} onPress={this.navigateToScreen('ProfileScreen')}>
            <Body>
              <Text style={styles.text_menu}>{Strings.ST6}</Text>
            </Body>
            <Right>
              <Ionicons name="ios-arrow-forward" style={styles.icon_menu} />
            </Right>
          </ListItem>


          <ListItem style={styles.item_menu} onPress={this.navigateToScreen('SettingsScreen')}>
            <Body>
              <Text style={styles.text_menu}>{Strings.ST7}</Text>
            </Body>
            <Right>
              <Ionicons name="ios-arrow-forward" style={styles.icon_menu} />
            </Right>
          </ListItem>


          {firebase.auth().currentUser.email == "admin@gmail.com" ? (
            <ListItem style={styles.item_menu} onPress={this.navigateToScreen('YoutubeVideos')}>
              <Body>
                <Text style={styles.text_menu}>Admin Panel</Text>
              </Body>
              <Right>
                <Ionicons name="ios-arrow-forward" style={styles.icon_menu} />
              </Right>
            </ListItem>
          ) : (
              <Text />
            )}




        </ScrollView>
        <View style={styles.footer_menu}>
          <TouchableOpacity onPress={this.navigateToScreen('LogoutScreen')}>
            <Text>{Strings.ST8}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;