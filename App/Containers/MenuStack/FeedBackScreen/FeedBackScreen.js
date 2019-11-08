import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Picker,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('window');
import Colors from '../../../Themes/Colors';
import Button from '../../../Components/Button';
import {placeholder} from '@babel/types';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';
import {APISendFeedback} from '../../../Services/APISendFeedback';
import {MESSAGES} from '../../../Utils/Constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  viewCase: {
    flex: 0.2,
    width: width * 0.8,
    // backgroundColor: '#00fa9a',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  viewMessage: {
    flex: 0.4,
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewMedia: {
    flex: 0.2,
    width: width,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  viewButton: {
    flex: 0.2,
    width: width * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  casePicker: {
    height: 40,
    width: '100%',
  },
  viewPicker: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.appColor,
    overflow: 'hidden',
  },
  pickerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.appColor,
  },
  inputMessage: {
    width: '100%',
    height: 100,
  },
  mediaTouchable: {
    marginRight: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: Colors.appColor,
    borderRadius: 50,
  },
  buttonHelp: {
    width: '100%',
    backgroundColor: Colors.appColor,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonHelpText: {
    color: 'white',
    fontSize: 18,
  },
  inputViewContainer: {
    height: '100%',
    position: 'relative',
    marginTop: 25,
  },
  inputViewLabel: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: -15,
    left: 15,
    padding: 5,
    zIndex: 0,
  },
  inputView: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.appColor,
    borderRadius: 10,
    paddingHorizontal: 20,
    width: width * 0.8,
    fontSize: 15,
    color: Colors.appColor,
    zIndex: -1,
    textAlignVertical: 'top',
  },
  colorText: {
    color: Colors.appColor,
  },
});

class FeedBackScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      phoneNumber: '',
      message: '',
      loading: false,
      toast: false,
      spinner: false,
    };
  }

  sendFeedBack = async () => {
    const {phoneNumber, message} = this.state;
    this.setState({spinner: true});
    let responseStatus = await APISendFeedback(phoneNumber, message);
    if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
      console.log(JSON.stringify(responseStatus));
      this.setState({
        toast: true,
        spinner: false,
      });
      this.props.navigation.goBack();
      setTimeout(
        () =>
          this.setState({
            toast: false,
          }),
        3000,
      ); // hide toast after 5s
    }
  };

  componentDidMount = async () => {
    let phone = await AsyncStorage.getItem('PHONENUMBER');
    this.setState({phoneNumber: phone});
  };

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Đang Xử Lý'}
          textStyle={{color: '#fff'}}
          size="large"
        />
        <Toast
          visible={this.state.toast}
          position={Toast.positions.CENTER}
          shadow={false}
          animation={false}
          hideOnPress={true}>
          Gửi Thành Công
        </Toast>
        <View style={styles.viewMessage}>
          <View style={styles.inputViewContainer}>
            <View style={styles.inputViewLabel}>
              <Text style={styles.colorText}>Phản hồi</Text>
            </View>
            <TextInput
              style={[
                styles.inputView,
                {height: Math.max(35, this.state.height)},
              ]}
              multiline={true}
              onChangeText={text => this.setState({message: text})}
              onContentSizeChange={event => {
                this.setState({height: event.nativeEvent.contentSize.height});
              }}
              placeholder="Viết phản hồi của bạn"
            />
          </View>
        </View>
        <View style={styles.viewButton}>
          <Button
            label="Gửi phản hồi"
            title="Gửi phản hồi"
            buttonTextStyle={styles.buttonHelpText}
            buttonStyle={styles.buttonHelp}
            buttonFunc={this.sendFeedBack}></Button>
        </View>
      </View>
    );
  }
}

export default FeedBackScreen;
