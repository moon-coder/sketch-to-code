import { INode } from "../types";
import {
  isOverlap,
  calcBoundaryNode,
  isContainer,
  calcNodeCoordsNew,
  calcInnerSpacings,
  calcBoundaryBox,
  calcHSpacing,
  mergeLog,
  canMergeLog, walk, sortNodesByLayout
} from "./utils";
import rowMerge from  './row-merge';
import blockMerge from  './block-merge';

/**
 *
 */
const phaseOne = (nodes: INode[]) => {
  // 1.预处理  包含关系的划分;

  const rootNode = preDeal(nodes);


  walk(rootNode,(node) => {
    if(node.children && node.children.length >0) {
      if(node.children.length > 1) {
        node.children = rowMerge(node.children);
      }
      if(node.children.length > 1) {
        //一个节点只有一个子节点, 则这个关系 可以去除
        node.children = [blockMerge(node.children)];
      }
      return ;
    }
  })
  // 3.去掉同行同列
  mergeLineRow(rootNode);

  // 4.重新排列
  reSort(rootNode);

  // 5.重命名样式
  renameClassName(rootNode);

  if (rootNode.children.length == 1) return rootNode.children[0];

  return rootNode;
}

/**
 * 预处理 image text 等叶子 节点倒推一步;
 */
const preDeal = (nodes: INode[]): INode => {
  nodes  =nodes.sort((a,b)=>a.frame.y-b.frame.y);

  const root = calcBoundaryNode(nodes);

  const children: INode[] = root.children;
  children.forEach(node => node.points = calcNodeCoordsNew(node));


  root.children = [];

  // 将结点加入最近的外框结点
  const addToOuter = (node: INode, nodes: INode[]) => {
    const outers = nodes.filter(item => item.type === 'Block' && item != node && isContainer(node, item));
    outers.sort((a, b) =>  isContainer(a, b) ? -1 : 1);
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

  // 1.walk整棵布局树
  const walkNode = (node: INode): boolean => {
    if (node.type === 'Block' && !node.style.flexDirection) {
      const childrenFlag = node.children.every(child => walkNode(child));
      // 2.针对Block结点进行确定合并
      const nodeFlag = mergeNode(node);
      // 利用返回参数 fixme
      return childrenFlag && nodeFlag;
    }
    return true;
  }
  return walkNode(node);
}

/**
 * 2.对Block 下children 结点逐个进行合并测试
 *  两个节点
 *
 * @param {INode} node
 * @returns {boolean}
 */
function mergeNode(node: INode):boolean {


  if (node.children.length == 0) return true;
  let k = 0;
  // 2.1.不断循环遍历node的子结点
  while (true) {
    k++; if(k > 20) throw new Error('超出循环上线2');
    for (let i = 0; i < node.children.length; i++) {

      //选中对比节点
      const child = node.children[i];
      const others = node.children.filter(item => item != child);

      const canMerges =  others.filter(otherNode => {
        //otherNode =>即将合并测试节点

        //extras 其他节点
        const extras = others.filter(item => item != otherNode);

        return extras.every(extra => !isOverlap(calcBoundaryNode([child, otherNode]), extra));
      });
      canMergeLog(child, canMerges);
      if (canMerges.length == 1) {
        // 2.2.当发现可以进行一次确定的合并时，合并并重新遍历；
        console.log('进行了一次确定合并：' + mergeLog(child, canMerges[0]));
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

      if (i == (node.children.length - 1)) {
        // 2.3.node子结点遍历完成后返回
        // fixme 能不能这么判断
        return node.children.length == 1 || node.children.length == 0;
      }
    }
  }


}

/**
 * 合并一次可选结点
 */
const mergeOptional = (node: INode) => {
  const mergeNode = (node: INode) => {
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      const others = node.children.filter(item => item != child);
      const canMerges =  others.filter(other => {
        const extras = others.filter(item => item != other);
        return extras.every(extra => !isOverlap(calcBoundaryNode([child, other]), extra));
      });
      canMergeLog(child, canMerges);
      console.log(`${node.children.length}  ${canMerges.length}`);
      if (canMerges.length > 0) { // fixme 这边判断条件还要改
        console.log('进行了一次选择合并：' + mergeLog(child, canMerges[0]));
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

  // 1.walk整棵布局树
  const walkNode = (node: INode) => {
    if (node.type === 'Block' && !node.style.flexDirection) {
      node.children.every(child => walkNode(child));
      // 2.针对Block结点进行确定合并
      mergeNode(node);
    }
  }
  walkNode(node);
}

/**
 *
 * 如果节点的父与此节点flexDirection 一致, 且此节点只有一个节点, 那么除去此中间节点;
 * TODO 要考虑下这个中间节点 什么时候产生的;
 *
 * @param {INode} node
 */
const mergeLineRow = (node: INode) => {
  const children = [...node.children];


  //建立父子关系
  children.forEach(child => {
    child.parent = node;
    mergeLineRow(child);
  });


  if (node.parent
      && ( (node.parent.style.flexDirection && node.parent.style.flexDirection == node.style.flexDirection )|| node.children.length == 1)) {
    node.parent.children.splice(node.parent.children.indexOf(node), 1, ...node.children);
    node.children.forEach(child => child.parent = node.parent);
  }
}

const reSort = (node: INode) => {
  if (node.type === 'Block' && node.style.flexDirection) {
    node.children.sort((a, b) => {
      if (node.style.flexDirection === 'row') {
        return a.points[4].x - b.points[4].x;
      } else {
        return a.points[4].y - b.points[4].y;
      }
    });
  }
  node.children.forEach(child => reSort(child));
}

const renameClassName = (node: INode) => {
  let imgIdx = 0, blockIdx = 0, textIdx = 0;
  ((node: INode) => {
    const walk = (node: INode) => {
      if (node.type == 'Text') node.attrs.className = 'text' + textIdx++;
      if (node.type == 'Block') node.attrs.className = 'block' + blockIdx++;
      if (node.type == 'Image') node.attrs.className = 'img' + imgIdx++;
      node.children.forEach(child => walk(child));
    }
    walk(node);
  })(node);
}


/**
 * 布局算法核心;
 * https://www.yuque.com/dscga7/bz0gzn/neh95s#PDMkL
 行优先: 一行且块行高一致,优先合为一组;
 从面积最小元素开始选择合并:
 合关后面积应该最小;
 * @param {INode[]} nodes
 * @returns {INode}
 */
export default (nodes: INode[]): INode => {

  let rootNode =phaseOne(nodes);
  debugger;
  calcRowLayout(rootNode);
  calcColLayout(rootNode);
  return rootNode;
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
      const x1 = node.points[0].x, n = children.length, w = node.frame.width;
      let x = x1 + 1 / 2 * n + (i - 1) * w / n;
      if (children[i].points[4].x != x) {
        return false;
      }
    }
    return true;
  }

  const { width: nodeWidth } = node.frame;
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

