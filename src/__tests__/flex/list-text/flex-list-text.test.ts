import {INode} from "../../../types";
import getNodes from "../../../sketch/get-nodes";
import layout from "../../../layout";
import {readJSONSync} from 'fs-extra';

import {join} from 'path';
import {toJSON} from "../../../util";

jest.mock('../../../outer/sketch');

/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2019/10/23
 **/

it('flex/list-text-0', function () {
  let layers = readJSONSync(join(__dirname, "origin-0.json"));
  const nodes: INode[] = getNodes(layers.layers[0]);

  // 布局处理
  const node: INode = layout(nodes);

  const result = toJSON(node);

  expect(result).toMatchSnapshot("list-origin");
});

it('flex/list-text-1', function () {
  let layers = readJSONSync(join(__dirname, "origin-1.json"));
  const nodes: INode[] = getNodes(layers.layers[0]);

  // 布局处理
  const node: INode = layout(nodes);

  const result = toJSON(node);

  expect(result).toMatchSnapshot("list-origin-1");
});
