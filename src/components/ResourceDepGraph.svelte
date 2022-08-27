<script lang="ts">
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import type {Resource, DepsTree, SimpleDepsTree, RecursiveDepsTree} from '../types/stores.types';
import {isSimpleDepsTree} from '../types/typeguards';
import {resources} from '../stores';
import { getResourcesDependencies } from '../services/getResourceDependencies';

import { onMount } from 'svelte';

let selected, cy, planetsMode;

const nodeExists = (id: string) => {
    const existing = cy.nodes(`[id = "${id}"]`);
    return existing.length > 0;
};

const addNaturalNode = (current: SimpleDepsTree) => {
    const targetId = current.planets.toString();

    if (!nodeExists(current.resource)) {
        cy.add({
            group: 'nodes',
            data: {id: current.resource}
        });
    }

    if (planetsMode === 'none') {
        return;
    }
    if (planetsMode === 'uniq' && targetId === 'all') {
        return;
    }

    if (!nodeExists(targetId)) {
        cy.add({
            group: 'nodes',
            data: {id: targetId}
        });
    }
    cy.add(
        {
            group: 'edges',
            data: {
                id: current.resource + current.tool + targetId,
                source: current.resource,
                target: targetId
            }
        }
    );
};

const addRefinedNode = (current: RecursiveDepsTree) => {
    const children = [];

    if (!nodeExists(current.resource)) {
        cy.add({
            group: 'nodes',
            data: {id: current.resource}
        });
    }
    for (const dep of Object.keys(current.deps)) {
        const target = current.deps[dep];
        const targetId = target.resource;

        if (!nodeExists(targetId)) {
            cy.add({
            group: 'nodes',
                data: {id: targetId}
            });
        }
        cy.add(
            {
                group: 'edges',
                data: {
                    source: current.resource,
                    target: target.resource,
                },
                style: {
                    label: current.tool
                }
            }
        );
        children.push(target);
    }

    return children;
}

const updateGraph = () => {
    // Hacky clean up
    const allNodes = cy.filter(function(element, i){
        return element;
    });
    cy.remove(allNodes);
    const tree = getResourcesDependencies(selected);

    const stack: DepsTree[] = [tree];

    while (stack.length) {
        const current = stack.shift();
        if (isSimpleDepsTree(current)) {
            // If it's a natural or atmospheric resource show the planet it is available on
            addNaturalNode(current);
        } else {
            // Otherwise show the link with the dependencies
            const children = addRefinedNode(current);
            for (const child of children) {
                stack.push(child);
            }
        }
    }

    cy.layout({
        name: 'dagre',
        nodeDimensionsIncludeLabels: true
    }).run();
}

document.addEventListener("DOMContentLoaded", function() {
    const cyDiv = document.getElementById('cy');
    cytoscape.use( dagre );
    cy = cytoscape({
        container: cyDiv, // container to render in
        elements: [],
        style: [ // the stylesheet for the graph
            {
                selector: 'node',
                style: {
                    'background-color': '#666',
                    'label': 'data(id)'
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 3,
                    'line-color': '#ccc',
                    'target-arrow-color': '#ccc',
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier'
                }
            }
        ]
    });
    updateGraph();
})

  let ref;

  onMount(() => {
    ref.focus();
  });
</script>

<main>
    <h2>Dependencies graph</h2>
    <label for="resource">Choose a resource:</label>

    <select name="resources" id="resources" bind:value={selected} on:change={updateGraph} bind:this={ref}>
        {#each $resources as resource}
            <option value={resource}>{resource.name}</option>
        {/each}
    </select> 

    <label for="planetsMode">Choose planets to show:</label>

    <select name="planetsMode" id="planetsMode" bind:value={planetsMode} on:change={updateGraph}>
        <option value={"uniq"}>Uniques only</option>
        <option value={"all"}>All</option>
        <option value={"none"}>None</option>
    </select>

    <div id="cy"></div>
</main>
