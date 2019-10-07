`在这里插入代码片`>项目源码地址:git@github.com:huanggengzhong/react-native-douban.git

### 一.前期准备
1.导航使用的是react-navigation导航,安装方式如下:

```js
yarn add react-navigation
npm install react-navigation --save
```
 [react-navigation官网](https://reactnavigation.org/docs/zh-Hans/getting-started.html)

 2.创建目录
 对应底部三个tabbar
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190929132020131.png)
 ### 二.开始编写tabbar
 1.依次如下方式编写三个底部tabbar


```js
import React,{Component} from 'react';
import {View,Text} from 'react-native';
export default class Home extends Component{
    render(){
        return (
            <View>
                <Text>Home</Text>
            </View>
        )
    }
}
```

 2.在App.js中用createBottomTabNavigation引入
 createBottomTabNavigation介绍:
https://reactnavigation.org/docs/zh-Hans/tab-based-navigation.html
在App.js中导入并引用
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190930093806603.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYW9kaTUyMDUyMA==,size_16,color_FFFFFF,t_70)
遇到的坑
1.报错:

react-native-gesture-handler ,react-navigation-tabs,react-native-reanimated
解决办法:各自安装即可

```js
npm i 包名 -S
```
2.还有提示要有createAppContainer
解决办法引入createAppContainer

修改后的App.js代码变为:

```js
import React from 'react';
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

```
最后,终于见证奇迹啦
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190930101223540.gif)
### 三.美化tabbar
增加图标和修改样式

```js
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeScreen from './src/components/home/home.js';
import MineScreen from './src/components/mine/mine.js';
import MovieScreen from './src/components/movie/movie.js';
import {Image} from 'react-native';

const TabBar = createBottomTabNavigator(
  // 里面是两个对象
  {
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
  },
  {
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    },
  },
);

export default createAppContainer(TabBar);

```
PS:width:25,记住这些样式是不要填写px的.
效果:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190930134056416.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYW9kaTUyMDUyMA==,size_16,color_FFFFFF,t_70)
### 四.增加顶部导航
安装

```js
npm i react-navigation-stack -S
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190930135642295.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYW9kaTUyMDUyMA==,size_16,color_FFFFFF,t_70)
最后效果:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190930140016329.gif)
### 五.轮播图制作
包名:react-native-looped-carousel
先安装,并导入

```js
//安装
npm install react-native-looped-carousel --save
//导入
import Carousel from 'react-native-looped-carousel';
```
使用:

```js
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
        
```
### 六.顶部导航跳转
使用的是react-navigation里的this.props.navigation.navigator("写自己的bar名字",比如我起的是Movie,Mine这些)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190930161918794.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYW9kaTUyMDUyMA==,size_16,color_FFFFFF,t_70)
代码运用
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019093016200330.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYW9kaTUyMDUyMA==,size_16,color_FFFFFF,t_70)
最终效果:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190930162102639.gif)
### 七.电影页数据开始
接口我使用的是git里的豆瓣接口,基地址是:https://douban.uieee.com
[git文档](https://douban-api-docs.zce.me/movie.html)
我们使用Promise.all()方法
Promise.all()使用场景,我们需要把几个接口数据一起展示的使用就可以使用这个方法.
代码如下:

```js
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
    });
  }
```
填充数据代码:
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019100723025596.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYW9kaTUyMDUyMA==,size_16,color_FFFFFF,t_70)
数据结果:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191007230446777.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYW9kaTUyMDUyMA==,size_16,color_FFFFFF,t_70)
### 八.电影详情数据渲染
#### 1.准备一个无状态组件模板MovieTypeView.js,用来渲染电影详情的三块数据
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191007231529349.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYW9kaTUyMDUyMA==,size_16,color_FFFFFF,t_70)
2.在Movie.js中引入,同时进行数据传递