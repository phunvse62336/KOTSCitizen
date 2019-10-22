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

export default class CreateSOSScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      height: 0,
      latitude: this.props.navigation.state.params.latitude,
      longitude: this.props.navigation.state.params.longitude,
      message: '',
    };
  }

  sendHelp = () => {
    alert(this.state.message);
  };

  // onChangeTextMessage = text => this.setState({message: text});

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewCase}>
          <Text style={styles.pickerText}>Trường Hợp</Text>
          <View style={styles.viewPicker}>
            <Picker
              selectedValue={this.state.language}
              style={styles.casePicker}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({language: itemValue})
              }>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>
        </View>
        <View style={styles.viewMessage}>
          <View style={styles.inputViewContainer}>
            <View style={styles.inputViewLabel}>
              <Text style={styles.colorText}>Tin Nhắn</Text>
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
              placeholder="Viết vài dòng cho hiệp sĩ"
            />
          </View>
        </View>
        <View style={styles.viewMedia}>
          <TouchableOpacity style={styles.mediaTouchable}>
            <Icon name="microphone" size={40} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mediaTouchable}>
            <Icon name="camera" size={40} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mediaTouchable}>
            <Icon name="video-camera" size={40} color="#ffffff" />
          </TouchableOpacity>
        </View>
        <View style={styles.viewButton}>
          <Button
            label="Yêu cầu giúp đỡ"
            title="Yêu cầu giúp đỡ"
            buttonTextStyle={styles.buttonHelpText}
            buttonStyle={styles.buttonHelp}
            buttonFunc={this.sendHelp}></Button>
        </View>
      </View>
    );
  }
}

export {CreateSOSScreen};
