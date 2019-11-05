import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import AppPreLoader from '../components/AppPreLoader';
import { ImageBackground, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Container, Text} from 'native-base';

import ConfigApp from '../utils/ConfigApp';



var styles = require('../../assets/files/Styles');

export default class PostsByTag extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.TitleTag}`,
  });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {

    return fetch(ConfigApp.URL + 'json/data_posts.php?tag=' + this.props.navigation.state.params.IdTag)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        }, function () {
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  PostDetails(item) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'PostDetailsScreen',
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
    const IdTag = params ? params.IdTag : null;

    return (
      <Container style={styles.background_general}>
        <ScrollView>
          <View style={{ margin: 7, marginTop: 5 }}>

            <FlatList
              data={this.state.dataSource}
              numColumns={2}
              renderItem={({ item, index }) =>
                <TouchableOpacity onPress={() => this.PostDetails(item)} activeOpacity={1} style={{ flex: 1 }}>
                  <View style={{ margin: 5, marginLeft: 4 }}>
                    <ImageBackground source={{ uri: ConfigApp.URL + 'images/' + item.post_image }} style={styles.background_posts_2columns}>
                      <LinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']} style={styles.gradient_posts_2columns}>
                        <Text numberOfLines={1} style={styles.date_posts}>{item.post_date}</Text>
                        <Text numberOfLines={1} style={styles.title_posts_categories}>{item.post_title}</Text>
                      </LinearGradient>
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
              }
              keyExtractor={(item, index) => index.toString()}

            />

          </View>
        </ScrollView>
       
      </Container>
    );
  }
}

