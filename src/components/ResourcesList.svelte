<script lang="ts">
    import {resources} from '../stores';
    import ResourceEntryList from './ResourceEntryList.svelte';
</script>

<main>
    <h2>Resources list</h2>
    <ul>
        {#each $resources as resource}
            <ResourceEntryList data={resource}/>
        {/each}
    </ul>
</main>
