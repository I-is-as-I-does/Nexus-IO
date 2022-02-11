/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */
"use strict";(self.webpackChunknexus_io=self.webpackChunknexus_io||[]).push([[20],{345:(e,n,t)=>{t.d(n,{N:()=>ye});var a=t(304),d=t(478),i=t(457),r=t(397),c=t(545),s=t(115),l=t(171),o=t(676),u=t(754);function p(){var e=(0,l.O1)(10);return{nexus:s.Gd,author:{handle:"Anonymous-"+(0,l.Iy)(100,999),about:"",url:"http://"},threads:[h(e)],index:[e]}}function h(e){return{id:e,title:e,description:"...",content:{timestamp:(new Date).toISOString().substring(0,16),main:"...",aside:"",media:{url:"",type:"",caption:""}},linked:[]}}var x=t(52),v=t(472),f=t(929);function g(){var e=(0,i.gd)("BUTTON","nx-add-link");return e.type="button",e.textContent="+",e}function D(e,n,t){var a=!1;s.SO[t][1]<=n.length&&(a=!0),e.disabled!==a&&(e.classList.toggle("nx-disabled"),e.disabled=a)}const k={image:["jpg","jpeg","gif","svg","png","webp"],video:["mp4","webm"],audio:["mp3"]};function m(e,n="nexus-tmp",t="/",a=-1){return{dataUrl:n,srcData:e,threadId:t,threadIndex:a}}function b(e,n=!1){var t=e.classList.contains("nx-disabled");!n&&t?e.classList.remove("nx-disabled"):n&&!t&&e.classList.add("nx-disabled")}function E(e,n,t){if(-1!==e.indexOf(n))for(var a=0;a<e.length;a++)if(a!==t&&e[a]===n)return!1;return!0}function I(e,n){var t;t=e,e=(0,l.V7)(t).trim().replace(/[^A-Za-z0-9]+/g,"-").replace(/(^-|-$)+/g,"");var a=be();if(!E(a.srcData.index,e,n)){var d,i=e.split("-"),r=i.pop();for(isNaN(r)?(i.push(r),d=1):(d=parseInt(r),d++),e=i.join("-");a.srcData.index.includes(e+"-"+d);)d++;e+="-"+d}return e}var y,L,O,S,N,A,C,j=t(937),w=t(498),T={ctrls:{prev:{symbol:r.nA,elm:null},next:{symbol:r.rQ,elm:null}},position:0,count:1},V=!1;function U(){var e=(0,i.gd)("A","nx-download");return e.append((0,i.cy)(r.aL,20)),e.addEventListener("click",(function(){var e=Object.assign({},be().srcData);delete e.index,(0,u.wJ)(e)||H("Invalid Nexus data"),e=JSON.stringify(e,void 0,2);var n="data:text/json;charset=utf-8,"+encodeURIComponent(e),t=(0,i.gd)("A");t.setAttribute("href",n),t.setAttribute("download","nexus.json"),C.appendChild(t),t.click(),t.remove()})),e}function P(){var e=function(){var e=(0,i.gd)("INPUT");return e.type="file",e.accept="application/json",e.addEventListener("change",(function(n){(0,x.eD)(n,!0).then((e=>{e.index=(0,x.HE)(e),De(e)})).catch((e=>{(0,w.fZ)(e.message),H("Invalid source")})),e.value=""})),e.style.display="none",e}(),n=(0,i.gd)("A","nx-open-file");n.append((0,i.cy)(r.r5,20)),n.addEventListener("click",(function(){e.click()}));var t=(0,i.gd)("SPAN");return t.append(e,n),t}function J(){ke()!==JSON.stringify(be().srcData)?b(S,!1):b(S,!0)}function Q(){var e=(0,i.gd)("DIV","nx-edit-nav");y=(0,i.gd)("SPAN","nx-action-feedback"),(S=(0,i.gd)("A","nx-reset")).append((0,i.cy)(r.os,20)),J(),S.addEventListener("click",(function(){S.classList.contains("nx-disabled")||(De(JSON.parse(ke())),b(S,!0))})),(O=(0,i.gd)("A","nx-save")).append((0,i.cy)(r.Ne,20)),b(O,!0),O.addEventListener("click",(function(){if(!O.classList.contains("nx-disabled")){var e=be();(0,o.EW)(e.dataUrl,e.srcData),H("saved"),b(O,!0),J()}}));var n,t=(0,i.gd)("DIV");return t.append(S,((n=(0,i.gd)("A","nx-new")).append((0,i.cy)(r.j4,20)),n.addEventListener("click",(function(){De(newData())})),n),P(),O,U()),e.append(y,t),e}function B(e){A("next"===e),R(!1)}function F(){var e;(N=(0,i.gd)("DIV","nx-edit-menu")).append(Q(),(e=(0,i.gd)("DIV","nx-edit-actions nx-history-nav"),(0,i.Q$)(T,B,!0),e.append(T.ctrls.prev.elm,T.ctrls.next.elm),e))}function H(e){var n=(0,v.GY)(e);L&&clearTimeout(L),(0,a.Po)(y,n,25),L=setTimeout((function(){(0,a.Po)(y,"",25)}),1500+20*n.length)}function R(e=!1){b(O,e)}function M(e,n=!1){V&&!n||(A=e,T.count=2,T.position=1,(0,i.eV)(T),R(!1))}function W(e){V=e}var Y,q,_,G,Z={dataUrl:"nexus-tmp",srcData:null,threadId:"/",threadIndex:-1},$=null,z=new CustomEvent("editThreadChange"),X=new CustomEvent("IndexChange"),K=null,ee=null,ne=null,te={up:r.MK,down:r.jF},ae={};function de(e,n,t=!1){var a=ae[e].idx,d=a+1;t&&(d=a-1),Z.srcData.index.splice(d,0,Z.srcData.index.splice(a,1)[0]),Z.srcData.threads.splice(d,0,Z.srcData.threads.splice(a,1)[0]),ae[e].idx=d,ae[n].idx=a}function ie(e,n){0===ae[e].idx?b(n.up,!0):b(n.up,!1),ae[e].idx+1===Z.srcData.index.length?b(n.down,!0):b(n.down,!1)}function re(e,n){K.removeChild(e),K.insertBefore(e,n),n.dispatchEvent(X),e.dispatchEvent(X)}function ce(e,n){var t=(0,i.gd)("DIV","nx-edit-move"),a={up:null,down:null};e.addEventListener("IndexChange",(function(){ie(n,a)})),Object.keys(a).forEach((d=>{a[d]=(0,i.gd)("A","nx-edit-move-"+d),a[d].append((0,i.cy)(te[d],16)),t.append(a[d]),a[d].addEventListener("click",(function(){!function(e,n,t){var a=function(a){var d,i="up"==n;a||(i=!i),i&&0!==ae[t].idx?(d=e.previousSibling,de(t,d.dataset.ident,!0),re(e,d)):i||ae[t].idx+1===Z.srcData.index.length||(d=e.nextSibling,de(t,d.dataset.ident,!1),re(d,e))};M(a),a(!0)}(e,d,n)}))})),ie(n,a),e.append(t)}function se(e,n){var t=(0,i.gd)("FORM","nx-thread-local-form"),a=(0,i.gd)("FIELDSET");a.append(he(["threads",e,"id"],(function(n){ae[e].id=n.value}))),a.append(he(["threads",e,"title"],(function(e){var t=n.querySelector(".nx-thread-title");t.textContent!==e.value&&(t.textContent=e.value)}))),a.append(he(["threads",e,"description"]));var d=(0,i.gd)("FIELDSET");["timestamp","main","aside"].forEach((n=>{d.append(he(["threads",e,"content",n]))}));var r=(0,i.gd)("FIELDSET"),c=he(["threads",e,"content","media","type"]);return r.append(he(["threads",e,"content","media","url"],(function(e,n){if(n){var t=c.querySelector("[data-item="+function(e){for(var n=0;n<s.S3.length;n++)if(e.includes(s.S3[n]))return s.S3[n];var t=e.split(".").pop();for(let[e,n]of Object.entries(k))if(n.includes(t))return e;return"page"}(e.value)+"]");t&&t.click()}}))),r.append(c),r.append(he(["threads",e,"content","media","caption"])),t.append((0,i.a)("local thread"),a,(0,i.a)("content"),d,(0,i.a)("media",2),r),t}function le(e,n,t,d){var r=(0,l.O1)(21);ae[t].linked[r]={idx:d};var c,s=(0,i.gd)("DIV","nx-edit-distant-link"),o={linked:null},u=he(["threads",t,"linked",r],null,o),p=((c=(0,i.gd)("BUTTON","nx-delete-link")).type="button",c.textContent="-",c),h=(0,i.gd)("DIV","nx-distant-link-action");return h.append(p),p.addEventListener("click",(()=>{var d=function(d){var i=ae[t].linked[r].idx,c=ae[t].idx;if(d){(0,a.Vv)(s,200,(function(){s.remove()}));var l=i===Z.srcData.threads[c].linked.length-1;if(Z.srcData.threads[c].linked.splice(i,1),!l)for(let[e,n]of Object.entries(ae[t].linked))n.idx>i&&(ae[t].linked[e].idx=n.idx-1)}else if(i>Z.srcData.threads[c].linked.length-1)Z.srcData.threads[c].linked.push(o.linked.value),(0,a.am)(n,s,!1,!0,200);else{Z.srcData.threads[c].linked.splice(i,0,o.linked.value);for(let[e,n]of Object.entries(ae[t].linked))n.idx>=i&&e!==r&&(ae[t].linked[e].idx=n.idx+1);var u=n.childNodes[i];n.insertBefore(s,u),(0,a.YQ)(s,200)}D(e,Z.srcData.threads[c].linked,"linked")};M(d),d(!0)})),s.append(u,h),s}function oe(e){var n=(0,i.gd)("LI");return Z.threadId!==ae[e].id&&(n.style.display="none"),n.addEventListener("editThreadChange",(function(){Z.threadId===ae[e].id?setTimeout((function(){(0,a.YQ)(n,200)}),200):(0,a.Vv)(n,200)})),n}function ue(e){var n={index:{parent:K,child:null,link:null,del:null},local:{parent:ee,child:null},distant:{parent:ne,child:null}};return n.distant.child=oe(e),n.local.child=oe(e),n.index.child=(0,i.gd)("LI"),n.index.child.dataset.ident=e,n.index.link=function(e){var n=(0,c.DX)(Z,ae[e].id,ae[e].idx),t=(0,i.j1)(n,!1);return Z.threadId===ae[e].id&&t.classList.add("nx-on-display"),t.addEventListener("click",(()=>{if(Z.threadId!==ae[e].id){Z.threadId=ae[e].id,Z.threadIndex=ae[e].idx;var n=K.querySelector(".nx-on-display");n&&n.classList.remove("nx-on-display"),t.classList.add("nx-on-display"),ee.childNodes.forEach((e=>{e.dispatchEvent(z)})),ne.childNodes.forEach((e=>{e.dispatchEvent(z)}))}})),t}(e),n.index.child.append(n.index.link),ce(n.index.child,e),n.distant.child.append(function(e){var n=(0,i.gd)("FORM","nx-thread-distant-form"),t=g();if(D(t,Z.srcData.threads[ae[e].idx].linked,"linked"),t.addEventListener("click",(()=>{t.disabled||(Z.srcData.threads[ae[e].idx].linked.push(""),(0,a.am)(n,le(t,n,e,Z.srcData.threads[ae[e].idx].linked.length-1),!1,!0,200),D(t,Z.srcData.threads[ae[e].idx].linked,"linked"))})),Object.prototype.hasOwnProperty.call(Z.srcData.threads[ae[e].idx],"linked")){if(Z.srcData.threads[ae[e].idx].linked.length){for(var d=[],r=0;r<Z.srcData.threads[ae[e].idx].linked.length;r++){var c=le(t,n,e,r);d.push(c)}n.append(...d)}}else Z.srcData.threads[ae[e].idx].linked=[];var s=(0,i.gd)("DIV");return s.append((0,i.a)("linked threads"),n,t),s}(e)),n.local.child.append(se(e,n.index.child)),n.index.del=function(e,n,t,d){var r=(0,i.gd)("BUTTON","nx-delete-thread");return r.type="button",r.textContent="-",r.addEventListener("click",(function(){!function(e,n,t,d){var i=Object.assign({},Z.srcData.threads[ae[d].idx]),r=function(r){var c=ae[d].idx,s=Z.srcData.index.length;if(r){if(c<s-1)for(let[e,n]of Object.entries(ae))n.idx>c&&(ae[e].idx=n.idx-1);Z.srcData.index.splice(c,1),Z.srcData.threads.splice(c,1),[n,e,t].forEach((e=>{(0,a.Vv)(e,200,(function(){e.remove()}))})),s>1&&(0===c?t.nextSibling.dispatchEvent(X):c===s-1&&t.previousSibling.dispatchEvent(X)),Z.threadId===ae[d].id?(Z.threadId="/",Z.threadIndex=-1,n.dispatchEvent(z),e.dispatchEvent(z)):Z.threadIndex>c&&Z.threadIndex--}else{if(Z.srcData.index.splice(c,0,i.id),Z.srcData.threads.splice(c,0,i),c<=s-1){for(let[e,n]of Object.entries(ae))n.id!==i.id&&n.idx>=c&&(ae[e].idx=n.idx+1);var l=K.childNodes[c];K.insertBefore(t,l),0===c&&l.dispatchEvent(X)}else K.append(t),s>1&&t.previousSibling.dispatchEvent(X);ee.append(e),ne.append(n),(0,a.YQ)(t,200),t.firstChild.click()}D(q,Z.srcData.index,"threads")};M(r),r(!0)}(e,n,t,d)})),r}(n.local.child,n.distant.child,n.index.child,e),n.index.child.append(n.index.del),n}function pe(e,n){if(null===Z.srcData&&(Z.srcData={},Z.srcData.index=[]),"author"===e[0])return function(e,n){Z.srcData.author||(Z.srcData.author={}),Z.srcData.author[e[1]]=n}(e,n);var t=ae[e[1]].idx;return function(e){Z.srcData.threads?void 0===Z.srcData.threads[e]&&(Z.srcData.threads[e]={}):Z.srcData.threads=[]}(t),"id"===e[2]?function(e,n,t){ae[e[1]].id=t,Z.srcData.index[n]=t,Z.srcData.threads[n].id=t}(e,t,n):["linked","content"].includes(e[2])?"content"===e[2]?function(e,n,t){Z.srcData.threads[n].content||(Z.srcData.threads[n].content={}),"media"===e[3]?(Z.srcData.threads[n].content.media||(Z.srcData.threads[n].content.media={}),Z.srcData.threads[n].content.media[e[4]]=t):Z.srcData.threads[n].content[e[3]]=t}(e,t,n):void function(e,n,t){Z.srcData.threads[n].linked?Z.srcData.threads[n].linked[ae[e[1]].linked[e[3]].idx]=t:Z.srcData.threads[n].linked=[t]}(e,t,n):function(e,n,t){Z.srcData.threads[n][e[2]]=t}(e,t,n)}function he(e,n=null,t=null){var a=function(e){if(Z.srcData){if("author"==e[0])return Z.srcData[e[0]][e[1]];var n=ae[e[1]].idx;return["linked","content"].includes(e[2])?"content"===e[2]?"media"!==e[3]?Z.srcData.threads[n].content[e[3]]:Z.srcData.threads[n].content.media[e[4]]:Z.srcData.threads[n].linked[ae[e[1]].linked[e[3]].idx]:Z.srcData.threads[n][e[2]]}return""}(e),d=e.length-1;"linked"===e[d-1]&&d--;var c=e[d];"threads"===e[--d-1]&&d--;var l,o=e[d];l=["about","description","main","aside","caption"].includes(c)?function(e){var n=(0,i.gd)("TEXTAREA","nx-edit-textarea");return n.textContent=e,n}(a):"timestamp"==c?function(e){var n=(0,i.gd)("INPUT","nx-edit-date");return n.type="datetime-local",n.value=e,n}(a):function(e){var n=(0,i.gd)("INPUT","nx-edit-text");return n.type="text",n.value=e,n}(a),l.classList.add("nx-edit-input");var u=e.join("-");l.id=u,l.name=u,["handle","title","main","id","url","type","timestamp","linked"].includes(c)&&(l.required=!0);var p=c;"linked"===c&&(p="url");var h,x=function(e){var n=(0,i.gd)("LABEL","nx-edit-label");n.for=e;var t=(0,i.gd)("SPAN","nx-edit-title");return t.textContent=(0,v.GY)(e),(0,f.wu)(t,e),n.append(t),n}(p),g=(0,i.gd)("SPAN","nx-edit-indication"),D=((h=(0,i.gd)("SPAN","nx-edit-feedback")).append((0,i.cy)(r.mb)),h);switch(x.append(g,D),c){case"url":case"linked":g.textContent="[http]",l.pattern=s.Ni;break;case"id":g.textContent="[A-Za-z0-9-][3-36]",l.pattern=s.Q1;break;case"type":l.pattern="("+s.WS.join("|")+")";break;case"timestamp":break;default:var k=s.m2[c];g.textContent="["+k[0]+"-"+k[1]+"]",l.setAttribute("maxlength",k[1]),l.setAttribute("minlength",k[0])}t&&(t[c]=l);var m=(0,i.gd)("DIV","nx-edit-input nx-edit-"+o+"-"+c);if(m.append(x),"type"===c){var b=s.WS;m.append((0,i.Sb)(b,l,null,"nx-edit-media-type-select"))}else m.append(l);return function(e,n,t,a){var d=0,i="",r=n.value;n.addEventListener("focus",(function(){r=n.value})),n.addEventListener("change",(function(){(xe(e,n,t,a),d>0)?M((function(d){d?n.value=i:(i=n.value,n.value=r),xe(e,n,t,a)})):d++}))}(e,l,D,n),xe(e,l,D,n),m}function xe(e,n,t,a){var d=n.checkValidity(),i=null;if(d&&e.includes("url")||e.includes("linked"))(d=(0,u.jv)(n.value))&&e.includes("linked")&&(d=E(Z.srcData.threads[ae[e[1]].idx].linked,n.value,ae[e[1]].linked[e[3]].idx))&&(i=(0,x.P_)(n.value).then((()=>!0)).catch((()=>!1)));else if(e.includes("id")){var c=I(n.value,ae[e[1]].idx);c!==n.value&&(n.value=c),d=!0}null===i&&(i=Promise.resolve(d)),i.then((d=>{pe(e,n.value),function(e,n){var t=r.mb;n&&(t=r.b8),e.firstChild.src=t}(t,d),"function"==typeof a&&a(n,d)}))}function ve(e=!1){["handle","url","about"].forEach((n=>{var t=he(["author",n]);e?(0,a.am)(Y,t,!1,!0,200):Y.append(t)}))}function fe(e=!1){var n=Z.srcData.index;if(n.length){W(!0);for(var t=null,a=0;a<n.length;a++)a===n.length-1&&(t=function(){W(!1)}),ge(a,n[a],t,e)}}function ge(e,n,t,d=!1){var i=(0,l.O1)(21);ae[i]={id:n,idx:e,linked:{}};var r=ue(i);for(let[e,i]of Object.entries(r))!d||"index"!==e&&n!==Z.threadId?(i.parent.append(i.child),t&&t()):(0,a.am)(i.parent,i.child,!1,!0,200,t)}function De(e){var n=JSON.stringify(Z);null===e&&(e=p());var t=m(e,url,id,idx);t.srcData.threads.length&&(t.threadIndex=0,t.threadId=t.srcData.threads[0].id);var d=JSON.stringify(t),i=function(e){if(Z.srcData.threads.length){var t=[Y,K,ee,ne];t.forEach(((i,r)=>{var c=Array.from(i.childNodes),s=r===t.length-1;c.forEach(((t,i)=>{var r=null;s&&i===c.length-1&&(r=function(){var t;t=e?d:n,Z=Object.assign({},JSON.parse(t)),ve(!0),fe(!0)}),(0,a.Vv)(t,200,(function(){t.remove(),r&&r()}))}))}))}};i(!0),M(i,!0)}function ke(){return $}function me(e,n){C=n;var t,d="nexus-tmp";e=e;(0,j.pm)("new")?(t=p(),e=null):(e.dataUrl&&(d=e.dataUrl),null===(t=(0,o.Ih)(d))&&(t=null!==e.srcData?e.srcData:p(),(0,o.EW)(d,t))),t.index||(t.index=(0,x.HE)(t)),$=null!==e&&null!==e.srcData?JSON.stringify(e.srcData):JSON.stringify(t);var r=t.threads[0].id,c=0;e&&"/"!==e.threadId&&t.index.includes(e.threadId)&&(r=e.threadId,c=t.index.indexOf(e.threadId)),Z=m(t,d,r,c),F(),K=(0,i.gd)("UL","nx-edit-index"),ee=(0,i.gd)("UL","nx-edit-local"),ne=(0,i.gd)("UL","nx-edit-distant"),fe(),Y=(0,i.gd)("FORM","nx-edit-author"),ve(),D(q=g(),Z.srcData.index,"threads"),q.addEventListener("click",(function(){if(!q.disabled){var e=(0,l.O1)(21),n=(0,l.O1)(10),t=Z.srcData.index.length;ae[e]={id:n,idx:t,linked:{}};var d=null;t-1!=-1&&(d=function(){K.childNodes[t-1].dispatchEvent(X)}),Z.srcData.threads.push(h(n)),Z.srcData.index.push(n);var i=ue(e);["local","distant"].forEach((e=>{i[e].parent.append(i[e].child)})),(0,a.am)(i.index.parent,i.index.child,!1,!0,200,d),R(!1),D(q,Z.srcData.index,"threads")}}))}function be(){return Z}var Ee,Ie=!1;function ye(e){me(e.state,e.nxelm);var n=(0,i.gd)("DIV","nx-main-block nx-index");n.append((0,i.rH)("author",[Y],(0,i.a)("author")),(0,i.rH)("threads-list",[K,q],(0,i.a)("threads")));var t=(0,i.gd)("DIV","nx-main-block nx-thread");t.append((0,i.rH)("local",[ee],!1),(0,i.rH)("distant",[ne],!1)),_=(0,i.IW)((0,i.vi)(),[(0,i._$)([N],[n,t],[],"edit")]),function(){var e={editMode:!0,state:Object.assign({},be())};G=(0,d.U)(e)}(),(Ee=(0,i.gd)("A","nx-edit-switch")).append((0,i.cy)(r.xQ,25)),Ee.addEventListener("click",(function(){(Ie=!Ie)?(0,a.U6)(_,(function(){(0,c.f2)(be(),!0,!0),Ee.firstChild.src=r.bR,(0,a.Ji)(G)})):(0,a.U6)(G,(function(){Ee.firstChild.src=r.xQ,(0,a.Ji)(_)}))})),G.style.display="none";var s=(0,i.gd)("DIV","nx-editor");return s.append(_,G,Ee),s}}}]);