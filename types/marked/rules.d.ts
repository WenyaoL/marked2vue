export namespace block {
    const _label: RegExp;
    const _title: RegExp;
    const def: RegExp;
    const bullet: RegExp;
    const listItemStart: RegExp;
    const list: RegExp;
    const _tag: string;
    const _comment: RegExp;
    const html: RegExp;
    const paragraph: RegExp;
    const blockquote: RegExp;
    const normal: any;
    const gfm: any;
    const pedantic: any;
}
export namespace inline {
    export const _punctuation: string;
    export const punctuation: RegExp;
    export const blockSkip: RegExp;
    export const escapedEmSt: RegExp;
    const _comment_1: RegExp;
    export { _comment_1 as _comment };
    export namespace emStrong {
        const lDelim: RegExp;
        const rDelimAst: RegExp;
        const rDelimUnd: RegExp;
    }
    export const _escapes: RegExp;
    export const _scheme: RegExp;
    export const _email: RegExp;
    export const autolink: RegExp;
    export const _attribute: RegExp;
    export const tag: RegExp;
    const _label_1: RegExp;
    export { _label_1 as _label };
    export const _href: RegExp;
    const _title_1: RegExp;
    export { _title_1 as _title };
    export const link: RegExp;
    export const reflink: RegExp;
    export const nolink: RegExp;
    export const reflinkSearch: RegExp;
    const normal_1: any;
    export { normal_1 as normal };
    const pedantic_1: any;
    export { pedantic_1 as pedantic };
    const gfm_1: any;
    export { gfm_1 as gfm };
    export const breaks: any;
}
