<script lang="ts">
import cytoscape from 'cytoscape';
import type {Resource} from '../types/stores.types';
import {resources} from '../stores';

let selected;

const updateGraph = () => {
    console.log(selected);
}

document.addEventListener("DOMContentLoaded", function() {
    const cyDiv = document.getElementById('cy');
    var cy = cytoscape({
        container: cyDiv, // container to render in
        elements: [ // list of graph elements to start with
            { // node a
                data: { id: 'a' }
            },
            { // node b
                data: { id: 'b' }
            },
            { // edge ab
                data: { id: 'ab', source: 'a', target: 'b' }
            }
        ],
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
        ],
        layout: {
            name: 'grid',
            rows: 1
        }
    });
})

</script>

<main>
    <h2>Dependencies graph</h2>
    <label for="resource">Choose a resource:</label>

    <select name="resources" id="resources" bind:value={selected} on:change={updateGraph}>
        {#each $resources as resource}
            <option value={resource}>{resource.name}</option>
        {/each}
    </select> 

    <div id="cy"> </div>
</main>
