import React, { Component } from 'react';
import AppPreLoader from '../components/AppPreLoader';
import { View, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import {  CardItem, Item, Input, Text, List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
import * as firebase from 'firebase';
import Strings from '../utils/Strings';

import avatar from '../../assets/images/avatar.png';

var styles = require('../../assets/files/Styles');




export default class MeetUpChat extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${Strings.ST5}`,
    });

    constructor(props) {
        super(props);
        const { params } = props.navigation.state;
        this.state = {
            item: params.item,
            text: null,
            message: '',
            messages: [],
        };
    }




    componentDidMount() {

        const { item } = this.state;

        firebase.database().ref('MeetUp').child(item.Node).child("Message")
            .on("value", snapshot => {
                this.setState({ isLoading: false })
                const data = snapshot.val()
                if (snapshot.val()) {
                    const initMessages = [];
                    Object
                        .keys(data)
                        .forEach(message => initMessages.push(data[message]));
                    console.log("000000000000000000000000000000000" + initMessages);
                    this.setState({
                        messages: initMessages,

                    });
                    console.log("11111111111111111111111111111111111111111111111" + this.state.messages);
                }
            });


    }


    render() {

        const { item } = this.state;

        if (this.state.isLoading) {
            return (
                <AppPreLoader />
            );
        }

        const { params } = this.props.navigation.state;
        var user = firebase.auth().currentUser;



        return (

            <View>
                <ScrollView>

                    <FlatList
                        data={this.state.messages}
                        renderItem={
                            ({ item }) =>
                                // <Item>
                                //     <Left>
                                //         <Thumbnail source={avatar} />
                                //         <Body>
                                //             <Text note>{item.Message}</Text>
                                //         </Body>
                                //     </Left>
                                //     <Right>
                                //         <Text>{item.Name}</Text>
                                //     </Right>
                                // </Item>
                                <List>
                                    <ListItem avatar>
                                        <Left>
                                            <Thumbnail source={avatar} />
                                        </Left>
                                        <Body>
                                            <Text>{item.Name}</Text>
                                            <Text note>{item.Message}</Text>
                                        </Body>
                                        <Right>
                                            <Text note>{item.Date}</Text>
                                        </Right>
                                    </ListItem>
                                </List>

                        }
                    />
                    <CardItem>
                        <Item regular>
                            <Input placeholder='Message'
                                placeholderTextColor='#d1d5da'

                                onChangeText={(text) => this.setState({ text })}
                            />
                            <TouchableOpacity onPress={this.PushMessage}>
                                <Image
                                    style={styles.UploadImage}
                                    source={require('../../assets/images/send.png')}
                                />
                            </TouchableOpacity>
                        </Item>

                    </CardItem>
                </ScrollView>
            </View>

        );
    }

    PushMessage = async () => {
        this.setState({
            text: "Message"
        })
        var user = firebase.auth().currentUser.displayName;
        const { item } = this.state;

        firebase.database().ref('MeetUp').child(item.Node).child("Message").push({
            Name: user,
            Message: this.state.text,
            Date: new Date().toDateString(),
        })
            .then((data) => {
                this.setState({
                    text: "Message"
                })
            }).catch((error) => {

            })
    }




}