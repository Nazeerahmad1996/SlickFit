import React, { Component } from 'react';
import AppPreLoader from '../components/AppPreLoader';
import { View, TouchableOpacity, FlatList, ScrollView, Linking } from 'react-native';
import { Ionicons,FontAwesome } from '@expo/vector-icons';
import {  Text, List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
import * as firebase from 'firebase';
import Strings from '../utils/Strings';

export default class IntrestedList extends Component {
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
            Instagram:''
        };
    }




    componentDidMount() {

        const { item } = this.state;

        firebase.database().ref('MeetUp').child(item.Node).child("UserIntrested")
            .on("value", snapshot => {
                this.setState({ isLoading: false })
                const data = snapshot.val()
                if (snapshot.val()) {
                    const initMessages = [];
                    Object
                        .keys(data)
                        .forEach(message => initMessages.push(data[message]));
                    this.setState({
                        messages: initMessages,

                    });
                }
            });

        firebase.database().ref('MeetUp').child(item.Node).child("UserIntrested").once('value').then(function (snapshot) {
            var Phone = (snapshot.val() && snapshot.val().Phone);
            this.setState({Instagram:Phone});
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

        var url = 'https://www.instagram.com/'


        return (

            <View>
                <ScrollView>

                    <FlatList
                        data={this.state.messages}
                        renderItem={
                            ({ item }) =>
                                <View style={{ padding: 5 }}>
                                    {/* {url = 'https://www.linkedin.com/company/'+item.Phone} */}
                                    <List>
                                        <ListItem avatar>
                                            <Left>
                                                <Thumbnail source={{ uri: item.Image }} />
                                            </Left>
                                            <Body>
                                                <Text>{item.Name}</Text>
                                                <TouchableOpacity style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#9b7979', paddingRight: 3, paddingLeft: 3, paddingTop: 1, paddingBottom: 1, borderRadius: 5,justifyContent:'center',alignItems:'center',marginTop:7 }}
                                                    onPress={() => {
                                                        Linking.openURL(url+item.Phone).catch(err => console.error('An error occurred', err));
                                                    }}>
                                                    <FontAwesome name="instagram" size={22} color="#9b7979" />
                                                    {/* <Text note>{item.Phone}</Text> */}
                                                    <Text note style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>Instagram</Text>
                                                    <Ionicons name="ios-arrow-forward" size={20} color="#9b7979" />
                                                </TouchableOpacity>
                                            </Body>
                                            <Right>
                                                <Text note>{item.Date}</Text>
                                            </Right>
                                        </ListItem>
                                    </List>
                                </View>

                        }
                    />
                </ScrollView>
            </View>

        );
    }




}