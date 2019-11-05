import React, { Component } from 'react';
import * as firebase from 'firebase';
import { ImageBackground, TouchableOpacity, Dimensions, View, Image, FlatList, Alert, Video } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Container, Thumbnail, Text, Right, Left, CardItem, Card, Tab, Tabs } from 'native-base';
import AppPreLoader from '../components/AppPreLoader';
import * as ImagePicker from 'expo-image-picker';



var styles = require('../../assets/files/Styles');
var { height, width } = Dimensions.get('window');

export default class UserProfile extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.item.Name}`,
    });


    constructor(props) {

        super(props);
        const { params } = props.navigation.state;
        this.state = {
            item: params.item,
            Avatar: '',
            Premium: '',
            Email: '',
            isLoading: false,
            Trainer: '',
            postsData: '',
            posts: [],
            userblog: '',
            Userblogs: [],
            insta: '',
        }

    }

    PostDetails(item) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'PostDetailsScreen',
            params: { item }
        });
        this.props.navigation.dispatch(navigateAction);
    }


    Like = async (item) => {
        var ExpoToken = '';

        await firebase.database().ref('users').child(item.User).once('value').then(function (snapshot) {
            ExpoToken = (snapshot.val() && snapshot.val().expoToken);
            console.log('>>>>>>>>>>>>>>>>>ImageAvatar<<<<<<<<<<<<<<<<<  ' + ExpoToken)
        });


        var user = firebase.auth().currentUser.uid;
        // var email = firebase.auth().currentUser.email;
        var userName = firebase.auth().currentUser.displayName;
        var count;
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
                    console.log('=------------------------------------------------------------------------error ', count)
                    this.setState({
                        CountOfLikes: count,
                    });
                });
        }).catch((error) => {
            //error callback
            Alert.alert(
                'Upload Not Successfully' + error
            )
            console.log('=------------------------------------------------------------------------error ', error)
        });
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
        console.log("1111122222233333334expo23412414232423" + ExpoToken);

    }

    async componentDidMount() {

        var ref = firebase.database().ref("Progress").child(this.state.item.User);

        await ref.orderByChild("Public").equalTo("yes").on("value", snapshot => {
            const data = snapshot.val()
            if (snapshot.val()) {
                const initMessages = [];
                Object
                    .keys(data)
                    .forEach(postsData => initMessages.push(data[postsData]));
                console.log("``````````````````000000000000000000000000000000000``````````````````" + initMessages);

                this.setState({
                    posts: initMessages,

                });
                console.log("```````````````````11111111111111111111111111111111111111111111111```````````````````" + this.state.bootcamps);

            }
        });


        await ref.orderByChild("Public").equalTo("yes").on("value", snapshot => {
            const data = snapshot.val()
            if (snapshot.val()) {
                const initMessages = [];
                Object
                    .keys(data)
                    .forEach(postsData => initMessages.push(data[postsData]));
                console.log("``````````````````000000000000000000000000000000000``````````````````" + initMessages);

                this.setState({
                    posts: initMessages,

                });
                console.log("```````````````````11111111111111111111111111111111111111111111111```````````````````" + this.state.bootcamps);

            }
        });


        // var ImageAvatar;
        var PremiumUser;
        var EmailUser;
        var TrainerUser;
        var ig;
        await firebase.database().ref('users').child(this.state.item.User).once('value').then(function (snapshot) {
            // ImageAvatar = (snapshot.val() && snapshot.val().Image);
            PremiumUser = (snapshot.val() && snapshot.val().payment);
            EmailUser = (snapshot.val() && snapshot.val().Email);
            TrainerUser = (snapshot.val() && snapshot.val().Trainer);
            ig = (snapshot.val() && snapshot.val().Phone);



        });
        this.setState({ Trainer: TrainerUser });
        this.setState({ Premium: PremiumUser });
        this.setState({ insta: ig });
        this.setState({ Email: EmailUser });



        var ref2 = firebase.database().ref("users");

        // ref.child('users').orderByChild('name').equalTo('John Doe').on("value", function(snapshot) {
        //     console.log(snapshot.val());
        //     snapshot.forEach(function(data) {
        //         console.log(data.key);
        //     });
        // });
        firebase
            .database()
            .ref('Blog').orderByChild("User").equalTo(this.state.item.User).on("value", snapshot => {
                const data = snapshot.val()
                if (snapshot.val()) {
                    const initMessages = [];
                    Object
                        .keys(data)
                        .forEach(userblog => initMessages.push(data[userblog]));


                    var reversed = initMessages.reverse()

                    this.setState({
                        Userblogs: reversed,

                    });
                }
            });

    }


    render() {

        if (this.state.isLoading) {
            return (
                <AppPreLoader />
            );
        }

        var user = firebase.auth().currentUser;
        var email, displayName, emailVerified, creationTime;

        // if (user != null) {
        //     email = user.email;
        //     displayName = user.displayName;
        //     emailVerified = user.emailVerified;
        //     creationTime = user.metadata.creationTime;

        // }

        return (

            <Container style={styles.background_general}>
                <ImageBackground source={require('../../assets/images/profilebg.jpg')} style={{ width: width, height: height * 0.20 }}>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <Text style={{ color: '#F62459', fontSize: 14 }}>{this.state.item.Name}</Text>
                        </View>
                        <TouchableOpacity style={{ flex: 1, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Thumbnail source={{ uri: this.state.item.Profile }} />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <Text style={{ color: '#F62459', fontSize: 14, }}>IG: {this.state.insta}</Text>
                        </View>
                        {/* <Text style={{ color: '#FFF', fontSize: 16, marginTop: 6, textTransform: 'uppercase' }}> {Strings.ST65} <TimeAgo time={creationTime} hideAgo={true} /></Text> */}
                        {/* {this.state.Premium === 'yes' ? (
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <Text style={{ color: '#F62459', fontSize: 14, }}>Premium User</Text>
                            </View>
                        ) : (
                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                    <Text style={{ color: '#F62459', fontSize: 14, }}>Regular User</Text>
                                </View>
                            )} */}
                    </View>
                    {this.state.Trainer === 'yes' ? (
                        <Text style={{ color: '#F62459', fontSize: 14, marginTop: 6, textAlign: 'center' }}>Professional Trainer</Text>

                    ) : (
                            null
                        )}
                </ImageBackground>

                <Tabs tabBarUnderlineStyle={{ backgroundColor: '#F62459' }} tabContainerStyle={{ elevation: 0 }}>
                    <Tab heading="Blogs" tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diets} activeTextStyle={styles.activetabs_text_diets}>

                        <FlatList
                            data={this.state.Userblogs}
                            // numColumns={2}
                            renderItem={({ item, index }) =>
                                <Card>
                                    <CardItem cardBody>
                                        <Image source={{ uri: item.Image }}
                                            style={{ height: width, width: '100%' }}
                                        />
                                    </CardItem>
                                    <CardItem>
                                        <Text>
                                            {item.Title}
                                        </Text>
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
                                            <TouchableOpacity style={{ padding: 5 }} onPress={() => this.PostDetails(item)}>
                                                <FontAwesome name="comments-o" style={{}} size={24} color="black" />
                                            </TouchableOpacity>
                                        </Right>
                                    </CardItem>

                                </Card>

                            }
                            keyExtractor={(item, index) => index.toString()}

                        />
                    </Tab>

                    <Tab heading="Progress" tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diets} activeTextStyle={styles.activetabs_text_diets}>

                        <FlatList
                            data={this.state.posts}
                            // inverted="true"
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

                                        </View>

                                    </View>
                            }
                        />


                    </Tab>
                </Tabs>
            </Container>

        )
    }



    _pickImage = async () => {
        await this.askPermissionsAsync();
        var user = firebase.auth().currentUser.uid;

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images",
            allowsEditing: true,
            aspect: [4, 4],
            quality:0.4
        });

        console.log(result);

        if (!result.cancelled) {
            // this.setState({ image: result.uri });
            await this.setState({ Image: result.uri });
            this.setState({ isLoading: true });
            const myRef = firebase.database().ref(user);
            const Key = myRef.push();

            const response = await fetch(result.uri);
            const blob = await response.blob();
            const response1 = await fetch(result.uri);
            const blob1 = await response1.blob();
            const reference = firebase.storage().ref().child('images/' + Key);

            const snapshot = await reference.put(blob1);
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
                console.log('=------------------------------------------------------------------------error ', error)
            })

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>: " + myUrl);



        }
    };

}