import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import PhoneInput from 'react-native-phone-input';
import firebase from 'react-native-firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import io from 'socket.io-client/dist/socket.io';
import AsyncStorage from '@react-native-community/async-storage';

import {APIFindUser} from '../../../Services/APIFindUser';
import {MESSAGES} from '../../../Utils/Constants';

import {Button} from '../../../Components';
import styles from './RegisterScreenStyles';
import {Images, Colors} from '../../../Themes';

const {width, height} = Dimensions.get('screen');

export class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      phoneNumber: '',
    };
  }
  register = async () => {
    if (this.state.phoneNumber !== '' && this.phone.isValidNumber() === true) {
      const phoneNumber = this.state.phoneNumber.replace(/\s/g, '');
      let responseStatus = await APIFindUser(phoneNumber);
      if (responseStatus.result === MESSAGES.CODE.FAILED_CODE) {
        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber)
          .then(confirmResult => {
            this.setState({loading: false});
            this.props.navigation.navigate('ConfirmScreen', {
              phoneNumber: this.state.phoneNumber,
              name: '',
              action: 'register',
              confirmResult: confirmResult,
            });
          })
          .catch(error => {
            this.setState({loading: false});
            alert(error);
          });
      } else {
        Alert.alert('Số điện đã tồn tại', '');
      }
    } else {
      this.setState({loading: false});
      Alert.alert('Số điện thoại không đúng', '');
    }
  };

  componentDidMount() {
    this.phone.focus();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewLogo}>
          <Image source={Images.logoApp} style={styles.logo} />
        </View>
        <View style={styles.viewForm}>
          <View style={styles.viewInput}>
            <Feather name="phone" color={Colors.appColor} size={30} />
            <PhoneInput
              onChangePhoneNumber={text => {
                this.setState({phoneNumber: text});
              }}
              value={
                this.state.phoneNumber === '' ? '+84' : this.state.phoneNumber
              }
              ref={ref => {
                this.phone = ref;
              }}
              flagStyle={{display: 'none'}}
              style={styles.phoneInput}
              textStyle={styles.colorApp}
            />
          </View>
          <Button
            buttonTextStyle={styles.registerTextButton}
            buttonStyle={styles.registerButton}
            label="Đăng Ký"
            buttonFunc={this.register}
          />
        </View>
        <View style={styles.viewFooter}>
          <View style={styles.inlineViewFooter}>
            <Text style={styles.textFooter}>
              Bằng việc sử dụng ứng dụng, bạn đồng ý rằng bạn đã đọc,{'\n'}hiểu
              và chấp thuận Điều Khoản Sử Dụng
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default RegisterScreen;
