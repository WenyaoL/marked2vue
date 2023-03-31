/**
 * Tokenizer
 */
export class Tokenizer {
    constructor(options: any);
    options: any;
    space(src: any): {
        type: string;
        raw: any;
    };
    code(src: any): {
        type: string;
        raw: any;
        codeBlockStyle: string;
        text: any;
    };
    fences(src: any): {
        type: string;
        raw: any;
        lang: any;
        text: any;
    };
    heading(src: any): {
        type: string;
        raw: any;
        depth: any;
        text: any;
        tokens: any;
    };
    hr(src: any): {
        type: string;
        raw: any;
    };
    blockquote(src: any): {
        type: string;
        raw: any;
        tokens: any;
        text: any;
    };
    list(src: any): {
        type: string;
        raw: string;
        ordered: boolean;
        start: string | number;
        loose: boolean;
        items: any[];
    };
    html(src: any): {
        type: string;
        raw: any;
        pre: boolean;
        text: any;
    };
    def(src: any): {
        type: string;
        tag: any;
        raw: any;
        href: any;
        title: any;
    };
    table(src: any): {
        type: string;
        header: any;
        align: any;
        rows: any;
    };
    lheading(src: any): {
        type: string;
        raw: any;
        depth: number;
        text: any;
        tokens: any;
    };
    paragraph(src: any): {
        type: string;
        raw: any;
        text: any;
        tokens: any;
    };
    text(src: any): {
        type: string;
        raw: any;
        text: any;
        tokens: any;
    };
    escape(src: any): {
        type: string;
        raw: any;
        text: any;
    };
    tag(src: any): {
        type: string;
        raw: any;
        inLink: any;
        inRawBlock: any;
        text: any;
    };
    link(src: any): {
        type: string;
        raw: any;
        href: any;
        title: any;
        text: any;
        tokens: any;
    } | {
        type: string;
        raw: any;
        href: any;
        title: any;
        text: any;
    };
    reflink(src: any, links: any): {
        type: string;
        raw: any;
        href: any;
        title: any;
        text: any;
    } | {
        type: string;
        raw: any;
        text: any;
    };
    emStrong(src: any, maskedSrc: any, prevChar?: string): {
        type: string;
        raw: any;
        text: any;
        tokens: any;
    };
    codespan(src: any): {
        type: string;
        raw: any;
        text: any;
    };
    br(src: any): {
        type: string;
        raw: any;
    };
    del(src: any): {
        type: string;
        raw: any;
        text: any;
        tokens: any;
    };
    autolink(src: any, mangle: any): {
        type: string;
        raw: any;
        text: any;
        href: any;
        tokens: {
            type: string;
            raw: any;
            text: any;
        }[];
    };
    url(src: any, mangle: any): {
        type: string;
        raw: any;
        text: any;
        href: any;
        tokens: {
            type: string;
            raw: any;
            text: any;
        }[];
    };
    inlineText(src: any, smartypants: any): {
        type: string;
        raw: any;
        text: any;
    };
}
