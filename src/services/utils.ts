import { Duration } from 'luxon';

const alphaSort = (a: string, b: string) => (a < b ? -1 : 1);

// Capitalize the first letter of each words of a string
const titleCase = (a: string) =>
    a
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.substring(1))
        .join(' ');

const formatedDurationFromSeconds = (seconds: number) => {
    if (seconds < 60 * 60) {
        return Duration.fromObject({ seconds }).toFormat('mm:ss');
    }
    return Duration.fromObject({ seconds }).toFormat('hh:mm:ss');
}

export { alphaSort, formatedDurationFromSeconds, titleCase };
