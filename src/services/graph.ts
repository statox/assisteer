const nodeExists = (cy: cytoscape.Core, id: string) => {
  return cy.getElementById(id).length > 0;
};

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

export { addResourceNode };
