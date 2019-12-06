import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
const {width, height} = Dimensions.get('window');
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';
import KnightJoin from '../../../Components/KnightJoin';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewPoliceList: {
    width: width * 0.9,
  },
});

class KnightJoinListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      knightList: this.props.navigation.state.params.knightList,
    };
  }

  _renderItem = ({item, index}) => (
    <KnightJoin item={item} index={index} navigation={this.props.navigation} />
  );

  render() {
    return (
      <View style={styles.container}>
        <View styles={styles.viewPoliceList}>
          {Object.keys(this.state.knightList).length == 0 ? (
            <Text style={styles.textHidden}>Đang chờ hiệp sĩ tham gia</Text>
          ) : (
            <FlatList
              data={this.state.knightList}
              extraData={this.state}
              showsVerticalScrollIndicator={false}
              renderItem={this._renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

export default KnightJoinListScreen;
