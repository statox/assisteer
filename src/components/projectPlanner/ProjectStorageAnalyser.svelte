<script lang="ts">
    import { getProjectStorageStats, ProjectStorageStats } from "../../services/data/storage";
    import { project } from "../../stores";
    let collapsed = false;
    let storageStats: ProjectStorageStats;

    $: {
        (() => {
            if (!$project) {
                return;
            }
            storageStats = getProjectStorageStats($project);
        })();
    };
</script>

<main>
    <div class="content-section">
        <h3 class="content-header" on:click={() => (collapsed = !collapsed)}>
            Storage analyser
        </h3>
        <div>
            Count by tier: {storageStats.countByTier}
        </div>
        <div>
            Total object count: {storageStats.objectTotalCount}
        </div>
        <div>
            Canister storage:
            {#each Object.keys(storageStats.canistersCapacitybyType) as type}
                <div>
                {type}
                    {#each Object.keys(storageStats.canistersCapacitybyType[type]) as canister}
                    <div>
                    {JSON.stringify(storageStats.canistersCapacitybyType[type][canister])}
                    </div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</main>
