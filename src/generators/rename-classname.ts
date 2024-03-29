import {INode} from "../types";

// 比较两个字符串， 取长度更短的那个
// 用于className统一名称时取较短的名称
function getShorterStr(str1: string, str2: string) {
  if (!str1 || !str2) return;
  if (str1.length <= str2.length) {
    return str1;
  } else {
    return str2;
  }
}

// style对象按属性名排序，并转成JSON对象
function sortedStyleObjectAndToJsonStr(styleObject: any): string {
  if (!styleObject || typeof styleObject != 'object') return '';

  const attrNames = Object.keys(styleObject);
  attrNames.sort();

  let newStyleObject: any = {};
  attrNames &&
  attrNames.forEach(name => {
    newStyleObject[name] = styleObject[name];
  });
  return JSON.stringify(newStyleObject);
}

/**
 * 统一style完全相同的className
 * 例如： 三个style完全相同的style对象对应className分别为title、title1、title2, 统一className为title
 * @param {object} data
 * @param {object} style_class_map 存放style与class的对应关系，所有节点共用
 */
function unifyClassName(data: INode, style_class_map: any = {}) {
  if (!data || typeof data != 'object') return data;

  const sortedStyleStr: string = sortedStyleObjectAndToJsonStr(data.style);

  if (Object.keys(style_class_map).indexOf(sortedStyleStr) == -1) {
    style_class_map[sortedStyleStr] = {};
    style_class_map[sortedStyleStr][data.attrs.className] = data; // 记住引用
  } else {
    let shortStr = (classStore => {
      let nameArr = Object.keys(classStore);
      let short: any = null;
      nameArr.map(_v => {
        !short && (short = _v);
        if (short.length >= _v.length) {
          short = _v;
        }
      });
      return short;
    })(style_class_map[sortedStyleStr]);
    const shorterName = getShorterStr(data.attrs.className, shortStr);
    style_class_map[sortedStyleStr][data.attrs.className] = data;
    for (const _o in style_class_map[sortedStyleStr]) {
      style_class_map[sortedStyleStr][_o].attrs.className = shorterName;
    }
  }

  data.children &&
  data.children.forEach(childData => {
    unifyClassName(childData, style_class_map);
  });

  return data;
}

export default unifyClassName;
