import { v4 as uuidv4 } from "uuid";

const nodeExists = (cy: cytoscape.Core, id: string) => {
  return cy.getElementById(id).length > 0;
};

/*
 * Add a node for a resource only if it doesn't exist already
 * Return the new node
 */
const addResourceNode = (
  cy: cytoscape.Core,
  params: { id: string; icon: string }
) => {
  if (nodeExists(cy, params.id)) {
    return;
  }
  return cy.add({
    group: "nodes",
    data: params,
  });
};

/*
 * Add a node for a tool and an edge to a resource node
 * Return the tool node
 */
const addToolForResourceNode = (
  cy: cytoscape.Core,
  params: {
    toolName: string;
    toolIcon: string;
    resourceName: string;
  }
) => {
  const toolId = params.resourceName + params.toolName + uuidv4(); // uuidv4 is a shitty hack until I find a better way to handle duplicate dependencies
  const node = cy.add({
    group: "nodes",
    data: {
      id: toolId,
      type: "tool",
      label: params.toolName,
      icon: params.toolIcon,
    },
  });

  cy.add({
    group: "edges",
    data: {
      source: params.resourceName,
      target: toolId,
    },
  });

  return node;
};

export { addResourceNode, addToolForResourceNode };
