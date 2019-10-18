import {INode} from '../types';
import {calcBoundaryNode} from './utils';

/**
 * @desc
 * 布局第一步,行合并算法
 * 参考https://www.yuque.com/dscga7/bz0gzn/neh95s#PDMkL
 *
 *
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2019/10/15
 **/
export default function(nodes: INode[]): INode[] {
  //按y坐标 分组, 每一组中高度进行对比 如果一致则在结果中返回;
  return getYRange(nodes).map(rangeItem=>{
          let mergeNode = calcBoundaryNode(rangeItem.items);
          mergeNode.style.flexDirection = 'row';
          return mergeNode;
  })

  // nodes.map(node => node.frame.y);
  //
  // let rowIndexNodes: IndexNode = {};
  //
  // nodes.forEach(node => {
  //   if (rowIndexNodes[node.frame.y]) {
  //     rowIndexNodes[node.frame.y].push(node);
  //   } else {
  //     rowIndexNodes[node.frame.y] = [node];
  //   }
  // });
  //
  // let results: INode[] = [];
  //
  // for (let yIndex in rowIndexNodes) {
  //   //找出一组中,相同的高度的节点;;
  //   let rowNodes = rowIndexNodes[yIndex];
  //   let heightIndex: IndexNode = {};
  //
  //   rowNodes.forEach(node => {
  //     if (heightIndex[node.frame.height]) {
  //       heightIndex[node.frame.height].push(node);
  //     } else {
  //       heightIndex[node.frame.height] = [node];
  //     }
  //   });
  //
  //   for (let height in heightIndex) {
  //     let sameNodes = heightIndex[height];
  //     if (sameNodes.length === 1) {
  //       //没有相同节点直接合并;
  //       results = results.concat(sameNodes);
  //     } else {
  //       //多个节点合并起来..
  //       let mergeNode = calcBoundaryNode(sameNodes);
  //       mergeNode.style.flexDirection = 'row';
  //       results.push(mergeNode);
  //     }
  //   }
  // }

  // return results;
}

export interface IndexNode {
  [key: number]: INode[];
}

/**
 * 获取元素在某个轴线(x,y)上的分布情况;
 * 为接下来寻找空隙找到原因;
 */
function getYRange(nodes: INode[]) :RangeItem[]{
  let ranges: RangeItem[] = [];

  for (let i = 0, iLen = nodes.length; i < iLen; i++) {
    let node = nodes[i];

    let range = getMatchRange(node, ranges);
    if (range) {
      range.addNode(node);
    } else {
      ranges.push(new RangeItem(node));
    }

    // node.frame.y node.frame.height
    // rangeResult
  }
  return ranges  ;
}

function getMatchRange(
  node: INode,
  rangesItems: RangeItem[],
): RangeItem | undefined {
  for (let i = 0, iLen = rangesItems.length; i < iLen; i++) {
    let rangesItem = rangesItems[i];
    let {x, y, height, width} = node.frame;
    let lineMin = y,
      lineMax = y + height;
    if (
      (lineMax >= rangesItem.min && lineMin <= rangesItem.max) ||
      (lineMin <= rangesItem.max && lineMax >=rangesItem.min)
    ) {
      return rangesItem;
    }
  }
}

/**
 * Y或x轴影射相交在一起的元素
 */
export class RangeItem {
  constructor(node: INode) {
    let {y, height} = node.frame;
    this.min = y;
    this.max = y + height;
    this.items = [node];
  }

  items: INode[];
  min: number;
  max: number;

  addNode(node: INode) {
    let {y, height} = node.frame;
    this.min = this.min < y ? this.min : y;
    this.max = this.max > y + height ? this.max : y + height;
    this.items.push(node);
  }
}
