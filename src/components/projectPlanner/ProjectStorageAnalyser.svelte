<script lang="ts">
    import {
        getProjectStorageStats,
        ProjectStorageStats,
        StorageStatsSettings,
    } from "../../services/data/storage";
    import { project } from "../../stores";
    let collapsed = false;
    let storageStats: ProjectStorageStats;
    let settings: StorageStatsSettings;

    const canisterTypesLabels = {
        resources: { en: "Resources" },
        fluid_soil: { en: "Fluid & Soil" },
        gases: { en: "Gases" },
    };
    const defaultSettings: StorageStatsSettings = {
        includeStorages: false,
        includeCanisters: true,
        includePlatforms: false,
        includeResources: true,
        includeOthers: true,
    };

    try {
        const storedSettings = localStorage.getItem("storageAnalyserSettings");
        if (storedSettings !== null) {
            settings = JSON.parse(storedSettings);
        } else {
            settings = defaultSettings;
        }
    } catch (e) {
        settings = defaultSettings;
        console.error(
            "Could not retrieve the storage analyser settings from local storage"
        );
        console.error(e);
    }

    $: {
        (() => {
            if (!$project) {
                return;
            }
            storageStats = getProjectStorageStats($project, settings);
            try {
                localStorage.setItem(
                    "storageAnalyserSettings",
                    JSON.stringify(settings)
                );
            } catch (e) {
                console.error(
                    "Could not store the storage analyser settings in local storage"
                );
                console.error(e);
            }
        })();
    }
</script>

<main>
    <div class="content-section">
        <h3 class="content-header" on:click={() => (collapsed = !collapsed)}>
            Storage analyser
        </h3>

        <div class="container">
            <div>
                <span class="important-word">Include in count</span>

                <div class="form-check form-check-inline">
                    <input
                        bind:checked={settings.includeCanisters}
                        class="form-check-input"
                        type="checkbox"
                        id="includeCanistersCheck"
                    />
                    <label class="form-check-label" for="includeCanistersCheck"
                        >canisters</label
                    >
                </div>

                <div class="form-check form-check-inline">
                    <input
                        bind:checked={settings.includeOthers}
                        class="form-check-input"
                        type="checkbox"
                        id="includeOthersCheck"
                    />
                    <label class="form-check-label" for="includeOthersCheck"
                        >other objects</label
                    >
                </div>

                <div class="form-check form-check-inline">
                    <input
                        bind:checked={settings.includeStorages}
                        class="form-check-input"
                        type="checkbox"
                        id="includeStoragesCheck"
                    />
                    <label class="form-check-label" for="includeStoragesCheck"
                        >storages</label
                    >
                </div>

                <div class="form-check form-check-inline">
                    <input
                        bind:checked={settings.includePlatforms}
                        class="form-check-input"
                        type="checkbox"
                        id="includePlatformsCheck"
                    />
                    <label class="form-check-label" for="includePlatformsCheck"
                        >platforms</label
                    >
                </div>

                <div class="form-check form-check-inline">
                    <input
                        bind:checked={settings.includeResources}
                        class="form-check-input"
                        type="checkbox"
                        id="includeResourcesCheck"
                    />
                    <label class="form-check-label" for="includeResourcesCheck"
                        >resources</label
                    >
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <h4 class="content-subheader">Storage requirements</h4>
                    <div>
                        <span class="important-word">Total objects count</span>
                        {storageStats.objectTotalCount}
                    </div>

                    <div>
                        {#each ["small", "medium", "large", "extra large"] as tier, index}
                            <div>
                                <span class="important-word">Tier {tier}</span>
                                {storageStats.objectsCountByTier[index].total}
                                <ul>
                                    {#each storageStats.objectsCountByTier[index].objects as object}
                                        <li>{object.quantity} x {object.id}</li>
                                    {/each}
                                </ul>
                            </div>
                        {/each}
                    </div>
                </div>

                <div class="col-md-6">
                    <div>
                        <h4 class="content-subheader">Storages capacity</h4>
                        {#each ["small", "medium", "large", "extra large"] as tier, index}
                            <div>
                                <span class="important-word">{tier} tier slots</span
                                >
                                {storageStats.storagesCapacityByTier[index]}
                            </div>
                        {/each}
                    </div>

                    <div>
                        <h4 class="content-subheader">Storages objects</h4>
                        <ul>
                            {#each storageStats.storageObjects as object}
                                <li>{object.quantity} x {object.id}</li>
                            {/each}
                        </ul>
                    </div>
                </div>
            </div>

            <div class="row">
                <h4 class="content-subheader">Canisters capacity</h4>
                {#each Object.keys(storageStats.canistersCapacitybyType) as type}
                    <div class="col-md-4">
                        <h5 class="content-subheader">
                            {canisterTypesLabels[type].en}
                        </h5>

                        <span class="important-word">Total capacity</span>
                        {Object.keys(
                            storageStats.canistersCapacitybyType[type]
                        ).reduce(
                            (total, canister) =>
                                total +
                                storageStats.canistersCapacitybyType[type][canister]
                                    .totalCapacity,
                            0
                        )}
                        {#each Object.keys(storageStats.canistersCapacitybyType[type]) as canister}
                            <div>
                                <span class="important-word"
                                    >{storageStats.canistersCapacitybyType[type][
                                        canister
                                    ].id}</span
                                >
                                {storageStats.canistersCapacitybyType[type][
                                    canister
                                ].quantity} x {storageStats.canistersCapacitybyType[
                                    type
                                ][canister].individualCapacity}
                                =
                                {storageStats.canistersCapacitybyType[type][
                                    canister
                                ].totalCapacity}
                            </div>
                        {/each}
                    </div>
                {/each}
            </div>
        </div>
    </div>
</main>

<style>
    ul {
        list-style-type: none;
    }
</style>
