/**
 * TextRenderer
 * returns only the textual part of the token
 */
export class TextRenderer {
    strong(text: any): any;
    em(text: any): any;
    codespan(text: any): any;
    del(text: any): any;
    html(text: any): any;
    text(text: any): any;
    link(href: any, title: any, text: any): string;
    image(href: any, title: any, text: any): string;
    br(): string;
}
