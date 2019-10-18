import React, { Component } from 'react';
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
    alignItems: 'center'
  },
  viewTitle:{
    width: width*0.9,
  },
  viewTime:{
    width: width*0.9,
  },
  viewDescription:{
    width: width*0.9,
  },
  textTitle:{
    fontSize: 25,
    textAlign: 'justify',
  },
  textTime:{
    fontSize: 13,
    marginBottom: 10,
  },
  textDescription:{
    fontSize: 17,
    textAlign: 'justify',
  },
  imageNews:{
    height: height*0.3,
    width: width
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
        
          <ScrollView >
            <View style={styles.container}>
              <Image
                source= {{uri:this.state.item.image}}
                style={styles.imageNews}
              />
              <View style={styles.viewTitle}>
                <Text style={styles.textTitle}>{this.state.item.title}</Text>
              </View>
              <View style={styles.viewTime}>
                <Text style={styles.textTime}>{this.state.item.date}</Text>
              </View>
              <View style={styles.viewDescription}>
                <Text style={styles.textDescription}>{this.state.item.description}
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                </Text>
              </View>
            </View>
          </ScrollView>
        
      
    );
  }
}
