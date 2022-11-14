<script lang="ts">
    import { activePages } from '../../stores';
    import ObjectSelectionModal from '../projectPlanner/objectSelection/ObjectSelectionModal.svelte';
    import AtmosphericCondenser from './AtmosphericCondenser.svelte';
    import Flora from './Flora.svelte';
    import Galastropods from './Galastropods.svelte';
    import Planets from './Planets.svelte';
    import Research from './Research.svelte';

    const sectionsNames = {
        atmo: 'Atmospheric Condenser',
        research: 'Research',
        planets: 'Planets',
        flora: 'Flora',
        galastropods: 'Galastropods'
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
                    >{sectionsNames[section]}
                </button>
            </div>
        {/each}
    </div>

    <ObjectSelectionModal />
    {#if $activePages.astropedia === 'research'}
        <Research />
    {/if}
    {#if $activePages.astropedia === 'planets'}
        <Planets />
    {/if}
    {#if $activePages.astropedia === 'flora'}
        <Flora />
    {/if}
    {#if $activePages.astropedia === 'galastropods'}
        <Galastropods />
    {/if}
    {#if $activePages.astropedia === 'atmo'}
        <AtmosphericCondenser />
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
