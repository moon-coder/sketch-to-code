import * as React from 'react'

import * as T from '../types'
import './left-top.less'
import actions from '../actions/index'
import { connect } from 'react-redux'
import { store2Props } from '../selectors'
import Icon from '../../../web_modules/components/Icon'
// import { Icon } from 'antd'

type ILeftTopProps = T.IProps & T.ILeftTopProps

@connect<Partial<ILeftTopProps>, T.ILeftTopState>(
  store2Props,
  actions
)
export default class LeftTop extends React.Component<
  Partial<ILeftTopProps>,
  T.ILeftTopState
> {
  constructor(props: ILeftTopProps) {
    super(props)
  }

  /**
   */
  render() {
    let {
      actions: { mainAction, menuAction },
      main,
      menus,
      collapsed
    } = this.props

    return (
      <div className="leftTop">
        <div className="logo">
          <div className={'projectName'}>
            <Icon type="icon-logo" />
            <span className={collapsed ? 'collapsed' : null}>云脉</span>
          </div>
          <div className={collapsed ? 'collapsed' : 'projectDescription'}>
            Cloud Pulse
          </div>
        </div>
      </div>
    )
  }
}

//create by moon https://github.com/creasy2010/moon
