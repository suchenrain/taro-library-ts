import URL from '@/constants/urls';
import { Navigator, Image, View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';

const defaultProps = {
  showArrow: true,
  onLongPress: (id: number) => {}
};

type Book = {
  id: number;
  title: string;
  author: string;
  image: string;
  score: number;
  review_num: number;
  publisher: string;
  pubdate: string;
  isbn: number;
};
type Props = {
  data: Book;
  showArrow: boolean;
  onLongPress: (id: number) => void;
};

export default class BookCard extends Taro.Component<Props> {
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
  |  event handler
  |--------------------------------------
  */

  onLongPress = () => {
    if (this.props.onLongPress) {
      this.props.onLongPress(this.props.data.id);
    }
  };

  /*
  |--------------------------------------
  |  render
  |--------------------------------------
  */
  render() {
    const { data, showArrow } = this.props;
    return (
      <Navigator
        className="at-row at-row__align--start my-book-card"
        hoverClass="None"
        url={`${URL.BOOK_DETAIL}?id=${data.id}`}
        onLongPress={this.onLongPress}
      >
        <Image
          className="at-col at-col--auto my-book-card__img"
          style={{ marginRight: Taro.pxTransform(24) }}
          src={data.image}
          mode="aspectFill"
        />
        <View className="at-col my-book-card__info">
          <View className="my-book-card__info-title">{data.title}</View>
          <View>
            评分：<Text className="color-warning">{data.score}</Text>（
            {data.review_num}条评论）
          </View>
          <View>作者：{data.author}</View>
          <View>出版社：{data.publisher}</View>
          <View>出版日期：{data.pubdate}</View>
          <View>ISBN：{data.isbn}</View>
        </View>
        {showArrow && (
          <Text
            style={{ alignSelf: 'center' }}
            className="at-icon at-icon-chevron-right panel-header__arrow at-col at-col-1 at-col--auto"
          />
        )}
      </Navigator>
    );
  }
}
