import {INode, IProcessor} from "../../types";
import {val} from "../utils";

export default <IProcessor> {
  test: (node: INode) => {
    return true;
  },
  enter: (node: INode) => {},
  exit: (node: INode) => {
    const flexDirection = node.style.flexDirection;
    if (flexDirection === 'column') {
      const sameNode = node.extraInfo && node.extraInfo.sameNode;
      const sameMarginBottom = node.children.every((child, idx) => {
        if (idx == node.children.length - 1) return true;
        if (child.style.marginBottom
            && child.style.marginBottom == node.children[0].style.marginBottom) {
          return true;
        }
        return false;
      });
      if (sameNode && node.children.length > 1 && sameMarginBottom) {
        const lastNode = node.children[node.children.length - 1];
        const sameMb = val(node.children[0].style.marginBottom);
        const lastMb = val(lastNode.style.marginBottom);
        if (node.style.paddingBottom) {
          node.style.paddingBottom = node.style.paddingBottom - (sameMb - lastMb);
          lastNode.style.marginBottom = sameMb;
        } else if(node.style.marginBottom) {
          node.style.marginBottom = node.style.marginBottom - (sameMb - lastMb);
          lastNode.style.marginBottom = sameMb;
        }
      }
    }
  },
};
