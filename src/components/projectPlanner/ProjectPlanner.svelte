<script lang="ts">
    import ProjectResourcesList from "./resourcesList/ProjectResourcesList.svelte";
    import ProjectGraph from "./ProjectGraph.svelte";
    import ProjectPowerAnalyser from "./ProjectPowerAnalyser.svelte";
    import ProjectSettings from "./ProjectSettings.svelte";
    import ProjectInventory from "./inventory/ProjectInventory.svelte";

    const sectionsNames = {
        "inventory": "Inventory",
        "resources": "Resources",
        "power": "Power",
        "settings": "Settings"
    }
    let activeSection = "inventory";
</script>

<main>
        <div class="content-section row nav-menu">
            {#each ["inventory", "resources", "power", "settings"] as section}
                <span
                    class="col nav-item h4"
                    class:selected={activeSection === section}
                    on:click={() => (activeSection = section)}>{sectionsNames[section]}</span
                >
            {/each}
        </div>

        {#if activeSection === "inventory"}
            <ProjectInventory />
        {/if}
        {#if activeSection === "resources"}
            <ProjectResourcesList />
            <ProjectGraph />
        {/if}
        {#if activeSection === "settings"}
            <ProjectSettings />
        {/if}
        {#if activeSection === "power"}
            <ProjectPowerAnalyser />
        {/if}
</main>

<style>
    .nav-menu {
        text-align: center;
        background: var(--blue);
        padding: 5px;
    }
    .nav-item {
        color: var(--white);
        font-family: astroneer-bold;
    }
    .nav-item.selected {
        color: var(--yellow);
    }
</style>
