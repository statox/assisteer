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
        items: PowerStatsItem[]
    }
    producer: {
        total: number;
        items: PowerStatsItem[]
    }
    storage: {
        total: number;
        items: PowerStatsItem[]
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
            total: 0, items: []
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
            projectPowerStats[objectType].total += quantity * powerStats.capacity;
        }
        projectPowerStats[objectType].items.push({ objectName, object, quantity, powerStats });
    }

    return projectPowerStats;
};

export { getObjectPowerStats, getProjectPowerStats };
