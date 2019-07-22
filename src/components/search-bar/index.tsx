import { Input, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';

const defaultProps = {
  value: '',
  placeholder: '搜索',
  maxLength: 120,
  focus: false,
  disabled: false,
  fixed: false,
  customStyle: {},
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onConfirm: () => {},
  onScan: () => {}
};
type Props = {
  value: string;
  placeholder: string;
  maxLength: number;
  focus: boolean;
  disabled: boolean;
  fixed: boolean;
  customStyle: {};
  onChange: (...arg) => any;
  onFocus: (...arg) => any;
  onBlur: (...arg) => any;
  onConfirm: (...arg) => any;
  onScan: (...arg) => any;
};
type State = {
  isFocus: boolean;
};

export default class SearchBar extends Taro.Component<Props, State> {
  static options = {
    addGlobalClass: true
  };
  static defaultProps = defaultProps;

  constructor() {
    super(...arguments);
    this.state = {
      isFocus: this.props.focus
    };
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

  handleFocus = (...arg) => {
    this.setState({ isFocus: true });
    if (this.props.onFocus) this.props.onFocus(...arg);
  };

  handleBlur = (...arg) => {
    this.setState({
      isFocus: false
    });
    this.props.onBlur(...arg);
  };

  handleChange = (e, ...arg) => {
    this.props.onChange(e.target.value, ...arg);
  };
  handleClear = (...arg) => this.props.onChange('', ...arg);

  handleConfirm = (...arg) => this.props.onConfirm(...arg);

  handleScan = (...arg) => this.props.onScan(...arg);
  /*
  |--------------------------------------
  |  render
  |--------------------------------------
  */
  render() {
    const {
      value,
      placeholder,
      maxLength,
      focus,
      disabled,
      fixed,
      customStyle
    } = this.props;

    const { isFocus } = this.state;
    const fontSize = 14;

    // focus 左移
    const placeholderWrapStyle: any = {};
    if (isFocus || (!isFocus && value)) {
      placeholderWrapStyle.width = `${(placeholder.length + 2.5) * fontSize}px`;
      placeholderWrapStyle.flexGrow = 0;
    } else if (!isFocus && !value) {
      placeholderWrapStyle.flexGrow = 1;
    }

    const clearIconStyle = { display: 'flex' };
    const scanIconStyle = { display: 'flex' };
    const placeholderStyle: any = { visibility: 'hidden' };
    if (!value.length) {
      clearIconStyle.display = 'none';
      placeholderStyle.visibility = 'visible';
    } else {
      scanIconStyle.display = 'none';
    }

    let rootCls = 'my-search-bar';
    if (fixed) {
      rootCls += ' my-search-bar--fixed';
    }

    return (
      <View className={rootCls} style={customStyle}>
        <View className="my-search-bar__input-container">
          <View
            className="my-search-bar__placeholder-wrap"
            style={placeholderWrapStyle}
          >
            <Text className="at-icon at-icon-search" />
            <Text
              className="my-search-bar__placeholder"
              style={placeholderStyle}
            >
              {placeholder}
            </Text>
          </View>
          <Input
            className="my-search-bar__input"
            type="text"
            confirmType="search"
            value={value}
            focus={focus}
            disabled={disabled}
            maxLength={maxLength}
            onInput={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onConfirm={this.handleConfirm}
          />
          <View
            className="my-search-bar__clear"
            style={clearIconStyle}
            onTouchStart={this.handleClear}
          >
            <Text className="at-icon at-icon-close" />
          </View>
          <View
            className="my-search-bar__scan"
            style={scanIconStyle}
            onTouchStart={this.handleScan}
          >
            <Text className="icon icon-scan" />
          </View>
        </View>
      </View>
    );
  }
}
