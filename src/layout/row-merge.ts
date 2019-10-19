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

  let yranges = getYRange(nodes);


  yranges = mergeEquealSplitBlock(yranges)



  if (yranges.length > 1) {
    return yranges.map(rangeItem => {
      let mergeNode = calcBoundaryNode(rangeItem.items);
      mergeNode.style.flexDirection = 'row';
      return mergeNode;
    });
  } else {
    return nodes;
  }
}

/**
 * 把间隔相等的节点合为一个大节点;
 * 画图最好理解
 * @param {RangeItem[]} yranges
 * @returns {RangeItem[]}
 */
function mergeEquealSplitBlock(yranges:RangeItem[]):RangeItem[]{


  let resultRangeItem:RangeItem[]= [];

  //把间隔相等的节点合为一个大节点;
  //从大到小排
  yranges = yranges.sort((a,b)=>b.min - a.min);

  //间距记录;
  let indexDb:{[key:number]:number[]} = {};
  for (let i = 0, iLen = yranges.length-1; i < iLen; i++) {
    let yrange = yranges[i];
    let yrangeNext = yranges[i];
    let lenth=yrange.min - yrangeNext.max;
    if(!indexDb[lenth]) {
      indexDb[lenth]=[]
    }
    indexDb[lenth].push(i+1);
  }

  //两个间隔相等, 则添加起来.
  for (let splitLen in indexDb) {
    if(indexDb[splitLen].length>=2) {

      let saveLenRangeSplit=[]; //连续三个则合并,非连续不合并

      for (let i = 0, iLen = indexDb[splitLen].length-1; i < iLen; i++) {

        let currentIndex = indexDb[splitLen][i];
        if(saveLenRangeSplit.length ===0){
          saveLenRangeSplit.push(currentIndex);
          continue;
        } else {
          let lastIndex = indexDb[splitLen][i-1];
          if((currentIndex-lastIndex)===1) {
            saveLenRangeSplit.push(currentIndex);
          } else {
            if(saveLenRangeSplit.length >= 2) {
              //合并区域
              let firstNode = calcBoundaryNode(yranges[saveLenRangeSplit[0]-1].items);
              firstNode.style.flexDirection='row';
              let nodes =[firstNode];
              for (let j = 0, jLen = saveLenRangeSplit.length; j < jLen; j++) {
                let rangeIndex:number = saveLenRangeSplit[j];
                let _node=calcBoundaryNode(yranges[rangeIndex].items);
                _node.style.flexDirection='row';
                nodes.push(_node);
              }
              let mergedNode= calcBoundaryNode(nodes);
              mergedNode.style.flexDirection = 'column';
              resultRangeItem.push(new RangeItem(mergedNode));
            } else {
              resultRangeItem.push(yranges[saveLenRangeSplit[0]-1]);
              for (let j = 0, jLen = saveLenRangeSplit.length; j < jLen; j++) {
                let rangeIndex:number = saveLenRangeSplit[j];
                resultRangeItem.push(yranges[rangeIndex]);
              }
            }

            saveLenRangeSplit=[]
          }
        }
      }
    } else {
      resultRangeItem.push(yranges[indexDb[splitLen][0]]);
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
