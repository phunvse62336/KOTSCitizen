import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('window');
import Colors from '../Themes/Colors';

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
  textOverImageColor: {
    fontSize: 18,
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
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  newsContainer: {
    height: height * 0.2,
    marginTop: 10,
    width: width * 0.9,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.appColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
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
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomDescription: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textSource: {
    color: '#1e90ff',
    marginRight: 5,
  },
  textDate: {
    color: '#696969',
  },
  textBottomDescription: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textTopDescription: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

class Crime extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {item} = this.props;
    return (
      <View style={styles.newsContainer}>
        <View style={styles.newsImageContainer}>
          <Image style={styles.newsImage} source={{uri: item.image}} />
        </View>
        <View style={styles.newsDescription}>
          <View style={styles.topDescription}>
            <Text style={styles.textTopDescription}>{item.name}</Text>
          </View>
          <View style={styles.bottomDescription}>
            <Text style={styles.textBottomDescription}>Tuổi: </Text>
            <Text style={{fontSize: 16}}>{item.age}</Text>
          </View>
          {/* <View style={styles.bottomDescription}>
            <Text style={styles.textBottomDescription}>Hành vi: </Text>
            <Text>{item.crime}</Text>
          </View> */}
          {/* <View style={styles.bottomDescription}>
            <Text
              style={styles.textSource}
              onPress={() => Linking.openURL(item.unitlink)}>
              {item.source}
            </Text>
            <Moment fromNow locale="vi" element={Text} style={styles.textDate}>
              {item.created_at}
            </Moment>
          </View> */}
        </View>
      </View>
    );
  }
}

export default Crime;
