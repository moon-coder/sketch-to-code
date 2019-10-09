import {Coords, IAttrs, ILayoutNode, INode, IPosition, IStyle} from "../types";
import {
  isOverlap,
  calcBoundaryNode,
  isContainer,
  calcNodeCoordsNew,
  calcInnerSpacings,
  calcBoundaryBox,
  calcHSpacing,
} from "./utils";

/**
 *
 */
const phaseOne = (nodes: INode[]) => {
  // 1.预处理

  const node = preDeal(nodes);

  // 2.合并结点
  let i = 0;
  while (!mergeSure(node)) {
    i++; if(i > 1000) throw new Error('超出循环上线');
    mergeOptional(node);
  }

  // 3.去掉同行同列
  mergeLineRow(node);
  if (node.children.length == 1) return node.children[0];
  return node;
}

/**
 * 预处理
 */
const preDeal = (nodes: INode[]): INode => {
  const root = calcBoundaryNode(nodes);
  const children: INode[] = root.children;
  root.children = [];
  children.forEach(node => node.points = calcNodeCoordsNew(node));

  // 将结点加入最近的外框结点
  const addToOuter = (node: INode, nodes: INode[]) => {
    const outers = nodes.filter(item => item.type === 'Block' && isContainer(node, item));
    outers.sort((a, b) =>  isContainer(a, b) ? 1 : 0);
    outers[0].children.push(node);
  }
  // 遍历所有节点，将其加入最近外框
  children.forEach(child => {
    addToOuter(child, [root, ...children])
  });
  return root;
}

/**
 * 合并所有确定结点
 */
const mergeSure = (node: INode) => {
  // 合并容器结点
  const mergeNode = (node: INode) => {
    let i = 0;
    while (true) {
      i++; if(i > 1000) throw new Error('超出循环上线');
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        const others = node.children.filter(item => item != child);
        const canMerges =  others.filter(other => {
          const extras = others.filter(item => item != other);
          return extras.every(extra => !isOverlap(calcBoundaryNode([child, other]), extra));
        });
        if (canMerges.length == 1) {
          console.log('进行了一次确定合并');
          console.log(`结点A:${JSON.stringify(child.position)}, 结点B:${JSON.stringify(canMerges[0].position)}`);
          // 判断方向
          const boundaryNode = calcBoundaryNode([child, canMerges[0]]);
          if (child.points[1].x <= canMerges[0].points[0].x
              || child.points[0].x >= canMerges[0].points[1].x) {
            boundaryNode.style.flexDirection = 'row';
          } else {
            boundaryNode.style.flexDirection = 'column';
          }
          // 合并结点
          node.children = node.children
              .filter(item => !(item == child || item == canMerges[0]))
              .concat(boundaryNode);
          break;
        }
      }
      // fixme 能不能这么判断
      return node.children.length == 1 || node.children.length == 0;
    }
  }

  // walk整棵树中的容器结点，进行合并
  const walkNode = (node: INode): boolean => {
    if (node.type === 'Block') {
      const childrenFlag = node.children.every(child => walkNode(child));
      const nodeFlag = mergeNode(node);
      return childrenFlag && nodeFlag;
    }
    return true;
  }
  return walkNode(node);
}

/**
 * 合并一次可选结点
 */
const mergeOptional = (node: INode) => {
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    const others = node.children.filter(item => item != child);
    const canMerges =  others.filter(other => {
      const extras = others.filter(item => item != other);
      return extras.every(extra => !isOverlap(calcBoundaryNode([child, other]), extra));
    });
    if (canMerges.length > 0) { // fixme 这边判断条件还要改
      console.log('进行了一次选择合并');
      console.log(`结点A:${JSON.stringify(child.position)}, 结点B:${JSON.stringify(canMerges[0].position)}`);
      const boundaryNode = calcBoundaryNode([child, canMerges[0]]);
      if (child.points[1].x <= canMerges[0].points[0].x
          || child.points[0].x >= canMerges[0].points[1].x) {
        boundaryNode.style.flexDirection = 'row';
      } else {
        boundaryNode.style.flexDirection = 'column';
      }
      // 合并结点
      node.children = node.children
          .filter(item => !(item == child || item == canMerges[0]))
          .concat(boundaryNode);
      return;
    }
  }
}

const mergeLineRow = (node: INode) => {
  const children = [...node.children];
  children.forEach(child => {
    child.parent = node;
    mergeLineRow(child);
  });
  if (node.parent
      && (node.parent.style.flexDirection == node.style.flexDirection || node.children.length == 1)) {
    node.parent.children.splice(node.parent.children.indexOf(node), 1, ...node.children);
    node.children.forEach(child => child.parent = node.parent);
  }
}


export default (nodes: INode[]): INode => {
  const node: INode = phaseOne(nodes);
  calcRowLayout(node);
  calcColLayout(node);
  return node;
}

/**
 * 行布局计算
 */
const calcRowLayout = (node: INode) => {

  node.children.forEach(child => calcRowLayout(child));

  if (node.style.flexDirection !== 'row') return;

  // 子结点是否为等分分布
  const isNDivide = (node: INode) => {
    // 依次判断子结点中点是否在等分点上
    for (let i = 0; i < children.length; i++) {
      const x1 = node.points[0].x, n = children.length, w = node.position.width;
      let x = x1 + 1 / 2 * n + (i - 1) * w / n;
      if (children[i].points[4].x != x) {
        return false;
      }
    }
    return true;
  }

  const { width: nodeWidth } = node.position;
  const connSpace = nodeWidth / 10;
  // fixme 要用到breakSpace
  const breakSpace = nodeWidth / 5;
  const children = node.children;
  const boundaryBox = calcBoundaryBox(node.children);

  // 1.计算justifyContent
  if (children.length == 1 && children[0].points[4].x == node.points[4].x) {
    // 1.1.单节点、外框中点，center
    node.style.justifyContent = 'center';
  }

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
        if (idx == 0) return;
        children[idx - 1].style.marginRight = calcHSpacing(children[idx - 1], child);
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

/**
 * 列布局计算
 */
const calcColLayout = (node: INode) => {

  node.children.forEach(child => calcColLayout(child));

  if (node.style.flexDirection !== 'column') return;

  const children = node.children;
  const boundaryBox = calcBoundaryBox(node.children);

  // 1.justifyContent计算
  if (children.length == 1 && children[0].points[4].y == node.points[4].y) {
    // 1.1.单节点外框中点，center
    node.style.justifyContent = 'center';
  } else {
    // 1.2.其它情况，flex-start
    node.style.justifyContent = 'flex-start';
    node.style.paddingTop = calcInnerSpacings(node, boundaryBox)[0];
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
    if (child.points[4].x == node.points[4].x) {
      // 2.1.外框中点，center
      alignItemsMap['center'].push(child);
    } else if (child.points[0].x == boundaryBox[0].x && child.points[1].x == boundaryBox[1].x) {
      // 2.2.包围框左右边，stretch
      alignItemsMap['stretch'].push(child);
    } else if(child.points[0].x == boundaryBox[0].x) {
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
  if(key === 'stretch') {
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
