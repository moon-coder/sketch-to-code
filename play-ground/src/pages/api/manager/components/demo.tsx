
import * as React from 'react';
import * as T from '../types';
import './demo.less'
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type ISearchProps = T.IProps & T.ISearchProps;

@connect<Partial<ISearchProps>, T.ISearchState>(
  store2Props,
  actions,
)
export default class Search extends React.Component<
  Partial<ISearchProps>,
  T.ISearchState
> {
  constructor(props: ISearchProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <div className="search">
        <div className="cblock0" extraInfo='{}'>
  <div className="cblock1" extraInfo='{"isMergeNode":true}'>
    <div className="cblock2" extraInfo='{"isBgImage":true,"sameNode":true,"isComp":true}'>
      <div className="cblock3" extraInfo='{"isMergeNode":true}'>
        <img src='/img/img11.png' className="cimg0" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'/>
        <div className="cblock4" extraInfo='{"tempCnntainerFlag":"right::contain","isTempContainerNode":true}'>
          <div className="cblock5" extraInfo='{"isMergeNode":true}'>
            <span className="ctext0" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>提莫的蘑菇摊儿</span>
            <span className="ctext1" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>南京市玄武区龙蟠路618号毛孩子广场F1-1001</span>
          </div>
        </div>
      </div>
    </div>
    <div className="cblock6" extraInfo='{"tempCnntainerFlag":"contain::right-overlap","isTempContainerNode":true}'>
      <div className="cblock7" extraInfo='{"isMergeNode":true}'>
        <div className="cblock8" extraInfo='{"tempCnntainerFlag":"left-overlap::right","isTempContainerNode":true}'>
          <div className="cblock9" extraInfo='{"isMergeNode":true}'>
            <div className="cblock10" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>
              <div className="cblock11" extraInfo='{"isMergeNode":true}'>
                <div className="cblock12" extraInfo='{"isMergeNode":true}'>
                  <img src='/img/img6.png' className="cimg4" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'/>
                  <div className="cblock17" extraInfo='{"tempCnntainerFlag":"contained::left","isTempContainerNode":true}'>
                    <span className="ctext5" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>优惠券</span>
                  </div>
                </div>
                <div className="cblock14" extraInfo='{"isMergeNode":true}'>
                  <img src='/img/img7.png' className="cimg4" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'/>
                  <div className="cblock17" extraInfo='{"tempCnntainerFlag":"contained::left","isTempContainerNode":true}'>
                    <span className="ctext5" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>计次卡</span>
                  </div>
                </div>
                <div className="cblock16" extraInfo='{"isMergeNode":true}'>
                  <img src='/img/img8.png' className="cimg4" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'/>
                  <div className="cblock17" extraInfo='{"tempCnntainerFlag":"contained::left","isTempContainerNode":true}'>
                    <span className="ctext5" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>充值卡</span>
                  </div>
                </div>
                <div className="cblock18" extraInfo='{"tempCnntainerFlag":"left::left-contained","isTempContainerNode":true}'>
                  <div className="cblock19" extraInfo='{"isMergeNode":true}'>
                    <div className="cblock20" extraInfo='{"tempCnntainerFlag":"contain::left","isTempContainerNode":true}'>
                      <img src='/img/img9.png' className="cimg4" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'/>
                    </div>
                    <span className="ctext5" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>服务/商品</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="cblock21" extraInfo='{"sameNode":true,"isComp":true}'>
              <div className="cblock22" extraInfo='{"isMergeNode":true}'>
                <div className="cblock23" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>
                  <div className="cblock24" extraInfo='{"isMergeNode":true}'>
                    <span className="ctext6" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>充值卡</span>
                    <div className="cblock25" extraInfo='{"tempCnntainerFlag":"right::contain","isTempContainerNode":true}'>
                      <div className="cblock26" extraInfo='{"isMergeNode":true}'>
                        <span className="ctext7" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>更多充值卡</span>
                        <div className="cblock27" extraInfo='{"tempCnntainerFlag":"left::contained","isTempContainerNode":true}'>
                          <img src='/img/img5.png' className="cimg5" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cblock39" extraInfo='{"tempCnntainerFlag":"contain::right","isTempContainerNode":true}'>
                  <div className="cblock29" extraInfo='{"isMergeNode":true}'>
                    <div className="cblock30" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>
                      <div className="cblock34" extraInfo='{"isMergeNode":true}'>
                        <span className="ctext8" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>黑金VIP黄金卡</span>
                        <div className="cblock32" extraInfo='{"isMergeNode":true}'>
                          <span className="ctext9" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>¥8848</span>
                          <span className="ctext10" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>永久有效</span>
                        </div>
                      </div>
                    </div>
                    <div className="cblock33" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>
                      <div className="cblock34" extraInfo='{"isMergeNode":true}'>
                        <span className="ctext8" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>粉丝珍爱卡</span>
                        <div className="cblock35" extraInfo='{"isMergeNode":true}'>
                          <span className="ctext9" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>¥800</span>
                          <span className="ctext13" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>365天内有效</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cblock36" extraInfo='{"isComp":true}'>
          <div className="cblock37" extraInfo='{"isMergeNode":true}'>
            <div className="cblock38" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>
              <span className="ctext6" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>为您推荐</span>
            </div>
            <div className="cblock39" extraInfo='{"tempCnntainerFlag":"contain::right","isTempContainerNode":true}'>
              <div className="cblock40" extraInfo='{"isMergeNode":true}'>
                <div className="cblock41" extraInfo='{"isMergeNode":true}'>
                  <div className="cblock45" extraInfo='{"isMergeNode":true}'>
                    <img src='/img/img1.png' className="cimg8" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'/>
                    <div className="cblock53" extraInfo='{"tempCnntainerFlag":"right::contain","isTempContainerNode":true}'>
                      <div className="cblock54" extraInfo='{"isMergeNode":true}'>
                        <span className="ctext21" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>大型犬只野兽派洗剪吹，凶悍大叔专业洗狗12年，洗遍天下无敌狗啦啦…</span>
                        <span className="ctext22" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>¥20～¥160</span>
                      </div>
                    </div>
                  </div>
                  <div className="cblock45" extraInfo='{"isMergeNode":true}'>
                    <img src='/img/img3.png' className="cimg8" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'/>
                    <div className="cblock53" extraInfo='{"tempCnntainerFlag":"right::contain","isTempContainerNode":true}'>
                      <div className="cblock54" extraInfo='{"isMergeNode":true}'>
                        <span className="ctext21" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>大型犬野兽派洗剪吹A套餐</span>
                        <span className="ctext22" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>¥20～¥75</span>
                      </div>
                    </div>
                  </div>
                  <div className="cblock48" extraInfo='{"isMergeNode":true}'>
                    <img src='/img/img2.png' className="cimg8" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'/>
                    <div className="cblock53" extraInfo='{"tempCnntainerFlag":"right::contain","isTempContainerNode":true}'>
                      <div className="cblock54" extraInfo='{"isMergeNode":true}'>
                        <span className="ctext21" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>大型犬只野兽派洗剪吹，凶悍大叔专业洗狗12年，洗遍天下狗</span>
                        <span className="ctext22" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>¥20～¥160</span>
                      </div>
                    </div>
                  </div>
                  <div className="cblock51" extraInfo='{"tempCnntainerFlag":"right-contained::left","isTempContainerNode":true}'>
                    <div className="cblock52" extraInfo='{"isMergeNode":true}'>
                      <img src='/img/img4.png' className="cimg9" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'/>
                      <div className="cblock53" extraInfo='{"tempCnntainerFlag":"right::contain","isTempContainerNode":true}'>
                        <div className="cblock54" extraInfo='{"isMergeNode":true}'>
                          <span className="ctext21" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>小型犬洗剪吹B套餐</span>
                          <span className="ctext22" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>¥20～¥75</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cblock55" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>
                  <span className="ctext23" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>更多服务/商品</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="cblock56" extraInfo='{"tempCnntainerFlag":"contained::left","isTempContainerNode":true}'>
    <span className="ctext24" extraInfo='{"sameNode":true,"isBgImage":true,"isComp":true}'>————＞ω＜我是有底线的————</span>
  </div>
</div>
      </div>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
