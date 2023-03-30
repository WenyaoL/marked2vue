<script lang='ts'>
import { h, defineComponent, VNode } from 'vue';
import { VueParser, Lexer, marked,Slugger} from '../lib/marked2vue.esm'
import CustomComponent from './component/CustomComponent.vue'


export default defineComponent({
  setup() {

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

    return () => h('div',{class:'example'}, [example0,example1,example2,example3,example4,example5,example6])
  }
})
</script>