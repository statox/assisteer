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

    const items = allObjectNames
        .map((name): SelectItem => {
            const o = getObject(name);
            return {
                value: o,
                id: name,
                label: o.labels.en,
                group: o.category,
            };
        })
        // Prevent selecting objects without recipes (Should probably use recipes directly instead of allObjectNames
        .filter(
            (item) =>
                ![
                    "atmospheric",
                    "natural",
                    "others",
                    "special_resource",
                ].includes(item.group)
        );
    const groupBy = (item: SelectItem) => item.group;

    const handleSelect = (event: any) => {
        dispatch("selectObject", { object: event.detail });
    };
    const handleAdd = () => {
        dispatch("addObject", {});
    };
</script>

<main class="container">
    <div class="row">
        <div class="col-sm-9">
            <Select
                placeholder="Project item selection"
                {items}
                {groupBy}
                on:select={handleSelect}
            />
        </div>
        <div class="col-sm-3">
            <button on:click={handleAdd}>Add to project</button>
        </div>
    </div>
</main>
