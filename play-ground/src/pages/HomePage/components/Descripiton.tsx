import * as React from 'react';

import * as T from '../types';
import './Descripiton.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type IDescripitonProps = T.IProps & T.IDescripitonProps;

@connect<Partial<IDescripitonProps>, T.IDescripitonState>(
  store2Props,
  actions,
)
export default class Descripiton extends React.Component<
  Partial<IDescripitonProps>,
  T.IDescripitonState
> {
  constructor(props: IDescripitonProps) {
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
      <div className="descripiton">
        <div />
      </div>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
