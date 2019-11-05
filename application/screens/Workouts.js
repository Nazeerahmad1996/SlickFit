import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Grid, Row } from 'react-native-easy-grid';
import { Container, Text } from 'native-base';
import * as firebase from 'firebase';

import Strings from '../utils/Strings';


var styles = require('../../assets/files/Styles');

export default class Workouts extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${Strings.ST1}`,
        headerRight: <Ionicons name="md-search" style={{ marginRight: 20 }} size={27} color="white" onPress={() => navigation.navigate('WorkoutSearchScreen')} />

    });

    constructor(props) {

        super(props);

        this.state = {
            ProgressImage: null,
        }

    }



    async componentDidMount() {
        var imageProgress;
        var that = this;
        await firebase.database().ref('BackgroundImages').child('Progress').once('value').then(function (snapshot) {
            imageProgress = (snapshot.val() && snapshot.val().Image);
            that.setState({
                ProgressImage: imageProgress
            });
        });
    }


    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {

        return (

            <Container style={styles.background_general}>
                <Grid>
                    <Row onPress={this.navigateToScreen('Progress')} activeOpacity={1}>

                        <ImageBackground source={{ uri: this.state.ProgressImage }} style={styles.card_general}>
                            <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']} style={styles.gradient_general}>
                                <Text style={styles.title_general}>{Strings.ST104}</Text>
                                <Text style={styles.subtitle_general}>{Strings.ST105}</Text>
                            </LinearGradient>
                        </ImageBackground>
                    </Row>

                </Grid>
            </Container>

        );
    }
}
