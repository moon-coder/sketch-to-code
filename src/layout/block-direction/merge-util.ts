/**
 * @desc
 *  两个节点合并的操作场景;
 *
 *  合并时如果不在同一个水平上. 则要再添加组件处理处理
 *  https://www.yuque.com/dscga7/bz0gzn/neh95s#eGiiC
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2019/11/8
 **/

import {INode} from '../../types';
import {calcBoundaryNode, createContainerNode} from '../utils';

/**
 * 将两个节点 合并为一个.
 * @param {INode} node1
 * @param {INode} node2
 */
export function mergeNode(node1: INode, node2: INode): INode {
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

  let flag = `${xRel}::${yRel}`;

  if (flag === 'equals::left') {
    //下
    let newNode = calcBoundaryNode([node1, node2]);
    newNode.style.flexDirecion = 'column';
    return newNode;
  } else if (flag === 'equals::right') {
    //上
    let newNode = calcBoundaryNode([node1, node2]);
    newNode.style.flexDirecion = 'column';
    return newNode;
  } else if (flag === 'left::equals') {
    //左
    let newNode = calcBoundaryNode([node1, node2]);
    newNode.style.flexDirecion = 'column';
    return newNode;
  } else if (flag === 'right::equals') {
    //右
    let newNode = calcBoundaryNode([node1, node2]);
    newNode.style.flexDirecion = 'column';
    return newNode;
  } else if (flag === 'left-contained::left') {
    //添加辅助节点;

    createContainerNode()


  } else if (flag === 'left-contained::right') {
  } else if (flag === 'right-contained::left') {
  } else if (flag === 'right-contained::right') {
  } else if (flag === 'left::left-contained') {
  } else if (flag === 'left::right-contained') {
  } else if (flag === 'right::left-contained') {
  } else if (flag === 'right::right-contained') {



  } else if (flag === 'left-overlap::left') {

  } else if (flag === 'left-overlap::right') {

  } else if (flag === 'left::left') {
  } else if (flag === 'left::right') {
  } else if (flag === 'left::contained') {
  } else if (flag === 'left::right-contain') {
  } else if (flag === 'left::contain') {
  } else if (flag === 'left::left-contain') {


  } else if (flag === 'left::left-overlap') {
  } else if (flag === 'left::right-overlap') {
  } else if (flag === 'right::left-overlap') {

  } else if (flag === 'contained::left') {
  } else if (flag === 'contained::right') {
  } else if (flag === 'right::left') {
  } else if (flag === 'right::contained') {
  } else if (flag === 'right::right') {
  } else if (flag === 'right::right-contain') {
  } else if (flag === 'right::contain') {
  } else if (flag === 'right::right-overlap') {
  } else if (flag === 'right::left-contain') {
  } else if (flag === 'right-contain::left') {
  } else if (flag === 'right-contain::right') {
  } else if (flag === 'contain::left') {
  } else if (flag === 'contain::right') {
  } else if (flag === 'right-overlap::left') {
  } else if (flag === 'right-overlap::right') {
  } else if (flag === 'left-contain::left') {
  } else if (flag === 'left-contain::right') {
  } else if (flag === 'equals::equals') {

    //重合的流程
  } else if (flag === 'equals::left-contained') {
  } else if (flag === 'equals::right-contained') {
  } else if (flag === 'equals::left-overlap') {
  } else if (flag === 'equals::contained') {
  } else if (flag === 'equals::right-contain') {
  } else if (flag === 'equals::contain') {
  } else if (flag === 'equals::right-overlap') {
  } else if (flag === 'equals::left-contain') {
  } else if (flag === 'left-contained::equals') {
  } else if (flag === 'left-contained::left-contained') {
  } else if (flag === 'left-contained::right-contained') {
  } else if (flag === 'left-contained::left-overlap') {
  } else if (flag === 'left-contained::contained') {
  } else if (flag === 'left-contained::right-contain') {
  } else if (flag === 'left-contained::contain') {
  } else if (flag === 'left-contained::right-overlap') {
  } else if (flag === 'left-contained::left-contain') {
  } else if (flag === 'right-contained::equals') {
  } else if (flag === 'right-contained::left-contained') {
  } else if (flag === 'right-contained::right-contained') {
  } else if (flag === 'right-contained::left-overlap') {
  } else if (flag === 'right-contained::contained') {
  } else if (flag === 'right-contained::right-contain') {
  } else if (flag === 'right-contained::contain') {
  } else if (flag === 'right-contained::right-overlap') {
  } else if (flag === 'right-contained::left-contain') {
  } else if (flag === 'left-overlap::equals') {
  } else if (flag === 'left-overlap::left-contained') {
  } else if (flag === 'left-overlap::right-contained') {
  } else if (flag === 'left-overlap::left-overlap') {
  } else if (flag === 'left-overlap::contained') {
  } else if (flag === 'left-overlap::right-contain') {
  } else if (flag === 'left-overlap::contain') {
  } else if (flag === 'left-overlap::right-overlap') {
  } else if (flag === 'left-overlap::left-contain') {
  } else if (flag === 'contained::equals') {
  } else if (flag === 'contained::left-contained') {
  } else if (flag === 'contained::right-contained') {
  } else if (flag === 'contained::left-overlap') {
  } else if (flag === 'contained::contained') {
  } else if (flag === 'contained::right-contain') {
  } else if (flag === 'contained::contain') {
  } else if (flag === 'contained::right-overlap') {
  } else if (flag === 'contained::left-contain') {
  } else if (flag === 'right-contain::equals') {
  } else if (flag === 'right-contain::left-contained') {
  } else if (flag === 'right-contain::right-contained') {
  } else if (flag === 'right-contain::left-overlap') {
  } else if (flag === 'right-contain::contained') {
  } else if (flag === 'right-contain::right-contain') {
  } else if (flag === 'right-contain::contain') {
  } else if (flag === 'right-contain::right-overlap') {
  } else if (flag === 'right-contain::left-contain') {
  } else if (flag === 'contain::equals') {
  } else if (flag === 'contain::left-contained') {
  } else if (flag === 'contain::right-contained') {
  } else if (flag === 'contain::left-overlap') {
  } else if (flag === 'contain::contained') {
  } else if (flag === 'contain::right-contain') {
  } else if (flag === 'contain::contain') {
  } else if (flag === 'contain::right-overlap') {
  } else if (flag === 'contain::left-contain') {
  } else if (flag === 'right-overlap::equals') {
  } else if (flag === 'right-overlap::left-contained') {
  } else if (flag === 'right-overlap::right-contained') {
  } else if (flag === 'right-overlap::left-overlap') {
  } else if (flag === 'right-overlap::contained') {
  } else if (flag === 'right-overlap::right-contain') {
  } else if (flag === 'right-overlap::contain') {
  } else if (flag === 'right-overlap::right-overlap') {
  } else if (flag === 'right-overlap::left-contain') {
  } else if (flag === 'left-contain::equals') {
  } else if (flag === 'left-contain::left-contained') {
  } else if (flag === 'left-contain::right-contained') {
  } else if (flag === 'left-contain::left-overlap') {
  } else if (flag === 'left-contain::contained') {
  } else if (flag === 'left-contain::right-contain') {
  } else if (flag === 'left-contain::contain') {
  } else if (flag === 'left-contain::right-overlap') {
  } else if (flag === 'left-contain::left-contain') {
  }

  throw new Error('暂未处理的节点合并关系');
}

/**
 *
 * @param {INode} node1
 * @param {INode} node2
 * @returns {string}
 * @deprecated 太粗不建议使用了. 建议使用 mergeNode 方法进行处理
 */
export function getRelPosition(node1: INode, node2: INode) {
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

type NodeRelPosition = 'Top' | 'Left' | 'Right' | 'Bottom' | '';

// 具体含义可以查看测试用例;
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

export interface ILine {
  beg: number;
  end: number;
}

/**
 * 线段比较
 *
 * @param {ILine} lineOne
 * @param {ILine} lineTwo
 */
export function lineCompare(lineOne: ILine, lineTwo: ILine): String {
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
