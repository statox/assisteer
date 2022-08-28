import type { DepsTree, SimpleDepsTree } from "./depsTree.types";

function isSimpleDepsTree(tree: DepsTree): tree is SimpleDepsTree {
  return (tree as SimpleDepsTree).planets !== undefined;
}

export { isSimpleDepsTree };
