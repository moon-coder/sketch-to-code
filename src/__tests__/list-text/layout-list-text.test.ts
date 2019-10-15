import {INode} from "../../types";
import getNodes from "../../get-nodes";
import layout from "../../layout";
import {readJSONSync,writeJSONSync} from  'fs-extra';
import {join} from 'path';

/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2019/10/14
 **/


it('list-text', function () {
  console.log("hello");

  let layers = readJSONSync(join(__dirname,"origin.json"));
  const nodes: INode[] = getNodes(layers.layers[0]);

  // 布局处理
  const node: INode = layout(nodes);

  const result =toJSON(node);

  writeJSONSync(join(__dirname,"list-text-layout-result.json"),result,{spaces:2});
  expect(result).toMatchSnapshot("list-text-layout");
});


const IgnoreKey = ['__layer','parent'];
function toJSON(node: INode) {

  return JSON.parse(JSON.stringify(node, (key, value)=>{
    if(IgnoreKey.includes(key)) {
      return  undefined;
    }
    return value;
  },2))
}