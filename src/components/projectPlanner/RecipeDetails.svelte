<script lang="ts">
    import { afterUpdate } from "svelte";
    import { BaseObject, getObject } from "../../services/data/objects";
    import {
        getObjectDefaultRecipe,
        Recipe,
    } from "../../services/data/recipes";
    export let object: BaseObject;
    let recipe: Recipe;
    let tool: BaseObject;

    const alphaSort = (a, b) => a - b;

    afterUpdate(() => {
        if (!object) {
            return;
        }
        recipe = getObjectDefaultRecipe(object?.id || "");
        tool = getObject(recipe.tool);
    });
</script>

<main class="container">
    {#if recipe}
        <h4 class="content-subheader">Recipe</h4>
        <div class="row">
            <div class="col-md-6 text-align-center">
                <p class="important-word">{tool.labels.en}</p>
                <img class="img-fluid" src={tool.url.image} alt={tool.labels.en} />
            </div>
            <div class="col-md-6">
                <ul>
                    {#each Object.keys(recipe.resources).sort(alphaSort) as resource}
                        <li>
                            <span>
                                <b>{recipe.resources[resource]}</b>
                                &nbsp;{resource}
                                &nbsp;<img
                                    class="resource-icon"
                                    src={getObject(resource).url.image}
                                    alt={getObject(resource).labels.en}
                                />
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
        width: 3em;
    }
</style>
