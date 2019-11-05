import React, { Component } from 'react';
var styles = require('../../assets/files/Styles');
import { Alert, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Body, Header, Input, Item, Left, Text, Title, Right, View, Button, Toast, Thumbnail } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppPreLoader from '../components/AppPreLoader';
// import * as MailComposer from 'expo-mail-composer';
import Strings from '../utils/Strings';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import t from 'tcomb-form-native';
const Form = t.form.Form;
import FormValidation from '../forms/Validation';

import * as firebase from 'firebase';
import * as ImageManipulator from 'expo-image-manipulator';

var _ = require('lodash');

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

var width = Dimensions.get('window').width;

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

export default class Register extends Component {
	static navigationOptions = {
		header: null
	};
	constructor() {
		super();

		this.state = {
			isLoading: false,
			user: {},
			Name: null,
			Email: null,
			Image: null,
			phoneno: null,
			Agreement: false,
			image: null,


		};

		this.samePassword = t.refinement(t.String, (s) => {
			return s === this.state.user.password
		});

		this.user = t.struct({
			name: t.String,
			email: FormValidation.email,
			password: FormValidation.password,
			confirm_password: this.samePassword,
		});

		this.options = {
			auto: 'placeholders',
			fields: {
				name: {
					placeholderTextColor: '#d1d5da',
					stylesheet: stylesheet
				},
				email: {
					autoCapitalize: 'none',
					placeholderTextColor: '#d1d5da',
					stylesheet: stylesheet
				},

				password: {
					password: true,
					secureTextEntry: true,
					placeholderTextColor: '#d1d5da',
					stylesheet: stylesheet
				},
				confirm_password: {
					password: true,
					secureTextEntry: true,
					placeholderTextColor: '#d1d5da',
					stylesheet: stylesheet
				}
			}
		};

		this.validate = null;
	}

	navigateToScreen = (route) => () => {
		const navigateAction = NavigationActions.navigate({
			routeName: route,
		});
		this.props.navigation.dispatch(navigateAction);
	}


	register() {
		this.setState({ isLoading: true });
		const validate = this.refs.form.getValue();
		setTimeout(() => {
			if (this.validate && this.state.Image != null) {
				const errorHandler = ((e) => {
					this.setState({ isLoading: false });
					console.log(e);
					if (e.code == 'auth/email-already-in-use') {
						Toast.show({ text: `${Strings.ST36}`, position: 'bottom', buttonText: `${Strings.ST33}` })

					} else {
						Toast.show({ text: `${Strings.ST32}`, position: 'bottom', buttonText: `${Strings.ST33}` })
					}

				})
				firebase.auth().createUserWithEmailAndPassword(validate.email, validate.password).then((response) => {

					var userId = firebase.auth().currentUser.uid

					firebase.database().ref('users/' + userId).set({

						Name: validate.name,
						Email: validate.email.trim(),
						Image: this.state.Image,
						Phone: this.state.phoneno,
						payment: "no",
					});

					firebase.auth().currentUser.updateProfile({
						displayName: validate.name,
						ProfileImage: this.state.Image,
						Phone: this.state.phoneno,
					}).then(() => {
						this.setState({ isLoading: false });
					}).catch(errorHandler);

				}).catch(errorHandler)
			} else if (this.state.Image == null) {
				Alert.alert("Please Select Image!")
				this.setState({ isLoading: false });
			}
			else {
				this.setState({ isLoading: false });
				Alert.alert("Please Fill Form Complete!")
			}
		}, 4500);
	}

	onChange(user) {
		this.setState({ user });
		if (user.confirm_password !== null && user.confirm_password !== "") {
			this.validate = this.refs.form.getValue();
		}
	}

	render() {

		if (this.state.isLoading) {
			return (
				<AppPreLoader />
			);
		}

		if (this.state.Agreement == false) {
			return (
				<ScrollView>
					<View style={{ flex: 0.8, padding: 20 }} >
						<View style={{ flex: 0.8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
							<Image source={require('../../assets/images/logo_dark.png')} style={styles.logo_start} resizeMode="contain" />
						</View>
						<Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
							Terms of Use
						</Text>
						<Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
							SLICK FITNESS, LLC (“SlickFit,” “we,” “us,” or “our”) welcomes you. We invite you to access and use our online services (the “Services”), which are made available to you through a variety of platforms, including https://www.slickfitness.org (the “Website”) and through our mobile app, which is accessible through tablets, cell phones, personal digital assistants, connected televisions, and other devices (the “App”). The Website and the App are collectively referred to as the “Platform.”
							We provide access to our Platform to Visitors and Registered Users subject to the following Terms of Use, which may be updated by us from time to time without notice to you. By browsing the public areas or by accessing and using the Platform, you acknowledge that you have read, understood, and agree to be legally bound by the terms and conditions of these Terms of Use and the terms and conditions of our Privacy Policy, which is hereby incorporated by reference (collectively, this “Agreement”). If you do not agree to any of these terms, then please do not use the Platform.
							We provide Trainers access to our Platform subject to our Marketing and Sales Agreement.
							We don't tolerate objectionable content or abusive users. Therefore we have made this Terms of Use so you can read more about it.
							Capitalized terms not defined in these Terms of Use shall have the meaning set forth in our Privacy Policy.
						</Text>
						<Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
							Description of Services
						</Text>
						<Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
							SlickFit is the premiere online social fitness network (By Slick Fitness LLC) that enables Registered Users to improve their fitness through gamification, community interaction, and online coaching.
							We provide Registered Users with access to the Platform as described in this Agreement.
							Registered Users. Login is required for all Registered Users. Registered Users can do all the things (a) post his/her own fitness goal images, (b) review others fitness goal images, (c)  find partner to train together, (d) find trainers and other content (“User Content”).
							We are under no obligation to accept any individual as a Registered User, and may accept or reject any Registered User in our sole and complete discretion.
						</Text>
						<Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
							Restrictions
						</Text>
						<Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
							The Platform is available for individuals 18 years or older. If you are under 18, please do not use the Platform. By accessing and using the Platform, you represent and warrant that you are at least 18.
						</Text>
						<Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
							Disclaimer
						</Text>
						<Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
							YOU SHOULD CONSULT YOUR PHYSICIAN BEFORE STARTING ANY EXERCISE PROGRAM. THIS IS PARTICULARLY TRUE IF ANY OF THE FOLLOWING APPLY TO YOU:
							CHEST PAIN OR PAIN IN THE NECK AND/OR ARM;
							SHORTNESS OF BREATH;
							DIAGNOSED HEART CONDITION;
							JOINT AND/OR BONE PROBLEMS;
							IF YOU’RE TAKING ANY MEDICATIONS, ESPECIALLY CARDIAC AND/OR BLOOD PRESSURE MEDICATIONS;
							HAVE NOT PREVIOUSLY BEEN PHYSICALLY ACTIVE; OR
							DIZZINESS
							IF NONE OF THESE APPLY TO YOU, YOU SHOULD NONETHELESS START ANY EXERCISE PROGRAM GRADUALLY AND SENSIBLY. IF YOU FEEL ANY OF THE PHYSICAL SYMPTOMS LISTED ABOVE WHEN YOU START YOUR EXERCISE PROGRAM, YOU SHOULD CONTACT YOUR PHYSICIAN IMMEDIATELY.
							THE INFORMATION AND MATERIALS CONTAINED ON THE PLATFORM ARE PROVIDED FOR EDUCATIONAL AND INFORMATIONAL PURPOSES ONLY. SlickFit AND THE TRAINERS ON OUR PLATFORM ARE NOT ENGAGED IN RENDERING MEDICAL ADVICE OR RECOMMENDATIONS. THIS SITE IS NOT A SUBSTITUTE FOR PROFESSIONAL MEDICAL ADVICE AND TREATMENT OR YOUR CONSULTATION WITH QUALIFIED PHYSICIANS AND OTHER HEALTH CARE PROFESSIONALS REGARDING YOUR INDIVIDUAL HEALTH NEEDS.
						</Text>
						<Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
							Waiver and Release
						</Text>
						<Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
							Please be advised that:
							We make no attempt to confirm, and do not confirm, any Trainer’s or Registered User’s purported identity. You are solely responsible for determining the identity and suitability of other people whom you may contact by means of the Platform.
							We make no representations, offer no assurances, and do not investigate any of our Trainer’s or Registered Users’ backgrounds, morality, character, actions, or demeanor, and you hereby acknowledge that you assume the risk of any encounter or interaction with such persons. We encourage all users to communicate directly with other users through the tools available on the Platform and to review their profile pages for feedback from other Registered Users.
							Although we reserve the right to do so, we typically do not verify information that Trainers or Registered Users submit to the Platform.
							As stated in greater detail below, we make no, and hereby disclaim all, representations, warranties, claims, and assurances as to any content posted by Trainers and Registered Users.
							TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, YOU, ON BEHALF OF YOURSELF AND YOUR HEIRS, NEXT OF KIN, SPOUSE, GUARDIANS, LEGAL REPRESENTATIVES, AGENTS, EXECUTORS, ADMINISTRATORS, SUCCESSORS, AND ASSIGNS (COLLECTIVELY, THE “RELEASING PARTIES”), AGREE THAT SUCH RELEASING PARTIES SHALL NOT HAVE ANY RIGHT OR CAUSE OF ACTION, AND HEREBY FULLY, FINALLY, AND FOREVER RELEASE, INDEMNIFY, DISCHARGE, AND ACQUIT SlickFit AND ITS PAST, CURRENT, AND FUTURE MEMBERS, SHAREHOLDERS, EMPLOYEES, OFFICERS, DIRECTORS, SUBSIDIARIES, PARENT ENTITIES, TRAINERS ON OUR PLATFORM, ATTORNEYS, PRINCIPALS, TRUSTEES, REPRESENTATIVES, AGENTS, PARTNERS, AFFILIATES, PREDECESSORS, SUCCESSORS, OPERATING PARTNERSHIPS, GENERAL PARTNERS, INSURERS, REINSURERS, AND ASSIGNS FROM ANY AND ALL CLAIMS, SUITS, OBLIGATIONS, COSTS, DAMAGES, LOSSES, CLAIMS FOR SUMS OF MONEY, CONTRACTS, CONTROVERSIES, AGREEMENTS, JUDGMENTS, AND DEMANDS WHATSOEVER, RIGHTS, LIABILITIES, ACTIONS, AND CAUSES OF ACTION OF ANY NATURE, KNOWN OR UNKNOWN, SUSPECTED OR UNSUSPECTED, AT LAW OR IN EQUITY, FIXED OR CONTINGENT, WHICH SUCH RELEASING PARTIES NOW HAVE OR MAY CLAIM TO HAVE IN THE FUTURE (COLLECTIVELY, “CLAIMS”) ARISING OUT OF, BASED UPON, ATTRIBUTABLE TO, OR IN CONNECTION WITH YOUR INTERACTION WITH TRAINERS AND OTHER REGISTERED USERS, ANY CONTENT (INCLUDING TRAINING VIDEOS) POSTED BY TRAINERS AND/OR OTHER REGISTERED USERS, AND ANY EXERCISE PROGRAM YOU MAY LEARN ABOUT OR EMBARK ON VIA THE PLATFORM.
							YOU HEREBY ACKNOWLEDGE AND AGREE THAT BY INTERACTING WITH A TRAINER ON OUR PLATFORM, YOU HAVE CAREFULLY READ THE FOREGOING RELEASE AND INDEMNIFICATION CLAUSE AND UNDERSTAND THE CONTENTS THEREOF. YOU ACKNOWLEDGE AND ARE MADE FULLY AWARE THAT NEITHER SlickFit NOR THE TRAINERS ON OUR PLATFORM ARE MEDICAL DOCTORS, CERTIFIED PERSONAL TRAINERS, LICENSED NUTRITIONISTS, OR REGISTERED DIETICIANS AND THAT SlickFit AND THE TRAINERS ON OUR PLATFORM ARE ONLY PROVIDING RECOMMENDATIONS TO YOU. YOU ACKNOWLEDGE BEFORE BEGINNING, IMPLEMENTING, OR USING ANY AND ALL OF RECOMMENDATIONS PROVIDED, THAT YOU SHOULD CONSULT A MEDICAL DOCTOR.
							YOU HEREBY ACKNOWLEDGE AND AGREE THAT IT IS THE INTENTION OF THE PARTIES THAT THE FOREGOING RELEASE AND DISCHARGE SHALL BE EFFECTIVE AS A BAR TO ALL CLAIMS OF WHATEVER CHARACTER, NATURE, AND KIND, KNOWN OR UNKNOWN, SUSPECTED OR UNSUSPECTED, HEREINABOVE SPECIFIED TO BE SO BARRED. IN FURTHERANCE OF THIS INTENTION, THE RELEASING PARTIES EXPRESSLY WAIVE ANY AND ALL RIGHTS AND BENEFITS CONFERRED UPON THEM BY THE PROVISIONS OF SECTION 1542 OF THE CALIFORNIA CIVIL CODE, WHICH STATES AS FOLLOWS:
							"A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS WHICH THE CREDITOR DOES NOT KNOW OR SUSPECT TO EXIST IN HIS FAVOR AT THE TIME OF EXECUTING THE RELEASE, WHICH IF KNOWN BY HIM MUST HAVE MATERIALLY AFFECTED HIS SETTLEMENT WITH THE DEBTOR."
						</Text>
						<Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
							Community Guidelines
						</Text>
						<Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
							Our community, like any community, functions best when its people follow a few simple rules. By accessing and/or using the Platform, you hereby agree to comply with these community guidelines (the “Community Guidelines”) and that:
							You will not use the Platform for any unlawful purpose;
							You will not post or send us false or misleading information;
							You will not use the Platform to engage in any commercial activities, including, without limitation, raising money; advertising or promoting a product, service, or company; or engaging in any pyramid or other multi-tiered marketing scheme;
							You will not access or use the Platform to collect any market research for a competing business;
							You will not upload, post, e-mail, transmit, or otherwise make available any User Content that: infringes any copyright, trademark, right of publicity, or other proprietary or contractual rights of any person or entity; or is threatening, tortious, defamatory, libelous, indecent, obscene, pornographic, invasive of another’s privacy, or promotes violence; or discloses any sensitive information about another person, including that person’s e-mail address, postal address, phone number, or any similar information;
							You will not “stalk” or otherwise harass another;
							You will not impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity;
							You will not cover, obscure, block, or in any way interfere with any advertisements and/or safety features (e.g., report abuse button) on the Platform;
							You will not take any action that imposes or may impose (in our sole discretion) an unreasonable or disproportionately large load on our technical infrastructure;
							You will not use automated means, including spiders, robots, crawlers, data mining tools, or the like to download or scrape data from the Platform, except for Internet search engines (e.g., Google) and non-commercial public archives (e.g., archive.org) that comply with our robots.txt file;
							You will not use any automated device or software that enables the submission of automatic postings on the Platform without human intervention or authorship, including, without limitation, the use of any such automated posting device in connection with bulk postings or for automatic submission of postings at certain times or intervals; and
							You will not interfere with or attempt to interrupt the proper operation of the Platform through the use of any virus, device, information collection or transmission mechanism, software or routine, or access or attempt to gain access to any data, files, or passwords related to the Platform through hacking, password or data mining, or any other means.
							Please let us know about inappropriate content. If you find something that violates our Community Guidelines, let us know, and we’ll review it. We reserve the right, in our sole and absolute discretion, to deny you access to the Platform, or any portion of the Platform, without notice and remove any User Content that does not adhere to these guidelines.
						</Text>
						<Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
							Sign-in Name; Email; Password; Phone;
						</Text>
						<Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
							During the registration process for Registered Users, if you do not sign in via one of your social media accounts, we will ask you to create an account, which includes a name (“Name”), a password (“Password”), a instagram username. Which is optional, an email (“Email”) and perhaps certain additional information that will assist in authenticating your identity when you log-in in the future (“Unique Identifiers”). When creating your account, you must provide true, accurate, current, and complete information. Each Sign-In Name and corresponding Password can be used by only one Registered User. You are solely responsible for the confidentiality and use of your Sign-In Name, Password, and Unique Identifiers, as well as for any use, misuse, or communications entered through the Platform using one or more of them. You will promptly inform us of any need to deactivate a Password or email, or change any Unique Identifier. We reserve the right to delete or change your Password, Email, or Unique Identifier at any time and for any reason. SlickFit will not be liable for any loss or damage caused by any unauthorized use of your account.
						</Text>
						<Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
							Intellectual Property
						</Text>
						<Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
							The Platform contains material, such as data, software, text, graphics, images, sound recordings, audiovisual works, and other material provided by or on behalf of SlickFit (collectively referred to as the “Content”). The Content may be owned by us or by third parties. The Content is protected under both United States and foreign laws. Unauthorized use of the Content may violate copyright, trademark, and other laws. You have no rights in or to the Content, and you will not use the Content except as permitted under this Agreement. No other use is permitted without prior written consent from us. You must retain all copyright and other proprietary notices contained in the original Content on any copy you make of the Content. You may not sell, transfer, assign, license, sublicense, or modify the Content or reproduce, display, publicly perform, make a derivative version of, distribute, or otherwise use the Content in any way for any public or commercial purpose. The use or posting of the Content on any other website or in a networked computer environment for any purpose is expressly prohibited.
							If you violate any part of this Agreement, your permission to access and/or use the Content, the Platform, and our Services automatically es and you must immediately destroy any copies you have made of the Content.
							The trademarks, service marks, and logos of SlickFit (“SlickFit Trademarks”) used and displayed on the Platform are registered and unregistered trademarks or service marks of SlickFit. Other company, product, and service names located on the Platform may be trademarks or service marks owned by others (the “Third-Party Trademarks,” and, collectively with the SlickFit Trademarks, the “Trademarks”). Nothing on the Platform should be construed as granting, by implication, estoppel, or otherwise, any license or right to use the Trademarks, without our prior written permission specific for each such use. Use of the Trademarks as part of a link to or from any site is prohibited unless establishment of such a link is approved in advance by us in writing. All goodwill generated from the use of the SlickFit Trademarks inures to our benefit.
							Elements of the Platform are protected by trade dress, trademark, unfair competition, and other state and federal laws and may not be copied or imitated, in whole or in part, by any means, including but not limited to the use of framing or mirrors. None of the Content may be retransmitted without our express, written consent for each and every instance.
						</Text>
						<Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
							Communications to us; User submissions; and Publicity
						</Text>
						<Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
							Although we encourage you to e-mail us, we do not want you to, and you should not, e-mail us any content that contains confidential information. With respect to all e-mails you send to us, including but not limited to, feedback, questions, comments, suggestions, and the like, we shall be free to use any ideas, concepts, know-how, or techniques contained in your communications for any purpose whatsoever, including, but not limited to, the development, production and marketing of products and services that incorporate such information, without compensation to you.
							As noted above, the Platform provides Users the ability to post and upload User Content. You expressly acknowledge and agree that once you submit your User Content, it will be accessible by others and that there is no confidentiality or privacy with respect to such User Content, including, without limitation, any personally identifying information that you may make publicly available. YOU, AND NOT SlickFit, ARE ENTIRELY RESPONSIBLE FOR ALL THE USER CONTENT THAT YOU UPLOAD, POST, E-MAIL, OR OTHERWISE TRANSMIT VIA THE PLATFORM.
							You retain all copyrights and other intellectual property rights in and to your own User Content. You do, however, hereby irrevocably grant us and our sublicensees and assignees a non-exclusive, transferable, perpetual, royalty-free, freely sublicensable (through multiple tiers) license to modify, compile, combine with other content, copy, record, synchronize, transmit, translate, format, distribute, publicly display, publicly perform, and otherwise use or exploit (including for profit) any and all of your User Content, your Sign-In Name, your profile picture, and all intellectual property and moral rights therein throughout the universe, in each case, by or in any means, methods, media, or technology now known or hereafter devised. Without limiting the foregoing, you acknowledge and agree that uses of your User Content, Name, and profile picture permitted by the foregoing rights and licenses may include their display adjacent to advertising and other material or content, including for profit.
							If you submit User Content to us, each such submission constitutes a representation and warranty that such User Content is your original creation (or that you otherwise have the right to provide the User Content), that you have the rights necessary to grant the license to the User Content under this Section, and that it and its use by SlickFit and its content partners as permitted by this Agreement does not and will not infringe or misappropriate the intellectual property or moral rights of any person or contain any libelous, defamatory, or obscene material or content that violates our Community Guidelines.
						</Text>
						<Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
							No Warranties; Limitation   of Liability
						</Text>
						<Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
							THE PLATFORM, THE CONTENT, AND THE SERVICES ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS WITHOUT ANY WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE WARRANTY OF TITLE, MERCHANTABILITY, NON-INFRINGEMENT OF THIRD PARTIES’ RIGHTS, AND FITNESS FOR PARTICULAR PURPOSE.
							IN NO EVENT SHALL WE BE LIABLE FOR ANY DAMAGES WHATSOEVER (INCLUDING, WITHOUT LIMITATION, INCIDENTAL AND CONSEQUENTIAL DAMAGES, LOST PROFITS, OR DAMAGES RESULTING FROM LOST DATA OR BUSINESS INTERRUPTION) RESULTING FROM THE USE OR INABILITY TO USE THE PLATFORM, THE CONTENT, OR THE SERVICES, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. SOME STATES DO NOT ALLOW EXCLUSIONS OF CERTAIN WARRANTIES OR LIMITATION OF LIABILITY FOR CERTAIN DAMAGES, SO THE ABOVE LIMITATIONS OR EXCLUSIONS MAY NOT APPLY TO YOU. IN SUCH STATES, OUR WARRANTIES AND OUR LIABILITY SHALL BE LIMITED TO THE GREATEST EXTENT PERMITTED BY LAW.
							THE PLATFORM AND THE CONTENT MAY CONTAIN TECHNICAL INACCURACIES OR TYPOGRAPHICAL ERRORS OR OMISSIONS. WE ARE NOT RESPONSIBLE FOR ANY SUCH TYPOGRAPHICAL OR TECHNICAL ERRORS LISTED ON THE PLATFORM. THE PLATFORM MAY CONTAIN INFORMATION ON PRODUCTS OR SERVICES WHICH ARE NOT AVAILABLE IN EVERY LOCATION. A REFERENCE TO A PRODUCT OR SERVICE ON THE PLATFORM DOES NOT IMPLY THAT SUCH PRODUCT OR SERVICE IS OR WILL BE AVAILABLE TO YOU. WE RESERVE THE RIGHT TO MAKE CHANGES, CORRECTIONS, AND/OR IMPROVEMENTS TO THE PLATFORM AT ANY TIME WITHOUT NOTICE.
						</Text>
						<Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
							External Sites
						</Text>
						<Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
							The Platform may contain links to third-party websites (“External Sites”). These links, videos and images are provided solely as a convenience to you and not as an endorsement by us of the content on such External Sites. The content of such External Sites is developed and provided by others. You should contact the site administrator or webmaster for those External Sites if you have any concerns regarding such links or any content located on such External Sites. We are not responsible for the content of any linked External Sites and do not make any representations regarding the content or accuracy of materials on such External Sites. You should take precautions when downloading files from all websites to protect your computer from viruses and other destructive programs. If you decide to access linked External Sites, you do so at your own risk.
						</Text>
						<Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
							Indemnification
						</Text>
						<Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
							You agree to defend, indemnify, and hold us and our officers, directors, employees, successors, licensees, and assigns harmless from and against any claims, actions, or demands, including, without limitation, reasonable legal and accounting fees, arising or resulting from your breach of this Agreement or your access to, use, or misuse of the Platform, the Content, or our Services. We shall provide notice to you of any such claim, suit, or proceeding and shall assist you, at your expense, in defending any such claim, suit, or proceeding. We reserve the right, at your expense, to assume the exclusive defense and control of any matter that is subject to indemnification under this section. In such case, you agree to cooperate with any reasonable requests assisting our defense of such matter.
						</Text>
						<Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
							Compliance With Applicable Laws
						</Text>
						<Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
							The Platform and its servers are based in the United States. We make no claims concerning whether the Content may be downloaded, viewed, or be appropriate for use outside of the United States. If you access the Platform or the Content from outside of the United States, you do so at your own risk. Whether inside or outside of the United States, you are solely responsible for ensuring compliance with the laws of your specific jurisdiction.
						</Text>
						<Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
							Termination Of The Agreement
						</Text>
						<Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
							We reserve the right, in our sole discretion, to restrict, suspend, or terminate this Agreement and your access to the Platform, at any time and for any reason without prior notice or liability. We reserve the right to change, suspend, or discontinue all or any part of the Platform at any time without prior notice or liability. If you wish to terminate this Agreement or your SlickFit account, you may send a request to terminate your account here, , which will place your account in a queue to be removed within 30 days.
						</Text>
						<Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
							Digital Millennium Copyright Act
						</Text>
						<Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
							SlickFit respects the intellectual property rights of others and attempts to comply with all relevant laws. We will review all claims of copyright infringement received and remove any Content deemed to have been posted or distributed in violation of any such laws.
							Our designated agent under the Digital Millennium Copyright Act (the “Act”) for the receipt of any notification of claimed infringement, which may be given under that Act is as follows:
							SLICK FITNESS LLC.
							Attn: Asnat Animashaun
							11605 Crossroads Cir,
							Middle River, MD 21220
							If you believe that your work has been copied on the Platform in a way that constitutes copyright infringement, please provide our agent with notice in accordance with the requirements of the Act, including: (i) a description of the copyrighted work that has been infringed and the specific location on the Platform where such work is located; (ii) a description of the location of the original or an authorized copy of the copyrighted work; (iii) your address, telephone number and e-mail address; (iv) a statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law; (v) a statement by you, made under penalty of perjury, that the information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner’s behalf; and (vi) an electronic or physical signature of the owner of the copyright or the person authorized to act on behalf of the owner of the copyright interest.
						</Text>
						<Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
							Miscellaneous
						</Text>
						<Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
							This Agreement is governed by the internal substantive laws of the State of New York, without respect to its conflict of laws provisions. You expressly agree: (i) to submit to the exclusive personal jurisdiction of the state and federal courts sitting in the State of New York; and (ii) that the Services shall be deemed passive that do not give rise to personal jurisdiction over SlickFit, either specific or general, in jurisdictions other than New York.
							YOU AGREE THAT ANY CAUSE OF ACTION ARISING OUT OF OR RELATED TO THE PLATFORM, THIS AGREEMENT, OR OUR SERVICES MUST COMMENCED BY YOU WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION ACCRUES, OTHERWISE SUCH CAUSE OF ACTION IS PERMANENTLY BARRED.
							If one or more provisions of this Agreement are held to be unenforceable under applicable law, then such provision(s) shall be excluded from this Agreement, and the balance of the Agreement shall be enforceable in accordance with its terms. The following provisions shall survive any termination of this Agreement: “Disclaimer,” “Waiver and Release,” “Intellectual Property,” “Communications to Us; User Submissions; and Publicity,” “No Warranties; Limitation of Liability,” “Indemnification,” “Termination of the Agreement,” and “Miscellaneous.”
							Our failure to act on or enforce any provision of the Agreement shall not be construed as a waiver of that provision or any other provision in this Agreement. No waiver shall be effective against us unless made in writing, and no such waiver shall be construed as a waiver in any other or subsequent instance. Except as expressly agreed by us and you in writing, this Agreement constitutes the entire Agreement between you and us with respect to the subject matter, and supersedes all previous or contemporaneous agreements, whether written or oral, between the parties with respect to the subject matter. The section headings are provided merely for convenience and shall not be given any legal import. This Agreement will inure to the benefit of our successors, assigns, licensees, and sublicensees.
							Copyright © 2018 SLICK FITNESS LLC. All rights reserved.
						</Text>
						<Button rounded block onPress={() => {
							this.setState({ Agreement: true })
						}} style={styles.button_auth}>
							<Text>Agree With Terms And Condition</Text>
						</Button>
						<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
							<Text style={{ textAlign: 'center', marginTop: 15 }}>Cancel</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
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
						<Title style={{ color: '#000000' }}>{Strings.ST27}</Title>
					</Body>
					<Right style={{ flex: 1 }} />
				</Header>
				<Body>
					<KeyboardAwareScrollView>


						<View style={{ flex: 0.8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20 }}>

							<Image source={require('../../assets/images/logo_dark.png')} style={styles.logo_start} resizeMode="contain" />
							<TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} onPress={this._pickImage}>
								{this.state.image ? (
									<Thumbnail source={{ uri: this.state.image.uri }} />
									// <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />
								) : (
										<Thumbnail source={require('../../assets/images/avatar.jpg')} />
									)}
								<Text style={{ marginBottom: 10 }}>Upload Image (Required)</Text>
							</TouchableOpacity>
							<Form
								ref="form"
								type={this.user}
								options={this.options}
								onChange={(v) => this.onChange(v)}
								value={this.state.user}
							/>
							<Item rounded
								style={{ marginBottom: 10 }}>

								<Input
									placeholderTextColor='#d1d5da'
									placeholder='@instagramname (Optional)'
									onChangeText={(phoneno) => this.setState({ phoneno })}
								/>
							</Item>
							<Button rounded block onPress={this.register.bind(this)} style={styles.button_auth}>
								<Text>{Strings.ST28}</Text>
							</Button>
						</View>
					</KeyboardAwareScrollView>

				</Body>
			</Container>
		)
	}

	backHomepage(item) {
		const navigateAction = NavigationActions.navigate({
			routeName: 'IntrestedList',
			params: { item }
		});
		this.props.navigation.dispatch(navigateAction);
	}

	askPermissionsAsync = async () => {
		await Permissions.askAsync(Permissions.CAMERA);
		await Permissions.askAsync(Permissions.CAMERA_ROLL);
	};

	_pickImage = async () => {
		await this.askPermissionsAsync();

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: "Images",
			allowsEditing: true,
			aspect: [4, 4],
		});

		const manipResult = await ImageManipulator.manipulateAsync(
			result.uri,
			[{ resize: { width: 160, height: 160 } }],
			{ compress: 0.9, format: ImageManipulator.SaveFormat.PNG, base64: false }
		);
		this.setState({ image: manipResult });

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
			xhr.open("GET", manipResult.uri, true);
			xhr.send(null);
		});


		const reference = firebase.storage().ref().child('images/' + Key);

		const snapshot = await reference.put(blob);
		const myUrl = snapshot.downloadURL;
		this.setState({ Image: myUrl })

	};
}