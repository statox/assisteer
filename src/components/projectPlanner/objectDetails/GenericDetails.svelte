<script lang="ts">
    import type { BaseObject } from '../../../services/data/objects';
    export let object: BaseObject;
</script>

<main>
    {#if object}
        <div class="d-flex flex-wrap row justify-content-between">
            <h5 class="content-subheader">Info</h5>
            <div class="d-flex justify-content-between">
                <span class="important-word">Wiki</span>
                <span>
                    <a class="wiki-link" href={object.url.wiki} target="_blank">Link</a>
                </span>
            </div>

            {#if object.type !== 'resource'}
                <div class="d-flex justify-content-between">
                    <span class="important-word">Unlock cost</span>
                    <span>{object.bytesRequired} bytes</span>
                </div>

                <div class="d-flex justify-content-between">
                    <span class="important-word">Tier</span>
                    <span>{object.tier}</span>
                </div>
            {/if}
        </div>
    {/if}
</main>
