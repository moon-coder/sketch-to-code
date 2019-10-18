import {INode} from '../types';
import {calcBoundaryNode} from './utils';
import {Range} from "istanbul-lib-coverage";

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

  let yrange = getYRange(nodes);
  if (yrange.length > 1) {
    return yrange.map(rangeItem => {
      debugger;
      let mergeNode = calcBoundaryNode(rangeItem.items);
      mergeNode.style.flexDirection = 'row';
      return mergeNode;
    });
  } else {
    return nodes;
  }
}

/**
 * 获取元素在某个轴线(x,y)上的分布情况;
 * 为接下来寻找空隙找到原因;
 */
function getYRange(nodes: INode[]): RangeItem[] {
  let ranges: RangeItem[] = [];

  for (let i = 0, iLen = nodes.length; i < iLen; i++) {
    let node = nodes[i];

    let range = getMatchRange(node, ranges);
    if (range) {
      range.addNode(node);
      ranges= mergeRange(ranges,range)
    } else {
      ranges.push(new RangeItem(node));
    }
  }

  return ranges;
}

function mergeRange(ranges: RangeItem[], rangeItem: RangeItem):RangeItem[] {

  let result = [rangeItem];
  for (let i = ranges.length-1; i >=0 ; i--) {
    let rangeOne = ranges[i];
    if(rangeItem===rangeOne){
      continue;
    }

    if(RangeItem.isMergeable(rangeOne,rangeItem)){
    } else {
      result.push(rangeOne);
    }
  }
  return result;
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
      (lineMin <= rangesItem.max && lineMax >= rangesItem.min)
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

  static isMergeable(item1:RangeItem,item2:RangeItem):boolean{

    let lineMax= item1.max, lineMin=item1.min;
    if (lineMax >= item2.min && lineMin <= item2.max) {
      return true;
    } else if (lineMin <= item2.max && lineMax >= item2.min) {
      return true;
    }
    return false

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

  concat(rangeItem:RangeItem) {

    this.items.concat(rangeItem.items)
  }
}
