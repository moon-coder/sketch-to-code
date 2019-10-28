import {INode} from "../../../types";
import getNodes from "../../../get-nodes";
import layout from "../../../layout";
import {join} from 'path';
import {loadeOrigin} from "../../util";
import {toJSON} from "../../../util";

jest.mock('../../../outer/sketch');


it('list-origin-0', function () {
  let layers = loadeOrigin(join(__dirname,"origin-0.json"));
  const nodes: INode[] = getNodes(layers.layers[0]);

  // 布局处理
  const node: INode = layout(nodes);
  debugger;
  const result =toJSON(node);
  expect(result).toMatchSnapshot("list-origin0");
});


