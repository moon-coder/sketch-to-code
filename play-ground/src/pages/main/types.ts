import Actions from './actions'

export interface IMainReducer {
  isReady: boolean
  collapsed: boolean
  isLoading?: boolean
}

export interface IMenusReducer {
  isReady: boolean
  isLoading?: boolean
}

export type ActionType = ReturnType<typeof Actions>
export type IAllReducerProps = {
  main: IMainReducer

  menus: IMenusReducer

  [name: string]: any
}

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType

export type ILeftTopProps = {}
export type ILeftTopState = {}

export type IHeaderProps = {}
export type IHeaderState = {}

export type IContentProps = {}
export type IContentState = {}

export type ILeftMenuProps = {}
export type ILeftMenuState = { openKeys: any[] }

//create by moon https://github.com/creasy2010/moon
