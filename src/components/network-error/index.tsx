import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtButton } from 'taro-ui';

type Props = {
  content: string;
  onClick: () => void;
};
const defaultProps = {
  content: '网络错误，点此刷新'
};

export default class NetworkError extends Taro.Component<Props> {
  static options = {
    addGlobalClass: true
  };
  static defaultProps = defaultProps;

  componentWillMount() {}

  render() {
    const { content } = this.props;
    return (
      <View className="my-network-error">
        <AtButton type="primary" onClick={this.props.onClick}>
          {content}
        </AtButton>
      </View>
    );
  }
}
