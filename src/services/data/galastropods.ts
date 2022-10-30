import galastropods from '../../data/galastropods.json';

export type Galastropod = {
    id: string;
    planet: string;
    resource: string;
    flora: string;
    use: string;
    url: {
        icon: string;
        image: string;
        wiki: string;
    };
    labels: {
        [lang: string]: string;
    };
};

const getGalastropod = (galastropodId: string) => galastropods[galastropodId];

const getAllGalastropods = (): Galastropod[] => {
    const all: Galastropod[] = [];

    for (const id of Object.keys(galastropods)) {
        all.push(galastropods[id]);
    }

    return all;
};

export { getAllGalastropods, getGalastropod };
