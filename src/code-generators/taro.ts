import { ICompData, IStyle } from "../types";
import {INode} from "../types";
const helper = require("@imgcook/dsl-helper");

export default (data: INode): ICompData => {


  const { printer, utils } = helper;
  const line = (content: any, level:any) => utils.line(content, { indent: { space: level * 2 } });

  const typeMap: {[key: string] : string} = {
    'Text': 'Text',
    'Image': 'Image',
    'Block': 'View',
    'Repeat': 'View',
    'Shape': 'View'
  };


  // 生成dom、样式数组
  const styleArr: { style: IStyle, className: string }[] = [];
  const parseVdom = (node: INode, level: number) => {
    const lines = [], nodeType = typeMap[node.type];
    if (!styleArr.map(i => i.className).includes(node.attrs.className)) {
      styleArr.push({
        style: node.style,
        className: node.attrs.className
      });
    }
    let attrStr = '';
    attrStr += node.attrs.src ? ` src={${node.attrs.src}}` : '';
    attrStr += node.attrs.className ? ` className="${node.attrs.className}"` : '';

    if (node.attrs.text) {
      lines.push(line(`<${nodeType}${attrStr}>${node.attrs.text}</${nodeType}>`, level));
    } else if (nodeType === 'Image') {
      lines.push(line(`<${nodeType}${attrStr}/>`, level));
    } else {
      lines.push(line(`<${nodeType}${attrStr}>`, level));
      node.children.forEach(child => {
        lines.push(...parseVdom(child, level + 1));
      });
      lines.push(line(`</${nodeType}>`, level));
    }
    return lines;
  }
  const vdom = printer(parseVdom(data, 0));


  // 生成style
  const lines = [];
  const transKey = (str: string) => {
    return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
  }
  const transVal = (key: string, val: any) => {
    val = val ? val : 0;
    if (typeof(val) === 'number'
      && !(key === 'lineHeight' && val < 5)) {
      val = val * 2 + 'px';
    }
    return val;
  }
  styleArr.forEach(item => delete item.style.lines);
  lines.push(line(`.${styleArr[0].className} {`, 0));
  Object.keys(styleArr[0].style).forEach(key => {
    lines.push(line(`${transKey(key)}: ${transVal(key, styleArr[0].style[key])};`, 1));
  });
  styleArr.forEach((item, idx) => {
    if (idx > 0) {
      lines.push(line(`.${item.className} {`, 1));
      Object.keys(item.style).forEach(key => {
        lines.push(line(`${transKey(key)}: ${transVal(key, item.style[key])};`, 2));
      });
      lines.push(line(`}`, 1));
    }
  })
  lines.push(line(`}`, 0));

  return {
    imports: '',
    vdom,
    style: printer(lines)
  };
}
