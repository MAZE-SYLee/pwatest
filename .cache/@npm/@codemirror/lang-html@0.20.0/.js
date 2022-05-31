import{parser as e,configureNesting as l}from"/@npm/@lezer/html";import{cssLanguage as t,css as a}from"/@npm/@codemirror/lang-css";import{javascriptLanguage as n,javascript as r}from"/@npm/@codemirror/lang-javascript";import{EditorView as o}from"/@npm/@codemirror/view";import{EditorSelection as i}from"/@npm/@codemirror/state";import{syntaxTree as s,LRLanguage as u,indentNodeProp as d,foldNodeProp as m,LanguageSupport as c}from"/@npm/@codemirror/language";const p=["_blank","_self","_top","_parent"],f=["ascii","utf-8","utf-16","latin1","latin1"],g=["get","post","put","delete"],h=["application/x-www-form-urlencoded","multipart/form-data","text/plain"],b=["true","false"],y={},v={a:{attrs:{href:null,ping:null,type:null,media:null,target:p,hreflang:null}},abbr:y,acronym:y,address:y,applet:y,area:{attrs:{alt:null,coords:null,href:null,target:null,ping:null,media:null,hreflang:null,type:null,shape:["default","rect","circle","poly"]}},article:y,aside:y,audio:{attrs:{src:null,mediagroup:null,crossorigin:["anonymous","use-credentials"],preload:["none","metadata","auto"],autoplay:["autoplay"],loop:["loop"],controls:["controls"]}},b:y,base:{attrs:{href:null,target:p}},basefont:y,bdi:y,bdo:y,big:y,blockquote:{attrs:{cite:null}},body:y,br:y,button:{attrs:{form:null,formaction:null,name:null,value:null,autofocus:["autofocus"],disabled:["autofocus"],formenctype:h,formmethod:g,formnovalidate:["novalidate"],formtarget:p,type:["submit","reset","button"]}},canvas:{attrs:{width:null,height:null}},caption:y,center:y,cite:y,code:y,col:{attrs:{span:null}},colgroup:{attrs:{span:null}},command:{attrs:{type:["command","checkbox","radio"],label:null,icon:null,radiogroup:null,command:null,title:null,disabled:["disabled"],checked:["checked"]}},data:{attrs:{value:null}},datagrid:{attrs:{disabled:["disabled"],multiple:["multiple"]}},datalist:{attrs:{data:null}},dd:y,del:{attrs:{cite:null,datetime:null}},details:{attrs:{open:["open"]}},dfn:y,dir:y,div:y,dl:y,dt:y,em:y,embed:{attrs:{src:null,type:null,width:null,height:null}},eventsource:{attrs:{src:null}},fieldset:{attrs:{disabled:["disabled"],form:null,name:null}},figcaption:y,figure:y,font:y,footer:y,form:{attrs:{action:null,name:null,"accept-charset":f,autocomplete:["on","off"],enctype:h,method:g,novalidate:["novalidate"],target:p}},frame:y,frameset:y,h1:y,h2:y,h3:y,h4:y,h5:y,h6:y,head:{children:["title","base","link","style","meta","script","noscript","command"]},header:y,hgroup:y,hr:y,html:{attrs:{manifest:null}},i:y,iframe:{attrs:{src:null,srcdoc:null,name:null,width:null,height:null,sandbox:["allow-top-navigation","allow-same-origin","allow-forms","allow-scripts"],seamless:["seamless"]}},img:{attrs:{alt:null,src:null,ismap:null,usemap:null,width:null,height:null,crossorigin:["anonymous","use-credentials"]}},input:{attrs:{alt:null,dirname:null,form:null,formaction:null,height:null,list:null,max:null,maxlength:null,min:null,name:null,pattern:null,placeholder:null,size:null,src:null,step:null,value:null,width:null,accept:["audio/*","video/*","image/*"],autocomplete:["on","off"],autofocus:["autofocus"],checked:["checked"],disabled:["disabled"],formenctype:h,formmethod:g,formnovalidate:["novalidate"],formtarget:p,multiple:["multiple"],readonly:["readonly"],required:["required"],type:["hidden","text","search","tel","url","email","password","datetime","date","month","week","time","datetime-local","number","range","color","checkbox","radio","file","submit","image","reset","button"]}},ins:{attrs:{cite:null,datetime:null}},kbd:y,keygen:{attrs:{challenge:null,form:null,name:null,autofocus:["autofocus"],disabled:["disabled"],keytype:["RSA"]}},label:{attrs:{for:null,form:null}},legend:y,li:{attrs:{value:null}},link:{attrs:{href:null,type:null,hreflang:null,media:null,sizes:["all","16x16","16x16 32x32","16x16 32x32 64x64"]}},map:{attrs:{name:null}},mark:y,menu:{attrs:{label:null,type:["list","context","toolbar"]}},meta:{attrs:{content:null,charset:f,name:["viewport","application-name","author","description","generator","keywords"],"http-equiv":["content-language","content-type","default-style","refresh"]}},meter:{attrs:{value:null,min:null,low:null,high:null,max:null,optimum:null}},nav:y,noframes:y,noscript:y,object:{attrs:{data:null,type:null,name:null,usemap:null,form:null,width:null,height:null,typemustmatch:["typemustmatch"]}},ol:{attrs:{reversed:["reversed"],start:null,type:["1","a","A","i","I"]},children:["li","script","template","ul","ol"]},optgroup:{attrs:{disabled:["disabled"],label:null}},option:{attrs:{disabled:["disabled"],label:null,selected:["selected"],value:null}},output:{attrs:{for:null,form:null,name:null}},p:y,param:{attrs:{name:null,value:null}},pre:y,progress:{attrs:{value:null,max:null}},q:{attrs:{cite:null}},rp:y,rt:y,ruby:y,s:y,samp:y,script:{attrs:{type:["text/javascript"],src:null,async:["async"],defer:["defer"],charset:f}},section:y,select:{attrs:{form:null,name:null,size:null,autofocus:["autofocus"],disabled:["disabled"],multiple:["multiple"]}},slot:{attrs:{name:null}},small:y,source:{attrs:{src:null,type:null,media:null}},span:y,strike:y,strong:y,style:{attrs:{type:["text/css"],media:null,scoped:null}},sub:y,summary:y,sup:y,table:y,tbody:y,td:{attrs:{colspan:null,rowspan:null,headers:null}},template:y,textarea:{attrs:{dirname:null,form:null,maxlength:null,name:null,placeholder:null,rows:null,cols:null,autofocus:["autofocus"],disabled:["disabled"],readonly:["readonly"],required:["required"],wrap:["soft","hard"]}},tfoot:y,th:{attrs:{colspan:null,rowspan:null,headers:null,scope:["row","col","rowgroup","colgroup"]}},thead:y,time:{attrs:{datetime:null}},title:y,tr:y,track:{attrs:{src:null,label:null,default:null,kind:["subtitles","captions","descriptions","chapters","metadata"],srclang:null}},tt:y,u:y,ul:{children:["li","script","template","ul","ol"]},var:y,video:{attrs:{src:null,poster:null,width:null,height:null,crossorigin:["anonymous","use-credentials"],preload:["auto","metadata","none"],autoplay:["autoplay"],mediagroup:["movie"],muted:["muted"],controls:["controls"]}},wbr:y},x={accesskey:null,class:null,contenteditable:b,contextmenu:null,dir:["ltr","rtl","auto"],draggable:["true","false","auto"],dropzone:["copy","move","link","string:","file:"],hidden:["hidden"],id:null,inert:["inert"],itemid:null,itemprop:null,itemref:null,itemscope:["itemscope"],itemtype:null,lang:["ar","bn","de","en-GB","en-US","es","fr","hi","id","ja","pa","pt","ru","tr","zh"],spellcheck:b,autocorrect:b,autocapitalize:b,style:null,tabindex:null,title:null,translate:["yes","no"],onclick:null,rel:["stylesheet","alternate","author","bookmark","help","license","next","nofollow","noreferrer","prefetch","prev","search","tag"],role:"alert application article banner button cell checkbox complementary contentinfo dialog document feed figure form grid gridcell heading img list listbox listitem main navigation region row rowgroup search switch tab table tabpanel textbox timer".split(" "),"aria-activedescendant":null,"aria-atomic":b,"aria-autocomplete":["inline","list","both","none"],"aria-busy":b,"aria-checked":["true","false","mixed","undefined"],"aria-controls":null,"aria-describedby":null,"aria-disabled":b,"aria-dropeffect":null,"aria-expanded":["true","false","undefined"],"aria-flowto":null,"aria-grabbed":["true","false","undefined"],"aria-haspopup":b,"aria-hidden":b,"aria-invalid":["true","false","grammar","spelling"],"aria-label":null,"aria-labelledby":null,"aria-level":null,"aria-live":["off","polite","assertive"],"aria-multiline":b,"aria-multiselectable":b,"aria-owns":null,"aria-posinset":null,"aria-pressed":["true","false","mixed","undefined"],"aria-readonly":b,"aria-relevant":null,"aria-required":b,"aria-selected":["true","false","undefined"],"aria-setsize":null,"aria-sort":["ascending","descending","none","other"],"aria-valuemax":null,"aria-valuemin":null,"aria-valuenow":null,"aria-valuetext":null},w=Object.keys(v),C=Object.keys(x);function elementName(e,l,t=e.length){if(!l)return"";let a=l.firstChild,n=a&&a.getChild("TagName");return n?e.sliceString(n.from,Math.min(n.to,t)):""}function findParentElement(e,l=!1){for(let t=e.parent;t;t=t.parent)if("Element"==t.name){if(!l)return t;l=!1}return null}function allowedChildren(e,l){let t=v[elementName(e,findParentElement(l,!0))];return(null==t?void 0:t.children)||w}function openTags(e,l){let t=[];for(let a=l;a=findParentElement(a);){let n=elementName(e,a);if(n&&"CloseTag"==a.lastChild.name)break;n&&t.indexOf(n)<0&&("EndTag"==l.name||l.from>=a.firstChild.to)&&t.push(n)}return t}const T=/^[:\-\.\w\u00b7-\uffff]*$/;function completeTag(e,l,t,a){let n=/\s*>/.test(e.sliceDoc(a,a+5))?"":">";return{from:t,to:a,options:allowedChildren(e.doc,l).map(e=>({label:e,type:"type"})).concat(openTags(e.doc,l).map((e,l)=>({label:"/"+e,apply:"/"+e+n,type:"type",boost:99-l}))),validFor:/^\/?[:\-\.\w\u00b7-\uffff]*$/}}function completeCloseTag(e,l,t,a){let n=/\s*>/.test(e.sliceDoc(a,a+5))?"":">";return{from:t,to:a,options:openTags(e.doc,l).map((e,l)=>({label:e,apply:e+n,type:"type",boost:99-l})),validFor:T}}function htmlCompletionSource(e){let{state:l,pos:t}=e,a=s(l).resolveInner(t),n=a.resolve(t,-1);for(let r,o=t;a==n&&(r=n.childBefore(o));){let e=r.lastChild;if(!e||!e.type.isError||e.from<e.to)break;a=n=r,o=e.from}return"TagName"==n.name?n.parent&&/CloseTag$/.test(n.parent.name)?completeCloseTag(l,n,n.from,t):completeTag(l,n,n.from,t):"StartTag"==n.name?completeTag(l,n,t,t):"StartCloseTag"==n.name||"IncompleteCloseTag"==n.name?completeCloseTag(l,n,t,t):e.explicit&&("OpenTag"==n.name||"SelfClosingTag"==n.name)||"AttributeName"==n.name?function(e,l,t,a){let n=findParentElement(l),r=n?v[elementName(e.doc,n)]:null;return{from:t,to:a,options:(r&&r.attrs?Object.keys(r.attrs).concat(C):C).map(e=>({label:e,type:"property"})),validFor:T}}(l,n,"AttributeName"==n.name?n.from:t,t):"Is"==n.name||"AttributeValue"==n.name||"UnquotedAttributeValue"==n.name?function(e,l,t,a){var n;let r=null===(n=l.parent)||void 0===n?void 0:n.getChild("AttributeName"),o=[],i=void 0;if(r){let n=e.sliceDoc(r.from,r.to),s=x[n];if(!s){let t=findParentElement(l),a=t?v[elementName(e.doc,t)]:null;s=(null==a?void 0:a.attrs)&&a.attrs[n]}if(s){let l=e.sliceDoc(t,a).toLowerCase(),n='"',r='"';/^['"]/.test(l)?(i='"'==l[0]?/^[^"]*$/:/^[^']*$/,n="",r=e.sliceDoc(a,a+1)==l[0]?"":l[0],l=l.slice(1),t++):i=/^[^\s<>='"]*$/;for(let e of s)o.push({label:e,apply:n+e+r,type:"constant"})}}return{from:t,to:a,options:o,validFor:i}}(l,n,"Is"==n.name?t:n.from,t):!e.explicit||"Element"!=a.name&&"Text"!=a.name&&"Document"!=a.name?null:function(e,l,t){let a=[],n=0;for(let r of allowedChildren(e.doc,l))a.push({label:"<"+r,type:"type"});for(let r of openTags(e.doc,l))a.push({label:"</"+r+">",type:"type",boost:99-n++});return{from:t,to:t,options:a,validFor:/^<\/?[:\-\.\w\u00b7-\uffff]*$/}}(l,n,t)}const k=u.define({parser:e.configure({props:[d.add({Element(e){let l=/^(\s*)(<\/)?/.exec(e.textAfter);return e.node.to<=e.pos+l[0].length?e.continue():e.lineIndent(e.node.from)+(l[2]?0:e.unit)},"OpenTag CloseTag SelfClosingTag":e=>e.column(e.node.from)+e.unit,Document(e){if(e.pos+/\s*/.exec(e.textAfter)[0].length<e.node.to)return e.continue();let l,t=null;for(let a=e.node;;){let e=a.lastChild;if(!e||"Element"!=e.name||e.to!=a.to)break;t=a=e}return t&&(!(l=t.lastChild)||"CloseTag"!=l.name&&"SelfClosingTag"!=l.name)?e.lineIndent(t.from)+e.unit:null}}),m.add({Element(e){let l=e.firstChild,t=e.lastChild;return l&&"OpenTag"==l.name?{from:l.to,to:"CloseTag"==t.name?t.from:e.to}:null}})],wrap:l([{tag:"script",attrs:e=>!e.type||/^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i.test(e.type),parser:n.parser},{tag:"style",attrs:e=>(!e.lang||"css"==e.lang)&&(!e.type||/^(text\/)?(x-)?(stylesheet|css)$/i.test(e.type)),parser:t.parser}])}),languageData:{commentTokens:{block:{open:"\x3c!--",close:"--\x3e"}},indentOnInput:/^\s*<\/\w+\W$/,wordChars:"-._"}});function html(e={}){let l=k;return!1===e.matchClosingTags&&(l=l.configure({dialect:"noMatch"})),new c(l,[k.data.of({autocomplete:htmlCompletionSource}),!1!==e.autoCloseTags?$:[],r().support,a().support])}const $=o.inputHandler.of((e,l,t,a)=>{if(e.composing||e.state.readOnly||l!=t||">"!=a&&"/"!=a||!k.isActiveAt(e.state,l,-1))return!1;let{state:n}=e,r=n.changeByRange(e=>{var l,t,r;let o,{head:u}=e,d=s(n).resolveInner(u,-1);if("TagName"!=d.name&&"StartTag"!=d.name||(d=d.parent),">"==a&&"OpenTag"==d.name){if("CloseTag"!=(null===(t=null===(l=d.parent)||void 0===l?void 0:l.lastChild)||void 0===t?void 0:t.name)&&(o=elementName(n.doc,d.parent,u)))return{range:i.cursor(u+1),changes:{from:u,insert:`></${o}>`}}}else if("/"==a&&"OpenTag"==d.name){let e=d.parent,l=null==e?void 0:e.parent;if(e.from==u-1&&"CloseTag"!=(null===(r=l.lastChild)||void 0===r?void 0:r.name)&&(o=elementName(n.doc,l,u))){let e=`/${o}>`;return{range:i.cursor(u+e.length),changes:{from:u,insert:e}}}}return{range:e}});return!r.changes.empty&&(e.dispatch(r,{userEvent:"input.type",scrollIntoView:!0}),!0)});export{$ as autoCloseTags,html,htmlCompletionSource,k as htmlLanguage};