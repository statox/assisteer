<script lang="ts">
    import { controlsState, resources } from '../stores';
    import { onMount } from 'svelte';

    export let updateGraph = null;
    export let resetCytoscape = null;

    let ref;

    onMount(() => {
        ref.focus();
    });
</script>

<main>
    <table>
        <thead>
            <tr>
                <th><label for="resource">Choose a resource:</label></th>
                <th><label for="planetsMode">Choose planets to show:</label></th>
                <th><label for="curvesMode">Curves mode:</label></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <select name="resources" id="resources" bind:value={$controlsState.selected} on:change={updateGraph} bind:this={ref}>
                        {#each $resources as resource}
                            <option value={resource.name}>{resource.name}</option>
                        {/each}
                    </select> 
                </td>
                <td>
                    <select name="planetsMode" id="planetsMode" bind:value={$controlsState.planetsMode} on:change={updateGraph}>
                        <option value={"uniq"}>Uniques only</option>
                        <option value={"all"}>All</option>
                        <option value={"none"}>None</option>
                    </select>
                </td>
                <td>
                    <select name="curvesMode" id="curvesMode" bind:value={$controlsState.curvesMode} on:change={resetCytoscape}>
                        <option value={"taxi"}>Taxi</option>
                        <option value={"bezier"}>Bezier</option>
                        <option value={"segments"}>Segments</option>
                        <option value={"straight"}>Straight</option>
                    </select>
                </td>
            </tr>
        </tbody>
    </table>
</main>
