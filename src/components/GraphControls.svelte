<script lang="ts">
    import { controlsState } from '../stores';
    import { allObjects } from '../data';
    import { onMount } from 'svelte';

    export let updateGraph = null;
    export let resetCytoscape = null;

    let ref: any; // TODO Fix type

    onMount(() => {
        ref.focus();
    });
</script>

<style>
    table {
        width: 100%;
    }
    td {
        text-align: center;
    }
    table, th, td {
        border: 1px solid;
        border-collapse: collapse;
    }
</style>

<main>
    <table id="controlsContainer">
        <thead>
            <tr>
                <th><label for="resource">Choose an object or a resource:</label></th>
                <th><label for="planetsMode">Choose planets to show:</label></th>
                <th><label for="curvesMode">Curves mode:</label></th>
                <th><label for="mergePlanets">Merge uniques planets:</label></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <select name="object_type" id="object_type" bind:value={$controlsState.selectedCategory} on:change={updateGraph}>
                        {#each Object.keys(allObjects) as type}
                            <option value={type}>{type}</option>
                        {/each}
                    </select>
                    <select name="resources" id="resources" bind:value={$controlsState.selected} on:change={updateGraph} bind:this={ref}>
                        {#each allObjects[$controlsState.selectedCategory] as resource}
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
                <td>
                    <input name="mergePlanets" id="mergePlanets" type=checkbox bind:checked={$controlsState.mergeUniquePlanets} on:change={updateGraph}>
                </td>
            </tr>
        </tbody>
    </table>
</main>
