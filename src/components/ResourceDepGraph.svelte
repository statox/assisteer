<script lang="ts">
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { v4 as uuidv4 } from 'uuid';
import type {DepsTree, SimpleDepsTree, RecursiveDepsTree} from '../types';
import {isSimpleDepsTree} from '../types/typeguards';
import { controlsState } from '../stores';
import { getResourcesDependencies } from '../services/getResourceDependencies';
import { searchInCategory } from '../services/resources';
import GraphControls from './GraphControls.svelte';

let cy: cytoscape.Core;

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
                    'label': (node: any) => {
                        if (node.data('label')) {
                            return node.data('label');
                        }
                        return node.data('id');
                    },
                    'background-color': ( node: any ) => {
                        if (node.data('type') === 'planet') return '#4ef542';
                        if (node.data('type') === 'tool') return '#e84c09';
                        return '#666';
                    },
                    'background-image': (node: any) => {
                        return node.data('icon') || 'https://static.wikia.nocookie.net/astroneer_gamepedia/images/7/74/Icon_Scrap.png';
                    },
                    'background-fit': 'cover',
                    'color': ( node: any ) => {
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
                    'source-arrow-color': '#ccc',
                    'source-arrow-shape': 'triangle',
                    // TODO Fix typing. I'm too lazy to do it now
                    'curve-style': $controlsState.curvesMode as any
                }
            }
        ]
    });
    updateGraph();
}

const addNaturalNode = (current: SimpleDepsTree) => {
    const targetId = current.planets.toString();

    /*
     * Node for the current resource
     */
    if (!nodeExists(current.resource.name)) {
        cy.add({
            group: 'nodes',
            data: {
                id: current.resource.name,
                icon: current.resource.icon
            }
        });
    }

    if ($controlsState.planetsMode === 'none') {
        return;
    }
    if ($controlsState.planetsMode === 'uniq' && targetId === 'all') {
        return;
    }

    /*
     * Node for the tool and edge to the current resource
     */
    const toolId = current.resource.name + current.tool.name + uuidv4(); // uuidv4 is a shitty hack until I find a better way to handle duplicate dependencies
    cy.add({
        group: 'nodes',
        data: {
            id: toolId,
            type: 'tool',
            label: current.tool.name,
            icon: current.tool.icon
        },
    });
    cy.add(
        {
            group: 'edges',
            data: {
                source: current.resource.name,
                target: toolId
            }
        }
    );

    /*
     * If mergeUniquePlanets is enabled create only one node for the planets hosting the resource
     */
    if ($controlsState.mergeUniquePlanets) {
        const mergedPlanets = current.planets.toString();
        if (!nodeExists(mergedPlanets)) {
            cy.add({
                group: 'nodes',
                data: {
                    id: mergedPlanets,
                    type: 'planet'
                },
            });
            cy.add(
                {
                    group: 'edges',
                    data: {
                        source: toolId,
                        target: targetId
                    }
                }
            );
        }

        return;
    }

    /*
     * If mergeUniquePlanets is disabled create one node by planet hosting the resource
     */
    const planets = Array.isArray(current.planets) ? current.planets : [current.planets];
    for (const planet of planets) {
        if (!nodeExists(planet)) {
            cy.add({
                group: 'nodes',
                data: {
                    id: planet,
                    type: 'planet'
                },
            });
        }
        cy.add(
            {
                group: 'edges',
                data: {
                    id: current.resource.name + current.tool.name + planet,
                    source: toolId,
                    target: planet
                }
            }
        );
    }
};

const addRefinedNode = (current: RecursiveDepsTree) => {
    const children = [];

    /*
     * Add node for the current resource
     */
    if (!nodeExists(current.resource.name)) {
        cy.add({
            group: 'nodes',
            data: {
                id: current.resource.name,
                icon: current.resource.icon
            }
        });
    }

    /*
     * Add the node and the edge for the tool needed to produce the current resource
     */
    const toolId = current.resource.name + current.tool.name + uuidv4(); // uuidv4 is a shitty hack until I find a better way to handle duplicate dependencies
    cy.add({
        group: 'nodes',
        data: {
            id: toolId,
            type: 'tool',
            label: current.tool.name,
            icon: current.tool.icon
        }
    });
    cy.add(
        {
            group: 'edges',
            data: {
                source: current.resource.name,
                target: toolId
            }
        }
    );

    /*
     * For each dependency create the node for the child resource and an edge to it
     */
    for (const dep of Object.keys(current.deps)) {
        const target = current.deps[dep];
        const targetId = target.resource.name;

        if (!nodeExists(targetId)) {
            cy.add({
                group: 'nodes',
                data: {
                    id: targetId,
                    icon: target.resource.icon
                }
            });
        }
        cy.add(
            {
                group: 'edges',
                data: {
                    source: toolId,
                    target: target.resource.name,
                }
            }
        );
        children.push(target);
    }

    return children;
}

const updateGraph = () => {
    // Hacky clean up
    const allNodes = cy.filter((e: any) => e);
    cy.remove(allNodes);
    const resource = searchInCategory($controlsState.selectedCategory, $controlsState.selected);
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
        nodeDimensionsIncludeLabels: true // whether labels should be included in determining the space used by a node
    } as dagre.DagreLayoutOptions).run();
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
