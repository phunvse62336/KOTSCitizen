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
import CodeInput from 'react-native-confirmation-code-input';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

import {APICreateCitizenProfile} from '../../../Services/APICreateCitizenProfile';
import {APILogin} from '../../../Services/APILogin';
import {MESSAGES} from '../../../Utils/Constants';

import {Images, Colors} from '../../../Themes';
import styles from './ConfirmScreenStyles';
import {Button} from '../../../Components';
import {thisExpression} from '@babel/types';

const {width, height} = Dimensions.get('screen');

export class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: this.props.navigation.state.params.name,
      phoneNumber: this.props.navigation.state.params.phoneNumber,
      action: this.props.navigation.state.params.action,
      token: '',
      user: this.props.navigation.state.params.user,
      confirmResult: this.props.navigation.state.params.confirmResult,
    };
  }

  confirm = async () => {
    console.log(this.state.action);
    const {phoneNumber, token} = this.state;
    if (this.state.action === 'login') {
      let user = JSON.stringify(this.state.user);
      let responseStatus = await APILogin(phoneNumber, token);
      if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
        await AsyncStorage.setItem('LOGIN', '1');
        await AsyncStorage.setItem('PHONENUMBER', this.state.phoneNumber);
        await AsyncStorage.setItem('USER', user);
        this.props.navigation.navigate('AppNavigator');
      }
    }
    if (this.state.action === 'register') {
      let responseStatus = await APICreateCitizenProfile(phoneNumber, token);
      if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
        AsyncStorage.setItem('PHONENUMBER', this.state.phoneNumber);
        this.props.navigation.navigate('CreateProfile');
      }
    }
    if (this.state.action === 'updateProfile') {
      AsyncStorage.setItem('PHONENUMBER', this.state.phoneNumber);
      this.props.navigation.navigate('CreateProfile');
    }
  };

  _onFulfill(code) {
    this.setState({loading: true});
    const {confirmResult} = this.state;
    if (confirmResult && code.length) {
      confirmResult
        .confirm(code)
        .then(async user => {
          this.setState({loading: false});
          this.confirm();
        })
        .catch(error => {
          this.setState({loading: false});
          Alert.alert('Confirmation Code', 'Code not match!', [{text: 'OK'}], {
            cancelable: false,
          });
          this.refs.codeInput.clear();
        });
    }
  }

  componentDidMount = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    this.setState({token: fcmToken});
  };

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.loading}
          textStyle={{color: '#fff'}}
          size="large"
        />
        <View style={styles.viewHeader}>
          <View style={styles.alignCenter}>
            <Text style={styles.helloText}>Xin Chào</Text>
            <Text style={styles.sendText}>
              Chúng tôi đã gửi mã xác nhận đến{'\n'}số điện thoại của bạn
            </Text>
            <Text style={styles.phoneText}>
              Gửi đến {this.state.phoneNumber}
            </Text>
          </View>
        </View>
        <View style={styles.viewCodeInput}>
          <CodeInput
            ref="codeInput"
            codeLength={6}
            space={3}
            size={50}
            inputPosition="left"
            keyboardType="numeric"
            onFulfill={code => this._onFulfill(code)}
            containerStyle={styles.containerCodeInput}
            codeInputStyle={styles.codeInput}
          />

          <Button
            buttonTextStyle={styles.registerText}
            buttonStyle={styles.registerButton}
            label="Xác Nhận"
            buttonFunc={this.confirm}
          />
        </View>
        <View style={styles.viewFooter}>
          <View style={styles.inlineViewFooter}>
            <Text>Không nhận được mã? </Text>
            <Button buttonTextStyle={styles.textFooter} label="Gửi Lại" />
          </View>
        </View>
      </View>
    );
  }
}

export default SignInScreen;
