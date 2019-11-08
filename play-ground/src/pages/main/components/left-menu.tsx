import * as React from 'react'

import * as T from '../types'
import './left-menu.less'
import actions from '../actions/index'
import { connect } from 'react-redux'
import { store2Props } from '../selectors'
// import Icon from '@/components/Icon';
import { Menu } from 'antd'
import Icon from '../../../web_modules/components/Icon'
const { SubMenu } = Menu

type ILeftMenuProps = T.IProps & T.ILeftMenuProps

@connect<Partial<ILeftMenuProps>, T.ILeftMenuState>(
  store2Props,
  actions
)
export default class LeftMenu extends React.Component<
  Partial<ILeftMenuProps>,
  T.ILeftMenuState
> {
  constructor(props: ILeftMenuProps) {
    super(props)
    this.state = {
      openKeys: []
    }
  }

  /**
   * fold 按钮触发之后收起展开的子菜单
   * @memberof LeftMenu
   */
  componentWillReceiveProps() {
    this.setState({ openKeys: [] })
  }

  onOpenChange = (keys) => {
    const latestOpenKey = keys.find(
      (key) => this.state.openKeys.indexOf(key) === -1
    )
    keys = latestOpenKey ? [latestOpenKey] : []
    this.setState({ openKeys: keys })
  }

  // menuChange = (params: any) => {
  //   if (!params.key) {
  //     return
  //   }
  //   router.push({
  //     pathname: params.key
  //   })
  // }
  /**
    
*/
  render() {
    let {
      actions: { mainAction, menuAction },
      main,
      menus
    } = this.props
    let { openKeys } = this.state

    return (
      <div className="leftMenu">
        <Menu
          openKeys={openKeys}
          theme="dark"
          onOpenChange={this.onOpenChange}
          mode="inline"
          defaultSelectedKeys={['index112']}
        >
          {getMenu(homePage)}
          {/*{getMenu(menuList)}*/}
          {getMenu(manage)}
        </Menu>
      </div>
    )
  }
}

export const homePage = [
  {
    id: 'index112',
    name: '首页',
    icon: 'icon-shouye'
  }
]
export const manage = [
  {
    id: 'index113',
    name: '管理后台',
    icon: 'icon-guanlihoutai',
    children: [
      {
        id: 'index114',
        name: '用户管理',
        icon: 'icon-bangzhuwendang'
      },
      {
        id: 'index115',
        name: '角色管理',
        icon: 'icon-bangzhuwendang'
      }
    ]
  },
  {
    id: 'index116',
    name: '帮助文档',
    icon: 'icon-bangzhuwendang'
  }
]

const getMenu = (list: any[]) => {
  let menuArr = []
  for (let index = 0; index < list.length; index++) {
    const element = list[index]
    if (element && element.children) {
      menuArr.push(
        <SubMenu
          key={element.id}
          title={
            <span>
              <Icon type={element.icon || 'icon-bangzhuwendang'} />
              <span>{element.name}</span>
            </span>
          }
        >
          {getMenu(element.children)}
        </SubMenu>
      )
    } else {
      menuArr.push(
        <Menu.Item
          onClick={(params) => {
            console.log('Menu.Item')
          }}
          key={element.id}
        >
          <Icon type={element.icon || 'icon-bangzhuwendang'} />
          <span>{element.name}</span>
        </Menu.Item>
      )
    }
  }
  return menuArr
}
//create by moon https://github.com/creasy2010/moon
