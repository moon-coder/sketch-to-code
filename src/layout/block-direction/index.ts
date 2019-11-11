import {INode} from "../../types";
import {isVisualBox, walk, hasVisualKey} from "../utils";
import rowMerge from "./row-merge";
import blockMerge from "./block-merge";
import {
  calcBoundaryNode,
  isContainer,
  calcNodeCoordsNew,
} from "../utils";

/**
 * 预处理 image text 等叶子 节点倒推一步;
 */
const preDeal = (nodes: INode[]): INode => {

  nodes = nodes.sort((a,b)=>a.frame.y-b.frame.y);
  nodes.forEach(node => node.points = calcNodeCoordsNew(node));

  /**
   * 将结点加入最近的外框结点
   * @param node
   * @param nodes
   * @return 是否加入了新的外框结点
   */
  const addToOuter = (node: INode, nodes: INode[]): boolean => {
    const outers = nodes.filter(item => item.type === 'Block' && item != node && isContainer(node, item));
    outers.sort((a, b) =>  isContainer(a, b) ? -1 : 1);
    if (outers.length > 0) {
      outers[0].children.push(node);
      return true;
    }
    return false;
  }

  // 遍历所有节点，将其加入最近外框
  nodes = nodes.filter(child => !addToOuter(child, nodes));
  if (nodes.length > 1) {
    return calcBoundaryNode(nodes);
  } else {
    return nodes[0];
  }

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

  children.forEach(child => {
    child.parent = node;
    mergeLineRow(child);
  });

  if (node.parent
      && (
          (node.parent.style.flexDirection && node.parent.style.flexDirection == node.style.flexDirection && !hasVisualKey(node))
          || (node.children.length == 1 && !hasVisualKey(node)))
  ) {

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


  let rootNode = preDeal(nodes);

  walk(rootNode,(node) => {

    if(node.children && node.children.length >0) {
      if(node.children.length > 1) {
        node.children = rowMerge(node.children,node);
      }
      // TODO 这边只是临时写法
      walk(node, (node) => {
        if(node.children.length > 1) {
          //一个节点只有一个子节点, 则这个关系 可以去除

          node.children = [ blockMerge(node.children) ];
        }
      });
      return ;
    }
  })
  // 3.去掉同行同列

  mergeLineRow(rootNode);

  // fixme 这边逻辑摆放位置还要考虑
  if (rootNode.children.length == 1) {
    rootNode.style.flexDirection = rootNode.children[0].style.flexDirection;
    rootNode.children = rootNode.children[0].children;
    rootNode.children.forEach(child => child.parent = rootNode);
  }

  // 4.重新排列
  reSort(rootNode);

  debugger;
  renameClassName(rootNode);
  debugger;
  // 计算宽高
  // fixme 这边逻辑摆放位置还要考虑
  walk(rootNode, (node) => {
    // TODO 这边只是临时写法
    if (node.type === 'Block' && !node.style.flexDirection) {
      node.style.flexDirection = 'row';
    }
    if (node.type === 'Image' || (node.type === 'Block' && isVisualBox(node))) {
      node.style.width = node.frame.width;
      node.style.height = node.frame.height;
    }
  })

  return rootNode;

}
