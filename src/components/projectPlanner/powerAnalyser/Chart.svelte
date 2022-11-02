<script lang="ts">
    import { v4 as uuidv4 } from 'uuid';
    import Chart from 'chart.js/auto';
    import type { ChartDatasets } from '../../../services/data/powerTimeLine';

    export let labels: number[];
    export let datasets: ChartDatasets;

    let chart: Chart;

    const canvasId = 'canvas' + uuidv4();

    const updateChart = (labels: number[], datasets: ChartDatasets) => {
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            return;
        }

        const options = {
            pointRadius: 1
        };
        if (chart) chart.destroy();
        chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels,
                datasets
            },
            options
        });
    };

    $: {
        updateChart(labels, datasets);
    }
</script>

<div>
    <canvas id={canvasId} />
</div>
