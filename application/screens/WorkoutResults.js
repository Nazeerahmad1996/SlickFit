import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import AppPreLoader from '../components/AppPreLoader';
import { ImageBackground, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Container, Text} from 'native-base';


import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';

var styles = require('../../assets/files/Styles');

export default class WorkoutResults extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${Strings.ST14}`,
  });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {

    return fetch(ConfigApp.URL + 'json/data_workout_search.php?goal=' + this.props.navigation.state.params.goalID + '&level=' + this.props.navigation.state.params.levelID + '&duration=' + this.props.navigation.state.params.durationID)
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

  WorkoutDetails(item) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'WorkoutDetailsScreen',
      params: { item }
    });
    this.props.navigation.dispatch(navigateAction);
  }

  renderFooter = () => {
    const dataSource = this.state.dataSource
    if (dataSource.length != 0) return null;


    return (
      <View style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', marginTop: 60 }}>
        <Text style={{ fontSize: 19, fontWeight: 'bold', marginBottom: 10 }}>{Strings.ST23}</Text>
        <Text style={{ fontSize: 17, marginBottom: 13, color: '#D1D1D1' }}>{Strings.ST24}</Text>
        <TouchableOpacity style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#F62459', padding: 10, borderRadius: 4, paddingLeft: 15, paddingRight: 15 }} onPress={() => this.props.navigation.goBack()}>
          <Text style={{ color: '#F62459' }}>{Strings.ST25}</Text>
        </TouchableOpacity>
      </View>
    );
  };

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

          <FlatList
            data={this.state.dataSource}
            refreshing="false"
            renderItem={({ item }) =>
              <TouchableOpacity onPress={() => this.WorkoutDetails(item)} activeOpacity={1}>
                <ImageBackground source={{ uri: ConfigApp.URL + 'images/' + item.workout_image }} style={styles.background_card}>
                  <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']} style={styles.gradient_card}>
                    <Text style={styles.category_card}>{item.goal_title}</Text>
                    <Text style={styles.title_card}>{item.workout_title}</Text>
                    <Text style={styles.subcategory_card}>{item.level_title}</Text>
                  </LinearGradient>
                </ImageBackground>
              </TouchableOpacity>
            }
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={this.renderFooter}


          />
        </ScrollView>

     

      </Container>
    );
  }
}

