'use strict';

import { Dimensions } from "react-native";
import { Row } from "react-native-easy-grid";
import { grey } from "ansi-colors";

var React = require('react-native');

var { StyleSheet } = React;

var { height, width } = Dimensions.get('window');

export const PrimaryColor = "#F62459";

module.exports = StyleSheet.create({

  //////////////////////// GENERAL

  padding_general: {
    padding: 20,
    backgroundColor: '#FFF'
  },

  background_general: {
    backgroundColor: '#FFF'
  },

  card_general: {
    width: width,
  },

  gradient_general: {
    position: 'absolute',
    padding: 15,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  title_general: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold'
  },

  subtitle_general: {
    color: PrimaryColor,
    fontSize: 16,
    fontWeight: '300'
  },

  touchBookmark: {
    backgroundColor: PrimaryColor,
    width: 50,
    height: 50,
    position: 'absolute',
    right: 15,
    bottom: -25,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },

  touchBookmarkTran: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: 50,
    height: 50,
    position: 'absolute',
    right: 15,
    top: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },


  //////////////////////// CATEGORIES

  title_categories: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },

  title_categories_background: {
    width: width,
    alignItems: 'center',
    padding: 15
  },

  title_categories_border: {
    height: 2,
    backgroundColor: PrimaryColor,
    width: 50
  },

  gradient_categories: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height / 4.35,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  background_categories: {
    width: width,
    height: height / 4.35,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  gradient_2columns: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height / 4.35,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  title_2columns_background: {
    width: width * 0.50,
    alignItems: 'center',
    padding: 15
  },

  background_2columns: {
    width: width * 0.50,
    height: height / 4.35,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  background_exercises: {
    width: width * 0.50,
    height: height / 4.35,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },

  //////////////////////// POSTS


  title_posts_categories: {
    color: '#FFF',
    fontSize: 13,
    padding: 10,
    fontWeight: 'bold',
    paddingTop: 2
  },

  date_posts: {
    color: 'rgba(255,255,255,0.50)',
    fontSize: 11,
    padding: 10,
    paddingBottom: 0,
    fontWeight: 'bold'
  },

  gradient_posts_2columns: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.15,
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },

  background_posts_2columns: {
    width: width * 0.46,
    height: height * 0.15,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },

  postDetail_background: {
    width: width,
    height: width,
    alignItems: 'center',
    justifyContent: 'center',
  },

  postDetail_gradient: {
    position: 'absolute',
    padding: 15,
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.10,
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },

  postDetail_title: {
    fontSize: 20,
    fontWeight: 'normal',
    marginBottom: 5,
    lineHeight: 30,
  },

  postDetail_tag: {
    fontSize: 18,
    fontWeight: 'normal',
    color: PrimaryColor,
    lineHeight: 30,
  },

  postDetail_date: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#333',
    marginLeft: 0,
    paddingLeft: 8
  },

  postCommentButton: {
    backgroundColor: PrimaryColor,
    elevation: 0,
    shadowOpacity: 0
  },

  postCommentText: {
    color: '#FFFFFF'
  },

  //////////////////////// DIETS

  title_diets: {
    color: '#FFF',
    fontSize: 17,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  title_diets2: {
    color: '#FFF',
    fontSize: 13,
    marginBottom: 3,
    fontWeight: 'bold'
  },

  title_diets_categories: {
    color: '#FFF',
    fontSize: 14,
    padding: 10,
    fontWeight: 'bold'
  },

  category_diets: {
    color: '#fff',
    marginBottom: 8,
    fontSize: 16,
    backgroundColor: PrimaryColor,
    padding: 5
  },

  subcategory_diets: {
    color: '#FFF',
    fontSize: 15,
    opacity: 0.8,
    marginBottom: 10,
  },
  category_diets2: {
    color: '#fff',
    marginBottom: 4,
    fontSize: 12,
    backgroundColor: PrimaryColor,
    padding: 5
  },

  subcategory_diets2: {
    color: '#FFF',
    fontSize: 11,
    opacity: 0.8,
    marginBottom: 10,
  },

  gradient_diets: {
    position: 'absolute',
    padding: 15,
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.29,
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  gradient_diets2: {
    position: 'absolute',
    padding: 15,
    left: 0,
    right: 0,
    bottom: 0,
    height: width * 0.85 ,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    borderRadius: 7
  },

  background_diets: {
    width: width,
    height: height * 0.29,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 15,
  },

  background_diets2: {
    width: width * 0.5,
    height: width * 0.3,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 5,
    borderRadius: 7
  },

  gradient_diets_2columns: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.15,
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },

  background_diets_2columns: {
    width: width * 0.46,
    height: height * 0.15,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },

  background_diets_col: {
    width: width,
    height: height * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  info_diets: {
    backgroundColor: 'rgba(0,0,0,0.70)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    paddingBottom: 11,
    paddingTop: 11
  },

  title_diets_detail: {
    fontSize: 20,
    fontWeight: 'normal',
    lineHeight: 30,
  },

  gtitle_diets_detail: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  description_diets_detail: {
    fontSize: 14,
  },

  col_diets: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center'

  },

  titlecol_diets: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 5,
    color: PrimaryColor

  },

  tabs_diets: {
    backgroundColor: '#fafafa',
  },

  activetabs_diets: {
    backgroundColor: '#fafafa',
  },

  tabs_text_diets: {
    color: 'rgba(0,0,0,0.3)',
    fontWeight: 'normal'
  },

  activetabs_text_diets: {
    color: '#333',
    fontWeight: 'normal'
  },

  //////////////////////// CARDS

  title_card: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 3,
    fontWeight: 'bold'
  },

  category_card: {
    color: PrimaryColor,
    marginBottom: 3,
    fontSize: 14
  },

  subcategory_card: {
    color: '#FFF',
    fontSize: 14,
    opacity: 0.8
  },

  gradient_card: {
    position: 'absolute',
    padding: 15,
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.23,
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },

  background_card: {
    width: width,
    height: height * 0.23,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 15
  },

  //////////////////////// WORKOUT DETAILS

  title_workout: {
    color: '#FFF',
    fontSize: 18,
    marginBottom: 3,
    fontWeight: 'bold'
  },

  category_workout: {
    color: PrimaryColor,
    fontSize: 16,
    fontWeight: 'bold'

  },

  gradient_workout: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.25,
    alignItems: 'center',
    justifyContent: 'center'
  },

  background_workout: {
    width: width,
    height: height * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  col_workout: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center'

  },

  titlecol_workout: {
    fontWeight: 'bold',
    fontSize: 18,
    color: PrimaryColor

  },

  icon_workout: {

    fontSize: 26,
    fontWeight: 'bold',
    color: '#ddd',
    position: 'absolute',
    right: 15

  },

  textButton_workout: {
    color: '#000'
  },

  button_workout: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: 'flex-start',
    borderColor: 'rgba(0,0,0,0.02)',
    height: 48,
    paddingLeft: 15,
    elevation: 0,
    shadowOpacity: 0
  },

  //////////////////////// EXERCISE

  footer_exercise: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    marginTop: 10,
    marginBottom: 5,
    elevation: 0,
    shadowOpacity: 0,
  },

  start_exercise: {
    backgroundColor: '#fff',
    borderColor: PrimaryColor,
    borderWidth: 1,
    elevation: 0,
    shadowOpacity: 0,
    borderRadius: 5,
    width: width * 0.9
  },

  textStart_exercise: {
    color: PrimaryColor,
    fontSize: 16,
    fontWeight: 'bold'
  },

  col_exercise: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  titlecol_exercise: {
    fontWeight: 'bold',
    marginTop: 2,
    marginBottom: 6,
    fontSize: 16,

  },

  title_exercise_background: {
    width: width,
    alignItems: 'flex-start',
    padding: 15
  },

  subtitle_exercise: {
    color: PrimaryColor,
  },

  icon_get: {

    fontSize: 14,
    fontWeight: 'bold',
    color: PrimaryColor

  },

  icon_exercise: {
    width: 40, height: 40,
    marginTop: 10,
    marginBottom: 7
  },

  icon_videoexercise: {
    width: 50, height: 50,
    marginTop: 10,
    marginBottom: 7
  },

  playButton: {
    backgroundColor: PrimaryColor,
    elevation: 0,
    shadowOpacity: 0
  },

  playCol_exercise: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15
  },

  //////////////////////// START

  button_start: {
    minWidth: 250,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: PrimaryColor,
    marginBottom: 11,
    height: 53
  },

  logo_start: {
    width: 140,
    height: 140,
    marginTop: 15,
    marginBottom: 30
  },



  //////////////////////// LOGIN & SIGNUP

  button_auth: {
    minWidth: 200,
    backgroundColor: PrimaryColor,
    marginBottom: 8,
    height: 53,
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    shadowOffset: {
      width: 0,
      height: 0
    }
  },

  text_auth: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    minWidth: 200,
    marginTop: 5,
    color: '#808080',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    shadowOffset: {
      width: 0,
      height: 0
    }
  },

  //////////////////////// HOME


  listitem_home: {

    borderBottomWidth: 0,
    backgroundColor: 'transparent',
  },

  icon_home: {

    fontSize: 20,
    color: '#ddd'

  },

  note_home: {

    fontSize: 13,

  },

  //////////////////////// MENU

  container_menu: {
    flex: 1,
    backgroundColor: '#FFF'
  },

  item_menu: {

    borderBottomWidth: 0,
    borderBottomColor: '#f7f8f9',
    marginLeft: 0,
    paddingRight: 20,
    paddingLeft: 20,
  },

  text_menu: {

    fontSize: 16

  },

  thumbnail_menu: {
    marginRight: 10,
    maxWidth: 40
  },

  icon_menu: {

    fontSize: 20,
    color: '#ddd'

  },

  footer_menu: {
    padding: 20,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  postrow: {
    width: '100%',
    height: 100,
    padding: 15,
    flexDirection: 'row',
    elevation: 1,
    marginBottom: 10,
    backgroundColor: '#ffffff',

  },
  DescriptionBox: {
    flex: 3,
    borderWidth: 0.5,
    borderRadius: 15,
    marginLeft: 10,

  },
  DescriptionInput: {
    padding: 3,
    borderColor: '#ffffff',
  },
  DateText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333'
  },
  DescriptionText: {
    fontSize: 15,
    color: '#333'

  },
  postText: {
    padding: 8,
  },
  ProgressBackground: {
    backgroundColor: '#F3E7E7',
  },
  PostCard: {
    elevation: 5,
    backgroundColor: '#ffffff',
    marginBottom: 15,
    width: '100%',
    height: 410,
    flex: 1,
    borderRadius: 5,
  },
  UploadImage: {
    width: 45,
    height: 45,
    padding: 15,
    marginRight: 15,
  },
  UploadVideo:{
    width: 45,
    height: 45,
    padding: 15,
    marginRight: 15,
    justifyContent: 'flex-end'
  },
  ImageContainer:{
    marginBottom: -38,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
  },
  background_Progress: {
    width: width,
    height: height * 0.29,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 15,
    marginBottom: 30,
  },
  ListTitle: {
    color: '#fff',
    marginBottom: 8,
    fontSize: 16,
    backgroundColor: PrimaryColor,
    padding: 5,
    textAlign: 'center',
  },
  UploadVideoView:{
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    margin: '10%',
  },
  UploadVideoInputText:{
    padding: 10,
    borderBottomColor: '#fff',
  },
  UploadVideoButton:{
    textAlign: "center",
  },
  uploadVideoButton:{
    marginBottom:10,
    marginTop:20,
  },
  youtubeVideoList:{
    marginBottom: 20,
    elevation: 5,
    borderRadius: 2,
    padding: 10,
  },
  imageUploadDiv:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  PostTextmeetup:{
    textAlign: "center",
    fontSize: 15,
    padding:10,
    color: '#2F4F4F',
  },
  PostTextbtn:{
    backgroundColor: '#F9E0E0'
  },
  PostTextbtn2:{
    backgroundColor: '#FFE4E1'
  },
  PostTextbtn3:{
    backgroundColor: '#C7B1B1'
  },
  modalView:{
    padding: 20,
    margin: 5,
    elevation: 5,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  MeetupHeading:{
    color: PrimaryColor,
    fontSize: 22,
    fontWeight: '300',
    textAlign: 'center',
    padding: 10
  },
  Modelbuttons:{
    flexDirection: 'row',
    flex: 1,
  },
  postCardView:{
    margin: 5,
    elevation: 5,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  TopTextPost:{
    padding:10,
    flexDirection: 'row',
    flex: 1,
  },
  Map:{
    height: '100%',
    width: '100%',
  },
  UploadImages: {
    width: 45,
    height: 45,
    padding: 15,
    marginLeft:28,
  },
  WebView:{
    width,
    height: height * 0.30,
    borderWidth: 1, 
    borderColor: '#FFF', 
    borderBottomWidth: 0, 
    borderTopWidth: 0, 
    borderLeftWidth: 0, 
    borderRightWidth: 0
  },
  
});
