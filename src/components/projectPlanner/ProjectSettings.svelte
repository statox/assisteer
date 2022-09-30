<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let pictureType: "icon" | "image" = "image";
    let collapsed = false;

    const changeSetting = (value: "icon" | "image") => {
        pictureType = value;
        dispatch("changeSetting", pictureType);
    };
</script>

<main>
    <h3 class="content-header" on:click={() => (collapsed = !collapsed)}>
        Settings
    </h3>
    <div class="container" class:hidden={collapsed === true}>
        <span class="important-word">Type of picture to show&nbsp</span>
        <div class="form-check form-check-inline">
            <input
                checked={pictureType === "image"}
                on:click={() => changeSetting("image")}
                class="form-check-input"
                type="radio"
                id="pictureImage"
                value="image"
            />
            <label class="form-check-label" for="pictureImage">image</label>
        </div>
        <div class="form-check form-check-inline">
            <input
                checked={pictureType === "icon"}
                on:click={() => changeSetting("icon")}
                class="form-check-input"
                type="radio"
                id="pictureIcon"
                value="icon"
            />
            <label class="form-check-label" for="pictureIcon">icon</label>
        </div>
    </div>
</main>
