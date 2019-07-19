import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import { add, minus, asyncAdd } from '@/actions/counter';

import { Copyright, NetworkError, Panel, BookCard } from '@/components';

import './index.scss';

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number;
  };
};

type PageDispatchProps = {
  add: () => void;
  dec: () => void;
  asyncAdd: () => any;
};

type PageOwnProps = {};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Index {
  props: IProps;
}

@connect(
  ({ counter }) => ({
    counter
  }),
  dispatch => ({
    add() {
      dispatch(add());
    },
    dec() {
      dispatch(minus());
    },
    asyncAdd() {
      dispatch(asyncAdd());
    }
  })
)
class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const bookData = {
      id: 1,
      title: 'The Ragged ',
      isbn: 9909344911607,
      publisher: '深森出版社',
      pubdate: '1980-11-19',
      author: '[哥]加西亚·马尔克斯',
      translator: '邓秀兰',
      binding: '精装',
      price: 87.86,
      pages: 253,
      words: 5887,
      tags: ['小说', '文学', '名著'],
      score: 5.9,
      review_num: 408,
      image: 'http://dummyimage.com/218x300',
      introduction:
        '没我内准火度应别精发导导达在立。然机圆经素中活六派压月性且和何。千包向采常设派带照而又酸。算可先离状公提许断去放从车品许装还。次十利色广记层系实单头志金识道生消。天活情林代西部级性区天音元起能组。员构西定空平再验马大条共象二。林术指直重业比做市是他东队统。社斗己存度速离江时利高容都导色。并走调层连我化劳已也么数儿比基。'
    };
    return (
      <View className="index">
        <Button className="add_btn" onClick={this.props.add}>
          +
        </Button>
        <Button className="dec_btn" onClick={this.props.dec}>
          -
        </Button>
        <Button className="dec_btn" onClick={this.props.asyncAdd}>
          async
        </Button>
        <View>
          <Text>{this.props.counter.num}</Text>
        </View>
        <View>
          <Text>Hello, World</Text>
        </View>
        <NetworkError onClick={() => {}} />
        <Panel className="panel--first" title={'i am panel Title'}>
          child content
        </Panel>
        <BookCard
          data={bookData}
          showArrow={false}
          onLongPress={function() {
            console.log('long press');
          }}
        />
        <Copyright />
      </View>
    );
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>;
