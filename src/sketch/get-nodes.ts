import {
  Border,
  Fill,
  IStyle,
  Layer,
  Text,
  Container,
  Group,
} from './types-sketch';
import {IExtraInfo, IFrame, INode} from '../types';
import * as uuid from 'uuid';
import { exportImg } from './util';
let sketch = require('sketch');
const fs = require('@skpm/fs');
const os = require('@skpm/os');
const path = require('@skpm/path');
const dialog = require('@skpm/dialog');

interface NodeExtraInfo {
  //TODO 对应的imagePath也要记录下来;
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
export default (layer?: Layer): INode[] => {

  let OutPutPath  = path.join(os.tmpdir(),"moon-"+Date.now());
  fs.mkdirSync(OutPutPath);
  if (!layer) {
    // 视觉元素提取
    const layers = sketch.getSelectedDocument().selectedLayers;
    if (layers.length == 0) {
      const msg = 'No layers are selected.';
      sketch.UI.message(msg);
      throw new Error(msg);
    }
    //TODO 图片是怎么对应起来的
    fs.writeFileSync(`${OutPutPath}/origin.json`, JSON.stringify(layers,null,2));
    layer = layers.layers[0];
  }

  // 整体截图
  if(layer ) {
    exportImg(layer,OutPutPath);
  }

  var document = sketch.getSelectedDocument();
  const resultNodes: INode[] = [];

  interface INodeInfo{
    imageUrl?:string;
    [name:string]:any;
  }
  //供页面生成使用的额外信息
  let nodeExtraInfo:{[nodeId:string]:INodeInfo} ={
  };

  function setNodeInfo(nodeId:string,nodeInfo:Partial<INodeInfo>){
      if(!nodeExtraInfo[nodeId]){
        nodeExtraInfo[nodeId]={}
      }

    nodeExtraInfo[nodeId]={...nodeExtraInfo[nodeId],...nodeInfo}
  }

  const walk = (
    layer: Layer,
    {
      lv = 0,
      pPath = '',
      relPath="#",
      nodeRepo = {},
    }: {lv: number; pPath: string; relPath:string; nodeRepo: NodeInfoRepo},
  ) => {
    if (layer.hidden) {
      return;
    }

    let currentNodePath = `${pPath}${relPath}`;

    if (lv != 0 && nodeRepo[pPath]) {
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
    let layerImgSrc = '';
    if (layer.type === 'Image'
        || layer.type === 'Group' && layer.name.endsWith('-合并')
        || layer.type === 'SymbolInstance'
    ) {
      layerImgSrc = exportImg(layer,OutPutPath);
      setNodeInfo(layer.id,{imageUrl:layerImgSrc})
    }

    if (!['Artboard','Group'].includes(layer.type) || layerImgSrc) {

      const node: INode = toNode(layer,nodeRepo[pPath]);
      if (layerImgSrc) {
        if(node.extraInfo?.isBgImage) {
          node.style.backgroundImage=layerImgSrc;
        } else {
          node.attrs.src = layerImgSrc;
          node.type = 'Image';
        }
      }
      resultNodes.push(node);
    } else if(layer.name.includes("M#") && layer.type === 'Group') {
      //把带指令的group添加过来
      const node: INode = toNode(layer,nodeRepo[pPath]);
      resultNodes.push(node);

      (layer as Container).layers.forEach((layer, layrerIndex) => {
        walk(layer, {
          lv: lv + 1,
          pPath:`${currentNodePath}`,
          relPath:`.layers[${layrerIndex}]`,
          nodeRepo,
        });
      });
    } else if(lv==0 &&( layer.type === 'Group' ||layer.type ==="Artboard")) {
      //首个外部的group要添加进来.
      const node: INode = toNode(layer,nodeRepo[pPath]);
      resultNodes.push(node);

      (layer as Container).layers.forEach((layer, layrerIndex) => {
        walk(layer, {
          lv: lv + 1,
          pPath:`${currentNodePath}`,
          relPath:`.layers[${layrerIndex}]`,
          nodeRepo,
        });
      });
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

  const toNode = (layer: Layer, pNodeInfo?: NodeExtraInfo): INode => {
    let {x, y} = layer.frame;
    let __absFrame = layer.frame;

    if (pNodeInfo) {
      //如果存在父节点则. ;
      let {x: px, y: py} = pNodeInfo.__absFrame;
      __absFrame = Object.assign({}, layer.frame, {x: x + px, y: y + py});
    }
    return layerToNode(layer, __absFrame);
  };

  if(layer){
    walk(layer, {
      lv: 0,
      pPath: '',
      relPath:"#",
      nodeRepo: {},
    });
  }

  //beg group 与 ShapePath (x,y width,height)一致时, 把group去掉,如果有指令,把指令赋给 shapePath上面
  resultNodes.sort(
    (a:INode, b:INode):number => {
      let result =  a.frame.width * a.frame.height - b.frame.width * b.frame.height;
      if (result === 0) {
        if(a.__layer?.type==='Group'){
          return 1
        }
        if(b.__layer?.type==='Group'){
          return -1
        }
        return 0;
      } else {
        return result;
      }
    },
  );

  for (let i = resultNodes.length-1; i > 0; i--) {
    let nodeItem = resultNodes[i];
    let LastNodeItem = resultNodes[i-1];

    let {x,y,height,width}  = nodeItem.frame ;
    let {x:x0,y:y0,height:height0,width:width0}  = LastNodeItem.frame;
    LastNodeItem.extraInfo  =  Object.assign({},LastNodeItem.extraInfo,nodeItem.extraInfo);
    if(x===x0  && y ===y0 && height===height0 && width===width0) {
      resultNodes.splice(i,1);
    }
  }
  //beg
  console.log('beg extraInfo');
  fs.writeFileSync(`${OutPutPath}/extraInfo.json`, JSON.stringify({
    nodeExtraInfo,
    allSymbols:document.getSymbols()
  },null,2));
  console.log('end extraInfo');
  dialog.showMessageBox({
    type:"info",
    title:"导出成功",
    // buttons:["nothing"],
    detail:"使用说明:",
    message:`输出目录:  ${ OutPutPath }`
  })
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
  // layerStyle(layer, node);
  // node.extraInfo=layerExtraInfo(layer);
  node.frame = absFrame;
  node.points = calcNodeCoords(node);
  node.children = [];
  return node;
};


/**
 * 从name中提取 命令信息;
 * @param {Layer} layer
 * @returns {IExtraInfo}
 */
function layerExtraInfo(layer: Layer):IExtraInfo{
  let extraInfo:IExtraInfo={};
  if(layer.name.toUpperCase().includes("M#COMP")){
    extraInfo.isComp=true;
  } else if(layer.name.toUpperCase().includes("M#BACKGROUND-IMAGE")){
    extraInfo.isBgImage=true;
  } else if(layer.name.toUpperCase().includes("M#LIST")){
    extraInfo.sameNode=true;
  }
  return extraInfo;
}

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
  if ('Image' === layer.type) {
    return 'Image';
  }
  return 'Block';
};

const layerStyle = (layer: Layer, node: INode) => {
  let style: IStyle = {};
  // 1.边框
  if(layer.style && layer.style.borders){

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

    if(layer.style.opacity) {
      style.opacity=layer.style.opacity;
    }

    if (layer.type === 'Text') {
      // 文本 fontSize/fontWeight/lineHeight/letterSpacing/color/textShadow
      style.fontSize = layer.style.fontSize;
      // style.lineHeight = layer.style.lineHeight ? layer.style.lineHeight : 0;
      style.color = layer.style.textColor;
      node.attrs.text = (layer as Text).text;
      // style.fontWeight = layer.style.fontWeight;
      // style.letterSpacing = layer.style.kerning ? layer.style.kerning : 0;
      // if (layer.style.shadows[0]) style.textShadow = layer.style.shadows[0];
    } else {
      // 非文本 boxShadow(shadows/innerShadows)
    }
  }
  //取圆角取值;
  if(layer.points) {
    style.borderRadius= layer.points[0].cornerRadius;
  }

  if(layer.background?.enabled && layer.background.color) {
    style.backgroundColor=layer.background.color;
  }

  node.style = style;
};

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

