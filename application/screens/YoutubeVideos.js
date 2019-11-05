import React, { Component } from 'react';
import * as firebase from 'firebase';
import { TouchableOpacity, Dimensions, View, Image, ScrollView, Alert } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';
import { Container, Form, Item, Picker, Button, Text, Input, Tabs, Tab, ScrollableTab } from 'native-base';
import Strings from '../utils/Strings';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
var styles = require('../../assets/files/Styles');
var { height } = Dimensions.get('window');
import AppPreLoader from '../components/AppPreLoader';


export default class YoutubeVideos extends Component {
    static navigationOptions = {
        title: `${Strings.ST114}`,
    };


    constructor(props) {

        super(props);

        this.state = {
            isLoading: false,
            text: null,
            selected: "Upper Body",
            selected1: "beginner",
            selected3: "Dumbbells",
            selected4: "1",
            title1: null,
            thumbnail: null,
            UploadImageForbackground: null,
            selectedImages: "Progress",
            selectedImages2: "FatLoss",
            AddImage: null,
            TrainerEmail: '',
            TrainerExperience: '',
            TrainerFee: '',
            TrainerGym: '',
            Moto: '',
            PremiumEmail: '',
            AddChallange: '',


        }

    }

    onValueChange(value) {
        this.setState({
            selected: value
        });
    }
    onValueChange1(value) {
        this.setState({
            selected1: value
        });
    }

    onValueChange2(value) {
        this.setState({
            selected3: value
        });
    }
    onValueChange3(value) {
        this.setState({
            selectedImages: value
        });
    }
    onValueChange4(value) {
        this.setState({
            selectedImages2: value
        });
    }

    onValueChange5(value) {
        this.setState({
            selected4: value
        });
    }

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        // you would probably do something to verify that permissions
        // are actually granted, but I'm skipping that for brevity
    };



    render() {

        if (this.state.isLoading) {
            return (
                <AppPreLoader />
            );
        }

        return (

            <Container>
                <Tabs renderTabBar={() => <ScrollableTab />}>

                    <Tab heading="Challanges Add">
                        <Container style={styles.background_general}>
                            <ScrollView>
                                {/* <Grid>

                                    <Row style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', height: height * 0.30, padding: 30, paddingBottom: 0 }}>
                                        <Image
                                            source={require('../../assets/images/logo_dark.png')}
                                            style={{ flex: 1, width: 130, height: 130 }}
                                            resizeMode='contain' />
                                    </Row>

                                </Grid> */}

                                {/* <View style={styles.imageUploadDiv}>
                                    <TouchableOpacity onPress={this._pickImage}>
                                        <Image
                                            style={styles.UploadImage}
                                            source={require('../../assets/images/camera.png')}
                                        />
                                    </TouchableOpacity>
                                    <Text>Upload Thumbnail</Text>
                                </View> */}

                                {/* <Form>
                                    <Picker
                                        mode="dropdown"
                                        iosHeader="Select Category"
                                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                                        style={{ width: undefined }}
                                        selectedValue={this.state.selected}
                                        onValueChange={this.onValueChange.bind(this)}
                                    >
                                        <Picker.Item label="Upper Body" value="Upper Body" />
                                        <Picker.Item label="Lower Body" value="Lower Body" />
                                        <Picker.Item label="Glutes" value="Glutes" />
                                        <Picker.Item label="Gain Total Body" value="Gain Total Body" />
                                        <Picker.Item label="Lean Total Body" value="Lean Total Body" />
                                        <Picker.Item label="Abs" value="Abs" />
                                        <Picker.Item label="Balance" value="Balance" />
                                        <Picker.Item label="Stretch" value="Stretch" />
                                    </Picker>
                                </Form> */}

                                {/* <Form>
                                    <Picker
                                        mode="dropdown"
                                        iosHeader="Select Category"
                                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                                        style={{ width: undefined }}
                                        selectedValue={this.state.selected1}
                                        onValueChange={this.onValueChange1.bind(this)}
                                    >
                                        <Picker.Item label="beginner" value="beginner" />
                                        <Picker.Item label="Intermediate" value="Intermediate" />
                                        <Picker.Item label="Elite" value="Elite" />
                                    </Picker>
                                </Form> */}



                                <Item rounded
                                    style={{ marginBottom: 10 }}>

                                    <Input placeholder='Enter Youtbe Video ID'
                                        placeholderTextColor='#d1d5da'

                                        onChangeText={(AddChallange) => this.setState({ AddChallange })}
                                    />

                                </Item>

                                <Button block info
                                    onPress={this.IncreseChallange}
                                    style={styles.uploadVideoButton}>
                                    <Text>Upload</Text>
                                </Button>

                            </ScrollView>

                        </Container >

                    </Tab>

                    <Tab heading="Bodyparts">
                        <Container style={styles.background_general}>
                            <ScrollView>
                                <Grid>

                                    <Row style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', height: height * 0.30, padding: 30, paddingBottom: 0 }}>
                                        <Image
                                            source={require('../../assets/images/logo_dark.png')}
                                            style={{ flex: 1, width: 130, height: 130 }}
                                            resizeMode='contain' />
                                    </Row>

                                </Grid>

                                <View style={styles.imageUploadDiv}>
                                    <TouchableOpacity onPress={this._pickImage}>
                                        <Image
                                            style={styles.UploadImage}
                                            source={require('../../assets/images/camera.png')}
                                        />
                                    </TouchableOpacity>
                                    <Text>Upload Thumbnail</Text>
                                </View>

                                <Form>
                                    <Picker
                                        mode="dropdown"
                                        iosHeader="Select Category"
                                        iosIcon={<Ionicons name="ios-arrow-down-outline" />}
                                        style={{ width: undefined }}
                                        selectedValue={this.state.selected}
                                        onValueChange={this.onValueChange.bind(this)}
                                    >
                                        <Picker.Item label="Upper Body" value="Upper Body" />
                                        <Picker.Item label="Lower Body" value="Lower Body" />
                                        <Picker.Item label="Glutes" value="Glutes" />
                                        <Picker.Item label="Gain Total Body" value="Gain Total Body" />
                                        <Picker.Item label="Lean Total Body" value="Lean Total Body" />
                                        <Picker.Item label="Abs" value="Abs" />
                                        <Picker.Item label="Balance" value="Balance" />
                                        <Picker.Item label="Stretch" value="Stretch" />
                                    </Picker>
                                </Form>

                                <Form>
                                    <Picker
                                        mode="dropdown"
                                        iosHeader="Select Category"
                                        iosIcon={<Ionicons name="ios-arrow-down-outline" />}
                                        style={{ width: undefined }}
                                        selectedValue={this.state.selected1}
                                        onValueChange={this.onValueChange1.bind(this)}
                                    >
                                        <Picker.Item label="beginner" value="beginner" />
                                        <Picker.Item label="Intermediate" value="Intermediate" />
                                        <Picker.Item label="Elite" value="Elite" />
                                    </Picker>
                                </Form>



                                <Item rounded
                                    style={{ marginBottom: 10 }}>

                                    <Input placeholder='Enter Youtbe Video ID'
                                        placeholderTextColor='#d1d5da'

                                        onChangeText={(text) => this.setState({ text })}
                                    />

                                </Item>




                                <Item rounded>
                                    <Input placeholder='Title'
                                        placeholderTextColor='#d1d5da'

                                        onChangeText={(title1) => this.setState({ title1 })}
                                    />

                                </Item>

                                <TouchableOpacity
                                    style={styles.imageUploadDiv}
                                    onPress={this._pickImageAdd}>
                                    <Ionicons name="md-camera" padding={10} size={30} color="#900" />
                                </TouchableOpacity>

                                <Button block info
                                    onPress={this.UploadURL}
                                    style={styles.uploadVideoButton}>
                                    <Text>Upload</Text>
                                </Button>

                            </ScrollView>

                        </Container >

                    </Tab>


                    <Tab heading="Gym Routine">

                        <Container style={styles.background_general}>
                            <ScrollView>
                                <Grid>

                                    <Row style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', height: height * 0.30, padding: 30, paddingBottom: 0 }}>
                                        <Image
                                            source={require('../../assets/images/logo_dark.png')}
                                            style={{ flex: 1, width: 130, height: 130 }}
                                            resizeMode='contain' />
                                    </Row>

                                </Grid>

                                <View style={styles.imageUploadDiv}>
                                    <TouchableOpacity onPress={this._pickImage}>
                                        <Image
                                            style={styles.UploadImage}
                                            source={require('../../assets/images/camera.png')}
                                        />
                                    </TouchableOpacity>
                                    <Text>Upload Thumbnail</Text>
                                </View>

                                <Form>
                                    <Picker
                                        mode="dropdown"
                                        iosHeader="Select Category"
                                        iosIcon={<Ionicons name="ios-arrow-down-outline" />}
                                        style={{ width: undefined }}
                                        selectedValue={this.state.selected3}
                                        onValueChange={this.onValueChange2.bind(this)}
                                    >
                                        <Picker.Item label="Dumbbells" value="Dumbbells" />
                                        <Picker.Item label="Barbell" value="Barbell" />
                                        <Picker.Item label="Kettlebells" value="Kettlebells" />
                                        <Picker.Item label="Step Bench" value="Step Bench" />
                                        <Picker.Item label="Cable Machine" value="Cable Machine" />
                                        <Picker.Item label="Medicine Ball" value="Medicine Ball" />
                                    </Picker>
                                </Form>

                                <Form>
                                    <Picker
                                        mode="dropdown"
                                        iosHeader="Select Category"
                                        iosIcon={<Ionicons name="ios-arrow-down-outline" />}
                                        style={{ width: undefined }}
                                        selectedValue={this.state.selected1}
                                        onValueChange={this.onValueChange1.bind(this)}
                                    >
                                        <Picker.Item label="beginner" value="beginner" />
                                        <Picker.Item label="Intermediate" value="Intermediate" />
                                        <Picker.Item label="Elite" value="Elite" />
                                    </Picker>
                                </Form>



                                <Item rounded
                                    style={{ marginBottom: 10 }}>

                                    <Input placeholder='Enter Youtbe Video ID'
                                        placeholderTextColor='#d1d5da'

                                        onChangeText={(text) => this.setState({ text })}
                                    />

                                </Item>


                                <Item rounded>
                                    <Input placeholder='Title'
                                        placeholderTextColor='#d1d5da'

                                        onChangeText={(title1) => this.setState({ title1 })}
                                    />

                                </Item>

                                <TouchableOpacity
                                    style={styles.imageUploadDiv}
                                    onPress={this._pickImageAdd}>
                                    <Ionicons name="md-camera" padding={10} size={30} color="#900" />
                                </TouchableOpacity>

                                <Button block
                                    onPress={this.UploadURL2}
                                    style={styles.uploadVideoButton}>
                                    <Text>Upload</Text>
                                </Button>

                            </ScrollView>

                        </Container >


                    </Tab>


                    <Tab heading="Home Workout">


                        <Container style={styles.background_general}>
                            <ScrollView>
                                <Grid>

                                    <Row style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', height: height * 0.30, padding: 30, paddingBottom: 0 }}>
                                        <Image
                                            source={require('../../assets/images/logo_dark.png')}
                                            style={{ flex: 1, width: 130, height: 130 }}
                                            resizeMode='contain' />
                                    </Row>

                                </Grid>

                                <View style={styles.imageUploadDiv}>
                                    <TouchableOpacity onPress={this._pickImage}>
                                        <Image
                                            style={styles.UploadImage}
                                            source={require('../../assets/images/camera.png')}
                                        />
                                    </TouchableOpacity>
                                    <Text>Upload Thumbnail</Text>
                                </View>

                                <Form>
                                    <Picker
                                        mode="dropdown"
                                        iosHeader="Select Category"
                                        iosIcon={<Ionicons name="ios-arrow-down-outline" />}
                                        style={{ width: undefined }}
                                        selectedValue={this.state.selected1}
                                        onValueChange={this.onValueChange1.bind(this)}
                                    >
                                        <Picker.Item label="beginner" value="beginner" />
                                        <Picker.Item label="Intermediate" value="Intermediate" />
                                        <Picker.Item label="Elite" value="Elite" />
                                    </Picker>
                                </Form>



                                <Item rounded
                                    style={{ marginBottom: 10 }}>

                                    <Input placeholder='Enter Youtbe Video ID'
                                        placeholderTextColor='#d1d5da'

                                        onChangeText={(text) => this.setState({ text })}
                                    />

                                </Item>


                                <Item rounded>
                                    <Input placeholder='Title'
                                        placeholderTextColor='#d1d5da'

                                        onChangeText={(title1) => this.setState({ title1 })}
                                    />

                                </Item>

                                <TouchableOpacity
                                    style={styles.imageUploadDiv}
                                    onPress={this._pickImageAdd}>
                                    <Ionicons name="md-camera" padding={10} size={30} color="#900" />
                                </TouchableOpacity>


                                <Button block danger
                                    onPress={this.UploadURL3}
                                    style={styles.uploadVideoButton}>
                                    <Text>Upload</Text>
                                </Button>

                            </ScrollView>

                        </Container >

                    </Tab>
                    <Tab heading="Update Images">



                        <Container style={styles.background_general}>
                            <ScrollView>
                                <Grid>

                                    <Row style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', height: height * 0.30, padding: 30, paddingBottom: 0 }}>
                                        <Image
                                            source={require('../../assets/images/logo_dark.png')}
                                            style={{ flex: 1, width: 130, height: 130 }}
                                            resizeMode='contain' />
                                    </Row>

                                </Grid>
                                <Form>
                                    <Picker
                                        mode="dropdown"
                                        iosHeader="Select Category"
                                        iosIcon={<Ionicons name="ios-arrow-down-outline" />}
                                        style={{ width: undefined }}
                                        selectedValue={this.state.selectedImages}
                                        onValueChange={this.onValueChange3.bind(this)}
                                    >

                                        <Picker.Item label="Progress Gallery" value="Progress" />
                                        <Picker.Item label="Bodyparts" value="Bodyparts" />
                                        <Picker.Item label="Gym Routine" value="GymRoutine" />
                                        <Picker.Item label="Home Routine" value="HomeRoutine" />
                                        <Picker.Item label="Challenge" value="Challenge" />
                                        <Picker.Item label="Abs & Ass" value="AbsAss" />
                                        <Picker.Item label="Glute & Leg" value="GluteLeg" />
                                        <Picker.Item label="Slick Weight Loss" value="WeightLoss" />
                                        <Picker.Item label="Slick Arms & Abs" value="ArmsAbs" />

                                    </Picker>
                                </Form>

                                <View style={styles.imageUploadDiv}>
                                    <TouchableOpacity onPress={this._pickImageForBackground}>
                                        <Image
                                            style={styles.UploadImage}
                                            source={require('../../assets/images/camera.png')}
                                        />
                                    </TouchableOpacity>
                                    <Text>Upload Background Image</Text>
                                </View>

                                <Button block success
                                    onPress={this.SaveImageIntoDatabase}
                                    style={styles.uploadVideoButton}>
                                    <Text>Upload</Text>
                                </Button>
                            </ScrollView>

                        </Container >

                    </Tab>

                    <Tab heading="Challenge">
                        <ScrollView>

                            <Grid>

                                <Row style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', height: height * 0.30, padding: 30, paddingBottom: 0 }}>
                                    <Image
                                        source={require('../../assets/images/logo_dark.png')}
                                        style={{ flex: 1, width: 130, height: 130 }}
                                        resizeMode='contain' />
                                </Row>

                            </Grid>



                            <Tabs tabBarUnderlineStyle={{ backgroundColor: '#F62459' }} tabContainerStyle={{ elevation: 0 }}>

                                <Tab heading={Strings.ST118} tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diets} activeTextStyle={styles.activetabs_text_diets}>

                                    <View style={{ marginBottom: 10 }} />

                                    <View style={styles.imageUploadDiv}>
                                        <TouchableOpacity onPress={this._pickImage}>
                                            <Image
                                                style={styles.UploadImage}
                                                source={require('../../assets/images/camera.png')}
                                            />
                                        </TouchableOpacity>
                                        <Text>Upload Thumbnail</Text>
                                    </View>

                                    <Form>
                                        <Picker
                                            mode="dropdown"
                                            iosHeader="Select Category"
                                            iosIcon={<Ionicons name="ios-arrow-down-outline" />}
                                            style={{ width: undefined }}
                                            selectedValue={this.state.selected4}
                                            onValueChange={this.onValueChange5.bind(this)}
                                        >
                                            <Picker.Item label="Day 1" value="1" />
                                            <Picker.Item label="Day 2" value="2" />
                                            <Picker.Item label="Day 3" value="3" />
                                            <Picker.Item label="Day 4" value="4" />
                                            <Picker.Item label="Day 5" value="5" />
                                            <Picker.Item label="Day 6" value="6" />
                                            <Picker.Item label="Day 7" value="7" />
                                            <Picker.Item label="Day 8" value="8" />
                                            <Picker.Item label="Day 9" value="9" />
                                            <Picker.Item label="Day 10" value="10" />
                                            <Picker.Item label="Day 11" value="11" />
                                            <Picker.Item label="Day 12" value="12" />
                                            <Picker.Item label="Day 13" value="13" />
                                            <Picker.Item label="Day 14" value="14" />
                                            <Picker.Item label="Day 15" value="15" />
                                            <Picker.Item label="Day 16" value="16" />
                                            <Picker.Item label="Day 17" value="17" />
                                            <Picker.Item label="Day 18" value="18" />
                                            <Picker.Item label="Day 19" value="19" />
                                            <Picker.Item label="Day 20" value="20" />
                                            <Picker.Item label="Day 21" value="21" />
                                            <Picker.Item label="Day 22" value="22" />
                                            <Picker.Item label="Day 23" value="23" />
                                            <Picker.Item label="Day 24" value="24" />
                                            <Picker.Item label="Day 25" value="25" />
                                            <Picker.Item label="Day 26" value="26" />
                                            <Picker.Item label="Day 27" value="27" />
                                            <Picker.Item label="Day 28" value="28" />
                                        </Picker>
                                    </Form>



                                    <Item rounded
                                        style={{ marginBottom: 10 }}>

                                        <Input placeholder='Enter Youtbe Video ID'
                                            placeholderTextColor='#d1d5da'

                                            onChangeText={(text) => this.setState({ text })}
                                        />

                                    </Item>


                                    <Item rounded>
                                        <Input placeholder='Title'
                                            placeholderTextColor='#d1d5da'

                                            onChangeText={(title1) => this.setState({ title1 })}
                                        />

                                    </Item>

                                    <TouchableOpacity
                                        style={styles.imageUploadDiv}
                                        onPress={this._pickImageAdd}>
                                        <Ionicons name="md-camera" padding={10} size={30} color="#900" />
                                    </TouchableOpacity>


                                    <Button block danger
                                        onPress={this.UploadAbsDay}
                                        style={styles.uploadVideoButton}>
                                        <Text>Upload</Text>
                                    </Button>


                                </Tab>

                                <Tab heading={Strings.ST119} tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diets} activeTextStyle={styles.activetabs_text_diets}>


                                    <View style={{ marginBottom: 10 }} />

                                    <View style={styles.imageUploadDiv}>
                                        <TouchableOpacity onPress={this._pickImage}>
                                            <Image
                                                style={styles.UploadImage}
                                                source={require('../../assets/images/camera.png')}
                                            />
                                        </TouchableOpacity>
                                        <Text>Upload Thumbnail</Text>
                                    </View>

                                    <Form>
                                        <Picker
                                            mode="dropdown"
                                            iosHeader="Select Category"
                                            iosIcon={<Ionicons name="ios-arrow-down-outline" />}
                                            style={{ width: undefined }}
                                            selectedValue={this.state.selected4}
                                            onValueChange={this.onValueChange5.bind(this)}
                                        >
                                            <Picker.Item label="Day 1" value="1" />
                                            <Picker.Item label="Day 2" value="2" />
                                            <Picker.Item label="Day 3" value="3" />
                                            <Picker.Item label="Day 4" value="4" />
                                            <Picker.Item label="Day 5" value="5" />
                                            <Picker.Item label="Day 6" value="6" />
                                            <Picker.Item label="Day 7" value="7" />
                                            <Picker.Item label="Day 8" value="8" />
                                            <Picker.Item label="Day 9" value="9" />
                                            <Picker.Item label="Day 10" value="10" />
                                            <Picker.Item label="Day 11" value="11" />
                                            <Picker.Item label="Day 12" value="12" />
                                            <Picker.Item label="Day 13" value="13" />
                                            <Picker.Item label="Day 14" value="14" />
                                            <Picker.Item label="Day 15" value="15" />
                                            <Picker.Item label="Day 16" value="16" />
                                            <Picker.Item label="Day 17" value="17" />
                                            <Picker.Item label="Day 18" value="18" />
                                            <Picker.Item label="Day 19" value="19" />
                                            <Picker.Item label="Day 20" value="20" />
                                            <Picker.Item label="Day 21" value="21" />
                                            <Picker.Item label="Day 22" value="22" />
                                            <Picker.Item label="Day 23" value="23" />
                                            <Picker.Item label="Day 24" value="24" />
                                            <Picker.Item label="Day 25" value="25" />
                                            <Picker.Item label="Day 26" value="26" />
                                            <Picker.Item label="Day 27" value="27" />
                                            <Picker.Item label="Day 28" value="28" />
                                        </Picker>
                                    </Form>



                                    <Item rounded
                                        style={{ marginBottom: 10 }}>

                                        <Input placeholder='Enter Youtbe Video ID'
                                            placeholderTextColor='#d1d5da'

                                            onChangeText={(text) => this.setState({ text })}
                                        />

                                    </Item>


                                    <Item rounded>
                                        <Input placeholder='Title'
                                            placeholderTextColor='#d1d5da'

                                            onChangeText={(title1) => this.setState({ title1 })}
                                        />

                                    </Item>

                                    <TouchableOpacity
                                        style={styles.imageUploadDiv}
                                        onPress={this._pickImageAdd}>
                                        <Ionicons name="md-camera" padding={10} size={30} color="#900" />
                                    </TouchableOpacity>


                                    <Button block danger
                                        onPress={this.UploadGluteLeg}
                                        style={styles.uploadVideoButton}>
                                        <Text>Upload</Text>
                                    </Button>


                                </Tab>

                                <Tab heading={Strings.ST120} tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diets} activeTextStyle={styles.activetabs_text_diets}>


                                    <View style={{ marginBottom: 10 }} />

                                    <View style={styles.imageUploadDiv}>
                                        <TouchableOpacity onPress={this._pickImage}>
                                            <Image
                                                style={styles.UploadImage}
                                                source={require('../../assets/images/camera.png')}
                                            />
                                        </TouchableOpacity>
                                        <Text>Upload Thumbnail</Text>
                                    </View>

                                    <Form>
                                        <Picker
                                            mode="dropdown"
                                            iosHeader="Select Category"
                                            iosIcon={<Ionicons name="ios-arrow-down-outline" />}
                                            style={{ width: undefined }}
                                            selectedValue={this.state.selected4}
                                            onValueChange={this.onValueChange5.bind(this)}
                                        >
                                            <Picker.Item label="Day 1" value="1" />
                                            <Picker.Item label="Day 2" value="2" />
                                            <Picker.Item label="Day 3" value="3" />
                                            <Picker.Item label="Day 4" value="4" />
                                            <Picker.Item label="Day 5" value="5" />
                                            <Picker.Item label="Day 6" value="6" />
                                            <Picker.Item label="Day 7" value="7" />
                                            <Picker.Item label="Day 8" value="8" />
                                            <Picker.Item label="Day 9" value="9" />
                                            <Picker.Item label="Day 10" value="10" />
                                            <Picker.Item label="Day 11" value="11" />
                                            <Picker.Item label="Day 12" value="12" />
                                            <Picker.Item label="Day 13" value="13" />
                                            <Picker.Item label="Day 14" value="14" />
                                            <Picker.Item label="Day 15" value="15" />
                                            <Picker.Item label="Day 16" value="16" />
                                            <Picker.Item label="Day 17" value="17" />
                                            <Picker.Item label="Day 18" value="18" />
                                            <Picker.Item label="Day 19" value="19" />
                                            <Picker.Item label="Day 20" value="20" />
                                            <Picker.Item label="Day 21" value="21" />
                                            <Picker.Item label="Day 22" value="22" />
                                            <Picker.Item label="Day 23" value="23" />
                                            <Picker.Item label="Day 24" value="24" />
                                            <Picker.Item label="Day 25" value="25" />
                                            <Picker.Item label="Day 26" value="26" />
                                            <Picker.Item label="Day 27" value="27" />
                                            <Picker.Item label="Day 28" value="28" />
                                        </Picker>
                                    </Form>



                                    <Item rounded
                                        style={{ marginBottom: 10 }}>

                                        <Input placeholder='Enter Youtbe Video ID'
                                            placeholderTextColor='#d1d5da'

                                            onChangeText={(text) => this.setState({ text })}
                                        />

                                    </Item>


                                    <Item rounded>
                                        <Input placeholder='Title'
                                            placeholderTextColor='#d1d5da'

                                            onChangeText={(title1) => this.setState({ title1 })}
                                        />

                                    </Item>

                                    <TouchableOpacity
                                        style={styles.imageUploadDiv}
                                        onPress={this._pickImageAdd}>
                                        <Ionicons name="md-camera" padding={10} size={30} color="#900" />
                                    </TouchableOpacity>


                                    <Button block danger
                                        onPress={this.UploadWeightLoss}
                                        style={styles.uploadVideoButton}>
                                        <Text>Upload</Text>
                                    </Button>


                                </Tab>

                                <Tab heading={Strings.ST121} tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diets} activeTextStyle={styles.activetabs_text_diets}>


                                    <View style={{ marginBottom: 10 }} />

                                    <View style={styles.imageUploadDiv}>
                                        <TouchableOpacity onPress={this._pickImage}>
                                            <Image
                                                style={styles.UploadImage}
                                                source={require('../../assets/images/camera.png')}
                                            />
                                        </TouchableOpacity>
                                        <Text>Upload Thumbnail</Text>
                                    </View>

                                    <Form>
                                        <Picker
                                            mode="dropdown"
                                            iosHeader="Select Category"
                                            iosIcon={<Ionicons name="ios-arrow-down-outline" />}
                                            style={{ width: undefined }}
                                            selectedValue={this.state.selected4}
                                            onValueChange={this.onValueChange5.bind(this)}
                                        >
                                            <Picker.Item label="Day 1" value="1" />
                                            <Picker.Item label="Day 2" value="2" />
                                            <Picker.Item label="Day 3" value="3" />
                                            <Picker.Item label="Day 4" value="4" />
                                            <Picker.Item label="Day 5" value="5" />
                                            <Picker.Item label="Day 6" value="6" />
                                            <Picker.Item label="Day 7" value="7" />
                                            <Picker.Item label="Day 8" value="8" />
                                            <Picker.Item label="Day 9" value="9" />
                                            <Picker.Item label="Day 10" value="10" />
                                            <Picker.Item label="Day 11" value="11" />
                                            <Picker.Item label="Day 12" value="12" />
                                            <Picker.Item label="Day 13" value="13" />
                                            <Picker.Item label="Day 14" value="14" />
                                            <Picker.Item label="Day 15" value="15" />
                                            <Picker.Item label="Day 16" value="16" />
                                            <Picker.Item label="Day 17" value="17" />
                                            <Picker.Item label="Day 18" value="18" />
                                            <Picker.Item label="Day 19" value="19" />
                                            <Picker.Item label="Day 20" value="20" />
                                            <Picker.Item label="Day 21" value="21" />
                                            <Picker.Item label="Day 22" value="22" />
                                            <Picker.Item label="Day 23" value="23" />
                                            <Picker.Item label="Day 24" value="24" />
                                            <Picker.Item label="Day 25" value="25" />
                                            <Picker.Item label="Day 26" value="26" />
                                            <Picker.Item label="Day 27" value="27" />
                                            <Picker.Item label="Day 28" value="28" />
                                        </Picker>
                                    </Form>



                                    <Item rounded
                                        style={{ marginBottom: 10 }}>

                                        <Input placeholder='Enter Youtbe Video ID'
                                            placeholderTextColor='#d1d5da'

                                            onChangeText={(text) => this.setState({ text })}
                                        />

                                    </Item>


                                    <Item rounded>
                                        <Input placeholder='Title'
                                            placeholderTextColor='#d1d5da'

                                            onChangeText={(title1) => this.setState({ title1 })}
                                        />

                                    </Item>

                                    <TouchableOpacity
                                        style={styles.imageUploadDiv}
                                        onPress={this._pickImageAdd}>
                                        <Ionicons name="md-camera" padding={10} size={30} color="#900" />
                                    </TouchableOpacity>


                                    <Button block danger
                                        onPress={this.UploadArmsAbs}
                                        style={styles.uploadVideoButton}>
                                        <Text>Upload</Text>
                                    </Button>


                                </Tab>

                            </Tabs>

                        </ScrollView>

                    </Tab>

                    <Tab heading="Trainer" style={{ padding: '10%' }}>
                        <ScrollView>
                            <Text style={{ textAlign: 'center', fontSize: 26, color: '#d1d5da', marginBottom: '15%' }}>Make User Trainer!</Text>

                            <View style={styles.imageUploadDiv}>
                                <TouchableOpacity onPress={this._pickImage}>
                                    <Image
                                        style={styles.UploadImage}
                                        source={require('../../assets/images/camera.png')}
                                    />
                                </TouchableOpacity>
                                <Text style={{ marginBottom: 10 }}>Upload Thumbnail</Text>
                            </View>

                            <Item rounded style={{ marginBottom: 15 }}>
                                <Input placeholder='E-mail'
                                    placeholderTextColor='#d1d5da'

                                    onChangeText={(TrainerEmail) => this.setState({ TrainerEmail })}
                                />

                            </Item>

                            <Item rounded style={{ marginBottom: 15 }}>
                                <Input placeholder='GYM'
                                    placeholderTextColor='#d1d5da'

                                    onChangeText={(TrainerGym) => this.setState({ TrainerGym })}
                                />

                            </Item>

                            <Item rounded style={{ marginBottom: 15 }}>
                                <Input placeholder='Rate out of 5'
                                    placeholderTextColor='#d1d5da'

                                    onChangeText={(TrainerExperience) => this.setState({ TrainerExperience })}
                                />

                            </Item>

                            <Item rounded style={{ marginBottom: 15 }}>
                                <Input placeholder='Moto'
                                    placeholderTextColor='#d1d5da'

                                    onChangeText={(Moto) => this.setState({ Moto })}
                                />

                            </Item>

                            <Button block danger
                                onPress={this.MakeTrainer}
                                style={styles.uploadVideoButton}>
                                <Text>Submit</Text>
                            </Button>
                        </ScrollView>
                    </Tab>


                    <Tab heading="Premium User" style={{ padding: '10%' }}>
                        <ScrollView>
                            <Text style={{ textAlign: 'center', fontSize: 26, color: '#d1d5da', marginBottom: '15%' }}>Make User Premium!</Text>

                            <Item rounded style={{ marginBottom: 15 }}>
                                <Input placeholder='E-mail'
                                    placeholderTextColor='#d1d5da'

                                    onChangeText={(PremiumEmail) => this.setState({ PremiumEmail })}
                                />

                            </Item>

                            <Button block danger
                                onPress={this.MakePremiumUser}
                                style={styles.uploadVideoButton}>
                                <Text>Submit</Text>
                            </Button>
                        </ScrollView>
                    </Tab>


                </Tabs>
            </Container>


        )
    }

    _pickImage = async () => {
        await this.askPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images",
            allowsEditing: true,
            aspect: [4, 4],
            quality:0.5
        });

        console.log(result);

        if (!result.cancelled) {
            // this.setState({ image: result.uri });
            const myRef = firebase.database().ref();
            const Key = myRef.push();

            // const response = await fetch(result.uri);
            // const blob = await response.blob();

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
            this.setState({ thumbnail: myUrl }, () => {
                console.log(this.state.thumbnail, 'dealersOverallTotal1');
            });

            console.log("ttttttttttthhhhhhhhhhhhhhhhhmmmmmmmmmmmmmnnnnnnaaaaaaillllll:  " + this.state.thumbnail + "   "
                + "uuuuuuuuuuuuurrrrrrrrrrrrrrrrrrrrrrrlllllllllllll:  " + myUrl);
        }
    };

    _pickImageAdd = async () => {
        await this.askPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images",
            allowsEditing: true,
            aspect: [4, 4],
            quality:0.5
        });

        console.log(result);

        if (!result.cancelled) {
            // this.setState({ image: result.uri });
            const myRef = firebase.database().ref();
            const Key = myRef.push();

            // const response = await fetch(result.uri);
            // const blob = await response.blob();

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
            this.setState({ AddImage: myUrl }, () => {
                console.log(this.state.AddImage, 'dealersOverallTotal1');
            });

            console.log("ttttttttttthhhhhhhhhhhhhhhhhmmmmmmmmmmmmmnnnnnnaaaaaaillllll:  " + this.state.AddImage + "   "
                + "uuuuuuuuuuuuurrrrrrrrrrrrrrrrrrrrrrrlllllllllllll:  " + myUrl);
        }
    };



    _pickImageForBackground = async () => {
        await this.askPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images",
            allowsEditing: true,
            aspect: [4, 3],
            quality:0.5
        });

        console.log(result);

        if (!result.cancelled) {
            // this.setState({ image: result.uri });
            var user = firebase.auth().currentUser.uid;
            const myRef = firebase.database().ref();
            const Key = myRef.push();

            // const response = await fetch(result.uri);
            // const blob = await response.blob();

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
            this.setState({ UploadImageForbackground: myUrl }, () => {
                console.log(this.state.thumbnail, 'dealersOverallTotal1');
            });

            console.log("ttttttttttthhhhhhhhhhhhhhhhhmmmmmmmmmmmmmnnnnnnaaaaaaillllll:  " + this.state.thumbnail + "   "
                + "uuuuuuuuuuuuurrrrrrrrrrrrrrrrrrrrrrrlllllllllllll:  " + myUrl);
        }
    };
    SaveImageIntoDatabase = () => {

        setTimeout(() => {
            this.setState({ isLoading: false })
            if (this.state.UploadImageForbackground != null) {
                if (this.state.selectedImages == "Challenge") {
                    firebase.database().ref("BackgroundImages").child("Challenge").set({
                        Category: this.state.selectedImages,
                        Image: this.state.UploadImageForbackground
                    }).then((data) => {
                        //success callback
                        Alert.alert(
                            'Upload Successfully'
                        )
                    }).catch((error) => {
                        //error callback
                        Alert.alert(
                            'Upload Failed'
                        )
                    })
                } else if (this.state.selectedImages == "AbsAss") {
                    firebase.database().ref("BackgroundImages").child("AbsAss").set({
                        Category: this.state.selectedImages,
                        Image: this.state.UploadImageForbackground
                    }).then((data) => {
                        //success callback
                        Alert.alert(
                            'Upload Successfully'
                        )
                    }).catch((error) => {
                        //error callback
                        Alert.alert(
                            'Upload Failed'
                        )
                    })
                }
                else if (this.state.selectedImages == "GluteLeg") {
                    firebase.database().ref("BackgroundImages").child("GluteLeg").set({
                        Category: this.state.selectedImages,
                        Image: this.state.UploadImageForbackground
                    }).then((data) => {
                        //success callback
                        Alert.alert(
                            'Upload Successfully'
                        )
                    }).catch((error) => {
                        //error callback
                        Alert.alert(
                            'Upload Failed'
                        )
                    })
                }
                else if (this.state.selectedImages == "WeightLoss") {
                    firebase.database().ref("BackgroundImages").child("WeightLoss").set({
                        Category: this.state.selectedImages,
                        Image: this.state.UploadImageForbackground
                    }).then((data) => {
                        //success callback
                        Alert.alert(
                            'Upload Successfully'
                        )
                    }).catch((error) => {
                        //error callback
                        Alert.alert(
                            'Upload Failed'
                        )
                    })
                }
                else if (this.state.selectedImages == "ArmsAbs") {
                    firebase.database().ref("BackgroundImages").child("ArmsAbs").set({
                        Category: this.state.selectedImages,
                        Image: this.state.UploadImageForbackground
                    }).then((data) => {
                        //success callback
                        Alert.alert(
                            'Upload Successfully'
                        )
                    }).catch((error) => {
                        //error callback
                        Alert.alert(
                            'Upload Failed'
                        )
                    })
                }
                else if (this.state.selectedImages == "Progress") {
                    firebase.database().ref("BackgroundImages").child("Progress").set({
                        Category: this.state.selectedImages,
                        Image: this.state.UploadImageForbackground
                    }).then((data) => {
                        //success callback
                        Alert.alert(
                            'Upload Successfully'
                        )
                    }).catch((error) => {
                        //error callback
                        Alert.alert(
                            'Upload Failed'
                        )
                    })
                }
                else if (this.state.selectedImages == "Bodyparts") {
                    firebase.database().ref("BackgroundImages").child("Bodyparts").set({
                        Category: this.state.selectedImages,
                        Image: this.state.UploadImageForbackground
                    }).then((data) => {
                        //success callback
                        Alert.alert(
                            'Upload Successfully'
                        )
                    }).catch((error) => {
                        //error callback
                        Alert.alert(
                            'Upload Failed'
                        )
                    })
                }
                else if (this.state.selectedImages == "GymRoutine") {
                    firebase.database().ref("BackgroundImages").child("GymRoutine").set({
                        Category: this.state.selectedImages,
                        Image: this.state.UploadImageForbackground
                    }).then((data) => {
                        //success callback
                        Alert.alert(
                            'Upload Successfully'
                        )
                    }).catch((error) => {
                        //error callback
                        Alert.alert(
                            'Upload Failed'
                        )
                    })
                }
                else if (this.state.selectedImages == "HomeRoutine") {
                    firebase.database().ref("BackgroundImages").child("HomeRoutine").set({
                        Category: this.state.selectedImages,
                        Image: this.state.UploadImageForbackground
                    }).then((data) => {
                        //success callback
                        Alert.alert(
                            'Upload Successfully'
                        )
                    }).catch((error) => {
                        //error callback

                        Alert.alert(
                            'Upload Failed'
                        )
                    })
                }
            }
            else {
                Alert.alert("Please Fill Full The Form")
            }
        }, 8000, this.setState({ isLoading: true }));
    }

    UploadURL = () => {
        setTimeout(() => {
            this.setState({ isLoading: false })
            console.log("TTTTTEEEEXXXTTT" + this.state.text + "SELECTED1  " + this.state.selected1 + "SELECTED  " + this.state.selected +
                "title  " + this.state.title1 + "image  " + this.state.thumbnail)
            if (this.state.text != null && this.state.selected != undefined
                && this.state.AddImage != null && this.state.title1 != null
                && this.state.selected1 != undefined && this.state.thumbnail != null) {
                if (this.state.selected == "Balance") {
                    firebase.database().ref("Bodyparts").child("Balance").push({
                        Video: this.state.text,
                        Details: this.state.AddImage,
                        Category: this.state.selected,
                        Type: this.state.selected1,
                        Title: this.state.title1,
                        Thumbnail: this.state.thumbnail,
                    }).then((data) => {
                        //success callback
                        Alert.alert(
                            'Upload Successfully'
                        )
                    }).catch((error) => {
                        //error callback
                        Alert.alert(
                            'Upload Failed'
                        )
                    })
                }
                else if (this.state.selected == "Abs") {
                    firebase.database().ref("Bodyparts").child("Abs").push({
                        Video: this.state.text,
                        Details: this.state.AddImage,
                        Category: this.state.selected,
                        Type: this.state.selected1,
                        Title: this.state.title1,
                        Thumbnail: this.state.thumbnail,
                    }).then((data) => {
                        //success callback
                        Alert.alert(
                            'Upload Successfully'
                        )
                    }).catch((error) => {
                        //error callback
                        Alert.alert(
                            'Upload Failed'
                        )
                    })
                }
                else if (this.state.selected == "Stretch") {
                    firebase.database().ref("Bodyparts").child("Stretch").push({
                        Video: this.state.text,
                        Details: this.state.AddImage,
                        Category: this.state.selected,
                        Type: this.state.selected1,
                        Title: this.state.title1,
                        Thumbnail: this.state.thumbnail,
                    }).then((data) => {
                        //success callback
                        Alert.alert(
                            'Upload Successfully'
                        )
                    }).catch((error) => {
                        //error callback
                        Alert.alert(
                            'Upload Failed'
                        )
                    })
                }
                else if (this.state.selected == "Glutes") {
                    firebase.database().ref("Bodyparts").child("Glutes").push({
                        Video: this.state.text,
                        Details: this.state.AddImage,
                        Category: this.state.selected,
                        Type: this.state.selected1,
                        Title: this.state.title1,
                        Thumbnail: this.state.thumbnail,
                    }).then((data) => {
                        //success callback
                        Alert.alert(
                            'Upload Successfully'
                        )
                    }).catch((error) => {
                        //error callback
                        Alert.alert(
                            'Upload Failed'
                        )
                    })
                }
                else if (this.state.selected == "Lower Body") {
                    firebase.database().ref("Bodyparts").child("Lower Body").push({
                        Video: this.state.text,
                        Details: this.state.AddImage,
                        Category: this.state.selected,
                        Type: this.state.selected1,
                        Title: this.state.title1,
                        Thumbnail: this.state.thumbnail,
                    }).then((data) => {
                        //success callback
                        Alert.alert(
                            'Upload Successfully'
                        )
                    }).catch((error) => {
                        //error callback
                        Alert.alert(
                            'Upload Failed'
                        )
                    })
                }
                else if (this.state.selected == "Gain Total Body") {
                    firebase.database().ref("Bodyparts").child("Gain Total Body").push({
                        Video: this.state.text,
                        Details: this.state.AddImage,
                        Category: this.state.selected,
                        Type: this.state.selected1,
                        Title: this.state.title1,
                        Thumbnail: this.state.thumbnail,
                    }).then((data) => {
                        //success callback
                        Alert.alert(
                            'Upload Successfully'
                        )
                    }).catch((error) => {
                        //error callback
                        Alert.alert(
                            'Upload Failed'
                        )
                    })
                }
                else if (this.state.selected == "Upper Body") {
                    firebase.database().ref("Bodyparts").child("Upper Body").push({
                        Video: this.state.text,
                        Details: this.state.AddImage,
                        Category: this.state.selected,
                        Type: this.state.selected1,
                        Title: this.state.title1,
                        Thumbnail: this.state.thumbnail,
                    }).then((data) => {
                        //success callback
                        Alert.alert(
                            'Upload Successfully'
                        )
                    }).catch((error) => {
                        //error callback
                        Alert.alert(
                            'Upload Failed'
                        )
                    })
                }
                else if (this.state.selected == "Lean Total Body") {
                    firebase.database().ref("Bodyparts").child("Lean Total Body").push({
                        Video: this.state.text,
                        Details: this.state.AddImage,
                        Category: this.state.selected,
                        Type: this.state.selected1,
                        Title: this.state.title1,
                        Thumbnail: this.state.thumbnail,
                    }).then((data) => {
                        //success callback
                        Alert.alert(
                            'Upload Successfully'
                        )
                    }).catch((error) => {
                        //error callback
                        Alert.alert(
                            'Upload Failed'
                        )
                    })
                }
            }
            else {
                Alert.alert("Please Fill Full The Form")
            }
        }, 8000, this.setState({ isLoading: true }));

    };

    IncreseChallange = () => {
        firebase.database().ref("Challange").child(this.state.AddChallange).push()
    }

    UploadURL2 = () => {
        setTimeout(() => {
            this.setState({ isLoading: false })
            console.log("TTTTTEEEEXXXTTT" + this.state.text + "SELECTED1  " + this.state.selected1 + "SELECTED  " + this.state.selected +
                "title  " + this.state.title1 + "image  " + this.state.thumbnail)
            if (this.state.text != null && this.state.selected3 != undefined
                && this.state.AddImage != null && this.state.title1 != null
                && this.state.selected1 != undefined && this.state.thumbnail != null) {
                if (this.state.selected3 == "Dumbbells") {
                    firebase.database().ref("Equipment").child("Dumbbells").push({
                        Video: this.state.text,
                        Details: this.state.AddImage,
                        Category: this.state.selected3,
                        Type: this.state.selected1,
                        Title: this.state.title1,
                        Thumbnail: this.state.thumbnail,
                    }).then((data) => {
                        //success callback
                        Alert.alert(
                            'Upload Successfully'
                        )
                    }).catch((error) => {
                        //error callback
                        Alert.alert(
                            'Upload Failed'
                        )
                    })
                }
                else if (this.state.selected3 == "Barbell") {
                    firebase.database().ref("Equipment").child("Barbell").push({
                        Video: this.state.text,
                        Details: this.state.AddImage,
                        Category: this.state.selected3,
                        Type: this.state.selected1,
                        Title: this.state.title1,
                        Thumbnail: this.state.thumbnail,
                    }).then((data) => {
                        //success callback
                        Alert.alert(
                            'Upload Successfully'
                        )
                    }).catch((error) => {
                        //error callback
                        Alert.alert(
                            'Upload Failed'
                        )
                    })
                }
                else if (this.state.selected3 == "Kettlebells") {
                    firebase.database().ref("Equipment").child("Kettlebells").push({
                        Video: this.state.text,
                        Details: this.state.AddImage,
                        Category: this.state.selected3,
                        Type: this.state.selected1,
                        Title: this.state.title1,
                        Thumbnail: this.state.thumbnail,
                    }).then((data) => {
                        //success callback
                        Alert.alert(
                            'Upload Successfully'
                        )
                    }).catch((error) => {
                        //error callback
                        Alert.alert(
                            'Upload Failed'
                        )
                    })
                }
                else if (this.state.selected3 == "Step Bench") {
                    firebase.database().ref("Equipment").child("Step Bench").push({
                        Video: this.state.text,
                        Details: this.state.AddImage,
                        Category: this.state.selected3,
                        Type: this.state.selected1,
                        Title: this.state.title1,
                        Thumbnail: this.state.thumbnail,
                    }).then((data) => {
                        //success callback
                        Alert.alert(
                            'Upload Successfully'
                        )
                    }).catch((error) => {
                        //error callback
                        Alert.alert(
                            'Upload Failed'
                        )
                    })
                }
                else if (this.state.selected3 == "Cable Machine") {
                    firebase.database().ref("Equipment").child("Cable Machine").push({
                        Video: this.state.text,
                        Details: this.state.AddImage,
                        Category: this.state.selected3,
                        Type: this.state.selected1,
                        Title: this.state.title1,
                        Thumbnail: this.state.thumbnail,
                    }).then((data) => {
                        //success callback
                        Alert.alert(
                            'Upload Successfully'
                        )
                    }).catch((error) => {
                        //error callback
                        Alert.alert(
                            'Upload Failed'
                        )
                    })
                }
                else if (this.state.selected3 == "Medicine Ball") {
                    firebase.database().ref("Equipment").child("Medicine Ball").push({
                        Video: this.state.text,
                        Details: this.state.AddImage,
                        Category: this.state.selected3,
                        Type: this.state.selected1,
                        Title: this.state.title1,
                        Thumbnail: this.state.thumbnail,
                    }).then((data) => {
                        //success callback
                        Alert.alert(
                            'Upload Successfully'
                        )
                    }).catch((error) => {
                        //error callback
                        Alert.alert(
                            'Upload Failed'
                        )
                    })
                }

            }
            else {
                Alert.alert("Please Fill Full The Form")
            }
        }, 8000, this.setState({ isLoading: true }));
    };

    UploadURL3 = () => {
        setTimeout(() => {
            this.setState({ isLoading: false })
            console.log("TTTTTEEEEXXXTTT" + this.state.text + "SELECTED  " + this.state.selected1 +
                "title  " + this.state.title1 + "image  " + this.state.thumbnail)
            if (this.state.text != null && this.state.AddImage != null && this.state.title1 != null
                && this.state.selected1 != undefined && this.state.thumbnail != null) {
                firebase.database().ref("HomeWorkout").push({
                    Video: this.state.text,
                    Details: this.state.AddImage,
                    Type: this.state.selected1,
                    Title: this.state.title1,
                    Thumbnail: this.state.thumbnail,
                }).then((data) => {
                    //success callback
                    Alert.alert(
                        'Upload Successfully'
                    )
                }).catch((error) => {
                    //error callback
                    Alert.alert(
                        'Upload Failed'
                    )
                })
            }
            else {
                Alert.alert("Please Fill Full Form")
            }
        }, 8000, this.setState({ isLoading: true }));
    };


    UploadAbsDay = () => {
        setTimeout(() => {
            this.setState({ isLoading: false })
            console.log("TTTTTEEEEXXXTTT" + this.state.text + "SELECTED  " + this.state.selected4 +
                "title  " + this.state.title1 + "image  " + this.state.thumbnail)
            if (this.state.text != null && this.state.AddImage != null && this.state.title1 != null
                && this.state.selected4 != undefined && this.state.thumbnail != null) {
                firebase.database().ref("AbsAss").child(this.state.selected4).set({
                    Video: this.state.text,
                    Details: this.state.AddImage,
                    Type: this.state.selected4,
                    Title: this.state.title1,
                    Thumbnail: this.state.thumbnail,
                }).then((data) => {
                    //success callback
                    Alert.alert(
                        'Upload Successfully'
                    )
                }).catch((error) => {
                    //error callback
                    Alert.alert(
                        'Upload Failed'
                    )
                })
            }
            else {
                Alert.alert("Please Fill Full Form")
            }
        }, 8000, this.setState({ isLoading: true }));
    };

    UploadGluteLeg = () => {
        setTimeout(() => {
            this.setState({ isLoading: false })
            console.log("TTTTTEEEEXXXTTT" + this.state.text + "SELECTED  " + this.state.selected4 +
                "title  " + this.state.title1 + "image  " + this.state.thumbnail)
            if (this.state.text != null && this.state.AddImage != null && this.state.title1 != null
                && this.state.selected4 != undefined && this.state.thumbnail != null) {
                firebase.database().ref("GluteLeg").child(this.state.selected4).set({
                    Video: this.state.text,
                    Details: this.state.AddImage,
                    Type: this.state.selected4,
                    Title: this.state.title1,
                    Thumbnail: this.state.thumbnail,
                }).then((data) => {
                    //success callback
                    Alert.alert(
                        'Upload Successfully'
                    )
                }).catch((error) => {
                    //error callback
                    Alert.alert(
                        'Upload Failed'
                    )
                })
            }
            else {
                Alert.alert("Please Fill Full Form")
            }
        }, 8000, this.setState({ isLoading: true }));
    };

    MakePremiumUser = () => {
        const gym = this.state.PremiumEmail
        var that = this;
        console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm" + gym + this.state.PremiumEmail)
        firebase.database().ref('users').orderByChild("Email").equalTo(this.state.PremiumEmail).on('value', function (snapshot) {
            //snapshot would have list of NODES that satisfies the condition
            console.log(snapshot.val())
            console.log('-----------');
            var key = '';
            //go through each item found and print out the emails
            snapshot.forEach(function (childSnapshot) {

                key = childSnapshot.key;
                // Alert.alert(key)
                // var childData = childSnapshot.val();

                // var uid = childData.UID;

            });

            if (key != '') {

                firebase.database().ref('users/' + key).update({
                    payment: "yes",

                }).then((data) => {
                    //success callback
                    Alert.alert(
                        'Successfully'
                    )
                    this.setState({ PremiumEmail: '' });
                });
            }
            else {
                Alert.alert(
                    'Wrong Email!'
                )
            }



        });
    }

    MakeTrainer = () => {
        const gym = this.state.TrainerGym
        var that = this;
        console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm" + gym + this.state.TrainerGym)
        firebase.database().ref('users').orderByChild("Email").equalTo(this.state.TrainerEmail).on('value', function (snapshot) {
            //snapshot would have list of NODES that satisfies the condition
            console.log(snapshot.val())
            console.log('-----------');
            var key = '';
            //go through each item found and print out the emails
            snapshot.forEach(function (childSnapshot) {

                key = childSnapshot.key;
                // Alert.alert(key)
                // var childData = childSnapshot.val();

                // var uid = childData.UID;

            });

            if (key != '') {

                firebase.database().ref('users/' + key).update({
                    Trainer: "yes",
                    Gym: that.state.TrainerGym,
                    Rating: that.state.TrainerExperience,
                    TrainerProfile: that.state.thumbnail,
                    Moto: that.state.Moto,

                }).then((data) => {
                    //success callback
                    Alert.alert(
                        'Successfully'
                    )
                    this.setState({ TrainerEmail: '' });
                });
            }
            else {
                Alert.alert(
                    'Wrong Email!'
                )
            }



        });
    }

    UploadWeightLoss = () => {
        setTimeout(() => {
            this.setState({ isLoading: false })
            console.log("TTTTTEEEEXXXTTT" + this.state.text + "SELECTED  " + this.state.selected4 +
                "title  " + this.state.title1 + "image  " + this.state.thumbnail)
            if (this.state.text != null && this.state.AddImage != null && this.state.title1 != null
                && this.state.selected4 != undefined && this.state.thumbnail != null) {
                firebase.database().ref("WeightLoss").child(this.state.selected4).set({
                    Video: this.state.text,
                    Details: this.state.AddImage,
                    Type: this.state.selected4,
                    Title: this.state.title1,
                    Thumbnail: this.state.thumbnail,
                }).then((data) => {
                    //success callback
                    Alert.alert(
                        'Upload Successfully'
                    )
                }).catch((error) => {
                    //error callback
                    Alert.alert(
                        'Upload Failed'
                    )
                })
            }
            else {
                Alert.alert("Please Fill Full Form")
            }
        }, 8000, this.setState({ isLoading: true }));
    };

    UploadArmsAbs = () => {
        setTimeout(() => {
            this.setState({ isLoading: false })
            console.log("TTTTTEEEEXXXTTT" + this.state.text + "SELECTED  " + this.state.selected4 +
                "title  " + this.state.title1 + "image  " + this.state.thumbnail)
            if (this.state.text != null && this.state.AddImage != null && this.state.title1 != null
                && this.state.selected4 != undefined && this.state.thumbnail != null) {
                firebase.database().ref("ArmAbs").child(this.state.selected4).set({
                    Video: this.state.text,
                    Details: this.state.AddImage,
                    Type: this.state.selected4,
                    Title: this.state.title1,
                    Thumbnail: this.state.thumbnail,
                }).then((data) => {
                    //success callback
                    Alert.alert(
                        'Upload Successfully'
                    )
                }).catch((error) => {
                    //error callback
                    Alert.alert(
                        'Upload Failed'
                    )
                })
            }
            else {
                Alert.alert("Please Fill Full Form")
            }
        }, 8000, this.setState({ isLoading: true }));
    };
}