<script lang="ts">
import type {Stats} from '../types/stats.types';
import { project } from '../stores';

export let stats: Stats = null;
</script>

<main>
    <h2 class="content-header">Production stats</h2>
    <div class="content-container">
        <div class="tableContainer">
            <table>
                <tbody>
                    <tr>
                        <th class="content-subheader" colspan="2">Material required</th>
                    </tr>
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
                </tbody>
            </table>
        </div>
    </div>
</main>
