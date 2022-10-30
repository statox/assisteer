<script lang="ts">
    import { BaseObject, getObject } from '../../services/data/objects';

    import ObjectName from './ObjectName.svelte';

    export let currencyId: 'soil' | 'scrap';
    export let object: BaseObject;
    export let currencyQty: number;
    export let objectQty: number;
    export let surplus: number = undefined;
</script>

<div class="d-inline-flex">
    <ObjectName object={getObject(currencyId)} hideName={true} quantity={currencyQty} pictureType={'icon'} />
    :
    <ObjectName {object} hideName={true} quantity={objectQty} pictureType={'icon'} />

    {#if surplus}
        <span class="important-word">(+{surplus})</span>
    {/if}
</div>
