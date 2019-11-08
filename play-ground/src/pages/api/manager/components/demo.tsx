
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
        <div className="cblock0">
  <div className="cblock1">
    <div className="cblock2">
      <div className="cblock3">
        <div className="cblock4">
          <div className="cblock5">
          </div>
          <div className="cblock6">
            <div className="cblock7">
              <span className="ctext0">¥</span>
              <span className="ctext1">30</span>
            </div>
            <span className="ctext2">满150可用</span>
          </div>
          <span className="ctext4">提莫家宠粉节宠物外出用品超级抵用券</span>
        </div>
      </div>
      <span className="ctext4">2019.11.01至2019.11.02，以下商品可使用该优惠券</span>
    </div>
  </div>
  <div className="cblock8">
  </div>
</div>
      </div>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
