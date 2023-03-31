# marked2vue
A markdown parser and compiler. Built for speed.Integrate Vue framework based on the Marked.

Marked2vue based on the Marked.You can use Marked2vue just like Marked.

- ⚡ built for speed
- ⬇️ low-level compiler for parsing markdown without caching or blocking for long periods of time
- :derelict_house: Support for markdown to VNode
- :+1: Seamless compatibility with Marked



### Install

```shell
npm install marked2vue
```



### Original functions of Marked

You can use Marked2vue just like Marked，Marked Doc：[Marked Documentation](https://marked.js.org/)

```ts
import { marked } from 'marked2vue';

marked.use({
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartypants: false,
  xhtml: false
});

const html = marked.parse('# Marked in Node.js\n\nRendered by **marked**.');
```

### Extended functionality

marked2vue Integrate Vue framework，You can parse the markdown string into a virtual node in Vue using the parseVNode function.

```ts
import { h, defineComponent, VNode } from 'vue';
import { VueParser, Lexer, marked} from 'marked2vue'
export default defineComponent({
  setup() {
    const lexer = new Lexer() as any
    const vueParser = new VueParser()
    const vnode = vueParser.parse(lexer.lex('# Marked in Node.js\n\nRendered by **marked**.'))

    return () => h('div', vnode)
  }
})
```



### function

#### Markdown to HTML String

```ts
import { marked,Lexer,Parser } from 'marked2vue'
//use Original functions of Marked
let html = marked.parse('# example-0\n\nRendered by **marked**.');

//or
html = marked('# example-5\n\nRendered by **marked**.')

//or
const lexer = new Lexer()
const parser = new Parser()
const tokens = lexer.lex('# example-3\n\nRendered by **marked**.')
html = parser.parse(tokens)
```



#### Markdown to VNode of Vue 

```ts
import { marked,Lexer,VueParser } from 'marked2vue'
//marked2vue extension function
let vnode = marked.parseVNode('# example-2\n\nRendered by **marked**.')

//or
vnode = marked('# example-5\n\nRendered by **marked**.',{isVNodeModel:true})

//or
const lexer = new Lexer()
const vueParser = new VueParser()
const tokens = lexer.lex('# example-3\n\nRendered by **marked**.')
vnode = vueParser.parse(tokens)
```



#### Asynchronous highlighting

The codeBlock use asynchronous highlighting in marked.

##### highlighting html

more info [Using Advanced - Marked Documentation](https://marked.js.org/using_advanced#highlight)

```js
marked.setOptions({
  highlight: function(code, lang, callback) {
    require('pygmentize-bundled') ({ lang: lang, format: 'html' }, code, function (err, result) {
      callback(err, result.toString());
    });
  }
});

marked.parse(markdownString, (err, html) => {
  console.log(html);
});
```

##### highlighting vnode

```ts
import { h, VNode, defineComponent } from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'

export default defineComponent({
    setup() {
        //curr
        const instance = getCurrentInstance()
        let vnode:VNode = null
        //or use setOptions() add highlight function
        const highlightcode = marked.parseVNode(fenceMarkdownText,{
            highlight:function(code, lang, callback){  //custom highlight function
                const res = hljs.highlight(code, {language: lang,ignoreIllegals: true}).value
                callback(null, res); //callback result
            }
        },(err,res)=>{ //callback
            vnode = h('div',{class:'example-7'}, res)
            instance?.proxy?.$forceUpdate()  //update vnode render
        })
        
        return ()=>h('div',{class:'myexmple'},vnode)
    }
})
```



### Extensibility

marked extension:[Using Pro - Marked Documentation](https://marked.js.org/using_pro)

#### add marked extension

```js
// Create reference instance
import { marked } from 'marked2vue';

// Override function
const renderer = {
  heading(text, level) {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

    return `
            <h${level}>
              <a name="${escapedText}" class="anchor" href="#${escapedText}">
                <span class="header-link"></span>
              </a>
              ${text}
            </h${level}>`;
  }
};

marked.use({ renderer });

// Run marked
console.log(marked.parse('# heading+'));
```



#### add marked2vue extension

base on marked extension. add vueRenderer extension。

##### CustomComponent.vue

```vue
<script setup lang='ts'>
const props = defineProps<{ level: string | number, id?: string }>()
</script>

<template>
    <h1 class="myHeading" :id="id" v-if="level == '1'">
        <slot></slot>
    </h1>
    <h2 class="myHeading" :id="id" v-else-if="level == '2'">
        <slot></slot>
    </h2>
    <h3 class="myHeading" :id="id" v-else-if="level == '3'">
        <slot></slot>
    </h3>
    <h4 class="myHeading" :id="id" v-else-if="level == '4'">
        <slot></slot>
    </h4>
    <h5 class="myHeading" :id="id" v-else-if="level == '5'">
        <slot></slot>
    </h5>
    <h6 class="myHeading" :id="id" v-else>
        <slot></slot>
    </h6>
</template>

<style scoped>
.myHeading{}
</style>
```

##### App.vue

```vue
<script lang='ts'>
import { h, defineComponent, VNode } from 'vue';
import { VueParser, Lexer, marked,Slugger} from '../lib/marked2vue.esm'
import CustomComponent from './component/CustomComponent.vue'

export default defineComponent({
  setup() {
    //like renderer.heading, but "inlineVnode" instead of "text"
    const vueRenderer = {
      heading(inlineVnode:VNode[], level:string, raw:string,slugger:any) {
        return h(CustomComponent,{level},()=>inlineVnode);
      }
    }
    marked.use({ vueRenderer });

    const lexer = new Lexer() as any
    const vueParser = new VueParser()

    const vnode = vueParser.parse(lexer.lex('# Marked in Node.js\n\nRendered by **marked**.'))

    return () => h('div', vnode)
  }
})
</script>
```

##### result

```html
<div>
  <h1 data-v-cc7286a7="" class="myHeading">Marked in Node.js</h1>
  <p data-v-2704c122="" class="marked-vue-paragraph">Rendered by
    <strong data-v-2704c122-s="" class="marked-vue-bold">marked</strong>.</p>
</div>
```





### comparison

```vue
<script lang='ts'>
import { h, defineComponent, VNode } from 'vue';
import { VueParser, Lexer, marked,Slugger} from 'marked2vue'
import CustomComponent from './component/CustomComponent.vue'
import { fenceMarkdownText } from './markdownText'
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'

export default defineComponent({
  setup() {
	//curr
    const instance = getCurrentInstance()
    
    //use Original functions of Marked
    const html = marked.parse('# example-0\n\nRendered by **marked**.');
    const example0 = h('div',{class:'example-0',innerHTML:html})

    // Override function(marked extension)
    const renderer = {
    heading(text, level) {
        const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
        return `
                <h${level}>
                <a name="${escapedText}" class="anchor" href="#${escapedText}">
                    <span class="header-link"></span>
                </a>
                ${text}
                </h${level}>`;
    }
    };
    marked.use({ renderer });
    const html2 = marked.parse('# example-1\n\nRendered by **marked**.');
    const example1 = h('div',{class:'example-1',innerHTML:html2})



    //use Extended functionality
    const vnode1 = marked.parseVNode('# example-2\n\nRendered by **marked**.')
    const example2 = h('div',{class:'example-2'}, vnode1)

    //use lexer and vueParser
    const lexer = new Lexer() as any
    const vueParser = new VueParser()
    const tokens = lexer.lex('# example-3\n\nRendered by **marked**.')
    const vnode2 = vueParser.parse(tokens)
    const example3 = h('div',{class:'example-3'}, vnode2)

    //marked2vue extension
    const vueRenderer = {
      heading(inlineVnode:VNode[], level:string, raw:string,slugger:any) {
        return h(CustomComponent,{level},()=>inlineVnode);
      }
    }
    marked.use({ vueRenderer });
    const vnode3 = marked.parseVNode('# example-4\n\nRendered by **marked**.')
    const example4 = h('div',{class:'example-4'}, vnode3)


    //Original marked 
    const originalHtml = marked('# example-5\n\nRendered by **marked**.')
    const example5 = h('div',{class:'example-5',innerHTML:originalHtml})

    const originalVNode = marked('# example-6\n\nRendered by **marked**.',{isVNodeModel:true})
    const example6 = h('div',{class:'example-6'}, originalVNode)

    //highlight code block
    let example7:any = null
    const highlightcode = marked.parseVNode(fenceMarkdownText,{
      highlight:function(code, lang, callback){  //custom highlight
        const res = hljs.highlight(code, {language: lang,ignoreIllegals: true}).value
        callback(null, res);
      }
    },(err,res)=>{ //callback
      example7 = h('div',{class:'example-7'}, res)
      console.log(example7);
      instance?.proxy?.$forceUpdate()  //update vnode render
    })


    return () => h('div',{class:'example'}, [example0,example1,example2,example3,example4,example5,example6,example7])
  }
})
</script>
```



