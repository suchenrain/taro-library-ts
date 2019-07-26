import { BookCard, NetworkError, SearchBar } from '@/components';
import URL from '@/constants/urls';
import BookAPI from '@/service/api';
import { isISBN } from '@/utils/validator';
import { Text, View } from '@tarojs/components';
import Taro, { Config } from '@tarojs/taro';
import { AtActivityIndicator, AtTag } from 'taro-ui';
import './index.scss';

const defaultProps = {
  content: ''
};
type Props = {
  content: string;
};

type State = {
  history: any[];
  value: string;
  isSearching: boolean;
  isError: boolean;
  searchResults: any[];
};
const initialState: State = {
  history: [],
  value: '',
  isSearching: false,
  isError: false,
  searchResults: []
};
export default class Search extends Taro.Component<Props, State> {
  config: Config = {
    navigationBarTitleText: '搜索'
  };
  static options = {
    addGlobalClass: true
  };
  static defaultProps = defaultProps;
  constructor() {
    super(...arguments);
    let history = Taro.getStorageSync('history') || [];
    initialState.history = history;
    this.state = initialState;
  }
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

  onChange = (value: string) => {
    this.setState({ value });
  };

  onConfirm = ({ target: { value } }) => {
    this.onSearch(value);
  };

  onClickTag = (name: any) => {
    this.onSearch(name);
  };

  onSearch = async (value: string) => {
    this.addHistory(value);
    this.setState({
      value,
      isSearching: true,
      isError: false,
      searchResults: []
    });
    try {
      let { data } = await BookAPI.GET(`/books?q=${value}`);
      this.setState({
        isSearching: false,
        isError: false,
        searchResults: data
      });
    } catch (e) {
      this.setState({
        isSearching: false,
        isError: true,
        searchResults: []
      });
    }
  };

  onReSearch = () => {
    this.onSearch(this.state.value);
  };

  onScan = () => {
    Taro.scanCode({ scanType: ['barCode'] })
      .then(
        (res): any => {
          if (!isISBN(res.result)) {
            return Taro.showModal({
              title: '扫描内容不合法',
              content: '请扫描图书ISBN条形码',
              showCancel: false
            });
          } else {
            Taro.navigateTo({
              url: `${URL.BOOK_DETAIL}?isbn=${res.result}`
            });
          }
        }
      )
      .catch(e => {
        console.log('扫码失败', e);
      });
  };

  onRemoveHistory = () => {
    Taro.showModal({
      title: '',
      content: '确定删除全部历史记录？'
    }).then(res => {
      if (res.confirm) {
        Taro.removeStorage({ key: 'history' });
        this.setState({ history: [] });
      }
    });
  };

  addHistory = (value: string) => {
    value = value.trim();
    let history = this.state.history.filter(v => v !== value);
    history.unshift(value);
    if (history.length > 10) {
      history.slice(0, 10);
    }
    this.setState({ history });
    Taro.setStorage({
      key: 'history',
      data: history
    });
  };

  /*
  |--------------------------------------
  |  render
  |--------------------------------------
  */
  render() {
    const { history, value, isSearching, isError, searchResults } = this.state;

    const showScan =
      !isSearching && !isError && !(searchResults && searchResults.length);
    const showHistory =
      !isSearching &&
      !isError &&
      !(searchResults && searchResults.length) &&
      history.length;
    const showResults =
      !isSearching && !isError && (searchResults && searchResults.length);

    return (
      <View className="container">
        <SearchBar
          focus
          fixed
          value={value}
          onChange={this.onChange}
          onConfirm={this.onConfirm}
          onScan={this.onScan}
        />
        {showScan && (
          <View
            className="scan-row at-row at-row__align--center"
            onClick={this.onScan}
          >
            <View className="at-col">扫描图书条形码</View>
            <Text className="scan-row__arrow at-icon at-icon-chevron-right at-col" />
          </View>
        )}
        {showHistory && (
          <View className="history-container">
            <View className="at-row at-row__align--center">
              <View className="history-title at-col">搜索历史</View>
              <View
                className="history-delete at-col"
                onClick={this.onRemoveHistory}
              >
                <View className="at-icon at-icon-trash" />
                {/* 清除 */}
              </View>
            </View>
            {history.map(item => {
              return (
                <AtTag
                  className="history-item"
                  key={item}
                  name={item}
                  onClick={this.onClickTag}
                >
                  {item}
                </AtTag>
              );
            })}
          </View>
        )}
        {isSearching && (
          <AtActivityIndicator mode="center" content="加载中..." />
        )}
        {isError && <NetworkError onClick={this.onReSearch} />}
        {showResults && (
          <View>
            {searchResults.map(item => (
              <BookCard data={item} key={item.id} />
            ))}
          </View>
        )}
      </View>
    );
  }
}
