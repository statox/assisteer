<script lang="ts">
    import type { GenericObject } from '../types/objects.types';
    import { onMount } from 'svelte';
    import { controlsState, project } from '../stores';
    import { allCategories, getCategoryObjects, searchInCategory } from '../services/resources';
    export let updateGraph = null;

    const addToProject = () => {
        const object = $controlsState.selected;
        const itemIndex = $project.findIndex(item => item.object.name === object.name)
        if (itemIndex === -1) {
            $project.push({object, quantity: 1});
        } else {
            $project[itemIndex].quantity += 1;
        }
        // Hack to make svelte see the $project variable as dirty so
        // that the component is reloaded which is necessary because
        // the table holding the different items in the project is
        // created with a {#each} and not a bind:* binding
        $project = $project;
        updateGraph();
    };

    function removeFromProject(item: {object: GenericObject, quantity: number}) {
        const index = $project.indexOf(item);
        $project.splice(index, 1);
        $project = $project;
        updateGraph();
    }

    function changeQuantity(item: {object: GenericObject, quantity: number}, operation: 'inc'|'dec') {
        const index = $project.indexOf(item);
        $project[index].quantity += operation === 'inc' ? 1 : -1;
        if ($project[index].quantity <= 0) {
            removeFromProject(item);
        } else {
            updateGraph();
        }
    }

    function updateCategory() {
        $controlsState.selected = searchInCategory($controlsState.selectedCategory, "default");;
    }

    let ref: any; // TODO Fix type
    onMount(() => {
        ref.focus();
    });
</script>

<main>
    <h2>Project Panel</h2>
    <div>
        <h3>Object selection</h3>
        <div class="tableContainer">
            <table>
                <thead>
                    <tr>
                        <th>Selection</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <select name="object_type" id="object_type" bind:value={$controlsState.selectedCategory} on:change={updateCategory}>
                                {#each allCategories as type}
                                    <option value={type}>{type}</option>
                                {/each}
                            </select>

                            <br/>
                            <select name="resources" id="resources" bind:value={$controlsState.selected} bind:this={ref}>
                                {#each getCategoryObjects($controlsState.selectedCategory) as resource}
                                    <option value={resource}>{resource.name}</option>
                                {/each}
                            </select>

                            <br/>
                            <br/>
                            <button on:click={addToProject}>Add to project</button>
                        </td>
                        <td>
                            <img src={$controlsState.selected.icon} alt={$controlsState.selected.name}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <h3>Project</h3>
            <div class="tableContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Quantity</th>
                            <th>Object</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#if $project.length === 0}
                            <tr>
                                <td colspan=3>No object added yet...</td>
                            </tr>
                        {:else}
                            {#each $project as item}
                                <tr>
                                    <td>
                                        <button on:click={() => changeQuantity(item, 'dec')}>-</button>
                                        &nbsp{item.quantity}&nbsp
                                        <button on:click={() => changeQuantity(item, 'inc')}>+</button>
                                        <br/>
                                        <button on:click={() => removeFromProject(item)}>Remove</button>
                                    </td>
                                    <td>
                                        <img src="{item.object.icon}" alt="{item.object.name}"/>
                                        <br/>
                                        {item.object.name}
                                    </td>
                                </tr>
                            {/each}
                        {/if}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>
