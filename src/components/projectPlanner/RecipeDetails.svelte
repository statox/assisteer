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
    <div>
        {#if recipe}
            <h3>Recipe</h3>
            <p>Tool: {recipe.tool}</p>
            {#each Object.keys(recipe.resources) as resource}
                <p>{resource} x{recipe.resources[resource]}</p>
            {/each}
        {/if}
    </div>
</main>
