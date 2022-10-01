import type { Stats } from "../../types/stats.types";

function computeStats(cy: cytoscape.Core): Stats {
  const roots = cy.nodes().roots().toArray();
  // computeStatsForOneRoot returns the resources needed to produce
  // the object in the root node with the specified quantity
  const statsForNodes = roots.map((r) => computeStatsForOneRoot(r));
  // We need to merge the results for all the root nodes to have the
  // complete requirements for a project
  const stats = statsForNodes.reduce(
    (allStats, nodeStats) => {
      return mergeStats(allStats, nodeStats);
    },
    { resources: {} }
  );
  return stats;
}

function mergeStats(a: Stats, b: Stats): Stats {
  const mergedStats = {
    resources: {},
  };

  /*
   * The structure of the resources property of the stat object is as follow
   * natural: [
   *   { resource1, count}
   * ]
   * refined: [
   *   {resource2, count}
   *   {resource3, count}
   * ]
   * So when merging two stats we need to
   * 1. Create each category
   * 2. For each category get the resource,count tuples of each stat,
   *    check if the resource is already in the merged object,
   *    and either add the tuple as is or update the existing tuple
   * Note: It's late and I probably over complicated this code. The check on
   * the first stats is not necessary since mergedStats is still empty at
   * this point
   */
  const objectTypes = new Set<string>();
  Object.keys(a.resources).forEach((objectType) => objectTypes.add(objectType));
  Object.keys(b.resources).forEach((objectType) => objectTypes.add(objectType));

  for (const objectType of [...objectTypes.values()]) {
    if (!mergedStats.resources[objectType]) {
      mergedStats.resources[objectType] = [];

      if (a.resources[objectType]) {
        for (const resourceCount of a.resources[objectType]) {
          const resourceIndex = mergedStats.resources[objectType].findIndex(
            (i: any) => i.resource === resourceCount.resource
          );
          if (resourceIndex === -1) {
            mergedStats.resources[objectType].push(resourceCount);
          } else {
            mergedStats.resources[objectType][resourceIndex].count +=
              resourceCount.count;
          }
        }
      }

      if (b.resources[objectType]) {
        for (const resourceCount of b.resources[objectType]) {
          const resourceIndex = mergedStats.resources[objectType].findIndex(
            (i: any) => i.resource === resourceCount.resource
          );
          if (resourceIndex === -1) {
            mergedStats.resources[objectType].push(resourceCount);
          } else {
            mergedStats.resources[objectType][resourceIndex].count +=
              resourceCount.count;
          }
        }
      }
    }
  }

  return mergedStats;
}

function computeStatsForOneRoot(root: cytoscape.NodeCollection): Stats {
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
    resources: resourcesInventory,
  };

  return stats;
}

export { computeStats };
