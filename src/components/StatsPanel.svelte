<script lang="ts">
import type {Stats} from '../types/stats.types';

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
            {#if !stats || Object.keys(stats).length === 0}
            <tr>
                <td colspan=3>No object added yet...</td>
            </tr>
            {:else}
                {#each Object.keys(stats?.resources || {}) as type }
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
