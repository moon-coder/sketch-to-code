import { Border, Fill, IStyle, Layer, Text, Container } from './types-sketch';
import { INode } from './types';
import * as uuid from "uuid";

// 要转哪些结点：Artboard/SymbolMaster/Group/Text/Image/Shape/ShapePath/SymbolInstance
// 要处理的样式：
// opacity、fills、borders、borderOptions、shadows、innerShadows、alignment
// verticalAlignment、kerning、lineHeight、paragraphSpacing、textColor
// fontSize、textTransform、fontFamily、fontWeight、fontStyle、fontVariant、fontStretch、textUnderline、textStrikethrough
// 不处理的样式：blendingMode、blur

// 分析imgcook和sketch-to-html是如何处理样式的，优先以imgcook的为主；


// 共有 border/background/
// 文本 fontSize/fontWeight/lineHeight/letterSpacing/color/textShadow...
// 图片 boxShadow
// 矩形框 boxShadow

export default (layer: Layer): INode[] => {

  const layerToNode = (layer: Layer) => {
    const id = uuid.v1();
    let node: INode = {
      id,
      parent: undefined,
      type: 'Block',
      position: { x: 0, y: 0, width: 0, height: 0 },
      style: {},
      children: [],
      points: [],
      attrs: { className: id }
    };
    node.type = layerType(layer);
    layerStyle(layer, node);
    node.position = layer.frame;
    node.points = calcNodeCoords(node);
    node.children = [];
    return node;
  }

  const layers: Layer[] = [];
  const walk = (layer: Layer) => {
    console.log(layer.id);
    if (!['Artboard', 'Group'].includes(layer.type)) {
      layers.push(layer);
    } else {
      (layer as Container).layers.forEach(layer => {
        walk(layer);
      });
    }
  }
  walk(layer);

  return layers.map(layer => layerToNode(layer));

  // return layers.map(layer => {
  //   let node: INode = {
  //     id: uuid.v1(),
  //     parent: undefined,
  //     type: 'Block',
  //     position: { x: 0, y: 0, width: 0, height: 0 },
  //     style: {},
  //     children: [],
  //     points: []
  //   };
  //   node.type = layerType(layer);
  //   node.position = layer.frame;
  //   node.points = calcNodeCoords(node);
  //   node.children = [];
  //   return node;
  // });
}

const layerType = (layer: Layer): 'Block' | 'Image' | 'Text' => {
  return 'Block';
}

const layerStyle = (layer: Layer, node: INode) => {
  let style: IStyle = {};
  // 1.边框
  const border: Border = layer.style.borders[0];
  if(border) {
    style.borderColor = border.color;
    style.borderWidth = border.thickness;
    // 位置
    switch (border.position.toLowerCase()) {
      case 'center':
        node.position.x = node.position.x - (border.thickness / 2);
        node.position.y = node.position.y - (border.thickness / 2);
        node.position.width = node.position.width + border.thickness;
        node.position.height = node.position.height + border.thickness;
        break;
      case 'outside':
        node.position.x = node.position.x - border.thickness;
        node.position.y = node.position.y - border.thickness;
        node.position.width = node.position.width + (border.thickness * 2);
        node.position.height = node.position.height + (border.thickness * 2);
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

}

const layerAttrs = (layer: Layer) => {

}


/**
 * 计算四个顶点和中点的坐标
 */
export function calcNodeCoords(node: INode) {
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
