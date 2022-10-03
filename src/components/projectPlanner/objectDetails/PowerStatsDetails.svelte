<script lang="ts">
    import type { BaseObject } from "../../../services/data/objects";
    import { getObjectPowerStats, ObjectPowerStats } from "../../../services/data/power";

    export let object: BaseObject;
    let objectPowerStats: ObjectPowerStats;;

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
        {#if objectPowerStats.type === "producer"}
            <div>
                <span class="important-word">
                    Power production&nbsp;
                </span>
                {objectPowerStats.output}&nbsp;U/s
            </div>
        {/if}
        {#if objectPowerStats.type === "storage"}
            <div>
                <span class="important-word">
                    Power production&nbsp;
                </span>
                {objectPowerStats.output}&nbsp;U/s
            </div>
            <div>
                <span class="important-word">
                    Power capacity&nbsp;
                </span>
                {objectPowerStats.capacity}&nbsp;U
            </div>
        {/if}
        {#if objectPowerStats.type === "consumer"}
            <div>
                <span class="important-word">
                    Power drain&nbsp;
                </span>
                {objectPowerStats.input}&nbsp;U/s
            </div>
        {/if}
    {/if}
</main>
