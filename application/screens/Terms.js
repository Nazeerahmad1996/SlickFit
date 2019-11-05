import React, { Component } from 'react';
import AppPreLoader from '../components/AppPreLoader';
import { Image, ScrollView } from 'react-native';
import { Text, View, Button} from 'native-base';

import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';


var styles = require('../../assets/files/Styles');

export default class Terms extends Component {
  static navigationOptions = {
    title: `${Strings.ST82}`,
  };


  constructor(props) {

    super(props);

    this.state = {
      isLoading: true
    }

  }

  componentDidMount() {

    return fetch(ConfigApp.URL + 'json/data_strings.php')
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


  render() {

    if (this.state.isLoading) {
      return (
        <AppPreLoader />
      );
    }

    return (


      <ScrollView>
        <View style={{ flex: 0.8, padding: 20 }} >
          <View style={{ flex: 0.8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Image source={require('../../assets/images/logo_dark.png')} style={styles.logo_start} resizeMode="contain" />
          </View>
          <Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, fontSize: 26, fontWeight: 'bold', textAlign: 'center' }}>
            {Strings.ST126}
          </Text>
          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            {Strings.ST127}
          </Text>
          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            {Strings.ST128}
          </Text>
          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            {Strings.ST129}
          </Text>
          {/* PARAGRAPH */}
          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            {Strings.ST130}
          </Text>
          {/* HEADING */}
          <Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
            {Strings.ST131}
          </Text>

          {/* SMALL HEADING */}
          <Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 18, fontWeight: 'bold' }}>
            {Strings.ST132}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            {Strings.ST133}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            {Strings.ST134}
          </Text>

          {/* SMALL HEADING */}
          <Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 18, fontWeight: 'bold' }}>
            {Strings.ST135}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            {Strings.ST136}
          </Text>

          {/* SMALL HEADING */}
          <Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 18, fontWeight: 'bold' }}>
            {Strings.ST137}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            {Strings.ST138}
          </Text>

          {/* SMALL HEADING */}
          <Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 18, fontWeight: 'bold' }}>
            {Strings.ST139}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            {Strings.ST140}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            {Strings.ST141}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            {Strings.ST142}
          </Text>


          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            1){Strings.ST143}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            2){Strings.ST144}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            3){Strings.ST145}
          </Text>


          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            {Strings.ST146}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            {Strings.ST147}
          </Text>

          {/* HEADING */}
          <Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
            {Strings.ST148}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            {Strings.ST149}
          </Text>

          {/* HEADING */}
          <Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
            {Strings.ST150}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            {Strings.ST151}
          </Text>

          {/* HEADING */}
          <Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
            {Strings.ST152}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            {Strings.ST153}
          </Text>


          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            1){Strings.ST154}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            2){Strings.ST155}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            3){Strings.ST156}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            4){Strings.ST157}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            5){Strings.ST158}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            6){Strings.ST159}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            7){Strings.ST160}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            8){Strings.ST161}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            9){Strings.ST162}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            10){Strings.ST163}
          </Text>


          {/* HEADING */}
          <Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
            {Strings.ST164}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            {Strings.ST165}
          </Text>

          {/* HEADING */}
          <Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
            {Strings.ST166}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            {Strings.ST167}
          </Text>

          {/* HEADING */}
          <Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
            {Strings.ST168}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            {Strings.ST169}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            SLICK FITNESS LLC.
        </Text>
          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            Attn: Asnat Animashaun
        </Text>
          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            11605 Crossroads Cir,
        </Text>
          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            Middle River, MD 21220
        </Text>

          {/* HEADING */}
          <Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
            {Strings.ST170}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            {Strings.ST171}
          </Text>

          {/* HEADING */}
          <Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
            {Strings.ST172}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            {Strings.ST173}
          </Text>

          {/* HEADING */}
          <Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
            {Strings.ST174}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            {Strings.ST175}
          </Text>

          {/* HEADING */}
          <Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
            {Strings.ST176}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            {Strings.ST177}
          </Text>

          {/* HEADING */}
          <Text style={{ paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight: 'bold' }}>
            {Strings.ST178}
          </Text>

          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 20 }}>
            {Strings.ST179}
          </Text>

        </View>
      </ScrollView>
    )
  }

}