import * as React from 'react'
import { connect } from 'react-redux'
import './index.less'
import * as T from './types'
import actions from './actions'
import { store2Props } from './selectors'
import './index.less'
import { Icon } from 'antd'
import { Router, Route, Switch } from 'react-router-dom'
import LeftTop from './components/left-top'
import LeftMenu from './components/left-menu'
import TopNavHeader from './components/TopNavHeader'
import { Layout } from 'antd'
import * as reduxStore from '@/redux/store'
import loadable from '@loadable/component'
const { Sider, Header, Content } = Layout
// const GoodInfo = loadable(() => import('../good/info'));

@connect<Partial<T.IProps>, any>(
  store2Props,
  actions
)
export default class Main extends React.Component<Partial<T.IProps>, any> {
  constructor(props) {
    super(props)
    this.state = { collapsed: false }
  }

  handlerFold = (e) => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  componentDidMount() {
    this.props.actions.init()
  }

  componentWillUnmount() {
    this.props.actions.clean()
  }

  render() {
    let {
      actions: { mainAction, menuAction },
      main,
      menus,
      children
    } = this.props

    let collapsed = this.state.collapsed
    return (
      <Layout>
        <Sider
          className="sider"
          width={240}
          trigger={null}
          collapsible={true}
          collapsed={collapsed}
        >
          <LeftTop collapsed={collapsed} />
          <LeftMenu collapsed={collapsed} />
        </Sider>
        <Layout>
          <Header className={'header'}>
            <div className={'trigger'} onClick={this.handlerFold}>
              <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
            </div>
            <TopNavHeader />
          </Header>
          <Content className="content">{children}</Content>
        </Layout>
      </Layout>
    )
  }
}

import mainMain from '@/pages/main/reducers/main'
import mainMenus from '@/pages/main/reducers/menus'
reduxStore.registerReducer({
  mainMain,
  mainMenus
})

//create by moon https://github.com/creasy2010/moon
