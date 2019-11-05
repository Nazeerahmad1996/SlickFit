import React from 'react';
import SideMenu from './SideMenu';
import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigator, StackNavigator } from 'react-navigation'
import { Dimensions, Text } from "react-native";

var { height, width } = Dimensions.get('window');

import HomeScreen from '../screens/Home';
import WorkoutsScreen from '../screens/Workouts';
import ExercisesScreen from '../screens/Exercises';
import DietsScreen from '../screens/Diets';
import PostsScreen from '../screens/Posts';
import EBodypartsScreen from '../screens/EBodyparts';
import EquipmentsScreen from '../screens/Equipments';
import ExercisesByMuscleScreen from "../screens/ExercisesByMuscle";
import ExercisesByEquipmentScreen from "../screens/ExercisesByEquipment";
import PostsByTagScreen from "../screens/PostsByTag";
import DietsByCategoryScreen from "../screens/DietsByCategory";
import WorkoutDetailsScreen from "../screens/WorkoutDetails";
import ExerciseDetailsScreen from "../screens/ExerciseDetails";
import DietDetailsScreen from "../screens/DietDetails";
import PostDetailsScreen from "../screens/PostDetails";
import VideoExerciseScreen from "../screens/VideoExercise";
import ProfileScreen from "../screens/Profile";
import LogoutScreen from "../screens/Logout";
import WorkoutSearchScreen from "../screens/WorkoutSearch";
import WorkoutResultsScreen from "../screens/WorkoutResults";
import CalculatorScreen from "../screens/Calculator";
import QuotesScreen from "../screens/Quotes";
import SettingsScreen from "../screens/Settings";
import TermsScreen from "../screens/Terms";
import AboutUsScreen from "../screens/AboutUs";
import TagsScreen from "../screens/Tags";
import CategoriesScreen from "../screens/Categories";
import ContactUsScreen from "../screens/ContactUs";
import Progress from "../screens/Progress";
import YoutubeVideos from '../screens/YoutubeVideos'
import HomeWorkout from '../screens/HomeWorkout'
import HomeExercise from '../screens/HomeExercise'
import ExerciseByHome from '../screens/ExerciseByHome'
import Challenge from '../screens/Challenge'
import AbsAss from '../screens/AbsAss'
import GluteLeg from '../screens/GluteLeg'
import WeightLoss from '../screens/WeightLoss'
import ArmsAbs from '../screens/ArmsAbs'
import Meetup from '../screens/Meetup'
import MeetupChat from '../screens/MeetupChat'
import IntrestedList from '../screens/IntrestedList'
import Payment from '../screens/Payment'
import UserProfile from '../screens/UserProfile'





const leftIcon = (navigation, icon) => <Ionicons
  name={icon}
  style={{ marginLeft: 20 }}
  size={27}
  color="white"
  onPress={() => navigation.navigate('DrawerOpen')}
/>;

const navigationOptions = {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#141414',
      shadowOpacity: 0,
      elevation: 0,
    },
    headerBackTitle: null,
    headerTintColor: '#fff',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center',
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold'
    }
  }
};

const HomeNavigator = StackNavigator(
  {
    PostsScreen: {
      screen: PostsScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: leftIcon(navigation, 'md-menu')
      })
    },
    Meetup: {
      screen: Meetup,
    },
    HomeScreen: {
      screen: HomeScreen,
    },
    WorkoutsScreen: {
      screen: WorkoutsScreen
    },
    ExercisesScreen: {
      screen: ExercisesScreen
    },
    DietsScreen: {
      screen: DietsScreen
    },
    
    EBodypartsScreen: {
      screen: EBodypartsScreen
    },
    EquipmentsScreen: {
      screen: EquipmentsScreen
    },
    ExercisesByMuscleScreen: {
      screen: ExercisesByMuscleScreen
    },
    ExercisesByEquipmentScreen: {
      screen: ExercisesByEquipmentScreen
    },
    PostsByTagScreen: {
      screen: PostsByTagScreen
    },
    DietsByCategoryScreen: {
      screen: DietsByCategoryScreen
    },
    TagsScreen: {
      screen: TagsScreen
    },
    CategoriesScreen: {
      screen: CategoriesScreen
    },
    WorkoutDetailsScreen: {
      screen: WorkoutDetailsScreen
    },
    VideoExerciseScreen: {
      screen: VideoExerciseScreen
    },
    ExerciseDetailsScreen: {
      screen: ExerciseDetailsScreen
    },
    DietDetailsScreen: {
      screen: DietDetailsScreen
    },
    PostDetailsScreen: {
      screen: PostDetailsScreen
    },
    ProfileScreen: {
      screen: ProfileScreen
    },
    LogoutScreen: {
      screen: LogoutScreen
    },
    WorkoutSearchScreen: {
      screen: WorkoutSearchScreen
    },
    WorkoutResultsScreen: {
      screen: WorkoutResultsScreen
    },
    CalculatorScreen: {
      screen: CalculatorScreen
    },
    QuotesScreen: {
      screen: QuotesScreen
    },
    SettingsScreen: {
      screen: SettingsScreen
    },
    YoutubeVideos: {
      screen: YoutubeVideos
    },
    AboutUsScreen: {
      screen: AboutUsScreen
    },
    TermsScreen: {
      screen: TermsScreen
    },
    ContactUsScreen: {
      screen: ContactUsScreen
    },
    Progress: {
      screen: Progress
    },
    HomeWorkout: {
      screen: HomeWorkout
    },
    HomeExercise: {
      screen: HomeExercise
    },
    ExerciseByHome: {
      screen: ExerciseByHome
    },
    Challenge: {
      screen: Challenge
    },
    AbsAss: {
      screen: AbsAss
    },
    GluteLeg: {
      screen: GluteLeg
    },
    WeightLoss: {
      screen: WeightLoss
    },
    ArmsAbs: {
      screen: ArmsAbs
    },
    MeetupChat: {
      screen: MeetupChat
    },
    IntrestedList: {
      screen: IntrestedList
    },
    Payment:{
      screen: Payment
    },
    UserProfile: {
      screen: UserProfile
    }
  }, navigationOptions

);

const MainNavigator = DrawerNavigator({
  Home: {
    screen: HomeNavigator,
  },
}, {
    contentComponent: SideMenu,
    drawerWidth: width * .7,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  });

export default MainNavigator;