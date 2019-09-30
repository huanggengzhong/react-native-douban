import React, {Component} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
export default class Movie extends Component {
  state = {
    isLoading: true, //是否正在加载
    inTheatersList: [], //正在热映的数据
    comingSoonList: [], //即将上映的数据
    top250List: [], //top250的数据
  };
  componentDidMount() {
    Promise.all([
      fetch('https://douban.uieee.com/v2/movie/in_theaters').then(response => {
        return response.json();
      }),
      fetch('https://douban.uieee.com/v2/movie/coming_soon').then(response => {
        return response.json();
      }),
      fetch('https://douban.uieee.com/v2/movie/top250').then(response => {
        return response.json();
      }),
    ]).then(result => {
      console.log(result); //得到上面三个数据
      this.setState({
        isLoading: false,
        inTheatersList: result[0],
        comingSoonList: result[1],
        top250List: result[2],
      });
    });
  }
  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    } else {
      return (
        <View>
          <Text>{this.state.inTheatersList.title}</Text>
          <Text>{this.state.comingSoonList.title}</Text>
          <Text>{this.state.top250List.title}</Text>
        </View>
      );
    }
  }
}
