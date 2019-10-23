import {ICompData, INode} from "./types";
import getNodes from './get-nodes';
import layout from './layout/index';
import h5Generrator from './code-generators/html5';
let sketch = require('sketch');
const fs = require('@skpm/fs');
import { exportImg } from './sketch-utils';

// 校验(sketch-validators)、视觉元素提取(get-nodes)、布局处理(layout)、代码生成(code-generators)
export default () => {

  // 视觉元素提取
  const layers = sketch.getSelectedDocument().selectedLayers;
  if (layers.length == 0) {
    sketch.UI.message('No layers are selected.')
    return;
  }
  fs.writeFileSync("/Users/dong/Falcon/sketch-to-code/src/__tests__/list-text/origin.json", JSON.stringify(layers));

  const layer = layers.layers[0];

  // 整体截图
  exportImg(layer);

  const nodes: INode[] = getNodes(layer);

  // 布局处理
  const node: INode = layout(nodes);

  // 代码生成
  const code: ICompData = h5Generrator(node);

  fs.writeFileSync("/Users/dong/Falcon/sketch-to-code/temp/demo.html", code.vdom);
  fs.writeFileSync("/Users/dong/Falcon/sketch-to-code/temp/demo.css", code.style);
}

const rmParent = (node: INode) => {
  delete node.parent;
  //@ts-ignore
  node.children.forEach(child => rmParent(child));
}
