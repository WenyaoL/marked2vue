<script lang='ts'>
import { Lexer } from '../src/index'
import { VueParser,Parser } from '../src/index'
import { h,defineComponent, VNode, createStaticVNode,createVNode,VNodeTypes} from 'vue';
import {inline} from '../src/marked/rules'

export default defineComponent({
    setup(props) {
        const fontMarkdownText = `**bold font**\`codeInline font\`*em font*~~deleteLine font~~**bold + ~~deleteLine~~ font**<u>123456</u><span>asdfasdfasdfasdfasdfasdf</span>`
        const lexer = new Lexer({})
        const lexer2 = new Lexer(null)
        const lexer3 = new Lexer()

        const tokens = lexer.lex(fontMarkdownText)
        const tokens2 = lexer2.lex(fontMarkdownText)
        const tokens3 = lexer3.lex(fontMarkdownText)
        console.log(tokens);
        console.log(tokens2);
        console.log(tokens3);

       
        const parser = new VueParser()
        const vnode = parser.parse(tokens)
        const vnode2 = parser.parse(tokens2)
        const vnode3 = parser.parse(tokens3) as any
        console.log(vnode);
        console.log(vnode2);
        console.log(vnode3);
        
        

        console.log("inline==>",parser.parseInline(lexer2.inlineTokens(fontMarkdownText)));
        console.log("inline rule=>",inline.tag);
        

        const htmlParser = new Parser()
        const html = htmlParser.parse(tokens)
        const html2 = htmlParser.parse(tokens2)
        const html3 = htmlParser.parse(tokens3)

        console.log(html);
        console.log(html2);
        console.log(html3);

        console.log(createStaticVNode("<div>asdfasdfasdf</div>",123));
        console.log(createVNode("div",null,"asdfasdfasdf"));

        
        return ()=>h('div',{class:'marked-exmple'},[vnode,vnode2,vnode3,h('div',{innerHTML:html}),h('div',{innerHTML:html2}),h('div',{innerHTML:html3}),createStaticVNode("<div>asdfasdfasdf</div>",123)])
        //return ()=>h('div',{class:'marked-exmple'},[vnode3])
    }
})

</script>

<style scoped></style>