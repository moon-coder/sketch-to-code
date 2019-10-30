import {ICompData, INode} from "./types";

import layout from './layout/index';
import h5Generrator from './generators/html5';
const fs = require('@skpm/fs');
// @ts-ignore
import { getNodes } from './sketch';

import { OutPutPath } from './util';

export default () => {

  // 视觉元素提取
  const nodes: INode[] = getNodes();

  // 布局处理
  const node: INode = layout(nodes);

  // 代码生成
  const code: ICompData = h5Generrator(node);

  fs.writeFileSync(`${OutPutPath}/temp/demo.html`, code.vdom);
  fs.writeFileSync(`${OutPutPath}/temp/demo.less`, code.style);
}
