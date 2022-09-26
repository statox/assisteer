<script lang="ts">
    import { afterUpdate } from "svelte";
    import type { BaseObject } from "../../services/data/objects";
    import {
        getObjectDefaultRecipe,
        Recipe,
    } from "../../services/data/recipes";
    export let object: BaseObject;
    let recipe: Recipe;

    afterUpdate(() => {
        if (!object) {
            return;
        }
        recipe = getObjectDefaultRecipe(object?.id || "");
    });
</script>

<main>
    {#if recipe}
        <h4 class="content-subheader">Recipe</h4>
        <p>Tool: {recipe.tool}</p>
        {#each Object.keys(recipe.resources) as resource}
            <p>{resource} x{recipe.resources[resource]}</p>
        {/each}
    {/if}
</main>

<style>
    h4 {
        margin-top: 0.3em;
    }
</style>
