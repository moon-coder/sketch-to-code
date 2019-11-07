import {Layer} from "./sketch/types-sketch";

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
  width?: number|string;
  height?: number|string;
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

export interface IWalkHandle{
  (node:INode,pNode?:INode):void;
}

export interface INode {
  id: string;
  /**
   * 虚拟生成出来的节点没有对应的__layer 信息
   */
  __layer?:Layer;
  parent?: INode;
  type: 'Text' | 'Image' | 'Block' | 'Link';
  //绝对定位的位置 信息, 相对于根节点而言的.
  frame: IFrame;
  //左上   右上 右下 左下 中间点
  points: Coords[];
  style: IStyle;
  attrs: IAttrs;
  children: INode[];
  extraInfo?:IExtraInfo;
}
export interface IExtraInfo{
  sameNode?:boolean;
  isComp?:boolean;
  compInfo?:{
  }
}

export interface IFrame {
  x: number,
  y: number,
  width: number,
  height: number
}

export interface IProcessor {
  test: (node: INode) => boolean;
  enter: (node: INode) => void;
  exit: (node: INode) => void;
}
