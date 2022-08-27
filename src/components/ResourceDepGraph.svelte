<script lang="ts">
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import type {Resource, DepsTree, SimpleDepsTree, RecursiveDepsTree} from '../types/stores.types';
import {isSimpleDepsTree} from '../types/typeguards';
import { controlsState, resources } from '../stores';
import { getResourcesDependencies } from '../services/getResourceDependencies';
import GraphControls from './GraphControls.svelte';

import { onMount } from 'svelte';

let cy;

const nodeExists = (id: string) => {
    const existing = cy.nodes(`[id = "${id}"]`);
    return existing.length > 0;
};

const resetCytoscape = () => {
    const cyDiv = document.getElementById('cy');
    cy = cytoscape({
        container: cyDiv, // container to render in
        elements: [],
        style: [ // the stylesheet for the graph
            {
                selector: 'node',
                style: {
                    // TODO The doc advises to memoize the functions
                    'label': (node) => {
                        if (node.data('label')) {
                            return node.data('label');
                        }
                        return node.data('id');
                    },
                    'background-color': ( node ) => {
                        if (node.data('type') === 'planet') return '#4ef542';
                        if (node.data('type') === 'tool') return '#e84c09';
                        return '#666';
                    },
                    'color': ( node ) => {
                        if (node.data('type') === 'planet') return '#4ef542';
                        if (node.data('type') === 'tool') return '#e84c09';
                        return '#fff';
                    }
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 3,
                    'line-color': '#919191',
                    'target-arrow-color': '#ccc',
                    'target-arrow-shape': 'triangle',
                    // TODO Fix typing. I'm too lazy to do it now
                    'curve-style': $controlsState.curvesMode
                }
            }
        ]
    });
    updateGraph();
}

const addNaturalNode = (current: SimpleDepsTree) => {
    const targetId = current.planets.toString();

    if (!nodeExists(current.resource)) {
        cy.add({
            group: 'nodes',
            data: {id: current.resource}
        });
    }

    if ($controlsState.planetsMode === 'none') {
        return;
    }
    if ($controlsState.planetsMode === 'uniq' && targetId === 'all') {
        return;
    }

    const toolId = current.resource + current.tool;
    cy.add({
        group: 'nodes',
        data: {
            id: toolId,
            type: 'tool',
            label: current.tool
        },
    });
    cy.add(
        {
            group: 'edges',
            data: {
                source: current.resource,
                target: toolId
            }
        }
    );

    if (!nodeExists(targetId)) {
        cy.add({
            group: 'nodes',
            data: {
                id: targetId,
                type: 'planet'
            },
        });
    }
    cy.add(
        {
            group: 'edges',
            data: {
                id: current.resource + current.tool + targetId,
                source: toolId,
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

    const toolId = current.resource + current.tool;
    cy.add({
        group: 'nodes',
        data: {
            id: toolId,
            type: 'tool',
            label: current.tool
        }
    });
    cy.add(
        {
            group: 'edges',
            data: {
                source: current.resource,
                target: toolId
            }
        }
    );

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
                    source: toolId,
                    target: target.resource,
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
    const resource = $resources.find(r => r.name === $controlsState.selected);
    const tree = getResourcesDependencies(resource);

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
    cytoscape.use( dagre );
    resetCytoscape();
})
</script>

<main>
    <h2>Dependencies graph</h2>

    <GraphControls updateGraph={updateGraph} resetCytoscape={resetCytoscape}/>
    <br/>

    <div id="cy"></div>
</main>
