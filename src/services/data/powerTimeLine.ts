import type { Project } from '../project';
import type { BaseObject } from './objects';
import type { Planet } from './planets';
import { getProjectPowerStats, PowerStorage, ProjectPowerStats } from './power';

export type ChartDatasets = {
    label: string;
    backgroundColor: string;
    borderColor: string;
    data: number[];
    order?: number;
    borderWidth?: number;
}[];

type ProducersOutput = {
    solar: number;
    wind: number;
    constant: number;
    total: number;
}
type PowerTimeLineState = {
    timestamp: number;
    toolsNominalConsumption: number;
    environment: {
        solarCoef: number;
        windCoef: number;
    }
    producersOutput: ProducersOutput;
    batteriesInput: number;
    batteriesState: BatteriesState;
};
export type PowerTimeLine = PowerTimeLineState[];

type BatteriesItemsState = {
    powerStats: PowerStorage;
    object: BaseObject;
    fill: number;
}[];

type BatteriesState = {
    drain: number;
    output: number;
    batteries: BatteriesItemsState
};

const getProducersOutput = (params: { isDay: boolean, isWind: boolean, sunCoef: number, windCoef: number }, powerStats: ProjectPowerStats) => {
    const { isDay, isWind, sunCoef, windCoef } = params;
    let solarProduced = 0;
    if (isDay) {
        solarProduced = powerStats.producer.items.reduce((total, producer) => {
            if (producer.powerStats.type === 'producer' && producer.powerStats.category === 'solar') {
                total += producer.quantity * producer.powerStats.output * sunCoef;
            }
            return total;
        }, 0);
    }

    let windProduced = 0;
    if (isWind) {
        windProduced = powerStats.producer.items.reduce((total, producer) => {
            if (producer.powerStats.type === 'producer' && producer.powerStats.category === 'wind') {
                total += producer.quantity * producer.powerStats.output * windCoef;
            }
            return total;
        }, 0);
    }

    const constantProduced = powerStats.producer.items.reduce((total, producer) => {
        if (producer.powerStats.type === 'producer' && ['organic', 'other'].includes(producer.powerStats.category)) {
            total += producer.quantity * producer.powerStats.output;
        }
        return total;
    }, 0);

    const totalProducedByProducers = solarProduced + windProduced + constantProduced;

    return {
        solar: solarProduced,
        wind: windProduced,
        constant: constantProduced,
        total: totalProducedByProducers
    };
};

const getInitialBatteriesState = (powerStats: ProjectPowerStats): BatteriesState => {
    const batteries = powerStats.storage.items.reduce((batteries: BatteriesItemsState, powerStatsItem) => {
        for (let i = 0; i < powerStatsItem.quantity; i++) {
            batteries.push({
                powerStats: (powerStatsItem.powerStats as PowerStorage),
                object: powerStatsItem.object,
                fill: 0
            });
        }
        return batteries;
    }, []).sort((a, b) => a.powerStats.output - b.powerStats.output);

    return {
        drain: 0,
        output: 0,
        batteries
    };
};

const updateBatteriesStateFill = (prevBatteriesState: BatteriesState, availableInput: number): BatteriesState => {
    if (availableInput <= 0) {
        throw new Error('Try to fill batteries with negative or null power');
    }

    let remainingInput = availableInput;
    const batteriesState = JSON.parse(JSON.stringify(prevBatteriesState));
    for (const object of batteriesState.batteries) {
        // Skip when we don't have input power left
        if (remainingInput <= 0) {
            break;
        }
        // or when the object is already filled
        if (object.fill >= object.powerStats.capacity) {
            continue;
        }

        // If the available power is greater than what the thoughput of the object
        // only use the thoughput value
        let usable = remainingInput;
        // If the available power is greater than the battery throughput
        // only use the thoughput and put back the diff in the remainingInput
        if (usable > object.powerStats.output) {
            usable = object.powerStats.output;
        }
        // If using the full input we would overflow the battery adjust the usage
        if (usable > object.powerStats.capacity - object.fill) {
            usable = object.powerStats.capacity - object.fill;
        }
        object.fill += usable;
        remainingInput -= usable;
    }
    batteriesState.drain = availableInput - remainingInput;
    return batteriesState;
};

const updateBatteriesStateEmpty = (prevBatteriesState: BatteriesState, requiredOutput: number): BatteriesState => {
    if (requiredOutput <= 0) {
        throw new Error('Try to empty batteries with negative or null power');
    }

    let remainingRequiredOutput = requiredOutput;
    const batteriesState = JSON.parse(JSON.stringify(prevBatteriesState));
    for (const object of batteriesState.batteries) {
        // Skip when we don't have power left  output
        if (remainingRequiredOutput <= 0) {
            break;
        }
        // or when the object is already empty
        if (object.fill <= 0) {
            continue;
        }

        // If the available power is greater than what the thoughput of the object
        // only use the thoughput value
        let output = remainingRequiredOutput;
        // If the available power is greater than the battery throughput
        // only use the thoughput and put back the diff in the remainingInput
        if (output > object.powerStats.output) {
            output = object.powerStats.output;
        }
        // If using the full output we would empty the battery adjust the usage
        if (output > object.fill) {
            output = object.fill;
        }
        object.fill -= output;
        remainingRequiredOutput -= output;
    }
    batteriesState.output = requiredOutput - remainingRequiredOutput;
    return batteriesState;
};

const getProjectPowerTimeLine = (project: Project, planet: Planet): PowerTimeLine => {
    const timeline: PowerTimeLine = [];
    const powerStats = getProjectPowerStats(project, planet);

    // Duration of a day on the planet.
    // We consider the night and day are half of the cycle
    const duration = planet.power.dayNightCycleSeconds;

    // The efficiency coefficient of the solar panels
    // Any time there is sun the solar panels produce sunCoef of their nominal output
    const sunCoef = planet.power.wikiSolarCoefficient;

    // The activity coefficient of the wind turbines
    // The wind coef describes the percentage of the the time the wind turbines are active
    // The windWindowSec describes the consecutive windows where the wind will blow and stop
    const windWindowSec = 60;
    const windCoef = planet.power.wikiWindCoefficient;

    let batteriesState = getInitialBatteriesState(powerStats);

    for (let t = 0; t < duration; t++) {
        const isDay = t < (duration / 2);
        const normalizedWindWindow = t % windWindowSec;
        const isWind = normalizedWindWindow <= (windWindowSec * windCoef);

        const producersOutput = getProducersOutput({ isDay, isWind, sunCoef, windCoef }, powerStats);
        const toolsNominalConsumption = powerStats.consumer.total;

        const availableForBatteries = Math.max(producersOutput.total - toolsNominalConsumption, 0);
        if (availableForBatteries > 0) {
            batteriesState = updateBatteriesStateFill(batteriesState, availableForBatteries);
        } else {
            batteriesState.drain = 0;
        }

        const missingFromProducers = toolsNominalConsumption - producersOutput.total;
        if (missingFromProducers > 0) {
            batteriesState = updateBatteriesStateEmpty(batteriesState, missingFromProducers);
        } else {
            batteriesState.output = 0;
        }

        const state: PowerTimeLineState = {
            timestamp: t,
            toolsNominalConsumption,
            environment: {
                solarCoef: isDay ? sunCoef : 0,
                windCoef: isWind ? 1 : 0,
            },
            producersOutput,
            batteriesInput: availableForBatteries,
            batteriesState
        };

        timeline.push(state);
    }

    return timeline;
};

export { getProjectPowerTimeLine };
