import producers from '../../data/powerProducerDetails.json';
import consumers from '../../data/powerConsumerDetails.json';
import type { Project } from '../project';
import { BaseObject, getObject } from './objects';
import type { Planet } from './planets';

type PowerProducer = {
    type: "producer"
    category: "wind" | "solar" | "organic" | "other";
    output: number;
};

type PowerConsumer = {
    type: "consumer"
    input: number;
};

type PowerStorage = {
    type: "storage"
    output: number;
    capacity: number;
}

export type ObjectPowerStats = PowerProducer | PowerConsumer | PowerStorage;

// https://astroneer.fandom.com/wiki/Power
const solarCoefficientsByName = {
    "very low": 0.25,
    "low": 0.5,
    "medium": 1,
    "high": 1.5,
    "very high": 1.75
}

const getObjectPowerStats = (objectName: string): ObjectPowerStats => {
    if (producers[objectName]) {
        const stats = producers[objectName];
        return {
            type: stats.capacity ? "storage" : "producer",
            ...stats
        }
    }
    if (consumers[objectName]) {
        const stats = consumers[objectName];
        return {
            type: "consumer",
            ...stats
        }
    }
}
type PowerStatsItem = {
    objectName: string;
    object: BaseObject;
    quantity: number;
    powerStats: ObjectPowerStats;
}

export type ProjectPowerStats = {
    consumer: {
        total: number;
        items: PowerStatsItem[];
    };
    producer: {
        total: number;
        items: PowerStatsItem[];
    };
    storage: {
        totalCapacity: number;
        totalThroughput: number;
        items: PowerStatsItem[];
    };
    exceedingProduction: number;
    secondsToFillStorage: {
        withAllToolsOn: number;
        withAllToolsOff: number;
    };
    secondsToEmptyStorage: {
        withPowerOn: number;
        withPowerOff: number;
    }
}

const getProjectPowerStats = (project: Project, planet: Planet): ProjectPowerStats => {
    const projectPowerStats: ProjectPowerStats = {
        consumer: {
            total: 0, items: []
        },
        producer: {
            total: 0, items: []
        },
        storage: {
            totalCapacity: 0, totalThroughput: 0, items: []
        },
        exceedingProduction: 0,
        secondsToFillStorage: {
            withAllToolsOn: 0,
            withAllToolsOff: 0
        },
        secondsToEmptyStorage: {
            withPowerOn: 0,
            withPowerOff: 0
        }
    };
    for (const objectName of Object.keys(project)) {
        const powerStats = getObjectPowerStats(objectName);
        if (!powerStats) {
            continue;
        }
        const object = getObject(objectName);
        const quantity = project[objectName];

        const objectType = powerStats.type;

        if (objectType === 'consumer') {
            projectPowerStats[objectType].total += quantity * powerStats.input;
        }
        if (objectType === 'producer') {
            let planetCoefficient = 1;
            if (powerStats.category === 'solar') {
                planetCoefficient = solarCoefficientsByName[planet.power.sun];
            }
            if (powerStats.category === 'wind') {
                planetCoefficient = planet.power.wikiWindCoefficient;
            }
            projectPowerStats[objectType].total += quantity * powerStats.output * planetCoefficient;
        }
        if (objectType === 'storage') {
            projectPowerStats[objectType].totalCapacity += quantity * powerStats.capacity;
            projectPowerStats[objectType].totalThroughput += quantity * powerStats.output;
        }
        projectPowerStats[objectType].items.push({ objectName, object, quantity, powerStats });
    }

    projectPowerStats.exceedingProduction = projectPowerStats.producer.total - projectPowerStats.consumer.total;

    const totalStorageCapacity = projectPowerStats.storage.totalCapacity;
    const totalStorageThroughput = projectPowerStats.storage.totalThroughput;
    const { min, ceil, floor } = Math;
    if (projectPowerStats.producer.total > 0) {
        projectPowerStats.secondsToFillStorage.withAllToolsOff = ceil(totalStorageCapacity / min(projectPowerStats.producer.total, totalStorageThroughput));
    }
    if (projectPowerStats.exceedingProduction > 0) {
        projectPowerStats.secondsToFillStorage.withAllToolsOn = ceil(totalStorageCapacity / min(projectPowerStats.exceedingProduction, totalStorageThroughput));
    }

    if (projectPowerStats.consumer.total > 0) {
        projectPowerStats.secondsToEmptyStorage.withPowerOff = floor(totalStorageCapacity / min(projectPowerStats.consumer.total, totalStorageThroughput));
    }
    if (projectPowerStats.exceedingProduction < 0) {
        projectPowerStats.secondsToEmptyStorage.withPowerOn = floor(totalStorageCapacity / min(-projectPowerStats.exceedingProduction, totalStorageThroughput));
    }

    return projectPowerStats;
};

export { getObjectPowerStats, getProjectPowerStats };
