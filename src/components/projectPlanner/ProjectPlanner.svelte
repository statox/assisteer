<script lang="ts">
    import { activeSection } from "../../stores";
    import ProjectResourcesList from "./resourcesList/ProjectResourcesList.svelte";
    import ProjectGraph from "./ProjectGraph.svelte";
    import ProjectPowerAnalyser from "./ProjectPowerAnalyser.svelte";
    import ProjectStorageAnalyser from "./ProjectStorageAnalyser.svelte";
    import ProjectSettings from "./ProjectSettings.svelte";
    import ProjectInventory from "./inventory/ProjectInventory.svelte";

    const sectionsNames = {
        inventory: "Inventory",
        resources: "Resources",
        power: "Power",
        storage: "Storage",
        settings: "Settings",
    };
</script>

<main>
    <div class="nav-menu d-flex flex-row flex-wrap justify-content-evenly">
        {#each ["inventory", "resources", "power", "storage", "settings"] as section}
            <div class="mx-1" class:ms-sm-auto={section === "settings"}>
                <button
                    class="nav-item"
                    class:selected={$activeSection === section}
                    on:click={() => ($activeSection = section)}
                    >{sectionsNames[section]}
                </button>
            </div>
        {/each}
    </div>

    {#if $activeSection === "inventory"}
        <ProjectInventory />
    {/if}
    {#if $activeSection === "resources"}
        <ProjectResourcesList />
        <ProjectGraph />
    {/if}
    {#if $activeSection === "storage"}
        <ProjectStorageAnalyser />
    {/if}
    {#if $activeSection === "settings"}
        <ProjectSettings />
    {/if}
    {#if $activeSection === "power"}
        <ProjectPowerAnalyser />
    {/if}
</main>

<style>
    .nav-menu {
        text-align: center;

        padding: 10px;
        margin: 10px;
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
