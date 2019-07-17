import Taro from '@tarojs/taro';

import './index.scss';
import { View, Navigator, Text } from '@tarojs/components';

const defaultProps = {
  url: '',
  title: ''
};
type Props = {
  className: string;
  url: string;
  title: string;
};

export default class Panel extends Taro.Component<Props> {
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
    const rootCls = `my-panel ${this.props.className}`;
    return (
      <View className={rootCls}>
        <Navigator url={this.props.url} hoverClass="None">
          <View className="my-panel-header at-row at-row__align--center">
            <View className="at-col">{this.props.title}</View>
            <Text className="my-panel-header__arrow at-icon at-icon-chevron-right at-col" />
          </View>
        </Navigator>
        <View className="my-panel-body">{this.props.children}</View>
      </View>
    );
  }
}
