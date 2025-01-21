(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1454],{28232:(e,t)=>{"use strict";Object.prototype.toString},80722:(e,t,s)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog/blog-post",function(){return s(95848)}])},21816:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>d});var a=s(74848);s(36703);var l=s(13368),n=s.n(l),i=s(91106),r=s.n(i);let d=()=>(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n(),{children:(0,a.jsx)("title",{children:"404 - NotFound"})}),(0,a.jsxs)("div",{className:"NotFound",children:[(0,a.jsx)("div",{className:"NotFound__header",children:(0,a.jsx)("span",{children:"404"})}),(0,a.jsx)("div",{className:"NotFound__description",children:(0,a.jsx)("span",{children:"Page Not Found"})}),(0,a.jsx)("div",{className:"NotFound__pun",children:(0,a.jsx)("span",{children:"Looks like this page has gone AFK"})}),(0,a.jsx)("div",{className:"NotFound__btn",children:(0,a.jsx)("div",{className:"fortnite-btn",children:(0,a.jsx)("span",{children:(0,a.jsx)(r(),{href:"/",children:"Return To Lobby"})})})})]})]})},95848:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>m});var a=s(74848),l=s(96540),n=s(14753),i=s(29965),r=s.n(i),d=s(21816),c=s(93022),o=s(15664),f=s(71557),u=s(63873);let m=function(){let{slug:e}=(0,n.g)(),[t,s]=(0,l.useState)(null),[i,m]=(0,l.useState)(!1),[h,x]=(0,l.useState)(!0);return((0,l.useEffect)(()=>{(async()=>{try{let t=await fetch("/api/posts");if(!t.ok)throw Error("Failed to fetch posts");let a=(await t.json()).find(t=>t.slug===e);a?s(a):m(!0)}catch(e){m(!0)}finally{x(!1)}})()},[e]),h)?(0,a.jsx)(f.default,{}):i?(0,a.jsx)(d.default,{}):t?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("title",{children:t.title}),(0,a.jsx)(c.default,{}),(0,a.jsx)("main",{className:"main",children:(0,a.jsx)("div",{className:"post",children:(0,a.jsxs)("div",{className:"post__inner",children:[(0,a.jsx)("div",{className:"post__header d-flex",children:(0,a.jsx)(r(),{width:"100",height:"100",src:t.imageUrl,alt:t.title,draggable:"false"})}),(0,a.jsxs)("div",{className:"post__content",children:[(0,a.jsx)("div",{className:"post__content-header",children:(0,a.jsx)("p",{children:t.title})}),(0,a.jsx)("div",{className:"post__elements",children:t.elements&&t.elements.length>0&&t.elements.map(e=>(0,a.jsx)(u.A,{element:e,editor:!1},e.id))})]})]})})}),(0,a.jsx)(o.default,{})]}):null}},71557:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>i});var a=s(74848),l=s(83914),n=s(66188);let i=function(){return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{className:"loading-screen",style:{display:"flex",justifyContent:"center",alignItems:"center",position:"fixed",top:0,left:0,width:"100%",height:"100%",backgroundColor:"#121212",zIndex:"99999",fontSize:"2.25rem",overflowX:"hidden",overflowY:"hidden"},children:(0,a.jsx)("div",{className:"loading-screen__icon",children:(0,a.jsx)(l.g,{icon:n.Rbk,bounce:!0,size:"2x",style:{color:"#ffffff"}})})})})}},52805:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>l});var a=s(74848);let l=function(){return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{className:"search",children:(0,a.jsxs)("form",{action:"",className:"search__form",children:[(0,a.jsx)("input",{type:"text",className:"search__form-input",placeholder:"Search: "}),(0,a.jsx)("button",{className:"search__form-btn",type:"submit",children:(0,a.jsx)("i",{className:"fa-solid fa-magnifying-glass"})})]})})})}},98297:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>i});var a=s(74848),l=s(91106),n=s.n(l);let i=function(){return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)("div",{className:"socials",children:[(0,a.jsx)(n(),{className:"socials-item",href:"/discord","data-color":"#7289da",children:(0,a.jsx)("i",{className:"fa-brands fa-discord"})}),(0,a.jsx)(n(),{className:"socials-item",href:"/youtube","data-color":"#ff0000",children:(0,a.jsx)("i",{className:"fa-brands fa-youtube"})}),(0,a.jsx)(n(),{className:"socials-item",href:"/twitter","data-color":"#1da1f2",children:(0,a.jsx)("i",{className:"fa-brands fa-twitter"})}),(0,a.jsx)(n(),{className:"socials-item",href:"/email","data-color":"#333333",children:(0,a.jsx)("i",{className:"fa-regular fa-envelope"})})]})})}},15664:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>n});var a=s(74848);s(96540);var l=s(98297);let n=function(){return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("footer",{className:"footer",children:(0,a.jsxs)("div",{className:"container-fluid",children:[(0,a.jsxs)("div",{className:"footer__top center",children:[(0,a.jsx)("div",{className:"footer__logo",children:(0,a.jsx)("p",{children:"NoFunMondays"})}),(0,a.jsx)("div",{className:"footer__socials",children:(0,a.jsx)(l.default,{})})]}),(0,a.jsx)("div",{className:"footer__bottom center",children:(0,a.jsx)("div",{className:"footer__copyright",children:(0,a.jsx)("span",{children:"\xa9 2024 Lorem, ipsum. All rights reserved."})})})]})})})}},93022:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>o});var a=s(74848),l=s(98297),n=s(52805),i=s(29965),r=s.n(i),d=s(91106),c=s.n(d);let o=function(){return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)("nav",{className:"container-fluid navbar",children:[(0,a.jsxs)("div",{className:"navbar__logo",children:[(0,a.jsx)(c(),{href:"/",className:"navbar__logo-name",children:"NoFunMondays"}),(0,a.jsx)(r(),{width:"100",height:"100",src:"/img/placeholder.png",alt:"Home",className:"navbar__logo-img"})]}),(0,a.jsxs)("div",{className:"navbar__menu d-flex center",children:[(0,a.jsxs)("div",{className:"navbar__menu-left",children:[(0,a.jsx)(c(),{href:"/about",className:"navbar__link",children:"Home"}),(0,a.jsx)(c(),{href:"/about",className:"navbar__link",children:"Blog"}),(0,a.jsx)(c(),{href:"/blog",className:"navbar__link",children:"Games"}),(0,a.jsx)(c(),{href:"/login",className:"navbar__link",children:"Leaks"}),(0,a.jsx)(c(),{href:"/login",className:"navbar__link",children:"Contact"})]}),(0,a.jsxs)("div",{className:"navbar__menu-right d-flex",children:[(0,a.jsx)(n.default,{}),(0,a.jsx)(l.default,{})]})]}),(0,a.jsx)("div",{className:"navbar__hamburger",children:(0,a.jsx)(r(),{width:"100",height:"100",src:"/img/hamburger-icon.png",className:"navbar__hamburger-img",alt:"menu-icon"})}),(0,a.jsxs)("div",{className:"navbar__dropdown",children:[(0,a.jsx)(c(),{href:"/",className:"navbar__dropdown-link",children:"Home"}),(0,a.jsx)(c(),{href:"/blog",className:"navbar__dropdown-link",children:"Blog"}),(0,a.jsx)(c(),{href:"/learn",className:"navbar__dropdown-link",children:"Games"}),(0,a.jsx)(c(),{href:"/about",className:"navbar__dropdown-link",children:"Leaks"}),(0,a.jsx)(c(),{href:"/contact-us",className:"navbar__dropdown-link",children:"Contact"})]})]})})}},52891:(e,t,s)=>{"use strict";s.d(t,{MS:()=>c,bS:()=>d,ji:()=>o});var a=s(77528),l=s(55456),n=s(74692),i=s.n(n);let r=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:24,t="",s="0123456789abcdef";for(let a=0;a<e;a++)t+=s.charAt(Math.floor(Math.random()*s.length));return t},d=(e,t)=>{let s={type:t.class,content:t.text};e.dataTransfer.setData("text/plain",JSON.stringify(s))},c=e=>{let t;i()(".editor-sidebar__add-elements").stop(!0,!0).animate({}).fadeOut("fast"),e.preventDefault();let s=e.dataTransfer.getData("text/plain");if(!(e=>{try{JSON.parse(e)}catch(e){return!1}return!0})(s))return console.error("Invalid JSON data:",s),null;try{t=JSON.parse(s)}catch(e){return console.error("Failed to parse data transfer:",e),null}return t&&"object"==typeof t&&t.type&&t.content?(0,l._)((0,a._)({},t),{id:r(),style:{}}):(console.error("Invalid element data:",t),null)},o=e=>{e.preventDefault()}},50478:(e,t,s)=>{"use strict";s.d(t,{IK:()=>i,fU:()=>d,fc:()=>c,sm:()=>r});var a=s(77528),l=s(55456),n=s(59547);let i=e=>{let t=e.currentTarget;if([...n.text.classes.map(e=>e.class),...n.lists.classes.map(e=>e.class)].some(e=>t.classList.contains(e))){t.contentEditable=!0,t.style.outline="none",t.spellcheck=!1,t.focus;let e=s=>{t.contains(s.target)||(t.contentEditable=!1,document.removeEventListener("mousedown",e))};document.addEventListener("mousedown",e),t.addEventListener("keydown",s=>{("Backspace"===s.key||"Delete"===s.key)&&s.stopPropagation(),"Enter"!==s.key||s.shiftKey||(s.preventDefault(),t.contentEditable=!1,document.removeEventListener("mousedown",e))})}},r=(e,t,s)=>{let n=e.target.closest(".edit-styles");if(!n)return;let i=n.getBoundingClientRect(),r=e.clientX-i.left,d=e.clientY-i.top;t(!0),s(e=>(0,l._)((0,a._)({},e),{offsetX:r,offsetY:d}))},d=(e,t,s,n)=>i=>{if(e&&n.current){let e=i.clientX-t.offsetX,r=i.clientY-t.offsetY,d=n.current.offsetHeight,c=n.current.offsetWidth,o=Math.max(20,Math.min(window.innerWidth-c-20,e)),f=Math.max(20,Math.min(window.innerHeight-d-20,r));s(e=>(0,l._)((0,a._)({},e),{x:o,y:f}))}},c=e=>{e(!1)}},18753:(e,t,s)=>{"use strict";s.d(t,{b:()=>i});var a=s(74692),l=s.n(a),n=s(59547);let i=(e,t)=>{if(l()(".editor-sidebar__add-elements").stop(!0,!0).fadeOut("fast"),!e){l()(".edit-text-styles, .edit-image-styles, .edit-list-styles").stop(!0,!0).fadeOut("fast");return}t(e);let s=n.text.classes.map(e=>e.class),a=n.image.classes.map(e=>e.class),i=n.lists.classes.map(e=>e.class),r=n.embed.classes.map(e=>e.class);if(s.some(t=>e.classList.contains(t))){if(l()(".edit-text-styles").is(":visible"))return;l()(".edit-image-styles").stop(!0,!0).fadeOut("fast"),l()(".edit-list-styles").stop(!0,!0).fadeOut("fast"),l()(".edit-embed-styles").stop(!0,!0).fadeOut("fast"),l()(".edit-text-styles").stop(!0,!0).fadeIn("fast"),l()(".edit-text-styles").css("display","flex").show()}if(a.some(t=>e.classList.contains(t))){if(l()(".edit-image-styles").is(":visible"))return;l()(".edit-text-styles").stop(!0,!0).fadeOut("fast"),l()(".edit-list-styles").stop(!0,!0).fadeOut("fast"),l()(".edit-embed-styles").stop(!0,!0).fadeOut("fast"),l()(".edit-image-styles").stop(!0,!0).fadeIn("fast"),l()(".edit-image-styles").css("display","flex").show()}if(i.some(t=>e.classList.contains(t))){if(l()(".edit-list-styles").is(":visible"))return;l()(".edit-text-styles").stop(!0,!0).fadeOut("fast"),l()(".edit-image-styles").stop(!0,!0).fadeOut("fast"),l()(".edit-embed-styles").stop(!0,!0).fadeOut("fast"),l()(".edit-list-styles").stop(!0,!0).fadeIn("fast"),l()(".edit-list-styles").css("display","flex").show()}if(r.some(t=>e.classList.contains(t))){if(l()(".edit-embed-styles").is(":visible"))return;l()(".edit-text-styles").stop(!0,!0).fadeOut("fast"),l()(".edit-image-styles").stop(!0,!0).fadeOut("fast"),l()(".edit-list-styles").stop(!0,!0).fadeOut("fast"),l()(".edit-embed-styles").stop(!0,!0).fadeIn("fast"),l()(".edit-embed-styles").css("display","flex").show()}}},63873:(e,t,s)=>{"use strict";s.d(t,{A:()=>m});var a=s(74848),l=s(96540),n=s(52891),i=s(18753),r=s(72644),d=s(50478);let c=e=>{let{tweetID:t}=e,s=(0,l.useRef)(!1);return(0,l.useEffect)(()=>{!s.current&&window.twttr&&(window.twttr.widgets.createTweet(t,document.getElementById(t),{align:"center",conversation:"none",dnt:!0,theme:"dark"}),s.current=!0)},[t]),(0,a.jsx)("div",{className:"w-full animate-fadeIn",id:t})};c.displayName="TwitterEmbed";let o=(0,l.memo)(c);var f=s(29965),u=s.n(f);let m=e=>{let{element:t}=e,{setSelectedElement:s}=(0,r.m)(),[c,f]=(0,l.useState)(""),[m,h]=(0,l.useState)("");(0,l.useEffect)(()=>{t.twitterId&&h(t.twitterId)},[t.twitterId]),(0,l.useEffect)(()=>{console.log("Updated twitterId:",m)},[m]);let x=e=>{f(e.target.value)},p=e=>{let t=e.match(/(?:twitter|x)\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/);return t?t[3]:null},g=()=>{let e=p(c);e&&h(e)};if(!t)return null;let j="".concat(t.id);return(0,a.jsx)("div",{id:j,"data-id":j,className:"blog-post-element ".concat("text"===t.type?t.tag:t.type),style:t.style||{},onDrop:e=>(0,n.MS)(e),onDragOver:n.ji,onClick:e=>(0,i.b)(e.currentTarget,s),onDoubleClick:e=>(0,d.IK)(e),tabIndex:"0",children:(()=>{switch(t.type){case"image":return(0,a.jsx)(u(),{width:"100",height:"100",src:t.imageUrl||"/img/placeholder.png",alt:t.alt});case"bullet":return(0,a.jsx)("div",{className:"bullet-point",children:(0,a.jsx)("ul",{children:t.listItems&&t.listItems.length>0?t.listItems.map((e,s)=>(0,a.jsx)("li",{children:e},"".concat(t.id,"-item-").concat(s))):(0,a.jsx)("li",{children:"List Item 1"})})});case"divider":return(0,a.jsx)("span",{className:"divider__container"});case"twitter":return m?(0,a.jsx)(o,{tweetID:m}):(0,a.jsxs)("div",{children:[(0,a.jsx)("input",{type:"text",value:c,onChange:x,placeholder:"Enter Twitter URL",className:"twitter"}),(0,a.jsx)("button",{onClick:g,children:"Embed"})]});default:return(0,a.jsx)("p",{children:t.content})}})()},j)}},36703:()=>{},13368:(e,t,s)=>{e.exports=s(23248)},59547:e=>{"use strict";e.exports=JSON.parse('{"text":{"classes":[{"class":"default-text","text":"Default Text"},{"class":"h1","text":"Header 1"},{"class":"h2","text":"Header 2"},{"class":"h3","text":"Header 3"},{"class":"h4","text":"Header 4"},{"class":"h5","text":"Header 5"},{"class":"h6","text":"Header 6"},{"class":"title","text":"Title","exclude":true}]},"image":{"classes":[{"class":"image","text":"Image"},{"class":"banner","text":"Banner","exclude":true}]},"lists":{"classes":[{"class":"bullet","text":"Bullet Points"}]},"embed":{"classes":[{"class":"twitter","text":"Twitter"}]},"misc":{"classes":[{"class":"divider","text":"Divider"}]},"form":{"classes":[{"class":"banner","text":"Banner"}]},"video":{"classes":[{"class":"banner","text":"Banner","exclude":false}]},"fontOptions":{"exclude":true,"options":["Noto Sans","Nunito","Poppins"]},"fontWeightOptions":{"exclude":true,"options":["100","200","300","400","500","600","700","800","900"]},"fontSizeOptions":{"exclude":true,"options":["18","24","32","38"]},"alignmentOptions":{"exclude":true,"options":[{"value":"left","icon":"fa-align-left","tooltip":"Align Left"},{"value":"center","icon":"fa-align-center","tooltip":"Align Center"},{"value":"right","icon":"fa-align-right","tooltip":"Align Right"}]},"colorOptions":{"exclude":true,"options":["black","white","red","orange","yellow","green","blue","purple"]}}')}},e=>{var t=t=>e(e.s=t);e.O(0,[3461,7069,9335,1106,3914,7765,636,6593,8792],()=>t(80722)),_N_E=e.O()}]);