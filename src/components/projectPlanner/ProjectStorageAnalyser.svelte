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
            {JSON.stringify(storageStats, null, 4)}
        </div>
    </div>
</main>
