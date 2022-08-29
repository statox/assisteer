function computeStats(cy: cytoscape.Core) {
  console.log("STATS from module");
  const root = cy.nodes().roots()[0];

  const neighbors = root.successors("[type = 'count']").edges();

  const resourcesCount = neighbors.map((n) => {
    return {
      resource: n.data("target"),
      count: n.data("label"),
    };
  });
  console.log(
    resourcesCount.sort((a, b) => (a.resource < b.resource ? -1 : 1))
  );
}

export { computeStats };
