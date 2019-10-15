export interface Document {
  // The unique ID of the document
  id: string;
  // The pages of the document
  pages: Page[];
  // The selected page of the Document
  selectedPage: Page;
  // The Selection of the layers that the user has selected in the currently selected page
  selectedLayers: Selection;
  // The path to the document
  path: string;
  // The list of all shared layer styles defined in the document
  sharedLayerStyles: SharedStyle[];
  // The list of all shared text styles defined in the document
  sharedTextStyles: SharedStyle[];
  // A list of color assets defined in the document
  colors: {
    name: string;
    color: string;
  }[];
  // A list of gradient assets defined in the document
  gradients: {
    name: string;
    gradient: Gradient;
  }[];
  // The color space of the document
  colorSpace: 'Unmanaged' | 'sRGB' | 'P3';
}

export interface Selection {
  // The Layers in the selection
  layers: Layer[];
  // The number of Layers in the selection
  length: number;
  // Does the selection contain any layers?
  isEmpty: boolean;
}

export interface SharedStyle {
  id: string;
  styleType: 'Text' | 'Layer' | 'Unknown';
  name: string;
  style: Style;
}

export interface Page {
  // The unique ID of the Page
  id: string;
  // The name of the Page
  name: string;
  // The document the page is in
  parent: Document;
  // The layers that this page has
  layers: Layer[];
  // The frame of the page
  frame: Rectangle;
  // If the Page is selected
  selected: boolean;
}

export interface Artboard {
  id: string;
  name: string;
  parent: Page;
  frame: Rectangle;
  selected: boolean;
  layers: Layer[];
  flowStartPoint: boolean;
  background: {
    enabled: boolean;
    includedInExport: boolean;
    color: string;
  }
  exportFormats?: any;
}

/**
 * sketch layer节点类型
 */
export interface Layer {
  // The unique ID of the Layer.
  id: string;
  type: "Artboard"|"Group"|string;
  // The name of the Layer
  name: string;
  // The group the layer is in.
  parent: Group;
  // If the layer is locked.
  locked: boolean;
  // If the layer is hidden.
  hidden: boolean;
  // The frame of the Layer. This is given in coordinates that are local to the parent of the layer.
  frame: Rectangle;
  // If the layer is selected.
  selected: boolean;
  // The transformation applied to the Layer.
  transform?: {
    // The rotation of the Layer in degrees, clock-wise.
    rotation: number;
    // If the layer is horizontally flipped.
    flippedHorizontally: boolean;
    // If the layer is vertically flipped.
    flippedVertically: boolean;
  };
  style: Style;
  sharedStyleId: string | null;

  // The index of this layer in its parent.
  index: number;

  // 还有一些额外的方法

  /**
   * 以下属性先不考虑使用
   */
  // The prototyping action associated with the layer.
  flow?: any;
  // The export formats of the Layer.
  exportFormats?: any;
}

export interface Group extends Layer {
  layers: Layer[];
}

export interface Shape extends Layer {}

export interface ShapePath extends Layer {
  // The type of the Shape Path. It can only be set when creating a new ShapePath
  shapeType: 'Rectangle' | 'Oval' | 'Triangle' | 'Polygon' | 'Star' | 'Custom';
  // The points defining the Shape Path
  points: {
    point: Point;
    curveFrom: Point;
    curveTo: Point;
    cornerRadius: number;
    pointType: 'Undefined' | 'Straight' | 'Mirrored' | 'Asymmetric' | 'Disconnected';
  }[];
  // If the Path is closed
  closed: boolean;
}

export interface Text extends Layer {
  text: string;
  lineSpacing: 'constantBaseline' | 'variable';
  fixedWidth: boolean;
}

export interface Image extends Layer {
  // The actual image of the layer
  image: any;
}

export interface SymbolInstance {
  // The unique ID of the Symbol that the instance and its master share.
  symbolId: string;
}

export interface SymbolMaster extends Artboard {
  symbolId: string;
  overrides: [];
}

export interface SymbolOverride {
  // The path to the override
  path: string;
  // The property that this override controls
  property: string;
  // The unique ID of the override
  id: string;
  // If the override is a nested symbol override
  symbolOverride: boolean;
  // The value of the override which can be change
  value: string;
  // If the override hasn’t been changed and is the default value
  isDefault: boolean;
  // The layer the override applies to. It will be an immutable version of the layer.
  affectedLayer: Text | Image | SymbolInstance;
  // If the value of the override can be changed
  editable: boolean;
  // If the override is selected
  selected: boolean;
}

export type Container = Group | Artboard;

export interface Rectangle {
  x: number; // todo  | Rectangle
  y: number;
  width: number;
  height: number;
}




export interface Style {
  // The opacity of a Layer, between 0 (transparent) and 1 (opaque)
  opacity: number;
  // blending mode
  blendingMode: 'Normal' | 'Darken' | 'Multiply' | 'ColorBurn' | 'Lighten'
      | 'Screen' | 'ColorDodge' | 'Overlay' | 'SoftLight' | 'HardLight'
      | 'Difference' | 'Exclusion' | 'Hue' | 'Saturation' | 'Color' | 'Luminosity';
  // The blur applied to the Layer
  blur: Blur;
  // The fills of a Layer
  fills: Fill[];
  // The borders of a Layer
  borders: Border[];
  borderOptions: {
    // The type of the arrow head for the start of the path
    startArrowhead: Arrowhead;
    // The type of the arrow head for the start of the path
    endArrowhead: Arrowhead;
    // The dash pattern of the borders
    dashPattern: number[];
    // The type of the border ends
    lineEnd: 'Butt' | 'Round' | 'Projecting';
    // The type of the border joins
    lineJoin: 'Miter' | 'Round' | 'Bevel';
  };
  // The shadows of a Layer
  shadows: Shadow[];
  // The inner shadows of a Layer
  innerShadows: Shadow[];
  // The horizontal alignment of the text of a Text Layer
  alignment: 'left' | 'right' | 'center' | 'justify';
  // The vertical alignment of the text of a Text Layer
  verticalAlignment: 'top' | 'center' | 'bottom';
  // The kerning between letters of a Text Layer
  kerning: number | null;
  // The height of a line of text in a Text Layer
  lineHeight: number | null;
  // The space between 2 paragraphs of text in a Text Layer
  paragraphSpacing: number;
  // A rgba hex-string (#000000ff is opaque black) of the color of the text in a Text Layer
  textColor: string;
  // The size of the font in a Text Layer
  fontSize: number;
  // The transform applied to the text of a Text Layer
  textTransform: 'none' | 'uppercase' | 'lowercase';
  // The name of the font family of a Text Layer
  fontFamily: string;
  // The weight of the font of a Text Layer
  fontWeight: number;
  // The style of the font of a Text Layer
  fontStyle: 'italic' | undefined;
  // The variant of the font of a Text Layer
  fontVariant: 'small-caps' | undefined;
  // The size variant of the font of a Text Layer
  fontStretch: 'compressed' | 'condensed' | 'narrow' | 'expanded' | 'poster' | undefined;
  // The underline decoration of a Text Layer
  textUnderline: string;
  // The strikethrough decoration of a Text Layer
  textStrikethrough: string;
}

export type Arrowhead = 'None' | 'OpenArrow' | 'FilledArrow' | 'Line' | 'OpenCircle' | 'FilledCircle' | 'OpenSquare' | 'FilledSquare';

export interface Shadow {
  // A rgba hex-string (#000000ff is opaque black)
  color: string;
  // The blur radius of the shadow
  blur: number;
  // The horizontal offset of the shadow
  x: number;
  // The vertical offset of the shadow
  y: number;
  // The spread of the shadow
  spread: number;
  // Whether the fill is active or not
  enabled: boolean;
}

export interface Blur {
  // The type of the blur
  blurType: 'Gaussian' | 'Motion' | 'Zoom' | 'Background';
  // The radius of the blur.
  radius: number;
  // The angle of the blur (only used when the blur type is Motion)
  motionAngle: number;
  // The center of the blur (only used when the blur type is Zoom
  center: {
    // The horizontal coordinate of the center of the blur
    x: number;
    // The vertical coordinate of the center of the blur
    y: number;
    // Whether the fill is active or not
    enabled: boolean;
  }
}

export interface Fill {
  // The type of the fill
  fillType: FillType;
  // A rgba hex-string (#000000ff is opaque black)
  color: string;
  // The gradient of the fill
  gradient: Gradient,
  // The pattern of the fill
  pattern: {
    // How the pattern should fill the layer
    patternType: PatternFillType;
    // The image of tile of the pattern
    image: any;
    // The scale applied to the tile of the pattern
    tileScale: number;
  }
  // Whether the fill is active or not
  enabled: boolean;
}

export interface Point {
  // The x coordinate of the point
  x: number;
  // The y coordinate of the point
  y: number;
}

export type FillType = 'Color' | 'Gradient' | 'Pattern';

export type PatternFillType = 'Tile' | 'Fill' | 'Stretch' | 'Fit';

export interface Gradient {
  // The type of the Gradient
  gradientType: 'Linear' | 'Radial' | 'Angular';
  // The position of the start of the Gradient
  from: Point;
  // The position of the end of the Gradient
  to: Point;
  aspectRatio: number;
  stops: {
    // The position of the Stop. 0 represents the start of the gradient while 1 represent the end
    position: number;
    // The color of the Stop
    color: string;
  }[];
}

export interface Border {
  // The type of the fill of the border
  fillType: FillType;
  // A rgba hex-string (#000000ff is opaque black)
  color: string;
  // The gradient of the fill
  gradient: Gradient;
  // Whether the border is active or not
  enabled: boolean;
  // The position of the border
  position: 'Center' | 'Inside' | 'Outside';
  // The thickness of the border
  thickness: number;
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
  color?: string;
  lineHeight?: number;
  fontSize?: number;
  fontWeight?: number;
  letterSpacing?: number;
  textShadow?: any;
  borderWidth?: number;
  borderRadius?: number;
  backgroundColor?: string;
  backgroundImage?: string;
  lines?: number;
  [s: string]: any;
}

export interface IAttrs {
  src?: string;
  text?: string;
}

