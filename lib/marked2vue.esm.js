import { defineComponent, openBlock, createElementBlock, renderSlot, toDisplayString, resolveComponent, createVNode, h } from 'vue';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function getDefaults() {
  return {
    async: false,
    baseUrl: null,
    breaks: false,
    extensions: null,
    gfm: true,
    headerIds: true,
    headerPrefix: '',
    highlight: null,
    langPrefix: 'language-',
    mangle: true,
    pedantic: false,
    renderer: null,
    vueRenderer: null,
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartypants: false,
    tokenizer: null,
    walkTokens: null,
    xhtml: false
  };
}
var defaults = getDefaults();
function changeDefaults(newDefaults) {
  defaults = newDefaults;
}

/**
 * Helpers
 */
var escapeTest = /[&<>"']/;
var escapeReplace = new RegExp(escapeTest.source, 'g');
var escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
var escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, 'g');
var escapeReplacements = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};
var getEscapeReplacement = function getEscapeReplacement(ch) {
  return escapeReplacements[ch];
};
function escape(html, encode) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html;
}
var unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;

/**
 * @param {string} html
 */
function unescape(html) {
  // explicitly match decimal, hex, and named HTML entities
  return html.replace(unescapeTest, function (_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x' ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}
var caret = /(^|[^\[])\^/g;

/**
 * @param {string | RegExp} regex
 * @param {string} opt
 */
function edit(regex, opt) {
  regex = typeof regex === 'string' ? regex : regex.source;
  opt = opt || '';
  var obj = {
    replace: function replace(name, val) {
      val = val.source || val;
      val = val.replace(caret, '$1');
      regex = regex.replace(name, val);
      return obj;
    },
    getRegex: function getRegex() {
      return new RegExp(regex, opt);
    }
  };
  return obj;
}
var nonWordAndColonTest = /[^\w:]/g;
var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

/**
 * @param {boolean} sanitize
 * @param {string} base
 * @param {string} href
 */
function cleanUrl(sanitize, base, href) {
  if (sanitize) {
    var prot;
    try {
      prot = decodeURIComponent(unescape(href)).replace(nonWordAndColonTest, '').toLowerCase();
    } catch (e) {
      return null;
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return null;
    }
  }
  if (base && !originIndependentUrl.test(href)) {
    href = resolveUrl(base, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, '%');
  } catch (e) {
    return null;
  }
  return href;
}
var baseUrls = {};
var justDomain = /^[^:]+:\/*[^/]*$/;
var protocol = /^([^:]+:)[\s\S]*$/;
var domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;

/**
 * @param {string} base
 * @param {string} href
 */
function resolveUrl(base, href) {
  if (!baseUrls[' ' + base]) {
    // we can ignore everything in base after the last slash of its path component,
    // but we might need to add _that_
    // https://tools.ietf.org/html/rfc3986#section-3
    if (justDomain.test(base)) {
      baseUrls[' ' + base] = base + '/';
    } else {
      baseUrls[' ' + base] = rtrim(base, '/', true);
    }
  }
  base = baseUrls[' ' + base];
  var relativeBase = base.indexOf(':') === -1;
  if (href.substring(0, 2) === '//') {
    if (relativeBase) {
      return href;
    }
    return base.replace(protocol, '$1') + href;
  } else if (href.charAt(0) === '/') {
    if (relativeBase) {
      return href;
    }
    return base.replace(domain, '$1') + href;
  } else {
    return base + href;
  }
}
var noopTest = {
  exec: function noopTest() {}
};
function merge(obj) {
  var i = 1,
    target,
    key;
  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }
  return obj;
}
function splitCells(tableRow, count) {
  // ensure that every cell-delimiting pipe has a space
  // before it to distinguish it from an escaped pipe
  var row = tableRow.replace(/\|/g, function (match, offset, str) {
      var escaped = false,
        curr = offset;
      while (--curr >= 0 && str[curr] === '\\') escaped = !escaped;
      if (escaped) {
        // odd number of slashes means | is escaped
        // so we leave it alone
        return '|';
      } else {
        // add space before unescaped |
        return ' |';
      }
    }),
    cells = row.split(/ \|/);
  var i = 0;

  // First/last cell in a row cannot be empty if it has no leading/trailing pipe
  if (!cells[0].trim()) {
    cells.shift();
  }
  if (cells.length > 0 && !cells[cells.length - 1].trim()) {
    cells.pop();
  }
  if (cells.length > count) {
    cells.splice(count);
  } else {
    while (cells.length < count) cells.push('');
  }
  for (; i < cells.length; i++) {
    // leading or trailing whitespace is ignored per the gfm spec
    cells[i] = cells[i].trim().replace(/\\\|/g, '|');
  }
  return cells;
}

/**
 * Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
 * /c*$/ is vulnerable to REDOS.
 *
 * @param {string} str
 * @param {string} c
 * @param {boolean} invert Remove suffix of non-c chars instead. Default falsey.
 */
function rtrim(str, c, invert) {
  var l = str.length;
  if (l === 0) {
    return '';
  }

  // Length of suffix matching the invert condition.
  var suffLen = 0;

  // Step left until we fail to match the invert condition.
  while (suffLen < l) {
    var currChar = str.charAt(l - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }
  return str.slice(0, l - suffLen);
}
function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  var l = str.length;
  var level = 0,
    i = 0;
  for (; i < l; i++) {
    if (str[i] === '\\') {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  return -1;
}
function checkSanitizeDeprecation(opt) {
  if (opt && opt.sanitize && !opt.silent) {
    console.warn('marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options');
  }
}

// copied from https://stackoverflow.com/a/5450113/806777
/**
 * @param {string} pattern
 * @param {number} count
 */
function repeatString(pattern, count) {
  if (count < 1) {
    return '';
  }
  var result = '';
  while (count > 1) {
    if (count & 1) {
      result += pattern;
    }
    count >>= 1;
    pattern += pattern;
  }
  return result + pattern;
}

function outputLink(cap, link, raw, lexer) {
  var href = link.href;
  var title = link.title ? escape(link.title) : null;
  var text = cap[1].replace(/\\([\[\]])/g, '$1');
  if (cap[0].charAt(0) !== '!') {
    lexer.state.inLink = true;
    var token = {
      type: 'link',
      raw: raw,
      href: href,
      title: title,
      text: text,
      tokens: lexer.inlineTokens(text)
    };
    lexer.state.inLink = false;
    return token;
  }
  return {
    type: 'image',
    raw: raw,
    href: href,
    title: title,
    text: escape(text)
  };
}
function indentCodeCompensation(raw, text) {
  var matchIndentToCode = raw.match(/^(\s+)(?:```)/);
  if (matchIndentToCode === null) {
    return text;
  }
  var indentToCode = matchIndentToCode[1];
  return text.split('\n').map(function (node) {
    var matchIndentInNode = node.match(/^\s+/);
    if (matchIndentInNode === null) {
      return node;
    }
    var _matchIndentInNode = _slicedToArray(matchIndentInNode, 1),
      indentInNode = _matchIndentInNode[0];
    if (indentInNode.length >= indentToCode.length) {
      return node.slice(indentToCode.length);
    }
    return node;
  }).join('\n');
}

/**
 * Tokenizer
 */
var Tokenizer = /*#__PURE__*/function () {
  function Tokenizer(options) {
    _classCallCheck(this, Tokenizer);
    this.options = options || defaults;
  }
  _createClass(Tokenizer, [{
    key: "space",
    value: function space(src) {
      var cap = this.rules.block.newline.exec(src);
      if (cap && cap[0].length > 0) {
        return {
          type: 'space',
          raw: cap[0]
        };
      }
    }
  }, {
    key: "code",
    value: function code(src) {
      var cap = this.rules.block.code.exec(src);
      if (cap) {
        var text = cap[0].replace(/^ {1,4}/gm, '');
        return {
          type: 'code',
          raw: cap[0],
          codeBlockStyle: 'indented',
          text: !this.options.pedantic ? rtrim(text, '\n') : text
        };
      }
    }
  }, {
    key: "fences",
    value: function fences(src) {
      var cap = this.rules.block.fences.exec(src);
      if (cap) {
        var raw = cap[0];
        var text = indentCodeCompensation(raw, cap[3] || '');
        return {
          type: 'code',
          raw: raw,
          lang: cap[2] ? cap[2].trim().replace(this.rules.inline._escapes, '$1') : cap[2],
          text: text
        };
      }
    }
  }, {
    key: "heading",
    value: function heading(src) {
      var cap = this.rules.block.heading.exec(src);
      if (cap) {
        var text = cap[2].trim();

        // remove trailing #s
        if (/#$/.test(text)) {
          var trimmed = rtrim(text, '#');
          if (this.options.pedantic) {
            text = trimmed.trim();
          } else if (!trimmed || / $/.test(trimmed)) {
            // CommonMark requires space before trailing #s
            text = trimmed.trim();
          }
        }
        return {
          type: 'heading',
          raw: cap[0],
          depth: cap[1].length,
          text: text,
          tokens: this.lexer.inline(text)
        };
      }
    }
  }, {
    key: "hr",
    value: function hr(src) {
      var cap = this.rules.block.hr.exec(src);
      if (cap) {
        return {
          type: 'hr',
          raw: cap[0]
        };
      }
    }
  }, {
    key: "blockquote",
    value: function blockquote(src) {
      var cap = this.rules.block.blockquote.exec(src);
      if (cap) {
        var text = cap[0].replace(/^ *>[ \t]?/gm, '');
        var top = this.lexer.state.top;
        this.lexer.state.top = true;
        var tokens = this.lexer.blockTokens(text);
        this.lexer.state.top = top;
        return {
          type: 'blockquote',
          raw: cap[0],
          tokens: tokens,
          text: text
        };
      }
    }
  }, {
    key: "list",
    value: function list(src) {
      var cap = this.rules.block.list.exec(src);
      if (cap) {
        var raw, istask, ischecked, indent, i, blankLine, endsWithBlankLine, line, nextLine, rawLine, itemContents, endEarly;
        var bull = cap[1].trim();
        var isordered = bull.length > 1;
        var list = {
          type: 'list',
          raw: '',
          ordered: isordered,
          start: isordered ? +bull.slice(0, -1) : '',
          loose: false,
          items: []
        };
        bull = isordered ? "\\d{1,9}\\".concat(bull.slice(-1)) : "\\".concat(bull);
        if (this.options.pedantic) {
          bull = isordered ? bull : '[*+-]';
        }

        // Get next list item
        var itemRegex = new RegExp("^( {0,3}".concat(bull, ")((?:[\t ][^\\n]*)?(?:\\n|$))"));

        // Check if current bullet point can start a new List Item
        while (src) {
          endEarly = false;
          if (!(cap = itemRegex.exec(src))) {
            break;
          }
          if (this.rules.block.hr.test(src)) {
            // End list if bullet was actually HR (possibly move into itemRegex?)
            break;
          }
          raw = cap[0];
          src = src.substring(raw.length);
          line = cap[2].split('\n', 1)[0].replace(/^\t+/, function (t) {
            return ' '.repeat(3 * t.length);
          });
          nextLine = src.split('\n', 1)[0];
          if (this.options.pedantic) {
            indent = 2;
            itemContents = line.trimLeft();
          } else {
            indent = cap[2].search(/[^ ]/); // Find first non-space char
            indent = indent > 4 ? 1 : indent; // Treat indented code blocks (> 4 spaces) as having only 1 indent
            itemContents = line.slice(indent);
            indent += cap[1].length;
          }
          blankLine = false;
          if (!line && /^ *$/.test(nextLine)) {
            // Items begin with at most one blank line
            raw += nextLine + '\n';
            src = src.substring(nextLine.length + 1);
            endEarly = true;
          }
          if (!endEarly) {
            var nextBulletRegex = new RegExp("^ {0,".concat(Math.min(3, indent - 1), "}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))"));
            var hrRegex = new RegExp("^ {0,".concat(Math.min(3, indent - 1), "}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)"));
            var fencesBeginRegex = new RegExp("^ {0,".concat(Math.min(3, indent - 1), "}(?:```|~~~)"));
            var headingBeginRegex = new RegExp("^ {0,".concat(Math.min(3, indent - 1), "}#"));

            // Check if following lines should be included in List Item
            while (src) {
              rawLine = src.split('\n', 1)[0];
              nextLine = rawLine;

              // Re-align to follow commonmark nesting rules
              if (this.options.pedantic) {
                nextLine = nextLine.replace(/^ {1,4}(?=( {4})*[^ ])/g, '  ');
              }

              // End list item if found code fences
              if (fencesBeginRegex.test(nextLine)) {
                break;
              }

              // End list item if found start of new heading
              if (headingBeginRegex.test(nextLine)) {
                break;
              }

              // End list item if found start of new bullet
              if (nextBulletRegex.test(nextLine)) {
                break;
              }

              // Horizontal rule found
              if (hrRegex.test(src)) {
                break;
              }
              if (nextLine.search(/[^ ]/) >= indent || !nextLine.trim()) {
                // Dedent if possible
                itemContents += '\n' + nextLine.slice(indent);
              } else {
                // not enough indentation
                if (blankLine) {
                  break;
                }

                // paragraph continuation unless last line was a different block level element
                if (line.search(/[^ ]/) >= 4) {
                  // indented code block
                  break;
                }
                if (fencesBeginRegex.test(line)) {
                  break;
                }
                if (headingBeginRegex.test(line)) {
                  break;
                }
                if (hrRegex.test(line)) {
                  break;
                }
                itemContents += '\n' + nextLine;
              }
              if (!blankLine && !nextLine.trim()) {
                // Check if current line is blank
                blankLine = true;
              }
              raw += rawLine + '\n';
              src = src.substring(rawLine.length + 1);
              line = nextLine.slice(indent);
            }
          }
          if (!list.loose) {
            // If the previous item ended with a blank line, the list is loose
            if (endsWithBlankLine) {
              list.loose = true;
            } else if (/\n *\n *$/.test(raw)) {
              endsWithBlankLine = true;
            }
          }

          // Check for task list items
          if (this.options.gfm) {
            istask = /^\[[ xX]\] /.exec(itemContents);
            if (istask) {
              ischecked = istask[0] !== '[ ] ';
              itemContents = itemContents.replace(/^\[[ xX]\] +/, '');
            }
          }
          list.items.push({
            type: 'list_item',
            raw: raw,
            task: !!istask,
            checked: ischecked,
            loose: false,
            text: itemContents
          });
          list.raw += raw;
        }

        // Do not consume newlines at end of final item. Alternatively, make itemRegex *start* with any newlines to simplify/speed up endsWithBlankLine logic
        list.items[list.items.length - 1].raw = raw.trimRight();
        list.items[list.items.length - 1].text = itemContents.trimRight();
        list.raw = list.raw.trimRight();
        var l = list.items.length;

        // Item child tokens handled here at end because we needed to have the final item to trim it first
        for (i = 0; i < l; i++) {
          this.lexer.state.top = false;
          list.items[i].tokens = this.lexer.blockTokens(list.items[i].text, []);
          if (!list.loose) {
            // Check if list should be loose
            var spacers = list.items[i].tokens.filter(function (t) {
              return t.type === 'space';
            });
            var hasMultipleLineBreaks = spacers.length > 0 && spacers.some(function (t) {
              return /\n.*\n/.test(t.raw);
            });
            list.loose = hasMultipleLineBreaks;
          }
        }

        // Set all items to loose if list is loose
        if (list.loose) {
          for (i = 0; i < l; i++) {
            list.items[i].loose = true;
          }
        }
        return list;
      }
    }
  }, {
    key: "html",
    value: function html(src) {
      var cap = this.rules.block.html.exec(src);
      if (cap) {
        var token = {
          type: 'html',
          raw: cap[0],
          pre: !this.options.sanitizer && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
          text: cap[0]
        };
        if (this.options.sanitize) {
          var text = this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]);
          token.type = 'paragraph';
          token.text = text;
          token.tokens = this.lexer.inline(text);
        }
        return token;
      }
    }
  }, {
    key: "def",
    value: function def(src) {
      var cap = this.rules.block.def.exec(src);
      if (cap) {
        var tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
        var href = cap[2] ? cap[2].replace(/^<(.*)>$/, '$1').replace(this.rules.inline._escapes, '$1') : '';
        var title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline._escapes, '$1') : cap[3];
        return {
          type: 'def',
          tag: tag,
          raw: cap[0],
          href: href,
          title: title
        };
      }
    }
  }, {
    key: "table",
    value: function table(src) {
      var cap = this.rules.block.table.exec(src);
      if (cap) {
        var item = {
          type: 'table',
          header: splitCells(cap[1]).map(function (c) {
            return {
              text: c
            };
          }),
          align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
          rows: cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, '').split('\n') : []
        };
        if (item.header.length === item.align.length) {
          item.raw = cap[0];
          var l = item.align.length;
          var i, j, k, row;
          for (i = 0; i < l; i++) {
            if (/^ *-+: *$/.test(item.align[i])) {
              item.align[i] = 'right';
            } else if (/^ *:-+: *$/.test(item.align[i])) {
              item.align[i] = 'center';
            } else if (/^ *:-+ *$/.test(item.align[i])) {
              item.align[i] = 'left';
            } else {
              item.align[i] = null;
            }
          }
          l = item.rows.length;
          for (i = 0; i < l; i++) {
            item.rows[i] = splitCells(item.rows[i], item.header.length).map(function (c) {
              return {
                text: c
              };
            });
          }

          // parse child tokens inside headers and cells

          // header child tokens
          l = item.header.length;
          for (j = 0; j < l; j++) {
            item.header[j].tokens = this.lexer.inline(item.header[j].text);
          }

          // cell child tokens
          l = item.rows.length;
          for (j = 0; j < l; j++) {
            row = item.rows[j];
            for (k = 0; k < row.length; k++) {
              row[k].tokens = this.lexer.inline(row[k].text);
            }
          }
          return item;
        }
      }
    }
  }, {
    key: "lheading",
    value: function lheading(src) {
      var cap = this.rules.block.lheading.exec(src);
      if (cap) {
        return {
          type: 'heading',
          raw: cap[0],
          depth: cap[2].charAt(0) === '=' ? 1 : 2,
          text: cap[1],
          tokens: this.lexer.inline(cap[1])
        };
      }
    }
  }, {
    key: "paragraph",
    value: function paragraph(src) {
      var cap = this.rules.block.paragraph.exec(src);
      if (cap) {
        var text = cap[1].charAt(cap[1].length - 1) === '\n' ? cap[1].slice(0, -1) : cap[1];
        return {
          type: 'paragraph',
          raw: cap[0],
          text: text,
          tokens: this.lexer.inline(text)
        };
      }
    }
  }, {
    key: "text",
    value: function text(src) {
      var cap = this.rules.block.text.exec(src);
      if (cap) {
        return {
          type: 'text',
          raw: cap[0],
          text: cap[0],
          tokens: this.lexer.inline(cap[0])
        };
      }
    }
  }, {
    key: "escape",
    value: function escape$1(src) {
      var cap = this.rules.inline.escape.exec(src);
      if (cap) {
        return {
          type: 'escape',
          raw: cap[0],
          text: escape(cap[1])
        };
      }
    }
  }, {
    key: "tag",
    value: function tag(src) {
      var cap = this.rules.inline.tag.exec(src);
      if (cap) {
        if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
          this.lexer.state.inLink = true;
        } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
          this.lexer.state.inLink = false;
        }
        if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          this.lexer.state.inRawBlock = true;
        } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          this.lexer.state.inRawBlock = false;
        }
        return {
          type: this.options.sanitize ? 'text' : 'html',
          raw: cap[0],
          inLink: this.lexer.state.inLink,
          inRawBlock: this.lexer.state.inRawBlock,
          text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0]
        };
      }
    }
  }, {
    key: "link",
    value: function link(src) {
      var cap = this.rules.inline.link.exec(src);
      if (cap) {
        var trimmedUrl = cap[2].trim();
        if (!this.options.pedantic && /^</.test(trimmedUrl)) {
          // commonmark requires matching angle brackets
          if (!/>$/.test(trimmedUrl)) {
            return;
          }

          // ending angle bracket cannot be escaped
          var rtrimSlash = rtrim(trimmedUrl.slice(0, -1), '\\');
          if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
            return;
          }
        } else {
          // find closing parenthesis
          var lastParenIndex = findClosingBracket(cap[2], '()');
          if (lastParenIndex > -1) {
            var start = cap[0].indexOf('!') === 0 ? 5 : 4;
            var linkLen = start + cap[1].length + lastParenIndex;
            cap[2] = cap[2].substring(0, lastParenIndex);
            cap[0] = cap[0].substring(0, linkLen).trim();
            cap[3] = '';
          }
        }
        var href = cap[2];
        var title = '';
        if (this.options.pedantic) {
          // split pedantic href and title
          var link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
          if (link) {
            href = link[1];
            title = link[3];
          }
        } else {
          title = cap[3] ? cap[3].slice(1, -1) : '';
        }
        href = href.trim();
        if (/^</.test(href)) {
          if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
            // pedantic allows starting angle bracket without ending angle bracket
            href = href.slice(1);
          } else {
            href = href.slice(1, -1);
          }
        }
        return outputLink(cap, {
          href: href ? href.replace(this.rules.inline._escapes, '$1') : href,
          title: title ? title.replace(this.rules.inline._escapes, '$1') : title
        }, cap[0], this.lexer);
      }
    }
  }, {
    key: "reflink",
    value: function reflink(src, links) {
      var cap;
      if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
        var link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
        link = links[link.toLowerCase()];
        if (!link) {
          var text = cap[0].charAt(0);
          return {
            type: 'text',
            raw: text,
            text: text
          };
        }
        return outputLink(cap, link, cap[0], this.lexer);
      }
    }
  }, {
    key: "emStrong",
    value: function emStrong(src, maskedSrc) {
      var prevChar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var match = this.rules.inline.emStrong.lDelim.exec(src);
      if (!match) return;

      // _ can't be between two alphanumerics. \p{L}\p{N} includes non-english alphabet/numbers as well
      if (match[3] && prevChar.match(/(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDF70-\uDF81\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF30-\uDF3B\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDF50-\uDF59\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD834[\uDEC0-\uDED3\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD839[\uDCD0-\uDCEB\uDCF0-\uDCF9\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])/)) return;
      var nextChar = match[1] || match[2] || '';
      if (!nextChar || nextChar && (prevChar === '' || this.rules.inline.punctuation.exec(prevChar))) {
        var lLength = match[0].length - 1;
        var rDelim,
          rLength,
          delimTotal = lLength,
          midDelimTotal = 0;
        var endReg = match[0][0] === '*' ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
        endReg.lastIndex = 0;

        // Clip maskedSrc to same section of string as src (move to lexer?)
        maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
        while ((match = endReg.exec(maskedSrc)) != null) {
          rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
          if (!rDelim) continue; // skip single * in __abc*abc__

          rLength = rDelim.length;
          if (match[3] || match[4]) {
            // found another Left Delim
            delimTotal += rLength;
            continue;
          } else if (match[5] || match[6]) {
            // either Left or Right Delim
            if (lLength % 3 && !((lLength + rLength) % 3)) {
              midDelimTotal += rLength;
              continue; // CommonMark Emphasis Rules 9-10
            }
          }

          delimTotal -= rLength;
          if (delimTotal > 0) continue; // Haven't found enough closing delimiters

          // Remove extra characters. *a*** -> *a*
          rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
          var raw = src.slice(0, lLength + match.index + (match[0].length - rDelim.length) + rLength);

          // Create `em` if smallest delimiter has odd char count. *a***
          if (Math.min(lLength, rLength) % 2) {
            var _text = raw.slice(1, -1);
            return {
              type: 'em',
              raw: raw,
              text: _text,
              tokens: this.lexer.inlineTokens(_text)
            };
          }

          // Create 'strong' if smallest delimiter has even char count. **a***
          var text = raw.slice(2, -2);
          return {
            type: 'strong',
            raw: raw,
            text: text,
            tokens: this.lexer.inlineTokens(text)
          };
        }
      }
    }
  }, {
    key: "codespan",
    value: function codespan(src) {
      var cap = this.rules.inline.code.exec(src);
      if (cap) {
        var text = cap[2].replace(/\n/g, ' ');
        var hasNonSpaceChars = /[^ ]/.test(text);
        var hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
        if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
          text = text.substring(1, text.length - 1);
        }
        text = escape(text, true);
        return {
          type: 'codespan',
          raw: cap[0],
          text: text
        };
      }
    }
  }, {
    key: "br",
    value: function br(src) {
      var cap = this.rules.inline.br.exec(src);
      if (cap) {
        return {
          type: 'br',
          raw: cap[0]
        };
      }
    }
  }, {
    key: "del",
    value: function del(src) {
      var cap = this.rules.inline.del.exec(src);
      if (cap) {
        return {
          type: 'del',
          raw: cap[0],
          text: cap[2],
          tokens: this.lexer.inlineTokens(cap[2])
        };
      }
    }
  }, {
    key: "autolink",
    value: function autolink(src, mangle) {
      var cap = this.rules.inline.autolink.exec(src);
      if (cap) {
        var text, href;
        if (cap[2] === '@') {
          text = escape(this.options.mangle ? mangle(cap[1]) : cap[1]);
          href = 'mailto:' + text;
        } else {
          text = escape(cap[1]);
          href = text;
        }
        return {
          type: 'link',
          raw: cap[0],
          text: text,
          href: href,
          tokens: [{
            type: 'text',
            raw: text,
            text: text
          }]
        };
      }
    }
  }, {
    key: "url",
    value: function url(src, mangle) {
      var cap;
      if (cap = this.rules.inline.url.exec(src)) {
        var text, href;
        if (cap[2] === '@') {
          text = escape(this.options.mangle ? mangle(cap[0]) : cap[0]);
          href = 'mailto:' + text;
        } else {
          // do extended autolink path validation
          var prevCapZero;
          do {
            prevCapZero = cap[0];
            cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
          } while (prevCapZero !== cap[0]);
          text = escape(cap[0]);
          if (cap[1] === 'www.') {
            href = 'http://' + cap[0];
          } else {
            href = cap[0];
          }
        }
        return {
          type: 'link',
          raw: cap[0],
          text: text,
          href: href,
          tokens: [{
            type: 'text',
            raw: text,
            text: text
          }]
        };
      }
    }
  }, {
    key: "inlineText",
    value: function inlineText(src, smartypants) {
      var cap = this.rules.inline.text.exec(src);
      if (cap) {
        var text;
        if (this.lexer.state.inRawBlock) {
          text = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0];
        } else {
          text = escape(this.options.smartypants ? smartypants(cap[0]) : cap[0]);
        }
        return {
          type: 'text',
          raw: cap[0],
          text: text
        };
      }
    }
  }]);
  return Tokenizer;
}();

/**
 * Block-Level Grammar
 */
var block = {
  newline: /^(?: *(?:\n|$))+/,
  code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
  html: '^ {0,3}(?:' // optional indentation
  + '<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
  + '|comment[^\\n]*(\\n+|$)' // (2)
  + '|<\\?[\\s\\S]*?(?:\\?>\\n*|$)' // (3)
  + '|<![A-Z][\\s\\S]*?(?:>\\n*|$)' // (4)
  + '|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)' // (5)
  + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (6)
  + '|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (7) open tag
  + '|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (7) closing tag
  + ')',
  def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
  table: noopTest,
  lheading: /^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  // regex template, placeholders will be replaced according to different paragraph
  // interruption rules of commonmark and the original markdown spec:
  _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  text: /^[^\n]+/
};
block._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
block.def = edit(block.def).replace('label', block._label).replace('title', block._title).getRegex();
block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
block.listItemStart = edit(/^( *)(bull) */).replace('bull', block.bullet).getRegex();
block.list = edit(block.list).replace(/bull/g, block.bullet).replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))').replace('def', '\\n+(?=' + block.def.source + ')').getRegex();
block._tag = 'address|article|aside|base|basefont|blockquote|body|caption' + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption' + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe' + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option' + '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr' + '|track|ul';
block._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
block.html = edit(block.html, 'i').replace('comment', block._comment).replace('tag', block._tag).replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
block.paragraph = edit(block._paragraph).replace('hr', block.hr).replace('heading', ' {0,3}#{1,6} ').replace('|lheading', '') // setex headings don't interrupt commonmark paragraphs
.replace('|table', '').replace('blockquote', ' {0,3}>').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
.replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)').replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
.getRegex();
block.blockquote = edit(block.blockquote).replace('paragraph', block.paragraph).getRegex();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  table: '^ *([^\\n ].*\\|.*)\\n' // Header
  + ' {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?' // Align
  + '(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)' // Cells
});

block.gfm.table = edit(block.gfm.table).replace('hr', block.hr).replace('heading', ' {0,3}#{1,6} ').replace('blockquote', ' {0,3}>').replace('code', ' {4}[^\\n]').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
.replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)').replace('tag', block._tag) // tables can be interrupted by type (6) html blocks
.getRegex();
block.gfm.paragraph = edit(block._paragraph).replace('hr', block.hr).replace('heading', ' {0,3}#{1,6} ').replace('|lheading', '') // setex headings don't interrupt commonmark paragraphs
.replace('table', block.gfm.table) // interrupt paragraphs with table
.replace('blockquote', ' {0,3}>').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
.replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)').replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
.getRegex();
/**
 * Pedantic grammar (original John Gruber's loose markdown specification)
 */

block.pedantic = merge({}, block.normal, {
  html: edit('^ *(?:comment *(?:\\n|\\s*$)' + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
  + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))').replace('comment', block._comment).replace(/tag/g, '(?!(?:' + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub' + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)' + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b').getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: noopTest,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: edit(block.normal._paragraph).replace('hr', block.hr).replace('heading', ' *#{1,6} *[^\n]').replace('lheading', block.lheading).replace('blockquote', ' {0,3}>').replace('|fences', '').replace('|list', '').replace('|html', '').getRegex()
});

/**
 * Inline-Level Grammar
 */
var inline = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noopTest,
  tag: '^comment' + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
  + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
  + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
  + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
  + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>',
  // CDATA section
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(ref)\]/,
  nolink: /^!?\[(ref)\](?:\[\])?/,
  reflinkSearch: 'reflink|nolink(?!\\()',
  emStrong: {
    lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
    //        (1) and (2) can only be a Right Delimiter. (3) and (4) can only be Left.  (5) and (6) can be either Left or Right.
    //          () Skip orphan inside strong                                      () Consume to delim     (1) #***                (2) a***#, a***                             (3) #***a, ***a                 (4) ***#              (5) #***#                 (6) a***a
    rDelimAst: /^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,
    rDelimUnd: /^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/ // ^- Not allowed for _
  },

  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: noopTest,
  text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  punctuation: /^([\spunctuation])/
};

// list of punctuation marks from CommonMark spec
// without * and _ to handle the different emphasis markers * and _
inline._punctuation = '!"#$%&\'()+\\-.,/:;<=>?@\\[\\]`^{|}~';
inline.punctuation = edit(inline.punctuation).replace(/punctuation/g, inline._punctuation).getRegex();

// sequences em should skip over [title](link), `code`, <html>
inline.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;
// lookbehind is not available on Safari as of version 16
// inline.escapedEmSt = /(?<=(?:^|[^\\)(?:\\[^])*)\\[*_]/g;
inline.escapedEmSt = /(?:^|[^\\])(?:\\\\)*\\[*_]/g;
inline._comment = edit(block._comment).replace('(?:-->|$)', '-->').getRegex();
inline.emStrong.lDelim = edit(inline.emStrong.lDelim).replace(/punct/g, inline._punctuation).getRegex();
inline.emStrong.rDelimAst = edit(inline.emStrong.rDelimAst, 'g').replace(/punct/g, inline._punctuation).getRegex();
inline.emStrong.rDelimUnd = edit(inline.emStrong.rDelimUnd, 'g').replace(/punct/g, inline._punctuation).getRegex();
inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
inline.autolink = edit(inline.autolink).replace('scheme', inline._scheme).replace('email', inline._email).getRegex();
inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
inline.tag = edit(inline.tag).replace('comment', inline._comment).replace('attribute', inline._attribute).getRegex();
inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
inline._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
inline.link = edit(inline.link).replace('label', inline._label).replace('href', inline._href).replace('title', inline._title).getRegex();
inline.reflink = edit(inline.reflink).replace('label', inline._label).replace('ref', block._label).getRegex();
inline.nolink = edit(inline.nolink).replace('ref', block._label).getRegex();
inline.reflinkSearch = edit(inline.reflinkSearch, 'g').replace('reflink', inline.reflink).replace('nolink', inline.nolink).getRegex();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: {
    start: /^__|\*\*/,
    middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    endAst: /\*\*(?!\*)/g,
    endUnd: /__(?!_)/g
  },
  em: {
    start: /^_|\*/,
    middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
    endAst: /\*(?!\*)/g,
    endUnd: /_(?!_)/g
  },
  link: edit(/^!?\[(label)\]\((.*?)\)/).replace('label', inline._label).getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace('label', inline._label).getRegex()
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: edit(inline.escape).replace('])', '~|])').getRegex(),
  _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
});
inline.gfm.url = edit(inline.gfm.url, 'i').replace('email', inline.gfm._extended_email).getRegex();
/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: edit(inline.br).replace('{2,}', '*').getRegex(),
  text: edit(inline.gfm.text).replace('\\b_', '\\b_| {2,}\\n').replace(/\{2,\}/g, '*').getRegex()
});

/**
 * smartypants text replacement
 * @param {string} text
 */
function smartypants(text) {
  return text
  // em-dashes
  .replace(/---/g, "\u2014")
  // en-dashes
  .replace(/--/g, "\u2013")
  // opening singles
  .replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018")
  // closing singles & apostrophes
  .replace(/'/g, "\u2019")
  // opening doubles
  .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C")
  // closing doubles
  .replace(/"/g, "\u201D")
  // ellipses
  .replace(/\.{3}/g, "\u2026");
}

/**
 * mangle email addresses
 * @param {string} text
 */
function mangle(text) {
  var out = '',
    i,
    ch;
  var l = text.length;
  for (i = 0; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }
  return out;
}

/**
 * Block Lexer
 */
var Lexer = /*#__PURE__*/function () {
  function Lexer(options) {
    _classCallCheck(this, Lexer);
    this.tokens = [];
    this.tokens.links = Object.create(null);
    this.options = options || defaults;
    this.options.tokenizer = this.options.tokenizer || new Tokenizer();
    this.tokenizer = this.options.tokenizer;
    this.tokenizer.options = this.options;
    this.tokenizer.lexer = this;
    this.inlineQueue = [];
    this.state = {
      inLink: false,
      inRawBlock: false,
      top: true
    };
    var rules = {
      block: block.normal,
      inline: inline.normal
    };
    if (this.options.pedantic) {
      rules.block = block.pedantic;
      rules.inline = inline.pedantic;
    } else if (this.options.gfm) {
      rules.block = block.gfm;
      if (this.options.breaks) {
        rules.inline = inline.breaks;
      } else {
        rules.inline = inline.gfm;
      }
    }
    this.tokenizer.rules = rules;
  }

  /**
   * Expose Rules
   */
  _createClass(Lexer, [{
    key: "lex",
    value:
    /**
     * Preprocessing
     */
    function lex(src) {
      src = src.replace(/\r\n|\r/g, '\n');
      this.blockTokens(src, this.tokens);
      var next;
      while (next = this.inlineQueue.shift()) {
        this.inlineTokens(next.src, next.tokens);
      }
      return this.tokens;
    }

    /**
     * Lexing
     */
  }, {
    key: "blockTokens",
    value: function blockTokens(src) {
      var _this = this;
      var tokens = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      if (this.options.pedantic) {
        src = src.replace(/\t/g, '    ').replace(/^ +$/gm, '');
      } else {
        src = src.replace(/^( *)(\t+)/gm, function (_, leading, tabs) {
          return leading + '    '.repeat(tabs.length);
        });
      }
      var token, lastToken, cutSrc, lastParagraphClipped;
      var _loop = function _loop() {
        if (_this.options.extensions && _this.options.extensions.block && _this.options.extensions.block.some(function (extTokenizer) {
          if (token = extTokenizer.call({
            lexer: _this
          }, src, tokens)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            return true;
          }
          return false;
        })) {
          return "continue";
        }

        // newline
        if (token = _this.tokenizer.space(src)) {
          src = src.substring(token.raw.length);
          if (token.raw.length === 1 && tokens.length > 0) {
            // if there's a single \n as a spacer, it's terminating the last line,
            // so move it there so that we don't get unecessary paragraph tags
            tokens[tokens.length - 1].raw += '\n';
          } else {
            tokens.push(token);
          }
          return "continue";
        }

        // code
        if (token = _this.tokenizer.code(src)) {
          src = src.substring(token.raw.length);
          lastToken = tokens[tokens.length - 1];
          // An indented code block cannot interrupt a paragraph.
          if (lastToken && (lastToken.type === 'paragraph' || lastToken.type === 'text')) {
            lastToken.raw += '\n' + token.raw;
            lastToken.text += '\n' + token.text;
            _this.inlineQueue[_this.inlineQueue.length - 1].src = lastToken.text;
          } else {
            tokens.push(token);
          }
          return "continue";
        }

        // fences
        if (token = _this.tokenizer.fences(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return "continue";
        }

        // heading
        if (token = _this.tokenizer.heading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return "continue";
        }

        // hr
        if (token = _this.tokenizer.hr(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return "continue";
        }

        // blockquote
        if (token = _this.tokenizer.blockquote(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return "continue";
        }

        // list
        if (token = _this.tokenizer.list(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return "continue";
        }

        // html
        if (token = _this.tokenizer.html(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return "continue";
        }

        // def
        if (token = _this.tokenizer.def(src)) {
          src = src.substring(token.raw.length);
          lastToken = tokens[tokens.length - 1];
          if (lastToken && (lastToken.type === 'paragraph' || lastToken.type === 'text')) {
            lastToken.raw += '\n' + token.raw;
            lastToken.text += '\n' + token.raw;
            _this.inlineQueue[_this.inlineQueue.length - 1].src = lastToken.text;
          } else if (!_this.tokens.links[token.tag]) {
            _this.tokens.links[token.tag] = {
              href: token.href,
              title: token.title
            };
          }
          return "continue";
        }

        // table (gfm)
        if (token = _this.tokenizer.table(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return "continue";
        }

        // lheading
        if (token = _this.tokenizer.lheading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return "continue";
        }

        // top-level paragraph
        // prevent paragraph consuming extensions by clipping 'src' to extension start
        cutSrc = src;
        if (_this.options.extensions && _this.options.extensions.startBlock) {
          var startIndex = Infinity;
          var tempSrc = src.slice(1);
          var tempStart;
          _this.options.extensions.startBlock.forEach(function (getStartIndex) {
            tempStart = getStartIndex.call({
              lexer: this
            }, tempSrc);
            if (typeof tempStart === 'number' && tempStart >= 0) {
              startIndex = Math.min(startIndex, tempStart);
            }
          });
          if (startIndex < Infinity && startIndex >= 0) {
            cutSrc = src.substring(0, startIndex + 1);
          }
        }
        if (_this.state.top && (token = _this.tokenizer.paragraph(cutSrc))) {
          lastToken = tokens[tokens.length - 1];
          if (lastParagraphClipped && lastToken.type === 'paragraph') {
            lastToken.raw += '\n' + token.raw;
            lastToken.text += '\n' + token.text;
            _this.inlineQueue.pop();
            _this.inlineQueue[_this.inlineQueue.length - 1].src = lastToken.text;
          } else {
            tokens.push(token);
          }
          lastParagraphClipped = cutSrc.length !== src.length;
          src = src.substring(token.raw.length);
          return "continue";
        }

        // text
        if (token = _this.tokenizer.text(src)) {
          src = src.substring(token.raw.length);
          lastToken = tokens[tokens.length - 1];
          if (lastToken && lastToken.type === 'text') {
            lastToken.raw += '\n' + token.raw;
            lastToken.text += '\n' + token.text;
            _this.inlineQueue.pop();
            _this.inlineQueue[_this.inlineQueue.length - 1].src = lastToken.text;
          } else {
            tokens.push(token);
          }
          return "continue";
        }
        if (src) {
          var errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
          if (_this.options.silent) {
            console.error(errMsg);
            return "break";
          } else {
            throw new Error(errMsg);
          }
        }
      };
      while (src) {
        var _ret = _loop();
        if (_ret === "continue") continue;
        if (_ret === "break") break;
      }
      this.state.top = true;
      return tokens;
    }
  }, {
    key: "inline",
    value: function inline(src) {
      var tokens = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      this.inlineQueue.push({
        src: src,
        tokens: tokens
      });
      return tokens;
    }

    /**
     * Lexing/Compiling
     */
  }, {
    key: "inlineTokens",
    value: function inlineTokens(src) {
      var _this2 = this;
      var tokens = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var token, lastToken, cutSrc;

      // String with links masked to avoid interference with em and strong
      var maskedSrc = src;
      var match;
      var keepPrevChar, prevChar;

      // Mask out reflinks
      if (this.tokens.links) {
        var links = Object.keys(this.tokens.links);
        if (links.length > 0) {
          while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
            if (links.includes(match[0].slice(match[0].lastIndexOf('[') + 1, -1))) {
              maskedSrc = maskedSrc.slice(0, match.index) + '[' + repeatString('a', match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
            }
          }
        }
      }
      // Mask out other blocks
      while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
        maskedSrc = maskedSrc.slice(0, match.index) + '[' + repeatString('a', match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      }

      // Mask out escaped em & strong delimiters
      while ((match = this.tokenizer.rules.inline.escapedEmSt.exec(maskedSrc)) != null) {
        maskedSrc = maskedSrc.slice(0, match.index + match[0].length - 2) + '++' + maskedSrc.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
        this.tokenizer.rules.inline.escapedEmSt.lastIndex--;
      }
      var _loop2 = function _loop2() {
        if (!keepPrevChar) {
          prevChar = '';
        }
        keepPrevChar = false;

        // extensions
        if (_this2.options.extensions && _this2.options.extensions.inline && _this2.options.extensions.inline.some(function (extTokenizer) {
          if (token = extTokenizer.call({
            lexer: _this2
          }, src, tokens)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            return true;
          }
          return false;
        })) {
          return "continue";
        }

        // escape
        if (token = _this2.tokenizer.escape(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return "continue";
        }

        // tag
        if (token = _this2.tokenizer.tag(src)) {
          src = src.substring(token.raw.length);
          lastToken = tokens[tokens.length - 1];
          if (lastToken && token.type === 'text' && lastToken.type === 'text') {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
          }
          return "continue";
        }

        // link
        if (token = _this2.tokenizer.link(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return "continue";
        }

        // reflink, nolink
        if (token = _this2.tokenizer.reflink(src, _this2.tokens.links)) {
          src = src.substring(token.raw.length);
          lastToken = tokens[tokens.length - 1];
          if (lastToken && token.type === 'text' && lastToken.type === 'text') {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
          }
          return "continue";
        }

        // em & strong
        if (token = _this2.tokenizer.emStrong(src, maskedSrc, prevChar)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return "continue";
        }

        // code
        if (token = _this2.tokenizer.codespan(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return "continue";
        }

        // br
        if (token = _this2.tokenizer.br(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return "continue";
        }

        // del (gfm)
        if (token = _this2.tokenizer.del(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return "continue";
        }

        // autolink
        if (token = _this2.tokenizer.autolink(src, mangle)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return "continue";
        }

        // url (gfm)
        if (!_this2.state.inLink && (token = _this2.tokenizer.url(src, mangle))) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return "continue";
        }

        // text
        // prevent inlineText consuming extensions by clipping 'src' to extension start
        cutSrc = src;
        if (_this2.options.extensions && _this2.options.extensions.startInline) {
          var startIndex = Infinity;
          var tempSrc = src.slice(1);
          var tempStart;
          _this2.options.extensions.startInline.forEach(function (getStartIndex) {
            tempStart = getStartIndex.call({
              lexer: this
            }, tempSrc);
            if (typeof tempStart === 'number' && tempStart >= 0) {
              startIndex = Math.min(startIndex, tempStart);
            }
          });
          if (startIndex < Infinity && startIndex >= 0) {
            cutSrc = src.substring(0, startIndex + 1);
          }
        }
        if (token = _this2.tokenizer.inlineText(cutSrc, smartypants)) {
          src = src.substring(token.raw.length);
          if (token.raw.slice(-1) !== '_') {
            // Track prevChar before string of ____ started
            prevChar = token.raw.slice(-1);
          }
          keepPrevChar = true;
          lastToken = tokens[tokens.length - 1];
          if (lastToken && lastToken.type === 'text') {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
          }
          return "continue";
        }
        if (src) {
          var errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
          if (_this2.options.silent) {
            console.error(errMsg);
            return "break";
          } else {
            throw new Error(errMsg);
          }
        }
      };
      while (src) {
        var _ret2 = _loop2();
        if (_ret2 === "continue") continue;
        if (_ret2 === "break") break;
      }
      return tokens;
    }
  }], [{
    key: "rules",
    get: function get() {
      return {
        block: block,
        inline: inline
      };
    }

    /**
     * Static Lex Method
     */
  }, {
    key: "lex",
    value: function lex(src, options) {
      var lexer = new Lexer(options);
      return lexer.lex(src);
    }

    /**
     * Static Lex Inline Method
     */
  }, {
    key: "lexInline",
    value: function lexInline(src, options) {
      var lexer = new Lexer(options);
      return lexer.inlineTokens(src);
    }
  }]);
  return Lexer;
}();

/**
 * Renderer
 */
var Renderer = /*#__PURE__*/function () {
  function Renderer(options) {
    _classCallCheck(this, Renderer);
    this.options = options || defaults;
  }
  _createClass(Renderer, [{
    key: "code",
    value: function code(_code, infostring, escaped) {
      var lang = (infostring || '').match(/\S*/)[0];
      if (this.options.highlight) {
        var out = this.options.highlight(_code, lang);
        if (out != null && out !== _code) {
          escaped = true;
          _code = out;
        }
      }
      _code = _code.replace(/\n$/, '') + '\n';
      if (!lang) {
        return '<pre><code>' + (escaped ? _code : escape(_code, true)) + '</code></pre>\n';
      }
      return '<pre><code class="' + this.options.langPrefix + escape(lang) + '">' + (escaped ? _code : escape(_code, true)) + '</code></pre>\n';
    }

    /**
     * @param {string} quote
     */
  }, {
    key: "blockquote",
    value: function blockquote(quote) {
      return "<blockquote>\n".concat(quote, "</blockquote>\n");
    }
  }, {
    key: "html",
    value: function html(_html) {
      return _html;
    }

    /**
     * @param {string} text
     * @param {string} level
     * @param {string} raw
     * @param {any} slugger
     */
  }, {
    key: "heading",
    value: function heading(text, level, raw, slugger) {
      if (this.options.headerIds) {
        var id = this.options.headerPrefix + slugger.slug(raw);
        return "<h".concat(level, " id=\"").concat(id, "\">").concat(text, "</h").concat(level, ">\n");
      }

      // ignore IDs
      return "<h".concat(level, ">").concat(text, "</h").concat(level, ">\n");
    }
  }, {
    key: "hr",
    value: function hr() {
      return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
    }
  }, {
    key: "list",
    value: function list(body, ordered, start) {
      var type = ordered ? 'ol' : 'ul',
        startatt = ordered && start !== 1 ? ' start="' + start + '"' : '';
      return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
    }

    /**
     * @param {string} text
     */
  }, {
    key: "listitem",
    value: function listitem(text) {
      return "<li>".concat(text, "</li>\n");
    }
  }, {
    key: "checkbox",
    value: function checkbox(checked) {
      return '<input ' + (checked ? 'checked="" ' : '') + 'disabled="" type="checkbox"' + (this.options.xhtml ? ' /' : '') + '> ';
    }

    /**
     * @param {string} text
     */
  }, {
    key: "paragraph",
    value: function paragraph(text) {
      return "<p>".concat(text, "</p>\n");
    }

    /**
     * @param {string} header
     * @param {string} body
     */
  }, {
    key: "table",
    value: function table(header, body) {
      if (body) body = "<tbody>".concat(body, "</tbody>");
      return '<table>\n' + '<thead>\n' + header + '</thead>\n' + body + '</table>\n';
    }

    /**
     * @param {string} content
     */
  }, {
    key: "tablerow",
    value: function tablerow(content) {
      return "<tr>\n".concat(content, "</tr>\n");
    }
  }, {
    key: "tablecell",
    value: function tablecell(content, flags) {
      var type = flags.header ? 'th' : 'td';
      var tag = flags.align ? "<".concat(type, " align=\"").concat(flags.align, "\">") : "<".concat(type, ">");
      return tag + content + "</".concat(type, ">\n");
    }

    /**
     * span level renderer
     * @param {string} text
     */
  }, {
    key: "strong",
    value: function strong(text) {
      return "<strong>".concat(text, "</strong>");
    }

    /**
     * @param {string} text
     */
  }, {
    key: "em",
    value: function em(text) {
      return "<em>".concat(text, "</em>");
    }

    /**
     * @param {string} text
     */
  }, {
    key: "codespan",
    value: function codespan(text) {
      return "<code>".concat(text, "</code>");
    }
  }, {
    key: "br",
    value: function br() {
      return this.options.xhtml ? '<br/>' : '<br>';
    }

    /**
     * @param {string} text
     */
  }, {
    key: "del",
    value: function del(text) {
      return "<del>".concat(text, "</del>");
    }

    /**
     * @param {string} href
     * @param {string} title
     * @param {string} text
     */
  }, {
    key: "link",
    value: function link(href, title, text) {
      href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
      if (href === null) {
        return text;
      }
      var out = '<a href="' + href + '"';
      if (title) {
        out += ' title="' + title + '"';
      }
      out += '>' + text + '</a>';
      return out;
    }

    /**
     * @param {string} href
     * @param {string} title
     * @param {string} text
     */
  }, {
    key: "image",
    value: function image(href, title, text) {
      href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
      if (href === null) {
        return text;
      }
      var out = "<img src=\"".concat(href, "\" alt=\"").concat(text, "\"");
      if (title) {
        out += " title=\"".concat(title, "\"");
      }
      out += this.options.xhtml ? '/>' : '>';
      return out;
    }
  }, {
    key: "text",
    value: function text(_text) {
      return _text;
    }
  }]);
  return Renderer;
}();

/**
 * TextRenderer
 * returns only the textual part of the token
 */
var TextRenderer = /*#__PURE__*/function () {
  function TextRenderer() {
    _classCallCheck(this, TextRenderer);
  }
  _createClass(TextRenderer, [{
    key: "strong",
    value:
    // no need for block level renderers
    function strong(text) {
      return text;
    }
  }, {
    key: "em",
    value: function em(text) {
      return text;
    }
  }, {
    key: "codespan",
    value: function codespan(text) {
      return text;
    }
  }, {
    key: "del",
    value: function del(text) {
      return text;
    }
  }, {
    key: "html",
    value: function html(text) {
      return text;
    }
  }, {
    key: "text",
    value: function text(_text) {
      return _text;
    }
  }, {
    key: "link",
    value: function link(href, title, text) {
      return '' + text;
    }
  }, {
    key: "image",
    value: function image(href, title, text) {
      return '' + text;
    }
  }, {
    key: "br",
    value: function br() {
      return '';
    }
  }]);
  return TextRenderer;
}();

/**
 * Slugger generates header id
 */
var Slugger = /*#__PURE__*/function () {
  function Slugger() {
    _classCallCheck(this, Slugger);
    this.seen = {};
  }

  /**
   * @param {string} value
   */
  _createClass(Slugger, [{
    key: "serialize",
    value: function serialize(value) {
      return value.toLowerCase().trim()
      // remove html tags
      .replace(/<[!\/a-z].*?>/ig, '')
      // remove unwanted chars
      .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '').replace(/\s/g, '-');
    }

    /**
     * Finds the next safe (unique) slug to use
     * @param {string} originalSlug
     * @param {boolean} isDryRun
     */
  }, {
    key: "getNextSafeSlug",
    value: function getNextSafeSlug(originalSlug, isDryRun) {
      var slug = originalSlug;
      var occurenceAccumulator = 0;
      if (this.seen.hasOwnProperty(slug)) {
        occurenceAccumulator = this.seen[originalSlug];
        do {
          occurenceAccumulator++;
          slug = originalSlug + '-' + occurenceAccumulator;
        } while (this.seen.hasOwnProperty(slug));
      }
      if (!isDryRun) {
        this.seen[originalSlug] = occurenceAccumulator;
        this.seen[slug] = 0;
      }
      return slug;
    }

    /**
     * Convert string to unique id
     * @param {object} [options]
     * @param {boolean} [options.dryrun] Generates the next unique slug without
     * updating the internal accumulator.
     */
  }, {
    key: "slug",
    value: function slug(value) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var slug = this.serialize(value);
      return this.getNextSafeSlug(slug, options.dryrun);
    }
  }]);
  return Slugger;
}();

/**
 * Parsing & Compiling
 */
var Parser = /*#__PURE__*/function () {
  function Parser(options) {
    _classCallCheck(this, Parser);
    this.options = options || defaults;
    this.options.renderer = this.options.renderer || new Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.textRenderer = new TextRenderer();
    this.slugger = new Slugger();
  }

  /**
   * Static Parse Method
   */
  _createClass(Parser, [{
    key: "parse",
    value:
    /**
     * Parse Loop
     */
    function parse(tokens) {
      var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var out = '',
        i,
        j,
        k,
        l2,
        l3,
        row,
        cell,
        header,
        body,
        token,
        ordered,
        start,
        loose,
        itemBody,
        item,
        checked,
        task,
        checkbox,
        ret;
      var l = tokens.length;
      for (i = 0; i < l; i++) {
        token = tokens[i];

        // Run any renderer extensions
        if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
          ret = this.options.extensions.renderers[token.type].call({
            parser: this
          }, token);
          if (ret !== false || !['space', 'hr', 'heading', 'code', 'table', 'blockquote', 'list', 'html', 'paragraph', 'text'].includes(token.type)) {
            out += ret || '';
            continue;
          }
        }
        switch (token.type) {
          case 'space':
            {
              continue;
            }
          case 'hr':
            {
              out += this.renderer.hr();
              continue;
            }
          case 'heading':
            {
              out += this.renderer.heading(this.parseInline(token.tokens), token.depth, unescape(this.parseInline(token.tokens, this.textRenderer)), this.slugger);
              continue;
            }
          case 'code':
            {
              out += this.renderer.code(token.text, token.lang, token.escaped);
              continue;
            }
          case 'table':
            {
              header = '';

              // header
              cell = '';
              l2 = token.header.length;
              for (j = 0; j < l2; j++) {
                cell += this.renderer.tablecell(this.parseInline(token.header[j].tokens), {
                  header: true,
                  align: token.align[j]
                });
              }
              header += this.renderer.tablerow(cell);
              body = '';
              l2 = token.rows.length;
              for (j = 0; j < l2; j++) {
                row = token.rows[j];
                cell = '';
                l3 = row.length;
                for (k = 0; k < l3; k++) {
                  cell += this.renderer.tablecell(this.parseInline(row[k].tokens), {
                    header: false,
                    align: token.align[k]
                  });
                }
                body += this.renderer.tablerow(cell);
              }
              out += this.renderer.table(header, body);
              continue;
            }
          case 'blockquote':
            {
              body = this.parse(token.tokens);
              out += this.renderer.blockquote(body);
              continue;
            }
          case 'list':
            {
              ordered = token.ordered;
              start = token.start;
              loose = token.loose;
              l2 = token.items.length;
              body = '';
              for (j = 0; j < l2; j++) {
                item = token.items[j];
                checked = item.checked;
                task = item.task;
                itemBody = '';
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
                    itemBody += checkbox;
                  }
                }
                itemBody += this.parse(item.tokens, loose);
                body += this.renderer.listitem(itemBody, task, checked);
              }
              out += this.renderer.list(body, ordered, start);
              continue;
            }
          case 'html':
            {
              // TODO parse inline content if parameter markdown=1
              out += this.renderer.html(token.text);
              continue;
            }
          case 'paragraph':
            {
              out += this.renderer.paragraph(this.parseInline(token.tokens));
              continue;
            }
          case 'text':
            {
              body = token.tokens ? this.parseInline(token.tokens) : token.text;
              while (i + 1 < l && tokens[i + 1].type === 'text') {
                token = tokens[++i];
                body += '\n' + (token.tokens ? this.parseInline(token.tokens) : token.text);
              }
              out += top ? this.renderer.paragraph(body) : body;
              continue;
            }
          default:
            {
              var errMsg = 'Token with "' + token.type + '" type was not found.';
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
  }, {
    key: "parseInline",
    value: function parseInline(tokens, renderer) {
      renderer = renderer || this.renderer;
      var out = '',
        i,
        token,
        ret;
      var l = tokens.length;
      for (i = 0; i < l; i++) {
        token = tokens[i];

        // Run any renderer extensions
        if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
          ret = this.options.extensions.renderers[token.type].call({
            parser: this
          }, token);
          if (ret !== false || !['escape', 'html', 'link', 'image', 'strong', 'em', 'codespan', 'br', 'del', 'text'].includes(token.type)) {
            out += ret || '';
            continue;
          }
        }
        switch (token.type) {
          case 'escape':
            {
              out += renderer.text(token.text);
              break;
            }
          case 'html':
            {
              out += renderer.html(token.text);
              break;
            }
          case 'link':
            {
              out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
              break;
            }
          case 'image':
            {
              out += renderer.image(token.href, token.title, token.text);
              break;
            }
          case 'strong':
            {
              out += renderer.strong(this.parseInline(token.tokens, renderer));
              break;
            }
          case 'em':
            {
              out += renderer.em(this.parseInline(token.tokens, renderer));
              break;
            }
          case 'codespan':
            {
              out += renderer.codespan(token.text);
              break;
            }
          case 'br':
            {
              out += renderer.br();
              break;
            }
          case 'del':
            {
              out += renderer.del(this.parseInline(token.tokens, renderer));
              break;
            }
          case 'text':
            {
              out += renderer.text(token.text);
              break;
            }
          default:
            {
              var errMsg = 'Token with "' + token.type + '" type was not found.';
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
  }], [{
    key: "parse",
    value: function parse(tokens, options) {
      var parser = new Parser(options);
      return parser.parse(tokens);
    }

    /**
     * Static Parse Inline Method
     */
  }, {
    key: "parseInline",
    value: function parseInline(tokens, options) {
      var parser = new Parser(options);
      return parser.parseInline(tokens);
    }
  }]);
  return Parser;
}();

var _hoisted_1$b = ["href", "title"];
var script$e = /*#__PURE__*/ defineComponent({
    __name: 'Link',
    props: {
        href: { type: String, required: true },
        title: { type: String, required: false }
    },
    setup: function (__props) {
        return function (_ctx, _cache) {
            return (openBlock(), createElementBlock("a", {
                class: "marked-vue-link",
                href: __props.href,
                title: __props.title
            }, [
                renderSlot(_ctx.$slots, "default")
            ], 8 /* PROPS */, _hoisted_1$b));
        };
    }
});

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$7 = "\n.marked-vue-link[data-v-eb1aa4ee]{\r\n    color: #4183c4;\n}\r\n";
styleInject(css_248z$7);

script$e.__scopeId = "data-v-eb1aa4ee";
script$e.__file = "src/vueComponent/Link.vue";

var _hoisted_1$a = ["src", "alt", "title"];
var script$d = /*#__PURE__*/ defineComponent({
    __name: 'Image',
    props: {
        src: { type: String, required: true },
        alt: { type: String, required: false },
        title: { type: String, required: false }
    },
    setup: function (__props) {
        return function (_ctx, _cache) {
            return (openBlock(), createElementBlock("img", {
                class: "marked-vue-img",
                src: __props.src,
                alt: __props.alt,
                title: __props.title
            }, null, 8 /* PROPS */, _hoisted_1$a));
        };
    }
});

var css_248z$6 = "\n.marked-vue-img[data-v-1a074548]{\r\n    display: block;\r\n    margin: 0 auto;\n}\r\n";
styleInject(css_248z$6);

script$d.__scopeId = "data-v-1a074548";
script$d.__file = "src/vueComponent/Image.vue";

var _hoisted_1$9 = { class: "marked-vue-codeInline" };
var script$c = /*#__PURE__*/ defineComponent({
    __name: 'CodeInline',
    props: {
        text: { type: String, required: true }
    },
    setup: function (__props) {
        return function (_ctx, _cache) {
            return (openBlock(), createElementBlock("code", _hoisted_1$9, toDisplayString(__props.text), 1 /* TEXT */));
        };
    }
});

var css_248z$5 = "\n.marked-vue-codeInline[data-v-3dd0e935]{\r\n    border: 1px solid #e7eaed;\r\n    border-radius: 3px;\r\n    color: #e83e8c;\r\n    background-color: #f6f6f6;\r\n    font-size: large;\n}\r\n";
styleInject(css_248z$5);

script$c.__scopeId = "data-v-3dd0e935";
script$c.__file = "src/vueComponent/CodeInline.vue";

var _hoisted_1$8 = { class: "marked-vue-em" };
var script$b = /*#__PURE__*/ defineComponent({
    __name: 'EmFont',
    setup: function (__props) {
        return function (_ctx, _cache) {
            return (openBlock(), createElementBlock("em", _hoisted_1$8, [
                renderSlot(_ctx.$slots, "default")
            ]));
        };
    }
});

script$b.__file = "src/vueComponent/EmFont.vue";

var _hoisted_1$7 = { class: "marked-vue-deleteLine" };
var script$a = /*#__PURE__*/ defineComponent({
    __name: 'DeleteFont',
    setup: function (__props) {
        return function (_ctx, _cache) {
            return (openBlock(), createElementBlock("del", _hoisted_1$7, [
                renderSlot(_ctx.$slots, "default")
            ]));
        };
    }
});

script$a.__file = "src/vueComponent/DeleteFont.vue";

var _hoisted_1$6 = { class: "marked-vue-bold" };
var script$9 = /*#__PURE__*/ defineComponent({
    __name: 'BoldFont',
    setup: function (__props) {
        return function (_ctx, _cache) {
            return (openBlock(), createElementBlock("strong", _hoisted_1$6, [
                renderSlot(_ctx.$slots, "default")
            ]));
        };
    }
});

script$9.__file = "src/vueComponent/BoldFont.vue";

var _hoisted_1$5 = { class: "marked-vue-paragraph" };
var script$8 = /*#__PURE__*/ defineComponent({
    __name: 'Paragraph',
    setup: function (__props) {
        return function (_ctx, _cache) {
            return (openBlock(), createElementBlock("p", _hoisted_1$5, [
                renderSlot(_ctx.$slots, "default")
            ]));
        };
    }
});

var css_248z$4 = "\n.marked-vue-paragraph[data-v-2704c122]{\n}\r\n";
styleInject(css_248z$4);

script$8.__scopeId = "data-v-2704c122";
script$8.__file = "src/vueComponent/Paragraph.vue";

var _hoisted_1$4 = ["id"];
var _hoisted_2$2 = ["id"];
var _hoisted_3 = ["id"];
var _hoisted_4 = ["id"];
var _hoisted_5 = ["id"];
var _hoisted_6 = ["id"];
var script$7 = /*#__PURE__*/ defineComponent({
    __name: 'Heading',
    props: {
        level: { type: [String, Number], required: true },
        id: { type: String, required: false }
    },
    setup: function (__props) {
        return function (_ctx, _cache) {
            return (__props.level == '1')
                ? (openBlock(), createElementBlock("h1", {
                    key: 0,
                    class: "marked-vue-heading1",
                    id: __props.id
                }, [
                    renderSlot(_ctx.$slots, "default")
                ], 8 /* PROPS */, _hoisted_1$4))
                : (__props.level == '2')
                    ? (openBlock(), createElementBlock("h2", {
                        key: 1,
                        class: "marked-vue-heading2",
                        id: __props.id
                    }, [
                        renderSlot(_ctx.$slots, "default")
                    ], 8 /* PROPS */, _hoisted_2$2))
                    : (__props.level == '3')
                        ? (openBlock(), createElementBlock("h3", {
                            key: 2,
                            class: "marked-vue-heading3",
                            id: __props.id
                        }, [
                            renderSlot(_ctx.$slots, "default")
                        ], 8 /* PROPS */, _hoisted_3))
                        : (__props.level == '4')
                            ? (openBlock(), createElementBlock("h4", {
                                key: 3,
                                class: "marked-vue-heading4",
                                id: __props.id
                            }, [
                                renderSlot(_ctx.$slots, "default")
                            ], 8 /* PROPS */, _hoisted_4))
                            : (__props.level == '5')
                                ? (openBlock(), createElementBlock("h5", {
                                    key: 4,
                                    class: "marked-vue-heading5",
                                    id: __props.id
                                }, [
                                    renderSlot(_ctx.$slots, "default")
                                ], 8 /* PROPS */, _hoisted_5))
                                : (openBlock(), createElementBlock("h6", {
                                    key: 5,
                                    class: "marked-vue-heading6",
                                    id: __props.id
                                }, [
                                    renderSlot(_ctx.$slots, "default")
                                ], 8 /* PROPS */, _hoisted_6));
        };
    }
});

var css_248z$3 = "\n.marked-vue-heading1[data-v-133b1f7a] {\r\n    font-size: 2em;\r\n    border-bottom: 1px solid #eee;\n}\n.marked-vue-heading2[data-v-133b1f7a] {\r\n    font-size: 1.75em;\r\n    border-bottom: 1px solid #eee;\n}\n.marked-vue-heading3[data-v-133b1f7a] {\r\n    font-size: 1.5em;\n}\n.marked-vue-heading4[data-v-133b1f7a] {\r\n    font-size: 1.25em;\n}\n.marked-vue-heading5[data-v-133b1f7a] {\r\n    font-size: 1.0em;\n}\n.marked-vue-heading6[data-v-133b1f7a] {\r\n    font-size: 0.8em;\n}\r\n";
styleInject(css_248z$3);

script$7.__scopeId = "data-v-133b1f7a";
script$7.__file = "src/vueComponent/Heading.vue";

var _hoisted_1$3 = { class: "marked-vue-blockquote" };
var script$6 = /*#__PURE__*/ defineComponent({
    __name: 'Blockquote',
    setup: function (__props) {
        return function (_ctx, _cache) {
            return (openBlock(), createElementBlock("blockquote", _hoisted_1$3, [
                renderSlot(_ctx.$slots, "default")
            ]));
        };
    }
});

var css_248z$2 = "\n.marked-vue-blockquote[data-v-4f43c044] {\r\n    padding: 0 15px;\r\n    color: #777;\r\n    border-left: 4px solid #dfe2e5;\r\n    margin-left: 10px;\n}\r\n";
styleInject(css_248z$2);

script$6.__scopeId = "data-v-4f43c044";
script$6.__file = "src/vueComponent/Blockquote.vue";

var _hoisted_1$2 = { class: "marked-vue-fence" };
var script$5 = /*#__PURE__*/ defineComponent({
    __name: 'CodeBlock',
    setup: function (__props) {
        return function (_ctx, _cache) {
            return (openBlock(), createElementBlock("pre", _hoisted_1$2, [
                renderSlot(_ctx.$slots, "default")
            ]));
        };
    }
});

var css_248z$1 = "\n.marked-vue-fence[data-v-4cce80be]{\r\n    font-size: 13.5px;\r\n    border: 1px solid #e7eaed;\r\n    border-radius: 5px;\r\n    background-color: #f6f6f6;\n}\r\n";
styleInject(css_248z$1);

script$5.__scopeId = "data-v-4cce80be";
script$5.__file = "src/vueComponent/CodeBlock.vue";

var _hoisted_1$1 = ["align"];
var _hoisted_2$1 = ["align"];
var script$4 = /*#__PURE__*/ defineComponent({
    __name: 'Tablecell',
    props: {
        flags: { type: Object, required: true }
    },
    setup: function (__props) {
        return function (_ctx, _cache) {
            return (__props.flags.header)
                ? (openBlock(), createElementBlock("th", {
                    key: 0,
                    align: __props.flags.align
                }, [
                    renderSlot(_ctx.$slots, "default")
                ], 8 /* PROPS */, _hoisted_1$1))
                : (openBlock(), createElementBlock("td", {
                    key: 1,
                    align: __props.flags.align
                }, [
                    renderSlot(_ctx.$slots, "default")
                ], 8 /* PROPS */, _hoisted_2$1));
        };
    }
});

script$4.__file = "src/vueComponent/Tablecell.vue";

var script$3 = /*#__PURE__*/ defineComponent({
    __name: 'Tablerow',
    setup: function (__props) {
        return function (_ctx, _cache) {
            var _component_solt = resolveComponent("solt");
            return (openBlock(), createElementBlock("tr", null, [
                createVNode(_component_solt)
            ]));
        };
    }
});

script$3.__file = "src/vueComponent/Tablerow.vue";

var script$2 = /*#__PURE__*/ defineComponent({
    __name: 'Table',
    setup: function (__props) {
        return function (_ctx, _cache) {
            return (openBlock(), createElementBlock("table", null, [
                renderSlot(_ctx.$slots, "header"),
                renderSlot(_ctx.$slots, "default")
            ]));
        };
    }
});

script$2.__file = "src/vueComponent/Table.vue";

var script$1 = /*#__PURE__*/ defineComponent({
    __name: 'Listitem',
    setup: function (__props) {
        return function (_ctx, _cache) {
            return (openBlock(), createElementBlock("li", null, [
                renderSlot(_ctx.$slots, "default")
            ]));
        };
    }
});

script$1.__file = "src/vueComponent/Listitem.vue";

var _hoisted_1 = ["start"];
var _hoisted_2 = {
    key: 1,
    class: "marked-vue-bulletList"
};
var script = /*#__PURE__*/ defineComponent({
    __name: 'List',
    props: {
        ordered: { type: null, required: true },
        start: { type: [String, Number], required: true }
    },
    setup: function (__props) {
        return function (_ctx, _cache) {
            return (__props.ordered)
                ? (openBlock(), createElementBlock("ol", {
                    key: 0,
                    class: "marked-vue-orderList",
                    start: __props.start
                }, [
                    renderSlot(_ctx.$slots, "default")
                ], 8 /* PROPS */, _hoisted_1))
                : (openBlock(), createElementBlock("ul", _hoisted_2, [
                    renderSlot(_ctx.$slots, "default")
                ]));
        };
    }
});

var css_248z = "\n.marked-vue-orderList[data-v-d90c87a6]{\r\n    padding-inline-start: 35px;\n}\n.marked-vue-bulletList[data-v-d90c87a6]{\r\n    padding-inline-start: 35px;\n}\r\n";
styleInject(css_248z);

script.__scopeId = "data-v-d90c87a6";
script.__file = "src/vueComponent/List.vue";

/**
 * Renderer
 */
var VueRenderer = /** @class */function () {
  function VueRenderer(options) {
    if (options === void 0) {
      options = null;
    }
    this.options = options || defaults;
  }
  VueRenderer.prototype.code = function (code, infostring, escaped) {
    var _this = this;
    var lang = (infostring || '').match(/\S*/)[0];
    if (this.options.highlight) {
      var out = this.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }
    code = code.replace(/\n$/, '') + '\n';
    if (!lang) {
      return h(script$5, null, function () {
        return h('code', {
          innerHTML: escaped ? code : escape(code, true)
        });
      });
    }
    return h(script$5, null, function () {
      return h('code', {
        "class": _this.options.langPrefix + escape(lang),
        innerHTML: escaped ? code : escape(code, true)
      });
    });
  };
  /**
   * @param {string | VNode | VNode[]} quote
   */
  VueRenderer.prototype.blockquote = function (quote) {
    return h(script$6, null, function () {
      return quote;
    });
  };
  VueRenderer.prototype.html = function (html) {
    return h('div', {
      "class": 'html',
      innerHTML: html
    });
  };
  /**
   * @param {string} inlineVNode
   * @param {string} level
   * @param {string} raw
   * @param {any} slugger
   */
  VueRenderer.prototype.heading = function (inlineVNode, level, raw, slugger) {
    if (this.options.headerIds) {
      var id = this.options.headerPrefix + slugger.slug(raw);
      return h(script$7, {
        level: level,
        id: id
      }, function () {
        return inlineVNode;
      });
    }
    // ignore IDs
    return h(script$7, {
      level: level
    }, function () {
      return inlineVNode;
    });
  };
  VueRenderer.prototype.hr = function () {
    return h('hr', {
      "class": 'marked-vue-hr'
    });
  };
  VueRenderer.prototype.list = function (body, ordered, start) {
    return h(script, {
      ordered: ordered,
      start: start
    }, function () {
      return body;
    });
  };
  /**
   * @param {string} content
   */
  VueRenderer.prototype.listitem = function (content) {
    return h(script$1, null, function () {
      return content;
    });
  };
  VueRenderer.prototype.checkbox = function (checked) {
    if (checked) return h('input', {
      checked: "",
      disabled: "",
      type: "checkbox"
    });
    return h('input', {
      disabled: "",
      type: "checkbox"
    });
  };
  /**
   * @param {VNode | VNode[]} inlineVNode
   */
  VueRenderer.prototype.paragraph = function (inlineVNode) {
    return h(script$8, null, {
      "default": function _default() {
        return inlineVNode;
      }
    });
  };
  /**
   * @param {VNode} header
   * @param {VNode} body
   */
  VueRenderer.prototype.table = function (_header, body) {
    if (body) body = h('tbody', body);
    return h(script$2, null, {
      "default": function _default() {
        return body;
      },
      header: function header() {
        return _header;
      }
    });
  };
  /**
   * @param {string | VNode | VNode[]} content
   */
  VueRenderer.prototype.tablerow = function (content) {
    return h(script$3, null, function () {
      return content;
    });
  };
  VueRenderer.prototype.tablecell = function (content, flags) {
    return h(script$4, {
      flags: flags
    }, function () {
      return content;
    });
  };
  /**
   * span level renderer
   * @param {string | VNode | VNode[]} content
   */
  VueRenderer.prototype.strong = function (content) {
    return h(script$9, null, function () {
      return content;
    });
  };
  /**
   * @param {string | VNode | VNode[]} content
   */
  VueRenderer.prototype.em = function (content) {
    return h(script$b, null, function () {
      return content;
    });
  };
  /**
   * @param {string} text
   */
  VueRenderer.prototype.codespan = function (text) {
    return h(script$c, {
      text: text
    });
  };
  VueRenderer.prototype.br = function () {
    return h('br');
  };
  /**
   * @param {string | VNode | VNode[]} content
   */
  VueRenderer.prototype.del = function (content) {
    return h(script$a, null, function () {
      return content;
    });
  };
  /**
   * @param {string} href
   * @param {string} title
   * @param {string | VNode | VNode[]} content
   */
  VueRenderer.prototype.link = function (href, title, content) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return this.text(content);
    }
    return h(script$e, {
      href: href,
      title: title
    }, function () {
      return content;
    });
  };
  /**
   * @param {string} href
   * @param {string} title
   * @param {string} text
   */
  VueRenderer.prototype.image = function (href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return this.text(text);
    }
    return h(script$d, {
      src: href,
      title: title,
      alt: text
    });
  };
  VueRenderer.prototype.text = function (text) {
    return text;
  };
  return VueRenderer;
}();

var VueParser = /** @class */function () {
  function VueParser(options) {
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
  VueParser.parse = function (tokens, options) {
    var parser = new VueParser(options);
    return parser.parse(tokens);
  };
  /**
   * Static Parse Inline Method
   */
  VueParser.parseInline = function (tokens, options) {
    var parser = new VueParser(options);
    return parser.parseInline(tokens);
  };
  /**
   * Parse Loop
   */
  VueParser.prototype.parse = function (tokens, top) {
    if (top === void 0) {
      top = true;
    }
    var out = [],
      i,
      j,
      k,
      row,
      token,
      item,
      task,
      ret;
    var l = tokens.length;
    for (i = 0; i < l; i++) {
      token = tokens[i];
      // Run any renderer extensions
      if (this.options.extensions && this.options.extensions.vueRenderers && this.options.extensions.vueRenderers[token.type]) {
        ret = this.options.extensions.vueRenderers[token.type].call({
          parser: this
        }, token);
        if (ret !== false || !['space', 'hr', 'heading', 'code', 'table', 'blockquote', 'list', 'html', 'paragraph', 'text'].includes(token.type)) {
          out.push(ret);
          continue;
        }
      }
      switch (token.type) {
        case 'space':
          {
            continue;
          }
        case 'hr':
          {
            out.push(this.renderer.hr());
            continue;
          }
        case 'heading':
          {
            out.push(this.renderer.heading(this.parseInline(token.tokens), token.depth, unescape(this.parseInline(token.tokens, this.textRenderer).join()), this.slugger));
            continue;
          }
        case 'code':
          {
            out.push(this.renderer.code(token.text, token.lang, token.escaped));
            continue;
          }
        case 'table':
          {
            var cell = [],
              header = [],
              body = [],
              l2 = void 0,
              l3 = void 0;
            // header
            l2 = token.header.length;
            for (j = 0; j < l2; j++) {
              cell += this.renderer.tablecell(this.parseInline(token.header[j].tokens), {
                header: true,
                align: token.align[j]
              });
            }
            header.push(this.renderer.tablerow(cell));
            //body
            l2 = token.rows.length;
            for (j = 0; j < l2; j++) {
              row = token.rows[j];
              cell = [];
              l3 = row.length;
              for (k = 0; k < l3; k++) {
                cell += this.renderer.tablecell(this.parseInline(row[k].tokens), {
                  header: false,
                  align: token.align[k]
                });
              }
              body.push(this.renderer.tablerow(cell));
            }
            out.push(this.renderer.table(header, body));
            continue;
          }
        case 'blockquote':
          {
            var body = [];
            body = this.parse(token.tokens);
            out.push(this.renderer.blockquote(body));
            continue;
          }
        case 'list':
          {
            var body = [],
              l2 = token.items.length,
              ordered = token.ordered,
              start = token.start,
              loose = token.loose,
              checkbox = void 0,
              checked = void 0,
              itemBody = [];
            for (j = 0; j < l2; j++) {
              item = token.items[j];
              checked = item.checked;
              task = item.task;
              itemBody = [];
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
              itemBody.push(this.parse(item.tokens, loose));
              body.push(this.renderer.listitem(itemBody, task, checked));
            }
            out.push(this.renderer.list(body, ordered, start));
            continue;
          }
        case 'html':
          {
            // TODO parse inline content if parameter markdown=1
            out.push(this.renderer.html(token.text));
            continue;
          }
        case 'paragraph':
          {
            out.push(this.renderer.paragraph(this.parseInline(token.tokens)));
            continue;
          }
        case 'text':
          {
            var body = [];
            body = [token.tokens ? this.parseInline(token.tokens) : token.text];
            while (i + 1 < l && tokens[i + 1].type === 'text') {
              token = tokens[++i];
              body.push(token.tokens ? this.parseInline(token.tokens) : token.text);
            }
            if (top) out.push(this.renderer.paragraph(body));else {
              out = out.concat(body);
            }
            continue;
          }
        default:
          {
            var errMsg = 'Token with "' + token.type + '" type was not found.';
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
  };
  /**
   * Parse Inline Tokens
   */
  VueParser.prototype.parseInline = function (tokens, renderer) {
    if (renderer === void 0) {
      renderer = null;
    }
    renderer = renderer || this.renderer;
    var out = [],
      i,
      token,
      ret;
    var l = tokens.length;
    for (i = 0; i < l; i++) {
      token = tokens[i];
      // Run any renderer extensions
      if (this.options.extensions && this.options.extensions.vueRenderers && this.options.extensions.vueRenderers[token.type]) {
        ret = this.options.extensions.vueRenderers[token.type].call({
          parser: this
        }, token);
        if (ret !== false || !['escape', 'html', 'link', 'image', 'strong', 'em', 'codespan', 'br', 'del', 'text'].includes(token.type)) {
          out.push(ret);
          continue;
        }
      }
      switch (token.type) {
        case 'escape':
          {
            out.push(renderer.text(token.text));
            break;
          }
        case 'html':
          {
            out.push(renderer.html(token.text));
            break;
          }
        case 'link':
          {
            out.push(renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer)));
            break;
          }
        case 'image':
          {
            out.push(renderer.image(token.href, token.title, token.text));
            break;
          }
        case 'strong':
          {
            out.push(renderer.strong(this.parseInline(token.tokens, renderer)));
            break;
          }
        case 'em':
          {
            out.push(renderer.em(this.parseInline(token.tokens, renderer)));
            break;
          }
        case 'codespan':
          {
            out.push(renderer.codespan(token.text));
            break;
          }
        case 'br':
          {
            out.push(renderer.br());
            break;
          }
        case 'del':
          {
            out.push(renderer.del(this.parseInline(token.tokens, renderer)));
            break;
          }
        case 'text':
          {
            out.push(renderer.text(token.raw));
            break;
          }
        default:
          {
            var errMsg = 'Token with "' + token.type + '" type was not found.';
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
  };
  return VueParser;
}();

/**
 * Marked
 */
function marked(src, opt, callback) {
  // throw error in case of non string input
  if (typeof src === 'undefined' || src === null) {
    throw new Error('marked(): input parameter is undefined or null');
  }
  if (typeof src !== 'string') {
    throw new Error('marked(): input parameter is of type ' + Object.prototype.toString.call(src) + ', string expected');
  }
  if (typeof opt === 'function') {
    callback = opt;
    opt = null;
  }
  opt = merge({}, marked.defaults, opt || {});
  checkSanitizeDeprecation(opt);
  if (callback) {
    var highlight_1 = opt.highlight;
    var tokens_1;
    try {
      tokens_1 = Lexer.lex(src, opt);
    } catch (e) {
      return callback(e);
    }
    var done_1 = function done_1(err) {
      var out;
      if (!err) {
        try {
          if (opt.walkTokens) {
            marked.walkTokens(tokens_1, opt.walkTokens);
          }
          out = Parser.parse(tokens_1, opt);
        } catch (e) {
          err = e;
        }
      }
      opt.highlight = highlight_1;
      return err ? callback(err) : callback(null, out);
    };
    if (!highlight_1 || highlight_1.length < 3) {
      return done_1();
    }
    delete opt.highlight;
    if (!tokens_1.length) return done_1();
    var pending_1 = 0;
    marked.walkTokens(tokens_1, function (token) {
      if (token.type === 'code') {
        pending_1++;
        setTimeout(function () {
          highlight_1(token.text, token.lang, function (err, code) {
            if (err) {
              return done_1(err);
            }
            if (code != null && code !== token.text) {
              token.text = code;
              token.escaped = true;
            }
            pending_1--;
            if (pending_1 === 0) {
              done_1();
            }
          });
        }, 0);
      }
    });
    if (pending_1 === 0) {
      done_1();
    }
    return;
  }
  function onError(e) {
    e.message += '\nPlease report this to https://github.com/markedjs/marked.';
    if (opt.silent) {
      return '<p>An error occurred:</p><pre>' + escape(e.message + '', true) + '</pre>';
    }
    throw e;
  }
  try {
    var tokens_2 = Lexer.lex(src, opt);
    if (opt.walkTokens) {
      if (opt.async) {
        return Promise.all(marked.walkTokens(tokens_2, opt.walkTokens)).then(function () {
          return Parser.parse(tokens_2, opt);
        })["catch"](onError);
      }
      marked.walkTokens(tokens_2, opt.walkTokens);
    }
    return Parser.parse(tokens_2, opt);
  } catch (e) {
    onError(e);
  }
}
/**
 * Options
 */
marked.options = marked.setOptions = function (opt) {
  merge(marked.defaults, opt);
  changeDefaults(marked.defaults);
  return marked;
};
marked.getDefaults = getDefaults;
marked.defaults = defaults;
/**
 * Use Extension
 */
marked.use = function () {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var extensions = marked.defaults.extensions || {
    renderers: {},
    vueRenderers: {},
    childTokens: {}
  };
  args.forEach(function (pack) {
    // copy options to new object
    var opts = merge({}, pack);
    // set async to true if it was set to true before
    opts.async = marked.defaults.async || opts.async;
    // ==-- Parse "addon" extensions --== //
    if (pack.extensions) {
      pack.extensions.forEach(function (ext) {
        if (!ext.name) {
          throw new Error('extension name required');
        }
        if (ext.renderer) {
          // Renderer extensions
          var prevRenderer_1 = extensions.renderers[ext.name];
          if (prevRenderer_1) {
            // Replace extension with func to run new extension but fall back if false
            extensions.renderers[ext.name] = function () {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              var ret = ext.renderer.apply(this, args);
              if (ret === false) {
                ret = prevRenderer_1.apply(this, args);
              }
              return ret;
            };
          } else {
            extensions.renderers[ext.name] = ext.renderer;
          }
        }
        if (ext.vueRenderer) {
          // vueRenderer extensions
          var prevRenderer_2 = extensions.vueRenderers[ext.name];
          if (prevRenderer_2) {
            // Replace extension with func to run new extension but fall back if false
            extensions.vueRenderers[ext.name] = function () {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              var ret = ext.vueRenderer.apply(this, args);
              if (ret === false) {
                ret = prevRenderer_2.apply(this, args);
              }
              return ret;
            };
          } else {
            extensions.vueRenderers[ext.name] = ext.vueRenderer;
          }
        }
        if (ext.tokenizer) {
          // Tokenizer Extensions
          if (!ext.level || ext.level !== 'block' && ext.level !== 'inline') {
            throw new Error("extension level must be 'block' or 'inline'");
          }
          if (extensions[ext.level]) {
            extensions[ext.level].unshift(ext.tokenizer);
          } else {
            extensions[ext.level] = [ext.tokenizer];
          }
          if (ext.start) {
            // Function to check for start of token
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
        if (ext.childTokens) {
          // Child tokens to be visited by walkTokens
          extensions.childTokens[ext.name] = ext.childTokens;
        }
      });
      opts.extensions = extensions;
    }
    // ==-- Parse "overwrite" extensions --== //
    if (pack.renderer) {
      var renderer_1 = marked.defaults.renderer || new Renderer();
      var _loop_1 = function _loop_1(prop) {
        var prevRenderer = renderer_1[prop];
        // Replace renderer with func to run extension, but fall back if false
        renderer_1[prop] = function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var ret = pack.renderer[prop].apply(renderer_1, args);
          if (ret === false) {
            ret = prevRenderer.apply(renderer_1, args);
          }
          return ret;
        };
      };
      for (var prop in pack.renderer) {
        _loop_1(prop);
      }
      opts.renderer = renderer_1;
    }
    if (pack.vueRenderer) {
      var vueRenderer_1 = marked.defaults.vueRenderer || new VueRenderer();
      var _loop_2 = function _loop_2(prop) {
        var prevRenderer = vueRenderer_1[prop];
        // Replace renderer with func to run extension, but fall back if false
        vueRenderer_1[prop] = function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var ret = pack.vueRenderer[prop].apply(vueRenderer_1, args);
          if (ret === false) {
            ret = prevRenderer.apply(vueRenderer_1, args);
          }
          return ret;
        };
      };
      for (var prop in pack.vueRenderer) {
        _loop_2(prop);
      }
      opts.vueRenderer = vueRenderer_1;
    }
    if (pack.tokenizer) {
      var tokenizer_1 = marked.defaults.tokenizer || new Tokenizer();
      var _loop_3 = function _loop_3(prop) {
        var prevTokenizer = tokenizer_1[prop];
        // Replace tokenizer with func to run extension, but fall back if false
        tokenizer_1[prop] = function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var ret = pack.tokenizer[prop].apply(tokenizer_1, args);
          if (ret === false) {
            ret = prevTokenizer.apply(tokenizer_1, args);
          }
          return ret;
        };
      };
      for (var prop in pack.tokenizer) {
        _loop_3(prop);
      }
      opts.tokenizer = tokenizer_1;
    }
    // ==-- Parse WalkTokens extensions --== //
    if (pack.walkTokens) {
      var walkTokens_1 = marked.defaults.walkTokens;
      opts.walkTokens = function (token) {
        var values = [];
        values.push(pack.walkTokens.call(this, token));
        if (walkTokens_1) {
          values = values.concat(walkTokens_1.call(this, token));
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
marked.walkTokens = function (tokens, callback) {
  var e_1, _a;
  var values = [];
  var _loop_4 = function _loop_4(token) {
    var e_2, _b, e_3, _c, e_4, _d;
    values = values.concat(callback.call(marked, token));
    switch (token.type) {
      case 'table':
        {
          try {
            for (var _e = (e_2 = void 0, __values(token.header)), _f = _e.next(); !_f.done; _f = _e.next()) {
              var cell = _f.value;
              values = values.concat(marked.walkTokens(cell.tokens, callback));
            }
          } catch (e_2_1) {
            e_2 = {
              error: e_2_1
            };
          } finally {
            try {
              if (_f && !_f.done && (_b = _e["return"])) _b.call(_e);
            } finally {
              if (e_2) throw e_2.error;
            }
          }
          try {
            for (var _g = (e_3 = void 0, __values(token.rows)), _h = _g.next(); !_h.done; _h = _g.next()) {
              var row = _h.value;
              try {
                for (var row_1 = (e_4 = void 0, __values(row)), row_1_1 = row_1.next(); !row_1_1.done; row_1_1 = row_1.next()) {
                  var cell = row_1_1.value;
                  values = values.concat(marked.walkTokens(cell.tokens, callback));
                }
              } catch (e_4_1) {
                e_4 = {
                  error: e_4_1
                };
              } finally {
                try {
                  if (row_1_1 && !row_1_1.done && (_d = row_1["return"])) _d.call(row_1);
                } finally {
                  if (e_4) throw e_4.error;
                }
              }
            }
          } catch (e_3_1) {
            e_3 = {
              error: e_3_1
            };
          } finally {
            try {
              if (_h && !_h.done && (_c = _g["return"])) _c.call(_g);
            } finally {
              if (e_3) throw e_3.error;
            }
          }
          break;
        }
      case 'list':
        {
          values = values.concat(marked.walkTokens(token.items, callback));
          break;
        }
      default:
        {
          if (marked.defaults.extensions && marked.defaults.extensions.childTokens && marked.defaults.extensions.childTokens[token.type]) {
            // Walk any extensions
            marked.defaults.extensions.childTokens[token.type].forEach(function (childTokens) {
              values = values.concat(marked.walkTokens(token[childTokens], callback));
            });
          } else if (token.tokens) {
            values = values.concat(marked.walkTokens(token.tokens, callback));
          }
        }
    }
  };
  try {
    for (var tokens_3 = __values(tokens), tokens_3_1 = tokens_3.next(); !tokens_3_1.done; tokens_3_1 = tokens_3.next()) {
      var token = tokens_3_1.value;
      _loop_4(token);
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (tokens_3_1 && !tokens_3_1.done && (_a = tokens_3["return"])) _a.call(tokens_3);
    } finally {
      if (e_1) throw e_1.error;
    }
  }
  return values;
};
/**
 * Parse Inline
 * @param {string} src
 */
marked.parseInline = function (src, opt) {
  // throw error in case of non string input
  if (typeof src === 'undefined' || src === null) {
    throw new Error('marked.parseInline(): input parameter is undefined or null');
  }
  if (typeof src !== 'string') {
    throw new Error('marked.parseInline(): input parameter is of type ' + Object.prototype.toString.call(src) + ', string expected');
  }
  opt = merge({}, marked.defaults, opt || {});
  checkSanitizeDeprecation(opt);
  try {
    var tokens = Lexer.lexInline(src, opt);
    if (opt.walkTokens) {
      marked.walkTokens(tokens, opt.walkTokens);
    }
    return Parser.parseInline(tokens, opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/markedjs/marked.';
    if (opt.silent) {
      return '<p>An error occurred:</p><pre>' + escape(e.message + '', true) + '</pre>';
    }
    throw e;
  }
};
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
marked.parserVNode = VueParser.parse;
marked.VueRenderer = VueRenderer;
var parserVNode = VueParser.parse;
var options = marked.options;
var setOptions = marked.setOptions;
var use = marked.use;
var walkTokens = marked.walkTokens;
var parseInline = marked.parseInline;
var parse = marked;
var parser = Parser.parse;
var lexer = Lexer.lex;

export { Lexer, Parser, Renderer, Slugger, TextRenderer, Tokenizer, VueParser, VueRenderer, defaults, getDefaults, lexer, marked, options, parse, parseInline, parser, parserVNode, setOptions, use, walkTokens };
