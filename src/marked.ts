import { Lexer } from './marked/Lexer.js';
import { Parser } from './marked/Parser.js';
import { Tokenizer } from './marked/Tokenizer.js';
import { Renderer } from './marked/Renderer.js';
import { TextRenderer } from './marked/TextRenderer.js';
import { Slugger } from './marked/Slugger.js';
import {
  merge,
  checkSanitizeDeprecation,
  escape
} from './marked/helpers.js';
import {
  getDefaults,
  changeDefaults,
  defaults
} from './marked/defaults.js';

import { VueRenderer } from './VueRenderer.js';
import { VueParser } from './VueParser.js';
import { VNode } from 'vue';



function onError(e: { message: string; },silent:boolean) {
  e.message += '\nPlease report this to https://github.com/markedjs/marked.';
  if (silent) {
    return '<p>An error occurred:</p><pre>'
      + escape(e.message + '', true)
      + '</pre>';
  }
  throw e;
}


/**
 * Marked
 */
export function marked(src: string, opt?: any, callback?: Function) {
  // throw error in case of non string input
  if (typeof src === 'undefined' || src === null) {
    throw new Error('marked(): input parameter is undefined or null');
  }
  if (typeof src !== 'string') {
    throw new Error('marked(): input parameter is of type '
      + Object.prototype.toString.call(src) + ', string expected');
  }

  if (typeof opt === 'function') {
    callback = opt;
    opt = null;
  }

  opt = merge({}, marked.defaults, opt || {});
  checkSanitizeDeprecation(opt);

  if (callback) {
    const highlight = opt.highlight;
    let tokens: string | any[];

    try {
      tokens = Lexer.lex(src, opt);
    } catch (e) {
      return callback(e);
    }

    const done = function (err?:any) {
      let out: string | (VNode | string)[];

      if (!err) {
        try {
          if (opt.walkTokens) {
            marked.walkTokens(tokens, opt.walkTokens);
          }
          if(opt.isVNodeModel){
            out = VueParser.parse(tokens,opt)
          }else{
            out = Parser.parse(tokens, opt);
          }
        } catch (e) {
          err = e;
        }
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!tokens.length) return done();

    let pending = 0;
    marked.walkTokens(tokens, function (token: { type: string; text: any; lang: any; escaped: boolean; }) {
      if (token.type === 'code') {
        pending++;
        setTimeout(() => {
          highlight(token.text, token.lang, function (err: any, code: any) {
            if (err) {
              return done(err);
            }
            if (code != null && code !== token.text) {
              token.text = code;
              token.escaped = true;
            }

            pending--;
            if (pending === 0) {
              done();
            }
          });
        }, 0);
      }
    });

    if (pending === 0) {
      done();
    }

    return;
  }



  try {
    const tokens = Lexer.lex(src, opt);
    if (opt.walkTokens) {
      if (opt.async) {
        return Promise.all(marked.walkTokens(tokens, opt.walkTokens))
          .then(() => {
            if(opt.isVNodeModel){
              return VueParser.parse(tokens, opt)
            }
            return Parser.parse(tokens, opt);
          })
          .catch(e=>onError(e,opt.silent));
      }
      marked.walkTokens(tokens, opt.walkTokens);
    }
    if(opt.isVNodeModel){
      return VueParser.parse(tokens, opt)
    }
    return Parser.parse(tokens, opt);
  } catch (e) {
    onError(e,opt.silent);
  }
}

/**
 * Options
 */

marked.options =
  marked.setOptions = function (opt: any) {
    merge(marked.defaults, opt);
    changeDefaults(marked.defaults);
    return marked;
  };

marked.getDefaults = getDefaults;

marked.defaults = defaults;

/**
 * Use Extension
 */

marked.use = function (...args: any[]) {
  const extensions = marked.defaults.extensions || { renderers: {}, vueRenderers: {}, childTokens: {} };

  args.forEach((pack) => {
    // copy options to new object
    const opts = merge({}, pack);

    // set async to true if it was set to true before
    opts.async = marked.defaults.async || opts.async;

    // ==-- Parse "addon" extensions --== //
    if (pack.extensions) {
      pack.extensions.forEach((ext: { name: string | number; renderer: Function; vueRenderer: Function; tokenizer: Function; level: string; start: Function; childTokens: any; }) => {
        if (!ext.name) {
          throw new Error('extension name required');
        }
        if (ext.renderer) { // Renderer extensions
          const prevRenderer = extensions.renderers[ext.name];
          if (prevRenderer) {
            // Replace extension with func to run new extension but fall back if false
            extensions.renderers[ext.name] = function (...args: any) {
              let ret = ext.renderer.apply(this, args);
              if (ret === false) {
                ret = prevRenderer.apply(this, args);
              }
              return ret;
            };
          } else {
            extensions.renderers[ext.name] = ext.renderer;
          }
        }
        if (ext.vueRenderer) { // vueRenderer extensions
          const prevRenderer = extensions.vueRenderers[ext.name];
          if (prevRenderer) {
            // Replace extension with func to run new extension but fall back if false
            extensions.vueRenderers[ext.name] = function (...args: any) {
              let ret = ext.vueRenderer.apply(this, args);
              if (ret === false) {
                ret = prevRenderer.apply(this, args);
              }
              return ret;
            };
          } else {
            extensions.vueRenderers[ext.name] = ext.vueRenderer;
          }
        }
        if (ext.tokenizer) { // Tokenizer Extensions
          if (!ext.level || (ext.level !== 'block' && ext.level !== 'inline')) {
            throw new Error("extension level must be 'block' or 'inline'");
          }
          if (extensions[ext.level]) {
            extensions[ext.level].unshift(ext.tokenizer);
          } else {
            extensions[ext.level] = [ext.tokenizer];
          }
          if (ext.start) { // Function to check for start of token
            if (ext.level === 'block') {
              if (extensions.startBlock) {
                extensions.startBlock.push(ext.start);
              } else {
                extensions.startBlock = [ext.start];
              }
            } else if (ext.level === 'inline') {
              if (extensions.startInline) {
                extensions.startInline.push(ext.start);
              } else {
                extensions.startInline = [ext.start];
              }
            }
          }
        }
        if (ext.childTokens) { // Child tokens to be visited by walkTokens
          extensions.childTokens[ext.name] = ext.childTokens;
        }
      });
      opts.extensions = extensions;
    }

    // ==-- Parse "overwrite" extensions --== //
    if (pack.renderer) {
      const renderer = marked.defaults.renderer || new Renderer();
      for (const prop in pack.renderer) {
        const prevRenderer = renderer[prop];
        // Replace renderer with func to run extension, but fall back if false
        renderer[prop] = (...args: any) => {
          let ret = pack.renderer[prop].apply(renderer, args);
          if (ret === false) {
            ret = prevRenderer.apply(renderer, args);
          }
          return ret;
        };
      }
      opts.renderer = renderer;
    }

    if (pack.vueRenderer) {
      const vueRenderer = marked.defaults.vueRenderer || new VueRenderer();
      for (const prop in pack.vueRenderer) {
        const prevRenderer = vueRenderer[prop];
        // Replace renderer with func to run extension, but fall back if false
        vueRenderer[prop] = (...args: any) => {
          let ret = pack.vueRenderer[prop].apply(vueRenderer, args);
          if (ret === false) {
            ret = prevRenderer.apply(vueRenderer, args);
          }
          return ret;
        };
      }
      opts.vueRenderer = vueRenderer;
    }

    if (pack.tokenizer) {
      const tokenizer = marked.defaults.tokenizer || new Tokenizer();
      for (const prop in pack.tokenizer) {
        const prevTokenizer = tokenizer[prop];
        // Replace tokenizer with func to run extension, but fall back if false
        tokenizer[prop] = (...args: any) => {
          let ret = pack.tokenizer[prop].apply(tokenizer, args);
          if (ret === false) {
            ret = prevTokenizer.apply(tokenizer, args);
          }
          return ret;
        };
      }
      opts.tokenizer = tokenizer;
    }

    // ==-- Parse WalkTokens extensions --== //
    if (pack.walkTokens) {
      const walkTokens = marked.defaults.walkTokens;
      opts.walkTokens = function (token: any) {
        let values = [];
        values.push(pack.walkTokens.call(this, token));
        if (walkTokens) {
          values = values.concat(walkTokens.call(this, token));
        }
        return values;
      };
    }

    marked.setOptions(opts);
  });
};

/**
 * Run callback for every token
 */

marked.walkTokens = function (tokens: any, callback: Function) {
  let values = [];
  for (const token of tokens) {
    values = values.concat(callback.call(marked, token));
    switch (token.type) {
      case 'table': {
        for (const cell of token.header) {
          values = values.concat(marked.walkTokens(cell.tokens, callback));
        }
        for (const row of token.rows) {
          for (const cell of row) {
            values = values.concat(marked.walkTokens(cell.tokens, callback));
          }
        }
        break;
      }
      case 'list': {
        values = values.concat(marked.walkTokens(token.items, callback));
        break;
      }
      default: {
        if (marked.defaults.extensions && marked.defaults.extensions.childTokens && marked.defaults.extensions.childTokens[token.type]) { // Walk any extensions
          marked.defaults.extensions.childTokens[token.type].forEach(function (childTokens: string | number) {
            values = values.concat(marked.walkTokens(token[childTokens], callback));
          });
        } else if (token.tokens) {
          values = values.concat(marked.walkTokens(token.tokens, callback));
        }
      }
    }
  }
  return values;
};

/**
 * Parse Inline
 * @param {string} src
 */
marked.parseInline = function (src: string, opt?: any) {
  // throw error in case of non string input
  if (typeof src === 'undefined' || src === null) {
    throw new Error('marked.parseInline(): input parameter is undefined or null');
  }
  if (typeof src !== 'string') {
    throw new Error('marked.parseInline(): input parameter is of type '
      + Object.prototype.toString.call(src) + ', string expected');
  }

  opt = merge({}, marked.defaults, opt || {});
  checkSanitizeDeprecation(opt);

  try {
    const tokens = Lexer.lexInline(src, opt);
    if (opt.walkTokens) {
      marked.walkTokens(tokens, opt.walkTokens);
    }
    if(opt.isVNodeModel){
      return VueParser.parseInline(tokens,opt)
    }
    return Parser.parseInline(tokens, opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/markedjs/marked.';
    if (opt.silent) {
      return '<p>An error occurred:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
};


marked.parseVNode = function(src: string, opt?: any, callback?: Function){
  return marked(src,Object.assign({isVNodeModel:true},opt),callback)
}

marked.parseInlineVNode = function(src: string, opt: any){
  return marked.parseInline(src,Object.assign({isVNodeModel:true},opt))
}

/**
 * Expose
 */
marked.Parser = Parser;
marked.parser = Parser.parse;
marked.Renderer = Renderer;
marked.TextRenderer = TextRenderer;
marked.Lexer = Lexer;
marked.lexer = Lexer.lex;
marked.Tokenizer = Tokenizer;
marked.Slugger = Slugger;
marked.parse = marked;



//add VueParser
marked.VueParser = VueParser;
marked.vueParser = VueParser.parse;
marked.VueRenderer = VueRenderer;

export const vueParser = VueParser.parse;
export const options = marked.options;
export const setOptions = marked.setOptions;
export const use = marked.use;
export const walkTokens = marked.walkTokens;
export const parseInline = marked.parseInline;
export const parseInlineVNode = marked.parseInlineVNode;
export const parse = marked;
export const parseVNode = marked.parseVNode;
export const parser = Parser.parse;
export const lexer = Lexer.lex;

