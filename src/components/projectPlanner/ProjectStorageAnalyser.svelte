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
            Count by tier: {storageStats.objectsCountByTier}
        </div>
        <div>
            Total object count: {storageStats.objectTotalCount}
        </div>
        <div>
            <h4 class="content-subheader">Canisters capcity</h4>
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
        <div>
            <h4 class="content-subheader">Storages capacity</h4>
            {#each ["small", "medium", "large", "extra large"] as tier, index}
                <div>
                <span class="important-word">Tier {tier}</span> {storageStats.storagesCapacityByTier[index]}
                </div>
            {/each}
        </div>
    </div>
</main>
