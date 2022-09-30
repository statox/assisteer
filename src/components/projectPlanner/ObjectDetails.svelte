<script lang="ts">
    import type { BaseObject } from "../../services/data/objects";
    import { getObjectPowerStats, ObjectPowerStats } from "../../services/data/power";
    import RecipeDetails from "./RecipeDetails.svelte";

    export let object: BaseObject;
    let objectAdditionalData: ObjectAdditionalData;


    type ObjectAdditionalData = {
        power: ObjectPowerStats;
    }
    const getObjectAdditionalData = (objectName: string) => {
        return {
            power: getObjectPowerStats(objectName),
        }
    }

    // Reactive declaration: The code runs on props change
    $: {
        (() => {
            if (!object) {
                return;
            }
            objectAdditionalData = getObjectAdditionalData(object.id);
        })();
    }
</script>

<main class="container">
    {#if object}
        <div class="row">
            <div class="col-sm-6">
                <h4 class="content-subheader">
                    <span class="display-inline-flex">
                        <img
                            class="img-fluid small-image"
                            src={object.url.icon}
                            alt={object.labels.en}
                        />
                        &nbsp;{object.labels.en}
                    </span>
                </h4>
                <div class="row">
                    <div class="col-sm-6">
                        <img
                            class="col img-fluid"
                            src={object.url.image}
                            alt={object.labels.en}
                        />
                    </div>
                    <div class="col">
                        <div> 
                            <span class="important-word">Wiki</span>
                            <a class="wiki-link" href="{object.url.wiki}" target="_blank">Link</a>
                        </div>
                        <div>
                            <span class="important-word">Unlock cost&nbsp;</span
                            >&nbsp;<b>{object.bytesRequired}</b> bytes
                        </div>
                        {#if objectAdditionalData.power}
                            {#if objectAdditionalData.power.type === "producer"}
                                <div>
                                    <span class="important-word">
                                        Power production&nbsp;
                                    </span>
                                    <b>{objectAdditionalData.power.output}</b>&nbsp;U/s
                                </div>
                            {/if}
                            {#if objectAdditionalData.power.type === "storage"}
                                <div>
                                    <span class="important-word">
                                        Power production&nbsp;
                                    </span>
                                    <b>{objectAdditionalData.power.output}</b>&nbsp;U/s
                                </div>
                                <div>
                                    <span class="important-word">
                                        Power capacity&nbsp;
                                    </span>
                                    <b>{objectAdditionalData.power.capacity}</b>&nbsp;U
                                </div>
                            {/if}
                            {#if objectAdditionalData.power.type === "consumer"}
                                <div>
                                    <span class="important-word">
                                        Power drain&nbsp;
                                    </span>
                                    <b>{objectAdditionalData.power.input}</b>&nbsp;U/s
                                </div>
                            {/if}
                        {/if}
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <RecipeDetails {object} />
            </div>
        </div>
    {/if}
</main>

<style>
    h4 {
        margin-top: 0.3em;
    }
    img {
        margin-left: auto;
        margin-right: auto;
        margin: auto;
        display: block;
    }
    .small-image {
        height: 1em;
    }
    /* Not sure why this works but allows the icon to be aligned with the text */
    .display-inline-flex {
        display: inline-flex;
    }
    .wiki-link {
        color: black;
        text-decoration: underline;
    }
</style>
