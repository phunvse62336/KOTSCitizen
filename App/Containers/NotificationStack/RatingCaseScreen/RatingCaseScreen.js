import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Picker,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('window');
import Colors from '../../../Themes/Colors';
import Button from '../../../Components/Button';
import {placeholder} from '@babel/types';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';
import {APIRatingCase} from '../../../Services/APIRatingCase';
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
    paddingTop: 20,
  },
  viewMessageRate: {
    flex: 0.1,
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
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
  inputViewPicker: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.appColor,
    borderRadius: 10,
    width: width * 0.7,
    fontSize: 15,
    color: Colors.appColor,
    zIndex: -1,
    textAlignVertical: 'top',
  },
  colorText: {
    color: Colors.appColor,
  },
});

class RatingCaseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.state.params.caseID,
      height: 0,
      rate: 1,
      message: '',
      loading: false,
      toast: false,
      spinner: false,
    };
  }

  ratingCase = () => {
    Alert.alert(
      'Gửi đánh giá',
      'Bạn chỉ được đánh giá 1 lần, bạn có chắc gửi đánh giá này',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: 'Xác Nhận',
          onPress: () => {
            this.sendRating();
          },
        },
      ],
      {cancelable: false},
    );
  };

  sendRating = async () => {
    const {id, rate, message} = this.state;
    this.setState({spinner: true});
    let responseStatus = await APIRatingCase(id, rate, message);
    if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
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
    }
    if (responseStatus.result === MESSAGES.CODE.FAILED_CODE) {
      this.setState({
        spinner: false,
      });
      alert(responseStatus.message);
    }
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
        <View style={styles.viewMessageRate}>
          <View style={styles.inputViewContainer}>
            <View style={styles.inputViewLabel}>
              <Text style={styles.colorText}>Mức đánh giá</Text>
            </View>
            <View style={styles.inputView}>
              <Picker
                selectedValue={this.state.rate}
                style={styles.inputViewPicker}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({rate: itemValue})
                }>
                <Picker.Item label="Xấu" value="1" />
                <Picker.Item label="Trung Bình" value="2" />
                <Picker.Item label="Tốt" value="3" />
              </Picker>
            </View>
          </View>
        </View>
        <View style={styles.viewMessage}>
          <View style={styles.inputViewContainer}>
            <View style={styles.inputViewLabel}>
              <Text style={styles.colorText}>Ghi chú thêm</Text>
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
              placeholder="Các ghi chú thêm của bạn"
            />
          </View>
        </View>
        <View style={styles.viewButton}>
          <Button
            label="Gửi đánh giá"
            title="Gửi đánh giá"
            buttonTextStyle={styles.buttonHelpText}
            buttonStyle={styles.buttonHelp}
            buttonFunc={this.ratingCase}></Button>
        </View>
      </View>
    );
  }
}

export default RatingCaseScreen;
