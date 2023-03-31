/**
 * Block Lexer
 */
export class Lexer {
    /**
     * Expose Rules
     */
    static get rules(): {
        block: {
            newline: RegExp;
            code: RegExp;
            fences: RegExp;
            hr: RegExp;
            heading: RegExp;
            blockquote: RegExp;
            list: RegExp;
            html: string;
            def: RegExp;
            table: {
                exec: () => void;
            };
            lheading: RegExp;
            _paragraph: RegExp;
            text: RegExp;
        };
        inline: {
            escape: RegExp;
            autolink: RegExp;
            url: {
                exec: () => void;
            };
            tag: string;
            link: RegExp;
            reflink: RegExp;
            nolink: RegExp;
            reflinkSearch: string;
            emStrong: {
                lDelim: RegExp;
                rDelimAst: RegExp;
                rDelimUnd: RegExp;
            };
            code: RegExp;
            br: RegExp;
            del: {
                exec: () => void;
            };
            text: RegExp;
            punctuation: RegExp;
        };
    };
    /**
     * Static Lex Method
     */
    static lex(src: any, options: any): any[];
    /**
     * Static Lex Inline Method
     */
    static lexInline(src: any, options: any): any[];
    constructor(options: any);
    tokens: any[];
    options: any;
    tokenizer: any;
    inlineQueue: any[];
    state: {
        inLink: boolean;
        inRawBlock: boolean;
        top: boolean;
    };
    /**
     * Preprocessing
     */
    lex(src: any): any[];
    /**
     * Lexing
     */
    blockTokens(src: any, tokens?: any[]): any[];
    inline(src: any, tokens?: any[]): any[];
    /**
     * Lexing/Compiling
     */
    inlineTokens(src: any, tokens?: any[]): any[];
}
