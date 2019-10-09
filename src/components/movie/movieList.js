//电影列表页面
import React, {Component} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';
import {TouchableOpacity} from 'react-native-gesture-handler';
class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshState: RefreshState.Idle, //加载的状态
      isLoading: true,
      movieType: this.props.navigation.state.params.movieType,
      pageIndex: 1, //页码
      pageSize: 10, //页容量
      total: 0, //总条数
      MovieList: [], //加载出来的数据
    };
  }
  componentWillMount() {
    this.getMovieListData();
  }
  getMovieListData() {
    // https://douban.uieee.com/v2/movie/in_theaters?start=0&count=2
    const start = (this.state.pageIndex - 1) * this.state.pageSize;
    const url = `https://douban.uieee.com/v2/movie/${
      this.state.movieType
    }?start=${start}&count=${this.state.pageSize}`;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        // console.log(res); //拿到了数据
        this.setState({
          isLoading: false,
          total: res.total,
          MovieList: res.subjects,
          refreshState:
            start < res.total ? RefreshState.Idle : RefreshState.NoMoreData,
        });
      });
  }
  _keyExtractor = (item, index) => item.id; //这个作用是指定id为循环的key
  renderCell = ({item, index}) => {
    //item的模板
    return (
      <TouchableOpacity>
        <Text>{item.title}</Text>
      </TouchableOpacity>
    );
  };
  onHeaderRefresh = () => {
    //下拉刷新
    console.log('下拉刷新');
  };
  onFooterRefresh = () => {
    //上拉加载更多
    console.log('上拉加载更多');
  };
  render() {
    // console.log(this.props);

    if (this.state.isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    } else {
      return (
        // 渲染我们的数据列表页
        <RefreshListView
          data={this.state.MovieList}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderCell}
          refreshState={this.state.refreshState}
          onHeaderRefresh={this.onHeaderRefresh}
          onFooterRefresh={this.onFooterRefresh}
        />
      );
    }
  }
}

export default MovieList;
