import {INode} from "../../../types";
import getNodes from "../../../get-nodes";
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

it('list-origin', function () {
  let layers = readJSONSync(join(__dirname, "origin-0.json"));
  const nodes: INode[] = getNodes(layers.layers[0]);

  // 布局处理
  const node: INode = layout(nodes);

  const result = toJSON(node);

  expect(result).toMatchSnapshot("list-origin");
});
