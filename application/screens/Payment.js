import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Alert, Dimensions, Image, ScrollView, Platform } from 'react-native';
import { Container, Text,  View, Button, Grid, Row } from 'native-base';
import Strings from '../utils/Strings';
import * as RNIap from 'react-native-iap';
import AppPreLoader from '../components/AppPreLoader';





const itemSkus = Platform.select({
    ios: [
        'Get_SlickFit_Workout_Plans_Greats'
    ],
    android: [
        'Get_SlickFit_Workout_Plans_Greats'
    ]
});

var { width, height } = Dimensions.get('window');


export default class Register extends Component {
    static navigationOptions = {
        title: `${Strings.ST125}`,
    };
    constructor() {
        super();

        this.state = {
            isLoading: true,
            receipt: null,
            Date: null,
            Payment: "14.99$",
            premium: null,
        };
    }

    Payment = async () => {
        var userId = firebase.auth().currentUser.uid;
        RNIap.buyProduct('Diets_Worksout_NonConsumable').then(purchase => {
            this.setState({
                receipt: purchase.transactionReceipt
            });
            firebase.database().ref('users/' + userId).update({
                payment: "yes",
                Receipt: this.state.receipt,
                PaymentDate: new Date().toDateString(),
                PurchaseID: purchase.transactionId,
            });
            Alert.alert("Congratulation, Now you are Premimum user of slickfit.");
            // handle success of purchase product
        }).catch((error) => {
            Alert.alert(error.message);
        })
    }
    getPurchases = async () => {
        var userId = firebase.auth().currentUser.uid;
        try {
            const purchases = await RNIap.getAvailablePurchases();
            let restoredTitles = '';
            purchases.forEach(purchase => {
                if (purchase.productId == 'Diets_Worksout_NonConsumable') {
                    firebase.database().ref('users/' + userId).update({
                        payment: "yes",
                        Receipt: purchase.transactionReceipt,
                        PaymentDate: purchase.transactionDate,
                        PurchaseID: purchase.transactionId,
                    });
                    restoredTitles += 'Premium Version';
                    Alert.alert('Restore Successful', 'You successfully restored the following purchases: ' + restoredTitles);
                    var ID = purchase.transactionId;

                    firebase.database().ref('users').orderByChild("PurchaseID").equalTo(ID).on('value', function (snapshot) {
                        //snapshot would have list of NODES that satisfies the condition
                        var key = '';
                        //go through each item found and print out the emails
                        snapshot.forEach(function (childSnapshot) {

                            key = childSnapshot.key;
                            // Alert.alert(key)
                            // var childData = childSnapshot.val();

                            // var uid = childData.UID;

                        });

                        firebase.database().ref('users/' + key).update({
                            payment: "no",
                            Receipt: 'none',
                            PaymentDate: 'none',
                            PurchaseID: 'none',
                        });



                    });

                }
                else {
                    Alert.alert('No Previous Purchase Available!');
                }
            })

        } catch (err) {
            console.warn(err); // standardized err.code and err.message available
            Alert.alert(err.message);
        }
    }
    componentWillUnmount() {
        RNIap.endConnection();
    }

    async componentDidMount() {

        try {
            await RNIap.initConnection();
            const products = await RNIap.getProducts(itemSkus);

        } catch (err) {
            console.warn(">>>>>>>>>>>>>>>>>>>>>  " + err.message);
            Alert.alert(err.message);
        }
        var userId = firebase.auth().currentUser.uid;
        var pay;
        var date;
        var Receipt;
        await firebase.database().ref('users').child(userId).once('value').then(function (snapshot) {
            pay = (snapshot.val() && snapshot.val().payment);
            date = (snapshot.val() && snapshot.val().PaymentDate);
            Receipt = (snapshot.val() && snapshot.val().Receipt);
        });
        this.setState({ receipt: Receipt });
        this.setState({ Date: date });
        this.setState({ premium: pay });
        this.setState({ isLoading: false });
    }

    componentWillUnmount() {
        RNIap.endConnection();
    }


    render() {

        if (this.state.isLoading) {
            return (
                <AppPreLoader />
            );
        }

        return (
            <Container style={{ backgroundColor: '#fff' }}>
                <ScrollView>
                    <Grid>

                        <Row style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', padding: 30, paddingBottom: 0 }}>
                            <Image
                                source={require('../../assets/images/logo_dark.png')}
                                style={{ width: 130, height: 130 }}
                                resizeMode='contain' />

                            {this.state.premium == 'yes' ? (
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ margin: 10, marginBottom: 5, fontSize: 12, fontWeight: 'bold', textAlign: 'center', color: '#888888' }}>
                                            {this.state.Payment}
                                        </Text>
                                        <Text style={{ margin: 10, marginBottom: 5, fontSize: 12, fontWeight: 'bold', textAlign: 'center', color: '#888888' }}>
                                            {this.state.Date}
                                        </Text>
                                        <Text style={{ margin: 10, marginBottom: 5, fontSize: 12, fontWeight: 'bold', textAlign: 'center', color: '#888888' }}>
                                            Premium User
                                </Text>
                                    </View>

                                    <Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 18, fontWeight: 'bold' }}>
                                        Premium User
                            </Text>

                                    <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
                                        Congratulations, You are a premium user now. You can see the Workout Tab Now to Access latest videos and fitness tips.
                                    </Text>


                                </View>
                            ) : (
                                    null
                                )}
                        </Row>



                    </Grid>
                    {this.state.premium != 'yes' ? (
                        <View>
                            <Button block info
                                onPress={this.Payment}
                            >
                                <Text>{Strings.ST125}</Text>
                            </Button>

                            <Button block danger style={{ marginTop: 10 }}
                                onPress={this.getPurchases}
                            >
                                <Text>Restore Purchase</Text>
                            </Button>
                        </View>
                    ) : (
                            null
                        )}
                </ScrollView>
            </Container>
        )
    }

}