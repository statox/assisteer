<script lang="ts">
    import { getAllPlanets } from '../../../services/data/planets';
    import { formatedDurationFromSeconds } from '../../../services/utils';
    import { selectedPowerPlanet } from '../../../stores/selectedPowerPlanet';
    import ItemName from '../../utils/ItemName.svelte';

    const planets = getAllPlanets();
</script>

<div class="table-responsive">
    <table class="table table-sm">
        <thead>
            <tr>
                <th />
                <th>Solar</th>
                <th>Wind</th>
                <th>Wind activity</th>
                <th>Daylight cycle</th>
            </tr>
        </thead>
        <tbody>
            {#each planets as planet}
                <tr
                    class:selected={planet.id === $selectedPowerPlanet.id}
                    on:click={() => ($selectedPowerPlanet = planet)}
                >
                    <th><ItemName item={planet} pictureType={'icon'} pictureSize="large" largerText={true} /></th>
                    <td>{planet.power.sun}</td>
                    <td>{planet.power.wind}</td>
                    <td>{Math.round(planet.power.wikiWindCoefficient * 100)}%</td>
                    <td>{formatedDurationFromSeconds(planet.power.dayNightCycleSeconds)}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    .selected {
        background: #d6edff;
    }
</style>
