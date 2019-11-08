import * as React from 'react';

import * as T from '../types';
import './header.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type IHeaderProps = T.IProps & T.IHeaderProps;

@connect<Partial<IHeaderProps>, T.IHeaderState>(
  store2Props,
  actions,
)
export default class Header extends React.Component<
  Partial<IHeaderProps>,
  T.IHeaderState
> {
  constructor(props: IHeaderProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {
        mainAction,

        menuAction,
      },
      main,

      menus,
    } = this.props;

    return (
      <div className="header">
        <div />
      </div>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
