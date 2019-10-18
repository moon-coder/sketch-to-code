import {
  Border,
  Fill,
  IStyle,
  Layer,
  Text,
  Container,
  Slice,
  Group,
} from './types-sketch';
import {IFrame, INode} from './types';
import * as uuid from 'uuid';
import { exportImg } from './sketch-utils';

interface NodeExtraInfo {
  __absFrame: {x: number; y: number};
  [others: string]: any;
}
interface NodeInfoRepo {
  [path: string]: NodeExtraInfo;
}

/**
 * 把节点打平, 全部以绝对定位处理
 * @param {Layer} layer
 * @returns {INode[]}
 */
export default (layer: Layer): INode[] => {
  const resultNodes: INode[] = [];

  const walk = (
    layer: Layer,
    {
      lv = 0,
      pPath = '',
      relPath="#",
      nodeRepo = {},
    }: {lv: number; pPath: string; relPath:string; nodeRepo: NodeInfoRepo},
  ) => {
    let currentNodePath = `${pPath}${relPath}`;

    if (lv != 0 && layer.parent && nodeRepo[pPath]) {
      let {x: px, y: py} = nodeRepo[pPath].__absFrame;
      let {x, y} = layer.frame;
      nodeRepo[`${currentNodePath}`] = {
        __absFrame: Object.assign({}, layer.frame, {x: x + px, y: y + py}),
      };
    } else if (lv === 0) {
      nodeRepo[`${currentNodePath}`] = {
        __absFrame: Object.assign({}, layer.frame),
      };
    }

    // 导出图片
    exportImg(layer);

    if (!['Artboard', 'Group'].includes(layer.type) || layer.__imgSrc) {
      toNode(layer,nodeRepo[pPath]);
    } else {
      (layer as Container).layers.forEach((layer, layrerIndex) => {
        walk(layer, {
          lv: lv + 1,
          pPath:`${currentNodePath}`,
          relPath:`.layers[${layrerIndex}]`,
          nodeRepo,
        });
      });
    }
  };

  const toNode = (layer: Layer, pNodeInfo?: NodeExtraInfo): void => {
    if (layer.hidden) {
      return;
    }

    let {x, y} = layer.frame;
    let __absFrame = layer.frame;

    if (pNodeInfo) {
      //如果存在父节点则. ;
      let {x: px, y: py} = pNodeInfo.__absFrame;
      __absFrame = Object.assign({}, layer.frame, {x: x + px, y: y + py});
    }
    resultNodes.push(layerToNode(layer, __absFrame));
  };

  walk(layer, {
    lv: 0,
    pPath: '',
    relPath:"#",
    nodeRepo: {},
  });

  return resultNodes;
};

/**
 * 把sketch  layer节点转换为node节点;
 * @param {Layer} layer
 * @returns {INode}
 */
const layerToNode = (layer: Layer, absFrame: IFrame): INode => {
  const id = uuid.v1();
  let node: INode = {
    id,
    __layer: layer,
    parent: undefined,
    type: 'Block',
    frame: {x: 0, y: 0, width: 0, height: 0},
    style: {},
    children: [],
    points: [],
    attrs: {className: id},
  };
  node.type = layerType(layer);
  layerStyle(layer, node);
  node.frame = absFrame;
  node.points = calcNodeCoords(node);
  node.children = [];
  return node;
};

/**
 * 类型映射
 * @param {Layer} layer
 * @returns {"Block" | "Image" | "Text"}
 */
const layerType = (layer: Layer): 'Block' | 'Image' | 'Text' => {
  // Block
  if (['Artboard', 'Group'].includes(layer.type)) {
    return 'Block';
  }
  // Text
  if ('Text' === layer.type) {
    return 'Text';
  }
  // Image
  if (layer.__imgSrc) {
    return 'Image';
  }
  return 'Block';
};

const layerStyle = (layer: Layer, node: INode) => {
  let style: IStyle = {};
  // 1.边框
  const border: Border = layer.style.borders[0];
  if (border) {
    style.borderColor = border.color;
    style.borderWidth = border.thickness;
    // 位置
    switch (border.position.toLowerCase()) {
      case 'center':
        node.frame.x = node.frame.x - border.thickness / 2;
        node.frame.y = node.frame.y - border.thickness / 2;
        node.frame.width = node.frame.width + border.thickness;
        node.frame.height = node.frame.height + border.thickness;
        break;
      case 'outside':
        node.frame.x = node.frame.x - border.thickness;
        node.frame.y = node.frame.y - border.thickness;
        node.frame.width = node.frame.width + border.thickness * 2;
        node.frame.height = node.frame.height + border.thickness * 2;
        break;
      case 'inside':
        break;
    }
  }
  // 颜色、宽度
  // 虚线(先不考虑)
  // 2.填充处理
  const fill: Fill = layer.style.fills[0];
  if (fill) {
    // 'Color' | 'Gradient' | 'Pattern';
    if (fill.fillType === 'Color') {
      // 颜色填充
      style.backgroundColor = fill.color;
    }
    if (fill.fillType === 'Gradient') {
      // 渐变，不能多点、只能边到边~
      style.gradient = fill.gradient;
    }
    if (fill.fillType === 'Pattern') {
      // 图片
      style.pattern = fill.pattern;
    }
    // let attrs = { src: '', text:'' };
  }

  if (layer.type === 'Text') {
    // 文本 fontSize/fontWeight/lineHeight/letterSpacing/color/textShadow
    style.fontSize = layer.style.fontSize;
    style.fontWeight = layer.style.fontWeight;
    style.lineHeight = layer.style.lineHeight ? layer.style.lineHeight : 0;
    style.letterSpacing = layer.style.kerning ? layer.style.kerning : 0;
    style.color = layer.style.textColor;
    if (layer.style.shadows[0]) style.textShadow = layer.style.shadows[0];
    node.attrs.text = (layer as Text).text;
  } else {
    // 非文本 boxShadow(shadows/innerShadows)
  }

  node.style = style;
};

const layerAttrs = (layer: Layer) => {};

/**
 * 计算四个顶点和中点的坐标
 */
export function calcNodeCoords(node: INode) {
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

// export default {
//
//   // 形状样式提取
//
//   // 组样式提取
//
//   // 文字样式提取
//
//   // 图片样式提取
//
//   opacity: () => {},
//   fills: () => {},
//   borders: () => {},
//   borderOptions: () => {},
//   shadows: () => {},
//   innerShadows: () => {},
//   // 对齐方式
//   alignment: () => {},
//   // 垂直对齐方式
//   verticalAlignment: () => {},
//   // 字距
//   kerning: () => {},
//   // 行高
//   lineHeight: () => {},
//   // 段落间距
//   paragraphSpacing: () => {},
//   // 文字颜色
//   textColor: () => {},
//   // 字体
//   fontSize: () => {},
//   // 字变换(大写、小写) --
//   textTransform: () => {},
//   // 字体
//   fontFamily: () => {},
//   // 字体粗细
//   fontWeight: () => {},
//   // italic??
//   fontStyle: () => {},
//   // ~~~小型的大写字母 --
//   fontVariant: () => {},
//   // ~~~对当前的 font-family 进行伸缩变形
//   fontStretch: () => {},
//   // 下划线
//   textUnderline: () => {},
//   // 中划线
//   textStrikethrough: () => {}
// }
