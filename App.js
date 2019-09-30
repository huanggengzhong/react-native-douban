import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeScreen from './src/components/home/home.js';
import MineScreen from './src/components/mine/mine.js';
import MovieScreen from './src/components/movie/movie.js';

const TabBar = createBottomTabNavigator({
  Home: HomeScreen,
  Mine: MineScreen,
  Movie: MovieScreen,
});

export default createAppContainer(TabBar);
