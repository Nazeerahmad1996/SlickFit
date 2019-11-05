import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import AppPreLoader from '../components/AppPreLoader';
import { Dimensions, View, TouchableOpacity, Image, FlatList, Platform, ScrollView, Alert, ImageBackground, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Container, Button, Card, CardItem, Item, Input, Text, Tab, Tabs, Picker, Form, ActionSheet, Left, Body, Right, Thumbnail } from 'native-base';
import * as firebase from 'firebase';
import Strings from '../utils/Strings';
import { Rating } from 'react-native-ratings';

import Modal from "react-native-modal";

var { height, width } = Dimensions.get('window');
var styles = require('../../assets/files/Styles');

var BUTTONS = ["Report to Admin", "Disappear this post", "Cancel"];
var BUTTON = ["Delete", "Contains No harmful content", "Cancel"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';




export default class Meetup extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${Strings.ST5}`,
    });

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            refreshing: false,
            modalVisible: false,
            modalVisibleBootcamp: false,
            modalVisibleTrainer: false,
            isModalVisible: false,
            isModalVisible2: false,
            isModalVisible3: false,
            selected: "Gender",
            Description: null,
            GymText: null,
            CityText: null,
            Image: null,
            trainerData: '',
            trainer: [],
            message: '',
            messages: [],
            bootcamp: '',
            bootcamps: [],
            location: null,
            errorMessage: null,
            mapRegion: null,
            latitude: null,
            longitude: null,
            latitude2: null,
            longitude2: null,
            position: null,
            Title: null,
            DescriptionBootcamp: null,
            CityBootcamp: null,
            DateBootcamp: null,
            AddressBootpcamp: null,
            AllPost: false,
            selectedRegion: 'Near',
            WebsiteURL: null,
            ProfileImage: null,
            Intrested: false,
            width: null,
            width: 300,
            FilterData: [],
            Filter: '',

        };
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    toggleModal2 = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible2 });
    };
    toggleModal3 = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible3 });
    };



    onValueChange(value) {
        this.setState({
            selected: value
        });
    }
    onValueChangeRegion(value) {
        this.setState({
            selectedRegion: value
        });
        if (value === 'All') {
            this.setState({
                AllPost: true
            });
        }
        else if (value === 'Near') {
            this.setState({
                AllPost: false
            });
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    setmodalVisibleBootcamp(visible) {
        this.setState({ modalVisibleBootcamp: visible });
    }
    setmodalVisibleTrainer(visible) {
        this.setState({ modalVisibleTrainer: visible });
    }

    async componentDidMount() {

        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                this.setState({
                    errorMessage: 'Permission to access location was denied',
                });
            }
            else {
                await navigator.geolocation.getCurrentPosition(
                    position => {
                        const location = JSON.stringify(position);

                        this.setState({ latitude: position.coords.latitude });
                        this.setState({ longitude: position.coords.longitude });
                        var long = position.coords.longitude;
                        var lati = position.coords.latitude;

                        var Longi = (parseFloat(long).toPrecision(3));
                        var latit = (parseFloat(lati).toPrecision(3));
                        this.setState({ latitude2: latit });
                        this.setState({ longitude2: Longi });


                        firebase.database().ref("MeetUp").orderByChild("Latitide").equalTo(this.state.latitude2).on("value", snapshot => {



                            firebase.database().ref("MeetUp").orderByChild("Longitude").equalTo(this.state.longitude2).on("value", snapshot => {
                                const data = snapshot.val()
                                if (snapshot.val()) {
                                    const initMessages = [];
                                    Object
                                        .keys(data)
                                        .forEach(Filter => initMessages.push(data[Filter]));

                                    var reversed = initMessages.reverse()
                                    this.setState({
                                        FilterData: reversed,

                                    });
                                }
                            });
                        });

                    },
                    error => Alert.alert(error.message),
                    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
                );
            }
        }


        firebase
            .database()
            .ref('MeetUp')
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
                setTimeout(() => {
                    this.setState({ isLoading: false });
                }, 3300);
            });

        firebase
            .database()
            .ref('MeetUpBootcamp')
            .on("value", snapshot => {
                const data = snapshot.val()
                if (snapshot.val()) {
                    const initMessages = [];
                    Object
                        .keys(data)
                        .forEach(bootcamp => initMessages.push(data[bootcamp]));


                    var reversed = initMessages.reverse()
                    this.setState({
                        bootcamps: reversed,

                    });
                }
            });

        var ref = firebase.database().ref("users");


        ref.orderByChild("Trainer").equalTo("yes").on("value", snapshot => {
            const data = snapshot.val()
            if (snapshot.val()) {
                const initMessages = [];
                Object
                    .keys(data)
                    .forEach(trainerData => initMessages.push(data[trainerData]));
                this.setState({
                    trainer: initMessages,

                });
            }
        });





    }
    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        // you would probably do something to verify that permissions
        // are actually granted, but I'm skipping that for brevity
    };

    ReportToAdmin = async (item) => {
        await firebase.database().ref('MeetUp').child(item.Node).update({ Report: "Reported" });
        Alert.alert("Reported to admin. Admin will review and take action");
    }
    DisspearPost = async (item) => {
        var userId = firebase.auth().currentUser.uid;
        await firebase.database().ref('MeetUp').child(item.Node).update({ Hide: userId });
    }

    DeletePost = async (item) => {
        var userId = firebase.auth().currentUser.uid;
        await firebase.database().ref('MeetUp').child(item.Node).remove(function (error) {
            if (!error) {
                Alert.alert("Deleted")
            }
            else if (error) {
                Alert.alert(error);
            }
        })
    }
    RemoveReport = async (item) => {
        var userId = firebase.auth().currentUser.uid;
        await firebase.database().ref('MeetUp').child(item.Node).update({ Report: "Clear" });
        Alert.alert("Report has been removed");
    }

    MeetupChatScreen = async (item) => {
        var ExpoToken = '';
        var userId = firebase.auth().currentUser.uid;
        var userName = firebase.auth().currentUser.displayName;
        var ImageAvatar
        var Name
        var Phone =

            firebase.database().ref('users').child(item.User).once('value').then(function (snapshot) {
                ExpoToken = (snapshot.val() && snapshot.val().expoToken);
            });


        await firebase.database().ref('users').child(userId).once('value').then(function (snapshot) {
            ImageAvatar = (snapshot.val() && snapshot.val().Image);
            Name = (snapshot.val() && snapshot.val().Name);
            Phone = (snapshot.val() && snapshot.val().Phone);
        });
        if (Phone != null) {


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
                    body: userName + ' waved to you'
                })
            });



            firebase.database().ref('MeetUp').child(item.Node).child("UserIntrested").child(userId).set({
                UID: userId,
                Image: ImageAvatar,
                Name: Name,
                Phone: Phone,
                Date: new Date().toDateString(),

            }).then((data) => {
                Alert.alert(
                    'Your request has been sent!'
                )
                this.setState({ Intrested: true })
            }).catch((error) => {
                Alert.alert(
                    'Please try again!' + error
                )
            })
        }
        else {
            Alert.alert(
                'Update your phone number from profile and enjoy this feature.'
            )
        }
    }

    DeleteBootcamp(item) {
        firebase.database().ref('MeetUpBootcamp').child(item.Node).remove(function (error) {
            if (!error) {
                Alert.alert("Deleted")
            }
            else if (error) {
                Alert.alert(error);
            }
        })
    }

    DeletePost(item) {
        firebase.database().ref('MeetUp').child(item.Node).remove(function (error) {
            if (!error) {
                Alert.alert("Deleted")
            }
            else if (error) {
                Alert.alert(error);
            }
        })
    }

    List(item) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'IntrestedList',
            params: { item }
        });
        this.props.navigation.dispatch(navigateAction);
    }


    render() {

        var UserEmail = firebase.auth().currentUser.email;


        if (this.state.isLoading == true) {
            return (
                <AppPreLoader />
            );
        }

        const { params } = this.props.navigation.state;
        var user = firebase.auth().currentUser.uid;



        return (
            <Container style={styles.background_general}>


                <Modal isVisible={this.state.isModalVisible}
                    onBackdropPress={() => this.setState({ isModalVisible: false })}

                >
                    <View style={{ marginTop: 22 }}>
                        <View style={styles.modalView}>
                            <View style={styles.imageUploadDiv}>
                                <TouchableOpacity onPress={this._pickImage}>
                                    <Image
                                        style={styles.UploadImages}
                                        source={require('../../assets/images/camera.png')}
                                    />
                                    <Text>Post Your Photo</Text>
                                </TouchableOpacity>
                            </View>

                            <Item rounded
                                style={{ marginBottom: 10 }}>

                                <Input placeholder='Date & Time'
                                    placeholderTextColor='#d1d5da'
                                    onChangeText={(Description) => this.setState({ Description })}
                                />
                            </Item>

                            <Item rounded
                                style={{ marginBottom: 10 }}>

                                <Input placeholder='Gym Address'
                                    placeholderTextColor='#d1d5da'

                                    onChangeText={(CityText) => this.setState({ CityText })}
                                />
                            </Item>

                            <Item rounded
                                style={{ marginBottom: 10 }}>

                                <Input placeholder='Gym Name'
                                    placeholderTextColor='#d1d5da'

                                    onChangeText={(GymText) => this.setState({ GymText })}
                                />
                            </Item>

                            <Form>
                                <Picker
                                    mode="dropdown"
                                    iosHeader="Select Category"
                                    iosIcon={<Ionicons name="ios-arrow-down-outline" />}
                                    style={{ width: undefined }}
                                    selectedValue={this.state.selected}
                                    onValueChange={this.onValueChange.bind(this)}
                                >
                                    <Picker.Item label="Looking for.." value="Gender" />
                                    <Picker.Item label="Male" value="Male" />
                                    <Picker.Item label="Female" value="Female" />
                                </Picker>

                            </Form>

                            <Button block info
                                onPress={this.UploadmeetUp}
                                style={styles.uploadVideoButton}>
                                <Text>Upload</Text>
                            </Button>



                            <TouchableOpacity
                                onPress={() => this.setState({ isModalVisible: false })}>
                                <Text style={styles.PostTextmeetup}>Cancel</Text>

                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>



                <Modal isVisible={this.state.isModalVisible2}
                    onBackdropPress={() => this.setState({ isModalVisible2: false })}

                >
                    <View style={{ marginTop: 22 }}>
                        <ScrollView>
                            <Form style={styles.modalView}>
                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity onPress={this._pickImage}>
                                        <Image
                                            style={{ height: 35, width: 35, marginBottom: 10 }}
                                            source={require('../../assets/images/camera.png')}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <Item rounded
                                    style={{ marginBottom: 10 }}>

                                    <Input placeholder='Title'
                                        placeholderTextColor='#d1d5da'

                                        onChangeText={(Title) => this.setState({ Title })}
                                    />
                                </Item>

                                <Item rounded
                                    style={{ marginBottom: 10 }}>

                                    <Input placeholder='Date & Time'
                                        placeholderTextColor='#d1d5da'

                                        onChangeText={(DescriptionBootcamp) => this.setState({ DescriptionBootcamp })}
                                    />
                                </Item>

                                <Item rounded
                                    style={{ marginBottom: 10 }}>

                                    <Input placeholder='Gym Address'
                                        placeholderTextColor='#d1d5da'

                                        onChangeText={(CityBootcamp) => this.setState({ CityBootcamp })}
                                    />
                                </Item>


                                <Item rounded
                                    style={{ marginBottom: 10 }}>

                                    <Input placeholder='Address'
                                        placeholderTextColor='#d1d5da'

                                        onChangeText={(AddressBootpcamp) => this.setState({ AddressBootpcamp })}
                                    />
                                </Item>

                                <Item rounded
                                    style={{ marginBottom: 10 }}>

                                    <Input placeholder='Date: YY-MM-DD'
                                        placeholderTextColor='#d1d5da'

                                        onChangeText={(DateBootcamp) => this.setState({ DateBootcamp })}
                                    />
                                </Item>

                                <Item rounded
                                    style={{ marginBottom: 10 }}>

                                    <Input placeholder='Enter Website URL'
                                        placeholderTextColor='#d1d5da'

                                        onChangeText={(WebsiteURL) => this.setState({ WebsiteURL })}
                                    />
                                </Item>


                                <Button block info
                                    onPress={this.UploadBootcamp}
                                    style={styles.uploadVideoButton}>
                                    <Text>Upload</Text>
                                </Button>



                                <TouchableOpacity
                                    onPress={() => this.setState({ isModalVisible2: false })}>

                                    <Text style={styles.PostTextmeetup}>Cancel</Text>

                                </TouchableOpacity>

                            </Form>
                        </ScrollView>
                    </View>
                </Modal>

                <Modal isVisible={this.state.isModalVisible3}
                    onBackdropPress={() => this.setState({ isModalVisible3: false })}

                >
                    <View style={{ marginTop: 22 }}>
                        <View>

                            <TouchableOpacity
                                onPress={() => this.setState({ isModalVisible3: false })}>

                                <Text>Hide</Text>

                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>

                <View style={{ flexDirection: 'column', backgroundColor: '#000000', height: height * 0.25 }}>
                    <ImageBackground
                        source={require('../../assets/images/header.jpg')}
                        style={{ flex: 1, width: null, height: null }}>
                    </ImageBackground>
                </View>
                <Tabs tabBarUnderlineStyle={{ backgroundColor: '#F62459' }} tabContainerStyle={{ elevation: 0 }}>

                    <Tab heading={Strings.ST122} tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diets} activeTextStyle={styles.activetabs_text_diets}>
                        <Form>
                            <Picker
                                mode="dropdown"
                                iosHeader="Select Category"
                                iosIcon={<Ionicons name="ios-arrow-down-outline" />}
                                style={{ width: undefined }}
                                selectedValue={this.state.selectedRegion}
                                onValueChange={this.onValueChangeRegion.bind(this)}
                            >
                                <Picker.Item label="Filter Near" value="Near" />
                                <Picker.Item label="All Around The World" value="All" />
                            </Picker>

                        </Form>
                        {(!this.state.AllPost) ? (
                            <ScrollView>
                                <TouchableOpacity
                                    style={styles.PostTextbtn}
                                    onPress={this.toggleModal}>
                                    <Text style={styles.PostTextmeetup}>Find a partner</Text>

                                </TouchableOpacity>

                                <View style={{ marginTop: 15 }} />

                                <FlatList
                                    data={this.state.FilterData}
                                    extraData={this.state}
                                    initialNumToRender={7}
                                    renderItem={
                                        ({ item }) =>
                                            <View>
                                                {/* {
                                                    ((parseFloat(item.Longitude)) === (parseFloat(this.state.longitude2))) && ((parseFloat(item.Latitide)) === (parseFloat(this.state.latitude2))) && ((item.Hide) != (user)) ? ( */}
                                                <Card>
                                                    <CardItem>
                                                        <Left>
                                                            <View>
                                                                <Thumbnail source={{ uri: item.Profile }} />
                                                            </View>
                                                            <Body>
                                                                <Text>{item.Name}</Text>
                                                                <Text note>{item.City}</Text>
                                                            </Body>
                                                        </Left>

                                                        <Right>
                                                            <TouchableOpacity
                                                                style={{ borderWidth: 1, borderColor: '#9b7979', paddingRight: 8, paddingLeft: 8, paddingTop: 4, paddingBottom: 4, borderRadius: 5 }}
                                                                onPress={() =>
                                                                    ActionSheet.show(
                                                                        {
                                                                            options: BUTTONS,
                                                                            cancelButtonIndex: CANCEL_INDEX,
                                                                            destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                                                            title: "Report Post"
                                                                        },
                                                                        buttonIndex => {
                                                                            if (buttonIndex === 0) { this.ReportToAdmin(item) }
                                                                            if (buttonIndex === 1) { this.DisspearPost(item) }
                                                                        }
                                                                    )}
                                                            >
                                                                <Text note style={{ color: '#9b7979' }}>REPORT</Text>
                                                            </TouchableOpacity>
                                                        </Right>
                                                    </CardItem>
                                                    <CardItem cardBody>
                                                        <Image source={{ uri: item.Image }}
                                                            style={{ height: width, width: '100%' }}
                                                        />
                                                    </CardItem>
                                                    <CardItem>
                                                        <Text>
                                                            {item.Description}
                                                        </Text>
                                                    </CardItem>
                                                    <CardItem>
                                                        <Left>
                                                            <Text note>Gym: {item.Gym}</Text>
                                                        </Left>
                                                        <Right>
                                                            <TouchableOpacity
                                                                style={{ borderWidth: 1, borderColor: '#9b7979', paddingRight: 8, paddingLeft: 8, paddingTop: 4, paddingBottom: 4, borderRadius: 5 }}
                                                                onPress={() => {
                                                                    this.MeetupChatScreen(item)
                                                                }}>
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    <Ionicons
                                                                        style={{ marginRight: 6 }}
                                                                        size={20}
                                                                        color="#FF6666"
                                                                        name='md-hand' />
                                                                    <Text note style={{ color: '#9b7979' }}>WAVE</Text>
                                                                </View>

                                                            </TouchableOpacity>
                                                        </Right>
                                                    </CardItem>

                                                    {item.User === user || UserEmail === 'admin@gmail.com' ? (
                                                        <CardItem>
                                                            <Left>
                                                                <TouchableOpacity
                                                                    style={{ borderWidth: 1, borderColor: '#9b7979', paddingRight: 8, paddingLeft: 8, paddingTop: 4, paddingBottom: 4, borderRadius: 5 }}
                                                                    onPress={() => {
                                                                        this.List(item)
                                                                    }}>
                                                                    <View style={{ flexDirection: 'row' }}>
                                                                        <Ionicons
                                                                            style={{ marginRight: 6 }}
                                                                            size={18}
                                                                            color="#FF6666"
                                                                            name='md-hand' />
                                                                        <Text note style={{ color: '#9b7979' }}>Waved List</Text>
                                                                    </View>

                                                                </TouchableOpacity>
                                                            </Left>

                                                            <Right>
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        this.DeletePost(item)
                                                                    }}>
                                                                    <View style={{ flexDirection: 'row' }}>
                                                                        <Image
                                                                            style={{ height: 30, width: 30 }}
                                                                            source={require('../../assets/images/delete.png')}
                                                                        />
                                                                    </View>

                                                                </TouchableOpacity>
                                                            </Right>

                                                        </CardItem>
                                                    ) : (
                                                            null
                                                        )}



                                                    <CardItem>
                                                        <Left>
                                                            <Text note>Looking for {item.Gender} partner</Text>
                                                        </Left>
                                                        <Right>
                                                            <Text note>{item.Date}</Text>
                                                        </Right>
                                                    </CardItem>

                                                    {UserEmail === 'admin@gmail.com' ? (
                                                        <CardItem>
                                                            {item.Report === "Reported" ? (
                                                                <CardItem>
                                                                    <Left>
                                                                        <Ionicons name="ios-alert" size={26} color="#FF0000" />
                                                                    </Left>
                                                                    <TouchableOpacity
                                                                        onPress={() =>
                                                                            ActionSheet.show(
                                                                                {
                                                                                    options: BUTTON,
                                                                                    cancelButtonIndex: CANCEL_INDEX,
                                                                                    destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                                                                    title: "Feedback"
                                                                                },
                                                                                buttonIndex => {
                                                                                    if (buttonIndex === 0) { this.DeletePost(item) }
                                                                                    if (buttonIndex === 1) { this.RemoveReport(item) }
                                                                                }
                                                                            )}
                                                                    >
                                                                        <Text note>Take Action</Text>
                                                                    </TouchableOpacity>
                                                                    <Right>
                                                                        <Text note>{item.Report}</Text>
                                                                    </Right>
                                                                </CardItem>
                                                            ) : (
                                                                    null
                                                                )}
                                                        </CardItem>

                                                    ) : (
                                                            null
                                                        )}
                                                </Card>
                                                {/* ) : (
                                                            null
                                                        )
                                                } */}
                                            </View>

                                    }
                                />



                            </ScrollView>
                        ) : (
                                <ScrollView>

                                    <TouchableOpacity
                                        style={styles.PostTextbtn}
                                        onPress={this.toggleModal}>
                                        <Text style={styles.PostTextmeetup}>Find a partner</Text>

                                    </TouchableOpacity>

                                    <View style={{ marginTop: 15 }} />

                                    <FlatList
                                        data={this.state.messages}
                                        initialNumToRender={7}
                                        renderItem={
                                            ({ item }) =>

                                                <View>
                                                    {
                                                        ((item.Hide) != (user)) ? (

                                                            <Card>
                                                                <CardItem>

                                                                    <Left>
                                                                        <Thumbnail source={{ uri: item.Profile }} />

                                                                        <Body>
                                                                            <Text>{item.Name}</Text>
                                                                            <Text note>{item.City}</Text>
                                                                        </Body>
                                                                    </Left>

                                                                    <TouchableOpacity
                                                                        style={{ borderWidth: 1, borderColor: '#9b7979', paddingRight: 8, paddingLeft: 8, paddingTop: 4, paddingBottom: 4, borderRadius: 5 }}
                                                                        onPress={() =>
                                                                            ActionSheet.show(
                                                                                {
                                                                                    options: BUTTONS,
                                                                                    cancelButtonIndex: CANCEL_INDEX,
                                                                                    destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                                                                    title: "Report Post"
                                                                                },
                                                                                buttonIndex => {
                                                                                    if (buttonIndex === 0) { this.ReportToAdmin(item) }
                                                                                    if (buttonIndex === 1) { this.DisspearPost(item) }
                                                                                }
                                                                            )}
                                                                    >
                                                                        <Text note style={{ color: '#9b7979' }}>REPORT</Text>
                                                                    </TouchableOpacity>
                                                                </CardItem>
                                                                <CardItem cardBody>
                                                                    <Image source={{ uri: item.Image }}
                                                                        style={{ height: width, width: '100%' }}
                                                                    />
                                                                </CardItem>
                                                                <CardItem>
                                                                    <Text>
                                                                        {item.Description}
                                                                    </Text>
                                                                </CardItem>
                                                                <CardItem>
                                                                    <Left>
                                                                        <Text note>Gym: {item.Gym}</Text>
                                                                    </Left>
                                                                    <Right>
                                                                        <TouchableOpacity
                                                                            style={{ borderWidth: 1, borderColor: '#9b7979', paddingRight: 8, paddingLeft: 8, paddingTop: 4, paddingBottom: 4, borderRadius: 5 }}
                                                                            onPress={() => {
                                                                                this.MeetupChatScreen(item)
                                                                            }}>
                                                                            <View style={{ flexDirection: 'row' }}>
                                                                                <Ionicons
                                                                                    style={{ marginRight: 6 }}
                                                                                    size={20}
                                                                                    color="#FF6666"
                                                                                    name='md-hand' />
                                                                                <Text note style={{ color: '#9b7979' }}>WAVE</Text>
                                                                            </View>

                                                                        </TouchableOpacity>
                                                                    </Right>
                                                                </CardItem>

                                                                <CardItem>
                                                                    <Left>
                                                                        <Text note>Looking for {item.Gender} partner</Text>
                                                                    </Left>
                                                                    <Right>
                                                                        <Text note>{item.Date}</Text>
                                                                    </Right>
                                                                </CardItem>
                                                                {UserEmail === 'admin@gmail.com' ? (
                                                                    <CardItem>
                                                                        <Left>
                                                                            <TouchableOpacity
                                                                                onPress={() => {
                                                                                    this.DeletePost(item)
                                                                                }}>
                                                                                <View style={{ flexDirection: 'row' }}>
                                                                                    <Image
                                                                                        style={{ height: 30, width: 30 }}
                                                                                        source={require('../../assets/images/delete.png')}
                                                                                    />
                                                                                </View>

                                                                            </TouchableOpacity>
                                                                        </Left>

                                                                    </CardItem>
                                                                ) : (
                                                                        null
                                                                    )}
                                                                {UserEmail === 'admin@gmail.com' ? (
                                                                    <CardItem>
                                                                        {item.Report === "Reported" ? (
                                                                            <CardItem>
                                                                                <Left>
                                                                                    <Ionicons name="ios-alert" size={26} color="#FF0000" />
                                                                                </Left>
                                                                                <TouchableOpacity
                                                                                    onPress={() =>
                                                                                        ActionSheet.show(
                                                                                            {
                                                                                                options: BUTTON,
                                                                                                cancelButtonIndex: CANCEL_INDEX,
                                                                                                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                                                                                title: "Feedback"
                                                                                            },
                                                                                            buttonIndex => {
                                                                                                if (buttonIndex === 0) { this.DeletePost(item) }
                                                                                                if (buttonIndex === 1) { this.RemoveReport(item) }
                                                                                            }
                                                                                        )}
                                                                                >
                                                                                    <Text note>Take Action</Text>
                                                                                </TouchableOpacity>
                                                                                <Right>
                                                                                    <Text note>{item.Report}</Text>
                                                                                </Right>
                                                                            </CardItem>
                                                                        ) : (
                                                                                null
                                                                            )}
                                                                    </CardItem>

                                                                ) : (
                                                                        null
                                                                    )}
                                                            </Card>
                                                        ) : (
                                                                null
                                                            )}
                                                </View>

                                        }
                                    />



                                </ScrollView>
                            )}

                    </Tab>

                    <Tab heading={Strings.ST123} tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diets} activeTextStyle={styles.activetabs_text_diets}>


                        <ScrollView>
                            {UserEmail === 'admin@gmail.com' ? (
                                <TouchableOpacity
                                    style={styles.PostTextbtn3}
                                    onPress={() => this.setState({ isModalVisible2: true })}>
                                    <Text style={styles.PostTextmeetup}>Post</Text>
                                </TouchableOpacity>
                            ) : (
                                    null
                                )}

                            <FlatList
                                data={this.state.bootcamps}
                                initialNumToRender={7}
                                renderItem={
                                    ({ item }) =>
                                        <View>
                                            <Card>
                                                <CardItem>
                                                    <Left>
                                                        <Thumbnail source={{ uri: item.Profile }} />
                                                        <Body>
                                                            <Text>{item.Title}</Text>
                                                            <Text note>{item.City}</Text>
                                                        </Body>
                                                    </Left>

                                                    <Right>
                                                        <Text note>Date: {item.BootcampDate}</Text>
                                                    </Right>
                                                </CardItem>
                                                <CardItem cardBody>
                                                    <Image source={{ uri: item.Image }} style={{ height: width, width: null, flex: 1 }} />
                                                </CardItem>
                                                <CardItem>
                                                    <Text note>
                                                        {item.Description}
                                                    </Text>
                                                </CardItem>
                                                <CardItem>
                                                    <Text note>Address: {item.Address}</Text>
                                                </CardItem>

                                                {UserEmail === 'admin@gmail.com' ? (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            this.DeleteBootcamp(item);
                                                        }}>
                                                        <CardItem>
                                                            <Text>Delete Post</Text>
                                                        </CardItem>
                                                    </TouchableOpacity>
                                                ) : (
                                                        null
                                                    )}


                                                <CardItem>
                                                    <Left>
                                                        <TouchableOpacity
                                                            style={{ borderWidth: 1, borderColor: '#9b7979', paddingRight: 16, paddingLeft: 8, paddingTop: 4, paddingBottom: 4, borderRadius: 5 }}
                                                            onPress={() => Linking.openURL(item.URL)}>

                                                            <Text note style={{ color: '#9b7979' }}>Register Now</Text>

                                                        </TouchableOpacity>
                                                    </Left>
                                                    <Right>
                                                        <Text note>{item.Date}</Text>
                                                    </Right>
                                                </CardItem>
                                            </Card>

                                        </View>

                                }
                            />

                        </ScrollView>

                    </Tab>

                    <Tab heading={Strings.ST124} tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diets} activeTextStyle={styles.activetabs_text_diets}>

                        <FlatList
                            data={this.state.trainer}
                            initialNumToRender={7}
                            renderItem={
                                ({ item }) =>
                                    <View style={{ backgroundColor: '#f7f4f4' }}>
                                        <Card>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image source={{ uri: item.TrainerProfile }} style={{ height: 160, width: 120 }} />
                                                <View style={{ flex: 1, paddingLeft: 10 }}>
                                                    <View style={{ alignItems: 'center' }}>
                                                        <Text style={{ textAlign: 'center', fontSize: 18, color: 'rgba(0,0,0,0.3)', padding: 5 }}>{item.Name}</Text>
                                                        <Rating
                                                            // type='heart'
                                                            ratingCount={5}
                                                            imageSize={15}
                                                            startingValue={item.Rating}
                                                            // defaultRating={item.rating}
                                                            // showRating
                                                            readonly={true}
                                                        // onFinishRating={this.ratingCompleted}
                                                        />
                                                    </View>

                                                    <Text note style={{ marginTop: 10 }}>Gym: {item.Gym}</Text>
                                                    <Text note style={{ marginTop: 10 }}>{item.Moto}</Text>
                                                    <View style={{ alignItems: 'center', marginTop: 10, paddingBottom: 5 }}>
                                                        <TouchableOpacity style={{ borderWidth: 1, borderColor: '#9b7979', paddingRight: '20%', paddingLeft: '20%', paddingTop: 2, paddingBottom: 2, borderRadius: 5 }}
                                                            onPress={() => Linking.openURL("https://slickfitness.org/book-services/")}>
                                                            <Text note style={{ color: '#9b7979' }}>Contact</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>

                                        </Card>

                                    </View>

                            }
                        />

                    </Tab>

                </Tabs>

            </Container>
        );
    }

    _pickImage = async () => {
        await this.askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images",
            allowsEditing: true,
            aspect: [4, 4],
            quality:0.4
        });

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
            xhr.open("GET", result.uri, true);
            xhr.send(null);
        });


        const reference = firebase.storage().ref().child('images/' + Key);

        const snapshot = await reference.put(blob);
        const myUrl = snapshot.downloadURL;
        this.setState({ Image: myUrl })

    };


    UploadmeetUp = async () => {
        this.setState({ isLoading: true })
        setTimeout(async () => {

            if (Platform.OS === 'android' && !Constants.isDevice) {
                this.setState({
                    errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
                });
            } else {
                let { status } = await Permissions.askAsync(Permissions.LOCATION);
                if (status !== 'granted') {
                    this.setState({
                        errorMessage: 'Permission to access location was denied',
                    });
                }
                else {
                    await navigator.geolocation.getCurrentPosition(
                        position => {
                            const location = JSON.stringify(position);

                            this.setState({ latitude: position.coords.latitude });
                            this.setState({ longitude: position.coords.longitude });
                            var long = position.coords.longitude;
                            var lati = position.coords.latitude;

                            var Longi = (parseFloat(long).toPrecision(3));
                            var latit = (parseFloat(lati).toPrecision(3));
                            this.setState({ latitude2: latit });
                            this.setState({ longitude2: Longi });
                            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>: " + this.state.latitude2 + "  " + this.state.longitude2);

                        },
                        error => Alert.alert(error.message),
                        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
                    );
                }
            }

            var ImageAvatar = null;
            var userId = firebase.auth().currentUser.uid;
            await firebase.database().ref('users').child(userId).once('value').then(function (snapshot) {
                ImageAvatar = (snapshot.val() && snapshot.val().Image);
                console.log('>>>>>>>>>>>>>>>>>ImageAvatar<<<<<<<<<<<<<<<<<  ' + ImageAvatar)
            });

            var LocationId = parseFloat(this.state.latitude2) + parseFloat(this.state.longitude2)
            console.log("SELECTED     " + this.state.selected + "Description  " + this.state.Description +
                "Gym      " + this.state.GymText + "image    " + this.state.Image + "City     " + this.state.CityText + "Avatar   " + ImageAvatar)


            if (this.state.selected != "Gender" && this.state.Description != null
                && this.state.GymText != null && this.state.Image != null
                && this.state.CityText && ImageAvatar != null) {
                this.setState({ isModalVisible: false })

                var user = firebase.auth().currentUser.uid;
                var userName = firebase.auth().currentUser.displayName;

                var newPostRef = firebase.database().ref('MeetUp').push({
                    Profile: ImageAvatar,
                    User: user,
                    Name: userName,
                    Description: this.state.Description,
                    Image: this.state.Image,
                    Gender: this.state.selected,
                    Date: new Date().toDateString(),
                    Gym: this.state.GymText,
                    City: this.state.CityText,
                    Node: "null",
                    Longitude: this.state.longitude2,
                    Latitide: this.state.latitude2,
                    LongitudeReal: this.state.longitude,
                    LatitideReal: this.state.latitude,
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
                                    body: userName + ' needs a workout partner'
                                })
                            });
                        });
                    });
                    Alert.alert(
                        'Upload Successfully'
                    )
                    this.setState({ isLoading: false })
                    var Key = data.key
                    firebase.database().ref('MeetUp').child(Key).update({
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
                Alert.alert("Please Fill The Form Proper.")
                this.setState({ isLoading: false })
            }

        }, 5000);

    }

    UploadBootcamp = async () => {
        this.setState({ isLoading: true })

        var ImageAvatar = null;
        var userId = firebase.auth().currentUser.uid;
        await firebase.database().ref('users').child(userId).once('value').then(function (snapshot) {
            ImageAvatar = (snapshot.val() && snapshot.val().Image);
        });

        if (this.state.DescriptionBootcamp != null
            && this.state.AddressBootpcamp != null && this.state.Image != null
            && this.state.CityBootcamp != null && this.state.CityBootcamp != null && this.state.DateBootcamp != null
            && this.state.Title != null && this.state.WebsiteURL != null && ImageAvatar != null) {

            this.setState({ isModalVisible2: false })

            var user = firebase.auth().currentUser.uid;
            var userName = firebase.auth().currentUser.displayName;

            var newPostRef = firebase.database().ref('MeetUpBootcamp').push({
                Profile: ImageAvatar,
                User: user,
                Name: userName,
                Description: this.state.DescriptionBootcamp,
                Image: this.state.Image,
                Date: new Date().toDateString(),
                Address: this.state.AddressBootpcamp,
                City: this.state.CityBootcamp,
                Node: "null",
                BootcampDate: this.state.DateBootcamp,
                Title: this.state.Title,
                URL: this.state.WebsiteURL,

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
                                body: 'New Bootcamp Posted'
                            })
                        });
                    });
                });
                Alert.alert(
                    'Upload Successfully'
                )
                this.setState({ isLoading: false })
                var Key = data.key
                firebase.database().ref('MeetUpBootcamp').child(Key).update({
                    Node: Key
                })

            }).catch((error) => {
                Alert.alert(
                    'Upload Not Successfully' + error
                )
            })
            const postKey = firebase.database().ref().child('MeetUp').push().key;

        }
        else {
            Alert.alert("Please Fill The Form Proper.")
            this.setState({ isLoading: false })

        }
    }



}