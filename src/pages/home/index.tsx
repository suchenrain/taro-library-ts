import { getHotBooks, getNewBooks, getRecommendBooks } from '@/actions/book';
import { FakeSearchBar, HorizonList, Panel } from '@/components';
import URL from '@/constants/urls';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import Taro from '@tarojs/taro';
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
  dispatchGetNewBooks: any;
  dispatchGetHotBooks: any;
  dispatchGetRecommendBooks: any;
};

@connect(
  ({ book }) => ({
    newBooks: book.newBooks,
    hotBooks: book.hotBooks,
    recommendBooks: book.recommendBooks
  }),
  {
    dispatchGetNewBooks: getNewBooks,
    dispatchGetHotBooks: getHotBooks,
    dispatchGetRecommendBooks: getRecommendBooks
  }
)
export default class Home extends Taro.Component<Props> {
  config = {
    navigationBarTitleText: '首页'
  };

  static options = {
    addGlobalClass: true
  };
  static defaultProps = defaultProps;

  /*
  |--------------------------------------
  |  life cycle
  |--------------------------------------
  */
  componentWillMount() {
    this.props.dispatchGetNewBooks();
    this.props.dispatchGetHotBooks();
    this.props.dispatchGetRecommendBooks();
  }

  /*
  |--------------------------------------
  |  event handler
  |--------------------------------------
  */

  onClickSearchBar = () => {
    Taro.navigateTo({ url: URL.SEARCH });
  };

  /*
  |--------------------------------------
  |  render
  |--------------------------------------
  */
  render() {
    return (
      <View>
        <FakeSearchBar onClick={this.onClickSearchBar} />
        <Panel
          url={`${URL.BOOK_LIST}?type=new`}
          title="新书速递"
          className="panel--first"
        >
          <HorizonList data={this.props.newBooks} />
        </Panel>
        <Panel
          url={`${URL.BOOK_LIST}?type=hot`}
          title="近期热门"
          className="margin-top-lg"
        >
          <HorizonList data={this.props.hotBooks} />
        </Panel>
        <Panel
          url={`${URL.BOOK_LIST}?type=recommend`}
          title="为你推荐"
          className="margin-top-lg"
        >
          <HorizonList data={this.props.recommendBooks} />
        </Panel>
      </View>
    );
  }
}
