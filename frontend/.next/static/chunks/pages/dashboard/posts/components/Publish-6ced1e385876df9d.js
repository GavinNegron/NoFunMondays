(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[51],{45723:(e,t,s)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/dashboard/posts/components/Publish",function(){return s(44402)}])},44402:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>g});var l=s(74848),i=s(96540),n=s(72644),a=s(71468),r=s(30307),c=s(77528),o=s(55456);let u=e=>{if(!e)return{};let t=window.getComputedStyle(e);return{color:t.color,margin:t.margin,fontFamily:t.fontFamily,fontSize:t.fontSize,fontWeight:t.fontWeight,fontStyle:t.fontStyle,textDecoration:t.textDecoration,textAlign:t.textAlign}};var d=s(90126),p=s(59547),h=s(99418);let x=async(e,t,s,l)=>{if(!e)return;let i=new Map,n=l||null,a=document.querySelector(".banner img");a&&(n=a.src);let r=t.map(e=>{let t=document.getElementById(e.id);if(t){let s;let l=u(t);i.set(e.id,l);let n=null;if(t.classList.contains("image")){s="image";let e=t.querySelector("img");e&&(n=e.src)}else{let e=Object.keys(p).find(e=>{var s;return Array.isArray(null===(s=p[e])||void 0===s?void 0:s.classes)&&p[e].classes.some(e=>t.classList.contains(e.class))});if(e){let l=p[e].classes.find(e=>t.classList.contains(e.class));s=l?l.class:"default-text"}else s="default-text"}let a=t.innerText||e.content;a=h.A.sanitize(a);let r=(0,o._)((0,c._)({},e),{type:s,content:"bullet"===s?null:a,style:(0,c._)({},l)});if("image"===s&&(r.imageUrl=n),"bullet"===s){let e=Array.from(t.querySelectorAll("ul li"));r.listItems=e.map(e=>e.textContent)}if("twitter"===s){let e=t.querySelector("input.twitter");e&&e.value&&(r.twitterId=e.value)}return r}return e}),x=(0,o._)((0,c._)({},e),{imageUrl:n,elements:r,status:"published"});try{let t=await (0,d.A)(e._id,x);s(t)}catch(e){console.error("Error updating post:",e)}};var m=s(74692),f=s.n(m),_=s(91106),b=s.n(_);let g=function(){let{setPost:e,imageUrl:t}=(0,n.m)(),{postElements:s,post:c}=(0,a.d4)(e=>e.posts.fetchSlug),o=(0,i.useRef)(!0);(0,i.useEffect)(()=>()=>{o.current=!1},[]),(0,i.useEffect)(()=>{window.$&&f()(".publish").on("click",e=>{(0,r.wj)(e,".publish__inner",".publish")})},[]);let{auth:u}=c||{};return u?(0,l.jsx)("div",{className:"publish",children:(0,l.jsxs)("div",{className:"publish__inner",children:[(0,l.jsx)("div",{className:"publish__header",children:(0,l.jsx)("span",{children:"Publish Post"})}),(0,l.jsxs)("div",{className:"publish__content",children:[(0,l.jsx)(b(),{draggable:"false",children:(0,l.jsxs)("div",{className:"publish__content__item publish__content-post",children:[(0,l.jsx)("span",{children:"Publish Post"}),(0,l.jsx)("p",{children:"Make your post public."})]})}),(0,l.jsx)(b(),{draggable:"false",children:(0,l.jsxs)("div",{className:"publish__content__item publish__content-schedule",children:[(0,l.jsxs)("div",{className:"publish__content-schedule__text",children:[(0,l.jsx)("span",{children:"Scheduled Publish"}),(0,l.jsx)("p",{children:"Select a time to make your post public."})]}),(0,l.jsxs)("div",{className:"publish__content-schedule__input",children:[(0,l.jsx)("input",{type:"date",name:"",id:""}),(0,l.jsx)("input",{type:"time",name:"",id:""})]}),(0,l.jsxs)("p",{children:["Post will be ",(0,l.jsx)("b",{children:"private"})," before set time."]})]})}),(0,l.jsx)("div",{className:"publish__content-submit",children:(0,l.jsx)("button",{className:"fortnite-btn",onClick:()=>x(c,s,e,t),children:"Publish Post"})})]})]})}):null}},30307:(e,t,s)=>{"use strict";s.d(t,{wj:()=>n});var l=s(74692),i=s.n(l);let n=(e,t,s)=>{!(Array.isArray(t)?t:[t]).some(t=>e.target.closest(t))&&s&&i()(s).stop(!0,!0).fadeOut(200)}},59547:e=>{"use strict";e.exports=JSON.parse('{"text":{"classes":[{"class":"default-text","text":"Default Text"},{"class":"h1","text":"Header 1"},{"class":"h2","text":"Header 2"},{"class":"h3","text":"Header 3"},{"class":"h4","text":"Header 4"},{"class":"h5","text":"Header 5"},{"class":"h6","text":"Header 6"},{"class":"title","text":"Title","exclude":true}]},"image":{"classes":[{"class":"image","text":"Image"},{"class":"banner","text":"Banner","exclude":true}]},"lists":{"classes":[{"class":"bullet","text":"Bullet Points"}]},"embed":{"classes":[{"class":"twitter","text":"Twitter"}]},"misc":{"classes":[{"class":"divider","text":"Divider"}]},"form":{"classes":[{"class":"banner","text":"Banner"}]},"video":{"classes":[{"class":"banner","text":"Banner","exclude":false}]},"fontOptions":{"exclude":true,"options":["Noto Sans","Nunito","Poppins"]},"fontWeightOptions":{"exclude":true,"options":["100","200","300","400","500","600","700","800","900"]},"fontSizeOptions":{"exclude":true,"options":["18","24","32","38"]},"alignmentOptions":{"exclude":true,"options":[{"value":"left","icon":"fa-align-left","tooltip":"Align Left"},{"value":"center","icon":"fa-align-center","tooltip":"Align Center"},{"value":"right","icon":"fa-align-right","tooltip":"Align Right"}]},"colorOptions":{"exclude":true,"options":["black","white","red","orange","yellow","green","blue","purple"]}}')}},e=>{var t=t=>e(e.s=t);e.O(0,[3461,1106,9418,636,6593,8792],()=>t(45723)),_N_E=e.O()}]);