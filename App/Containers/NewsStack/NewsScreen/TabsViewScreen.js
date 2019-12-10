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

// const NewsRoute = () => <News style={[styles.scene]} navigation={navigation} />;

// const CrimeRoute = () => <Crime style={[styles.scene]} />;

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

  renderScene = ({route}) => {
    const {navigation} = this.props;
    switch (route.key) {
      case 'news':
        return <News style={[styles.scene]} navigation={navigation} />;
      case 'crime':
        return <Crime style={[styles.scene]} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this.renderScene}
        onIndexChange={index => this.setState({index})}
        initialLayout={{width: Dimensions.get('window').width}}
        indicatorStyle={{backgroundColor: '#1662BD'}}
      />
    );
  }
}

export default TabsViewScreen;
