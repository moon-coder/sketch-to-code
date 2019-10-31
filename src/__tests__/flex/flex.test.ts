import {INode} from "../../types";
import getNodes from "../../sketch/get-nodes";
import layout from "../../layout";
import {readJSONSync} from  'fs-extra';

import {join} from 'path';
import {toJSON} from "../../util";

jest.mock('../../../outer/sketch');


const test = (caseName: string) => {
  let layers = readJSONSync(join(__dirname, caseName + "origin.json"));
  const nodes: INode[] = getNodes(layers.layers[0]);
  const node: INode = layout(nodes);
  const result = toJSON(node);
  expect(result).toMatchSnapshot(caseName);
}

it('单行文本', function () {
  test('flex0');
});

it('多行文本', function () {
  test('flex1');
});

it('多行图文列表', function () {
  test('flex2');
});

