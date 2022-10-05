import canisters from '../../data/canistersDetails.json';
import type { Project } from "../project";
import { getObject } from "./objects";

type CanisterTypeStorageDetails = {
    individualCapacity: number;
    totalCapacity: number;
    quantity: number;
}
export type ProjectStorageStats = {
    countByTier: [number, number, number, number]; // Quantity of object of each tier. Tiers are indexes of the array
    objectTotalCount: number;
    canistersCapacitybyType: {
        resources?: CanisterTypeStorageDetails;
        fluid_soil?: CanisterTypeStorageDetails;
        gases?: CanisterTypeStorageDetails;
    }
};

const getProjectStorageStats = (project: Project): ProjectStorageStats => {
    const countByTier: [number, number, number, number] = [0, 0, 0, 0];
    const canistersCapacitybyType = {}
    let objectTotalCount = 0;

    for (const objectName of Object.keys(project)) {
        const object = getObject(objectName);
        const canister = canisters[objectName]
        const objectQuantity = project[objectName];

        if (canister) {
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

        objectTotalCount += objectQuantity;
        countByTier[object.tier - 1] += objectQuantity;
    }

    return {
        countByTier,
        objectTotalCount,
        canistersCapacitybyType
    }
}

export { getProjectStorageStats };
