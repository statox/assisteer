<script lang="ts">
    import Planets from "./Planets.svelte";

    import Research from "./Research.svelte";

    let activeSection = 'research';
    const sectionsNames = {
        research: "Research",
        planets: "Planets"
    };
</script>

<main>
    <div class="nav-menu d-flex flex-row flex-wrap justify-content-evenly">
        {#each ["research", "planets"] as section, i}
            <div class="mx-1" class:me-sm-auto={section === "planets"}>
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
    {#if activeSection === "planets"}
        <Planets />
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
