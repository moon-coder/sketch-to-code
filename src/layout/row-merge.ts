import {INode} from '../types';
import {calcBoundaryNode} from './utils';
import {getRangeItemUtil} from './range-item';

let yUtil = getRangeItemUtil('y');
let xUtil = getRangeItemUtil('x');

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

  let yranges = yUtil.getRanges(nodes);
  let xranges = xUtil.getRanges(nodes);
  let flexDirection="y";
  let resultRanges;
  if (xranges.length > yranges.length) {
    flexDirection = "x";
    resultRanges = xUtil.mergeSameBlock(xranges);
    resultRanges = xUtil.mergeSplitEqualBlock(resultRanges);
  } else {

    resultRanges = yUtil.mergeSameBlock(yranges);
    resultRanges = yUtil.mergeSplitEqualBlock(resultRanges);
  }

  //包装后还是一个节点就没必要包起来了.
  if (resultRanges.length === 1) {
    return nodes;
  } else {
    return resultRanges.map(rangeItem => {
      let mergeNode = calcBoundaryNode(rangeItem.items);
      mergeNode.style.flexDirection = flexDirection==='y'?'row':'column';
      return mergeNode;
    });
  }
}
