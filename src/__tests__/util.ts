/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2019/10/16
 **/
import {readJSONSync} from "fs-extra";

export function loadeOrigin(repoPath: string) {
  let layers = readJSONSync(repoPath);

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