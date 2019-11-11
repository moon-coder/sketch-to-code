import { INode } from "../types";
import blockDirection from './block-direction';
import blockStyle from './block-style';
import processors from './processors';


export default (nodes: INode[]): INode => {

  const rootNode: INode = blockDirection(nodes);

  blockStyle(rootNode);

  const processNode = (node: INode) => {
    processors.forEach(visitor => {
      if (visitor.test(node)) visitor.enter(node);
    });
    node.children.forEach(child => processNode(child));

    processors.forEach(visitor => {
      if (visitor.test(node)) visitor.exit(node);
    });
  };

  return rootNode;

}
