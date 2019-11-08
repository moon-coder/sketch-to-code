import * as React from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import {loadActions} from './actions';
import {store2Props} from './selectors';

import Info from './components/info';
import Demo from './components/demo';

@connect<Partial<T.IProps>, any>(
  store2Props,
  loadActions(),
)
export default class ApiManager extends React.Component<
  Partial<T.IProps>,
  any
> {
  componentDidMount() {
    this.props.actions.init();
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <div id="apiManager" className="apiManager">
        <Demo />
      </div>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
