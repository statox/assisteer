import flora from '../../data/flora.json';

export type Flora = {
    id: string;
    type: 'defensive' | 'offensive';
    galastropods?: string[];
    url: {
        image: string;
    };
    location: {
        [planet: string]: string; // planet can be a planet name or "all"
    };
    labels: {
        [lang: string]: string;
    };
};

const getAllFlora = (): Flora[] => {
    const all: Flora[] = [];

    for (const id of Object.keys(flora)) {
        all.push(flora[id]);
    }

    all.sort((a, b) => {
        if (a.type !== b.type) {
            return a.type < b.type ? -1 : 1;
        }
        return a.labels.en < b.labels.en ? -1 : 1;
    });
    return all;
};

export { getAllFlora };
