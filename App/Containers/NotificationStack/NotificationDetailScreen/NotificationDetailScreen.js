import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Linking,
  FlatList,
} from 'react-native';

import MapView, {Marker, Callout, AnimatedRegion} from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geocoder from 'react-native-geocoder';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import Sound from 'react-native-sound';

import {MESSAGES} from '../../../Utils/Constants';
import {APICancelCase} from '../../../Services/APICancelCase';

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
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => params.handleKnightTeam()}
                style={{paddingRight: 20}}>
                <Icon name="users" color="#1662BD" size={30} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => params.handleRemove()}
                style={{paddingRight: 20}}>
                <Icon name="remove" color="red" size={30} />
              </TouchableOpacity>
            </View>
          )}
          {navigation.getParam('item').status === 0 && (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => params.handleKnightTeam()}
                style={{paddingRight: 20}}>
                <Icon name="users" color="#1662BD" size={30} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => params.handleRemove()}
                style={{paddingRight: 20}}>
                <Icon name="remove" color="red" size={30} />
              </TouchableOpacity>
            </View>
          )}
          {navigation.getParam('item').status === 2 && (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => params.handleKnightTeam()}
                style={{paddingRight: 20}}>
                <Icon name="users" color="#1662BD" size={30} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => params.handleRating()}
                style={{paddingRight: 20}}>
                <Icon name="star" color="#1662BD" size={30} />
              </TouchableOpacity>
            </View>
          )}
          {navigation.getParam('item').status === 3 && (
            <View>
              <TouchableOpacity
                onPress={() => params.handleKnightTeam()}
                style={{paddingRight: 20}}>
                <Icon name="users" color="#1662BD" size={30} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => params.handleRating()}
                style={{paddingRight: 20}}>
                <Icon name="star" color="#1662BD" size={30} />
              </TouchableOpacity>
            </View>
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
      message: this.props.navigation.state.params.item.message,
      isModalVisible: false,
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
    this.props.navigation.setParams({
      handleRemove: this.cancelCase,
      handleRating: this._toggleRating,
      handleKnightTeam: this._toggleKnight,
    });
    this.getAddressFromPosition();
  }

  _toggleModal = () =>
    this.setState({isModalVisible: !this.state.isModalVisible});
  _toggleRating = () => {
    this.props.navigation.navigate('RatingCaseScreen', {
      caseID: this.state.item.id,
    });
  };
  _toggleKnight = () => {
    this.props.navigation.navigate('KnightJoinListScreen', {
      knightList: this.state.item.case_detail,
    });
  };

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
        <Modal
          isVisible={this.state.isModalVisible}
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={800}
          backdropTransitionOutTiming={800}>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ScrollView
              contentContainerStyle={
                this.state.item.image === null && this.state.item.sound === null
                  ? {justifyContent: 'center', flex: 1}
                  : {
                      justifyContent: 'center',
                    }
              }
              style={{flex: 1, width: width * 0.9, backgroundColor: 'white'}}>
              <View
                style={
                  this.state.item.image === null &&
                  this.state.item.sound === null
                    ? {
                        alignSelf: 'center',
                        width: width * 0.8,
                        justifyContent: 'center',
                      }
                    : {
                        alignSelf: 'center',
                        width: width * 0.8,
                        justifyContent: 'center',
                        marginBottom: 20,
                        marginTop: 20,
                      }
                }>
                <Text style={{fontSize: 20}}>Thông tin tín hiệu</Text>
                <Text style={{fontSize: 15, marginTop: 10}}>
                  Địa điểm: {this.state.address}
                </Text>
                <Text style={{fontSize: 15, marginTop: 10}}>
                  Tin nhắn: {this.state.item.message}
                </Text>
                {this.state.item.image === null ? null : (
                  <Image
                    style={styles.avatar}
                    source={{uri: this.state.item.image}}
                    resizeMode="contain"
                  />
                )}

                {this.state.item.sound && (
                  <TouchableOpacity
                    style={{
                      marginTop: 10,
                      width: 150,
                      height: 70,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: Colors.appColor,
                      borderRadius: 25,
                    }}
                    onPress={() => {
                      console.log(
                        JSON.stringify(this.state.item.sound) + ' props ne',
                      );

                      this.setState({
                        playAudio: true,
                      });

                      const sound = new Sound(
                        this.state.item.sound,
                        '',
                        error => {
                          if (error) {
                            console.log('failed to load the sound', error);
                          }
                          sound.play(success => {
                            this.setState({playAudio: false});

                            console.log(success, 'success play');
                            if (!success) {
                              Alert.alert(
                                'There was an error playing this audio',
                              );
                            }
                          });
                        },
                      );
                    }}>
                    <Ionicons
                      name="ios-play"
                      size={50}
                      color={this.state.playAudio ? 'red' : 'white'}
                    />
                  </TouchableOpacity>
                )}
                <View
                  style={{
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    width: width * 0.8,
                    alignItems: 'center',
                    marginTop: 30,
                  }}>
                  <TouchableOpacity
                    onPress={this._toggleModal}
                    style={styles.ignoreButton}>
                    <Text style={styles.buttonText}>Đóng</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal>
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
              <Callout onPress={this._toggleModal}>
                <Text style={{fontSize: 18}}>Thông tin tín hiệu</Text>
                <Text>Nội dung: {this.state.item.message}</Text>
                <Text>Người gửi: {this.state.item.citizenId}</Text>
                <Text
                  style={{
                    color: Colors.appColor,
                    textDecorationLine: 'underline',
                    alignSelf: 'center',
                  }}>
                  Xem Thêm
                </Text>
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
