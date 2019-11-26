import {INode} from "./types";

/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2019/10/15
 **/

const IgnoreKey = ['__layer','parent','id','className','props','semantic','points','style','frame'];

export function toJSON(node: INode) {

  return JSON.parse(JSON.stringify(node, (key, value)=>{
    if(IgnoreKey.includes(key)) {
      return  undefined;
    }
    return value;
  },2))
}