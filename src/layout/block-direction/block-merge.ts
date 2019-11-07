import {INode} from '../../types';
import {calcBoundaryNode, isOverlap} from '../utils';

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
      debugger;
      console.log('无合适节点进行合并,请检查对应结构');
    } else if (mergeable.length === 1) {
      let newNode = calcBoundaryNode([minNode, mergeable[0]]);
      newNode.style.flexDirection = getRelPosition(minNode, mergeable[0]);
      nodes = [newNode, ...unMergeable];
    } else {
      let {adapterNode, others} = getMinAreaMergeNode(minNode, mergeable);
      let newNode = calcBoundaryNode([minNode, adapterNode]);
      newNode.style.flexDirection = getRelPosition(minNode, adapterNode);
      nodes = [newNode, ...others, ...unMergeable];
    }
  } while (nodes.length >= 2);

  return nodes[0];
}

function getRelPosition(node1: INode, node2: INode) {
  let {x: x1, y: y1, width: width1, height: height1} = node1.frame;
  let {x: x2, y: y2, width: width2, height: height2} = node2.frame;

  let xRel = lineCompare(
    {beg: x1, end: x1 + width1},
    {beg: x2, end: x2 + width2},
  );
  let yRel = lineCompare(
    {beg: y1, end: y1 + height1},
    {beg: y2, end: y2 + height2},
  );

  //TODO 先有一个大概的.
  if (xRel === 'right' || xRel === 'left') {
    return 'row';
  } else {
    return 'column';
  }
}

//第二个节点被 第一个节点 XXXX
const LineResult: {[key: string]: string} = {
  '0::-1::0::1': 'equals', //相等重合
  '0::-1::-1::1': 'left-contain', //左包含
  '0::-1::1::1': 'left-contained', //左被包含
  '-1::-1::0::1': 'right-contained', //右被包含
  '-1::-1::-1::0': 'left-overlap', //左重合
  '-1::-1::-1::-1': 'left', //左
  '-1::-1::-1::1': 'left-overlap', //左重合

  '-1::-1::1::1': 'contained', //被包含
  '1::0::1::1': 'right', //右侧
  '1::-1::0::1': 'right-contain', //右包含
  '1::-1::-1::1': 'contain', //包含
  '1::-1::1::1': 'right-overlap', //右重合
  '1::1::1::1': 'right', //右
};

interface ILine {
  beg: number;
  end: number;
}

/**
 * 线段比较
 *
 * @param {ILine} lineOne
 * @param {ILine} lineTwo
 */
function lineCompare(lineOne: ILine, lineTwo: ILine) {
  let begbegCompare = lineTwo.beg - lineOne.beg;
  let endendCompare = lineTwo.end - lineOne.end;
  let begendCompare = lineTwo.beg - lineOne.end;
  let endbegCompare = lineTwo.end - lineOne.beg;

  let begbegFlag = begbegCompare === 0 ? '0' : begbegCompare > 0 ? '1' : '-1';
  let begendFlag = begendCompare === 0 ? '0' : begendCompare > 0 ? '1' : '-1';
  let endendFlag = endendCompare === 0 ? '0' : endendCompare > 0 ? '1' : '-1';
  let endbegFlag = endbegCompare === 0 ? '0' : endbegCompare > 0 ? '1' : '-1';
  let flag = `${begbegFlag}::${begendFlag}::${endendFlag}::${endbegFlag}`;

  let result = LineResult[flag];

  if (result) {
    return result;
  } else {
    throw new Error('未识别出位置关系' + lineOne + lineTwo + '==' + flag);
  }
}

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
    if(restNodes.length===4){
      debugger;
    }
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
