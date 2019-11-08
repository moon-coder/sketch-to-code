import React from 'react';
import Icon from '@/components/Icon';
import styles from './RightContent.less';

function RightContent() {
  return (
    <div className={styles.rightContent}>
      <Icon type="user"></Icon>
      管理员
    </div>
  );
}

export default RightContent;
