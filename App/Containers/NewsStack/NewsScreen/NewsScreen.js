import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from 'react-native';
import HeaderUI from '../../../Components/HeaderUI';
import News from '../../../Components/News';

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
    flex: 0.4,
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
});

const NEWS = [
  {
    id: 1,
    title: 'Công an Hà Nội bổ sung 15 tổ cảnh sát 141',
    date: '2019-10-23T12:59-0500',
    source: 'vnexpress.vn',
    image:
      'https://znews-photo.zadn.vn/w660/Uploaded/ngotgs/2019_10_14/a_1.jpg',
    subDescription:
      'Từ ngày mai (15/10), Công an Hà Nội sẽ có thêm 15 tổ cảnh sát 141 hoạt động ở 12 quận và 3 huyện. Họ được trang bị bộ đàm, súng bắn đạn cao su, dùi cui điện, khóa số 8... ',
    description:
      'Công an Hà Nội sẽ có thêm 15 tổ cảnh sát 141 hoạt động ở 12 quận và 3 huyện. Họ được trang bị bộ đàm, súng bắn đạn cao su, dùi cui điện, khóa số 8...Công an Hà Nội sẽ có thêm 15 tổ cảnh sát 141 hoạt động ở 12 quận và 3 huyện. Họ được trang bị bộ đàm, súng bắn đạn cao su, dùi cui điện, khóa số 8... ',
  },
  {
    id: 2,
    title: 'Công an Hà Nội bổ sung 15 tổ cảnh sát 141',
    date: '2019-10-23',
    source: 'vnexpress.vn',
    image:
      'https://znews-photo.zadn.vn/w660/Uploaded/ngotgs/2019_10_14/a_1.jpg',
    subDescription:
      'Từ ngày mai (15/10), Công an Hà Nội sẽ có thêm 15 tổ cảnh sát 141 hoạt động ở 12 quận và 3 huyện. Họ được trang bị bộ đàm, súng bắn đạn cao su, dùi cui điện, khóa số 8... ',
    description:
      'Công an Hà Nội sẽ có thêm 15 tổ cảnh sát 141 hoạt động ở 12 quận và 3 huyện. Họ được trang bị bộ đàm, súng bắn đạn cao su, dùi cui điện, khóa số 8...Công an Hà Nội sẽ có thêm 15 tổ cảnh sát 141 hoạt động ở 12 quận và 3 huyện. Họ được trang bị bộ đàm, súng bắn đạn cao su, dùi cui điện, khóa số 8... ',
  },
  {
    id: 3,
    title: 'Công an Hà Nội bổ sung 15 tổ cảnh sát 141',
    date: '2019-10-23',
    source: 'vnexpress.vn',
    image:
      'https://znews-photo.zadn.vn/w660/Uploaded/ngotgs/2019_10_14/a_1.jpg',
    subDescription:
      'Từ ngày mai (15/10), Công an Hà Nội sẽ có thêm 15 tổ cảnh sát 141 hoạt động ở 12 quận và 3 huyện. Họ được trang bị bộ đàm, súng bắn đạn cao su, dùi cui điện, khóa số 8... ',
    description:
      'Công an Hà Nội sẽ có thêm 15 tổ cảnh sát 141 hoạt động ở 12 quận và 3 huyện. Họ được trang bị bộ đàm, súng bắn đạn cao su, dùi cui điện, khóa số 8...Công an Hà Nội sẽ có thêm 15 tổ cảnh sát 141 hoạt động ở 12 quận và 3 huyện. Họ được trang bị bộ đàm, súng bắn đạn cao su, dùi cui điện, khóa số 8... ',
  },
];

export default class NewsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: NEWS,
    };
  }

  _renderItem = ({item, index}) => (
    <News item={item} index={index} navigation={this.props.navigation} />
  );

  render() {
    return (
      <View style={styles.container}>
        <HeaderUI title="Tin Tức" />
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
            data={NEWS}
            extraData={this.state}
            showsVerticalScrollIndicator={false}
            renderItem={this._renderItem}
          />
        </View>
      </View>
    );
  }
}

export {NewsScreen};
