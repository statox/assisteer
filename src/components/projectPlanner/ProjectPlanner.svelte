<script lang="ts">
    import { activePages, objectSelectionModalShow, projectListModalShow } from '../../stores';
    import ProjectsListModal from './projectsLists/ProjectsListModal.svelte';
    import ProjectResourcesList from './resourcesList/ProjectResourcesList.svelte';
    import ProjectGraph from './ProjectGraph.svelte';
    import ProjectStorageAnalyser from './ProjectStorageAnalyser.svelte';
    import ProjectSettings from './ProjectSettings.svelte';
    import ObjectSelectionModal from './objectSelection/ObjectSelectionModal.svelte';
    import ProjectTrading from './ProjectTrading.svelte';
    import ProjectPowerAnalyser from './powerAnalyser/ProjectPowerAnalyser.svelte';
    import UserGuide from './UserGuide.svelte';

    const sections = {
        graph: {
            labels: {
                en: 'Production Graph'
            },
            iconClass: 'bi bi-diagram-2',
            component: ProjectGraph
        },
        resources: {
            labels: {
                en: 'Resources'
            },
            iconClass: 'bi bi-list-stars',
            component: ProjectResourcesList
        },
        power: {
            labels: {
                en: 'Power'
            },
            iconClass: 'bi bi-lightning-charge',
            component: ProjectPowerAnalyser
        },
        trading: {
            labels: {
                en: 'Trading'
            },
            iconClass: 'bi bi-recycle',
            component: ProjectTrading
        },
        storage: {
            labels: {
                en: 'Storage'
            },
            iconClass: 'bi bi-archive',
            component: ProjectStorageAnalyser
        },
        guide: {
            labels: {
                en: 'User Guide'
            },
            iconClass: 'bi bi-info-square',
            component: UserGuide
        },
        settings: {
            labels: {
                en: 'Settings'
            },
            iconClass: 'bi bi-sliders',
            component: ProjectSettings
        }
    };
</script>

<main>
    <div class="nav-menu d-flex flex-row">
        <div class="d-flex flex-column align-items-start flex-md-row">
            <div class="mx-1">
                <button
                    class="nav-item"
                    on:click={() => {
                        $objectSelectionModalShow = true;
                    }}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Object selection"
                >
                    <span class="bi bi-card-list" />
                </button>
            </div>
            <div class="mx-1">
                <button
                    class="nav-item"
                    on:click={() => {
                        $projectListModalShow = true;
                    }}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Projects list"
                >
                    <span class="bi bi-list-ul" />
                </button>
            </div>
            {#each ['graph', 'resources', 'trading', 'power', 'storage'] as section}
                <div class="mx-1">
                    <button
                        class="nav-item"
                        class:selected={$activePages.planner === section}
                        on:click={() => ($activePages.planner = section)}
                    >
                        <span class={sections[section].iconClass} />
                        {sections[section].labels.en}
                    </button>
                </div>
            {/each}
        </div>

        <div class="d-flex flex-column align-items-start flex-md-row ms-auto">
            {#each ['guide', 'settings'] as section}
                <div class="mx-1">
                    <button
                        class="nav-item"
                        class:selected={$activePages.planner === section}
                        on:click={() => ($activePages.planner = section)}
                    >
                        <span class={sections[section].iconClass} />
                        {sections[section].labels.en}
                    </button>
                </div>
            {/each}
        </div>
    </div>

    <ObjectSelectionModal />
    <ProjectsListModal />

    <svelte:component this={sections[$activePages.planner].component} />
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
