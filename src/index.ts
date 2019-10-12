import {ICompData, INode} from "./types";
import extractor from './sketch/extractor';
import layout from './layout/index';
import h5Dsl from './dsls/html5';
let sketch = require('sketch');
const fs = require('@skpm/fs');


// 校验(sketch-validators)、视觉元素提取(get-nodes)、布局处理(layout)、代码生成(code-generators)
export default () => {

  // 视觉元素提取
  const layers = sketch.getSelectedDocument().selectedLayers;
  if (layers.length == 0) return;
  const nodes: INode[] = extractor(layers.layers[0]);

  // 布局处理
  const node: INode = layout(nodes);

  // 代码生成
  const code: ICompData = h5Dsl(node);
  fs.writeFileSync("/Users/shejijiang/Desktop/demo.html", code.vdom);
  fs.writeFileSync("/Users/shejijiang/Desktop/demo.css", code.style);

}

const rmParent = (node: INode) => {
  delete node.parent;
  node.children.forEach(child => rmParent(child));
}
