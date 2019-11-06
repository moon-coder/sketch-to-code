import {
  calcInnerSpacings,
  calcBoundaryBox,
  calcVSpacing
} from "../utils";
import {INode} from "../../types";

/**
 * 列布局计算
 */
export default function calcColLayout(node: INode) {

  node.children.forEach(child => calcColLayout(child));

  if (node.style.flexDirection !== 'column') return;

  const { width: nodeWidth, height } = node.frame;
  node.style.width = (nodeWidth/50)+"rem";
  // node.style.height = (height/50)+"rem";

  node.style.display = 'flex';

  const children = node.children;
  const boundaryBox = calcBoundaryBox(node.children);

  // 1.justifyContent计算
  if (children.length == 1 && children[0].points[4].y == node.points[4].y) {
    // 1.1.单节点外框中点，center
    node.style.justifyContent = 'center';
  } if(children.length == 2
      && children[0].points[0].y == node.points[0].y
      && children[1].points[3].y == node.points[3].y) {
    // 1.2.双结点space-between的情况
    node.style.justifyContent = 'space-between';
    node.style.height = node.frame.height;
  } else {
    // 1.3.其它情况，flex-start
    node.style.justifyContent = 'flex-start';
    node.style.paddingTop = calcInnerSpacings(node, boundaryBox)[0];
    node.children.forEach((child, idx) => {
      if (idx == node.children.length -1) return;
      child.style.marginBottom = calcVSpacing(child, node.children[idx + 1]);
    });
  }

  // 2.alignItems计算
  let alignItemsMap = {
    'center': [],
    'flex-start': [],
    'flex-end': [],
    'stretch': [],
    'others': []
  } as any;
  // 根据坐标位置，计算每个节点的布局位置
  children.forEach(child => {
    if (child.points[0].x == boundaryBox[0].x && child.points[1].x == boundaryBox[1].x) {
      // 2.1.包围框左右边，stretch
      alignItemsMap['stretch'].push(child);
    } else if (child.points[4].x == node.points[4].x) {
      // 2.2.外框中点，center
      alignItemsMap['center'].push(child);
    }else if(child.points[0].x == boundaryBox[0].x) {
      // 2.3.包围框左边，flex-start
      alignItemsMap['flex-start'].push(child);
    } else if(child.points[1].x == boundaryBox[1].x) {
      // 2.4.包围框右边，flex-end
      alignItemsMap['flex-end'].push(child);
    } else {
      // 2.5.其它情况
      alignItemsMap['others'].push(child);
    }
  });
  // 选取子结点中出现最多的布局作为alignItems的布局，其余非主流布局的结点设置自己的alignSelf
  const alignItemsArr = Object.entries(alignItemsMap).sort((a: any[], b: any[]) => b[1].length - a[1].length);
  const key = alignItemsArr[0][0];
  // 设置padding
  if(alignItemsMap['stretch'].length > 0) {
    node.style.paddingLeft = calcInnerSpacings(node, boundaryBox)[3];
    node.style.paddingRight = calcInnerSpacings(node, boundaryBox)[1];
  } else if(key === 'flex-start') {
    node.style.paddingLeft = calcInnerSpacings(node, boundaryBox)[3];
  } else if(key === 'flex-end') {
    node.style.paddingRight = calcInnerSpacings(node, boundaryBox)[1];
  }
  node.style.alignItems = key;
  alignItemsArr.forEach((item: any, idx) => {
    if (idx == 0) return;
    if (item[0] === 'others') {
      // 给alignSelf:flex-start和marginTop
      item[1].forEach((child: INode) => {
        child.style.alignSelf = 'flex-start';
        child.style.marginLeft = calcInnerSpacings(node, child.points)[3];
      });
    } else {
      item[1].forEach((n: INode) => n.style.alignSelf = item[0]);
    }
  });

}
