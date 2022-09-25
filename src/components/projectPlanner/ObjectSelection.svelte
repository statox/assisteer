<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Select from "svelte-select";
    import {
        BaseObject,
        getAllObjectsNames,
        getObject,
    } from "../../services/data/objects";

    const dispatch = createEventDispatcher();
    const allObjectNames = getAllObjectsNames();

    interface SelectItem {
        id: string;
        value: BaseObject;
        label: string;
        group: string;
    }

    const items = allObjectNames.map((name): SelectItem => {
        const o = getObject(name);
        return {
            value: o,
            id: name,
            label: o.labels.en,
            group: o.category,
        };
    });
    const groupBy = (item: SelectItem) => item.group;

    const handleSelect = (event: any) => {
        dispatch("selectObject", { object: event.detail });
    };
    const handleAdd = () => {
        dispatch("addObject", {});
    };
</script>

<main>
    <div>
        <Select
            placeholder="Project item selection"
            {items}
            {groupBy}
            on:select={handleSelect}
        />
        <button on:click={handleAdd}>Add to project</button>
    </div>
</main>
