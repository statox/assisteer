<script lang="ts">
    import type { BaseObject } from "../../services/data/objects";
    import RecipeDetails from "./RecipeDetails.svelte";

    export let object: BaseObject;
</script>

<main class="container">
    {#if object}
        <div class="row">
            <div class="col-sm-6">
                <h3>{object.labels.en}</h3>
                <img src={object.url.image} alt={object.labels.en} />
            </div>
            <div class="col-sm-6">
                <RecipeDetails {object} />
            </div>
        </div>
    {/if}
</main>
