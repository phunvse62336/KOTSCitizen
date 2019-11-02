import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('window');
import Colors from '../../../Themes/Colors';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';

import {APIFindUser} from '../../../Services/APIFindUser';
import {MESSAGES} from '../../../Utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
  viewAccount: {
    flex: 1,
    width: width * 0.9,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.appColor,
    marginTop: 15,
  },
  viewAccountInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textName: {
    fontSize: 18,
    color: Colors.appColor,
    marginBottom: 5,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  textInfo: {
    fontSize: 18,
    marginBottom: 5,
    marginLeft: 10,
    textAlign: 'justify',
  },
  viewInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  viewLeft: {
    width: '30%',
  },
  viewRight: {
    width: '70%',
  },
  viewPoliceName: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: width * 0.9,
    paddingTop: 6,
    paddingBottom: 6,
  },
  textPoliceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
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
});

class CitizenDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      toast: false,
      spinner: false,
      phoneNumber: '',
      user: '',
    };
  }

  componentDidMount = async () => {
    await AsyncStorage.getItem('PHONENUMBER').then(phone => {
      this.setState({
        phoneNumber: phone,
      });
    });
    console.log(this.state.phoneNumber);
    const phoneNumber = this.state.phoneNumber;
    this.setState({spinner: true});
    let responseStatus = await APIFindUser(phoneNumber);
    if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
      console.log(JSON.stringify(responseStatus));
      this.state.user = responseStatus.data;
      console.log(this.state.user);
      this.setState({
        toast: true,
        spinner: false,
      });
      setTimeout(
        () =>
          this.setState({
            toast: false,
          }),
        3000,
      ); // hide toast after 5s
    } else {
      this.setState({
        spinner: false,
      });
      alert('Không thể kết nối vui lòng thử lại sau');
    }

    setTimeout(
      () =>
        this.setState({
          toast: false,
        }),
      5000,
    ); // hide toast after 5s
  };

  render() {
    return (
      <View style={styles.viewAccount}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Đang Xử Lý'}
          textStyle={{color: '#fff', zIndex: 0}}
          size="large"
        />
        <View style={styles.viewAccountInfo}>
          <View style={styles.viewPoliceName}>
            <View style={styles.mediaView}>
              <Icon name="user" size={35} color="#ffffff" />
            </View>
          </View>
          <View style={styles.viewInfo}>
            <View style={styles.viewLeft}>
              <Text style={styles.textName}>Điện thoại: </Text>
            </View>
            <View style={styles.viewRight}>
              <Text style={styles.textInfo}>{this.state.user.id}</Text>
            </View>
          </View>
          <View style={styles.viewInfo}>
            <View style={styles.viewLeft}>
              <Text style={styles.textName}>Tên: </Text>
            </View>
            <View style={styles.viewRight}>
              <Text style={styles.textInfo}>{this.state.user.name}</Text>
            </View>
          </View>
          <View style={styles.viewInfo}>
            <View style={styles.viewLeft}>
              <Text style={styles.textName}>Địa chỉ: </Text>
            </View>
            <View style={styles.viewRight}>
              <Text style={styles.textInfo}>{this.state.user.address}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default CitizenDetailScreen;
