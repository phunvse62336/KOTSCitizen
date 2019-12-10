import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import HeaderUI from '../../../Components/HeaderUI';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';
import {Colors} from '../../../Themes';

import Crime from '../../../Components/Crime';
import {APIGetCrime} from '../../../Services/APIGetCrime';
import {MESSAGES} from '../../../Utils/Constants';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
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
    flex: 1,
    width: width,
  },
  viewFlat: {
    flex: 1,
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
  textLoadMore: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textEndLoadMore: {
    textAlign: 'center',
    color: '#696969',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 10,
    marginTop: 10,
  },
  btnLoad: {
    backgroundColor: Colors.appColor,
    padding: 10,
    width: width * 0.3,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  Top1Description: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.appColor,
    marginTop: 10,
  },
});

class CrimeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crime: [],
    };
  }

  async componentDidMount() {
    this.setState({spinner: true});
    let responseStatus = await APIGetCrime();
    if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
      console.log(JSON.stringify(responseStatus));
      this.state.crime = responseStatus.data;
    } else {
      alert('Không thể kết nối vui lòng thử lại sau');
    }
  }

  _renderItem = ({item, index}) => (
    <Crime item={item} index={index} navigation={this.props.navigation} />
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewFlat}>
          <Text style={styles.Top1Description}>
            Danh sách tội phạm từ các vụ án
          </Text>
          <FlatList
            data={this.state.crime}
            extraData={this.state}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item}
            renderItem={this._renderItem}
          />
        </View>
      </View>
    );
  }
}

export default CrimeScreen;
