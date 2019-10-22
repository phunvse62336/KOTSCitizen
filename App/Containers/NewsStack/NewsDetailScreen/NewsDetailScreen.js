import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  viewTitle: {
    width: width * 0.9,
    marginBottom: 10,
  },
  viewTime: {
    width: width * 0.9,
    flexDirection: 'row',
    marginBottom: 10,
  },
  viewSubDescription: {
    width: width * 0.9,
  },
  viewDescription: {
    width: width * 0.9,
  },
  textTitle: {
    fontSize: 25,
    textAlign: 'justify',
  },
  textDescription: {
    fontSize: 17,
    textAlign: 'justify',
  },
  imageNews: {
    height: height * 0.3,
    width: width * 0.9,
    marginBottom: 10,
  },
  textsubDescription: {
    fontSize: 18,
    color: '#696969',
  },
  textSource: {
    color: '#1e90ff',
    marginRight: 5,
    fontSize: 13,
  },
  textDate: {
    color: '#696969',
    fontSize: 13,
  },
});

export default class NewsDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.navigation.state.params.item,
    };
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.viewTitle}>
            <Text style={styles.textTitle}>{this.state.item.title}</Text>
          </View>
          <View style={styles.viewSubDescription}>
            <Text style={styles.textsubDescription}>
              {this.state.item.subDescription}
            </Text>
          </View>
          <View style={styles.viewTime}>
            <Text style={styles.textSource}>{this.state.item.source}</Text>
            <Text style={styles.textDate}>{this.state.item.date}</Text>
          </View>
          <Image
            source={{uri: this.state.item.image}}
            style={styles.imageNews}
          />

          <View style={styles.viewDescription}>
            <Text style={styles.textDescription}>
              {this.state.item.description}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
