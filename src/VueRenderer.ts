import { defaults } from './marked/defaults.js';
import {
    cleanUrl,
    escape
} from './marked/helpers.js';
import { h, VNode, createStaticVNode } from 'vue'
import {Slugger} from './marked/Slugger'

import Link from './vueComponent/Link.vue'
import Image from './vueComponent/Image.vue'
import CodeInline from './vueComponent/CodeInline.vue'
import EmFont from './vueComponent/EmFont.vue'
import DeleteFont from './vueComponent/DeleteFont.vue'
import BoldFont from './vueComponent/BoldFont.vue'

import Paragraph from './vueComponent/Paragraph.vue'
import Heading from './vueComponent/Heading.vue'
import Blockquote from './vueComponent/Blockquote.vue'
import CodeBlock from './vueComponent/CodeBlock.vue'

import Tablecell from './vueComponent/Tablecell.vue'
import Tablerow from './vueComponent/Tablerow.vue'
import Table from './vueComponent/Table.vue'

import Listitem from './vueComponent/Listitem.vue'
import List from './vueComponent/List.vue'

let staticCount = 0

/**
 * Renderer
 */
export class VueRenderer {
    options: any;
    constructor(options = null) {
        this.options = options || defaults;
    }

    code(code: string, infostring: any, escaped: boolean) {
        const lang = (infostring || '').match(/\S*/)[0];
        if (this.options.highlight) {
            const out = this.options.highlight(code, lang);
            if (out != null && out !== code) {
                escaped = true;
                code = out;
            }
        }

        code = code.replace(/\n$/, '') + '\n';

        if (!lang) {
            return h(
                CodeBlock,
                null,
                () => h('code', { innerHTML: (escaped ? code : escape(code, true)) })
            )
        }

        return h(
            CodeBlock,
            null,
            () => h('code', { class: this.options.langPrefix + escape(lang), innerHTML: (escaped ? code : escape(code, true)) })
        )
    }

    /**
     * @param {string | VNode | VNode[]} quote
     */
    blockquote(quote: string | VNode | VNode[]) {
        return h(Blockquote, null, () => quote);
    }

    html(html: any) {
        return h('div', { class: 'html', innerHTML: html });
    }

    inlineHtml(html:any,){
        return createStaticVNode(html,staticCount++)
    }

    /**
     * @param {string} inlineVNode
     * @param {string} level
     * @param {string} raw
     * @param {any} slugger
     */
    heading(inlineVNode: string | VNode | VNode[], level: string, raw: any, slugger: Slugger) {
        if (this.options.headerIds) {
            const id = this.options.headerPrefix + slugger.slug(raw);
            return h(Heading, { level, id }, () => inlineVNode)
        }

        // ignore IDs
        return h(Heading, { level }, () => inlineVNode)
    }

    hr() {
        return h('hr',{class:'marked-vue-hr'});
    }

    list(body: string | VNode | VNode[], ordered: any, start: string | number) {
        return h(List, { ordered, start }, () => body)
    }

    /**
     * @param {string} content
     */
    listitem(content: string | VNode | VNode[]) {
        return h(Listitem, null, () => content);
    }

    checkbox(checked: any) {
        if (checked) return h('input', { checked: "", disabled: "", type: "checkbox" })
        return h('input', { disabled: "", type: "checkbox" })
    }

    /**
     * @param {VNode | VNode[]} inlineVNode
     */
    paragraph(inlineVNode: VNode | VNode[]) {
        return h(Paragraph, null, { default: () => inlineVNode });
    }

    /**
     * @param {VNode[]} header
     * @param {VNode[]} body
     */
    table(header: VNode[], body: VNode[]) {
        //if (body) body = h('tbody', body);
        if(body && body.length){
            return h(Table, null, {
                default: () => body,
                header: () => header
            })
        }
        
        return h(Table, null, {
            header: () => header
        })
    }

    /**
     * @param {string | VNode | VNode[]} content
     */
    tablerow(content: string | VNode | VNode[]) {
        return h(Tablerow, null, () => content);
    }

    tablecell(content: string | VNode | VNode[], flags: { header: any; align: any; }) {
        return h(Tablecell, { flags }, () => content)
    }

    /**
     * span level renderer
     * @param {string | VNode | VNode[]} content
     */
    strong(content: string | VNode | VNode[]) {
        return h(BoldFont, null, () => content);
    }

    /**
     * @param {string | VNode | VNode[]} content
     */
    em(content: string | VNode | VNode[]) {
        return h(EmFont, null, () => content);
    }

    /**
     * @param {string} text
     */
    codespan(text: string) {
        return h(CodeInline, { text });
    }

    br() {
        return h('br');
    }

    /**
     * @param {string | VNode | VNode[]} content
     */
    del(content: string | VNode | VNode[]) {
        return h(DeleteFont, null, () => content);
    }

    /**
     * @param {string} href
     * @param {string} title
     * @param {string | VNode | VNode[]} content
     */
    link(href: string, title: string, content: string | VNode | VNode[]) {
        href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
        if (href === null) {
            return this.text(content as string);
        }
        return h(Link, { href, title }, () => content);
    }

    /**
     * @param {string} href
     * @param {string} title
     * @param {string} text
     */
    image(href: string, title: string, text: string) {
        href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
        if (href === null) {
            return this.text(text);
        }

        return h(Image, { src: href, title, alt: text });
    }

    text(text: string) {
        return text;
    }
}
