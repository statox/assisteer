<script lang="ts">
    import type {Resource} from '../types/stores.types';
    import { getResourcesDependencies } from '../services/getResourceDependencies';
    export let data: Resource;
</script>

<tr>
    <td>{data.name}</td>
    <td>{data.type}</td>
    <td>{data.planets || ''}</td>
    <td>{data.needs || ''}</td>
    <td>
        <button on:click ={() => console.log(getResourcesDependencies(data))}>
            Get Dependencies
        </button>
    </td>
</tr>
