<script lang='ts'>
import { h, defineComponent, VNode } from 'vue';
import { VueParser, Lexer, marked,Slugger} from '../src/index'
import { markdownText3,listMarkdownText} from './markdownText';
export default defineComponent({
  setup() {
    
    const lexer = new Lexer() as any
    const vueParser = new VueParser()
    const tokens = lexer.lex(listMarkdownText)
    console.log(tokens[1].items);
    
    const vnode = vueParser.parse(tokens[1].items)
    const vnode2 = vueParser.parse(tokens)
    return () => h('div',{class:'my-example'}, [vnode,vnode2])
  }
})
</script>

