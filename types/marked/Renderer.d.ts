/**
 * Renderer
 */
export class Renderer {
    constructor(options: any);
    options: any;
    code(code: any, infostring: any, escaped: any): string;
    /**
     * @param {string} quote
     */
    blockquote(quote: string): string;
    html(html: any): any;
    /**
     * @param {string} text
     * @param {string} level
     * @param {string} raw
     * @param {any} slugger
     */
    heading(text: string, level: string, raw: string, slugger: any): string;
    hr(): "<hr/>\n" | "<hr>\n";
    list(body: any, ordered: any, start: any): string;
    /**
     * @param {string} text
     */
    listitem(text: string): string;
    checkbox(checked: any): string;
    /**
     * @param {string} text
     */
    paragraph(text: string): string;
    /**
     * @param {string} header
     * @param {string} body
     */
    table(header: string, body: string): string;
    /**
     * @param {string} content
     */
    tablerow(content: string): string;
    tablecell(content: any, flags: any): string;
    /**
     * span level renderer
     * @param {string} text
     */
    strong(text: string): string;
    /**
     * @param {string} text
     */
    em(text: string): string;
    /**
     * @param {string} text
     */
    codespan(text: string): string;
    br(): "<br/>" | "<br>";
    /**
     * @param {string} text
     */
    del(text: string): string;
    /**
     * @param {string} href
     * @param {string} title
     * @param {string} text
     */
    link(href: string, title: string, text: string): string;
    /**
     * @param {string} href
     * @param {string} title
     * @param {string} text
     */
    image(href: string, title: string, text: string): string;
    text(text: any): any;
}
