import resourcesDetails from '../../data2/resourcesDetails.json';

type ResourceDetails = {
    classification: "mineral" | "organic" | "ore";
};

const getResourceDetails = (resourceName: string): ResourceDetails => {
    return resourcesDetails[resourceName];
};

export { getResourceDetails };
