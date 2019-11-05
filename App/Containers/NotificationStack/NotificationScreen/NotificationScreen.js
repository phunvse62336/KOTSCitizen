import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('window');
import Colors from '../../../Themes/Colors';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

import Case from '../../../Components/Case';
import HeaderUI from '../../../Components/HeaderUI';
import {MESSAGES} from '../../../Utils/Constants';
import {APIGetCase} from '../../../Services/APIGetCase';
import NavigationService from '../../../Services/NavigationService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHidden: {
    textAlign: 'center',
    color: '#696969',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 10,
    marginTop: 10,
  },
});

export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
      case: [],
      phoneNumber: '',
      isRefreshing: false, //for pull to refresh
      item: this.props.navigation.getParam('item', null),
    };
  }

  componentDidMount = async () => {
    let phoneNumber = await AsyncStorage.getItem('PHONENUMBER');
    let responseStatus = await APIGetCase(phoneNumber);
    console.log('BEFORE ' + JSON.stringify(responseStatus));

    if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
      console.log(JSON.stringify(responseStatus));
      this.setState({
        case: responseStatus.data,
        spinner: false,
        phoneNumber: phoneNumber,
      });
    } else {
      this.setState({
        spinner: false,
        phoneNumber: phoneNumber,
      });
      alert('Vui lòng thử lại sau!!!!');
    }
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () =>
      this.onRefresh(),
    );
  };

  componentWillUnmount() {
    this.focusListener.remove();
  }

  async onRefresh() {
    let phoneNumber = await AsyncStorage.getItem('PHONENUMBER');
    this.setState({isRefreshing: true}); // true isRefreshing flag for enable pull to refresh indicator
    let responseStatus = await APIGetCase(phoneNumber);

    if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
      console.log(JSON.stringify(responseStatus));
      this.setState({
        case: responseStatus.data,
        spinner: false,
        phoneNumber: phoneNumber,
        isRefreshing: false,
      });
    } else {
      this.setState({
        spinner: false,
        phoneNumber: phoneNumber,
        isRefreshing: false,
      });
      alert('Vui lòng thử lại sau!!!!');
    }
  }

  _renderItem = ({item, index}) => (
    <Case
      item={item}
      index={index}
      navigation={this.props.navigation}
      phoneNumber={this.state.phoneNumber}
    />
  );

  render() {
    console.log(this.state.case);
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <HeaderUI title="Danh Sách Sự Cố Đã Gửi" />
        {this.state.spinner === true ? (
          <Spinner
            visible={this.state.spinner}
            textContent={'Đang Xử Lý'}
            textStyle={{color: '#fff'}}
            size="large"
          />
        ) : Object.keys(this.state.case).length == 0 ? (
          <Text style={styles.textHidden}>Bạn chưa có sự có nào</Text>
        ) : (
          <FlatList
            data={this.state.case}
            extraData={this.state}
            showsVerticalScrollIndicator={false}
            renderItem={this._renderItem}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
          />
        )}
      </View>
    );
  }
}
export {NotificationScreen};
