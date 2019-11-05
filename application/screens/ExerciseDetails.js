import React, { Component } from 'react';
import { Dimensions, View, ScrollView, Image } from 'react-native';
import { WebView } from 'react-native-webview';

import { Container, Text } from 'native-base';
import Strings from '../utils/Strings';


var styles = require('../../assets/files/Styles');
var { height, width } = Dimensions.get('window');

export default class ExerciseDetails extends Component {
  static navigationOptions = {
    title: `${Strings.ST96}`,
  };

  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      item: params.item,
    };
  }




  render() {

    const { item } = this.state;

    return (

      <Container style={styles.background_general}>
        <ScrollView>

          <WebView
            style={{ width, height: height * 0.35, borderWidth: 0, borderColor: '#FFF', marginTop: -45 }}
            javaScriptEnabled={true}
            source={{
              uri: 'https://www.youtube.com/embed/'+ item.Video,
            }}
          />
          {/* <WebView
            style={{ width, height: height * 0.35, borderWidth: 0, borderColor: '#FFF', marginTop: -45 }}
            source={{ uri: 'https://www.youtube.com/embed/' + item.Video }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            allowsInlineMediaPlayback={true}
          /> */}

          <View style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 15, paddingBottom: 0, marginBottom: 15 }}>
            <Text style={{ color: 'rgba(0,0,0,0.3)' }}>{item.Title}</Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <Image
              style={{ width: '100%', height: width }}
              source={{ uri: item.Details }}
            />
            <View style={{ padding: 8 }} />


          </View>


        </ScrollView>

      </Container>

    );
  }
}

