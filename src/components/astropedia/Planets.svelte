<script lang="ts">
    import { getAllPlanets } from "../../services/data/planets";

    const planets = getAllPlanets();
</script>

<main>
    <div class="content-section">
        <h3 class="content-header">Planets</h3>
        <div class="container">
            <div class="warning">
                Warning: This page contains spoilers about the game.
            </div>
            <div>
                See the <a
                    target="none"
                    href="https://astroneer.fandom.com/wiki/Planets"
                    >wiki page about planets</a
                > for more details about the planet types.
            </div>
            {#each planets as planet}
                <div class="content-section">
                    <h4 class="content-subheader">
                        <span>
                            <img
                                class="img-fluid text-sized-image"
                                src={planet.url.icon}
                                alt={planet.labels.en}
                            />
                            &nbsp;{planet.labels.en}
                        </span>
                    </h4>

                    <div>
                        <img
                            class="img-fluid planet-img"
                            src={planet.url.image}
                            alt={planet.id}
                        />
                    </div>

                    <div>
                        <h5 class="content-subheader">Info</h5>
                        <span class="important-word">Type</span>
                        {planet.type}
                        <br />
                        <span class="important-word">Difficulty</span>
                        {planet.difficulty}
                        <br />
                        <span class="important-word">Wiki</span>
                        <a target="none" href={planet.url.wiki}>Link</a>
                    </div>

                    {#if planet.resources}
                        <div>
                            <h5 class="content-subheader">Notable Resources</h5>
                            <span class="important-word">Primary</span>
                            {planet.resources.primary.id} - {planet.resources
                                .primary.description}
                            <br />
                            <span class="important-word">Secondary</span>
                            {planet.resources.secondary.id} - {planet.resources
                                .secondary.description}
                        </div>
                    {/if}

                    {#if Object.keys(planet.gases).length}
                    <div>
                        <h5 class="content-subheader">Gases</h5>
                        {#each Object.keys(planet.gases) as gas}
                            <span class="important-word">{gas}</span>
                            {planet.gases[gas]} ppm
                            <br />
                        {/each}
                    </div>
                    {/if}

                    <div>
                        <h5 class="content-subheader">Power</h5>
                        <span class="important-word">Day/Night cycle</span>
                        {planet.power.dayNightCycleSeconds} s
                        <br />
                        <span class="important-word">Wind</span>
                        {planet.power.wind}
                        <br />
                        <span class="important-word">Sun</span>
                        {planet.power.sun}
                    </div>

                    <div>
                        <h5 class="content-subheader">Gateway network</h5>
                        <span class="important-word">Power by gateway</span>
                        {planet.gatewayNetwork.gatewayPower} s
                        <br />
                        <span class="important-word">Core material</span>
                        {planet.gatewayNetwork.coreMaterial}
                    </div>

                </div>
            {/each}
        </div>
    </div>
</main>

<style>
    .text-sized-image {
        width: 2em;
    }
    .planet-img {
        max-width: 15vw;
    }
    .warning {
        background: var(--pale-red);
        padding: 10px;
        border: 2px solid var(--red);
        margin: 10px;
        color: var(--red);
        border-radius: 5px;
    }
</style>
