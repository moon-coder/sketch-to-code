import {
  calcBoundaryNode,
  calcInnerSpacings,
  calcBoundaryBox,
  calcHSpacing,
  rateEqual
} from "../utils";
import {INode} from "../../types";

/**
 * 行布局计算
 */
export default function calcRowLayout(node: INode) {

  node.children.forEach(child => calcRowLayout(child));

  if (node.style.flexDirection !== 'row') return;

  node.style.display = 'flex';

  // 子结点是否为等分分布
  const isNDivide = (node: INode) => {
    // 依次判断子结点中点是否在等分点上
    for (let i = 0; i < children.length; i++) {
      const x1 = node.points[0].x, n = children.length, w = node.frame.width;
      let x = x1 + 1 / 2 * n + (i - 1) * w / n;
      if (children[i].points[4].x != x) {
        return false;
      }
    }
    return true;
  }

  const { width: nodeWidth, height } = node.frame;
  const connSpace = nodeWidth / 5;
  const children = node.children;
  const boundaryBox = calcBoundaryBox(node.children);

  // node.style.width = (nodeWidth/50)+"rem";
  node.style.width = (nodeWidth/20)+"rem";
  // node.style.height = (height/50)+"rem";

  // 1.计算justifyContent
  if (children.length == 1 && rateEqual(children[0].points[4].x, node.points[4].x, node.frame.width)) {
    // 1.1.单节点、外框中点，center
    node.style.justifyContent = 'center';
  } else {
    // 计算leftBoxes和rightBoxes
    let leftBoxes: INode[], rightBoxes: INode[] = [];
    children.sort((a, b) => a.points[4].x - b.points[4].x)
    let rightBoundary = node.points[1].x;
    let rightFlag = false;
    for (let i = children.length - 1; i >= 0; i--) {
      if (rightBoundary - children[i].points[1].x < connSpace) {
        rightBoxes.push(children[i]);
        rightBoundary = children[i].points[0].x;
      } else if(rightBoxes.length > 0) {
        rightFlag = true;
      } else {
        break;
      }
    }
    if (!rightFlag) rightBoxes = [];
    leftBoxes = children.filter(child => !rightBoxes.includes(child));

    if (rightBoxes.length == 0) {
      // 1.2.全部为左结点，flex-start
      node.style.justifyContent = 'flex-start';
      node.style.paddingLeft = calcInnerSpacings(node, boundaryBox)[3];
      if(isNDivide(node)) {
        // 平均分布
      } else {
        // 计算marginRight
        children.forEach((child, idx) => {
          if (idx == children.length - 1) return;
          const marginRight = calcHSpacing(child, children[idx + 1]);
          child.style.marginRight = marginRight;
        });
      }
    } else if(leftBoxes.length == 0) {
      // 1.3.全部为右结点，flex-end
      node.style.justifyContent = 'flex-end';
      node.style.paddingRight = calcInnerSpacings(node, boundaryBox)[1];
      // 计算marginLeft
      children.forEach((child, idx) => {
        if (idx == children.length - 1) return;
        children[idx + 1].style.marginLeft = calcHSpacing(child, children[idx + 1]);
      });
    } else {
      // 1.4.既有左结点又有右结点，space-between
      node.style.justifyContent = 'space-between';
      node.style.paddingLeft = calcInnerSpacings(node, boundaryBox)[3];
      node.style.paddingRight = calcInnerSpacings(node, boundaryBox)[1];
      node.children = [];
      if (leftBoxes.length > 1) {
        const leftBox = calcBoundaryNode(leftBoxes);
        leftBox.style.flexDirection = 'row';
        node.children.push(leftBox);
        // 计算marginRight
        leftBoxes.forEach((box, idx) => {
          if (idx == 0) return;
          leftBoxes[idx - 1].style.marginRight = calcHSpacing(leftBoxes[idx - 1], box);
        });
      } else {
        node.children.push(...leftBoxes);
      }
      if (rightBoxes.length > 1) {
        // 计算marginLeft
        const rightBox = calcBoundaryNode(rightBoxes);
        rightBox.style.flexDirection = 'row';
        node.children.push(rightBox);
        rightBoxes.forEach((box, idx) => {
          if (idx == rightBoxes.length - 1) return;
          rightBoxes[idx + 1].style.marginLeft = calcHSpacing(box, rightBoxes[idx + 1]);
        });
      } else {
        node.children.push(...rightBoxes);
      }
    }

  }

  // 2.计算alignItems
  let alignItemsMap = {
    'center': [],
    'flex-start': [],
    'flex-end': [],
    'stretch': [],
    'others': []
  } as any;
  // 根据坐标位置，计算每个节点的布局位置
  children.forEach((child: INode) => {
    if (child.points[4].y == node.points[4].y) {
      // 2.1.外框中点，center
      alignItemsMap['center'].push(child);
    } else if (child.points[0].y == boundaryBox[0].y && child.points[3].y == boundaryBox[3].y) {
      // 2.2.包围框上下边，stretch
      alignItemsMap['stretch'].push(child);
    } else if(child.points[0].y == boundaryBox[0].y) {
      // 2.3.包围框上边，flex-start
      alignItemsMap['flex-start'].push(child);
    } else if(child.points[3].y == boundaryBox[3].y) {
      // 2.4.包围框下边，flex-end
      alignItemsMap['flex-end'].push(child);
    } else {
      alignItemsMap['others'].push(child);
    }
  });
  // 选取子结点中出现最多的布局作为alignItems的布局，其余非主流布局的结点设置自己的alignSelf
  const alignItemsArr = Object.entries(alignItemsMap).sort((a: any[], b: any[]) => b[1].length - a[1].length);
  const key = alignItemsArr[0][0];
  node.style.alignItems = key;
  // 设置padding
  if(key === 'stretch') {
    node.style.paddingTop = calcInnerSpacings(node, boundaryBox)[0];
    node.style.paddingBottom = calcInnerSpacings(node, boundaryBox)[2];
  } else if(key === 'flex-start') {
    node.style.paddingTop = calcInnerSpacings(node, boundaryBox)[0];
  } else if(key === 'flex-end') {
    node.style.paddingBottom = calcInnerSpacings(node, boundaryBox)[2];
  } else if (key === 'center') {
    node.style.height = node.frame.height;
  }
  alignItemsArr.forEach((item: any, idx) => {
    if (idx == 0) return;
    if (item[0] === 'others') {
      // 给alignSelf:flex-start和marginTop
      item[1].forEach((child: any) => {
        child.style.alignSelf = 'flex-start';
        child.style.marginTop = calcInnerSpacings(node, child.points)[0];
      });
    } else {
      item[1].forEach((n: INode) => n.style.alignSelf = item[0]);
    }
  });
}
