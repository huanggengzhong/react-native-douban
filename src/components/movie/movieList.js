//电影列表页面
import React, {Component} from 'react';
import {View, Text} from 'react-native';
class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props);

    return (
      <View>
        <Text>得到传递过来的值:</Text>
        <Text>
          得到传递过来的值:
          {this.props.navigation.state.params.title}--
          {this.props.navigation.state.params.movieType}
        </Text>
      </View>
    );
  }
}

export default MovieList;
