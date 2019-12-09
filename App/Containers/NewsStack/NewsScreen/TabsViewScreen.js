import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import News from './NewsScreen';
import Crime from './CrimeScreen';

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

const NewsRoute = () => <News style={[styles.scene]} />;

const CrimeRoute = () => <Crime style={[styles.scene]} />;

class TabsViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {key: 'news', title: 'Tin Tức'},
        {key: 'crime', title: 'Tin Hiệp Sĩ'},
      ],
    };
  }

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          news: NewsRoute,
          crime: CrimeRoute,
        })}
        onIndexChange={index => this.setState({index})}
        initialLayout={{width: Dimensions.get('window').width}}
      />
    );
  }
}

export default TabsViewScreen;
