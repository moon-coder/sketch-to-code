import {Coords, INode, IWalkHandle} from '../types';
import * as uuid from 'uuid';

/**
 * 计算四个顶点和中点的坐标
 */
export function calcNodeCoordsNew(node: INode) {
  let coords = [];
  const {x, y, width, height} = node.frame;
  // 顶点坐标
  coords.push({x, y});
  // 右上点坐标
  coords.push({x: x + width, y});
  // 右下点坐标
  coords.push({x: x + width, y: y + height});
  // 左下点坐标
  coords.push({x, y: y + height});
  // 中点坐标
  coords.push({x: x + width / 2, y: y + height / 2});
  return coords;
}

/**
 * 判断第二个结点是不是第一个结点的容器
 */
export function isContainer(inner: INode, outer: INode): boolean {
  const iPoints = inner.points;
  const oPoints = outer.points;
  return (
    iPoints[0].x >= oPoints[0].x &&
    iPoints[0].y >= oPoints[0].y &&
    iPoints[1].x <= oPoints[1].x &&
    iPoints[1].y >= oPoints[1].y &&
    iPoints[2].x <= oPoints[2].x &&
    iPoints[2].y <= oPoints[2].y &&
    iPoints[3].x >= oPoints[3].x &&
    iPoints[3].y <= oPoints[3].y
  );
}

const defautlRate=0.95
/**
 * 判断两个区块是否重合
 */
export function isOverlap(first: INode, second: INode) {
  const fp = first.frame;
  const sp = second.frame;
  if (
    fp.x + fp.width* defautlRate > sp.x &&
    sp.x + sp.width* defautlRate > fp.x &&
    fp.y + fp.height* defautlRate> sp.y &&
    sp.y + sp.height* defautlRate > fp.y
  ) {
    return true;
  } else {
    return false;
  }
}

/**
 * 计算一组结点的外框结点
 * 即能包含所有元素的最小矩形框;
 *
 */
export function calcBoundaryNode(nodes: INode[]): INode {
  // x最小最大值、y最小最大值
  const xMin = nodes.map(node => node.points[0].x).sort((a, b) => a - b)[0];
  const xMax = nodes.map(node => node.points[2].x).sort((a, b) => b - a)[0];
  const yMin = nodes.map(node => node.points[0].y).sort((a, b) => a - b)[0];
  const yMax = nodes.map(node => node.points[2].y).sort((a, b) => b - a)[0];
  const points = [
    {x: xMin, y: yMin},
    {x: xMax, y: yMin},
    {x: xMax, y: yMax},
    {x: xMin, y: yMax},
    {x: (xMin + xMax) / 2, y: (yMin + yMax) / 2},
  ];
  const frame = {
    x: xMin,
    y: yMin,
    width: xMax - xMin,
    height: yMax - yMin,
  };
  return {
    id: uuid.v1(),
    type: 'Block',
    frame,
    points: points,
    style: {},
    attrs: {className: uuid.v1()},
    children: nodes,
  };
}

/**
 * 计算两结点的水平间距
 */
export function calcHSpacing(source: INode, target: INode) {
  return target.points[0].x;
  -source.points[1].x;
}

/**
 * 计算内部结点的间距
 */
export function calcInnerSpacings(outer: INode, innerPoints: Coords[]) {
  return [
    innerPoints[0].y - outer.points[0].y,
    outer.points[2].x - innerPoints[2].x,
    outer.points[2].y - innerPoints[2].y,
    innerPoints[0].x - outer.points[0].x,
  ];
}

/**
 * 计算多个结点的边界框的坐标点
 */
export function calcBoundaryBox(nodes: INode[]): Coords[] {
  // x最小最大值、y最小最大值
  const xMin = nodes.map(node => node.points[0].x).sort((a, b) => a - b)[0];
  const xMax = nodes.map(node => node.points[2].x).sort((a, b) => b - a)[0];
  const yMin = nodes.map(node => node.points[0].y).sort((a, b) => a - b)[0];
  const yMax = nodes.map(node => node.points[2].y).sort((a, b) => b - a)[0];
  // 计算边界框的坐标点
  return [
    {x: xMin, y: yMin},
    {x: xMax, y: yMin},
    {x: xMax, y: yMax},
    {x: xMin, y: yMax},
    {x: (xMin + xMax) / 2, y: (yMin + yMax) / 2},
  ];
}

/**
 * 合并日志
 */
export function mergeLog(source: INode, target: INode) {
  const sourceStr = getNodeStr(source);
  const targetStr = getNodeStr(target);
  return `${sourceStr}、${targetStr}`;
}

export function walk(rootNode: INode, callBack: IWalkHandle,{lv=1}:any={}) {
  if (rootNode.children && rootNode.children.length > 0) {
    rootNode.children.forEach((childrenNode, index) => {
      walk(childrenNode,callBack,{lv:lv+1});
    });

    callBack(rootNode);
  } else {
    callBack(rootNode);
  }
}

/**
 *  TODO 这里的策略可以想办法 改为配置模式的. 应对复杂的情况
 * 看两块代码相似程度
 */
export function isSameSchema(a: INode, b: INode,rate:number=0.95):boolean {

  //长度都接近的.
  if(isEquealNum(a.frame.width,b.frame.width,rate) && isEquealNum(a.frame.height,b.frame.height,rate)) {
    //形状是一样的. 就可以判断两者一致的.
    //不同类型的元素数量;
    if(isEquealNum(a.children.length,b.children.length,rate)) {
      return true;
    }
  }

  //如果面积误差在

  return false;
}

/**
 * 先上后下,先左后右.
 * @param {INode[]} nodes
 * @returns {INode[]}
 */
export function sortNodesByLayout(nodes:INode[]):INode[]{
  return nodes.sort((a:INode,b)=>{
      return (a.frame.y*1000+a.frame.x)-(b.frame.y*1000+b.frame.x)
  })
}

/**
 * 在是否相同 波动范围内
 * @param a
 * @param b
 * @param rate
 */
export function isEquealNum(a:number,b:number,rate:number=0.95):boolean {

  return Math.abs(a-b)<=(a+b)/2*(1-rate);
}

/**
 * 可合并日志
 */
export function canMergeLog(source: INode, canMerges: INode[]) {
  if (canMerges && canMerges.length > 0) {
    console.log(
      `结点：${getNodeStr(source)}可与${canMerges.reduce(
        (a, b) => `${a}、${getNodeStr(b)}`,
        '',
      )}结点合并`,
    );
  }
}

export function getNodeStr(node: INode): string {
  let result: string = '';
  if (node.type === 'Block') {
    result = node.children.reduce(
      (a: string, b: INode) => a + getNodeStr(b),
      '',
    );
    result = result ? result : '颜色块';
  }
  if (node.type === 'Image') {
    return '一张图片';
  }
  if (node.type === 'Text') {
    result = node.attrs.text ? node.attrs.text : '';
  }
  return result;
}
