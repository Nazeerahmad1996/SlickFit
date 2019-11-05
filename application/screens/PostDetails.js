import React, { Component } from 'react';
import { Container, Text, Button } from 'native-base';
import { ImageBackground, Dimensions, View, ScrollView,  AsyncStorage, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PostRating from '../components/PostRating';
import PostForm from '../forms/PostForm';
import PostComments from '../forms/PostComments';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as firebase from 'firebase';
import Strings from '../utils/Strings';
import HTML from 'react-native-render-html';

import ToastModal from '../components/ToastModal';
import { Toast } from 'antd-mobile';
const Checked = () => (<ToastModal title="Saved!" />);

var styles = require('../../assets/files/Styles');
var { width } = Dimensions.get('window');

export default class PostDetails extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.item.Title}`,
    });

    constructor(props) {
        super(props)
        const { params } = props.navigation.state;
        this.state = {
            item: params.item,
        };
    }

    savePosts = async (post_id, post_title, post_image, post_date, tag_title, post_description, uid) => {
        try {
            let post = {
                userId: uid,
                post_id: post_id,
                post_title: post_title,
                post_image: post_image,
                post_date: post_date,
                tag_title: tag_title,
                post_description: post_description

            }

            const posts = await AsyncStorage.getItem('posts') || '[]';
            let postsFav = JSON.parse(posts);
            postsItems = postsFav.filter(function (e) { return e.post_id !== post_id && e.userId == uid })
            postsItems.push(post);
            AsyncStorage.setItem('posts', JSON.stringify(postsItems)).then(() => {

                Toast.info(Strings.ST53, 1)


            });

        } catch (error) {

        }
    };

    render() {

        const { item } = this.state;
        var user = firebase.auth().currentUser;

        return (
            <Container style={styles.background_general}>
                <ScrollView>
                    <KeyboardAwareScrollView>

                        <ImageBackground source={{ uri: item.Image }} style={styles.postDetail_background}>
                        </ImageBackground>


                        <View style={{ margin: 15, marginBottom: 5 }}>

                            <Text style={styles.postDetail_tag}>{item.Name}</Text>
                            <Text style={styles.postDetail_title}>{item.Title}</Text>
                            <PostRating postId={item.Node} />

                            <Button transparent>
                                <Ionicons name='md-calendar' />
                                <Text style={styles.postDetail_date}>{item.Date}</Text>
                            </Button>

                            <HTML html={item.Description} onLinkPress={(evt, href) => { Linking.openURL(href); }} />

                        </View>


                        <Text style={{ padding: 15, fontWeight: 'bold' }}>{Strings.ST83}</Text>


                        <View style={{ height: 1, backgroundColor: '#EEE', width: width, marginBottom: 5 }}></View>

                        <View style={{ margin: 15 }}>
                            <PostForm item={item} postId={item.Node} />
                        </View>

                        <Text style={{ padding: 15, fontWeight: 'bold' }}>{Strings.ST84}</Text>
                        <View style={{ height: 1, backgroundColor: '#EEE', width: width, marginBottom: 0 }}></View>

                        <View style={{ margin: 15, marginTop: 0 }}>
                            <PostComments postId={item.Node} />
                        </View>

                    </KeyboardAwareScrollView>

                </ScrollView>
               
            </Container>
        );
    }
}

