// import memoizeOne from 'memoize-one';
// import { isEqual } from 'lodash';
//
// /* eslint no-useless-escape:0 import/prefer-default-export:0 */
// const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
//
// export function isUrl(path: string) {
//   return reg.test(path);
// }
//
// export const array2Tree = memoizeOne((arr, primaryKey, parentKey, primaryValue) => {
//   const getNode = id => {
//     const tree = [] as any;
//     for (const item of arr) {
//       if (item[parentKey] === id) {
//         item.children = getNode(item[primaryKey]);
//         tree.push(item);
//       }
//     }
//     return tree;
//   };
//
//   return getNode(primaryValue);
// }, isEqual);
