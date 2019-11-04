import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('window');
import Colors from '../../../Themes/Colors';
import firebase from 'react-native-firebase';
import {APIRemoveToken} from '../../../Services/APIRemoveToken';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewAccount: {
    flex: 0.2,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomWidth: 0.5,
  },
  viewSetting: {
    flex: 0.8,
    width: width * 0.9,
  },
  viewName: {
    marginLeft: 10,
  },
  mediaView: {
    marginRight: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
    backgroundColor: Colors.appColor,
    borderRadius: 50,
  },
  textTouch: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewTouch: {
    width: '100%',
    height: height * 0.1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  viewAccountTitle: {
    flex: 0.2,
  },
  textSettingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.appColor,
  },
  viewAccountInfo: {
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textName: {
    fontSize: 25,
    color: Colors.appColor,
  },
  textPhone: {
    fontSize: 20,
    color: '#a9a9a9',
  },
  viewFunctionBasic: {
    width: '100%',
    borderBottomWidth: 0.5,
  },
  viewFunctionInfo: {
    width: '100%',
  },
  viewBasic: {
    marginTop: 20,
  },
  viewInfo: {
    marginTop: 20,
  },
  iconStyle: {
    color: Colors.appColor,
    width: width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default class MenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      user: {},
    };
  }

  refresh = data => {
    this.setState(prevState => {
      let user = Object.assign({}, prevState.user); // creating copy of state variable jasper
      user.name = data; // update the name property, assign a new value
      return {user}; // return new object jasper object
    });
  };

  componentDidMount = async () => {
    let phone = await AsyncStorage.getItem('PHONENUMBER');
    let user = await AsyncStorage.getItem('USER');
    this.setState({phoneNumber: phone, user: JSON.parse(user)});
  };

  logout = async () => {
    const phoneNumber = this.state.phoneNumber;
    try {
      await firebase.auth().signOut();
      AsyncStorage.clear();
      let responseStatus = await APIRemoveToken(phoneNumber);
      this.props.navigation.navigate('AuthNavigator');
    } catch (error) {
      alert('có lỗi');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewAccount}>
          <View style={styles.viewAccountInfo}>
            <View style={styles.mediaView}>
              <Icon name="user" size={35} color="#ffffff" />
            </View>
            <View style={styles.viewName}>
              <Text style={styles.textName}>{this.state.user.name}</Text>
              <Text style={styles.textPhone}>{this.state.phoneNumber}</Text>
            </View>
          </View>
        </View>
        <ScrollView style={styles.viewSetting}>
          <View style={styles.viewBasic}>
            <Text style={styles.textSettingTitle}>Chức năng</Text>
            <View style={styles.viewFunctionBasic}>
              <TouchableOpacity
                style={styles.viewTouch}
                onPress={() =>
                  this.props.navigation.navigate('FeedBackScreen')
                }>
                <Icon name="comment" size={30} style={styles.iconStyle} />
                <Text style={styles.textTouch}>Gửi phản hồi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.viewTouch}
                onPress={() => this.props.navigation.navigate('PoliceScreen')}>
                <Icon name="address-book" size={30} style={styles.iconStyle} />
                <Text style={styles.textTouch}>Danh sách cảnh sát</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.viewInfo}>
            <Text style={styles.textSettingTitle}>Tài khoản</Text>
            <View style={styles.viewFunctionInfo}>
              <TouchableOpacity
                style={styles.viewTouch}
                onPress={() =>
                  this.props.navigation.navigate('CitizenDetailScreen')
                }>
                <Icon name="user" size={30} style={styles.iconStyle} />
                <Text style={styles.textTouch}>Xem thông tin chi tiết</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.viewTouch}
                onPress={() =>
                  this.props.navigation.navigate('UpdateProfileScreen', {
                    onGoBack: this.refresh,
                  })
                }>
                <Icon name="user-plus" size={30} style={styles.iconStyle} />
                <Text style={styles.textTouch}>Sửa đổi profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.viewTouch} onPress={this.logout}>
                <Icon name="sign-out" size={30} style={styles.iconStyle} />
                <Text style={styles.textTouch}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export {MenuScreen};
