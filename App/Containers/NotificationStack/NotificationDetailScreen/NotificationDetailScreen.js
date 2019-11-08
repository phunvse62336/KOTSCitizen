import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';

import MapView, {Marker, Callout, AnimatedRegion} from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import Spinner from 'react-native-loading-spinner-overlay';

import {MESSAGES} from '../../../Utils/Constants';
import {APICancelCase} from '../../../Services/APICancelCase';

import CustomCallout from '../../../Components/CustomCallout';
import Colors from '../../../Themes/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './NotificationDetailScreenStyles';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class NotificationDetailScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
      headerTitle: 'Sự cố #321',
      headerTintColor: Colors.appColor,
      headerTitleStyle: {color: Colors.appColor, fontWeight: 'bold'},
      headerRight: (
        <View>
          {navigation.getParam('item').status === 1 && (
            <TouchableOpacity
              onPress={() => params.handleRemove()}
              style={{paddingRight: 20}}>
              <Icon name="remove" color="red" size={30} />
            </TouchableOpacity>
          )}
          {navigation.getParam('item').status === 0 && (
            <TouchableOpacity
              onPress={() => params.handleRemove()}
              style={{paddingRight: 20}}>
              <Icon name="remove" color="red" size={30} />
            </TouchableOpacity>
          )}
        </View>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      isMapReady: false,
      item: this.props.navigation.state.params.item,
      phoneNumber: this.props.navigation.state.params.phoneNumber,
      latitude: parseFloat(
        this.props.navigation.state.params.item.startLatitude,
      ),
      longitude: parseFloat(
        this.props.navigation.state.params.item.startLongitude,
      ),
      address: '',
    };
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  cancelCase = () => {
    Alert.alert(
      'Đóng Sự Cố',
      'Bạn có chắc sẽ hủy sự cố này!',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: 'Xác Nhận',
          onPress: () => {
            this.cancelCaseCall();
          },
        },
      ],
      {cancelable: false},
    );
  };

  cancelCaseCall = async () => {
    const {item} = this.state;
    this.setState({spinner: true});
    let responseStatus = await APICancelCase(item.id, 5);
    if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
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

  onMapLayout = () => {
    this.setState({isMapReady: true});
  };

  getAddressFromPosition = () => {
    let position = {
      lat: this.state.latitude,
      lng: this.state.longitude,
    };
    // alert(JSON.stringify(position));

    Geocoder.geocodePosition(position)
      .then(res => {
        this.setState({address: res[0].formattedAddress});
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    // alert(JSON.stringify(this.state.item));
    this.props.navigation.setParams({handleRemove: this.cancelCase});
    this.getAddressFromPosition();
  }

  render() {
    const {longitude, latitude} = this.state;
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Đang Xử Lý'}
          textStyle={{color: '#fff'}}
          size="large"
        />
        <MapView
          style={styles.map}
          showUserLocation
          followUserLocation
          loadingEnabled
          onLayout={this.onMapLayout}
          region={this.getMapRegion()}>
          {this.state.isMapReady && (
            <Marker
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={{longitude, latitude}}>
              <Callout tooltip>
                <CustomCallout>
                  <Text style={{fontSize: 18}}>Thông tin tín hiệu</Text>
                  <Text>Nội dung: {this.state.item.message}</Text>
                  <Text>Người gửi: {this.state.item.citizenId}</Text>
                </CustomCallout>
              </Callout>
            </Marker>
          )}
        </MapView>
        <View style={styles.viewButton}>
          <View style={styles.viewRow}>
            <View>
              <Text style={styles.buttonText}>hiệp sĩ nhận: </Text>
            </View>
            <View>
              {this.state.item.knightConfirmId === null && (
                <Text style={styles.buttonText}>Đang cập nhật</Text>
              )}
              {this.state.item.knightConfirmId !== null && (
                <Text style={styles.buttonText}>
                  {this.state.item.knightConfirmId}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.viewRow}>
            <View>
              <Text style={styles.buttonText}>hiệp sĩ kết thúc: </Text>
            </View>
            <View>
              <Text style={styles.buttonText}>
                {this.state.item.knightCloseId === null && (
                  <Text style={styles.buttonText}>Đang cập nhật</Text>
                )}
                {this.state.item.knightCloseId !== null && (
                  <Text style={styles.buttonText}>
                    {this.state.item.knightCloseId}
                  </Text>
                )}
              </Text>
            </View>
          </View>
        </View>
        {/* {this.state.item.case_detail.map((item, key) => (
          <View style={styles.viewButton}>
            <View>
              <Text style={styles.buttonText}>hiệp sĩ nhận:</Text>
            </View>
            <View>
              <Text style={styles.buttonText}>{this.state.item.knightConfirmId}</Text>
            </View>
          </View>
        ))} */}
      </View>
    );
  }
}
// export default NotificationDetailScreen;
