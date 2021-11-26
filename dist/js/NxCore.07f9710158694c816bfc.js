/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
"use strict";(self.webpackChunknexus=self.webpackChunknexus||[]).push([[424],{253:(n,e,t)=>{t.d(e,{x:()=>o,X:()=>u});var r,a,i=t(881),l=t(25),d=t(618);function o(n=null){r?(0,i.Pr)("Nexus | container already set"):(n||(n=l.cZ),(r=document.querySelector(n))?r.dataset&&(0,d.O)(Object.assign({},r.dataset)):(r=document.createElement("DIV"),document.body.append(r)),(a=document.createElement("DIV")).className="nx",r.append(a))}function u(){return a||o(),a}},25:(n,e,t)=>{t.d(e,{cZ:()=>r,Je:()=>a,zE:()=>i});const r="#Nexus",a="https://cdn.jsdelivr.net/gh/I-is-as-I-does/Nexus-Prototype@latest/dist/js/NxIO.js",i={src:null,id:"/",style:"https://cdn.jsdelivr.net/gh/I-is-as-I-does/Nexus-Prototype@latest/dist/css/NexusI.min.css",lang:"en",history:!1,debug:!1,edit:!1}},618:(n,e,t)=>{t.d(e,{O:()=>u,B:()=>s});var r=t(368),a=t(753),i=t(881),l=t(75),d=t(451),o=t(25).zE;function u(n){(0,r.bT)(n)&&((0,a.HH)(n.src)&&(o.src=n.src,(0,d.Q0)(n.id)&&(o.id=n.id)),(0,a.HH)(n.style)&&(o.style=n.style),(0,r.fw)(n.lang)&&(o.lang=n.lang,(0,l.uM)(n.lang)),["history","debug","edit"].forEach((e=>{"true"!==n[e]&&!0!==n[e]||(o[e]=!0,"debug"==e&&(0,i.yD)(!0))})))}function s(n){return o[n]}},549:(n,e,t)=>{t.d(e,{e:()=>o,P:()=>u});var r=t(753),a=t(881),i=t(85),l=t(451);function d(n){n.index=[],n.threads.map((e=>{n.index.push(e.id)}))}function o(n){return n.target.files.length&&"application/json"==n.target.files[0].type?new Promise(((e,t)=>{var r=new FileReader;return r.onload=function(n){var r=function(n){var e=JSON.parse(n.target.result);return!(!e||!(e=(0,l.wJ)(e)))&&(d(e),e)}(n);r?e(r):t()},r.readAsText(n.target.files[0])})):Promise.reject()}function u(n){var e,t=(0,i.Yb)(n);return null!==t?Number.isInteger(t)?Promise.reject(t):Promise.resolve(t):(e=n,(0,r._l)(e).then((n=>((0,a.ab)(),(n=(0,l.wJ)(n))?(d(n),(0,i.pH)(e,n),n):((0,i.pH)(e,400),(0,a.Pr)((0,a.ah)()),(0,a.fZ)("Invalid source"),Promise.reject(400))))).catch((n=>{throw(0,a.Pr)(n),(0,i.pH)(e,404),(0,a.fZ)("No response"),404})))}document.cookie="Nx=Instance; SameSite=None; Secure"},869:(n,e,t)=>{t.r(e),t.d(e,{initPage:()=>c});var r=t(253),a=t(158),i=t(618),l=t(881),d=t(180),o=t(425),u=t(625),s=t(694);function c(n=null,e=null){return(0,r.x)(n),(0,i.O)(e),(0,a.A)().then((()=>(0,i.B)("src")?(0,d.t$)((0,i.B)("src"),(0,i.B)("id")):null)).then((n=>{var e;n&&(0,d.rz)(n),e=(0,i.B)("edit")?(0,u.N)(n):(0,s.D)(n),(0,r.X)().append(e)})).catch((n=>{(0,l.Pr)(n),(0,r.X)().append((0,o.ao)())}))}},158:(n,e,t)=>{t.d(e,{A:()=>d,o:()=>o});var r=t(753),a=t(881),i=t(618),l={};function d(n=null,e=".nx"){return n||(n=(0,i.B)("style")),(0,r.Yc)(e,n).then((()=>(l[n]=!0,!0))).catch((e=>{throw(0,a.Pr)(e),(0,a.fZ)("Theme not found"),l[n]=!1,404}))}function o(n=null){return n||(n=(0,i.B)("style")),l[n]}},881:(n,e,t)=>{t.d(e,{Pr:()=>l,yD:()=>d,ab:()=>o,fZ:()=>u,ah:()=>s});var r=t(368),a=[],i=!1;function l(n){i&&console.log(n)}function d(n=!0){i=n}function o(){a=[]}function u(n,e=null){var t={msg:n};(0,r.fw)(e)&&(t.detail=t),a.push(n)}function s(){return a}},180:(n,e,t)=>{t.d(e,{hb:()=>m,Mq:()=>h,Ek:()=>c,t$:()=>s,rz:()=>p,f2:()=>f});var r=t(618),a=t(549),i=t(85),l=!1,d={dataUrl:null,srcData:null,threadId:"/",threadIndex:-1},o={onChange:[],onSrcChange:[]},u=!1;function s(n,e){return(0,a.P)(n).then((t=>{var r={dataUrl:n,threadId:e,srcData:t,threadIndex:t.index.indexOf(e)};return-1===r.threadIndex&&"/"!==e&&(r.threadId="/"),r}))}function c(n,e=!1){var t="onChange";e&&(t="onSrcChange"),o[t].push(n)}function f(n,e=!1,t=!1){if(!u){var a=n.dataUrl!=d.dataUrl;(t||a||n.threadId!=d.threadId)&&(u=!0,e||((0,i.Dy)(d),(0,r.B)("history")&&function(n){var e={id:n.threadId,src:n.dataUrl,ix:n.threadIndex};history.replaceState(e,""),history.pushState(e,"")}(d)),d=n,l=["onChange"],(a||t)&&l.push("onSrcChange"),l.forEach((n=>{o[n].length&&o[n].forEach((n=>{n(d)}))})),setTimeout((function(){u=!1}),800))}var l}function h(){return d}function p(n){return!d.dataUrl&&(d=n,!0)}function m(){return 800}(0,r.B)("history")&&(l||(l=!0,window.onpopstate=n=>{if(n.state&&n.state.src&&n.state.id&&n.state.ix){var e=n.state;e.srcData=(0,i.Yb)(n.state.src),f(e,!1)}}))},85:(n,e,t)=>{t.d(e,{KR:()=>w,Yb:()=>b,Ih:()=>g,XU:()=>k,VG:()=>O,$3:()=>y,pH:()=>x,EW:()=>v,q1:()=>S,Dy:()=>I,eG:()=>Z});var r=t(753),a=t(811);const i=(0,a.$o)(),l=(0,a.G)();function d(n){n&&!n.getItem("available")&&n.setItem("available",5e3)}function o(n){return"session"==n?l:i}function u(n,e,t="session",r=null,i=!0){r&&(r[n]=e);var l=o(t);if(null!=l){var d=(0,a.$w)(e,!0);if(d>2e3)return;var u=l.getItem("available");u<100&&(0,a.hh)(l,u,2e3),u-=d,i&&(e=JSON.stringify(e)),l.setItem(n,e),l.setItem("available",u)}}function s(n,e="session",t=null,r=!0){if(null!==t&&t.hasOwnProperty(n))return t[n];var a=o(e);if(a){var i=a.getItem(n);if(i)return r&&(i=JSON.parse(i)),t&&(t[n]=i),i}return null}d(i),d(l);var c={},f={},h={},p={};function m(n){if(-1!=n.threadIndex&&-1!=n.srcData.threads.indexOf(n.threadIndex)){var e=n.srcData.threads[n.threadIndex].record.timestamp;return new Date(e)}return null}function v(n){u("nx-edit",n,"local")}function g(){return s("nx-edit","local")}function I(n){var e=n.dataUrl+"#"+n.threadId;if(!c.hasOwnProperty(e)){var t=m(n);t&&u(e,t,"local",c,!1)}}function y(n){var e=function(n){var e=s(n.dataUrl+"#"+n.threadId,"local",c,!1);return e?new Date(e):null}(n);if(!e)return!0;var t=m(n);return!t||e==t}function x(n,e){u(n,e,"session",f)}function b(n){return s(n,"session",f)}function w(n){var e=s(n,"local",h,!1);return e||u(n,e=(0,r.AB)(n),"local",h,!1),e}function S(n,e){u(n,e,"local",p,!0)}function O(n){return s(n,"local",p,!0)}function Z(n){u("nx-lang",n,"local",null,!1)}function k(){return s("nx-lang","local",null,!1)}},75:(n,e,t)=>{t.d(e,{Ye:()=>f,VQ:()=>h,GY:()=>p,uM:()=>u,FC:()=>c});var r=t(368),a=t(85),i={fr:{data:"données",author:"auteur·rice",handle:"pseudonyme",about:"à propos",url:"url",id:"id",name:"nom",description:"description",timestamp:"date",main:"principal",aside:"secondaire",media:"média",type:"type",caption:"légende",index:"index",distant:"distant",local:"local",threads:"fils",thread:"fil",linked:"liés",record:"contenu",history:"historique",copied:"copié",embed:"intégré",source:"source",del:"suppr",edit:"édition",preview:"aperçu","No valid thread":"Aucun fil valide","Duplicate thread id":"Identifiant du fil en double","Duplicate linked thread":"Fil lié en double","Invalid linked thread":"Fil lié non valide","Invalid url":"Url non valide","Invalid thread id":"Identifiant de fil non valide","Invalid length":"Longueur non valide","Invalid min length":"Longueur minimale non valide","Invalid max length":"Longueur maximale non valide","Unable to cut string":"Impossible de raccourcir le texte","Invalid timestamp":"Horodatage non valide","Unknown field":"Champ inconnu","Invalid field type":"Type de champ non valide","Field is empty":"Le champ est vide","Unable to extend string":"Impossible de prolonger le texte","Unknown characters limits category":"Catégorie de limite de caractères inconnue","Unknown items limits category":"Catégorie de limite d'éléments inconnue","Invalid media type":"Type de media non valide","Invalid app url":"Url de l'application non valide","Init failed":"L'initialisation a échoué","Theme not found":"Thème non trouvé","No response":"Aucune réponse","Invalid source":"Source non valide","Invalid Nexus data":"Données Nexus non valides",saved:"sauvegardé",status:"statut"}},l=["en","fr"],d=(0,a.XU)();null==d||s(d)||(d=null,(0,a.eG)(null));var o=null;function u(n){d||c(n)}function s(n){return(0,r.fw)(n)&&l.includes(n)}function c(n){return!(!s(n)||n==o||(o=n,function(n){d!=n&&((0,a.eG)(n),d=n)}(n),0))}function f(){return l}function h(){return o}function p(n){var e=n;return"en"!=o&&i[o][n]&&(e=i[o][n]),e}d?o=d:s(o=document.querySelector("html").lang)||(o="en")},142:(n,e,t)=>{t.d(e,{T:()=>d,w:()=>o});var r=t(75),a=t(931),i={};function l(n,e){(0,a.Po)(n,(0,r.GY)(e),50)}function d(n){if((0,r.FC)(n))for(let[n,e]of Object.entries(i))e.forEach((e=>{l(e,n)}))}function o(n,e){i[e]||(i[e]=[]),i[e].push(n)}},696:(n,e,t)=>{t.d(e,{Gd:()=>r,Ln:()=>a,m2:()=>i,SO:()=>l,WS:()=>d,og:()=>o,Q1:()=>u,bt:()=>s,Ni:()=>c});const r="https://github.com/I-is-as-I-does/Nexus-Prototype",a={data:"Object",nexus:"String",author:"Object",handle:"String",about:"String",url:"String",threads:"Array","threads.item":"Object",id:"String",name:"String",description:"String",record:"Object",timestamp:"String",main:"String",aside:"String",media:"Object",type:"String",caption:"String",linked:"Array","linked.item":"Object"},i={handle:[3,30],about:[0,400],name:[3,30],description:[0,400],main:[1,1e3],aside:[0,400],caption:[0,200]},l={threads:[1,100],linked:[0,100]},d=["page","video","image","audio","youtube","vimeo","soundcloud"],o="^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])(T(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]))?$",u="[a-zA-Z0-9-]{3,36}",s="(/|"+u+")",c="^https?://\\w+\\.\\w+.*"},451:(n,e,t)=>{t.d(e,{Q0:()=>h,wJ:()=>m});var r=t(368),a=t(753),i=t(947),l=t(696),d=t(881);function o(n){return l.m2.hasOwnProperty(n)?l.m2[n]:((0,d.fZ)("Unknown characters limits category",n),!1)}function u(n){return l.SO.hasOwnProperty(n)?l.SO[n]:((0,d.fZ)("Unknown items limits category",n),!1)}function s(n,e){return c(n,e,!0)||(n=""),function(n,e){var t=o(e);if(!1!==t){if(n.length>=t[0])return!0;(0,d.fZ)("Invalid min length",e)}return!1}(n,e)?function(n,e){var t=o(e);if(!1!==t){if(n.length<=t[1])return!0;(0,d.fZ)("Invalid max length",e)}return!1}(n,e)||(n=function(n,e){var t=o(e);return!1!==t?(0,i.Oq)(n,t[1]):((0,d.fZ)("Unable to cut string",e),"")}(n,e)):n=function(n,e){var t=o(e);if(!1!==t){var r=t[0]-n.length;return r>0&&(n="-".repeat(r)+n),n}return(0,d.fZ)("Unable to extend string",e),null}(n,e),n}function c(n,e,t=!0){if(l.Ln.hasOwnProperty(e)){var a=l.Ln[e];if(null!=n&&n.constructor.name==a){if(!t||!(0,r.xb)(n))return!0;(0,d.fZ)("Field is empty",e)}else(0,d.fZ)("Invalid field type",e)}else(0,d.fZ)("Unknown field",e);return!1}function f(n){return c(n,"record",!0)&&function(n,e=!1){return!(!c(n,"timestamp",!0)||!(n.match(l.og)||!e&&(0,r.iX)(n)))||((0,d.fZ)("Invalid timestamp",n),!1)}(n.timestamp)&&c(n.main,"main",!0)&&(n.main=s(n.main,"main"),n.main)?(n.aside=s(n.aside,"aside"),n.media=c(e=n.media,"media",!0)&&p(e.url)&&(c(t=e.type,"type",!0)&&l.WS.includes(t)||((0,d.fZ)("Invalid media type",type),0))?(e.caption=s(e.caption,"caption"),e):{url:"",type:"",caption:""},n):null;var e,t}function h(n,e=!1){var t;return t=e?l.bt:l.Q1,!(!c(n,"id",!0)||!n.match(t))||((0,d.fZ)("Invalid thread id",n),!1)}function p(n){return!!(0,a.HH)(n)||((0,d.fZ)("Invalid url",n),!1)}function m(n){return c(n,"data",!0)&&(n.nexus=(function(n){return!(!p(n)||n!=l.Gd)||((0,d.fZ)("Invalid app url"),!1)}(e=n.url)||(e=l.Gd),e),n.author=c(t=n.author,"author",!0)&&p(t.url)&&(t.handle=s(t.handle,"handle"),t.handle)?(t.about=s(t.about,"about"),t):null,n.author&&(n.threads=function(n){if(c(n,"threads",!0)){var e=[];n=n.slice(0,u("threads")[1]);for(var t=0;t<n.length;t++){if(n[t]=c(r=n[t],"threads.item",!0)&&h(r.id)&&(r.record=f(r.record),null!=r.record)?(r.name=s(r.name,"name"),r.description=s(r.description,"description"),r.linked=function(n){n.slice(0,u("linked")[1]);for(var e,t=[],r=0;r<n.length;r++){if(c(e=n[r],"linked.item",!0)&&p(e.url)&&h(e.id,!0)||((0,d.fZ)("Invalid linked thread"),0)){var a=n[r].url+" "+n[r].id;if(!t.includes(a)){t.push(a);continue}(0,d.fZ)("Duplicate linked thread",a)}n.splice(r,1)}return n.length&&n.sort(((n,e)=>n.url<e.url?1:-1)),n}(r.linked),r):null,null!=n[t]){if(!e.includes(n[t].id)){e.push(n[t].id);continue}(0,d.fZ)("Duplicate thread id",n[t].id)}n.splice(t,1)}if(n.length)return n}var r;return(0,d.fZ)("No valid thread"),[]}(n.threads),n.threads.length))?n:null;var e,t}}}]);