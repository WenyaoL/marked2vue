import { TextRenderer } from './marked/TextRenderer.js';
import { Slugger } from './marked/Slugger.js';
import { VNode } from 'vue';
declare class VueParser {
    options: any;
    renderer: any;
    textRenderer: TextRenderer;
    slugger: Slugger;
    constructor(options?: any);
    /**
     * Static Parse Method
     */
    static parse(tokens: any, options?: any): (string | VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>)[];
    /**
     * Static Parse Inline Method
     */
    static parseInline(tokens: any, options?: any): any[];
    /**
     * Parse Loop
     */
    parse(tokens: string | any[], top?: boolean): (VNode | string)[];
    /**
     * Parse Inline Tokens
     */
    parseInline(tokens: string | any[], renderer?: any): any[];
}
export { VueParser };
