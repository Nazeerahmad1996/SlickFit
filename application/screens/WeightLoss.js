import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import AppPreLoader from '../components/AppPreLoader';
import { FlatList, ScrollView } from 'react-native';
import { Container, Text, Body, Right, List, Thumbnail, ListItem } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import * as firebase from 'firebase';
import Strings from '../utils/Strings';

var styles = require('../../assets/files/Styles');

export default class WeightLoss extends Component {
    static navigationOptions = {
        title: `${Strings.ST120}`
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            message: '',
            messages: [],
        };
    }

    componentDidMount() {

        firebase
            .database()
            .ref()
            .child('WeightLoss')
            .on("value", snapshot => {

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
        this.setState({ isLoading: false })



    }


    ExerciseDetails(item) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'ExerciseDetailsScreen',
            params: { item }
        });
        this.props.navigation.dispatch(navigateAction);
    }


    render() {

        if (this.state.isLoading) {
            return (
                <AppPreLoader />
            );
        }

        const { params } = this.props.navigation.state;

        return (

            <Container style={styles.background_general}>
                <ScrollView>
                    <List>

                        <FlatList
                            data={this.state.messages}
                            refreshing="false"
                            renderItem={({ item, index }) =>

                                <ListItem style={{ paddingLeft: 0, marginLeft: 0, backgroundColor: '#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1 }} onPress={() => this.ExerciseDetails(item)} >
                                    <Text note style={{ paddingRight: 3, paddingLeft: 10, }}>
                                        {index + 1}.
                                    </Text>
                                    <Thumbnail square size={80} source={{ uri: item.Thumbnail }} style={{ paddingLeft: 10, marginLeft: 10 }} />
                                    <Body style={{ paddingLeft: 0, marginLeft: 0 }}>
                                        <Text numberOfLines={1} style={{ fontSize: 14, marginBottom: 3 }}>
                                            Day {item.Type}
                                        </Text>
                                        <Text note>
                                            {item.Title}
                                        </Text>
                                    </Body>
                                    <Right>
                                        <Text note>
                                            <Ionicons name="ios-arrow-forward" style={styles.icon_menu} />                                        </Text>
                                    </Right>
                                </ListItem>

                            }
                            keyExtractor={(item, index) => index.toString()}
                            ListFooterComponent={this.renderFooter}


                        />

                    </List>

                </ScrollView>
               
            </Container>


        );
    }

}