import Store from '@/redux/store'
import { Command } from '../constant'
import { Dispatch } from 'typings'
import { getActionProxy } from '@/redux/action-util'
import api from 'api'
import * as reduxStore from '@/redux/store'

import MainAction from './mainAction'

import MenuAction from './menuAction'

import mainMain from '../reducers/main'

import mainMenus from '../reducers/menus'

export default (dispatch: Dispatch) => {
  const actions = {
    mainAction: getActionProxy<typeof MainAction>(MainAction)(dispatch),

    menuAction: getActionProxy<typeof MenuAction>(MenuAction)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer()

      const info = await api.menuApi.queryMenus()
      console.log(info)

      dispatch({
        type: Command.init,
        payload: {
          //main  :{},
          //menus  :{},
        }
      })
    },
    /**
     * 重置
     */
    async clean() {
      dispatch({ type: Command.clean })
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        mainMain,

        mainMenus
      })
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      // if (reduxStore.deregister) {
      //   reduxStore.deregister(['mainMain', 'mainMenus']);
      // } else {
      //   console.error('请在redux/store中实现deregister逻辑. ');
      // }
    }
  }

  return { actions }
}

//create by moon https://github.com/creasy2010/moon
