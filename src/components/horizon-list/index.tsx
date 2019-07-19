import Taro from '@tarojs/taro';

import './index.scss';
import urls from '@/constants/urls';
import { ScrollView, View, Navigator, Image } from '@tarojs/components';

type Book = {
  id: number;
  title: string;
  author: string;
  image: string;
};
type Props = {
  data: Array<Book>;
  sideSpace: number;
};

const defaultProps: Props = {
  data: [],
  sideSpace: 24
};
export default class HorizonList extends Taro.Component<Props> {
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
    const { data, sideSpace } = this.props;
    const url = urls.BOOK_DETAIL;

    let imgWidth, imgHeight;
    imgWidth = (750 - 24 * 2 - sideSpace * 2) / 3;
    imgHeight = (imgWidth * 300) / 218; //图片比率 218x300
    return (
      <ScrollView scrollX className="my-horizon-list-container">
        <View className="my-horizon-list">
          {data.map(item => {
            return (
              <Navigator
                key={item.id}
                url={`${url}?id=${item.id}`}
                className="my-horizon-list-item"
                hoverClass="None"
                style={{ width: Taro.pxTransform(imgWidth) }}
              >
                <Image
                  className="my-horizon-list-item__book"
                  style={{
                    width: Taro.pxTransform(imgWidth),
                    height: Taro.pxTransform(imgHeight)
                  }}
                  src={item.image}
                  mode="aspectFill"
                />
                <View className="my-horizon-list-item__title">
                  {item.title}
                </View>
                {/* <View className="my-horizon-list-item__author">
                  {item.author}
                </View> */}
              </Navigator>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}
