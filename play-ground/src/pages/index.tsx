import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, IndexRoute } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import history from '@/kit/history';
import 'regenerator-runtime/runtime';
import store from '@/redux/store';
import './index.less';
import Main from '@/pages/main';
import loadable from '@loadable/component';
const ApiManager = loadable(() => import('./api/manager'));

const App = () => (
  <LocaleProvider locale={zhCN}>
    <Provider store={store}>
      <Router history={history}>
        <Route
          path="/**"
          render={() => (
            <Main>
              {/* <Route path={`/good`} component={GoodInfo} /> */}
              <Route path={`/api/manager`} component={ApiManager} />
            </Main>
          )}
        ></Route>
      </Router>
    </Provider>
  </LocaleProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));


