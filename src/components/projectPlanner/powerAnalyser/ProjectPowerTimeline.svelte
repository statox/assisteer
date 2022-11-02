<script lang="ts">
    import { onMount } from 'svelte';

    import { ChartDatasets, getProjectPowerTimeLine, PowerTimeLine } from '../../../services/data/powerTimeLine';

    import { project } from '../../../stores';
    import { selectedPowerPlanet } from '../../../stores/selectedPowerPlanet';
    import Chart from './Chart.svelte';

    let timeline: PowerTimeLine;

    let labels: number[];
    let environmentDatasets: ChartDatasets;
    let producersOutputDatasets: ChartDatasets;
    let storageOutputDataset: ChartDatasets;
    let storageCapacityDataset: ChartDatasets;

    const color1 = 'rgb(250, 220, 30)';
    const color2 = 'rgb(90, 220, 230)';
    const color3 = 'rgb(90, 230, 120)';
    const color4 = 'rgb(255, 70, 0)';
    const color5 = 'rgb(255, 0, 150)';
    const color6 = 'rgb(240, 130, 250)';
    const color7 = 'rgb(155, 155, 0)';

    const updateChart = () => {
        if (!timeline) {
            return;
        }

        labels = timeline.map((i) => i.timestamp);

        environmentDatasets = [
            {
                label: 'Sun',
                backgroundColor: color1,
                borderColor: color1,
                data: timeline.map((i) => i.environment.solarCoef)
            },
            {
                label: 'Wind',
                backgroundColor: color2,
                borderColor: color2,
                data: timeline.map((i) => i.environment.windCoef)
            }
        ];

        producersOutputDatasets = [
            {
                label: 'Total Producers + storage',
                backgroundColor: color7,
                borderColor: color7,
                data: timeline.map((i) => i.producersOutput.total + i.batteriesState.output)
            },
            {
                label: 'Total Producers',
                backgroundColor: color4,
                borderColor: color4,
                borderWidth: 3,
                data: timeline.map((i) => i.producersOutput.total)
            },
            {
                label: 'Batteries',
                backgroundColor: color5,
                borderColor: color5,
                data: timeline.map((i) => i.batteriesState.output)
            },
            {
                label: 'Organic + RTG',
                backgroundColor: color3,
                borderColor: color3,
                data: timeline.map((i) => i.producersOutput.constant)
            },
            {
                label: 'Wind',
                backgroundColor: color2,
                borderColor: color2,
                data: timeline.map((i) => i.producersOutput.wind)
            },
            {
                label: 'Solar',
                backgroundColor: color1,
                borderColor: color1,
                data: timeline.map((i) => i.producersOutput.solar)
            },
            {
                label: 'Tools nominal consumption',
                backgroundColor: color6,
                borderColor: color6,
                data: timeline.map((i) => i.toolsNominalConsumption),
                borderWidth: 5
            }
        ];

        storageOutputDataset = [
            {
                label: 'Power output',
                backgroundColor: color4,
                borderColor: color4,
                data: timeline.map((i) => i.batteriesState.output)
            },
            {
                label: 'Power drained',
                backgroundColor: color1,
                borderColor: color1,
                data: timeline.map((i) => i.batteriesState.drain)
            },
            {
                label: 'Power available',
                backgroundColor: color3,
                borderColor: color3,
                borderWidth: 3,
                data: timeline.map((i) => i.batteriesInput)
            }
        ];

        storageCapacityDataset = [
            {
                label: 'Instant capacity',
                backgroundColor: color2,
                borderColor: color2,
                data: timeline.map((i) => i.batteriesState.batteries.reduce((total, state) => total + state.fill, 0))
            },
            {
                label: 'Total capacity',
                backgroundColor: color6,
                borderColor: color6,
                data: timeline.map((i) =>
                    i.batteriesState.batteries.reduce((total, state) => total + state.powerStats.capacity, 0)
                )
            }
        ];
    };

    $: {
        timeline = getProjectPowerTimeLine($project, $selectedPowerPlanet);
        updateChart();
    }

    onMount(() => {
        updateChart();
    });
</script>

<main>
    <div class="content-section">
        <h3 class="content-header">Power timeline</h3>

        <div>
            <h4 class="content-subheader">Environment</h4>
            <Chart {labels} datasets={environmentDatasets} />
        </div>

        <div>
            <h4 class="content-subheader">Producers output</h4>
            <Chart {labels} datasets={producersOutputDatasets} />
        </div>

        <div>
            <h4 class="content-subheader">Storage throughput</h4>
            <Chart {labels} datasets={storageOutputDataset} />
        </div>

        <div>
            <h4 class="content-subheader">Storage capacity</h4>
            <Chart {labels} datasets={storageCapacityDataset} />
        </div>
    </div>
</main>
