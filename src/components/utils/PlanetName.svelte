<script lang="ts">
    import type { Planet } from '../../services/data/planets';

    export let planet: Planet;
    export let pictureType: 'icon' | 'image';
    export let hideName: boolean = false;
    export let largerText: boolean = false;
    export let largerIcon: boolean = false;
    export let boldName: boolean = false;
    export let uppercase: boolean = false;
</script>

<span class="important-word">
    <img class="img-fluid em1" class:em2={largerIcon} src={planet.url[pictureType]} alt={planet.labels.en} />
    {#if !hideName}
        <span class="important-word label em1" class:em2={largerText} class:uppercase>
            {#if boldName === true}
                <b>{planet.labels.en}</b>
            {:else}
                {planet.labels.en}
            {/if}
        </span>
    {/if}
</span>

<style>
    .em1 {
        width: 1em;
    }
    .em2 {
        width: 2em;
    }
    .label {
        text-transform: capitalize;
    }
    .label.uppercase {
        text-transform: uppercase !important;
    }
</style>
