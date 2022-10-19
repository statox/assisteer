<script lang="ts">
    import { afterUpdate } from 'svelte';
    import { settings } from '../../../stores';
    import { BaseObject, getObject } from '../../../services/data/objects';
    import { getObjectDefaultRecipe, Recipe } from '../../../services/data/recipes';
    import { alphaSort } from '../../../services/utils';
    export let object: BaseObject;
    let recipe: Recipe;
    let tool: BaseObject;

    afterUpdate(() => {
        if (!object) {
            return;
        }
        recipe = getObjectDefaultRecipe(object?.id || '');
        try {
            tool = getObject(recipe.tool);
        } catch (e) {
            // Edge case for exo chips and scrap
            console.log('couldnt get tool for object', object.id);
        }
    });
</script>

<main class="container">
    {#if recipe}
        <h4 class="content-subheader">Recipe</h4>
        <div class="row">
            <div class="col-md-6 text-align-center">
                {#if tool}
                    <span class="important-word">
                        <img class="img-fluid tool-icon" src={tool.url.icon} alt={tool.labels.en} />
                        &nbsp;{tool.labels.en}
                    </span>
                    <div class="top-margin-15">
                        <img class="img-fluid tool-image" src={tool.url.image} alt={tool.labels.en} />
                    </div>
                {/if}
            </div>
            <div class="col-md-6">
                <ul>
                    {#each Object.keys(recipe.resources).sort(alphaSort) as resourceName}
                        {@const resource = getObject(resourceName)}
                        <li>
                            <span>
                                {recipe.resources[resourceName]}
                                &nbsp;<img
                                    class="resource-icon"
                                    src={resource.url[$settings.pictureType]}
                                    alt={resource.labels.en}
                                />
                                &nbsp;{resource.labels.en}
                            </span>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    {/if}
</main>

<style>
    h4 {
        margin-top: 0.3em;
    }
    ul {
        list-style-type: none;
    }
    .text-align-center {
        text-align: center;
    }
    .resource-icon {
        width: 1.5em;
    }
    .tool-icon {
        width: 1.5em;
    }
    .tool-image {
        max-width: 100px;
    }
    .top-margin-15 {
        margin-top: 15px;
    }
</style>
