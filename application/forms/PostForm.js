import React, { Component } from 'react';
import { options, Comment } from './Comment';
import t from 'tcomb-form-native';
const Form = t.form.Form;
import { View } from "react-native";
import { Button, Text } from 'native-base';
import * as firebase from 'firebase';

var styles = require('../../assets/files/Styles');
var ImageAvatar;
export default class PostForm extends Component {
	constructor() {
		super();
		var uid = firebase.auth().currentUser.uid;
		firebase.database().ref('users').child(uid).once('value').then(function (snapshot) {
			ImageAvatar = (snapshot.val() && snapshot.val().Image);
			console.log(ImageAvatar)
		});
		var user = firebase.auth().currentUser;
		this.state = {
			comment: {
				comment: '',
				rating: 1,
				user: user.displayName,
				Profile: ImageAvatar
			}
		};
	}

	addComment = async () => {
		var ExpoToken = '';
		var user = firebase.auth().currentUser;
		var userName = firebase.auth().currentUser.displayName;
		const validate = this.refs.form.getValue();

		if (validate) {
			// var ImageAvatar;
			// var uid = firebase.auth().currentUser.uid;
			// firebase.database().ref('users').child(uid).once('value').then(function (snapshot) {
			// 	ImageAvatar = (snapshot.val() && snapshot.val().Image);
			// 	console.log(ImageAvatar)
			// });
			console.log('Image -------------------- '+ ImageAvatar)
			await firebase.database().ref('users').child(this.props.item.User).once('value').then(function (snapshot) {
				ExpoToken = (snapshot.val() && snapshot.val().expoToken);
			});
			let data = {};
			let comment = Object.assign({}, validate);
			let ref = firebase.database().ref().child('postComments');
			const key = ref.push().key;

			data[`${this.props.postId}/${key}`] = comment;

			ref.update(data).then(() => {
				this.setState((prevState, props) => {
					return {
						comment: {
							comment: '',
							rating: 1,
							user: user.displayName,
							Profile: ImageAvatar
						}
					}
				});
			})
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
					body: userName + ' Commented on your blog!'
				})
			});
		}else{
			console.log('Not validate')
		}
	}

	onChange(comment) {
		this.setState({ comment });
	}

	render() {
		const { comment } = this.state;
		return (
			<View>
				<Form
					ref="form"
					type={Comment}
					options={options}
					value={comment}
					onChange={(v) => this.onChange(v)}
				/>
				<Button block onPress={this.addComment.bind(this)} style={styles.postCommentButton}>
					<Text style={styles.postCommentText}>Submit</Text>
				</Button>

			</View>


		)
	}
}