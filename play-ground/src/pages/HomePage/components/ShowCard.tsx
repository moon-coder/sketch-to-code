import * as React from 'react';

import * as T from '../types';
import './ShowCard.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type IShowCardProps = T.IProps & T.IShowCardProps;

@connect<Partial<IShowCardProps>, T.IShowCardState>(
  store2Props,
  actions,
)
export default class ShowCard extends React.Component<
  Partial<IShowCardProps>,
  T.IShowCardState
> {
  constructor(props: IShowCardProps) {
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
      <div className="showCard">
        <div />
      </div>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
