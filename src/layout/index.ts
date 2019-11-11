import { INode } from "../types";
import blockDirection from './block-direction';
import blockStyle from './block-style';
import processors from './processors';


export default (nodes: INode[]): INode => {

  const rootNode: INode = blockDirection(nodes);

  debugger;
  blockStyle(rootNode);
  debugger;

  const processNode = (node: INode) => {
    debugger;
    processors.forEach(visitor => {
      debugger
      if (visitor.test(node)) visitor.enter(node);
    });
    node.children.forEach(child => processNode(child));

    processors.forEach(visitor => {
      debugger;
      if (visitor.test(node)) visitor.exit(node);
    });
  };

  return rootNode;

}
