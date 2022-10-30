<script lang="ts">
    import { getObject } from '../../services/data/objects';

    import { getAllPlanets } from '../../services/data/planets';
    import ObjectName from '../utils/ObjectName.svelte';
    import ItemName from '../utils/ItemName.svelte';
    import { getGalastropod } from '../../services/data/galastropods';

    const planets = getAllPlanets();
</script>

<main>
    <div class="content-section">
        <h3 class="content-header">Planets</h3>
        <div class="container">
            <div class="warning">Warning: This page contains spoilers about the game mechanisms.</div>
            <div class="info">
                See the <a target="none" href="https://astroneer.fandom.com/wiki/Planets">wiki page about planets</a> for
                more details about the planet types.
            </div>
            <div class="d-flex flex-wrap row">
                {#each planets as planet}
                    <div class="col-sm-12 col-md-6 col-lg-3">
                        <h4 class="content-subheader">
                            <ItemName
                                item={planet}
                                pictureType={'icon'}
                                uppercase={true}
                                largerText={true}
                                pictureSize="large"
                            />
                        </h4>

                        <div class="text-center">
                            <img class="img-fluid planet-img" src={planet.url.image} alt={planet.id} />
                        </div>

                        <div class="info-section">
                            <h5 class="content-subheader">Info</h5>
                            <div class="d-flex justify-content-between">
                                <span class="important-word">Type</span>
                                <span>{planet.type}</span>
                            </div>
                            <div class="d-flex justify-content-between">
                                <span class="important-word">Difficulty</span>
                                {planet.difficulty}
                            </div>
                            <div class="d-flex justify-content-between">
                                <span class="important-word">Snail</span>
                                <ItemName item={getGalastropod(planet.galastropod)} pictureType={'icon'} />
                            </div>
                            <div class="d-flex justify-content-between">
                                <span class="important-word">Wiki</span>
                                <a target="none" href={planet.url.wiki}>Link</a>
                            </div>
                        </div>

                        <div class="info-section">
                            <h5 class="content-subheader">Power</h5>
                            <div class="d-flex justify-content-between">
                                <span class="important-word">Day/Night cycle</span>
                                {planet.power.dayNightCycleSeconds} s
                            </div>
                            <div class="d-flex justify-content-between">
                                <span class="important-word">Wind</span>
                                {planet.power.wind}
                            </div>
                            <div class="d-flex justify-content-between">
                                <span class="important-word">Sun</span>
                                {planet.power.sun}
                            </div>
                            <div class="d-flex justify-content-between">
                                <span class="important-word">Wind activity</span>
                                {Math.floor(planet.power.wikiWindCoefficient * 100)}%
                            </div>
                        </div>

                        <div class="info-section">
                            <h5 class="content-subheader">Gateway network</h5>
                            <div class="d-flex justify-content-between">
                                <span class="important-word">Power by gateway</span>
                                {planet.gatewayNetwork.gatewayPower} U/s / {30 * planet.gatewayNetwork.gatewayPower} U
                            </div>
                            <div class="d-flex justify-content-between">
                                <span class="important-word">Core material</span>
                                <ObjectName
                                    object={getObject(planet.gatewayNetwork.coreMaterial)}
                                    pictureType={'icon'}
                                />
                            </div>
                        </div>

                        <div class="info-section">
                            <h5 class="content-subheader">Notable Resources</h5>
                            {#if planet.resources}
                                <div class="d-flex justify-content-between">
                                    <span class="important-word">Primary</span>
                                    <ObjectName object={getObject(planet.resources.primary.id)} pictureType={'icon'} />
                                </div>
                                <div class="d-flex justify-content-left">
                                    <span>
                                        {planet.resources.primary.description}
                                    </span>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <span class="important-word">Secondary</span>
                                    <ObjectName
                                        object={getObject(planet.resources.secondary.id)}
                                        pictureType={'icon'}
                                    />
                                </div>
                                <div class="d-flex justify-content-left">
                                    <span>
                                        {planet.resources.secondary.description}
                                    </span>
                                </div>
                            {:else}
                                <span>No notable resources.</span>
                            {/if}
                        </div>

                        {#if Object.keys(planet.gases).length}
                            <div class="info-section">
                                <h5 class="content-subheader">Gases</h5>
                                {#each Object.keys(planet.gases).sort((a, b) => planet.gases[b] - planet.gases[a]) as gas}
                                    <div class="d-flex justify-content-between">
                                        <ObjectName object={getObject(gas)} pictureType={'icon'} />
                                        {planet.gases[gas]} ppm
                                    </div>
                                {/each}
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    </div>
</main>

<style>
    .planet-img {
        max-width: 50%;
        /* max-height shouldn't be needed for the wiki serves Sylva image slightly bigger
        than the other ones. This is the work around I've found for now */
        max-height: 189px;
        margin-bottom: 2vh;
        border-radius: 5px;
    }
    .info-section {
        margin-bottom: 3em;
    }
</style>
