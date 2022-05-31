import{Annotation as e,Facet as t,combineConfig as n,StateField as r,EditorSelection as o,Transaction as l,ChangeSet as s,ChangeDesc as a,StateEffect as c,CharCategory as i,countColumn as u,findClusterBreak as h,Text as f}from"/@npm/@codemirror/state";import{EditorView as d,Direction as m}from"/@npm/@codemirror/view";import{syntaxTree as p,matchBrackets as g,getIndentUnit as y,IndentContext as B,getIndentation as v,indentString as S,indentUnit as A}from"/@npm/@codemirror/language";import{NodeProp as k}from"/@npm/@lezer/common";const toggleComment=e=>{let t=getConfig(e.state);return t.line?w(e):!!t.block&&E(e)};function command(e,t){return({state:n,dispatch:r})=>{if(n.readOnly)return!1;let o=e(t,n);return!!o&&(r(n.update(o)),!0)}}const w=command(changeLineComment,0),C=command(changeLineComment,1),x=command(changeLineComment,2),M=command(changeBlockComment,0),D=command(changeBlockComment,1),L=command(changeBlockComment,2),E=command((e,t)=>changeBlockComment(e,t,function(e){let t=[];for(let n of e.selection.ranges){let r=e.doc.lineAt(n.from),o=n.to<=r.to?r:e.doc.lineAt(n.to),l=t.length-1;l>=0&&t[l].to>r.from?t[l].to=o.to:t.push({from:r.from,to:o.to})}return t}(t)),0);function getConfig(e,t=e.selection.main.head){let n=e.languageDataAt("commentTokens",t);return n.length?n[0]:{}}function changeBlockComment(e,t,n=t.selection.ranges){let r=n.map(e=>getConfig(t,e.from).block);if(!r.every(e=>e))return null;let o=n.map((e,n)=>function(e,{open:t,close:n},r,o){let l,s,a=e.sliceDoc(r-50,r),c=e.sliceDoc(o,o+50),i=/\s*$/.exec(a)[0].length,u=/^\s*/.exec(c)[0].length,h=a.length-i;if(a.slice(h-t.length,h)==t&&c.slice(u,u+n.length)==n)return{open:{pos:r-i,margin:i&&1},close:{pos:o+u,margin:u&&1}};o-r<=100?l=s=e.sliceDoc(r,o):(l=e.sliceDoc(r,r+50),s=e.sliceDoc(o-50,o));let f=/^\s*/.exec(l)[0].length,d=/\s*$/.exec(s)[0].length,m=s.length-d-n.length;return l.slice(f,f+t.length)==t&&s.slice(m,m+n.length)==n?{open:{pos:r+f+t.length,margin:/\s/.test(l.charAt(f+t.length))?1:0},close:{pos:o-d-n.length,margin:/\s/.test(s.charAt(m-1))?1:0}}:null}(t,r[n],e.from,e.to));if(2!=e&&!o.every(e=>e))return{changes:t.changes(n.map((e,t)=>o[t]?[]:[{from:e.from,insert:r[t].open+" "},{from:e.to,insert:" "+r[t].close}]))};if(1!=e&&o.some(e=>e)){let e=[];for(let t,n=0;n<o.length;n++)if(t=o[n]){let o=r[n],{open:l,close:s}=t;e.push({from:l.pos-o.open.length,to:l.pos+l.margin},{from:s.pos-s.margin,to:s.pos+o.close.length})}return{changes:e}}return null}function changeLineComment(e,t,n=t.selection.ranges){let r=[],o=-1;for(let{from:l,to:s}of n){let e=r.length,n=1e9;for(let a=l;a<=s;){let e=t.doc.lineAt(a);if(e.from>o&&(l==s||s>e.from)){o=e.from;let l=getConfig(t,a).line;if(!l)continue;let s=/^\s*/.exec(e.text)[0].length,c=s==e.length,i=e.text.slice(s,s+l.length)==l?s:-1;s<e.text.length&&s<n&&(n=s),r.push({line:e,comment:i,token:l,indent:s,empty:c,single:!1})}a=e.to+1}if(n<1e9)for(let t=e;t<r.length;t++)r[t].indent<r[t].line.text.length&&(r[t].indent=n);r.length==e+1&&(r[e].single=!0)}if(2!=e&&r.some(e=>e.comment<0&&(!e.empty||e.single))){let e=[];for(let{line:t,token:o,indent:l,empty:s,single:a}of r)!a&&s||e.push({from:t.from+l,insert:o+" "});let n=t.changes(e);return{changes:n,selection:t.selection.map(n,1)}}if(1!=e&&r.some(e=>e.comment>=0)){let e=[];for(let{line:t,comment:n,token:o}of r)if(n>=0){let r=t.from+n,l=r+o.length;" "==t.text[l-t.from]&&l++,e.push({from:r,to:l})}return{changes:e}}return null}const O=e.define(),b=e.define(),I=t.define(),T=t.define({combine:e=>n(e,{minDepth:100,newGroupDelay:500},{minDepth:Math.max,newGroupDelay:Math.min})});const N=r.define({create:()=>W.empty,update(e,t){let n=t.state.facet(T),r=t.annotation(O);if(r){let l=t.docChanged?o.single(function(e){let t=0;return e.iterChangedRanges((e,n)=>t=n),t}(t.changes)):void 0,s=z.fromTransaction(t,l),a=r.side,c=0==a?e.undone:e.done;return c=s?updateBranch(c,c.length,n.minDepth,s):addSelection(c,t.startState.selection),new W(0==a?r.rest:c,0==a?c:r.rest)}let s=t.annotation(b);if("full"!=s&&"before"!=s||(e=e.isolate()),!1===t.annotation(l.addToHistory))return t.changes.empty?e:e.addMapping(t.changes.desc);let a=z.fromTransaction(t),c=t.annotation(l.time),i=t.annotation(l.userEvent);return a?e=e.addChanges(a,c,i,n.newGroupDelay,n.minDepth):t.selection&&(e=e.addSelection(t.startState.selection,c,i,n.newGroupDelay)),"full"!=s&&"after"!=s||(e=e.isolate()),e},toJSON:e=>({done:e.done.map(e=>e.toJSON()),undone:e.undone.map(e=>e.toJSON())}),fromJSON:e=>new W(e.done.map(z.fromJSON),e.undone.map(z.fromJSON))});function history(e={}){return[N,T.of(e),d.domEventHandlers({beforeinput(e,t){let n="historyUndo"==e.inputType?V:"historyRedo"==e.inputType?G:null;return!!n&&(e.preventDefault(),n(t))}})]}const R=N;function cmd(e,t){return function({state:n,dispatch:r}){if(!t&&n.readOnly)return!1;let o=n.field(N,!1);if(!o)return!1;let l=o.pop(e,n,t);return!!l&&(r(l),!0)}}const V=cmd(0,!1),G=cmd(1,!1),J=cmd(0,!0),P=cmd(1,!0);function depth(e){return function(t){let n=t.field(N,!1);if(!n)return 0;let r=0==e?n.done:n.undone;return r.length-(r.length&&!r[0].changes?1:0)}}const H=depth(0),U=depth(1);class z{constructor(e,t,n,r,o){this.changes=e,this.effects=t,this.mapped=n,this.startSelection=r,this.selectionsAfter=o}setSelAfter(e){return new z(this.changes,this.effects,this.mapped,this.startSelection,e)}toJSON(){var e,t,n;return{changes:null===(e=this.changes)||void 0===e?void 0:e.toJSON(),mapped:null===(t=this.mapped)||void 0===t?void 0:t.toJSON(),startSelection:null===(n=this.startSelection)||void 0===n?void 0:n.toJSON(),selectionsAfter:this.selectionsAfter.map(e=>e.toJSON())}}static fromJSON(e){return new z(e.changes&&s.fromJSON(e.changes),[],e.mapped&&a.fromJSON(e.mapped),e.startSelection&&o.fromJSON(e.startSelection),e.selectionsAfter.map(o.fromJSON))}static fromTransaction(e,t){let n=$;for(let r of e.startState.facet(I)){let t=r(e);t.length&&(n=n.concat(t))}return!n.length&&e.changes.empty?null:new z(e.changes.invert(e.startState.doc),n,void 0,t||e.startState.selection,$)}static selection(e){return new z(void 0,$,void 0,void 0,e)}}function updateBranch(e,t,n,r){let o=t+1>n+20?t-n-1:0,l=e.slice(o,t);return l.push(r),l}function conc(e,t){return e.length?t.length?e.concat(t):e:t}const $=[];function addSelection(e,t){if(e.length){let n=e[e.length-1],r=n.selectionsAfter.slice(Math.max(0,n.selectionsAfter.length-200));return r.length&&r[r.length-1].eq(t)?e:(r.push(t),updateBranch(e,e.length-1,1e9,n.setSelAfter(r)))}return[z.selection([t])]}function popSelection(e){let t=e[e.length-1],n=e.slice();return n[e.length-1]=t.setSelAfter(t.selectionsAfter.slice(0,t.selectionsAfter.length-1)),n}function addMappingToBranch(e,t){if(!e.length)return e;let n=e.length,r=$;for(;n;){let o=mapEvent(e[n-1],t,r);if(o.changes&&!o.changes.empty||o.effects.length){let t=e.slice(0,n);return t[n-1]=o,t}t=o.mapped,n--,r=o.selectionsAfter}return r.length?[z.selection(r)]:$}function mapEvent(e,t,n){let r=conc(e.selectionsAfter.length?e.selectionsAfter.map(e=>e.map(t)):$,n);if(!e.changes)return z.selection(r);let o=e.changes.map(t),l=t.mapDesc(e.changes,!0),s=e.mapped?e.mapped.composeDesc(l):l;return new z(o,c.mapEffects(e.effects,t),s,e.startSelection.map(l),r)}const q=/^(input\.type|delete)($|\.)/;class W{constructor(e,t,n=0,r){this.done=e,this.undone=t,this.prevTime=n,this.prevUserEvent=r}isolate(){return this.prevTime?new W(this.done,this.undone):this}addChanges(e,t,n,r,o){let l=this.done,s=l[l.length-1];return l=s&&s.changes&&!s.changes.empty&&e.changes&&(!n||q.test(n))&&(!s.selectionsAfter.length&&t-this.prevTime<r&&function(e,t){let n=[],r=!1;return e.iterChangedRanges((e,t)=>n.push(e,t)),t.iterChangedRanges((e,t,o,l)=>{for(let s=0;s<n.length;){let e=n[s++],t=n[s++];l>=e&&o<=t&&(r=!0)}}),r}(s.changes,e.changes)||"input.type.compose"==n)?updateBranch(l,l.length-1,o,new z(e.changes.compose(s.changes),conc(e.effects,s.effects),s.mapped,s.startSelection,$)):updateBranch(l,l.length,o,e),new W(l,$,t,n)}addSelection(e,t,n,r){let o=this.done.length?this.done[this.done.length-1].selectionsAfter:$;return o.length>0&&t-this.prevTime<r&&n==this.prevUserEvent&&n&&/^select($|\.)/.test(n)&&(l=o[o.length-1],s=e,l.ranges.length==s.ranges.length&&0===l.ranges.filter((e,t)=>e.empty!=s.ranges[t].empty).length)?this:new W(addSelection(this.done,e),this.undone,t,n);var l,s}addMapping(e){return new W(addMappingToBranch(this.done,e),addMappingToBranch(this.undone,e),this.prevTime,this.prevUserEvent)}pop(e,t,n){let r=0==e?this.done:this.undone;if(0==r.length)return null;let o=r[r.length-1];if(n&&o.selectionsAfter.length)return t.update({selection:o.selectionsAfter[o.selectionsAfter.length-1],annotations:O.of({side:e,rest:popSelection(r)}),userEvent:0==e?"select.undo":"select.redo",scrollIntoView:!0});if(o.changes){let n=1==r.length?$:r.slice(0,r.length-1);return o.mapped&&(n=addMappingToBranch(n,o.mapped)),t.update({changes:o.changes,selection:o.startSelection,effects:o.effects,annotations:O.of({side:e,rest:n}),filter:!1,userEvent:0==e?"undo":"redo",scrollIntoView:!0})}return null}}W.empty=new W($,$);const j=[{key:"Mod-z",run:V,preventDefault:!0},{key:"Mod-y",mac:"Mod-Shift-z",run:G,preventDefault:!0},{key:"Mod-u",run:J,preventDefault:!0},{key:"Alt-u",mac:"Mod-Shift-u",run:P,preventDefault:!0}];function updateSel(e,t){return o.create(e.ranges.map(t),e.mainIndex)}function setSel(e,t){return e.update({selection:t,scrollIntoView:!0,userEvent:"select"})}function moveSel({state:e,dispatch:t},n){let r=updateSel(e.selection,n);return!r.eq(e.selection)&&(t(setSel(e,r)),!0)}function rangeEnd(e,t){return o.cursor(t?e.to:e.from)}function cursorByChar(e,t){return moveSel(e,n=>n.empty?e.moveByChar(n,t):rangeEnd(n,t))}function ltrAtCursor(e){return e.textDirectionAt(e.state.selection.main.head)==m.LTR}const cursorCharLeft=e=>cursorByChar(e,!ltrAtCursor(e)),cursorCharRight=e=>cursorByChar(e,ltrAtCursor(e)),cursorCharForward=e=>cursorByChar(e,!0),cursorCharBackward=e=>cursorByChar(e,!1);function cursorByGroup(e,t){return moveSel(e,n=>n.empty?e.moveByGroup(n,t):rangeEnd(n,t))}const cursorGroupLeft=e=>cursorByGroup(e,!ltrAtCursor(e)),cursorGroupRight=e=>cursorByGroup(e,ltrAtCursor(e)),cursorGroupForward=e=>cursorByGroup(e,!0),cursorGroupBackward=e=>cursorByGroup(e,!1);function moveBySubword(e,t,n){let r=e.state.charCategorizer(t.from);return e.moveByChar(t,n,o=>{let l=i.Space,s=t.from,a=!1,c=!1,u=!1,step=t=>{if(a)return!1;s+=n?t.length:-t.length;let o,h=r(t);if(l==i.Space&&(l=h),l!=h)return!1;if(l==i.Word)if(t.toLowerCase()==t){if(!n&&c)return!1;u=!0}else if(u){if(n)return!1;a=!0}else{if(c&&n&&r(o=e.state.sliceDoc(s,s+1))==i.Word&&o.toLowerCase()==o)return!1;c=!0}return!0};return step(o),step})}function cursorBySubword(e,t){return moveSel(e,n=>n.empty?moveBySubword(e,n,t):rangeEnd(n,t))}const cursorSubwordForward=e=>cursorBySubword(e,!0),cursorSubwordBackward=e=>cursorBySubword(e,!1);function interestingNode(e,t,n){if(t.type.prop(n))return!0;let r=t.to-t.from;return r&&(r>2||/[^\s,.;:]/.test(e.sliceDoc(t.from,t.to)))||t.firstChild}function moveBySyntax(e,t,n){let r,l,s=p(e).resolveInner(t.head),a=n?k.closedBy:k.openedBy;for(let o=t.head;;){let t=n?s.childAfter(o):s.childBefore(o);if(!t)break;interestingNode(e,t,a)?s=t:o=n?t.to:t.from}return l=s.type.prop(a)&&(r=n?g(e,s.from,1):g(e,s.to,-1))&&r.matched?n?r.end.to:r.end.from:n?s.to:s.from,o.cursor(l,n?-1:1)}const cursorSyntaxLeft=e=>moveSel(e,t=>moveBySyntax(e.state,t,!ltrAtCursor(e))),cursorSyntaxRight=e=>moveSel(e,t=>moveBySyntax(e.state,t,ltrAtCursor(e)));function cursorByLine(e,t){return moveSel(e,n=>{if(!n.empty)return rangeEnd(n,t);let r=e.moveVertically(n,t);return r.head!=n.head?r:e.moveToLineBoundary(n,t)})}const cursorLineUp=e=>cursorByLine(e,!1),cursorLineDown=e=>cursorByLine(e,!0);function cursorByPage(e,t){let{state:n}=e,r=updateSel(n.selection,n=>n.empty?e.moveVertically(n,t,Math.min(e.dom.clientHeight,innerHeight)):rangeEnd(n,t));if(r.eq(n.selection))return!1;let o,l=e.coordsAtPos(n.selection.main.head),s=e.scrollDOM.getBoundingClientRect();return l&&l.top>s.top&&l.bottom<s.bottom&&l.top-s.top<=e.scrollDOM.scrollHeight-e.scrollDOM.scrollTop-e.scrollDOM.clientHeight&&(o=d.scrollIntoView(r.main.head,{y:"start",yMargin:l.top-s.top})),e.dispatch(setSel(n,r),{effects:o}),!0}const cursorPageUp=e=>cursorByPage(e,!1),cursorPageDown=e=>cursorByPage(e,!0);function moveByLineBoundary(e,t,n){let r=e.lineBlockAt(t.head),l=e.moveToLineBoundary(t,n);if(l.head==t.head&&l.head!=(n?r.to:r.from)&&(l=e.moveToLineBoundary(t,n,!1)),!n&&l.head==r.from&&r.length){let n=/^\s*/.exec(e.state.sliceDoc(r.from,Math.min(r.from+100,r.to)))[0].length;n&&t.head!=r.from+n&&(l=o.cursor(r.from+n))}return l}const cursorLineBoundaryForward=e=>moveSel(e,t=>moveByLineBoundary(e,t,!0)),cursorLineBoundaryBackward=e=>moveSel(e,t=>moveByLineBoundary(e,t,!1)),cursorLineStart=e=>moveSel(e,t=>o.cursor(e.lineBlockAt(t.head).from,1)),cursorLineEnd=e=>moveSel(e,t=>o.cursor(e.lineBlockAt(t.head).to,-1));function toMatchingBracket(e,t,n){let r=!1,l=updateSel(e.selection,t=>{let l=g(e,t.head,-1)||g(e,t.head,1)||t.head>0&&g(e,t.head-1,1)||t.head<e.doc.length&&g(e,t.head+1,-1);if(!l||!l.end)return t;r=!0;let s=l.start.from==t.head?l.end.to:l.end.from;return n?o.range(t.anchor,s):o.cursor(s)});return!!r&&(t(setSel(e,l)),!0)}const cursorMatchingBracket=({state:e,dispatch:t})=>toMatchingBracket(e,t,!1),selectMatchingBracket=({state:e,dispatch:t})=>toMatchingBracket(e,t,!0);function extendSel(e,t){let n=updateSel(e.state.selection,e=>{let n=t(e);return o.range(e.anchor,n.head,n.goalColumn)});return!n.eq(e.state.selection)&&(e.dispatch(setSel(e.state,n)),!0)}function selectByChar(e,t){return extendSel(e,n=>e.moveByChar(n,t))}const selectCharLeft=e=>selectByChar(e,!ltrAtCursor(e)),selectCharRight=e=>selectByChar(e,ltrAtCursor(e)),selectCharForward=e=>selectByChar(e,!0),selectCharBackward=e=>selectByChar(e,!1);function selectByGroup(e,t){return extendSel(e,n=>e.moveByGroup(n,t))}const selectGroupLeft=e=>selectByGroup(e,!ltrAtCursor(e)),selectGroupRight=e=>selectByGroup(e,ltrAtCursor(e)),selectGroupForward=e=>selectByGroup(e,!0),selectGroupBackward=e=>selectByGroup(e,!1);function selectBySubword(e,t){return extendSel(e,n=>moveBySubword(e,n,t))}const selectSubwordForward=e=>selectBySubword(e,!0),selectSubwordBackward=e=>selectBySubword(e,!1),selectSyntaxLeft=e=>extendSel(e,t=>moveBySyntax(e.state,t,!ltrAtCursor(e))),selectSyntaxRight=e=>extendSel(e,t=>moveBySyntax(e.state,t,ltrAtCursor(e)));function selectByLine(e,t){return extendSel(e,n=>e.moveVertically(n,t))}const selectLineUp=e=>selectByLine(e,!1),selectLineDown=e=>selectByLine(e,!0);function selectByPage(e,t){return extendSel(e,n=>e.moveVertically(n,t,Math.min(e.dom.clientHeight,innerHeight)))}const selectPageUp=e=>selectByPage(e,!1),selectPageDown=e=>selectByPage(e,!0),selectLineBoundaryForward=e=>extendSel(e,t=>moveByLineBoundary(e,t,!0)),selectLineBoundaryBackward=e=>extendSel(e,t=>moveByLineBoundary(e,t,!1)),selectLineStart=e=>extendSel(e,t=>o.cursor(e.lineBlockAt(t.head).from)),selectLineEnd=e=>extendSel(e,t=>o.cursor(e.lineBlockAt(t.head).to)),cursorDocStart=({state:e,dispatch:t})=>(t(setSel(e,{anchor:0})),!0),cursorDocEnd=({state:e,dispatch:t})=>(t(setSel(e,{anchor:e.doc.length})),!0),selectDocStart=({state:e,dispatch:t})=>(t(setSel(e,{anchor:e.selection.main.anchor,head:0})),!0),selectDocEnd=({state:e,dispatch:t})=>(t(setSel(e,{anchor:e.selection.main.anchor,head:e.doc.length})),!0),selectAll=({state:e,dispatch:t})=>(t(e.update({selection:{anchor:0,head:e.doc.length},userEvent:"select"})),!0),selectLine=({state:e,dispatch:t})=>{let n=selectedLineBlocks(e).map(({from:t,to:n})=>o.range(t,Math.min(n+1,e.doc.length)));return t(e.update({selection:o.create(n),userEvent:"select"})),!0},selectParentSyntax=({state:e,dispatch:t})=>{let n=updateSel(e.selection,t=>{var n;let r=p(e).resolveInner(t.head,1);for(;!(r.from<t.from&&r.to>=t.to||r.to>t.to&&r.from<=t.from)&&(null===(n=r.parent)||void 0===n?void 0:n.parent);)r=r.parent;return o.range(r.to,r.from)});return t(setSel(e,n)),!0},simplifySelection=({state:e,dispatch:t})=>{let n=e.selection,r=null;return n.ranges.length>1?r=o.create([n.main]):n.main.empty||(r=o.create([o.cursor(n.main.head)])),!!r&&(t(setSel(e,r)),!0)};function deleteBy({state:e,dispatch:t},n){if(e.readOnly)return!1;let r="delete.selection",l=e.changeByRange(e=>{let{from:t,to:l}=e;if(t==l){let e=n(t);e<t?r="delete.backward":e>t&&(r="delete.forward"),t=Math.min(t,e),l=Math.max(l,e)}return t==l?{range:e}:{changes:{from:t,to:l},range:o.cursor(t)}});return!l.changes.empty&&(t(e.update(l,{scrollIntoView:!0,userEvent:r})),!0)}function skipAtomic(e,t,n){if(e instanceof d)for(let r of e.state.facet(d.atomicRanges).map(t=>t(e)))r.between(t,t,(e,r)=>{e<t&&r>t&&(t=n?r:e)});return t}const deleteByChar=(e,t)=>deleteBy(e,n=>{let r,o,{state:l}=e,s=l.doc.lineAt(n);if(!t&&n>s.from&&n<s.from+200&&!/[^ \t]/.test(r=s.text.slice(0,n-s.from))){if("\t"==r[r.length-1])return n-1;let e=u(r,l.tabSize)%y(l)||y(l);for(let t=0;t<e&&" "==r[r.length-1-t];t++)n--;o=n}else o=h(s.text,n-s.from,t,t)+s.from,o==n&&s.number!=(t?l.doc.lines:1)&&(o+=t?1:-1);return skipAtomic(e,o,t)}),deleteCharBackward=e=>deleteByChar(e,!1),deleteCharForward=e=>deleteByChar(e,!0),deleteByGroup=(e,t)=>deleteBy(e,n=>{let r=n,{state:o}=e,l=o.doc.lineAt(r),s=o.charCategorizer(r);for(let e=null;;){if(r==(t?l.to:l.from)){r==n&&l.number!=(t?o.doc.lines:1)&&(r+=t?1:-1);break}let a=h(l.text,r-l.from,t)+l.from,c=l.text.slice(Math.min(r,a)-l.from,Math.max(r,a)-l.from),i=s(c);if(null!=e&&i!=e)break;" "==c&&r==n||(e=i),r=a}return skipAtomic(e,r,t)}),deleteGroupBackward=e=>deleteByGroup(e,!1),deleteGroupForward=e=>deleteByGroup(e,!0),deleteToLineEnd=e=>deleteBy(e,t=>{let n=e.lineBlockAt(t).to;return skipAtomic(e,t<n?n:Math.min(e.state.doc.length,t+1),!0)}),deleteToLineStart=e=>deleteBy(e,t=>{let n=e.lineBlockAt(t).from;return skipAtomic(e,t>n?n:Math.max(0,t-1),!1)}),deleteTrailingWhitespace=({state:e,dispatch:t})=>{if(e.readOnly)return!1;let n=[];for(let r=0,o="",l=e.doc.iter();;){if(l.next(),l.lineBreak||l.done){let e=o.search(/\s+$/);if(e>-1&&n.push({from:r-(o.length-e),to:r}),l.done)break;o=""}else o=l.value;r+=l.value.length}return!!n.length&&(t(e.update({changes:n,userEvent:"delete"})),!0)},splitLine=({state:e,dispatch:t})=>{if(e.readOnly)return!1;let n=e.changeByRange(e=>({changes:{from:e.from,to:e.to,insert:f.of(["",""])},range:o.cursor(e.from)}));return t(e.update(n,{scrollIntoView:!0,userEvent:"input"})),!0},transposeChars=({state:e,dispatch:t})=>{if(e.readOnly)return!1;let n=e.changeByRange(t=>{if(!t.empty||0==t.from||t.from==e.doc.length)return{range:t};let n=t.from,r=e.doc.lineAt(n),l=n==r.from?n-1:h(r.text,n-r.from,!1)+r.from,s=n==r.to?n+1:h(r.text,n-r.from,!0)+r.from;return{changes:{from:l,to:s,insert:e.doc.slice(n,s).append(e.doc.slice(l,n))},range:o.cursor(s)}});return!n.changes.empty&&(t(e.update(n,{scrollIntoView:!0,userEvent:"move.character"})),!0)};function selectedLineBlocks(e){let t=[],n=-1;for(let r of e.selection.ranges){let o=e.doc.lineAt(r.from),l=e.doc.lineAt(r.to);if(r.empty||r.to!=l.from||(l=e.doc.lineAt(r.to-1)),n>=o.number){let e=t[t.length-1];e.to=l.to,e.ranges.push(r)}else t.push({from:o.from,to:l.to,ranges:[r]});n=l.number+1}return t}function moveLine(e,t,n){if(e.readOnly)return!1;let r=[],l=[];for(let s of selectedLineBlocks(e)){if(n?s.to==e.doc.length:0==s.from)continue;let t=e.doc.lineAt(n?s.to+1:s.from-1),a=t.length+1;if(n){r.push({from:s.to,to:t.to},{from:s.from,insert:t.text+e.lineBreak});for(let t of s.ranges)l.push(o.range(Math.min(e.doc.length,t.anchor+a),Math.min(e.doc.length,t.head+a)))}else{r.push({from:t.from,to:s.from},{from:s.to,insert:e.lineBreak+t.text});for(let e of s.ranges)l.push(o.range(e.anchor-a,e.head-a))}}return!!r.length&&(t(e.update({changes:r,scrollIntoView:!0,selection:o.create(l,e.selection.mainIndex),userEvent:"move.line"})),!0)}const moveLineUp=({state:e,dispatch:t})=>moveLine(e,t,!1),moveLineDown=({state:e,dispatch:t})=>moveLine(e,t,!0);function copyLine(e,t,n){if(e.readOnly)return!1;let r=[];for(let o of selectedLineBlocks(e))n?r.push({from:o.from,insert:e.doc.slice(o.from,o.to)+e.lineBreak}):r.push({from:o.to,insert:e.lineBreak+e.doc.slice(o.from,o.to)});return t(e.update({changes:r,scrollIntoView:!0,userEvent:"input.copyline"})),!0}const copyLineUp=({state:e,dispatch:t})=>copyLine(e,t,!1),copyLineDown=({state:e,dispatch:t})=>copyLine(e,t,!0),deleteLine=e=>{if(e.state.readOnly)return!1;let{state:t}=e,n=t.changes(selectedLineBlocks(t).map(({from:e,to:n})=>(e>0?e--:n<t.doc.length&&n++,{from:e,to:n}))),r=updateSel(t.selection,t=>e.moveVertically(t,!0)).map(n);return e.dispatch({changes:n,selection:r,scrollIntoView:!0,userEvent:"delete.line"}),!0},insertNewline=({state:e,dispatch:t})=>(t(e.update(e.replaceSelection(e.lineBreak),{scrollIntoView:!0,userEvent:"input"})),!0);const F=newlineAndIndent(!1),K=newlineAndIndent(!0);function newlineAndIndent(e){return({state:t,dispatch:n})=>{if(t.readOnly)return!1;let r=t.changeByRange(n=>{let{from:r,to:l}=n,s=t.doc.lineAt(r),a=!e&&r==l&&function(e,t){if(/\(\)|\[\]|\{\}/.test(e.sliceDoc(t-1,t+1)))return{from:t,to:t};let n,r=p(e).resolveInner(t),o=r.childBefore(t),l=r.childAfter(t);return o&&l&&o.to<=t&&l.from>=t&&(n=o.type.prop(k.closedBy))&&n.indexOf(l.name)>-1&&e.doc.lineAt(o.to).from==e.doc.lineAt(l.from).from?{from:o.to,to:l.from}:null}(t,r);e&&(r=l=(l<=s.to?s:t.doc.lineAt(l)).to);let c=new B(t,{simulateBreak:r,simulateDoubleBreak:!!a}),i=v(c,r);for(null==i&&(i=/^\s*/.exec(t.doc.lineAt(r).text)[0].length);l<s.to&&/\s/.test(s.text[l-s.from]);)l++;a?({from:r,to:l}=a):r>s.from&&r<s.from+100&&!/\S/.test(s.text.slice(0,r))&&(r=s.from);let u=["",S(t,i)];return a&&u.push(S(t,c.lineIndent(s.from,-1))),{changes:{from:r,to:l,insert:f.of(u)},range:o.cursor(r+1+u[1].length)}});return n(t.update(r,{scrollIntoView:!0,userEvent:"input"})),!0}}function changeBySelectedLine(e,t){let n=-1;return e.changeByRange(r=>{let l=[];for(let o=r.from;o<=r.to;){let s=e.doc.lineAt(o);s.number>n&&(r.empty||r.to>s.from)&&(t(s,l,r),n=s.number),o=s.to+1}let s=e.changes(l);return{changes:l,range:o.range(s.mapPos(r.anchor,1),s.mapPos(r.head,1))}})}const indentSelection=({state:e,dispatch:t})=>{if(e.readOnly)return!1;let n=Object.create(null),r=new B(e,{overrideIndentation:e=>{let t=n[e];return null==t?-1:t}}),o=changeBySelectedLine(e,(t,o,l)=>{let s=v(r,t.from);if(null==s)return;/\S/.test(t.text)||(s=0);let a=/^\s*/.exec(t.text)[0],c=S(e,s);(a!=c||l.from<t.from+a.length)&&(n[t.from]=s,o.push({from:t.from,to:t.from+a.length,insert:c}))});return o.changes.empty||t(e.update(o,{userEvent:"indent"})),!0},indentMore=({state:e,dispatch:t})=>!e.readOnly&&(t(e.update(changeBySelectedLine(e,(t,n)=>{n.push({from:t.from,insert:e.facet(A)})}),{userEvent:"input.indent"})),!0),indentLess=({state:e,dispatch:t})=>!e.readOnly&&(t(e.update(changeBySelectedLine(e,(t,n)=>{let r=/^\s*/.exec(t.text)[0];if(!r)return;let o=u(r,e.tabSize),l=0,s=S(e,Math.max(0,o-y(e)));for(;l<r.length&&l<s.length&&r.charCodeAt(l)==s.charCodeAt(l);)l++;n.push({from:t.from+l,to:t.from+r.length,insert:s.slice(l)})}),{userEvent:"delete.dedent"})),!0),insertTab=({state:e,dispatch:t})=>e.selection.ranges.some(e=>!e.empty)?indentMore({state:e,dispatch:t}):(t(e.update(e.replaceSelection("\t"),{scrollIntoView:!0,userEvent:"input"})),!0),Q=[{key:"Ctrl-b",run:cursorCharLeft,shift:selectCharLeft,preventDefault:!0},{key:"Ctrl-f",run:cursorCharRight,shift:selectCharRight},{key:"Ctrl-p",run:cursorLineUp,shift:selectLineUp},{key:"Ctrl-n",run:cursorLineDown,shift:selectLineDown},{key:"Ctrl-a",run:cursorLineStart,shift:selectLineStart},{key:"Ctrl-e",run:cursorLineEnd,shift:selectLineEnd},{key:"Ctrl-d",run:deleteCharForward},{key:"Ctrl-h",run:deleteCharBackward},{key:"Ctrl-k",run:deleteToLineEnd},{key:"Ctrl-Alt-h",run:deleteGroupBackward},{key:"Ctrl-o",run:splitLine},{key:"Ctrl-t",run:transposeChars},{key:"Ctrl-v",run:cursorPageDown}],X=[{key:"ArrowLeft",run:cursorCharLeft,shift:selectCharLeft,preventDefault:!0},{key:"Mod-ArrowLeft",mac:"Alt-ArrowLeft",run:cursorGroupLeft,shift:selectGroupLeft},{mac:"Cmd-ArrowLeft",run:cursorLineBoundaryBackward,shift:selectLineBoundaryBackward},{key:"ArrowRight",run:cursorCharRight,shift:selectCharRight,preventDefault:!0},{key:"Mod-ArrowRight",mac:"Alt-ArrowRight",run:cursorGroupRight,shift:selectGroupRight},{mac:"Cmd-ArrowRight",run:cursorLineBoundaryForward,shift:selectLineBoundaryForward},{key:"ArrowUp",run:cursorLineUp,shift:selectLineUp,preventDefault:!0},{mac:"Cmd-ArrowUp",run:cursorDocStart,shift:selectDocStart},{mac:"Ctrl-ArrowUp",run:cursorPageUp,shift:selectPageUp},{key:"ArrowDown",run:cursorLineDown,shift:selectLineDown,preventDefault:!0},{mac:"Cmd-ArrowDown",run:cursorDocEnd,shift:selectDocEnd},{mac:"Ctrl-ArrowDown",run:cursorPageDown,shift:selectPageDown},{key:"PageUp",run:cursorPageUp,shift:selectPageUp},{key:"PageDown",run:cursorPageDown,shift:selectPageDown},{key:"Home",run:cursorLineBoundaryBackward,shift:selectLineBoundaryBackward,preventDefault:!0},{key:"Mod-Home",run:cursorDocStart,shift:selectDocStart},{key:"End",run:cursorLineBoundaryForward,shift:selectLineBoundaryForward,preventDefault:!0},{key:"Mod-End",run:cursorDocEnd,shift:selectDocEnd},{key:"Enter",run:F},{key:"Mod-a",run:selectAll},{key:"Backspace",run:deleteCharBackward,shift:deleteCharBackward},{key:"Delete",run:deleteCharForward},{key:"Mod-Backspace",mac:"Alt-Backspace",run:deleteGroupBackward},{key:"Mod-Delete",mac:"Alt-Delete",run:deleteGroupForward},{mac:"Mod-Backspace",run:deleteToLineStart},{mac:"Mod-Delete",run:deleteToLineEnd}].concat(Q.map(e=>({mac:e.key,run:e.run,shift:e.shift}))),Y=[{key:"Alt-ArrowLeft",mac:"Ctrl-ArrowLeft",run:cursorSyntaxLeft,shift:selectSyntaxLeft},{key:"Alt-ArrowRight",mac:"Ctrl-ArrowRight",run:cursorSyntaxRight,shift:selectSyntaxRight},{key:"Alt-ArrowUp",run:moveLineUp},{key:"Shift-Alt-ArrowUp",run:copyLineUp},{key:"Alt-ArrowDown",run:moveLineDown},{key:"Shift-Alt-ArrowDown",run:copyLineDown},{key:"Escape",run:simplifySelection},{key:"Mod-Enter",run:K},{key:"Alt-l",mac:"Ctrl-l",run:selectLine},{key:"Mod-i",run:selectParentSyntax,preventDefault:!0},{key:"Mod-[",run:indentLess},{key:"Mod-]",run:indentMore},{key:"Mod-Alt-\\",run:indentSelection},{key:"Shift-Mod-k",run:deleteLine},{key:"Shift-Mod-\\",run:cursorMatchingBracket},{key:"Mod-/",run:toggleComment},{key:"Alt-A",run:M}].concat(X),Z={key:"Tab",run:indentMore,shift:indentLess};export{D as blockComment,L as blockUncomment,copyLineDown,copyLineUp,cursorCharBackward,cursorCharForward,cursorCharLeft,cursorCharRight,cursorDocEnd,cursorDocStart,cursorGroupBackward,cursorGroupForward,cursorGroupLeft,cursorGroupRight,cursorLineBoundaryBackward,cursorLineBoundaryForward,cursorLineDown,cursorLineEnd,cursorLineStart,cursorLineUp,cursorMatchingBracket,cursorPageDown,cursorPageUp,cursorSubwordBackward,cursorSubwordForward,cursorSyntaxLeft,cursorSyntaxRight,Y as defaultKeymap,deleteCharBackward,deleteCharForward,deleteGroupBackward,deleteGroupForward,deleteLine,deleteToLineEnd,deleteToLineStart,deleteTrailingWhitespace,Q as emacsStyleKeymap,history,R as historyField,j as historyKeymap,indentLess,indentMore,indentSelection,Z as indentWithTab,K as insertBlankLine,insertNewline,F as insertNewlineAndIndent,insertTab,I as invertedEffects,b as isolateHistory,C as lineComment,x as lineUncomment,moveLineDown,moveLineUp,G as redo,U as redoDepth,P as redoSelection,selectAll,selectCharBackward,selectCharForward,selectCharLeft,selectCharRight,selectDocEnd,selectDocStart,selectGroupBackward,selectGroupForward,selectGroupLeft,selectGroupRight,selectLine,selectLineBoundaryBackward,selectLineBoundaryForward,selectLineDown,selectLineEnd,selectLineStart,selectLineUp,selectMatchingBracket,selectPageDown,selectPageUp,selectParentSyntax,selectSubwordBackward,selectSubwordForward,selectSyntaxLeft,selectSyntaxRight,simplifySelection,splitLine,X as standardKeymap,M as toggleBlockComment,E as toggleBlockCommentByLine,toggleComment,w as toggleLineComment,transposeChars,V as undo,H as undoDepth,J as undoSelection};