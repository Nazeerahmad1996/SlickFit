import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ImageBackground, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Grid, Row } from 'react-native-easy-grid';
import { Container, Text } from 'native-base';
import * as firebase from 'firebase';

import Strings from '../utils/Strings';

var styles = require('../../assets/files/Styles');

export default class Challenge extends Component {
    static navigationOptions = {
        title: `${Strings.ST116}`
    };

    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    constructor(props) {

        super(props);

        this.state = {
            AbsAndAssImage: null,
            GluteImage: null,
            WeightLossImage: null,
            ArmsAbsImage: null,
        }

    }

    async componentDidMount() {

        that = this;

        await firebase.database().ref('BackgroundImages').child('AbsAss').once('value').then(function (snapshot) {
            imagehome = (snapshot.val() && snapshot.val().Image);
            that.setState({
                AbsAndAssImage: imagehome
            });
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:  " + imagehome)
        });
        await firebase.database().ref('BackgroundImages').child('GluteLeg').once('value').then(function (snapshot) {
            imagehome = (snapshot.val() && snapshot.val().Image);
            that.setState({
                GluteImage: imagehome
            });
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:  " + imagehome)
        });
        await firebase.database().ref('BackgroundImages').child('WeightLoss').once('value').then(function (snapshot) {
            imagehome = (snapshot.val() && snapshot.val().Image);
            that.setState({
                WeightLossImage: imagehome
            });
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:  " + imagehome)
        });
        await firebase.database().ref('BackgroundImages').child('ArmsAbs').once('value').then(function (snapshot) {
            imagehome = (snapshot.val() && snapshot.val().Image);
            that.setState({
                ArmsAbsImage: imagehome
            });
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:  " + imagehome)
        });

    }
    render() {

        return (

            <Container style={styles.background_general}>
                <Grid>

                    <Row onPress={this.navigateToScreen('AbsAss')} activeOpacity={1}>
                        <ImageBackground source={{ uri: this.state.AbsAndAssImage }} style={styles.card_general}>
                            <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']} style={styles.gradient_general}>
                                <Text style={styles.title_general}>{Strings.ST118}</Text>
                            </LinearGradient>
                        </ImageBackground>
                    </Row>

                    <Row onPress={this.navigateToScreen('GluteLeg')} activeOpacity={1}>

                        <ImageBackground source={{ uri: this.state.GluteImage }} style={styles.card_general}>
                            <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']} style={styles.gradient_general}>
                                <Text style={styles.title_general}>{Strings.ST119}</Text>
                            </LinearGradient>
                        </ImageBackground>
                    </Row>
                    <Row onPress={this.navigateToScreen('WeightLoss')} activeOpacity={1}>

                        <ImageBackground source={{ uri: this.state.WeightLossImage }} style={styles.card_general}>
                            <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']} style={styles.gradient_general}>
                                <Text style={styles.title_general}>{Strings.ST120}</Text>
                            </LinearGradient>
                        </ImageBackground>
                    </Row>

                    <Row onPress={this.navigateToScreen('ArmsAbs')} activeOpacity={1}>

                        <ImageBackground source={{ uri: this.state.ArmsAbsImage }} style={styles.card_general}>
                            <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']} style={styles.gradient_general}>
                                <Text style={styles.title_general}>{Strings.ST121}</Text>
                            </LinearGradient>
                        </ImageBackground>
                    </Row>

                </Grid>
            </Container>

        );
    }

}