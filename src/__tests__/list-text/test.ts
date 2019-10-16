import {INode} from '../../types';
import {toJSON} from '../../util';
import getNodes from '../../get-nodes';
import layout from '../../layout';
import {join} from 'path';
import {readJSONSync} from 'fs-extra';
import {Layer} from "../../types-sketch";

/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2019/10/15
 **/

let layers =loadeOrigin();


const nodes: INode[] = getNodes(layers.layers[0]);

debugger;
// 布局处理
const node: INode = layout(nodes);

debugger;
const result = toJSON(node);

function loadeOrigin() {
  let layers = readJSONSync(join(__dirname, 'origin.json'))

  //把断掉的关系添加起来;
  addParent(layers);
  return layers;
}

function addParent(rootLayer:any) {
  if(rootLayer.layers && rootLayer.layers.length>0 ){
    rootLayer.layers.forEach((layer:any)=>{
      layer.parent = rootLayer;
      return addParent(layer);
    })
  }
}