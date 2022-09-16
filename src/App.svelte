<script lang="ts">
import About from './components/About.svelte';
import ResourceDepGraph from './components/ResourceDepGraph.svelte';
import Footer from './components/Footer.svelte';

const pageList = {
    'project': ResourceDepGraph,
    'about': About
}

let page='project';
</script>

<style>
    span {
        text-transform: uppercase;
        text-shadow: 2px 2px black;
        font-weight: bold;
        font-size: large;
        margin-right: 10px;
    }

    h1 {
        color: white;
        text-shadow: 2px 2px black;
        font-size: xx-large;
    }
</style>

<main>
    <h1 class="main-title">ASSISTEER</h1>
    <p align="left">
        <span on:click={() => {page='project'}}>Project planner</span>
        <span on:click={() => {page='about'}}>About</span>
    </p>
    <div class="top-container">
        {#if page === 'project'}
            <ResourceDepGraph/>
        {:else}
            <About/>
        {/if}
    </div>
</main>

<Footer/>
