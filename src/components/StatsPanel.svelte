<script lang="ts">
import type {Stats} from '../types/stats.types';
import { project } from '../stores';

export let stats: Stats = null;
</script>

<style>
    table {
        width: 100%;
    }
    td {
        text-align: center;
    }
    table, td {
        border: 1px solid;
        border-collapse: collapse;
    }
</style>

<main>
    <h2>Production stats</h2>
    <div>
        <table>
            <tr><td colspan="2"><h4>Material required</h4></td></tr>
            {#if $project.length === 0}
            <tr>
                <td colspan=3>No object added yet...</td>
            </tr>
            {:else}
            {#if Object.keys(stats?.resources || {}).includes('special_resource') }
                <tr>
                    <td><span>Special resources</span></td>
                    <td>
                        {#each stats?.resources['special_resource'] as item }
                            <div>{item.resource} x{item.count}</div>
                        {/each}
                    </td>
                </tr>
            {/if}
            {#if Object.keys(stats?.resources || {}).includes('natural') }
                <tr>
                    <td><span>Natural resources</span></td>
                    <td>
                        {#each stats?.resources['natural'] as item }
                            <div>{item.resource} x{item.count}</div>
                        {/each}
                    </td>
                </tr>
            {/if}
            {#if Object.keys(stats?.resources || {}).includes('atmospheric') }
                <tr>
                    <td><span>Atmospheric resources</span></td>
                    <td>
                        {#each stats?.resources['atmospheric'] as item }
                            <div>{item.resource} x{item.count}</div>
                        {/each}
                    </td>
                </tr>
            {/if}
            {#each Object.keys(stats?.resources || {}).filter(type => !['special_resource', 'natural', 'atmospheric'].includes(type)) as type }
            <tr>
                    <td><span>{type}</span></td>
                    <td>
                    {#each stats?.resources[type] as item }
                        <div>{item.resource} x{item.count}</div>
                    {/each}
            </td>
            </tr>
            {/each}
            {/if}
        </table>
    </div>
</main>
