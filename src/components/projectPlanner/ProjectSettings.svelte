<script lang="ts">
    import { settings } from "../../stores";
    let collapsed = false;
</script>

<main>
    <div class="content-section">
        <h3 class="content-header" on:click={() => (collapsed = !collapsed)}>
            Settings
        </h3>
        <div class="container" class:hidden={collapsed === true}>
            <div>
                <span class="important-word">Type of picture to show&nbsp</span>
                <div class="form-check form-check-inline">
                    <input
                        checked={$settings.pictureType === "image"}
                        on:click={() => $settings.pictureType = "image"}
                        class="form-check-input"
                        type="radio"
                        id="pictureImage"
                        value="image"
                    />
                    <label class="form-check-label" for="pictureImage">image</label>
                </div>
                <div class="form-check form-check-inline">
                    <input
                        checked={$settings.pictureType === "icon"}
                        on:click={() => $settings.pictureType = "icon"}
                        class="form-check-input"
                        type="radio"
                        id="pictureIcon"
                        value="icon"
                    />
                    <label class="form-check-label" for="pictureIcon">icon</label>
                </div>
            </div>
            <div>
                <span class="important-word">Split tree by object</span>
                <div class="form-check form-check-inline">
                    <input
                        checked={$settings.treeSplitByObject}
                        on:click={() => $settings.treeSplitByObject = true}
                        class="form-check-input"
                        type="radio"
                        id="treeSplit"
                    />
                    <label class="form-check-label" for="treeSplit">yes</label>
                </div>
                <div class="form-check form-check-inline">
                    <input
                        checked={!$settings.treeSplitByObject}
                        on:click={() => $settings.treeSplitByObject = false}
                        class="form-check-input"
                        type="radio"
                        id="treeNoSplit"
                    />
                    <label class="form-check-label" for="treeNoSplit">no</label>
                </div>
            </div>
        </div>
    </div>
</main>
