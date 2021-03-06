import {ICompData, IStyle} from '../types';
import {INode} from '../types';
const helper = require('@imgcook/dsl-helper');
import renameClassname from './rename-classname';

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
};

export default (data: INode): ICompData => {
  renameClassname(data);

  debugger;
  const {printer, utils} = helper;
  const line = (content: any, level: any) =>
    utils.line(content, {indent: {space: level * 2}});

  const typeMap: {[key: string]: string} = {
    Text: 'span',
    Image: 'img',
    Block: 'div',
    Repeat: 'div',
    Shape: 'div',
  };

  // 生成dom、样式数组
  const styleArr: {style: IStyle; className: string}[] = [];
  const parseVdom = (node: INode, level: number) => {
    const lines = [],
      nodeType = typeMap[node.type];
    if (!styleArr.map(i => i.className).includes(node.attrs.className)) {
      styleArr.push({
        style: node.style,
        className: node.attrs.className,
      });
    }
    let attrStr = '';
    attrStr += node.attrs.src ? ` src='${node.attrs.src}'` : '';
    attrStr += node.attrs.className ? ` class="c${node.attrs.className}"` : '';

    if (node.attrs.text) {
      console.log('NODE: ' + JSON.stringify(node.attrs));
      lines.push(
        line(`<${nodeType}${attrStr}>${node.attrs.text}</${nodeType}>`, level),
      );
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
  };
  const vdom = printer(parseVdom(data, 0));

  // 生成style
  let lines: string[] = [];

  styleArr.forEach(item => delete item.style.lines);
  lines.push(line(`.c${styleArr[0].className} {`, 0));
  Object.keys(styleArr[0].style).forEach(key => {
    lines.push(
      line(`${transKey(key)}: ${transVal(key, styleArr[0].style[key])};`, 1),
    );
  });
  styleArr.forEach((item, idx) => {
    if (idx > 0) {
      lines.push(line(`.c${item.className} {`, 1));
      Object.keys(item.style).forEach(key => {
        if (key === 'gradient') {
          debugger;
          transGradient(item.style[key]).forEach(item =>
            lines.push(line(item, 2)),
          );
        } else {
          lines.push(
            line(`${transKey(key)}: ${transVal(key, item.style[key])};`, 2),
          );
        }
      });
      lines.push(line(`}`, 1));
    }
  });
  lines.push(line(`}`, 0));

  return {
    imports: '',
    vdom: vdom,
    style: printer(lines),
  };
};

const transKey = (str: string) => {
  return str.replace(/\B([A-Z])/g, '-$1').toLowerCase();
};

const transVal = (key: string, val: any) => {
  val = val ? val : 0;
  if(key==='opacity'){
    return val;
  } else if (typeof val === 'number' && !(key === 'lineHeight' && val < 5)) {
    val = val / 50 + 'rem';
  }

  return val;
};

/**
 * 转换线性变化部分;
 * @param {IGradient} gradient
 * @returns {string[]}
 */
function transGradient(gradient: IGradient): string[] {
  let lines: string[] = [];

  let colors = gradient.stops
    .map((item: {position: number; color: string}) => item.color)
    .join(',');

  //已知三角形边长求夹角的公式 https://zhidao.baidu.com/question/239320646.html
//TODO  这里要计算出来

  lines.push(`background-image:linear-gradient(to left, ${colors});`);
  return lines;
}

interface IGradient {
  gradientType: string;
  from: From;
  to: From;
  aspectRatio: number;
  stops: Stop[];
}

interface Stop {
  position: number;
  color: string;
}

interface From {
  x: number;
  y: number;
}
