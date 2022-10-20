import canisters from '../../data/canistersDetails.json';
import storages from '../../data/storageDetails.json';
import type { Project } from '../project';
import { getObject } from './objects';

export type StorageDetails = {
    slotsByTier: {
        1: number;
        2: number;
        3: number;
        4: number;
    };
};

export type CanisterDetails = {
    holds: 'resources' | 'fluid_soil' | 'gases';
    capacity: number;
};

type CanisterTypeStorageDetails = {
    storageType: string;
    individualCapacity: number;
    totalCapacity: number;
    quantity: number;
    id: string;
};

type ObjectsCountByTier = {
    tier: number;
    total: number;
    objects: {
        id: string;
        quantity: number;
    }[];
};
export type ProjectStorageStats = {
    objectsCountByTier: [ObjectsCountByTier, ObjectsCountByTier, ObjectsCountByTier, ObjectsCountByTier];
    objectTotalCount: number;
    canistersCapacitybyType: {
        resources?: CanisterTypeStorageDetails;
        fluid_soil?: CanisterTypeStorageDetails;
        gases?: CanisterTypeStorageDetails;
    };
    storagesCapacityByTier: [number, number, number, number];
    storageObjects: { id: string; quantity: number }[];
};

export type StorageStatsSettings = {
    includeCanisters: boolean;
    includePlatforms: boolean;
    includeStorages: boolean;
    includeResources: boolean;
    includeOthers: boolean;
};

const getObjectCanisterDetails = (objectName: string): CanisterDetails => canisters[objectName];
const getObjectStorageDetails = (objectName: string): StorageDetails => storages[objectName];

const getProjectStorageStats = (project: Project, params: StorageStatsSettings): ProjectStorageStats => {
    const objectsCountByTier: [ObjectsCountByTier, ObjectsCountByTier, ObjectsCountByTier, ObjectsCountByTier] = [
        { tier: 1, total: 0, objects: [] },
        { tier: 2, total: 0, objects: [] },
        { tier: 3, total: 0, objects: [] },
        { tier: 4, total: 0, objects: [] }
    ];
    const canistersCapacitybyType = {};
    const storagesCapacityByTier: [number, number, number, number] = [0, 0, 0, 0];
    const storageObjects = [];
    let objectTotalCount = 0;

    for (const objectName of Object.keys(project)) {
        const objectQuantity = project[objectName];
        const object = getObject(objectName);

        if (canisters[objectName]) {
            const canister = canisters[objectName];
            if (!canistersCapacitybyType[canister.holds]) {
                canistersCapacitybyType[canister.holds] = {};
            }
            canistersCapacitybyType[canister.holds][objectName] = {
                storageType: canister.holds,
                individualCapacity: canister.capacity,
                quantity: objectQuantity,
                totalCapacity: canister.capacity * objectQuantity,
                id: objectName
            };
        }

        if (storages[objectName]) {
            const storage = storages[objectName];
            for (let tier = 1; tier <= 4; tier++) {
                storagesCapacityByTier[tier - 1] += storage.slotsByTier[tier] * objectQuantity;
            }
            storageObjects.push({ id: objectName, quantity: objectQuantity });
        }

        // Wanna know how bad and unreadable can I make my code? Check this out!
        // This is to accomodate the different settings
        let excludeObjectFromCount = false;
        if (!params.includeCanisters && object.category === 'canister') {
            excludeObjectFromCount = true;
        }
        if (!params.includePlatforms && object.category === 'platform') {
            excludeObjectFromCount = true;
        }
        if (!params.includeStorages && object.category === 'storage') {
            excludeObjectFromCount = true;
        }

        if (!params.includeResources && object.type === 'resource') {
            excludeObjectFromCount = true;
        }
        if (
            !params.includeOthers &&
            object.type === 'object' &&
            !['canister', 'platform', 'storage'].includes(object.category)
        ) {
            excludeObjectFromCount = true;
        }
        if (excludeObjectFromCount) {
            continue;
        }
        objectTotalCount += objectQuantity;
        objectsCountByTier[object.tier - 1].total += objectQuantity;
        objectsCountByTier[object.tier - 1].objects.push({
            id: objectName,
            quantity: objectQuantity
        });
    }

    return {
        objectsCountByTier,
        objectTotalCount,
        canistersCapacitybyType,
        storagesCapacityByTier,
        storageObjects
    };
};

export { getObjectCanisterDetails, getObjectStorageDetails, getProjectStorageStats };
