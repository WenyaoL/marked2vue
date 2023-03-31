/**
 * Parsing & Compiling
 */
export class Parser {
    /**
     * Static Parse Method
     */
    static parse(tokens: any, options: any): string;
    /**
     * Static Parse Inline Method
     */
    static parseInline(tokens: any, options: any): string;
    constructor(options: any);
    options: any;
    renderer: any;
    textRenderer: TextRenderer;
    slugger: Slugger;
    /**
     * Parse Loop
     */
    parse(tokens: any, top?: boolean): string;
    /**
     * Parse Inline Tokens
     */
    parseInline(tokens: any, renderer: any): string;
}
import { TextRenderer } from './TextRenderer.js';
import { Slugger } from './Slugger.js';
