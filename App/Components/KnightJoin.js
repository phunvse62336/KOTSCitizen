import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('window');
import Colors from '../Themes/Colors';

const styles = StyleSheet.create({
  viewAccount: {
    flex: 1,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.appColor,
    marginTop: 15,
  },
  viewAccountInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textName: {
    fontSize: 18,
    color: Colors.appColor,
    marginBottom: 5,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  textInfo: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 2,
  },
  viewInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  viewLeft: {
    width: '20%',
  },
  viewRight: {
    width: '80%',
  },
  viewPoliceName: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: Colors.appColor,
    width: width * 0.9,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 11,
    paddingTop: 6,
    paddingBottom: 6,
  },
  textPoliceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default class KnightJoin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {item} = this.props;
    return (
      <View style={styles.viewAccount}>
        <View style={styles.viewAccountInfo}>
          <View style={styles.viewInfo}>
            <View style={styles.viewLeft}>
              {/* <Text style={styles.textName}>Tên: </Text> */}
              <Text style={styles.textName}>Hiệp sĩ: </Text>
            </View>
            <View style={styles.viewRight}>
              {/* <Text style={styles.textInfo}>{item.name}</Text> */}
              <Text style={styles.textInfo}>{item.knightInfo}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export {KnightJoin};