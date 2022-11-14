<script lang="ts">
    import { activePages } from '../../stores';
    import ObjectSelectionModal from '../projectPlanner/objectSelection/ObjectSelectionModal.svelte';
    import AtmosphericCondenser from './AtmosphericCondenser.svelte';
    import Flora from './Flora.svelte';
    import Galastropods from './Galastropods.svelte';
    import Planets from './Planets.svelte';
    import Research from './Research.svelte';

    const sections = {
        atmo: {
            labels: {
                en: 'Atmospheric Condenser'
            },
            component: AtmosphericCondenser
        },
        research: {
            labels: {
                en: 'Research'
            },
            component: Research
        },
        planets: {
            labels: {
                en: 'Planets'
            },
            component: Planets
        },
        flora: {
            labels: {
                en: 'Flora'
            },
            component: Flora
        },
        galastropods: {
            labels: {
                en: 'Galastropods'
            },
            component: Galastropods
        }
    };
</script>

<main>
    <div class="nav-menu d-flex flex-row flex-wrap justify-content-start">
        {#each ['research', 'planets', 'flora', 'galastropods', 'atmo'] as section}
            <div class="mx-1">
                <button
                    class="nav-item"
                    class:selected={$activePages.astropedia === section}
                    on:click={() => ($activePages.astropedia = section)}
                    >{sections[section].labels.en}
                </button>
            </div>
        {/each}
    </div>

    <ObjectSelectionModal />

    <svelte:component this={sections[$activePages.astropedia].component} />
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
