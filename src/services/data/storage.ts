import canisters from '../../data/canistersDetails.json';
import storages from '../../data/storageDetails.json';
import type { Project } from "../project";
import { getObject } from "./objects";

type CanisterTypeStorageDetails = {
    individualCapacity: number;
    totalCapacity: number;
    quantity: number;
}
export type ProjectStorageStats = {
    objectsCountByTier: [number, number, number, number]; // Quantity of object of each tier. Tiers are indexes of the array
    objectTotalCount: number;
    canistersCapacitybyType: {
        resources?: CanisterTypeStorageDetails;
        fluid_soil?: CanisterTypeStorageDetails;
        gases?: CanisterTypeStorageDetails;
    }
    storagesCapacityByTier: [number, number, number, number];
};

const getProjectStorageStats = (project: Project): ProjectStorageStats => {
    const objectsCountByTier: [number, number, number, number] = [0, 0, 0, 0];
    const canistersCapacitybyType = {}
    const storagesCapacityByTier: [number, number, number, number] = [0, 0, 0, 0];
    let objectTotalCount = 0;

    for (const objectName of Object.keys(project)) {
        const objectQuantity = project[objectName];
        const object = getObject(objectName);

        if (canisters[objectName]) {
            const canister = canisters[objectName]
            if (!canistersCapacitybyType[canister.holds]) {
                canistersCapacitybyType[canister.holds] = {};
            }
            canistersCapacitybyType[canister.holds][objectName] = {
                storageType: canister.holds,
                individualCapacity: canister.capacity,
                quantity: objectQuantity,
                totalCapacity: canister.capacity * objectQuantity
            }
        }

        if (storages[objectName]) {
            const storage = storages[objectName]
            for (let tier=1; tier<=4; tier++) {
                storagesCapacityByTier[tier-1] += storage.slotsByTier[tier] * objectQuantity;
            }
        }

        objectsCountByTier[object.tier-1] += objectQuantity
    }

    return {
        objectsCountByTier,
        objectTotalCount,
        canistersCapacitybyType,
        storagesCapacityByTier
    }
}

export { getProjectStorageStats };
