import producers from '../../data2/powerProducerDetails.json';
import consumers from '../../data2/powerConsumerDetails.json';
import type { Project } from '../project';
import { BaseObject, getObject } from './objects';

type PowerProducer = {
    type: "producer"
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

const getProjectPowerStats = (project: Project): ProjectPowerStats => {
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
            projectPowerStats[objectType].total += quantity * powerStats.output;
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
