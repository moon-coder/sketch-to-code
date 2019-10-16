import {INode} from '../../types';
import {toJSON} from '../../util';
import getNodes from '../../get-nodes';
import layout from '../../layout';
import {join} from 'path';
import {loadeOrigin} from "../util";

/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2019/10/15
 **/

let layers =loadeOrigin(join(__dirname, 'origin.json'));

const nodes: INode[] = getNodes(layers.layers[0]);

debugger;
// 布局处理
const node: INode = layout(nodes);

debugger;
const result = toJSON(node);
