<script lang="ts">
    import { afterUpdate } from "svelte";
    import { settings } from "../../../stores";
    import { BaseObject, getObject } from "../../../services/data/objects";
    import {
        getObjectDefaultRecipe,
        Recipe,
    } from "../../../services/data/recipes";
    export let object: BaseObject;
    let recipe: Recipe;
    let tool: BaseObject;

    const alphaSort = (a: string, b: string) => (a < b ? -1 : 1);

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
                <span class="important-word">
                    <img
                        class="img-fluid tool-icon"
                        src={tool.url.icon}
                        alt={tool.labels.en}
                    />
                    &nbsp;{tool.labels.en}
                </span>
                <div class="top-margin-15">
                    <img
                        class="img-fluid tool-image"
                        src={tool.url.image}
                        alt={tool.labels.en}
                    />
                </div>
            </div>
            <div class="col-md-6">
                <ul>
                    {#each Object.keys(recipe.resources).sort(alphaSort) as resource}
                        <li>
                            <span>
                                <b>{recipe.resources[resource]}</b>
                                &nbsp;<img
                                    class="resource-icon"
                                    src={getObject(resource).url[$settings.pictureType]}
                                    alt={getObject(resource).labels.en}
                                />
                                &nbsp;{resource}
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
