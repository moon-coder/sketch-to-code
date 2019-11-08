import React, { useState } from 'react';
import { Layout } from 'antd';
import RightContent from './RightContent';

interface BasicLayoutProps {
}

const GlobalHeader: React.FC<BasicLayoutProps> = props => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return <Layout></Layout>;
};
export default GlobalHeader;
