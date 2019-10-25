import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';
import io from 'socket.io-client/dist/socket.io';
import AsyncStorage from '@react-native-community/async-storage';

import {HeaderUI, Button} from '../../../Components';
import styles from './CreateProfileScreenStyles';
import {Colors} from '../../../Themes';
import {Date} from 'core-js';

import {APIUpdateCitizenProfile} from '../../../Services/APIUpdateCitizenProfile';
import {MESSAGES} from '../../../Utils/Constants';

const {height, width} = Dimensions.get('window');

const GenderData = ['Nữ', 'Nam', 'Khác'];

export class CreateProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      name: '',
      gender: undefined,
      address: '',
      dayOfBirth: moment(),
      token: '',
    };
  }

  onChangeTextName = text => this.setState({name: text});

  onChangeTextAddress = text => this.setState({address: text});

  onGenderClick = indexValue => {
    this.setState({gender: indexValue});
  };

  renderButton = (currentGender, indexGender, onPress) => (
    <TouchableOpacity
      onPress={() => onPress(indexGender)}
      style={
        currentGender === indexGender
          ? styles.selectedButton
          : styles.disabledButton
      }>
      <Text
        style={
          currentGender === indexGender
            ? styles.selecctedText
            : styles.disabledText
        }>
        {GenderData[indexGender]}
      </Text>
    </TouchableOpacity>
  );

  onUpdate = async () => {
    const {phoneNumber, name, address, gender} = this.state;
    this.setState({spinner: true});
    let responseStatus = await APIUpdateCitizenProfile(
      phoneNumber,
      name,
      address,
      gender,
    );
    if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
      console.log(JSON.stringify(responseStatus));
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
      await AsyncStorage.setItem('REGISTER', '1');
      await AsyncStorage.setItem('PHONENUMBER', this.state.phoneNumber);
      await AsyncStorage.setItem('CITIZENNAME', this.state.name);
      this.props.navigation.navigate('AppNavigator');
    } else {
      this.setState({
        spinner: false,
      });
      alert('Không gửi được. Vui lòng thử lại sau');
    }

    setTimeout(
      () =>
        this.setState({
          toast: false,
        }),
      5000,
    ); // hide toast after 5s
  };

  componentDidMount() {
    // let phoneNumber = await AsyncStorage.getItem('');
    AsyncStorage.getItem('fcmToken').then(fcmtoken => {
      this.setState({
        token: fcmtoken,
      });
    });
    AsyncStorage.getItem('PHONENUMBER').then(phone => {
      this.setState({
        phoneNumber: phone,
      });
    });
  }

  render() {
    const {gender} = this.state;
    let date = moment();
    return (
      <SafeAreaView style={styles.container}>
        <HeaderUI />
        <View style={styles.inputViewContainer}>
          <View style={styles.inputViewLabel}>
            <Text style={styles.colorText}>Họ Tên</Text>
          </View>
          <TextInput
            style={styles.inputView}
            keyboardType="email-address"
            onChangeText={this.onChangeTextName}
          />
        </View>
        <View style={styles.inputViewContainer}>
          <View style={styles.inputViewLabel}>
            <Text style={styles.colorText}>Địa Chỉ</Text>
          </View>
          <TextInput
            style={styles.inputView}
            keyboardType="email-address"
            onChangeText={this.onChangeTextAddress}
          />
        </View>
        <View style={styles.buttonGroupContainer}>
          <Text style={styles.colorText}>Giới tính</Text>
          <View style={styles.buttonGroupView}>
            {this.renderButton(gender, 0, this.onGenderClick)}
            <View style={{width: 5}} />
            {this.renderButton(gender, 1, this.onGenderClick)}
            <View style={{width: 5}} />
            {this.renderButton(gender, 2, this.onGenderClick)}
          </View>
        </View>
        <DatePicker
          style={{width: 200}}
          date={this.state.dayOfBirth}
          mode="date"
          androidMode="spinner"
          placeholder="select date"
          format="DD-MM-YYYY"
          maxDate={date}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          style={{
            marginTop: 25,
            width: width * 0.8,
            alignItems: 'center',
          }}
          customStyles={{
            dateInput: {
              borderRadius: 10,
              borderColor: Colors.appColor,
              borderWidth: 2,
              height: 44,
            },
            dateText: {color: Colors.appColor},
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            this.setState({dayOfBirth: date});
          }}
        />
        <Button
          label="Cập Nhật"
          buttonTextStyle={styles.updateTextButton}
          buttonStyle={styles.updateButton}
          buttonFunc={this.onUpdate}
        />
      </SafeAreaView>
    );
  }
}

export default CreateProfileScreen;
