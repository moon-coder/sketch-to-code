
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
    </div>
    <span className="ctext0">卡项权益</span>
  </div>
  <div className="cblock3">
    <div className="cblock4">
      <span className="ctext7">美容服务</span>
      <span className="ctext7">×10</span>
    </div>
    <div className="cblock5">
      <span className="ctext3">凶悍大叔洗澡</span>
      <span className="ctext4">温柔小姐姐做造型</span>
      <span className="ctext8">精油美毛</span>
    </div>
    <span className="ctext2">满150可用</span>
  </div>
  <div className="cblock6">
    <span className="ctext7">清洁服务</span>
    <span className="ctext7">×10</span>
  </div>
  <div className="cblock7">
    <span className="ctext8">凶悍大叔洗澡</span>
    <span className="ctext9">温柔小姐姐做造型</span>
  </div>
</div>
      </div>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
