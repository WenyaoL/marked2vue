import { Lexer } from './marked/Lexer.js';
import { Parser } from './marked/Parser.js';
import { VueParser } from './VueParser.js';
/**
 * Marked
 */
export declare function marked(src: string, opt?: any, callback?: Function): any;
export declare namespace marked {
    var options: (opt: any) => typeof marked;
    var setOptions: (opt: any) => typeof marked;
    var getDefaults: typeof import("./marked/defaults.js").getDefaults;
    var defaults: {
        async: boolean;
        baseUrl: any;
        breaks: boolean;
        extensions: any;
        gfm: boolean;
        headerIds: boolean;
        headerPrefix: string;
        highlight: any;
        langPrefix: string;
        mangle: boolean;
        pedantic: boolean;
        renderer: any;
        vueRenderer: any;
        sanitize: boolean;
        sanitizer: any;
        silent: boolean;
        smartypants: boolean;
        tokenizer: any;
        walkTokens: any;
        xhtml: boolean;
        isVNodeModel: boolean;
    };
    var use: (...args: any[]) => void;
    var walkTokens: (tokens: any, callback: Function) => any[];
    var parseInline: (src: string, opt?: any) => string | any[];
    var parseVNode: (src: string, opt?: any, callback?: Function) => any;
    var parseInlineVNode: (src: string, opt?: any) => string | any[];
    var Parser: typeof import("./marked/Parser.js").Parser;
    var parser: typeof import("./marked/Parser.js").Parser.parse;
    var Renderer: typeof import("./marked/Renderer.js").Renderer;
    var TextRenderer: typeof import("./marked/TextRenderer.js").TextRenderer;
    var Lexer: typeof import("./marked/Lexer.js").Lexer;
    var lexer: typeof import("./marked/Lexer.js").Lexer.lex;
    var Tokenizer: typeof import("./marked/Tokenizer.js").Tokenizer;
    var Slugger: typeof import("./marked/Slugger.js").Slugger;
    var parse: typeof marked;
    var VueParser: typeof import("./VueParser.js").VueParser;
    var vueParser: typeof import("./VueParser.js").VueParser.parse;
    var VueRenderer: typeof import("./VueRenderer.js").VueRenderer;
}
export declare const vueParser: typeof VueParser.parse;
export declare const options: (opt: any) => typeof marked;
export declare const setOptions: (opt: any) => typeof marked;
export declare const use: (...args: any[]) => void;
export declare const walkTokens: (tokens: any, callback: Function) => any[];
export declare const parseInline: (src: string, opt?: any) => string | any[];
export declare const parseInlineVNode: (src: string, opt?: any) => string | any[];
export declare const parse: typeof marked;
export declare const parseVNode: (src: string, opt?: any, callback?: Function) => any;
export declare const parser: typeof Parser.parse;
export declare const lexer: typeof Lexer.lex;
