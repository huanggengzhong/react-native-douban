//电影列表页面
import React, {Component} from 'react';
import {View, Text, ActivityIndicator, Image, Button} from 'react-native';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';
import {TouchableOpacity} from 'react-native-gesture-handler';
class MovieList extends Component {
  static navigationOptions=({navigation})=>{
    // console.log(navigation);
    return {
      // title:navigation.getParam('title'),
      title:navigation.state.params.title?navigation.state.params.title:"正在加载...",
      headerRight:<View/>
    }
  }
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
          MovieList: this.state.MovieList.concat(res.subjects), //特别注意,这里一定要拼接,不拼接最后数据会消失
          refreshState:
            start < res.total ? RefreshState.Idle : RefreshState.NoMoreData,
        });
      });
  }
  _keyExtractor = (item, index) => item.id; //这个作用是指定id为循环的key

  renderCell = ({item, index}) => {
    //item的模板
    // console.log(item);

    return (
      <View>  
          
        <TouchableOpacity
          style={{
            borderBottomColor: '#eee',
            flexDirection: 'row',
            borderBottomWidth: 1,
            backgroundColor: '#fff',
            padding: 8,
            marginTop: 2,
            
          }}
          activeOpacity={0.7}
          // 发现点击无效,很奇怪
          onPress={() => {
            // console.log(111);
            this.goToDetail(item.id);
          }}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Image
              style={{width: 130, height: 180}}
              source={{uri: item.images.small}}
            />
            <View
              style={{
                marginLeft: 10,
                justifyContent: 'space-around',
                width: 220,
              }}>
              <Text>电影名称:{item.title}</Text>
              <Text>电影类型:{item.genres.join(',')}</Text>
              <Text>上映年份:{item.year}</Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text>豆瓣评分:{item.rating.average}</Text>
                <Text
                  onPress={() => {
                    // console.log(111);
                    this.goToDetail(item.id);
                  }}
                  style={{color: '#4494F9'}}>
                  电影详情
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  goToDetail = movieId => {
    //去电影详情页
    // console.log(movieId);

    this.props.navigation.navigate('MovieInfo', {movieId});
  };
  onHeaderRefresh = () => {
    console.log('下拉刷新');
    //下拉刷新:实际就是设置第一页和清空数组,然后重新加载
    this.setState(
      {
        refreshState: RefreshState.HeaderRefreshing,
        pageIndex: 1,
        MovieList: [],
      },
      () => {
        this.getMovieListData();
      },
    );
  };
  onFooterRefresh = () => {
    //上拉加载更多
    console.log('上拉加载更多');
    this.setState(
      {
        refreshState: RefreshState.FooterRefreshing,
        pageIndex: this.state.pageIndex + 1,
      },
      () => {
        this.getMovieListData();
      },
    );
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
          footerNoMoreDataText={'我是有底线的'}
        />
      );
    }
  }
}

export default MovieList;
