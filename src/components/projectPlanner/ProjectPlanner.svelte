<script lang="ts">
    import { activePages, modalShown } from '../../stores';
    import ProjectResourcesList from './resourcesList/ProjectResourcesList.svelte';
    import ProjectGraph from './ProjectGraph.svelte';
    import ProjectStorageAnalyser from './ProjectStorageAnalyser.svelte';
    import ProjectSettings from './ProjectSettings.svelte';
    import ObjectSelectionModal from './objectSelection/ObjectSelectionModal.svelte';
    import ProjectTrading from './ProjectTrading.svelte';
    import ProjectPowerAnalyser from './powerAnalyser/ProjectPowerAnalyser.svelte';
    import UserGuide from './UserGuide.svelte';
    import ProjectObjectsList from './inventory/ProjectObjectsList.svelte';

    const sectionsNames = {
        inventory: 'Inventory',
        guide: 'User Guide',
        resources: 'Resources',
        power: 'Power',
        storage: 'Storage',
        settings: 'Settings',
        trading: 'Trading',
        graph: 'Production Graph'
    };
</script>

<main>
    <div class="nav-menu d-flex flex-row flex-wrap justify-content-evenly">
        <button
            class="nav-item"
            on:click={() => {
                $modalShown = true;
            }}
            data-toggle="tooltip"
            data-placement="top"
            title="Object selection"
        >
            <span class="bi bi-card-list" />
        </button>

        {#each ['inventory', 'graph', 'resources', 'trading', 'power', 'storage', 'guide', 'settings'] as section}
            <div class="mx-1" class:ms-sm-auto={section === 'guide'}>
                <button
                    class="nav-item"
                    class:selected={$activePages.planner === section}
                    on:click={() => ($activePages.planner = section)}
                    >{sectionsNames[section]}
                </button>
            </div>
        {/each}
    </div>

    <ObjectSelectionModal />

    {#if $activePages.planner === 'guide'}
        <UserGuide />
    {/if}
    {#if $activePages.planner === 'inventory'}
        <ProjectObjectsList />
    {/if}
    {#if $activePages.planner === 'resources'}
        <ProjectResourcesList />
    {/if}
    {#if $activePages.planner === 'graph'}
        <ProjectGraph />
    {/if}
    {#if $activePages.planner === 'trading'}
        <ProjectTrading />
    {/if}
    {#if $activePages.planner === 'storage'}
        <ProjectStorageAnalyser />
    {/if}
    {#if $activePages.planner === 'settings'}
        <ProjectSettings />
    {/if}
    {#if $activePages.planner === 'power'}
        <ProjectPowerAnalyser />
    {/if}
</main>

<style>
    .nav-menu {
        text-align: center;

        padding: 10px;
        margin: 10px;
        margin-top: 0;
        margin-left: 0;
    }
    .nav-item {
        color: var(--blue);
        font-family: astroneer-bold;
    }
    .nav-item.selected {
        color: var(--yellow);
        background-color: var(--blue);
    }
</style>
