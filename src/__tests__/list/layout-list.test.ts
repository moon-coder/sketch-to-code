import {INode} from "../../types";
import getNodes from "../../get-nodes";
import layout from "../../layout";
import {readJSONSync,writeJSONSync} from  'fs-extra';
import {join} from 'path';
import {loadeOrigin} from "../util";

/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2019/10/14
 **/

jest.mock('../../outer/sketch');


it('list-item ', function () {

  let layers = loadeOrigin(join(__dirname,"origin.json"));
  const nodes: INode[] = getNodes(layers.layers[0]);

  // 布局处理
  const node: INode = layout(nodes);
  debugger;
  const result =toJSON(node);
  expect(result).toMatchSnapshot("list-item");
});


function toJSON(node: INode) {

  return JSON.parse(JSON.stringify(node, (key, value)=>{
    if(key === "parent") {
      return  undefined;
    }
    return value;
  },2))
}