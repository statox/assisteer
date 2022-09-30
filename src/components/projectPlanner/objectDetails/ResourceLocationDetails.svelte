<script lang="ts">
    import type { BaseObject } from "../../../services/data/objects";

    export let resource: BaseObject;
</script>

<main class="container">
    <h4 class="content-subheader">Location details</h4>
    <div class="row">
        {resource.labels.en}
    </div>
</main>
