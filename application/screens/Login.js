import React, { Component } from 'react';
var styles = require('../../assets/files/Styles');
import { Image, TouchableOpacity } from 'react-native';
import { Container, Body, Header, Left, Text, Title, Right, View, Button, Toast } from 'native-base';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppPreLoader from '../components/AppPreLoader';

import Strings from '../utils/Strings';

import t from 'tcomb-form-native';
import FormValidation from '../forms/Validation';

const Form = t.form.Form;

var _ = require('lodash');

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);


stylesheet.textbox.normal.color = '#808080';
stylesheet.textbox.normal.borderRadius = 50;
stylesheet.textbox.normal.borderColor = '#d1d5da';
stylesheet.textbox.normal.paddingLeft = 20;
stylesheet.textbox.normal.paddingRight = 20;
stylesheet.textbox.normal.height = 53;
stylesheet.textbox.normal.minWidth = 300;
stylesheet.textbox.normal.resizeMode = 'contain';

stylesheet.textbox.error.borderRadius = 50;
stylesheet.textbox.error.paddingLeft = 20;
stylesheet.textbox.error.paddingRight = 20;
stylesheet.textbox.error.height = 53;
stylesheet.textbox.error.minWidth = 300;
stylesheet.textbox.error.resizeMode = 'contain';
stylesheet.textbox.error.borderColor = '#d1d5da';

export default class Login extends Component {
	static navigationOptions = {
		header: null
	};

	constructor() {
		super();
		this.state = {
			isLoading: false,

		};
		this.user = t.struct({
			email: FormValidation.email,
			password: FormValidation.password,

		});

		this.options = {
			auto: 'placeholders',
			fields: {
				email: {
					error: '',
					autoCapitalize: 'none',
					placeholderTextColor: '#d1d5da',
					stylesheet: stylesheet
				},
				password: {
					error: '',
					password: true,
					secureTextEntry: true,
					placeholderTextColor: '#d1d5da',
					stylesheet: stylesheet
				}
			}
		};
	}
	login() {
		this.setState({ isLoading: true });
		const validate = this.refs.formId.getValue();
		if (validate) {
			firebase.auth().signInWithEmailAndPassword(validate.email, validate.password)
				.then(() => {
					this.setState({ isLoading: false });
				})
				.catch((error) => {
					this.setState({ isLoading: false });
					const errorCode = error.code;
					const errorMessage = error.message;
					if (errorCode === 'auth/wrong-password') {

						Toast.show({ text: `${Strings.ST30}`, position: 'bottom', buttonText: `${Strings.ST33}` })

					}
					else if (errorCode === 'auth/user-not-found') {

						Toast.show({ text: `${Strings.ST31}`, position: 'bottom', buttonText: `${Strings.ST33}` })

					}
					else {
						Toast.show({ text: `${Strings.ST32}`, position: 'bottom', buttonText: `${Strings.ST33}` })
					}

				});
		}else{
			this.setState({ isLoading: false });
		}

	}

	forgetpass() {
		const navigateAction = NavigationActions.navigate({
			routeName: 'ForgetPass'
		});
		this.props.navigation.dispatch(navigateAction);
	}

	render() {

		if (this.state.isLoading) {
			return (
				<AppPreLoader />
			);
		}

		return (
			<Container style={{ backgroundColor: '#fff' }}>
				<Header style={{ backgroundColor: '#fff', borderBottomWidth: 0, shadowOpacity: 0, elevation: 0, }}>
					<Left style={{ flex: 1 }}>
						<Button transparent>
							<Ionicons name='md-arrow-round-back' style={{ fontSize: 18 }} onPress={() => this.props.navigation.goBack()} />
						</Button>
					</Left>
					<Body style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
						<Title style={{ color: '#000000' }}>{Strings.ST26}</Title>
					</Body>
					<Right style={{ flex: 1 }} />
				</Header>
				<Body>
					<KeyboardAwareScrollView>
						<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
							<Image source={require('../../assets/images/logo_dark.png')} style={styles.logo_start} resizeMode="contain" />

							<Form
								ref="formId"
								type={this.user}
								options={this.options}
							/>

							<Button rounded block onPress={this.login.bind(this)} style={styles.button_auth}>
								<Text>{Strings.ST28}</Text>
							</Button>

							<TouchableOpacity onPress={this.forgetpass.bind(this)} style={styles.text_auth} activeOpacity={1}>
								<Text style={styles.text_auth}>{Strings.ST29}</Text>
							</TouchableOpacity>

						</View>
					</KeyboardAwareScrollView>
				</Body>
			</Container>
		);
	}
}