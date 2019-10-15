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

  nodes.map(node => node.frame.y);

  let rowIndexNodes: IndexNode = {};

  nodes.forEach(node => {
    if (rowIndexNodes[node.frame.y]) {
      rowIndexNodes[node.frame.y].push(node);
    } else {
      rowIndexNodes[node.frame.y] = [node];
    }
  });

  let results: INode[] = [];

  for (let yIndex in rowIndexNodes) {
    //找出一组中,相同的高度的节点;;
    let rowNodes = rowIndexNodes[yIndex];
    let heightIndex: IndexNode = {};

    rowNodes.forEach(node => {
      if (heightIndex[node.frame.height]) {
        heightIndex[node.frame.height].push(node);
      } else {
        heightIndex[node.frame.height] = [node];
      }
    });

    for (let height in heightIndex) {
      let sameNodes = heightIndex[height];
      if (sameNodes.length === 1) {
        //没有相同节点直接合并;
        results.concat(sameNodes);
      } else {
        //多个节点合并起来..
        let mergeNode = calcBoundaryNode(sameNodes);
        results.push(mergeNode);
      }
    }
  }

  return results;
}

export interface IndexNode {
  [key: number]: INode[];
}
