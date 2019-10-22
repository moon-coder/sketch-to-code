import {INode} from '../types';
import {calcBoundaryNode, isSameSchema} from './utils';
import {Range} from 'istanbul-lib-coverage';

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

  //TODO Y坐标(行投影)也X坐标(列投影)要策略的选择那个;
  let yranges = getYRange(nodes);
  yranges = mergeSameBlock(yranges);
  yranges = mergeSplitEqualBlock(yranges);


  //包装后还是一个节点就没必要包起来了.
  if (yranges.length === 1) {
    return nodes;
  } else {
    return yranges.map(rangeItem => {
      let mergeNode = calcBoundaryNode(rangeItem.items);
      mergeNode.style.flexDirection = 'row';
      return mergeNode;
    });
  }
}

class SegmentFlag {
  len?: number;
  constructor(len?: number) {
    this.len = len;
  }
}

/**
 * 将间隔相等的节点合在一起.
 * @param {RangeItem[]} yranges
 * @returns {RangeItem[]}
 */
export function mergeSplitEqualBlock(yranges: RangeItem[]): RangeItem[] {

  //把间隔相等的节点合为一个大节点;
  //从大到小排
  yranges = yranges.sort((a, b) => a.min - b.min);

  if (yranges.length === 1 || yranges.length===2) {
    return yranges;
  }

  //间距记录;

  let segmentQuene: any[]= [];

  //反向分段; 间距做为对象插入, 相同的间距合并删除;
  segmentQuene.unshift(new SegmentFlag(0));

  for (let i = yranges.length-1; i > 0; i--) {
    let yrangeMax = yranges[i];
    let yrangeMin = yranges[i-1];

    segmentQuene.unshift(yranges[i]);
    segmentQuene.unshift(new SegmentFlag(yrangeMax.min - yrangeMin.max));
  }
  segmentQuene.unshift(yranges[0]);
  segmentQuene.unshift(new SegmentFlag(0));

  //删除重复的
  let lastLen =0, recordIndex:number[]=[];
  for (let i = segmentQuene.length-1; i >= 0; i--) {
    let segmentItem =segmentQuene[i];
    if(segmentItem instanceof SegmentFlag) {
      if(segmentItem.len ===lastLen) {
        segmentQuene.splice(i,1);//把多的len删除
        recordIndex.push(i);
      } else {
        if(recordIndex.length>2){
          recordIndex.map(_index=>segmentQuene.splice(_index,1));
        }

        lastLen= segmentItem.len||0;
        recordIndex = [i];
      }
    }
  }

  //TODO 这里可以再对比下边缘的情况, 有的间隔一样,但两个不是一样的东西. 对比两个区域相似性程度


  let resultRangeItem: RangeItem[] = [];

  let endIndex= segmentQuene.length;

  for (let i = segmentQuene.length-1; i >= 0; i--) {

    let segmentItem =segmentQuene[i];
    if(segmentItem instanceof SegmentFlag) {
      let beginIndex= i;

      let rangesArea  = segmentQuene.slice(beginIndex,endIndex)
        .filter(item=>!(item instanceof SegmentFlag));

      if(rangesArea.length>=2) {
        let nodes  = rangesArea.map((item:RangeItem)=>calcBoundaryNode(item.items));
        let newBlockNodes = calcBoundaryNode(nodes);
        newBlockNodes.style.flexDirection = 'column';
        //TODO 要把间隔的长度记录下来吗?

        resultRangeItem.unshift(new RangeItem(newBlockNodes));
      }else if(rangesArea.length===1) {
        resultRangeItem.unshift(rangesArea[0]);
      }
      endIndex=i;
    }
  }
  return resultRangeItem;
}

/**
 * 把同类节点[高度相等,元素一样]合并合为一个大节点;
 * 画图最好理解
 * @param {RangeItem[]} yranges
 * @returns {RangeItem[]}
 */
export function mergeSameBlock(yranges: RangeItem[]): RangeItem[] {

  //把间隔相等的节点合为一个大节点;
  //从大到小排
  yranges = yranges.sort((a, b) => a.min - b.min);

  if (yranges.length === 1 || yranges.length===2) {
    return yranges;
  }

  let segmentQuene: any[]= [yranges[yranges.length-1],new SegmentFlag()];

  //对比两个区域相似性程度,目前相似性可以使用高度来做处理
  for (let i = yranges.length-2; i >= 0; i--) {
    let yrangeDown = yranges[i];
    let yrangeUp = yranges[i+1];

    if( isSameSchema(calcBoundaryNode(yrangeUp.items),calcBoundaryNode(yrangeDown.items)) ){
      segmentQuene.unshift(yranges[i])
    } else {
      segmentQuene.unshift(new SegmentFlag());
      segmentQuene.unshift(yranges[i]);
    }
  }
  segmentQuene.unshift(new SegmentFlag());


  let resultRangeItem: RangeItem[] = [];


  let endIndex= segmentQuene.length;

  for (let i = segmentQuene.length-1; i >= 0; i--) {

    let segmentItem =segmentQuene[i];
    if(segmentItem instanceof SegmentFlag) {
      let beginIndex= i;

      let rangesArea  = segmentQuene.slice(beginIndex,endIndex)
        .filter(item=>!(item instanceof SegmentFlag));

        if(rangesArea.length>=2) {
          let nodes  = rangesArea.map((item:RangeItem)=>calcBoundaryNode(item.items));
          let newBlockNodes = calcBoundaryNode(nodes);
          newBlockNodes.style.flexDirection = 'column';
          resultRangeItem.unshift(new RangeItem(newBlockNodes));
        }else if(rangesArea.length===1) {
          resultRangeItem.unshift(rangesArea[0]);
        }
      endIndex=i;
    }
  }
  return resultRangeItem;
}


/**
 * 获取元素在某个轴线(x,y)上的分布情况;
 * 为接下来寻找空隙找到原因;
 */
function getYRange(nodes: INode[]): RangeItem[] {
  let ranges: RangeItem[] = [];

  //先大后小
  nodes =nodes.sort((a,b)=>b.frame.height -a.frame.height);

  for (let i = 0, iLen = nodes.length; i < iLen; i++) {
    let node = nodes[i];

    let range = getMatchRange(node, ranges);
    if (range) {
      range.addNode(node);
      ranges = mergeRange(ranges, range);
    } else {
      ranges.push(new RangeItem(node));
    }
  }

  return ranges;
}

function mergeRange(ranges: RangeItem[], rangeItem: RangeItem): RangeItem[] {
  let result = [rangeItem];
  for (let i = ranges.length - 1; i >= 0; i--) {
    let rangeOne = ranges[i];
    if (rangeItem === rangeOne) {
      continue;
    }

    if (RangeItem.isMergeable(rangeOne, rangeItem)) {
    } else {
      result.push(rangeOne);
    }
  }
  return result;
}


const rate=0.95;

function getMatchRange(
  node: INode,
  rangesItems: RangeItem[],
): RangeItem | undefined {
  for (let i = 0, iLen = rangesItems.length; i < iLen; i++) {
    let rangesItem = rangesItems[i];
    let {x, y, height, width} = node.frame;
    let lineMin = y,
      lineMax = y + height*rate;
    if (
      (lineMax > rangesItem.min && lineMin < rangesItem.max) ||
      (lineMin < rangesItem.max && lineMax > rangesItem.min)
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
    this.max = y + height*rate;//腐蚀算法. 让边界更清晰
    this.items = [node];
  }

  static isMergeable(item1: RangeItem, item2: RangeItem): boolean {
    let lineMax = item1.max,
      lineMin = item1.min;
    if (lineMax >= item2.min && lineMin <= item2.max) {
      return true;
    } else if (lineMin <= item2.max && lineMax >= item2.min) {
      return true;
    }
    return false;
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

  concat(rangeItem: RangeItem) {
    this.items.concat(rangeItem.items);
  }
}
