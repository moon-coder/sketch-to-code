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


it('简易列表代码生成', function () {
  console.log("hello");
  //TODO 等图片的问题处理好.

  let layers = readJSONSync(join(__dirname,"origin.json"));
  const nodes: INode[] = getNodes(layers.layers[0]);

  // 布局处理
  const node: INode = layout(nodes);

  const result =toJSON(node);

  writeJSONSync(join(__dirname,"list-layout-result.json"),result);
  expect(result).toMatchSnapshot("list-layout");
});


function toJSON(node: INode) {

  return JSON.parse(JSON.stringify(node, (key, value)=>{
    if(key === "parent") {
      return  undefined;
    }
    return value;
  },2))
}