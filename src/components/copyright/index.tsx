import Taro from '@tarojs/taro';
import './index.scss';
import { View } from '@tarojs/components';

export default class Index extends Taro.Component {
  static options = {
    addGlobalClass: true
  };

  render() {
    return (
      <View className="my-copyright">
        <View className="my-copyright__link">GitHub @suchenrain</View>
        <View className="my-copyright__text">Copyright © 2019 Suchenrain</View>
      </View>
    );
  }
}
