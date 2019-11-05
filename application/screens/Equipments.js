import React, { Component } from 'react';
import AppPreLoader from '../components/AppPreLoader';
import { ImageBackground, Dimensions, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Row } from 'react-native-easy-grid';
import { Container, Text, List } from 'native-base';

import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';

var styles = require('../../assets/files/Styles');
var { height, width } = Dimensions.get('window');

export default class Equipments extends Component {
  static navigationOptions = {
    title: `${Strings.ST38}`,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {

    return fetch(ConfigApp.URL + 'json/data_equipments.php')
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

  ListExercisesByEquipment = (equipment_id, equipment_title) => {
    this.props.navigation.navigate('ExercisesByEquipmentScreen', { IdEquipment: equipment_id, TitleEquipment: equipment_title });
  }

  render() {

    if (this.state.isLoading) {
      return (
        <AppPreLoader />
      );
    }

    return (

      <Container style={styles.background_general}>

        <List>

          <FlatList
            
            data={this.state.dataSource}
            refreshing="false"
            renderItem={({ item }) =>
              <Row onPress={this.ListExercisesByEquipment.bind(this, item.equipment_id, item.equipment_title)} activeOpacity={1}>

                <ImageBackground resizeMode= 'contain' source={{ uri: ConfigApp.URL + 'images/' + item.equipment_image }} style={{ width: width, height: height *0.30, }}>
                  <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']} style={styles.gradient_general}>
                    <Text style={styles.title_general}>{item.equipment_title}</Text>

                  </LinearGradient>
                </ImageBackground>
              </Row>
            }
            keyExtractor={(item, index) => index.toString()}

          />

        </List>

      </Container>
    );
  }
}
