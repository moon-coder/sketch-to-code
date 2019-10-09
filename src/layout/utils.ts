import { Coords, INode } from "../types";
import * as uuid from 'uuid';


/**
 * 计算四个顶点和中点的坐标
 */
export function calcNodeCoordsNew(node: INode) {
  let coords = [];
  const { x, y, width, height } = node.position;
  // 顶点坐标
  coords.push({ x, y });
  // 右上点坐标
  coords.push({ x: x + width, y });
  // 右下点坐标
  coords.push({ x: x + width, y: y + height });
  // 左下点坐标
  coords.push({ x, y: y + height });
  // 中点坐标
  coords.push({ x: x + width / 2, y: y + height / 2 });
  return coords;
}

/**
 * 判断第二个结点是不是第一个结点的容器
 */
export function isContainer(inner: INode, outer: INode): boolean {
  const iPoints = inner.points;
  const oPoints = outer.points;
  return iPoints[0].x >= oPoints[0].x && iPoints[0].y >= oPoints[0].y
    && iPoints[1].x <= oPoints[1].x && iPoints[1].y >= oPoints[1].y
    && iPoints[2].x <= oPoints[2].x && iPoints[2].y <= oPoints[2].y
    && iPoints[3].x >= oPoints[3].x && iPoints[3].y <= oPoints[3].y;
}

/**
 * 判断两个区块是否重合
 */
export function isCoincide(first: INode, second: INode) {
  // 第一个区块中有任意一个顶点在第二个区块中
  const { x: xMin, y: yMin } = second.points[0];
  const { x: xMax, y: yMax } = second.points[2];
  const fPoints = first.points;
  return fPoints[0].x > xMin && fPoints[0].x <xMax && fPoints[0].y > yMin && fPoints[0].y <yMax
    && fPoints[1].x > xMin && fPoints[1].x <xMax && fPoints[1].y > yMin && fPoints[1].y <yMax
    && fPoints[2].x > xMin && fPoints[2].x <xMax && fPoints[2].y > yMin && fPoints[2].y <yMax
    && fPoints[3].x > xMin && fPoints[3].x <xMax && fPoints[3].y > yMin && fPoints[3].y <yMax;

}

/**
 * @brief 判断两个轴对齐的矩形是否重叠
 * @param rc1 第一个矩形的位置
 * @param rc2 第二个矩形的位置
 */
export function isOverlap(first: INode, second: INode) {
  const fp = first.position;
  const sp = second.position;
  if (fp.x + fp.width > sp.x &&
    sp.x + sp.width > fp.x &&
    fp.y + fp.height > sp.y &&
    sp.y + sp.height > fp.y) {
    return true;
  } else {
    return false;
  }
}



/**
 * 计算一组结点的外框结点
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
  const position = {
    x: xMin,
    y: yMin,
    width: xMax - xMin,
    height: yMax - yMin
  };
  return {
    id: uuid.v1(),
    type: 'Block',
    position: position,
    points: points,
    style: {},
    attrs: { className: uuid.v1() },
    children: nodes
  };
}

/**
 * 计算两结点的水平间距
 */
export function calcHSpacing(source: INode, target: INode) {
  return target.points[0].x; - source.points[1].x;
}

/**
 * 计算内部结点的间距
 */
export function calcInnerSpacings(outer: INode, innerPoints: Coords[]) {
  return [
    innerPoints[0].y - outer.points[0].y,
    outer.points[2].x - innerPoints[2].x,
    outer.points[2].y - innerPoints[2].y,
    innerPoints[0].x - outer.points[0].x
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

