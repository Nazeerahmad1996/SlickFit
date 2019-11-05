import React, { Component } from 'react';
import * as firebase from 'firebase';
import { ImageBackground, TouchableOpacity, Dimensions, View, Image, Modal, ScrollView, FlatList, Alert } from 'react-native';
import { Container, Item, Thumbnail, Text, Input, Button, Tab, Tabs } from 'native-base';
import DietFav from '../components/DietFav';
import WorkoutFav from '../components/WorkoutFav';
import Strings from '../utils/Strings';
import AppPreLoader from '../components/AppPreLoader';
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';



var styles = require('../../assets/files/Styles');
var { height, width } = Dimensions.get('window');

export default class Profile extends Component {
  static navigationOptions = {
    title: `${Strings.ST6}`,
  };


  constructor(props) {

    super(props);

    this.state = {
      loading: true,
      phoneno: null,
      modalVisible: false,
      Image: null,
      Avatar: null,
      isLoading: true,
      trainerData: '',
      trainer: [],
      insta: '',
    }

  }

  async componentDidMount() {

    var userId = firebase.auth().currentUser.uid;
    var ImageAvatar
    var ig;
    await firebase.database().ref('users').child(userId).once('value').then(function (snapshot) {
      ImageAvatar = (snapshot.val() && snapshot.val().Image);
      ig = (snapshot.val() && snapshot.val().Phone);

    });
    this.setState({ Avatar: ImageAvatar });
    this.setState({ insta: ig });
    this.setState({ isLoading: false });

    var ref = firebase.database().ref("Progress").child(userId);

    ref.orderByChild("Public").equalTo("yes").on("value", snapshot => {
      const data = snapshot.val()
      if (snapshot.val()) {
        const initMessages = [];
        Object
          .keys(data)
          .forEach(trainerData => initMessages.push(data[trainerData]));

        var reversed = initMessages.reverse()
        this.setState({
          trainer: reversed,

        });
      }
    });


  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }



  render() {

    if (this.state.isLoading) {
      return (
        <AppPreLoader />
      );
    }

    var user = firebase.auth().currentUser;
    var email, displayName, emailVerified, creationTime;

    if (user != null) {
      email = user.email;
      displayName = user.displayName;
      emailVerified = user.emailVerified;
      creationTime = user.metadata.creationTime;

    }

    return (

      <Container style={styles.background_general}>
        <Modal
          animationType="slide"
          transparent={false}
          presentationStyle={"formSheet"}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <ScrollView>
            <View style={{ marginTop: 22 }}>
              <View style={styles.modalView}>
                <Text style={styles.MeetupHeading}>Edit Profile</Text>


                <Item rounded
                  style={{ marginBottom: 10 }}>

                  <Input placeholder='Enter Instagram Username (Optional)'
                    placeholderTextColor='#d1d5da'
                    onChangeText={(phoneno) => this.setState({ phoneno })}
                  />
                </Item>

                <Button block info
                  onPress={this.uploadEdit}
                  style={styles.uploadVideoButton}>
                  <Text>Upload</Text>
                </Button>

                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text style={styles.PostTextmeetup}>Cancel</Text>

                </TouchableOpacity>

              </View>
            </View>
          </ScrollView>
        </Modal>
        <ImageBackground source={require('../../assets/images/profilebg.jpg')} style={{ width: width, height: height * 0.20 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: '#F62459', fontSize: 14, marginTop: 45, flex: 1, marginLeft: 15 }}>{displayName}</Text>

            <TouchableOpacity style={{ flex: 1, marginTop: 20, }} onPress={this._pickImage}>
              <Thumbnail source={{ uri: this.state.Avatar }} />
              <Text style={{ color: '#F62459', fontSize: 14, marginTop: 6 }}>Edit Image</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(true);
              }}>
              <Text style={{ color: '#F62459', fontSize: 14, marginTop: 45, flex: 1, marginRight: 15 }}>IG: {this.state.insta}</Text>
              <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center' }}>Edit</Text>


            </TouchableOpacity>
          </View>
        </ImageBackground>

        <Tabs tabBarUnderlineStyle={{ backgroundColor: '#F62459' }} tabContainerStyle={{ elevation: 0 }}>
          <Tab heading="Progress" tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diets} activeTextStyle={styles.activetabs_text_diets}>

            <FlatList
              data={this.state.trainer}
              renderItem={
                ({ item }) =>
                  <View style={styles.PostCard}>

                    {item.Image === "empty" ? (
                      <Video
                        source={{ uri: item.Video }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={true}
                        resizeMode="cover"
                        shouldPlay
                        isLooping
                        style={{ width: '100%', height: 375 }}

                      />
                    ) : (
                        <Image source={{ uri: item.Image }} style={{ width: '100%', height: 375 }} />

                      )}
                    <View style={{ flexDirection: 'row', padding: 8 }}>
                      <Text style={{ flex: 1 }}>{item.Date}</Text>

                    </View>

                  </View>
              }
            />
          </Tab>

          <Tab heading={Strings.ST1} tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diets} activeTextStyle={styles.activetabs_text_diets}>

            <WorkoutFav />

          </Tab>


          <Tab heading={Strings.ST3} tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diets} activeTextStyle={styles.activetabs_text_diets}>

            <DietFav />

          </Tab>

        </Tabs>

      </Container>

    )
  }

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  uploadEdit = async () => {
    var user = firebase.auth().currentUser.uid;


    if (this.state.phoneno != null) {
      await firebase.database().ref('users/' + user).update({
        Phone: this.state.phoneno
      }).then((data) => {
        this.setState({ modalVisible: false })

        Alert.alert(
          'Upload Successfully'
        )

      }).catch((error) => {
        //error callback
        Alert.alert(
          'Upload Not Successfully' + error
        )
      });
    }

  }


  _pickImage = async () => {
    await this.askPermissionsAsync();
    var user = firebase.auth().currentUser.uid;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [4, 4],
    });

    const manipResult = await ImageManipulator.manipulateAsync(
      result.uri,
      [{ resize: { width: 160, height: 160 } }],
      { compress: 0.9, format: ImageManipulator.SaveFormat.PNG, base64: false }
    );

    await this.setState({ Image: manipResult.uri });
    this.setState({ isLoading: true });

    const myRef = firebase.database().ref();
    const Key = myRef.push();


    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", manipResult.uri, true);
      xhr.send(null);
    });


    const reference = firebase.storage().ref().child('images/' + Key);

    const snapshot = await reference.put(blob);
    const myUrl = snapshot.downloadURL;

    await firebase.database().ref('users').child(user).update({ Image: myUrl }).then((data) => {
      this.setState({ Avatar: myUrl })
      Alert.alert(
        'Upload Successfully'
      )
      this.setState({ isLoading: false });

    }).catch((error) => {
      //error callback
      Alert.alert(
        error
      )
      this.setState({ isLoading: false });
    })


  };

}