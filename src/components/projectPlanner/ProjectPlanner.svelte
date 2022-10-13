<script lang="ts">
    import { activePages } from "../../stores";
    import ProjectResourcesList from "./resourcesList/ProjectResourcesList.svelte";
    import ProjectGraph from "./ProjectGraph.svelte";
    import ProjectPowerAnalyser from "./ProjectPowerAnalyser.svelte";
    import ProjectStorageAnalyser from "./ProjectStorageAnalyser.svelte";
    import ProjectSettings from "./ProjectSettings.svelte";
    import ProjectInventory from "./inventory/ProjectInventory.svelte";
    import ProjectTrading from "./ProjectTrading.svelte";

    const sectionsNames = {
        inventory: "Inventory",
        resources: "Resources",
        power: "Power",
        storage: "Storage",
        settings: "Settings",
        trading: "Trading"
    };
</script>

<main>
    <div class="nav-menu d-flex flex-row flex-wrap justify-content-evenly">
        {#each ["inventory", "resources", "trading", "power", "storage", "settings"] as section}
            <div class="mx-1" class:ms-sm-auto={section === "settings"}>
                <button
                    class="nav-item"
                    class:selected={$activePages.planner === section}
                    on:click={() => ($activePages.planner = section)}
                    >{sectionsNames[section]}
                </button>
            </div>
        {/each}
    </div>

    {#if $activePages.planner === "inventory"}
        <ProjectInventory />
    {/if}
    {#if $activePages.planner === "resources"}
        <ProjectResourcesList />
        <ProjectGraph />
    {/if}
    {#if $activePages.planner === "trading"}
        <ProjectTrading />
    {/if}
    {#if $activePages.planner === "storage"}
        <ProjectStorageAnalyser />
    {/if}
    {#if $activePages.planner === "settings"}
        <ProjectSettings />
    {/if}
    {#if $activePages.planner === "power"}
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
