export interface IPosition {
  x: number,
  y: number,
  width: number,
  height: number
}

export interface ICompData {
  imports: string;
  vdom: string;
  style: string;
  componentName?: string;
}

export interface IStyle {
  justifyContent?: string;
  alignItems?: string;
  display?: string;
  position?: string;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  flexDirection?: string;
  flexWrap?: string;
  paddingTop?: number;
  paddingBottom?: number;
  paddingRight?: number;
  paddingLeft?: number;
  marginTop?: number;
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
  width?: number;
  height?: number;
  lineHeight?: number;
  fontSize?: number;
  fontWeight?: number;
  borderWidth?: number;
  borderRadius?: number;
  backgroundColor?: string;
  backgroundImage?: string;
  lines?: number;
  [s: string]: any;
}

export interface Coords {
  x: number,
  y: number
}

export interface IAttrs {
  src?: string;
  text?: string;
  className: string;
}

// export interface INode {
//   id: string;
//   parent?: INode;
//   type: 'Text' | 'Image' | 'Block' | 'Link';
//   position: IPosition;
//   points: Coords[];
//   style: IStyle;
//   attrs: IAttrs;
//   children: INode[],
// }


// TODO 重新规划需要提取出来的数据结构
export interface OriginNode {
  id: string;
  children: OriginNode[];
  type: 'Text' | 'Image' | 'Block' | 'Link';
  // 位置信息
  position: IPosition;
  // 样式信息
  fill: {};
  shadow: {};
  innerShadow: {};
  blur: {};
  text: {};
  // 特征信息 TODO
}


// TODO 这个Node定义在哪？，使用范围在哪？；是否还须定义继承关系？
// TODO 继承关系出来了，似乎公共处理关系也出来了
export interface Node {
  origin: OriginNode;
  type: 'Text' | 'Image' | 'Block' | 'Link';
  id: string;
  parent: Node;
  children: Node[];
  position: IPosition;
}



export interface H5Node extends Node {
  style: H5Style;
}
export interface H5Style extends FlexStyle {}

export interface TaroNode extends Node {
  style: TaroStyle;
}
export interface TaroStyle extends FlexStyle {}

export interface RnNode extends Node {
  style: RnStyle;
}
export interface RnStyle extends FlexStyle {}

export interface FlexStyle {
  width?: number;
  height?: number;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  paddingTop?: number;
  paddingBottom?: number;
  paddingRight?: number;
  paddingLeft?: number;
  marginTop?: number;
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
  backgroundColor?: string;
}
