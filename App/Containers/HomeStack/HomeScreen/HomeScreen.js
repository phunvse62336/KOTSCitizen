import React, {Component} from 'react';
import {
  Text,
  View,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Button,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {FloatingAction} from 'react-native-floating-action';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';
import io from 'socket.io-client/dist/socket.io';
import AsyncStorage from '@react-native-community/async-storage';

import {APISendSOS} from '../../../Services/APISendSOS';
import {MESSAGES} from '../../../Utils/Constants';
import {Images} from '../../../Themes';
import styles from './HomeScreenStyles';
const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 10.782546;
const LONGITUDE = 106.650416;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const socketURL = 'http://localhost:4333';
console.ignoredYellowBox = ['Setting a timer'];

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.socket = io(socketURL);

    this.state = {
      phoneNumber: '',
      markerCoordinates: [],
      loading: false,
      toast: false,
      latitude: LATITUDE,
      longitude: LONGITUDE,
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
    };

    // Replace "X" with your PubNub Keys
  }

  async componentDidMount() {
    let phoneNumber = await AsyncStorage.getItem('PHONENUMBER');
    const socket = this.socket;
    if (!socket) {
      return;
    }
    socket.on('disconnect', () => console.log('DISCONNECT2'));
    this.socket.on('locationUpdated', locationState => {
      const newMarkerCoordinates = Object.values(locationState).map(item => ({
        latitude: item.lat,
        longitude: item.lng,
      }));
      this.setState({markerCoordinates: newMarkerCoordinates});
      console.log(locationState);
    });
    // this.socket.on('updatelocation', socket => {
    //   console.log('CONNECTED');
    // });
    this.watchLocation();
  }

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  watchLocation = () => {
    const {coordinate} = this.state;

    this.watchID = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;

        const newCoordinate = {
          latitude,
          longitude,
        };

        if (Platform.OS === 'android') {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              500,
            ); // 500 is the duration to animate the marker
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }

        this.setState({
          latitude,
          longitude,
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 30,
      },
    );
  };

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  sendSOS = async name => {
    const {longitude, latitude, phoneNumber} = this.state;
    if (name === 'bt_sos') {
      this.setState({spinner: true});
      let responseStatus = await APISendSOS(phoneNumber, longitude, latitude);
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
    } else {
      this.props.navigation.navigate('CreateSOSScreen', {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
      });
    }
  };

  renderMarkers = markerCoordinates => {
    return markerCoordinates.map((coord, index) => (
      <MapView.Marker
        key={index}
        image={Images.logoApp}
        centerOffset={{x: 25, y: 25}}
        anchor={{x: 0.5, y: 0.5}}
        coordinate={coord}
        title={`Truck ${index}`}
      />
    ));
  };

  render() {
    const {region, markerCoordinates} = this.state;

    const actions = [
      {
        text: 'Liên Hệ',
        icon: Images.phoneContact,
        name: 'bt_contact',
        position: 1,
        textColor: '#FFF',
        textBackground: 'transparent',
        textStyle: {fontSize: 18, fontWeight: 'bold'},
        buttonSize: 56,
        margin: 0,
        size: 50,
        textElevation: 0,
      },
      {
        text: 'Khẩn Cấp',
        color: '#FF2929',
        icon: Images.sosText,
        name: 'bt_sos',
        position: 2,
        textColor: '#fff',
        textBackground: 'transparent',
        textStyle: {fontSize: 18, fontWeight: 'bold'},
        buttonSize: 56,
        textElevation: 0,
        margin: 0,
        size: 50,
      },
    ];
    return (
      <SafeAreaView style={{flex: 1}}>
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
          <MapView
            style={styles.map}
            showUserLocation
            followUserLocation
            loadingEnabled
            region={this.getMapRegion()}>
            <Marker.Animated
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={this.state.coordinate}
            />
            {this.renderMarkers(markerCoordinates)}
          </MapView>
        </View>
        <FloatingAction
          color="#00BFFF"
          position="right"
          actions={actions}
          distanceToEdge={16}
          iconWidth={30}
          iconHeight={30}
          onPressItem={name => this.sendSOS(name)}
        />
      </SafeAreaView>
    );
  }
}

export default HomeScreen;
