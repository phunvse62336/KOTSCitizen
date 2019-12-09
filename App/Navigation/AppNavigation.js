import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import AuthLoadingScreen from '../Containers/AuthLoadingScreen';

import SignInScreen from '../Containers/AuthStack/SignInScreen/SignInScreen';
import ConfirmScreen from '../Containers/AuthStack/ConfirmScreen/ConfirmScreen';
import RegisterScreen from '../Containers/AuthStack/RegisterScreen/RegisterScreen';
import CreateProfileScreen from '../Containers/AuthStack/CreateProfileScreen/CreateProfileScreen';

import HomeScreen from '../Containers/HomeStack/HomeScreen/HomeScreen';
import CreateSOSScreen from '../Containers/HomeStack/CreateSOSScreen/CreateSOSScreen';
import NewsScreen from '../Containers/NewsStack/NewsScreen/NewsScreen';
import NewsDetailScreen from '../Containers/NewsStack/NewsDetailScreen/NewsDetailScreen';
import MenuScreen from '../Containers/MenuStack/MenuScreen/MenuScreen';
import NotificationScreen from '../Containers/NotificationStack/NotificationScreen/NotificationScreen';
import PoliceScreen from '../Containers/MenuStack/PoliceScreen/PoliceScreen';
import UpdateProfileScreen from '../Containers/MenuStack/UpdateProfileScreen/UpdateProfileScreen';
import NotificationDetailScreen from '../Containers/NotificationStack/NotificationDetailScreen/NotificationDetailScreen';
import FeedBackScreen from '../Containers/MenuStack/FeedBackScreen/FeedBackScreen';
import CitizenDetailScreen from '../Containers/MenuStack/CitizenDetailScreen/CitizenDetailScreen';
import KnightJoinListScreen from '../Containers/NotificationStack/KnightJoinListScreen/KnightJoinListScreen';
import RatingCaseScreen from '../Containers/NotificationStack/RatingCaseScreen/RatingCaseScreen';
import TabsViewScreen from '../Containers/NewsStack/NewsScreen/TabsViewScreen';
import CrimeScreen from '../Containers/NewsStack/NewsScreen/CrimeScreen';

import styles from './Styles/NavigationStyles';
import {Colors} from '../Themes';

const AuthNavigator = createStackNavigator(
  {
    SignInScreen: {
      screen: SignInScreen,
      navigationOptions: {
        header: null,
      },
    },
    ConfirmScreen: {
      screen: ConfirmScreen,
      navigationOptions: {
        headerTitle: 'Nhập Mã Xác Nhận',
        headerTintColor: Colors.appColor,
        headerTitleStyle: {color: Colors.appColor, fontWeight: 'bold'},
      },
    },
    RegisterScreen: {
      screen: RegisterScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    // Default config for all screens
    initialRouteName: 'SignInScreen',
    navigationOptions: {
      headerStyle: styles.header,
    },
  },
);

const CreateProfile = createStackNavigator({
  CreateProfileScreen: {
    screen: CreateProfileScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const HomeTabStack = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  CreateSOSScreen: {
    screen: CreateSOSScreen,
    navigationOptions: {
      headerTitle: 'Quay lại',
      headerTintColor: Colors.appColor,
      headerTitleStyle: {color: Colors.appColor, fontWeight: 'bold'},
    },
  },
});

const NewsTabStack = createStackNavigator({
  TabsViewScreen: {
    screen: TabsViewScreen,
    navigationOptions: {
      header: null,
    },
  },
  NewsScreen: {
    screen: NewsScreen,
    navigationOptions: {
      header: null,
    },
  },
  CrimeScreen: {
    screen: CrimeScreen,
    navigationOptions: {
      header: null,
    },
  },
  NewsDetailScreen: {
    screen: NewsDetailScreen,
    navigationOptions: {
      headerTitle: 'Quay lại',
      headerTintColor: Colors.appColor,
      headerTitleStyle: {color: Colors.appColor, fontWeight: 'bold'},
    },
  },
});

const SOSTabStack = createStackNavigator({
  NotificationScreen: {
    screen: NotificationScreen,
    navigationOptions: {
      header: null,
    },
  },
  NotificationDetailScreen: {
    screen: NotificationDetailScreen,
    navigationOptions: {
      headerTitle: 'Chi tiết sự cố',
      headerTintColor: Colors.appColor,
      headerTitleStyle: {color: Colors.appColor, fontWeight: 'bold'},
    },
  },
  KnightJoinListScreen: {
    screen: KnightJoinListScreen,
    navigationOptions: {
      headerTitle: 'Danh sách hiệp sĩ tham gia',
      headerTintColor: Colors.appColor,
      headerTitleStyle: {color: Colors.appColor, fontWeight: 'bold'},
    },
  },
  RatingCaseScreen: {
    screen: RatingCaseScreen,
    navigationOptions: {
      headerTitle: 'Đánh giá sự cố',
      headerTintColor: Colors.appColor,
      headerTitleStyle: {color: Colors.appColor, fontWeight: 'bold'},
    },
  },
});

const MenuTabStack = createStackNavigator({
  MenuScreen: {
    screen: MenuScreen,
    navigationOptions: {
      header: null,
    },
  },
  PoliceScreen: {
    screen: PoliceScreen,
    navigationOptions: {
      headerTitle: 'Danh sách cảnh sát',
      headerTintColor: Colors.appColor,
      headerTitleStyle: {color: Colors.appColor, fontWeight: 'bold'},
    },
  },
  UpdateProfileScreen: {
    screen: UpdateProfileScreen,
    navigationOptions: {
      headerTitle: 'Sửa đổi profile',
      headerTintColor: Colors.appColor,
      headerTitleStyle: {color: Colors.appColor, fontWeight: 'bold'},
    },
  },
  FeedBackScreen: {
    screen: FeedBackScreen,
    navigationOptions: {
      headerTitle: 'Gửi phản hồi',
      headerTintColor: Colors.appColor,
      headerTitleStyle: {color: Colors.appColor, fontWeight: 'bold'},
    },
  },
  CitizenDetailScreen: {
    screen: CitizenDetailScreen,
    navigationOptions: {
      headerTitle: 'Thông tin chi tiết',
      headerTintColor: Colors.appColor,
      headerTitleStyle: {color: Colors.appColor, fontWeight: 'bold'},
    },
  },
});

const AppNavigator = createBottomTabNavigator(
  {
    HomeTabStack,
    NewsTabStack,
    SOSTabStack,
    MenuTabStack,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, tintColor}) =>
        getTabBarIcon(navigation, focused, tintColor),
    }),

    tabBarOptions: {
      activeTintColor: '#1F06B6',
      inactiveTintColor: 'gray',
      showLabel: false,
    },
  },
);

const getTabBarIcon = (navigation, focused, tintColor) => {
  const {routeName} = navigation.state;
  let iconName;
  if (routeName === 'HomeTabStack') {
    iconName = 'home';
  } else if (routeName === 'NewsTabStack') {
    iconName = 'newspaper';
  } else if (routeName === 'SOSTabStack') {
    iconName = 'bell';
  } else if (routeName === 'MenuTabStack') {
    iconName = 'bars';
  }

  return <FontAwesome5 name={iconName} size={25} color={tintColor} />;
};

const SwitchNavigation = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    AuthNavigator,
    CreateProfile,
    AppNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default createAppContainer(SwitchNavigation);
