import {INode} from "../../../types";
import getNodes from "../../../get-nodes";
import layout from "../../../layout";
import {readJSONSync,writeJSONSync} from  'fs-extra';
import {join} from 'path';
import {loadeOrigin} from "../../util";
import {toJSON} from "../../../util";

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
  let layers = loadeOrigin(join(__dirname,"origin-0.json"));
  const nodes: INode[] = getNodes(layers.layers[0]);

  // 布局处理
  const node: INode = layout(nodes);
  debugger;
  const result =toJSON(node);
  expect(result).toMatchSnapshot("list-item");
});

it('list-origin1 ', function () {
  let layers = loadeOrigin(join(__dirname,"origin-1.json"));
  const nodes: INode[] = getNodes(layers.layers[0]);

  // 布局处理
  const node: INode = layout(nodes);
  debugger;
  const result =toJSON(node);
  expect(result).toMatchSnapshot("list-origin1");
});


