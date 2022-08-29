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
        <h3>To be produced</h3>
        <table>
        <tbody>
                <tr>
                    <td>Name</td>
                    <td>{stats?.product}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div>
        <h3>Material needed</h3>
        <table>
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
        </table>
    </div>
</main>

