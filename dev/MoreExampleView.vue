<script lang='ts'>
import { h, defineComponent, VNode } from 'vue';
import { VueParser, Lexer, marked,Slugger} from '../src/index'
import { markdownText3,listMarkdownText} from './markdownText';


export default defineComponent({
  setup() {
    
    const lexer = new Lexer() as any
    const vueParser = new VueParser()
    const vnode = vueParser.parse(lexer.lex(markdownText3))



    return () => h('div',{class:'more-example'}, vnode)
  }
})
</script>