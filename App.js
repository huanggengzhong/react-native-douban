import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './src/components/home/home.js';
import MineScreen from './src/components/mine/mine.js';
import MovieScreen from './src/components/movie/movie.js';
import {Image} from 'react-native';
//顶部导航
const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: '首页',
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
      },
    },
  },
});
const MovieStack = createStackNavigator({
  Movie: {
    screen: MovieScreen,
    navigationOptions: {
      headerTitle: '电影',
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
      },
    },
  },
});
const MineStack = createStackNavigator({
  Mine: {
    screen: MineScreen,
    navigationOptions: {
      headerTitle: '我的',
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
      },
    },
  },
});
//底部导航
const TabBar = createBottomTabNavigator(
  // 里面是两个对象
  {
    Home: {
      // screen: HomeScreen,//引入顶部导航后这里要改了
      screen: HomeStack,

      navigationOptions: {
        tabBarLabel: '首页',
        tabBarIcon: ({focused, tintColor}) => {
          //跟一个方法,参数是一个对象
          return (
            <Image
              source={
                focused
                  ? require('./src/statics/images/tarBar/home_selected.png')
                  : require('./src/statics/images/tarBar/home_normal.png')
              }
              style={{tintColor: tintColor, width: 25, height: 25}}
            />
          );
        },
      },
    },
    Movie: {
      screen: MovieStack,
      navigationOptions: {
        tabBarLabel: '电影',
        tabBarIcon: ({focused, tintColor}) => {
          //跟一个方法,参数是一个对象
          return (
            <Image
              source={
                focused
                  ? require('./src/statics/images/tarBar/movie_selected.png')
                  : require('./src/statics/images/tarBar/movie_normal.png')
              }
              style={{tintColor: tintColor, width: 25, height: 25}}
            />
          );
        },
      },
    },
    Mine: {
      screen: MineStack,
      navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: ({focused, tintColor}) => {
          //跟一个方法,参数是一个对象
          return (
            <Image
              source={
                focused
                  ? require('./src/statics/images/tarBar/mine_selected.png')
                  : require('./src/statics/images/tarBar/mine_normal.png')
              }
              style={{tintColor: tintColor, width: 25, height: 25}}
            />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    },
  },
);

export default createAppContainer(TabBar);
