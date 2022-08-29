<script lang="ts">
import type {Stats} from '../types/stats.types';

export let stats: Stats = null;
</script>

<main>
    <h2>Production stats</h2>
    <div>
        <h3>To be produced</h3>
        <table>
        </table>
    </div>
    <div>{JSON.stringify(stats)}</div>
</main>

