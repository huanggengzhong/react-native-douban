//电影详情页面
import React, {Component} from 'react';
import {View, Text, ActivityIndicator, ScrollView, Image} from 'react-native';
class MovieList extends Component {
  static navigationOptions = ({navigation}) => {
    console.log(navigation);
    return {
      title: navigation.state.params.title?navigation.state.params.title:"正在加载中...",
      headerRight: <View />,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      movieId: this.props.navigation.state.params.movieId,
      movieInfo: {},
    };
  }
  componentWillMount() {
    // https://douban.uieee.com
    // console.log(111);

    fetch(`https://douban.uieee.com/v2/movie/subject/${this.state.movieId}`)
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        //设置动态标题,超过指定长度,就截取
        this.props.navigation.setParams({
          title:res.title.length>9?res.title.substring(0,9)+'...':res.title
        })
        this.setState({
          isLoading: false,
          movieInfo: res,
        });
      });
  }
  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    } else {
      return (
        // 渲染我们的数据
        <ScrollView>
          <Text style={{marginTop: 10, textAlign: 'center', fontSize: 25}}>
            {this.state.movieInfo.title}
          </Text>
          <View style={{alignItems: 'center', marginTop: 10}}>
            <Image
              style={{width: 300, height: 330}}
              source={{uri: this.state.movieInfo.images.large}}
            />
          </View>
          <Text style={{fontSize: 20, marginTop: 20, marginLeft: 5}}>
            主要演员:
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              {this.state.movieInfo.casts.map((item, index) => {
                return (
                  <View key={index} style={{alignItems: 'center'}}>
                    <Image
                      source={{uri: item.avatars.small}}
                      style={{width: 100, height: 130, marginRight: 5}}
                    />
                    <Text>{item.name}</Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
          <Text style={{fontSize: 20, marginTop: 20, marginLeft: 5}}>
            电影简介:
          </Text>
          <Text
            style={{fontSize: 14, color: '#666', padding: 10, lineHeight: 35}}>
            {' '}
            {this.state.movieInfo.summary}
          </Text>
        </ScrollView>
      );
    }
  }
}

export default MovieList;
