<script lang="ts">
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import evenParent from 'cytoscape-even-parent';
import type {DepsTree, SimpleDepsTree, RecursiveDepsTree} from '../types';
import {isSimpleDepsTree} from '../types/typeguards';
import { controlsState } from '../stores';
import { getResourcesDependencies } from '../services/dependencies';
import { searchInCategory } from '../services/resources';
import GraphControls from './GraphControls.svelte';
import { addPlanetToNodeNode, addResourceForToolNode, addResourceNode, addToolForResourceNode } from '../services/graph';

let cy: cytoscape.Core;

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
                    },
                    'width': '150%',
                    'height': '150%',
                    "font-size": '50'
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 1,
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
    /*
     * Node for the current resource
     */
    addResourceNode(cy, {
        id: current.resource.name,
        icon: current.resource.icon
    });

    if ($controlsState.planetsMode === 'none') {
        return;
    }
    if ($controlsState.planetsMode === 'uniq' && current.planets.toString() === 'all') {
        return;
    }

    /*
     * Node for the tool and edge to the current resource
     */
    const toolNode = addToolForResourceNode(cy, {
        toolName: current.tool.name,
        toolIcon: current.tool.icon,
        resourceName: current.resource.name
    });
    const toolId = toolNode.data('id');

    /*
     * If mergeUniquePlanets is enabled create only one node for the planets hosting the resource
     * If mergeUniquePlanets is disabled create one node by planet hosting the resource
     */
    addPlanetToNodeNode(cy, {
        parentNodeId: toolId,
        mergeUniquePlanets: $controlsState.mergeUniquePlanets,
        planets: current.planets
    });
};

const addRefinedNode = (current: RecursiveDepsTree) => {

    /*
     * Add node for the current resource
     */
    addResourceNode(cy, {
        id: current.resource.name,
        icon: current.resource.icon
    });

    /*
     * Add the node and the edge for the tool needed to produce the current resource
     */
    const toolNode = addToolForResourceNode(cy, {
        toolName: current.tool.name,
        toolIcon: current.tool.icon,
        resourceName: current.resource.name
    });
    const toolId = toolNode.data('id');

    const children = [];
    /*
     * For each dependency create the node for the child resource and an edge to it
     */
    for (const dep of Object.keys(current.deps)) {
        const target = current.deps[dep];

        addResourceForToolNode(cy, {
            targetResourceName: target.resource.name,
            targetResourceIcon: target.resource.icon,
            sourceNodeId: toolId
        });

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

    if ($controlsState.graphMode.includes('eventparent')) {
        cytoscape.use( evenParent );
        cy.layout({
            name: 'evenParent',
            smart: false,
            childrenSize: 1,
            verticalPadding: 2000,
            horizontalSpread: $controlsState.graphMode.includes('horizontal')
        } as any).run();
        return;
    }

    cytoscape.use( dagre );
    cy.layout({
        name: 'dagre',
        nodeDimensionsIncludeLabels: true // whether labels should be included in determining the space used by a node
    } as dagre.DagreLayoutOptions).run();
}

document.addEventListener("DOMContentLoaded", function() {
    resetCytoscape();
})
</script>

<main>
    <h2>Dependencies graph</h2>

    <GraphControls updateGraph={updateGraph} resetCytoscape={resetCytoscape}/>
    <br/>

    <div id="cy"></div>
</main>
