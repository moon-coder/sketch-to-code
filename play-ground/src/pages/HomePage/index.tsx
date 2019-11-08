import * as React from 'react'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import './index.less'
import * as T from './types'
import { loadActions } from './actions'
import { store2Props } from './selectors'

import CardList from './components/CardList'

import Descripiton from './components/Descripiton'

import ShowCard from './components/ShowCard'

@connect<Partial<T.IProps>, any>(
  store2Props,
  loadActions()
)
export default class HomePage extends React.Component<Partial<T.IProps>, any> {
  constructor(props) {
    super(props)
    const { history, location } = this.props
  }

  componentDidMount() {
    const { query: q = {} } = this.props.location!
    if (q.access_token && q.refresh_token) {
      debugger
      Cookies.set('access_token', q.access_token)
      Cookies.set('refresh_token', q.refresh_token)
      delete q.access_token
      delete q.refresh_token
      const search = qs.stringify(q)
      history!.replace({
        pathname: location!.pathname,
        search
      })
    }
    this.props.actions.init()
  }

  componentWillUnmount() {
    this.props.actions.clean()
  }

  render() {
    let {
      actions: { action },
      main
    } = this.props

    return (
      <div id="homePage" className="homePage">
        首页
        <div />
      </div>
    )
  }
}

//create by moon https://github.com/creasy2010/moon
