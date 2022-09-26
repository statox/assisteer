<script lang="ts">
    import type { BaseObject } from "../../services/data/objects";
    import RecipeDetails from "./RecipeDetails.svelte";

    export let object: BaseObject;
</script>

<main class="container">
    {#if object}
        <div class="row">
            <div class="col-sm-6">
                <h4 class="content-subheader">{object.labels.en}</h4>
                <img src={object.url.image} alt={object.labels.en} />
            </div>
            <div class="col-sm-6">
                <RecipeDetails {object} />
            </div>
        </div>
    {/if}
</main>

<style>
    h4 {
        margin-top: 0.3em;
    }
    img {
        margin-left: auto;
        margin-right: auto;
        display: block;
    }
</style>
