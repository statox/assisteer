<script lang="ts">
    import {resources} from '../stores';
    import ResourceEntryList from './ResourceEntryList.svelte';
    import ResourceDepGraph from './ResourceDepGraph.svelte';
</script>

<main>
    <h2>Resources list</h2>
    <table>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Planets</th>
            <th>Needs</th>
            <th>Deps.</th>
        </tr>
        {#each $resources as resource}
            <ResourceEntryList data={resource}/>
        {/each}
    </table>

    {#each $resources as resource}
        <ResourceDepGraph target={resource}/>
    {/each}
</main>
