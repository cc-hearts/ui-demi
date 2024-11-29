import{d as y,h as g,o,c as E,I as e,w as a,a as i,F as m,k as s,E as d,R as F}from"./chunks/framework.BpIn9R8a.js";const u=s("div",null,"123",-1),f=y({__name:"form-schema.md.demo.328b434f",setup(p){const l=g(),n=[{label:"姓名",type:"input",name:"name",required:!0},{label:"邮箱",type:"input",name:"email",required:!0},{label:"性别",type:"select",name:"gender",componentProperty:{options:[{label:"male",value:"male"},{label:"female",value:"female"}]}},{label:"手机号码",type:"input-number",name:"phone",slot:{name:"phone"}}],h=async()=>{var t;const[k,r]=await((t=l.value)==null?void 0:t.validate());k&&console.log(r)};return(k,r)=>{const t=d("FormSchema"),c=d("el-button");return o(),E(m,null,[e(t,{ref_key:"formSchemaIns",ref:l,schema:n},{phone:a(()=>[u]),_:1},512),e(c,{onClick:h},{default:a(()=>[i("提交")]),_:1})],64)}}}),b=s("h1",{id:"form-schema",tabindex:"-1"},[i("Form-Schema "),s("a",{class:"header-anchor",href:"#form-schema","aria-label":'Permalink to "Form-Schema"'},"​")],-1),C=s("p",null,[s("code",null,"FormSchema"),i(" 组件基于 "),s("code",null,"Form"),i(" 组件进行封装，使用 JSON Schema 描述表单的结构和验证规则，然后生成对应的表单。")],-1),_=s("h2",{id:"基本使用",tabindex:"-1"},[i("基本使用 "),s("a",{class:"header-anchor",href:"#基本使用","aria-label":'Permalink to "基本使用"'},"​")],-1),B=s("div",{class:"language-vue vp-adaptive-theme"},[s("span",{class:"lang"},"vue"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"<"),s("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"template"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  <"),s("span",{style:{"--shiki-light":"#B31D28","--shiki-dark":"#FDAEB7","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}},"FormSchema"),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," ref"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"formSchemaIns"'),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," :"),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"schema"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"'),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"schema"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"'),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    <"),s("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"template"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," #"),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"phone"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"      <"),s("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"div"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">123</"),s("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"div"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    </"),s("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"template"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  </"),s("span",{style:{"--shiki-light":"#B31D28","--shiki-dark":"#FDAEB7","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}},"FormSchema"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  <"),s("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"el-button"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," @"),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"click"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"'),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"submit"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"'),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">提交</"),s("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"el-button"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"</"),s("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"template"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"<"),s("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"script"),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," setup"),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," lang"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"ts"'),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"import"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," { ref } "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"from"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}}," 'vue'")]),i(`
`),s("span",{class:"line"}),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"const"),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," formSchemaIns"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," ="),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," ref"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"()")]),i(`
`),s("span",{class:"line"}),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"const"),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," schema"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," ="),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," [")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  { label: "),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'姓名'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", type: "),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'input'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", name: "),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'name'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", required: "),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"true"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," },")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  { label: "),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'邮箱'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", type: "),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'input'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", name: "),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'email'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", required: "),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"true"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," },")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  {")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    label: "),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'性别'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},",")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    type: "),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'select'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},",")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    name: "),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'gender'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},",")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    componentProperty: {")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"      options: [")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"        { label: "),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'male'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", value: "),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'male'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," },")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"        { label: "),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'female'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", value: "),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'female'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," },")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"      ],")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    },")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  },")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  {")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    label: "),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'手机号码'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},",")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    type: "),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'input-number'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},",")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    name: "),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'phone'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},",")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    slot: { name: "),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'phone'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," },")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  },")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"]")]),i(`
`),s("span",{class:"line"}),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"const"),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," submit"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," ="),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," async"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," () "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"=>"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," {")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"  const"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," ["),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"bool"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", "),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"fields"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"] "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," await"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," formSchemaIns.value?."),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"validate"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"()")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"  if"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," ("),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"!"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"bool) {")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"    return")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  }")]),i(`
`),s("span",{class:"line"}),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  console."),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"log"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(fields)")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"}")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"</"),s("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"script"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")])])])],-1),v=F(`<h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table><thead><tr><th>属性</th><th>类型</th><th>必填</th><th>描述</th><th>默认值</th></tr></thead><tbody><tr><td>layout</td><td><a href="#formlayout">FormLayout</a></td><td><code>false</code></td><td>表单布局</td><td><code>{ span: 3, gutter: 12 }</code></td></tr><tr><td>schema</td><td><a href="#schema">Schema</a></td><td><code>false</code></td><td>表单 schema</td><td><code>[]</code></td></tr><tr><td>defaultValue</td><td><code>Record&lt;string, any&gt;</code> | <code>(() =&gt; any)</code></td><td><code>false</code></td><td>表单默认值</td><td><code>{}</code></td></tr><tr><td>labelPosition</td><td><code>top</code> | <code>left</code></td><td><code>false</code></td><td>表单 label 布局位置</td><td><code>top</code></td></tr></tbody></table><h3 id="schema" tabindex="-1">Schema <a class="header-anchor" href="#schema" aria-label="Permalink to &quot;Schema&quot;">​</a></h3><table><thead><tr><th>属性</th><th>类型</th><th>必填</th><th>描述</th><th>默认值</th></tr></thead><tbody><tr><td>label</td><td>string</td><td><code>false</code></td><td>字段的标签，用于显示在表单中。</td><td><code>-</code></td></tr><tr><td>type</td><td>string</td><td><code>true</code></td><td>表单子项的组件类型，内置有 select、input、radio等，如果内置组件不包含预期类型，可使用 <code>extensionComponentMap</code> 方法覆盖/增加类型</td><td><code>-</code></td></tr><tr><td>name</td><td>string</td><td><code>true</code></td><td>字段的名称，用于表单数据的存储和传递。</td><td><code>-</code></td></tr><tr><td>required</td><td>boolean</td><td><code>false</code></td><td>是否为必填项，若为 true，则在表单提交时需要进行验证。</td><td><code>false</code></td></tr><tr><td>span</td><td>number</td><td><code>false</code></td><td>字段所占据的栅格数（一屏的栅格数为24），用于控制表单布局，默认值根据布局 <code>span</code> 自动计算。</td><td><code>-</code></td></tr><tr><td>offset</td><td>number</td><td><code>false</code></td><td>字段的偏移栅格数，用于控制表单布局。</td><td><code>-</code></td></tr><tr><td>slot</td><td>{ name: string; [props: string]: any }</td><td><code>false</code></td><td>字段的插槽信息，用于自定义表单字段的展示。</td><td><code>-</code></td></tr><tr><td>labelSlot</td><td>{ name: string; [props: string]: any }</td><td><code>false</code></td><td>用于定义自定义 label 的展示。</td><td><code>-</code></td></tr><tr><td>rules</td><td>Array&lt;Record&lt;string, unknown&gt;&gt;</td><td><code>false</code></td><td>字段的验证规则，用于自定义验证逻辑。</td><td><code>-</code></td></tr><tr><td>hiddenLabel</td><td>boolean</td><td><code>false</code></td><td>是否隐藏标签</td><td><code>true</code></td></tr><tr><td>labelWidth</td><td>string | number</td><td><code>false</code></td><td>标签宽度</td><td><code>-</code></td></tr><tr><td>componentProperty</td><td>{ options?: <a href="#options">Options</a>[], [props: string]: any }</td><td><code>false</code></td><td>组件覆盖属性，此属性用于上游有提供属性，但是 FormSchema 组件的 props 没有覆盖，可以使用此属性进行属性的优先级覆盖。</td><td><code>{}</code></td></tr></tbody></table><h3 id="formlayout" tabindex="-1">FormLayout <a class="header-anchor" href="#formlayout" aria-label="Permalink to &quot;FormLayout&quot;">​</a></h3><table><thead><tr><th>属性</th><th>类型</th><th>必填</th><th>描述</th><th>默认值</th></tr></thead><tbody><tr><td>span</td><td>number</td><td><code>true</code></td><td>设置布局的跨度。</td><td><code>-</code></td></tr><tr><td>gutter</td><td>number</td><td><code>true</code></td><td>设置布局的间距。</td><td><code>-</code></td></tr></tbody></table><h2 id="方法" tabindex="-1">方法 <a class="header-anchor" href="#方法" aria-label="Permalink to &quot;方法&quot;">​</a></h2><table><thead><tr><th>方法名称</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td><code>validate</code></td><td><code>-</code></td><td>异步验证表单，如果验证失败返回 <code>[false, null]</code>，否则返回 <code>[true, formValue]</code>。</td></tr><tr><td><code>resetFields</code></td><td><code>-</code></td><td>重置表单的所有字段。</td></tr><tr><td><code>setFieldValue</code></td><td><code>(field: PropertyKey</code>, <code>value: unknown) =&gt; void</code></td><td>设置指定字段的值。</td></tr><tr><td><code>setFieldsValue</code></td><td><code>(target: Record&lt;PropertyKey, any&gt;) =&gt; void</code></td><td>批量设置多个字段的值。</td></tr><tr><td><code>getFieldsValue</code></td><td><code>-</code></td><td>获取表单的所有字段值。</td></tr><tr><td><code>getFieldValue</code></td><td><code>(field: PropertyKey) =&gt; any</code></td><td>获取指定字段的值。</td></tr><tr><td><code>getInstance</code></td><td><code>-</code></td><td>获取表单实例的计算属性。</td></tr><tr><td><code>getFormValue</code></td><td><code>-</code></td><td>获取表单值的计算属性。</td></tr></tbody></table><h2 id="faq" tabindex="-1">FAQ <a class="header-anchor" href="#faq" aria-label="Permalink to &quot;FAQ&quot;">​</a></h2><h3 id="schema-中的-type-类型组件如果没有覆盖到-如何进行扩展" tabindex="-1">schema 中的 type 类型组件如果没有覆盖到，如何进行扩展？ <a class="header-anchor" href="#schema-中的-type-类型组件如果没有覆盖到-如何进行扩展" aria-label="Permalink to &quot;schema 中的 type 类型组件如果没有覆盖到，如何进行扩展？&quot;">​</a></h3><p>可以通过 <code>extensionComponentMap</code> 方法进行扩展，例如：</p><blockquote><p><code>extensionComponentMap</code> 的调用时机应要早于 <code>FormSchema</code> 的初始化，否则会导致扩展的组件无法被识别。 建议在 <code>main.ts</code> 中进行扩展。</p></blockquote><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { extensionComponentMap } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;form-schema&#39;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// CustomSelect is custom component</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">extensionComponentMap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;select&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, CustomSelect)</span></span></code></pre></div>`,13),S=JSON.parse('{"title":"Form-Schema","description":"","frontmatter":{},"headers":[],"relativePath":"docs/form-schema.md","filePath":"docs/form-schema.md"}'),A={name:"docs/form-schema.md"},q=Object.assign(A,{setup(p){return(l,n)=>{const h=d("demo");return o(),E("div",null,[b,C,_,e(h,{customClass:"",sourceCode:`<template>
  <FormSchema ref="formSchemaIns" :schema="schema">
    <template #phone>
      <div>123</div>
    </template>
  </FormSchema>
  <el-button @click="submit">提交</el-button>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const formSchemaIns = ref()

const schema = [
  { label: '姓名', type: 'input', name: 'name', required: true },
  { label: '邮箱', type: 'input', name: 'email', required: true },
  {
    label: '性别',
    type: 'select',
    name: 'gender',
    componentProperty: {
      options: [
        { label: 'male', value: 'male' },
        { label: 'female', value: 'female' },
      ],
    },
  },
  {
    label: '手机号码',
    type: 'input-number',
    name: 'phone',
    slot: { name: 'phone' },
  },
]

const submit = async () => {
  const [bool, fields] = await formSchemaIns.value?.validate()
  if (!bool) {
    return
  }

  console.log(fields)
}
<\/script>
`,options:"{}"},{highlight:a(()=>[B]),default:a(()=>[e(f)]),_:1}),v])}}});export{S as __pageData,q as default};