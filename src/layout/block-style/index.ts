import colStyle from './col-style';
import rowStyle from './row-style';
import {INode} from "../../types";

export default function (node: INode) {
  colStyle(node);
  rowStyle(node);
  return node;
}
