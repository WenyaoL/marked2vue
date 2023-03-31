import { VNode } from 'vue';
/**
 * Renderer
 */
export declare class VueRenderer {
    options: any;
    constructor(options?: any);
    code(code: string, infostring: any, escaped: boolean): VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    /**
     * @param {string | VNode | VNode[]} quote
     */
    blockquote(quote: string | VNode | VNode[]): VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    html(html: any): VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    /**
     * @param {string} inlineVNode
     * @param {string} level
     * @param {string} raw
     * @param {any} slugger
     */
    heading(inlineVNode: string | VNode | VNode[], level: string, raw: any, slugger: {
        slug: (arg0: any) => any;
    }): VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    hr(): VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    list(body: string | VNode | VNode[], ordered: any, start: string | number): VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    /**
     * @param {string} content
     */
    listitem(content: string | VNode | VNode[]): VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    checkbox(checked: any): VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    /**
     * @param {VNode | VNode[]} inlineVNode
     */
    paragraph(inlineVNode: VNode | VNode[]): VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    /**
     * @param {VNode[]} header
     * @param {VNode[]} body
     */
    table(header: VNode[], body: VNode[]): VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    /**
     * @param {string | VNode | VNode[]} content
     */
    tablerow(content: string | VNode | VNode[]): VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    tablecell(content: string | VNode | VNode[], flags: {
        header: any;
        align: any;
    }): VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    /**
     * span level renderer
     * @param {string | VNode | VNode[]} content
     */
    strong(content: string | VNode | VNode[]): VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    /**
     * @param {string | VNode | VNode[]} content
     */
    em(content: string | VNode | VNode[]): VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    /**
     * @param {string} text
     */
    codespan(text: string): VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    br(): VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    /**
     * @param {string | VNode | VNode[]} content
     */
    del(content: string | VNode | VNode[]): VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    /**
     * @param {string} href
     * @param {string} title
     * @param {string | VNode | VNode[]} content
     */
    link(href: string, title: string, content: string | VNode | VNode[]): string | VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    /**
     * @param {string} href
     * @param {string} title
     * @param {string} text
     */
    image(href: string, title: string, text: string): string | VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    text(text: string): string;
}
