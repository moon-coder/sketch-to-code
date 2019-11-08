import * as React from 'react';

import * as T from '../types';
import './content.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type IContentProps = T.IProps & T.IContentProps;

@connect<Partial<IContentProps>, T.IContentState>(
  store2Props,
  actions,
)
export default class Content extends React.Component<
  Partial<IContentProps>,
  T.IContentState
> {
  constructor(props: IContentProps) {
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
      <div className="content">
        <div />
      </div>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
