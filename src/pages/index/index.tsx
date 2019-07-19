import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import { add, minus, asyncAdd } from '@/actions/counter';

import {
  Copyright,
  NetworkError,
  Panel,
  BookCard,
  HorizonList
} from '@/components';

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
    const bookList = [
      {
        id: 62,
        title: '绿皮书',
        isbn: 9809534381066,
        publisher: '深森出版社',
        pubdate: '1970-07-30',
        author: '崔磊',
        translator: '罗秀兰',
        binding: '精装',
        price: 88.81,
        pages: 75,
        words: 6338,
        tags: ['小说', '文学', '名著'],
        score: 1.9,
        review_num: 648,
        image: 'http://dummyimage.com/218x300',
        introduction:
          '极见样收包东件种员东月开果质来每广。体二参大此人把且压识运铁何设路。一求命党维常么可听属族极能文报整。快育青金需可土铁了部百土。过求易此性型带太关维在线济革除而即。石增少提包基容带始处院格外求则心。达准内热意半角建积布布过养产构制。它指管例没叫受置九安通委色除江广不。政毛先会近被到空况我民取日地存重因手。间心花电需程回规包口论器反确造。气面育一天音百报群由起断听。习精织多之阶音就他划元种好放音极何不。选们感度对价却七学经等种它。没拉率米器厂带小能连省真形国品。'
      },
      {
        id: 63,
        title: '我们始终没有牵手旅行',
        isbn: 9792023969828,
        publisher: '深森出版社',
        pubdate: '1996-05-30',
        author: '[法]圣-埃克苏佩里',
        translator: '韩平',
        binding: '精装',
        price: 95.86,
        pages: 164,
        words: 7069,
        tags: ['小说', '文学', '名著'],
        score: 3.1,
        review_num: 390,
        image: 'http://dummyimage.com/218x300',
        introduction:
          '情决亲集料便教老花低南计没风按。件制万行然多备报易场信例图。于主石约县就无又数月调可至图党。器三习角回青美因着水是装真来。管位度物规文权候流难导毛没任发。除要满社具务接革共七体按越划么。'
      },
      {
        id: 64,
        title: '小王子',
        isbn: 9846209145651,
        publisher: '深森出版社',
        pubdate: '1985-10-06',
        author: '程军',
        translator: '李杰',
        binding: '精装',
        price: 88.11,
        pages: 95,
        words: 9700,
        tags: ['小说', '文学', '名著'],
        score: 6.5,
        review_num: 97,
        image: 'http://dummyimage.com/218x300',
        introduction:
          '离没统先并行山不养断通观什会资料。层道界别局示关么更此理细七不。立快非低装物交力电住级文因深正。思争当线存重或口认儿每提问极白。增状部斯空所此认人政低半。解约利科它系学参装代关照。'
      },
      {
        id: 65,
        title: '老人与海',
        isbn: 9815941559669,
        publisher: '深森出版社',
        pubdate: '2018-02-12',
        author: '[哥]加西亚·马尔克斯',
        translator: '薛静',
        binding: '精装',
        price: 82.66,
        pages: 181,
        words: 3623,
        tags: ['小说', '文学', '名著'],
        score: 5.9,
        review_num: 835,
        image: 'http://dummyimage.com/218x300',
        introduction:
          '委给水外家取光战三强历其行号。近门往万而装维局然使原实少便。习过及联研热知全精其但受圆子。选特使给入心难马场作象条形确造能。领力们济文带导应员听志厂体须。导写级往空由利红向你铁装合车一他。收处太节果记育而革口专深对更市教非。织实本状天布认品准决应之听导。八志要结来具克争实只物各看科。参想风好单林品权信应意同市间便没选。'
      },
      {
        id: 66,
        title: 'The Trophy Failure',
        isbn: 9861464483264,
        publisher: '深森出版社',
        pubdate: '1971-03-01',
        author: '雷刚',
        translator: '梁涛',
        binding: '精装',
        price: 95.38,
        pages: 119,
        words: 9347,
        tags: ['小说', '文学', '名著'],
        score: 5.9,
        review_num: 165,
        image: 'http://dummyimage.com/218x300',
        introduction:
          '白类比年书完属平历性算各厂。被局开以极我收想温况类后。今省能为素都府白断最半验划较达。代响十作每越老件基律叫别。共说象验众每系可构育农面程。住动象办局放节价打族部海养。江究平织见群准志满音构克区在间。并龙会得局路江规都数快机。集六影只米般面众目对院增资见名快。感级后写它自油议点量业化识般满术。见我还务角位起叫处类为求导准个派等。都经土具全再其火列取事内现。'
      }
    ];
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
          <HorizonList data={bookList} />
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
