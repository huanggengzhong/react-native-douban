import React, {Component} from 'react';
import {Text, View, ActivityIndicator, ScrollView} from 'react-native';

//导入自己定义的无状态组件
import MovieTypeView from './../../view/MovieTypeView';

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
        isLoading: false, //是否正在加载
        inTheatersList: result[0].subjects,
        comingSoonList: result[1].subjects,
        top250List: result[2].subjects,
      });
    });
  }
  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    } else {
      return (
        <ScrollView>
          {/* 1.正在热映 */}
          <MovieTypeView
            title="正在热映"
            movieList={this.state.inTheatersList}
            movieType="in_theaters"
            navigation={this.props.navigation}
          />
          {/* 2.即将热映 */}
          <View style={{marginTop: 20}}>
            <MovieTypeView
              title="即将热映"
              movieList={this.state.comingSoonList}
              movieType="coming_soon"
              navigation={this.props.navigation}
            />
          </View>
          {/* top250 */}
          <View style={{marginTop: 20}}>
            <MovieTypeView
              title="top250"
              movieList={this.state.top250List}
              movieType="top250"
              navigation={this.props.navigation}
            />
          </View>
        </ScrollView>
      );
    }
  }
}
