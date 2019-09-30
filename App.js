import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeScreen from './src/components/home/home.js';
import MineScreen from './src/components/mine/mine.js';
import MovieScreen from './src/components/movie/movie.js';
import {Image} from 'react-native';

const TabBar = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
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
    screen: MovieScreen,
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
    screen: MineScreen,
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



});

export default createAppContainer(TabBar);
