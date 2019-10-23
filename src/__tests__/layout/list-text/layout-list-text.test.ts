import {INode} from "../../../types";
import getNodes from "../../../get-nodes";
import layout from "../../../layout";
import {join} from 'path';
import {toJSON} from "../../../util";
import {loadeOrigin} from "../../util";

/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2019/10/14
 **/

jest.mock('../../../outer/sketch');



it('list-origin', function () {
  let layers = loadeOrigin(join(__dirname,"origin.json"));
  const nodes: INode[] = getNodes(layers.layers[0]);

  // 布局处理
  const node: INode = layout(nodes);

  const result =toJSON(node);

  expect(result).toMatchSnapshot("list-origin");
});


it('list-origin-2', function () {
  let layers = loadeOrigin(join(__dirname,"origin.json"));
  const nodes: INode[] = getNodes(layers.layers[0]);

  // 布局处理
  const node: INode = layout(nodes);

  const result =toJSON(node);
  expect(result).toMatchSnapshot("list-origin-2");
});



it('list-origin-3', function () {
  let layers = loadeOrigin(join(__dirname,"origin-3.json"));
  const nodes: INode[] = getNodes(layers.layers[0]);

  // 布局处理
  const node: INode = layout(nodes);

  const result =toJSON(node);
  expect(result).toMatchSnapshot("list-origin-3");
});
