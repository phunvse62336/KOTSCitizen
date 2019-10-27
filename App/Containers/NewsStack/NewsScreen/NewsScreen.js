import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import HeaderUI from '../../../Components/HeaderUI';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';

import News from '../../../Components/News';
import {APIGetNews} from '../../../Services/APIGetNews';
import {MESSAGES} from '../../../Utils/Constants';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  viewImage: {
    height: height * 0.4,
    width: width,
  },
  viewNews: {
    flex: 0.6,
    width: width,
  },
  viewFlat: {
    flex: 0.6,
    width: width,
  },
  textOverImageColor: {
    fontSize: 20,
    color: '#ffffff',
  },
  textOverImage: {
    position: 'absolute',
    top: '70%',
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    left: 0,
    right: 0,
    bottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  newsContainer: {
    height: height * 0.2,
    marginTop: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: '#000000',
    borderTopColor: '#000000',
    flexDirection: 'row',
  },
  newsImageContainer: {
    flex: 0.4,
    padding: 10,
  },
  newsImage: {
    flex: 1,
    height: '100%',
    resizeMode: 'stretch',
  },
  newsDescription: {
    flex: 0.6,
    padding: 5,
  },
  topDescription: {
    flex: 0.8,
    fontSize: 13,
  },
  bottomDescription: {
    flex: 0.2,
  },
  containerScrollView: {
    height: '100%',
  },
});

export default class NewsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      toast: false,
      spinner: false,
      news: [],
    };
  }

  async componentDidMount() {
    this.setState({spinner: true});
    let responseStatus = await APIGetNews();
    if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
      console.log(JSON.stringify(responseStatus));
      this.state.news = responseStatus.data;
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
      alert('Không thể kết nối vui lòng thử lại sau');
    }

    setTimeout(
      () =>
        this.setState({
          toast: false,
        }),
      5000,
    ); // hide toast after 5s
  }

  _renderItem = ({item, index}) => (
    <News item={item} index={index} navigation={this.props.navigation} />
  );

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Đang Xử Lý'}
          textStyle={{color: '#fff', zIndex: 0}}
          size="large"
        />
        <HeaderUI title="Tin Tức" />
        <ScrollView style={styles.containerScrollView}>
          <View style={styles.viewImage}>
            <ImageBackground
              source={{
                uri:
                  'https://znews-photo.zadn.vn/w660/Uploaded/ngotgs/2019_10_14/a_1.jpg',
              }}
              style={styles.bannerImage}>
              <View style={styles.textOverImage}>
                <Text style={styles.textOverImageColor}>
                  Công an Hà Nội bổ sung 15 tổ cảnh sát 141
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.viewFlat}>
            <FlatList
              data={this.state.news}
              extraData={this.state}
              showsVerticalScrollIndicator={false}
              renderItem={this._renderItem}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export {NewsScreen};
