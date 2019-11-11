import {INode} from '../../types';
import {calcBoundaryNode, isOverlap} from '../utils';
import {getRelPosition, mergeNode} from "./merge-util";

/**
 * @desc
 * 布局第二步,行合并算法
 * 参考https://www.yuque.com/dscga7/bz0gzn/neh95s#PDMkL
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2019/10/15
 **/
export default function(nodes: INode[]): INode {
  //按最小面积进行合并
  if (nodes.length === 1) {
    return nodes[0];
  }

  //TODO 检查元素是否存在互相覆盖的情况;


  do {
    //area
    const nodesByArea: INode[] = sortByArea(nodes);

    //TODO 要检测不能合并的节点;
    let [minNode, ...restNode] = nodesByArea;
    let {mergeable, unMergeable} = getMergeableNodes(minNode, restNode);


    if (mergeable.length === 0) {
      console.log('无合适节点进行合并,请检查对应结构');
    } else if (mergeable.length === 1) {

      // let newNode = calcBoundaryNode([minNode, mergeable[0]]);
      // newNode.style.flexDirection = getRelPosition(minNode, mergeable[0]);
      nodes = [mergeNode(minNode, mergeable[0]), ...unMergeable];
    } else {
      let {adapterNode, others} = getMinAreaMergeNode(minNode, mergeable);

      // let newNode = calcBoundaryNode([minNode, adapterNode]);
      // newNode.style.flexDirection = getRelPosition(minNode, adapterNode);
      nodes = [mergeNode(minNode, adapterNode), ...others, ...unMergeable];
    }
  } while (nodes.length >= 2);

  return nodes[0];
}

//第二个节点被 第一个节点 XXXX


/**
 * 获取后成后面积最小的节点;
 * @param {INode} targetNode
 * @param {INode[]} mergeableNodes
 */
function getMinAreaMergeNode(
  targetNode: INode,
  mergeableNodes: INode[],
): {
  adapterNode: INode;
  others: INode[];
} {
  let minArea = null,
    minNodeIndex: number = 0;

  for (let i = 0, iLen = mergeableNodes.length; i < iLen; i++) {
    let mergeableNode = mergeableNodes[i];
    let {frame: {width, height}} = calcBoundaryNode([
      mergeableNode,
      targetNode,
    ]);
    let targetArea = width * height;

    if (minArea === null) {
      minArea = targetArea;
      minNodeIndex = i;
    }

    if (minArea && minArea > targetArea) {
      minArea = targetArea;
      minNodeIndex = i;
    }
  }

  let adapterNode = mergeableNodes.splice(minNodeIndex, 1);

  return {
    adapterNode: adapterNode[0],
    others: mergeableNodes,
  };
}

function sortByArea(nodes: INode[]): INode[] {
  nodes.sort((a, b) => {
    let area1 = a.frame.width * a.frame.height;
    let area2 = b.frame.width * b.frame.height;
    return area1 - area2;
  });
  return nodes;
}

/**
 * 获取可以合并和不可以合并的node节点;
 * @param {INode} targetNode
 * @param {INode[]} restNodes
 * @returns {{mergeable: INode[]; unMergeable: INode[]}}
 */
function getMergeableNodes(
  targetNode: INode,
  restNodes: INode[],
): {
  mergeable: INode[];
  unMergeable: INode[];
} {
  let mergeable: INode[] = [],
    unMergeable: INode[] = [];

  restNodes.forEach(node => {
    if (isOverLapThird(targetNode, node, restNodes)) {
      unMergeable.push(node);
    } else {
      mergeable.push(node);
    }
  });
  return {mergeable, unMergeable};
}

/**
 * highApi,判断两个node合并后是否会覆盖到第三个;
 *
 * @param {INode} first
 * @param {INode} second
 * @param {INode[]} restNodes  可能包含第一 第二个节点
 */
function isOverLapThird(
  first: INode,
  second: INode,
  restNodes: INode[],
): boolean {
  let newNode = calcBoundaryNode([first, second]);

  for (let i = 0, iLen = restNodes.length; i < iLen; i++) {
    let node = restNodes[i];

    if (node === first || node === second) {
      continue;
    }

    if (isOverlap(newNode, node)) {
      return true;
    }
  }
  return false;
}
