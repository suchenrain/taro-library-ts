import { disfavorBookById } from '@/actions/book';
import { BookType } from '@/actions/common';
import { BookCard } from '@/components';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import Taro, { Config } from '@tarojs/taro';
import { AtMessage, AtNoticebar } from 'taro-ui';
import './index.scss';

const defaultProps = {
  newBooks: [],
  hotBooks: [],
  recommendBooks: []
};
type Props = {
  newBooks: Array<any>;
  hotBooks: Array<any>;
  recommendBooks: Array<any>;
  dispatchDisfavorBook: any;
};
type State = {
  isShowNoticebar: boolean;
  data: any[];
};
@connect(
  ({ book }) => ({
    newBooks: book.newBooks,
    hotBooks: book.hotBooks,
    recommendBooks: book.recommendBooks
  }),
  {
    dispatchDisfavorBook: disfavorBookById
  }
)
export default class BookList extends Taro.Component<Props, State> {
  config: Config = {
    navigationBarTitleText: ''
  };
  static options = {
    addGlobalClass: true
  };
  static defaultProps = defaultProps;
  constructor() {
    super(...arguments);
    this.state = {
      isShowNoticebar: true,
      data: []
    };
  }
  /*
  |--------------------------------------
  |  life cycle
  |--------------------------------------
  */
  componentWillMount() {
    const type: BookType = this.$router.params.type;
    let data;
    switch (type.toUpperCase()) {
      case 'NEW':
        Taro.setNavigationBarTitle({ title: '新书速递' });
        data = this.props.newBooks;
        break;
      case 'HOT':
        Taro.setNavigationBarTitle({ title: '近期热门' });
        data = this.props.hotBooks;
        break;
      case 'RECOMMEND':
        Taro.setNavigationBarTitle({ title: '为你推荐' });
        data = this.props.recommendBooks;
        break;
    }
    this.setState({ data });
  }
  /*
  |--------------------------------------
  |  event handler
  |--------------------------------------
  */

  onLongPress = (id: number) => {
    Taro.showActionSheet({
      itemList: ['不感兴趣']
    })
      .then(() => {
        this.props.dispatchDisfavorBook(id, this.$router.params.type);
        Taro.atMessage({ message: '我们会减少此图书的出现频率' });
      })
      .catch(e => {
        console.log('取消点击', e);
      });
  };

  onCloseNoticebar = () => {
    this.setState({ isShowNoticebar: false });
  };

  /*
  |--------------------------------------
  |  render
  |--------------------------------------
  */
  render() {
    const { data } = this.state;
    return (
      <View>
        <AtMessage />
        {this.state.isShowNoticebar && (
          <AtNoticebar close onClose={this.onCloseNoticebar}>
            长按标记不感兴趣的图书
          </AtNoticebar>
        )}
        {data.map(item => (
          <BookCard data={item} key={item.id} onLongPress={this.onLongPress} />
        ))}
      </View>
    );
  }
}
