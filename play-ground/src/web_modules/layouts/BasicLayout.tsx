import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import styles from './BasicLayout.less';
import Icon from '@/components/Icon';
import classnames from 'classnames';
import Menu from './MenuLayout';
import Cookies from 'js-cookie';
import qs from 'query-string';
import RightContent from './RightContent';
import TopNavHeader from '@/components/TopNavHeader';

const { Sider, Header, Content } = Layout;

interface BasicLayoutProps {
  children?: React.ReactChild;
  history: any;
  location: any;
}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { history, location } = props;
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    // @ts-ignore
    const { query: q = {} } = location!;
    if (q.access_token && q.refresh_token) {
      Cookies.set('access_token', q.access_token);
      Cookies.set('refresh_token', q.refresh_token);
      delete q.access_token;
      delete q.refresh_token;
      const search = qs.stringify(q);
      history!.replace({
        pathname: location!.pathname,
        search,
      });
    }
  }, []);

  return (
    <Layout>
      <Sider className={styles.sider} trigger={null} collapsible={true} collapsed={collapsed}>
        <div className={styles.logo}>
          <div className={styles.projectName}>
            <Icon type="icon-logo" />
            <span
              className={classnames({
                [styles.collapsed]: collapsed,
              })}
            >
              云脉
            </span>
          </div>
          <div
            className={classnames(styles.projectDescription, {
              [styles.collapsed]: collapsed,
            })}
          >
            Cloud Pulse
          </div>
        </div>
        <Menu></Menu>
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <div className={styles.trigger} onClick={toggle}>
            <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
          </div>
          <RightContent></RightContent>
          <TopNavHeader />
        </Header>
        <Content className={styles.content}>{props.children}</Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
