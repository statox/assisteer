<script lang="ts">
    import type { BaseObject } from "../../services/data/objects";

    export let object: BaseObject;
</script>

<main>
    <div>
        {#if object}
            <h3>{object.labels.en}</h3>
            <img src={object.url.image} alt={object.labels.en} />
        {/if}
    </div>
</main>
