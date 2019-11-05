import React from 'react';

import { AppLoading } from 'expo';
import { Root } from "native-base";
import { StatusBar } from "react-native";
import AppPreLoader from "./application/components/AppPreLoader";
import firebaseConfig from './application/utils/Firebase';
import * as firebase from 'firebase';
firebase.initializeApp(firebaseConfig);

import GuestNavigation from './application/navigations/Guest';
import LoggedNavigation from './application/navigations/Logged';
import OfflineBar from "./application/components/OfflineBar";

import { Notifications } from 'expo'
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import * as Permissions from 'expo-permissions';
import { Asset } from 'expo-asset';

console.disableYellowBox = true;

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}



export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogged: false,
      loaded: false,
      isReady: false,
    }
  }

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      let token = await Notifications.getExpoPushTokenAsync();
      var userId = firebase.auth().currentUser.uid
      // POST the token to your backend server from where you can retrieve it to send push notifications.

      await firebase.database().ref('users/' + userId).update({
        expoToken: token
      }).then((data) => {


      }).catch((error) => {
        console.log('=---------------------------------Notificationrequrest---------------------------------------error ', error)
      });
      return;
    }

    try {
      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync();
      var userId = firebase.auth().currentUser.uid
      // POST the token to your backend server from where you can retrieve it to send push notifications.

      await firebase.database().ref('users/' + userId).update({
        expoToken: token
      }).then((data) => {


      }).catch((error) => {
        console.log('=---------------------------------Notificationrequrest---------------------------------------error ', error)
      });

    } catch (error) {
      console.log(error);
    }
  };

  // async componentDidMount() {
  //   this.currentUser = await firebase.auth().currentUser;
  //   await this.registerForPushNotificationsAsync();
  // }

  registerForPushNotification = async () => {

    const { existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    var userId = firebase.auth().currentUser.uid
    // POST the token to our backend so we can use it to send pushes from there
    var updates = {}
    updates['/expoToken'] = token
    await firebase.database().ref('users/' + userId).update(updates)
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./assets/images/bg.jpg'),
      require('./assets/images/goals.jpg'),
      require('./assets/images/levels.jpg'),
      require('./assets/images/header.jpg'),
      require('./assets/images/bodyparts.jpg'),
      require('./assets/images/equipments.jpg'),
      require('./assets/images/logo.png'),
      require('./assets/images/logo_dark.png'),
      require('./assets/images/workouts.png'),
      require('./assets/images/exercises.png'),
      require('./assets/images/calculator.png'),
      require('./assets/images/diets.png'),
      require('./assets/images/store.png'),
      require('./assets/images/chrono.png'),
      require('./assets/images/sets.png'),
      require('./assets/images/reps.png'),
      require('./assets/images/star.png'),
      require('./assets/images/avatar.png'),
      require('./assets/images/bookmarked.png'),
      require('./assets/images/emptylist.png'),
      require('./assets/images/avatar.jpg'),
      require('./assets/images/profilebg.jpg'),
      require('./assets/images/restday.png'),
      require('./assets/images/blog.png'),
      require('./assets/images/quotes.png'),
      require('./assets/images/checked.png'),
      require('./assets/images/nointernet.png'),
      require('./assets/images/contact.png'),
    ]);

    await Promise.all([...imageAssets]);
  }

  async componentDidMount() {

    await this.registerForPushNotificationsAsync();
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Entypo: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });

    await firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        this.setState({
          isLogged: true,
          loaded: true
        });
      } else {
        this.setState({
          isLogged: false,
          loaded: true
        });
      }
    })

  }

  render() {

    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    const { isLogged, loaded, isReady } = this.state;

    if (!loaded) {
      return (
        <AppPreLoader />
      );
    }

    if (isLogged && isReady) {
      return (
        <Root>
          <OfflineBar />
          <StatusBar barStyle="light-content" backgroundColor="#4b4b4b" />

          <LoggedNavigation />
        </Root>
      );
    } else {
      return (
        <Root>
          <StatusBar hidden />
          <GuestNavigation />
        </Root>
      );
    }
  }
}


