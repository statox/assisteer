<script lang="ts">
    import { afterUpdate } from "svelte";
    import type { BaseObject } from "../../services/data/objects";
    import {
        // DepTree,
        getObjectDefaultRecipe,
        // getRecipeDependenciesTree,
        Recipe,
    } from "../../services/data/recipes";
    export let object: BaseObject;
    let recipe: Recipe;
    // let depTree: DepTree;

    afterUpdate(() => {
        if (!object) {
            return;
        }
        recipe = getObjectDefaultRecipe(object?.id || "");
        // depTree = getRecipeDependenciesTree(recipe, 1);
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

            <!-- <p>{JSON.stringify(depTree)}</p> -->
        {/if}
    </div>
</main>
