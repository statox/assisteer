<script lang="ts">
    import { controlsState } from '../stores';

    export let updateGraph = null;
    export let resetCytoscape = null;

</script>

<main>
    <h2>Controls panel</h2>
    <table id="controlsContainer">
        <thead>
            <tr>
                <th><label for="planetsMode">Choose planets to show</label></th>
                <th><label for="graphMode">Graph mode</label></th>
                <th><label for="curvesMode">Curves mode</label></th>
                <th>Toggles</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <select name="planetsMode" id="planetsMode" bind:value={$controlsState.planetsMode} on:change={updateGraph}>
                        <option value={"uniq"}>Uniques only</option>
                        <option value={"all"}>All</option>
                        <option value={"none"}>None</option>
                    </select>
                </td>
                <td>
                    <select name="graphMode" id="graphMode" bind:value={$controlsState.graphMode} on:change={resetCytoscape}>
                        <option value={"dagre"}>Dagre</option>
                        <option value={"eventparent"}>Even parent</option>
                        <option value={"eventparent-horizontal"}>Even parent - Horizontal</option>
                        <option value={"breadthfirst"}>Breadthfirst</option>
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
                    <div>
                        <label for="mergePlanets">Merge planets</label>
                        <input name="mergePlanets" id="mergePlanets" type=checkbox bind:checked={$controlsState.mergeUniquePlanets} on:change={updateGraph}>
                    </div>
                    <div>
                        <label for="showTools">Show tools</label>
                        <input name="showTools" id="showTools" type=checkbox bind:checked={$controlsState.showTools} on:change={updateGraph}>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</main>
