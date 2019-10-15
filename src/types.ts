import {Layer} from "./types-sketch";

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

export interface INode {
  id: string;
  __layer:Layer;
  parent?: INode;
  type: 'Text' | 'Image' | 'Block' | 'Link';
  //@deprecated 使用frame与sketch表达一样的意思. .
  position?: IPosition;
  frame: IPosition;
  points: Coords[];
  style: IStyle;
  attrs: IAttrs;
  children: INode[],
}
