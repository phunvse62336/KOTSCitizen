import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import MapView, {Marker, Callout, AnimatedRegion} from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import Spinner from 'react-native-loading-spinner-overlay';

import {MESSAGES} from '../../../Utils/Constants';

import CustomCallout from '../../../Components/CustomCallout';

import styles from './NotificationDetailScreenStyles';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class NotificationDetailScreen extends Component {
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
                  <Text>Liên hệ: {this.state.item.citizenId}</Text>
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
              <Text style={styles.buttonText}>
                {this.state.item.knightConfirmId}
              </Text>
            </View>
          </View>
          <View style={styles.viewRow}>
            <View>
              <Text style={styles.buttonText}>hiệp sĩ kết thúc: </Text>
            </View>
            <View>
              <Text style={styles.buttonText}>
                {this.state.item.knightCloseId}
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
