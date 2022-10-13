import research from '../../data/researchValues.json';
import { BaseObject, getObject } from './objects';

export interface ObjectResearchDetails extends BaseObject {
    byteValue: number;
    bytesPerMinute: number;
}

const getAllResearchDetails = (): ObjectResearchDetails[] => {
    const result = [];
    for (const resource of Object.keys(research)) {
        const baseObject = getObject(resource);
        const researchDetails = research[resource];
        const complete = {
            ...baseObject,
            ...researchDetails
        };
        result.push(complete);
    }
    return result;
};

export { getAllResearchDetails };
