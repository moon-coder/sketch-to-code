import * as React from 'react';

import * as T from '../types';
import './CardList.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type ICardListProps = T.IProps & T.ICardListProps;

@connect<Partial<ICardListProps>, T.ICardListState>(
  store2Props,
  actions,
)
export default class CardList extends React.Component<
  Partial<ICardListProps>,
  T.ICardListState
> {
  constructor(props: ICardListProps) {
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
      <div className="cardList">
        <div />
      </div>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
