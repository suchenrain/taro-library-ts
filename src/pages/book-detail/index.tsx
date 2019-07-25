import { NetworkError, HorizonList } from '@/components';
import BookAPI from '@/service/api';
import { Block, Image, Text, View } from '@tarojs/components';
import Taro, { Config } from '@tarojs/taro';
import { AtActivityIndicator } from 'taro-ui';
import './index.scss';

type State = {
  book: any;
  isFetching: boolean;
  isError: boolean;
};

const initialState: State = {
  book: {},
  isFetching: true,
  isError: false
};

export default class BookDetail extends Taro.Component<any, State> {
  config: Config = {
    navigationBarTitleText: '图书详情'
  };
  static options = {
    addGlobalClass: true
  };
  constructor() {
    super(...arguments);
    this.state = initialState;
  }

  /*
  |--------------------------------------
  |  life cycle
  |--------------------------------------
  */
  componentWillMount() {
    this._loadBook();
  }

  /*
  |--------------------------------------
  |  event handler
  |--------------------------------------
  */
  onReload = () => {
    this._loadBook();
  };

  onPreview = () => {
    let { image } = this.state.book;
    Taro.previewImage({
      current: image,
      urls: [image]
    });
  };

  _loadBook = async () => {
    try {
      let book;
      if (this.$router.params.id) {
        book = await BookAPI.GET(`/books/${this.$router.params.id}`);
      } else {
        book = await BookAPI.GET(`/books?isbn=${this.$router.params.isbn}`);
      }
      this.setState({
        book,
        isFetching: false,
        isError: false
      });
    } catch (e) {
      this.setState({
        isFetching: false,
        isError: true
      });
    }
  };
  /*
  |--------------------------------------
  |  render
  |--------------------------------------
  */
  render() {
    const { book, isFetching, isError } = this.state;
    return (
      <View>
        {!isFetching && !isError && (
          <Block>
            <View className="at-row at-row__align--start book">
              <View className="at-col book__info">
                <View className="book__info-title">{book.title}</View>
                <View>
                  评分：<Text className="color-warning">{book.score}</Text>（
                  {book.review_num}条评论）
                </View>
                <View>作者：{book.author}</View>
                <View>出版社：{book.publisher}</View>
                <View>出版日期：{book.pubdate}</View>
                <View>ISBN：{book.isbn}</View>
              </View>
              <Image
                className="at-col at-col--auto book__img"
                src={book.image}
                mode="widthFix"
                onClick={this.onPreview}
              />
            </View>
            <View className="book-introduction">
              <View className="book-introduction__title">简介与目录</View>
              <View className="book-introduction__content">
                {book.introduction}
              </View>
            </View>
            <View className="related-books">
              <View className="related-books__title">相关图书</View>
              <View className="related-books__content">
                <HorizonList data={book.related_books} sideSpace={32} />
              </View>
            </View>
          </Block>
        )}

        {isFetching && (
          <AtActivityIndicator mode="center" content="loading..." />
        )}

        {isError && (
          <NetworkError
            content="网络有点问题呢，点击重新加载"
            onClick={this.onReload}
          />
        )}
      </View>
    );
  }
}
