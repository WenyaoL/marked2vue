/**
 * Slugger generates header id
 */
export class Slugger {
    seen: {};
    /**
     * @param {string} value
     */
    serialize(value: string): string;
    /**
     * Finds the next safe (unique) slug to use
     * @param {string} originalSlug
     * @param {boolean} isDryRun
     */
    getNextSafeSlug(originalSlug: string, isDryRun: boolean): string;
    /**
     * Convert string to unique id
     * @param {object} [options]
     * @param {boolean} [options.dryrun] Generates the next unique slug without
     * updating the internal accumulator.
     */
    slug(value: any, options?: {
        dryrun?: boolean;
    }): string;
}
