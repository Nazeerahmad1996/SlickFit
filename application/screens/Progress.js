import React, { Component } from 'react';
import AppPreLoader from '../components/AppPreLoader';
import {
    ImageBackground, Alert, View, TouchableOpacity, FlatList, ScrollView, Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Container, Text } from 'native-base';
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import * as firebase from 'firebase';
import Strings from '../utils/Strings';

var styles = require('../../assets/files/Styles');

export default class Progress extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `${Strings.ST104}`,

    });

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            imgUri: null,
            text: null,
            image: null,
            message: '',
            messages: [],


        };

    }

    async componentDidMount() {
        var userId = firebase.auth().currentUser.uid;

        this.setState({ messages: [] })

        firebase
            .database()
            .ref('Progress')
            .child(userId)
            .on("value", snapshot => {
                this.setState({ isLoading: false })
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



    }

    render() {

        let { image } = this.state;
        if (this.state.isLoading) {
            return (
                <AppPreLoader />
            );
        }

        const { params } = this.props.navigation.state;


        return (
            <Container style={styles.ProgressBackground}>


                <ScrollView style={styles.ProgressBackground}>





                    <ImageBackground source={require('../../assets/images/progress.png')} style={styles.background_Progress}>

                        <LinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']} style={styles.gradient_diets}>
                            <View style={{ marginTop: 65 }} />
                            <Text style={styles.category_diets}>{Strings.ST106}</Text>
                            <Text style={styles.title_diets}>{Strings.ST107}</Text>
                            <View style={styles.ImageContainer}>
                                <TouchableOpacity onPress={this._pickImage}>
                                    <Image
                                        style={styles.UploadImage}
                                        source={require('../../assets/images/camera.png')}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this._pickVideo}>
                                    <Image
                                        style={styles.UploadVideo}
                                        source={require('../../assets/images/video.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    </ImageBackground>

                    <Text style={styles.ListTitle}>{Strings.ST110}</Text>



                    <FlatList
                        data={this.state.messages}
                        renderItem={
                            ({ item }) =>
                                <View style={styles.PostCard}>

                                    {item.Image == "empty" ? (
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
                                        <View style={{ paddingRight: 3, paddingLeft: 5 }}>
                                            <TouchableOpacity
                                                style={{ borderWidth: 1, alignItems: 'center', paddingLeft: 6, paddingRight: 6, borderColor: '#9b7979', borderRadius: 5, flex: 1, }}
                                                onPress={() => {
                                                    this.Delete(item);
                                                }}>
                                                <Text note style={{ color: '#9b7979', justifyContent: 'center', alignItems: 'center' }}>Delete</Text>

                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ paddingLeft: 3 }}>
                                            <TouchableOpacity
                                                style={{ borderWidth: 1, alignItems: 'center', borderColor: '#9b7979', borderRadius: 5, flex: 1, paddingLeft: 6, paddingRight: 6, }}
                                                onPress={() => {
                                                    this.Public(item);
                                                }}>
                                                <Text note style={{ color: '#9b7979', justifyContent: 'center', alignItems: 'center' }}>Make Public</Text>

                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                </View>

                        }
                    />


                </ScrollView>
            </Container>
        );
    }

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    };

    Public(item) {
        var user = firebase.auth().currentUser.uid;
        firebase.database().ref('Progress').child(user).child(item.Node).update({
            Public: 'yes'
        }).then((data) => {
            Alert.alert("Post is public now")
        })
    }


    Delete(item) {
        var user = firebase.auth().currentUser.uid;
        firebase.database().ref('Progress').child(user).child(item.Node).remove(function (error) {
            if (!error) {
                Alert.alert("Deleted")
            }
            else if (error) {
                Alert.alert(error);
            }
        })
    }

    _pickVideo = async () => {
        await this.askPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Videos',
            quality:0.3,
        });

        this.setState({ isLoading: true })

        const myRef = firebase.database().ref();
        const Key = myRef.push();
        var user = firebase.auth().currentUser.uid;

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
        const myUrl = snapshot.downloadURL;



        console.log(myUrl);
        firebase.database().ref('Progress').child(user).push({
            Video: myUrl,
            Image: "empty",
            Date: new Date().toDateString(),
        }).then((data) => {
            //success callback
            var Key = data.key

            firebase.database().ref('Progress').child(user).child(Key).update({
                Node: Key
            })

            var userId = firebase.auth().currentUser.uid;
            this.setState({ isLoading: false })
            Alert.alert(
                'Upload Successfully'
            )
        }).catch((error) => {
            //error callback
            this.setState({ isLoading: false })
            Alert.alert(
                'Upload Not Successfully' + error
            )
        })
    };


    _pickImage = async () => {
        await this.askPermissionsAsync();
        const myRef = firebase.database().ref(user);
        const Key = myRef.push();
        var user = firebase.auth().currentUser.uid;

        let myUrl = '';
        ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images",
            allowsEditing: true,
            aspect: [4, 4],
            base64: true,
            quality:0.4
        }).then(async function (result) {
            // this.setState({ image: result.uri });
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

            blob.close();
            myUrl = await snapshot.ref.getDownloadURL();

            firebase.database().ref('Progress').child(user).push({
                Video: "empty",
                Image: myUrl,
                Date: new Date().toDateString(),
            }).then((data) => {
                var Key = data.key

                firebase.database().ref('Progress').child(user).child(Key).update({
                    Node: Key
                })
                this.setState({ isLoading: false })
                Alert.alert(
                    'Upload Successfully'
                )
            }).catch((error) => {
                //error callback
                this.setState({ isLoading: false })
                Alert.alert(
                    'Upload Not Successfully' + error
                )
            })


        });








    };

}
