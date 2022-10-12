<script lang="ts">
    import Research from "./Research.svelte";

    let activeSection = 'research';
    const sectionsNames = {
        research: "Research",
    };
</script>

<main>
    <div class="nav-menu d-flex flex-row flex-wrap justify-content-evenly">
        {#each ["research"] as section}
            <div class="mx-1" class:me-sm-auto={section === "research"}>
                <button
                    class="nav-item"
                    class:selected={activeSection === section}
                    on:click={() => (activeSection = section)}
                    >{sectionsNames[section]}
                </button>
            </div>
        {/each}
    </div>

    {#if activeSection === "research"}
        <Research />
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
