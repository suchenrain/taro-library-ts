import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';


const defaultProps = {
  placeHolder: '搜索'
};
type Props = {
  placeHolder: string;
  onClick: () => void;
};

export default class FakeSearchBar extends Taro.Component<Props> {
  static options = {
    addGlobalClass: true
  };
  static defaultProps = defaultProps;

  /*
  |--------------------------------------
  |  life cycle
  |--------------------------------------
  */
  componentWillMount() {}

  /*
  |--------------------------------------
  |  render
  |--------------------------------------
  */
  render() {
    return (
      <View className="my-fake-search-bar" onClick={this.props.onClick}>
        <View className="my-fake-search-bar__placeholder-wrap">
          <Text className="at-icon at-icon-search" />
          <Text className="my-fake-search-bar__placeholder">
            {this.props.placeHolder}
          </Text>
        </View>
      </View>
    );
  }
}
