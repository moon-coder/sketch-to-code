import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';

import Action from './action';

import apiManagerMain from '../reducers/main';

export function loadActions() {
  reduxStore.registerReducer({
    apiManagerMain,
  });
  return mapDispatchToProps;
}

export default function mapDispatchToProps(dispatch: Dispatch) {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      dispatch({
        type: Command.init,
        payload: {
          //main  :{},
        },
      });
    },
    /**
     * 重置
     */
    async clean() {
      dispatch({type: Command.clean});
    },
  };

  return {actions};
}

//create by moon https://github.com/creasy2010/moon
