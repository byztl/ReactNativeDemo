>react-native版本: 0.57

##### &ensp;&ensp;reactnative是一个优秀的跨平台开发解决方案, 但是无奈跟新速度太快, 开发者找到的学习资料往往都是过去的版本, 这会在学习上造成许多不便, 本系列文章的初衷便是在于提供最新的资料给开发者学习.

### 项目地址: https://github.com/byztl/ReactNativeDemo/tree/master 
####克隆分支到本地. 
```
$ git clone git@github.com:byztl/ReactNativeDemo.git
$ cd ReactNativeDemo/Weather
$ yarn install
// 然后稍等片刻 弹出二维码以后输入 i 或者 a, 这取决你用什么模拟器
$ expo start
```
![刚启动时的页面](http://upload-images.jianshu.io/upload_images/3628811-1feb6195080bf3c7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![输入上海, 并点击回车](http://upload-images.jianshu.io/upload_images/3628811-a7f756dcb746bc0f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
// 数据请求部分, 根据返回的数据, 进行state设置.
handleUpdateLocation = async city => {
    if (!city) return;
    this.setState({ loading: true }, async () => {
      try {
        // city 是城市的拼音 比如 Shanghai
        const locationId = await fetchLocationId(city);
        const { location, weather, temperature } = await fetchWeather(
          locationId
        );
        const weatherInfo = await fetchWeather(
          locationId
        );
        console.log(JSON.stringify(weatherInfo));
        

        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature
        });
      } catch (error) {
        this.setState({
          loading: false,
          error,
        })
      }
    });
  };
```

主要代码集中在App.js以及component/SearchInput.js
读者可以根据需求自行下载阅读代码, 不懂的地方可以站内留言或者发送问题到我的邮箱
*by_ztl@126.com*
