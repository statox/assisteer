<script lang="ts">
    import { afterUpdate } from 'svelte';
    import { settings } from '../../../stores';
    import { BaseObject, getObject } from '../../../services/data/objects';
    import { getObjectDefaultRecipe, Recipe } from '../../../services/data/recipes';
    import { alphaSort } from '../../../services/utils';
    import ObjectName from '../../utils/ObjectName.svelte';
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
        <div>
            {#if tool}
                <ObjectName importantWord={true} object={getObject(tool.id)} pictureType={'both'} largerIcon={true} />
            {/if}
        </div>
        <div>
            <ul>
                {#each Object.keys(recipe.resources).sort(alphaSort) as resourceName}
                    <li>
                        <ObjectName
                            object={getObject(resourceName)}
                            pictureType={$settings.pictureType}
                            quantity={recipe.resources[resourceName]}
                        />
                    </li>
                {/each}
            </ul>
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
    .top-margin-15 {
        margin-top: 15px;
    }
    .tool-image {
        max-height: 10vh;
    }
</style>
