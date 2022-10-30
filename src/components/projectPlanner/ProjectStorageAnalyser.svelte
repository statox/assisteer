<script lang="ts">
    import { getObject } from '../../services/data/objects';
    import { getProjectStorageStats, ProjectStorageStats, StorageStatsSettings } from '../../services/data/storage';
    import { project } from '../../stores';
    import ObjectName from '../utils/ObjectName.svelte';

    let collapsed = false;
    let storageStats: ProjectStorageStats;
    let settings: StorageStatsSettings;

    const canisterTypesLabels = {
        resources: { en: 'Resources' },
        fluid_soil: { en: 'Fluid & Soil' },
        gases: { en: 'Gases' }
    };
    const defaultSettings: StorageStatsSettings = {
        includeStorages: false,
        includeCanisters: true,
        includePlatforms: false,
        includeResources: true,
        includeOthers: true
    };

    try {
        const storedSettings = localStorage.getItem('storageAnalyserSettings');
        if (storedSettings !== null) {
            settings = JSON.parse(storedSettings);
        } else {
            settings = defaultSettings;
        }
    } catch (e) {
        settings = defaultSettings;
        console.error('Could not retrieve the storage analyser settings from local storage');
        console.error(e);
    }

    $: {
        (() => {
            if (!$project) {
                return;
            }
            storageStats = getProjectStorageStats($project, settings);
            try {
                localStorage.setItem('storageAnalyserSettings', JSON.stringify(settings));
            } catch (e) {
                console.error('Could not store the storage analyser settings in local storage');
                console.error(e);
            }
        })();
    }
</script>

<main>
    <div class="content-section">
        <h3 class="content-header" on:click={() => (collapsed = !collapsed)}>Storage analyser</h3>

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
                    <label class="form-check-label" for="includeCanistersCheck">canisters</label>
                </div>

                <div class="form-check form-check-inline">
                    <input
                        bind:checked={settings.includeOthers}
                        class="form-check-input"
                        type="checkbox"
                        id="includeOthersCheck"
                    />
                    <label class="form-check-label" for="includeOthersCheck">other objects</label>
                </div>

                <div class="form-check form-check-inline">
                    <input
                        bind:checked={settings.includeStorages}
                        class="form-check-input"
                        type="checkbox"
                        id="includeStoragesCheck"
                    />
                    <label class="form-check-label" for="includeStoragesCheck">storages</label>
                </div>

                <div class="form-check form-check-inline">
                    <input
                        bind:checked={settings.includePlatforms}
                        class="form-check-input"
                        type="checkbox"
                        id="includePlatformsCheck"
                    />
                    <label class="form-check-label" for="includePlatformsCheck">platforms</label>
                </div>

                <div class="form-check form-check-inline">
                    <input
                        bind:checked={settings.includeResources}
                        class="form-check-input"
                        type="checkbox"
                        id="includeResourcesCheck"
                    />
                    <label class="form-check-label" for="includeResourcesCheck">resources</label>
                </div>
            </div>

            <div class="row">
                <div>
                    <h4 class="content-subheader">Storage requirements</h4>
                    <div class="d-flex justify-content-between flex-column flex-md-row">
                        {#each ['small', 'medium', 'large', 'extra large'] as tier, index}
                            {@const objectsInTier = storageStats.objectsCountByTier[index]}
                            <div class="flex-fill mx-1">
                                <div class="tier-header">
                                    <span class="important-word">Tier {tier}</span>
                                    &nbsp;
                                    {objectsInTier.total}
                                </div>
                                <div>
                                    <ul>
                                        {#each objectsInTier.objects as object}
                                            <li>
                                                <ObjectName
                                                    object={getObject(object.id)}
                                                    quantity={object.quantity}
                                                    pictureType="icon"
                                                />
                                            </li>
                                        {/each}
                                    </ul>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>

            <div class="row">
                <div>
                    <h4 class="content-subheader">Platforms, Storages and Silos</h4>
                    <div class="d-flex justify-content-between flex-column flex-md-row">
                        {#each ['medium', 'large', 'extra large'] as tier, index}
                            {@const objectsInTier = storageStats.storageObjectsByTier[index + 1]}
                            <div class="flex-fill mx-1">
                                <div class="tier-header">
                                    <span class="important-word">Tier {tier}</span>
                                    {objectsInTier.total}
                                </div>
                                <div>
                                    <ul>
                                        {#each objectsInTier.objects as object}
                                            <li>
                                                <ObjectName
                                                    object={getObject(object.id)}
                                                    quantity={object.quantity}
                                                    pictureType="icon"
                                                />
                                            </li>
                                        {/each}
                                    </ul>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>

            <div class="row">
                <h4 class="content-subheader">Canisters capacity</h4>
                {#each Object.keys(storageStats.canistersCapacitybyType) as type}
                    {@const typeCapacity = storageStats.canistersCapacitybyType[type]}
                    <div class="col-md-4">
                        <h5 class="tier-header important-word">
                            {canisterTypesLabels[type].en}
                        </h5>

                        <span class="important-word">Total capacity</span>
                        {Object.keys(typeCapacity).reduce(
                            (total, canister) => total + typeCapacity[canister].totalCapacity,
                            0
                        )}
                        {#each Object.keys(storageStats.canistersCapacitybyType[type]) as canister}
                            {@const canisterCapacity = storageStats.canistersCapacitybyType[type][canister]}
                            {@const object = getObject(canisterCapacity.id)}
                            <div>
                                <ObjectName {object} pictureType="icon" importantWord={true} />
                                {canisterCapacity.quantity} x {canisterCapacity.individualCapacity}
                                =
                                {canisterCapacity.totalCapacity}
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
    .tier-header {
        text-align: center;
    }
</style>
