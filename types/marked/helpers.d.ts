export function escape(html: any, encode: any): any;
/**
 * @param {string} html
 */
export function unescape(html: string): string;
/**
 * @param {string | RegExp} regex
 * @param {string} opt
 */
export function edit(regex: string | RegExp, opt: string): {
    replace: (name: any, val: any) => any;
    getRegex: () => RegExp;
};
/**
 * @param {boolean} sanitize
 * @param {string} base
 * @param {string} href
 */
export function cleanUrl(sanitize: boolean, base: string, href: string): string;
/**
 * @param {string} base
 * @param {string} href
 */
export function resolveUrl(base: string, href: string): string;
export function merge(obj: any, ...args: any[]): any;
export function splitCells(tableRow: any, count: any): any;
/**
 * Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
 * /c*$/ is vulnerable to REDOS.
 *
 * @param {string} str
 * @param {string} c
 * @param {boolean} invert Remove suffix of non-c chars instead. Default falsey.
 */
export function rtrim(str: string, c: string, invert: boolean): string;
export function findClosingBracket(str: any, b: any): number;
export function checkSanitizeDeprecation(opt: any): void;
/**
 * @param {string} pattern
 * @param {number} count
 */
export function repeatString(pattern: string, count: number): string;
export namespace noopTest {
    function exec(): void;
}
