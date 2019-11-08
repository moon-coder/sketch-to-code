import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import styles from './MenuLayout.less';
import Icon from '@/components/Icon';
import request from '@/utils/request';
import { homePage, manage } from './menulist';
import { isArray } from 'lodash';

const { SubMenu } = Menu;

interface MenuLayoutProps {
  children?: React.ReactChild;
}

const MenuLayout: React.FC<MenuLayoutProps> = props => {
  const [menuList, setMenuList] = useState([]);

  const refreshList = () => {
    request.get('/api/menu', {}).then(res => {
      let menuList = res.MenuList;
      if (isArray(menuList) && menuList.length) {
        setMenuList(menuList);
      } else {
        console.warn('Responce appList:', menuList);
      }
    });
  };



  useEffect(() => {
    refreshList();
  }, []);

  const getMenu = (list: any[]) => {
    let menuArr = [];
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      if (element && element.children) {
        menuArr.push(
          <SubMenu
            key={element.alias}
            title={
              <span>
                <Icon type={element.icon} />
                <span>{element.alias}</span>
              </span>
            }
          >
            {getMenu(element.children)}
          </SubMenu>,
        );
      } else {
        menuArr.push(
          <Menu.Item
            onClick={params => {
              console.log(params);
            }}
            key={element.alias}
          >
            <Icon type={element.icon} />
            <span>{element.alias}</span>
          </Menu.Item>,
        );
      }
    }
    return menuArr;
  };

  return (
    <div className={styles.menu}>
      <Menu mode="inline" theme="light" defaultSelectedKeys={['首页']}>
        {getMenu(homePage)}
        <Menu.ItemGroup className={styles.group} key="g2" title="">
          {getMenu(menuList)}
        </Menu.ItemGroup>
        <Menu.ItemGroup className={styles.group} key="g3" title="">
          {getMenu(manage)}
        </Menu.ItemGroup>
      </Menu>
    </div>
  );
};

export default MenuLayout;
