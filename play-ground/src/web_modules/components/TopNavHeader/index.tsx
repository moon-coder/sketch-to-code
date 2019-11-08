import React, { useState } from 'react';
import { Layout, Row } from 'antd';
import RightContent from '@/components/TopNavHeader/RightContent'
import moment from 'moment';
import style from './index.less';

interface BasicLayoutProps {}
const currentDay = moment().format('YYYY-MM-DD');

const TopNavHeader: React.FC<BasicLayoutProps> = props => {


  return (
    <div className={style.main}>
      <div className={style.moment}>{currentDay}</div>
      <RightContent />
    </div>
  );
};
export default TopNavHeader;
