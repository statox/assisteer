<script lang="ts">
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import evenParent from 'cytoscape-even-parent';
import type {DepsTree} from '../types';
import {isSimpleDepsTree} from '../types/typeguards';
import { controlsState } from '../stores';
import { getObjectDependencies } from '../services/dependencies';
import { searchInCategory } from '../services/resources';
import GraphControls from './GraphControls.svelte';
import { addPlanetToNodeNode, addResourceForToolNode, addResourceNode, addToolForResourceNode} from '../services/graph';
import {  makeNodesMoveSubtree } from '../services/cytoscape';

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
                    'color': '#fff',
                    "font-size": '50',
                    'line-color': '#919191',
                    'source-arrow-color': '#ccc',
                    'source-arrow-shape': 'triangle',
                    'label': (node: any) => {
                        return node.data('label') || "";
                    },
                    // TODO Fix typing. I'm too lazy to do it now
                    'curve-style': $controlsState.curvesMode as any
                }
            }
        ]
    });
    updateGraph();
}

const addNode = (current: DepsTree) => {
    /*
     * Node for the current resource
     */
    const resourceNode = addResourceNode(cy, {
        id: current.resource.name,
        icon: current.resource.icon
    });

    // The anchorNode will contain either the resourceNode or
    // the tool node to let the children attach
    let anchorNode = resourceNode;

    /*
     * Node for the tool and edge to the current resource
     */
    if ($controlsState.showTools) {
        anchorNode = addToolForResourceNode(cy, {
            toolName: current.tool.name,
            toolIcon: current.tool.icon,
            resourceName: current.resource.name
        });
    }

    if (isSimpleDepsTree(current)) {
        /*
         * For objects with just a planet as dependency create only the planet nodes when needed
         */
        if ($controlsState.planetsMode === 'none') {
            return [];
        }
        if ($controlsState.planetsMode === 'uniq' && current.planets.toString() === 'all') {
            return [];
        }

        addPlanetToNodeNode(cy, {
            parentNodeId: anchorNode.data('id'),
            mergeUniquePlanets: $controlsState.mergeUniquePlanets,
            planets: current.planets
        });
        return [];
    }

    /*
     * For objects which are not natural or atmospheric resources:
     * For each dependency create the node for the child resource and an edge to it
     */
    const children = [];
    for (const dep of Object.keys(current.deps)) {
        const target = current.deps[dep];

        addResourceForToolNode(cy, {
            targetResourceName: target.resource.name,
            targetResourceIcon: target.resource.icon,
            sourceNodeId: anchorNode.data('id'),
            quantity: target.quantity
        });

        children.push(target);
    }

    return children;
}

const updateGraph = () => {
    // Hacky clean up
    const allNodes = cy.filter((e: any) => e);
    cy.remove(allNodes);

    let resource = searchInCategory($controlsState.selectedCategory, $controlsState.selected);

    // Small hack to handle when $controlsState.selectedCategory changes:
    // In this case $controlsState.selected isn't changed so searchInCategory() doesn't
    // find the right resource so instead we get the first resource of the category
    // and update $controlsState.selected to keep things tidy
    if (!resource) {
        resource = searchInCategory($controlsState.selectedCategory, "default");
        $controlsState.selected = resource.name;
    }

    const tree = getObjectDependencies(resource, 1);

    const stack: DepsTree[] = [tree];

    while (stack.length) {
        const current = stack.shift();
        const children = addNode(current);
        for (const child of children) {
            stack.push(child);
        }
    }

    /*
     * Allow to hide/show successors when clicking a node
     */
    cy.on('tap', 'node', function() {
        if (this.scratch().restData == null) {
            // Save node data and remove
            this.scratch({
                restData: this.successors().targets().remove()
            });
        } else {
            // Restore the removed nodes from saved data
            this.scratch().restData.restore();
            this.scratch({
                restData: null
            });
        }
    });

    makeNodesMoveSubtree(cy);

    if ($controlsState.graphMode.includes('eventparent')) {
        const horizontalSpread = $controlsState.graphMode.includes('horizontal');
        cytoscape.use( evenParent );
        cy.layout({
            name: 'evenParent',
            smart: false,
            childrenSize: 1,
            verticalPadding: 2000,
            horizontalSpread
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
