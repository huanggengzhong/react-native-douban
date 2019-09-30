import React, {Component} from 'react';
import {View, Dimensions, StyleSheet, Image, Text} from 'react-native';
import Carousel from 'react-native-looped-carousel';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  images: {
    width: '100%',
    height: '100%',
  },
  navigator: {
    height: 50,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});
export default class Home extends Component {
  state = {
    size: {width, height: 200},
  };
  render() {
    return (
      <View>
        {/* 1.自定义导航条 */}
        <View style={styles.navigator}>
          <Text>首页</Text>
          <Text
            onPress={() => {
              this.props.navigation.navigate('Movie');
            }}>
            电影
          </Text>
          <Text
            onPress={() => {
              this.props.navigation.navigate('Mine');
            }}>
            我的
          </Text>
        </View>
        {/* 2.轮播图 */}
        <View style={this.state.size} onLayout={this._onLayoutDidChange}>
          <Carousel
            delay={3000}
            style={this.state.size}
            autoplay
            // pageInfo
            arrows={true}
            leftArrowText="<"
            leftArrowStyle={{color: 'white', fontSize: 30, margin: 20}}
            rightArrowStyle={{color: 'white', fontSize: 30, margin: 20}}
            rightArrowText=">"
            bullets
            onAnimateNextPage={p => console.log(p)}>
            <View style={this.state.size}>
              <Image
                style={styles.images}
                resizeMode="stretch"
                source={{
                  uri:
                    'https://img3.mukewang.com/szimg/5d4ceaef09c3cb6612000676-360-202.png',
                }}
              />
            </View>
            <View style={this.state.size}>
              <Image
                style={styles.images}
                resizeMode="stretch"
                source={{
                  uri:
                    'https://img4.mukewang.com/szimg/5ad05dc00001eae705400300-360-202.jpg',
                }}
              />
            </View>
            <View style={this.state.size}>
              <Image
                style={styles.images}
                resizeMode="stretch"
                source={{
                  uri:
                    'https://img1.mukewang.com/szimg/5d665288090f60db12000676-360-202.png',
                }}
              />
            </View>
          </Carousel>
        </View>

        {/* ====================下面轮播图已经有效果================ */}
        {/* <View style={this.state.size} onLayout={this._onLayoutDidChange}>
          <Carousel
            delay={3000}
            style={this.state.size}
            autoplay
            pageInfo
            onAnimateNextPage={p => console.log(p)}>
            <View style={[{backgroundColor: '#BADA55'}, this.state.size]}>
              <Text>1</Text>
            </View>
            <View style={[{backgroundColor: 'red'}, this.state.size]}>
              <Text>2</Text>
            </View>
            <View style={[{backgroundColor: 'blue'}, this.state.size]}>
              <Text>3</Text>
            </View>
          </Carousel>
        </View> */}
      </View>
    );
  }
}
