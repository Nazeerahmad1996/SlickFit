import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import AppPreLoader from '../components/AppPreLoader';
import { ActivityIndicator, Dimensions, View, TouchableOpacity, FlatList, Image, Alert, ImageBackground } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { LinearGradient } from 'expo-linear-gradient';
import { Left, CardItem, Button, Card, Input, Text, Body, Right, Thumbnail } from 'native-base';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Strings from '../utils/Strings';
import * as firebase from 'firebase';
import PostRating from '../components/PostRating';
import PostForm from '../forms/PostForm';
import PostComments from '../forms/PostComments';
import _ from 'lodash'


var styles = require('../../assets/files/Styles');
var { width } = Dimensions.get('window');

export default class Posts extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${Strings.ST4}`,
    headerRight: <Ionicons name="md-search" style={{ marginRight: 20 }} size={27} color="white" onPress={() => navigation.navigate('TagsScreen')} />

  });

  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
    this.infiniteScrollRef = null;
    this.state = {
      isLoading: true,
      modalVisible: false,
      Title: null,
      Description: null,
      Image: null,
      message: '',
      messages: [],
      admin: '',
      adminBlog: [],
      avatart: '',
      CountOfLikes: 0,
      CountOfComment: 0,
      expand: false,
      ItemIndex: -1,
      PUser: '',
      mydata: '',
      FilterData: [],
      LoadData: [],
      newArray: [],
      index: 15,
      ImageLoading: false,
      ImageLoaded: false,
      height: 0
    };
  }


  async componentDidMount() {
    var Payments
    var userId = firebase.auth().currentUser.uid;
    await firebase.database().ref('users').child(userId).once('value').then(function (snapshot) {
      Payments = (snapshot.val() && snapshot.val().payment);
    });

    this.setState({ PUser: Payments })

    firebase
      .database()
      .ref('AdminBlog')
      .on("value", snapshot => {
        const data = snapshot.val()
        if (snapshot.val()) {
          const initMessages = [];
          Object
            .keys(data)
            .forEach(admin => initMessages.push(data[admin]));


          var reversed = initMessages.reverse()
          this.setState({ adminBlog: reversed })
        }
        this.setState({ isLoading: false });
      });

    firebase
      .database()
      .ref('Blog')
      .on("value", snapshot => {
        const data = snapshot.val()
        const count = snapshot.numChildren();
        if (snapshot.val()) {
          const initMessages = [];
          Object
            .keys(data)
            .forEach(message => initMessages.push(data[message]));

          var reversed = initMessages.reverse()
          this.setState({ messages: reversed })

        }
        var i;
        const Dummy = this.state.newArray.slice();
        for (i = 0; i < 7; i++) {
          Dummy.push(this.state.messages[i])
        }
        this.setState({ LoadData: Dummy })
        console.log(i)
        this.setState({ isLoading: false, index: i });
      });

  }

  PostDetails(item) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'PostDetailsScreen',
      params: { item }
    });
    this.props.navigation.dispatch(navigateAction);
  }



  Profile = async (item) => {
    var userName = firebase.auth().currentUser.displayName;
    var ExpoToken = '';

    await firebase.database().ref('users').child(item.User).once('value').then(function (snapshot) {
      ExpoToken = (snapshot.val() && snapshot.val().expoToken);
    });
    const navigateAction = NavigationActions.navigate({
      routeName: 'UserProfile',
      params: { item }
    });
    this.props.navigation.dispatch(navigateAction);


    let response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: ExpoToken,
        sound: 'default',
        title: 'Blog',
        body: userName + ' checked your profile.'
      })
    });


  }



  DeletePost = async (item) => {
    this.setState({ isLoading: true })
    var that = this;
    var userId = firebase.auth().currentUser.uid;
    await firebase.database().ref('Blog').child(item.Node).remove(function (error) {
      if (!error) {
        firebase
          .database()
          .ref('Blog')
          .on("value", snapshot => {
            const data = snapshot.val()
            const count = snapshot.numChildren();
            if (snapshot.val()) {
              const initMessages = [];
              Object
                .keys(data)
                .forEach(message => initMessages.push(data[message]));

              var reversed = initMessages.reverse()
              that.setState({ messages: reversed })

            }
            var i;
            const Dummy = that.state.newArray.slice();
            for (i = 0; i < 7; i++) {
              Dummy.push(that.state.messages[i])
            }
            that.setState({ LoadData: Dummy })
            that.setState({ isLoading: false });
          });
        Alert.alert("Deleted")
        that.setState({ isLoading: false, index: 7 })
      }
      else if (error) {
        Alert.alert(error);
      }
    })
  }

  ExpendIt = async (index) => {
    await this.setState({ expand: true, ItemIndex: index })
  }

  ComprassIt = async (index) => {
    await this.setState({ expand: false, ItemIndex: -1 })

  }


  Like = async (item) => {

    var ExpoToken = '';

    await firebase.database().ref('users').child(item.User).once('value').then(function (snapshot) {
      ExpoToken = (snapshot.val() && snapshot.val().expoToken);
    });


    var user = firebase.auth().currentUser.uid;
    // var email = firebase.auth().currentUser.email;
    var userName = firebase.auth().currentUser.displayName;
    var emailforLikesAdmin = firebase.auth().currentUser.email;
    var count;
    if (emailforLikesAdmin === "admin@gmail.com" || emailforLikesAdmin === "Admin@gmail.com") {
      var newPostRef = await firebase.database().ref('Blog').child(item.Node).child("Likes/").push({
        uid: user,
        Name: userName,
      }).then((data) => {
        firebase
          .database()
          .ref('Blog').child(item.Node).child("Likes")
          .on("value", snapshot => {
            count = snapshot.numChildren();
            firebase.database().ref('Blog').child(item.Node).update({
              LikeCount: count,
            })
            this.setState({
              CountOfLikes: count,
            });
          });
      }).catch((error) => {
        //error callback
        Alert.alert(
          'Upload Not Successfully' + error
        )
      });
    } else {
      var newPostRef = await firebase.database().ref('Blog').child(item.Node).child("Likes/" + user).set({
        uid: user,
        Name: userName,
      }).then((data) => {

        firebase
          .database()
          .ref('Blog').child(item.Node).child("Likes")
          .on("value", snapshot => {
            count = snapshot.numChildren();
            firebase.database().ref('Blog').child(item.Node).update({
              LikeCount: count,
            })
            this.setState({
              CountOfLikes: count,
            });
          });
      }).catch((error) => {
        //error callback
        Alert.alert(
          'Upload Not Successfully' + error
        )
      });
    }
    let response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: ExpoToken,
        sound: 'default',
        title: 'Blog',
        body: userName + ' liked your blog'
      })
    });

  }

  renderRow = ({ item, index }) => {
    var user = firebase.auth().currentUser.uid;
    var UserEmail = firebase.auth().currentUser.email;
    var count = 0;
    firebase
      .database()
      .ref('postComments').child(item.Node)
      .on("value", snapshot => {
        count = snapshot.numChildren();
      });
    return (
      <Card>
        <CardItem>

          <Left>
            <TouchableOpacity onPress={() => this.Profile(item)}>
              <Thumbnail source={{ uri: item.Profile }} />
            </TouchableOpacity>
            <Body>
              <TouchableOpacity onPress={() => this.Profile(item)}>
                <Text>{item.Name}</Text>
              </TouchableOpacity>
            </Body>
          </Left>
          <Right>
            {this.state.ItemIndex === index && this.state.expand === true ? (
              <TouchableOpacity onPress={this.ComprassIt.bind(this, index)}>
                <Ionicons name="ios-arrow-dropup" style={{ marginRight: 5 }} size={25} />
              </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={this.ExpendIt.bind(this, index)}>
                  <Ionicons name="ios-arrow-dropdown" style={{ marginRight: 5 }} size={25} />
                </TouchableOpacity>
              )}
          </Right>
        </CardItem>
        <CardItem cardBody>
          <Image source={{ uri: item.Image }}
            style={{ height: width, width: '100%' }}
          />
        </CardItem>
        <CardItem>

          <Text note>
            {item.Description}
          </Text>
        </CardItem>

        <CardItem>
          <Left>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{ padding: 5 }} onPress={() => this.Like(item)}>
                <Ionicons name="ios-heart" style={{}} size={24} color="black" />
              </TouchableOpacity>
              <Text note>{item.LikeCount}</Text>
            </View>
          </Left>
          <Right>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{ padding: 5,flexDirection:'row',alignItems:'center'}} onPress={() => this.PostDetails(item)}>
                <Text note>{count}</Text>
                <FontAwesome name="comments-o" style={{marginLeft:15}} size={24} color="black" />
              </TouchableOpacity>
              {item.User === user || UserEmail === 'admin@gmail.com' ? (
                <TouchableOpacity
                  onPress={() => {
                    this.DeletePost(item)
                  }}>
                  <View style={{ flexDirection: 'row', marginTop: 3, marginLeft: 25 }}>
                    <Image
                      style={{ height: 30, width: 30 }}
                      source={require('../../assets/images/delete.png')}
                    />
                  </View>
                </TouchableOpacity>

              ) : (
                  null
                )}

            </View>
          </Right>
        </CardItem>

        {this.state.ItemIndex === index && this.state.expand === true ? (
          <View>
            <View style={{ margin: 15, marginBottom: 5 }}>

              <PostRating postId={item.Node} />

              <Button transparent>
                <Ionicons name='md-calendar' />
                <Text style={styles.postDetail_date}>{item.Date}</Text>
              </Button>
            </View>


            <Text style={{ padding: 15, fontWeight: 'bold' }}>{Strings.ST83}</Text>


            <View style={{ height: 1, backgroundColor: '#EEE', width: width, marginBottom: 5 }}></View>

            <View style={{ margin: 15 }}>
              <PostForm item={item} postId={item.Node} />
            </View>

            <Text style={{ padding: 15, fontWeight: 'bold' }}>{Strings.ST84}</Text>
            <View style={{ height: 1, backgroundColor: '#EEE', width: width, marginBottom: 0 }}></View>

            <View>
              <PostComments postId={item.Node} />
            </View>
          </View>
        ) : (
            null
          )
        }
      </Card>


    )
  }

  HandleMore = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      var i;
      console.log(this.state.messages.length)
      const Dummy = this.state.newArray.slice();
      for (i = this.state.index; i < this.state.index + 7; i++) {
        if (this.state.messages.length > i) {
          console.log(i)
          Dummy.push(this.state.messages[i])
        }
      }

      this.setState({ LoadData: this.state.LoadData.concat(Dummy), index: this.state.index + 7 })
      this.onEndReachedCalledDuringMomentum = true;
    }
  }
  LoaderFooter = () => {
    if (this.state.messages.length > this.state.index) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator style={{ height: 80 }} size="large" color="#f39c12" />
        </View>

      )
    } else {
      return (
        null
      )
    }

  }


  render() {

    if (this.state.isLoading) {
      return (
        <AppPreLoader />
      );
    }

    const { params } = this.props.navigation.state;


    return (
      <View style={{ flex: 1 }}
      >

        {this.state.PUser === 'yes' ? (
          <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderBottomColor: '#d1d5da', borderBottomWidth: 1.5, paddingLeft: 5, paddingRight: 2, paddingVertical: 4, justifyContent: 'center', alignItems: 'center' }}>
            {this.state.ImageLoading ? (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {this.state.ImageLoaded ? (
                  <Image source={{ uri: this.state.Image }}
                    style={{ height: 30, width: 30, borderRadius: 15 }}
                  />
                ) : (
                    <ActivityIndicator style={{ height: 30, alignItems: 'center', justifyContent: 'center' }} size="large" color="#f39c12" />
                  )}
              </View>
            ) : (
                <TouchableOpacity onPress={this._pickImage} style={{ padding: 3, alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name="md-add" color="#773838" style={{ marginRight: 5 }} size={27} />
                </TouchableOpacity>
              )}

            <Input multiline={true}
              style={[styles.default, { height: Math.max(35, this.state.height), flex: 1, }]}
              // style={{ justifyContent: 'center', alignItems: 'center' }}
              // rowSpan={2}
              placeholder='Blog Descriptions'
              placeholderTextColor='#d1d5da'
              onContentSizeChange={(event) => {
                this.setState({ height: event.nativeEvent.contentSize.height })
              }}
              onChangeText={(Description) => this.setState({ Description })}
            />
            <TouchableOpacity onPress={this.UploadBlog} style={{ padding: 3, alignItems: 'center', justifyContent: 'center' }}>
              <Image
                style={{ height: 37, width: 37 }}
                source={require('../../assets/images/send.png')}
              />
            </TouchableOpacity>
          </View>
        ) : (
            <Text style={{ fontSize: 16, textAlign: 'center', color: '#d6a7a7', marginTop: 5 }}>Premium User Can Post Only</Text>
          )
        }

        <Text style={{ padding: 4, fontSize: 18, fontWeight: 'bold' }}>Featured</Text>
        <View>
          <SwiperFlatList
            autoplay
            autoplayDelay={5}
            data={this.state.adminBlog}
            renderItem={({ item }) =>
              <View style={{ borderRadius: 7, marginRight: 10 }}>
                <TouchableOpacity onPress={() => this.PostDetails(item)} activeOpacity={1}>
                  <ImageBackground imageStyle={{ borderRadius: 7 }} source={{ uri: item.Image }} style={styles.background_diets2}>

                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.5)']} style={styles.gradient_diets2}>
                      <Text style={styles.category_diets2}>{item.Name}</Text>
                      <Text style={styles.title_diets2}>{item.Date}</Text>
                      <Text style={styles.subcategory_diets2}>{item.Title}</Text>
                    </LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            }
            keyExtractor={(item, index) => index.toString()}

          />
        </View>
        <Text style={{ padding: 4, fontSize: 18, fontWeight: 'bold' }}>{Strings.ST54}</Text>
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.LoadData}
            initialNumToRender={4}
            extraData={this.state}
            renderItem={this.renderRow}
            onEndReached={this.HandleMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={this.LoaderFooter}
            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
            keyExtractor={(item, index) => index.toString()}

          />
        </View>
      </View>
    );
  }

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
  };

  _pickImage = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.4
    });

    const myRef = firebase.database().ref();
    const Key = myRef.push();
    if (!result.cancelled) {
      this.setState({ ImageLoading: true })
    }
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", result.uri, true);
      xhr.send(null);
    });


    const reference = firebase.storage().ref().child('images/' + Key);

    const snapshot = await reference.put(blob);
    const myUrl = await snapshot.downloadURL;
    if (myUrl != null || myUrl != '') {
      this.setState({ ImageLoaded: true })
    }
    this.setState({ Image: myUrl })
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>: " + myUrl);


  };



  UploadBlog = () => {
    this.setState({
      isLoading: true,
      ImageLoading: false,
      ImageLoaded: false,
    });
    var user = firebase.auth().currentUser.uid;
    var ImageAvatar
    firebase.database().ref('users').child(user).once('value').then(function (snapshot) {
      ImageAvatar = (snapshot.val() && snapshot.val().Image);
    });

    setTimeout(() => {
      this.setState({
        isLoading: true,
      });
      var UserEmail = firebase.auth().currentUser.email;
      var userName = firebase.auth().currentUser.displayName;
      var nodeName = 'Blog';

      if (UserEmail === 'Admin@gmail.com' || UserEmail === 'admin@gmail.com') {
        nodeName = 'AdminBlog';
      }

      if (this.state.Description != null
        && this.state.Image != null) {

        var newPostRef = firebase.database().ref(nodeName).push({
          User: user,
          Name: userName,
          Title: this.state.Title,
          Description: this.state.Description,
          Image: this.state.Image,
          Date: new Date().toDateString(),
          Node: "null",
          Profile: ImageAvatar,
          Likes: 0,
        }).then((data) => {
          firebase.database().ref("users").orderByChild('expoToken').on("value", snapshot => {
            snapshot.forEach(function (data) {
              let response = fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  to: data.child('expoToken').val(),
                  sound: 'default',
                  title: 'Blog',
                  body: userName + ' Posted a new blog!'
                })
              });
            });
          });

          this.setState({
            isLoading: false,
          });
          Alert.alert(
            'Upload Successfully'
          )
          var Key = data.key
          firebase.database().ref(nodeName).child(Key).update({
            Node: Key
          })

        }).catch((error) => {
          //error callback
          Alert.alert(
            'Upload Not Successfully' + error
          )
        })
        const postKey = firebase.database().ref().child('MeetUp').push().key;

      }

      else {
        this.setState({
          isLoading: false,
        });
        Alert.alert("Please Fill The Form Proper.")
      }
    }, 2000);
  }
}

