import { ICompData, IStyle } from "../types";
import {INode} from "../types";
const helper = require("@imgcook/dsl-helper");

export default (data: INode): ICompData => {


  const { printer, utils } = helper;
  const line = (content: any, level: any) => utils.line(content, { indent: { space: level * 2 } });

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
    attrStr += node.attrs.src ? ` source={require('./img/${node.attrs.src}.png')}` : '';
    attrStr += node.attrs.className ? ` style={styles.${node.attrs.className}}` : '';

    if (node.attrs.text) {
      lines.push(line(`<${nodeType}${attrStr} allowFontScaling={false}>${node.attrs.text}</${nodeType}>`, level));
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
  const transVal = (val: string) => {
    if (!Number(val) && Number(val) != 0) {
      return `'${val}'`;
    } else {
      return val;
    }
  }
  lines.push(line('const styles = StyleSheet.create({', 0));
  styleArr.forEach((item, idx) => {
      lines.push(line(`${item.className}: {`, 1));
      Object.keys(item.style).forEach(key => {
        lines.push(line(`${key}: ${transVal(item.style[key])},`, 2));
      });
      lines.push(line(`},`, 1));
  })
  lines.push(line('});', 0));

  return {
    imports: '',
    vdom,
    style: printer(lines)
  };
}
