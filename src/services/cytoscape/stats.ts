import type { Stats } from "../../types/stats.types";

function computeStats(cy: cytoscape.Core): Stats {
  const root = cy.nodes().roots()[0];
  if (!root) {
    return;
  }

  const neighbors = root.successors("[type = 'count']").edges();

  const resourcesCount = neighbors.map((n) => {
    return {
      resource: n.data("targetResource").name,
      type: n.data("targetResource").type,
      count: n.data("count"),
    };
  });

  const resourcesInventory = resourcesCount.reduce((inventory, count) => {
    if (!inventory[count.type]) {
      inventory[count.type] = [];
    }

    inventory[count.type].push({
      resource: count.resource,
      count: count.count,
    });
    return inventory;
  }, {});

  const stats: Stats = {
    product: root.data("id"),
    resources: resourcesInventory,
  };

  return stats;
}

export { computeStats };
