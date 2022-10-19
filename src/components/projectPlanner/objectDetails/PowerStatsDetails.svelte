<script lang="ts">
    import type { BaseObject } from '../../../services/data/objects';
    import { getObjectPowerStats, ObjectPowerStats } from '../../../services/data/power';

    export let object: BaseObject;
    let objectPowerStats: ObjectPowerStats;

    // Reactive declaration: The code runs on props change
    $: {
        (() => {
            if (!object) {
                return;
            }
            objectPowerStats = getObjectPowerStats(object.id);
        })();
    }
</script>

<main>
    {#if objectPowerStats}
        <div class="d-flex flex-wrap row justify-content-between">
            <h5 class="content-subheader">Power</h5>
            {#if objectPowerStats.type === 'producer'}
                <div class="d-flex justify-content-between">
                    <span class="important-word"> Power production&nbsp; </span>
                    {objectPowerStats.output}&nbsp;U/s
                </div>
            {/if}
            {#if objectPowerStats.type === 'storage'}
                <div class="d-flex justify-content-between">
                    <span class="important-word"> Power production&nbsp; </span>
                    {objectPowerStats.output}&nbsp;U/s
                </div>
                <div class="d-flex justify-content-between">
                    <span class="important-word"> Power capacity&nbsp; </span>
                    {objectPowerStats.capacity}&nbsp;U
                </div>
            {/if}
            {#if objectPowerStats.type === 'consumer'}
                <div class="d-flex justify-content-between">
                    <span class="important-word"> Power drain&nbsp; </span>
                    {objectPowerStats.input}&nbsp;U/s
                </div>
            {/if}
        </div>
    {/if}
</main>
