import { VueRenderer } from './VueRenderer';
import {Renderer} from './marked/Renderer'
import { TextRenderer } from './marked/TextRenderer.js';
import { Slugger } from './marked/Slugger.js';
import { defaults } from './marked/defaults.js';
import {
  unescape
} from './marked/helpers.js';

import { VNode } from 'vue';


interface Token{
  type: string; 
  tokens: any; 
  depth: any; 
  text: any; 
  lang: any; 
  escaped: any; 
  header: string | any[]; 
  align: any[]; 
  rows: string | any[]; 
  ordered: any; 
  start: any; 
  loose: any; 
  items: string | any[];
  checked:any,
  task:boolean
}


class VueParser {
  options: any;
  renderer: any;
  textRenderer: TextRenderer;
  slugger: Slugger;

  constructor(options?: any) {
    this.options = options || defaults;
    this.options.vueRenderer = this.options.vueRenderer || new VueRenderer();
    this.renderer = this.options.vueRenderer;
    this.renderer.options = this.options;
    this.textRenderer = new TextRenderer();
    this.slugger = new Slugger();
  }

  /**
   * Static Parse Method
   */
  static parse(tokens: any, options?: any) {
    const parser = new VueParser(options);
    return parser.parse(tokens);
  }

  /**
   * Static Parse Inline Method
   */
  static parseInline(tokens: any, options?: any) {
    const parser = new VueParser(options);
    return parser.parseInline(tokens);
  }

  /**
   * Parse Loop
   */
  parse(tokens: string | any[], top = true) : (VNode|string)[]{
    let out = [],
      i: number,
      j: number,
      k: number,
      token: Token,
      ret: boolean;

    const l = tokens.length;
    for (i = 0; i < l; i++) {
      token = tokens[i];

      // Run any renderer extensions
      if (this.options.extensions && this.options.extensions.vueRenderers && this.options.extensions.vueRenderers[token.type]) {
        ret = this.options.extensions.vueRenderers[token.type].call({ parser: this }, token);
        if (ret !== false || !['space', 'hr', 'heading', 'code', 'table', 'blockquote', 'list', 'html', 'paragraph', 'text'].includes(token.type)) {
          out.push(ret);
          continue;
        }
      }

      switch (token.type) {
        case 'space': {
          continue;
        }
        case 'hr': {
          out.push(this.renderer.hr());
          continue;
        }
        case 'heading': {
          out.push(this.renderer.heading(
            this.parseInline(token.tokens),
            token.depth,
            unescape((this.parseInline(token.tokens, this.textRenderer) as any[]).join()),
            this.slugger)
          );
          continue;
        }
        case 'code': {
          out.push(this.renderer.code(token.text,
            token.lang,
            token.escaped)
          );
          continue;
        }
        case 'table': {
          let cell: any[] = [],
            header: any[] = [],
            body: any[] = [],
            row: string | any[],
            l2: number,
            l3: number;


          // header
          l2 = token.header.length;
          for (j = 0; j < l2; j++) {
            cell.push(this.renderer.tablecell(
              this.parseInline(token.header[j].tokens),
              { header: true, align: token.align[j] }
            ));
          }   
          header.push(this.renderer.tablerow(cell));

          //body
          l2 = token.rows.length;
          for (j = 0; j < l2; j++) {
            row = token.rows[j];

            cell = [];
            l3 = row.length;
            for (k = 0; k < l3; k++) {
              cell.push(this.renderer.tablecell(
                this.parseInline(row[k].tokens),
                { header: false, align: token.align[k] }
              ));
            }

            body.push(this.renderer.tablerow(cell));
          }
          out.push(this.renderer.table(header, body));
          continue;
        }
        case 'blockquote': {
          let body: any[] = [];
          body = this.parse(token.tokens);
          out.push(this.renderer.blockquote(body));
          continue;
        }
        case 'list': {
          let body: any[] = [],
            l2: number = token.items.length,
            ordered: any = token.ordered,
            start: any = token.start,
            loose: boolean = token.loose,
            checkbox: VNode,
            checked: any,
            itemBody: any[] = [],
            item: { checked: any; task: any; tokens: any },
            task: any;

          for (j = 0; j < l2; j++) {
            item = token.items[j];
            checked = item.checked;
            task = item.task;

            itemBody = []
            if (item.task) {
              checkbox = this.renderer.checkbox(checked);
              if (loose) {
                if (item.tokens.length > 0 && item.tokens[0].type === 'paragraph') {
                  item.tokens[0].text = checkbox + ' ' + item.tokens[0].text;
                  if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === 'text') {
                    item.tokens[0].tokens[0].text = checkbox + ' ' + item.tokens[0].tokens[0].text;
                  }
                } else {
                  item.tokens.unshift({
                    type: 'text',
                    text: checkbox
                  });
                }
              } else {
                itemBody.push(checkbox);
              }
            }
            itemBody.push(...this.parse(item.tokens, loose));
            body.push(this.renderer.listitem(itemBody, task, checked));
          }
          out.push(this.renderer.list(body, ordered, start));
          continue;
        }
        case 'list_item': {
          let itemBody: any[] = [],
              loose: boolean = token.loose,
              item = token,
              checked = token.checked,
              task: any = item.task;
          itemBody.push(...this.parse(item.tokens, loose));
          out.push(this.renderer.listitem(itemBody, task, checked))
          
          continue;
        }
        case 'html': {
          // TODO parse inline content if parameter markdown=1
          out.push(this.renderer.html(token.text));
          continue;
        }
        case 'paragraph': {
          out.push(this.renderer.paragraph(this.parseInline(token.tokens)));
          continue;
        }
        case 'text': {
          let body: any[] = [token.tokens && token.tokens.length > 0 ? this.parseInline(token.tokens) : token.text];
          while (i + 1 < l && tokens[i + 1].type === 'text') {
            token = tokens[++i];
            body.push((token.tokens ? this.parseInline(token.tokens) : token.text));
          }
          
          if(top) out.push(this.renderer.paragraph(body))
          else {
            out.push(...body)
          }
          continue;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }

    return out;
  }

  /**
   * Parse Inline Tokens
   */
  parseInline(tokens: string | any[], renderer = null): any[]{
    renderer = renderer || this.renderer;
    const htmlRenderer = new Renderer()
    let out = [],
      i: number,
      token: {
        raw: string; type: string; text: string; href: any; title: any; tokens: any; 
      },
      ret: boolean,
      tagStack=[],
      tag='',
      html='';

    const l = tokens.length;
    for (i = 0; i < l; i++) {
      token = tokens[i];

      // Run any renderer extensions
      if (this.options.extensions && this.options.extensions.vueRenderers && this.options.extensions.vueRenderers[token.type]) {
        ret = this.options.extensions.vueRenderers[token.type].call({ parser: this }, token);
        if (ret !== false || !['escape', 'html', 'link', 'image', 'strong', 'em', 'codespan', 'br', 'del', 'text'].includes(token.type)) {
          out.push(ret);
          continue;
        }
      }

      switch (token.type) {
        case 'escape': {
          if(tagStack.length!=0){ 
            html += htmlRenderer.text(token.raw)
            break;
          }
          out.push(renderer.text(token.text));
          break;
        }
        case 'html': {
          //close tag
          if(token.raw.startsWith("</")){
            if(tag == token.raw.replace(/(^<\/?)|(\/?>$)/g,'')) tagStack.pop()
            
            if(tagStack.length == 0) {
              out.push(renderer.inlineHtml(html));
              html = ''
            }
          }else{//open tag
            if(token.raw.endsWith("/>")){
              html += token.text
              break;
            }
            tag = token.raw.replace(/(^<\/?)|(\/?>$)/g,'')
            html += token.text
            tagStack.push(token)
          }
          break;
        }
        case 'link': {
          if(tagStack.length!=0){ 
            html += htmlRenderer.text(token.raw)
            break;
          }
          out.push(renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer)));
          break;
        }
        case 'image': {
          if(tagStack.length!=0){ 
            html += htmlRenderer.text(token.raw)
            break;
          }
          out.push(renderer.image(token.href, token.title, token.text));
          break;
        }
        case 'strong': {
          if(tagStack.length!=0){ 
            html += htmlRenderer.text(token.raw)
            break;
          }
          out.push(renderer.strong(this.parseInline(token.tokens, renderer)));
          break;
        }
        case 'em': {
          if(tagStack.length!=0){ 
            html += htmlRenderer.text(token.raw)
            break;
          }
          out.push(renderer.em(this.parseInline(token.tokens, renderer)));
          break;
        }
        case 'codespan': {
          if(tagStack.length!=0){ 
            html += htmlRenderer.text(token.raw)
            break;
          }
          out.push(renderer.codespan(token.text));
          break;
        }
        case 'br': {
          if(tagStack.length!=0){ 
            html += htmlRenderer.text(token.raw)
            break;
          }
          out.push(renderer.br());
          break;
        }
        case 'del': {
          if(tagStack.length!=0){ 
            html += htmlRenderer.text(token.raw)
            break;
          }
          out.push(renderer.del(this.parseInline(token.tokens, renderer)));
          break;
        }
        case 'text': {
          if(tagStack.length!=0){ 
            html += htmlRenderer.text(token.raw)
            break;
          }
          out.push(renderer.text(token.raw));
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }

    if(tagStack.length>0){
      out.push(renderer.inlineHtml(html));
      html = ''
    }
    html = ''
    return out;
  }
}

export {VueParser}