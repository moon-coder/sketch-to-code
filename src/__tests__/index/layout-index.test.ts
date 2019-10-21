import {ICompData, INode} from "../../types";
import getNodes from "../../get-nodes";
import layout from "../../layout";
import {readJSONSync} from  'fs-extra';

import {join} from 'path';
import h5Generrator from "../../code-generators/html5";
/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2019/10/14
 **/

jest.mock('../../outer/sketch');

it('首页布局代码生成', function () {
    console.log("hello");

  let layers = readJSONSync(join(__dirname,"origin.json"));
  const nodes: INode[] = getNodes(layers.layers[0]);

  // 布局处理
  const node: INode = layout(nodes);
  debugger;
  //先看生成的 布局代码是否OK
  //破坏了结构 不能还原了..
  let excludeProperties= ['id','parent'];
  expect(JSON.stringify(node, (key, value)=>{
    if(excludeProperties.includes(key)) {
      return  undefined;
    }

    return value;
  })).toMatchSnapshot("index-layout");

});