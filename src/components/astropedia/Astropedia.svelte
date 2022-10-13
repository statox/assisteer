<script lang="ts">
    import { activePages } from "../../stores";
    import Planets from "./Planets.svelte";
    import Research from "./Research.svelte";

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
                    class:selected={$activePages.astropedia === section}
                    on:click={() => ($activePages.astropedia = section)}
                    >{sectionsNames[section]}
                </button>
            </div>
        {/each}
    </div>

    {#if $activePages.astropedia === "research"}
        <Research />
    {/if}
    {#if $activePages.astropedia === "planets"}
        <Planets />
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
