<script lang='ts'>
import { MarkerEndProperty } from 'csstype';
import { h, defineComponent, VNode } from 'vue';
import { VueParser, Lexer, marked,Slugger} from '../lib/marked2vue.esm'
import CustomComponent from './component/CustomComponent.vue'
import { markdownText3 } from './markdownText';


export default defineComponent({
  setup() {
    
    const vueRenderer = {
      heading(inlineVnode:VNode[], level:string, raw:string,slugger:any) {
        return h(CustomComponent,{level},()=>inlineVnode);
      }
    }
    marked.use({ vueRenderer });

    const lexer = new Lexer() as any
    const vueParser = new VueParser()

    const vnode = vueParser.parse(lexer.lex(markdownText3))

    return () => h('div', vnode)
  }
})
</script>