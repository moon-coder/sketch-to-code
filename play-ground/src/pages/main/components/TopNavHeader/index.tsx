import React, { useState } from 'react';
import RightContent from './RightContent'
import moment from 'moment';
import './index.less';

interface BasicLayoutProps {}
const currentDay = moment().format('YYYY-MM-DD');

const TopNavHeader: React.FC<BasicLayoutProps> = props => {
  return (
    <div className="main">
      <div className="moment">{currentDay}</div>
      <RightContent />
    </div>
  );
};
export default TopNavHeader;
