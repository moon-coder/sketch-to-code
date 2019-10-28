import { ICompData, IStyle } from "../types";
import {INode} from "../types";
const helper = require("@imgcook/dsl-helper");


const domWapper = (dom: string) => {
  return `
<!doctype html>
<html>
<head>
  <title></title>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width,viewport-fit=cover">
  <link rel="stylesheet/less" type="text/css" href="demo.less" />
  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/less.js/2.5.3/less.min.js"></script>
  <style type="text/css">
    html {
      font-size: 13.333333vw!important;
      box-sizing: border-box;
    }
    *,*::before,*::after {
      box-sizing: inherit;
    }
    html, body {
      padding: 0;
      margin: 0
    }
  </style>
</head>
<body>
${dom}
</body>

</html>
  `;
}


export default (data: INode): ICompData => {

  const { printer, utils } = helper;
  const line = (content: any, level:any) => utils.line(content, { indent: { space: level * 2 } });

  const typeMap: {[key: string] : string} = {
    'Text': 'span',
    'Image': 'img',
    'Block': 'div',
    'Repeat': 'div',
    'Shape': 'div'
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
    attrStr += node.attrs.src ? ` src='${node.attrs.src}'` : '';
    attrStr += node.attrs.className ? ` class="c${node.attrs.className}"` : '';

    if (node.attrs.text) {
      console.log('NODE: ' + JSON.stringify(node.attrs));
      lines.push(line(`<${nodeType}${attrStr}>${node.attrs.text}</${nodeType}>`, level));
    } else if (nodeType === 'img') {
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
  // const transVal = val => {
  //   val = val ? val : 0;
  //   if (typeof(val) === 'number') val = val * 2 + 'px';
  //   return val;
  // }
  const transVal = (key: string, val: any) => {
    val = val ? val : 0;
    if (typeof(val) === 'number'
      && !(key === 'lineHeight' && val < 5)) {
      val = val / 50 + 'rem';
    }
    return val;
  }

  styleArr.forEach(item => delete item.style.lines);
  lines.push(line(`.c${styleArr[0].className} {`, 0));
  Object.keys(styleArr[0].style).forEach(key => {
    lines.push(line(`${transKey(key)}: ${transVal(key, styleArr[0].style[key])};`, 1));
  });
  styleArr.forEach((item, idx) => {
    if (idx > 0) {
      lines.push(line(`.c${item.className} {`, 1));
      Object.keys(item.style).forEach(key => {
        lines.push(line(`${transKey(key)}: ${transVal(key, item.style[key])};`, 2));
      });
      lines.push(line(`}`, 1));
    }
  })
  lines.push(line(`}`, 0));

  return {
    imports: '',
    vdom: domWapper(vdom),
    style: printer(lines)
  };
}
