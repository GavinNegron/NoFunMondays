(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5361],{77680:(e,t,s)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/dashboard/posts/components/EditStyles/embed-styles",function(){return s(35723)}])},35723:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>f});var i=s(77528),l=s(55456),a=s(74848),n=s(96540),d=s(50478),o=s(72644),r=s(18753),c=s(34591),u=s(38020);let f=()=>{let{blogPostMainRef:e}=(0,o.m)(),[t,s]=(0,n.useState)({x:0,y:175,offsetX:0,offsetY:0}),[f,m]=(0,n.useState)(!1),p=(0,n.useRef)(null);return(0,n.useEffect)(()=>{let t=()=>{if(e.current){let t=e.current.getBoundingClientRect().left;s(e=>(0,l._)((0,i._)({},e),{x:t-275}))}},a=()=>{setTimeout(t,100)};return"complete"===window.document.readyState?a():window.addEventListener("load",a),()=>window.removeEventListener("load",a)},[e]),(0,n.useEffect)(()=>{if(f){let e=(0,d.fU)(f,t,s,p),i=()=>(0,d.fc)(m);return document.addEventListener("mousemove",e),document.addEventListener("mouseup",i),()=>{document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",i)}}},[f,t,m]),(0,a.jsxs)("div",{className:"edit-styles edit-embed-styles",style:{position:"fixed",top:"".concat(t.y,"px"),left:"".concat(t.x,"px")},children:[(0,a.jsxs)("div",{className:"edit-styles__header",style:{cursor:f?"grabbing":"move"},onMouseDown:e=>(0,d.sm)(e,m,s),ref:p,children:[(0,a.jsx)("p",{children:"Edit Embed:"}),(0,a.jsx)("i",{onClick:()=>(0,r.b)(null),className:"fa-solid fa-light fa-xmark"})]}),(0,a.jsxs)("div",{className:"edit-styles__container",children:[(0,a.jsx)(c.default,{}),(0,a.jsx)(u.default,{})]})]})}},34591:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>l});var i=s(74848);let l=()=>(0,i.jsxs)("div",{className:"edit-styles__item",children:[(0,i.jsx)("p",{children:"Embed Url: "}),(0,i.jsx)("input",{type:"text",placeholder:"Enter Url"})]})},38020:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>d});var i=s(77528),l=s(55456),a=s(74848),n=s(72644);let d=()=>{let{style:e,setStyle:t,selectedElement:s}=(0,n.m)(),d=(e,a)=>{let n=parseInt(e.target.value.replace(/[^0-9]/g,""),10)||0,d="margin".concat(a.charAt(0).toUpperCase()+a.slice(1));t(e=>(0,l._)((0,i._)({},e),{[d]:n})),s?s.style[d]="".concat(n,"px"):console.warn("selectedElement is undefined or null")};return(0,a.jsxs)("div",{className:"edit-styles__item",children:[(0,a.jsx)("p",{children:"Margin: "}),(0,a.jsxs)("div",{className:"edit-styles__margin",children:[(0,a.jsxs)("div",{className:"edit-styles__margin__item",children:[(0,a.jsx)("label",{children:"Top"}),(0,a.jsx)("input",{type:"number",min:"0",value:e.marginTop||"",onChange:e=>d(e,"top")})]}),(0,a.jsxs)("div",{className:"edit-styles__margin__item",children:[(0,a.jsx)("label",{children:"Left"}),(0,a.jsx)("input",{type:"number",value:e.marginLeft||"",onChange:e=>d(e,"left")})]}),(0,a.jsxs)("div",{className:"edit-styles__margin__item",children:[(0,a.jsx)("label",{children:"Bottom"}),(0,a.jsx)("input",{type:"number",value:e.marginBottom||"",onChange:e=>d(e,"bottom")})]}),(0,a.jsxs)("div",{className:"edit-styles__margin__item",children:[(0,a.jsx)("label",{children:"Right"}),(0,a.jsx)("input",{type:"number",value:e.marginRight||"",onChange:e=>d(e,"right")})]})]})]})}},50478:(e,t,s)=>{"use strict";s.d(t,{IK:()=>n,fU:()=>o,fc:()=>r,sm:()=>d});var i=s(77528),l=s(55456),a=s(59547);let n=e=>{let t=e.currentTarget;if([...a.text.classes.map(e=>e.class),...a.lists.classes.map(e=>e.class)].some(e=>t.classList.contains(e))){t.contentEditable=!0,t.style.outline="none",t.spellcheck=!1,t.focus;let e=s=>{t.contains(s.target)||(t.contentEditable=!1,document.removeEventListener("mousedown",e))};document.addEventListener("mousedown",e),t.addEventListener("keydown",s=>{("Backspace"===s.key||"Delete"===s.key)&&s.stopPropagation(),"Enter"!==s.key||s.shiftKey||(s.preventDefault(),t.contentEditable=!1,document.removeEventListener("mousedown",e))})}},d=(e,t,s)=>{let a=e.target.closest(".edit-styles");if(!a)return;let n=a.getBoundingClientRect(),d=e.clientX-n.left,o=e.clientY-n.top;t(!0),s(e=>(0,l._)((0,i._)({},e),{offsetX:d,offsetY:o}))},o=(e,t,s,a)=>n=>{if(e&&a.current){let e=n.clientX-t.offsetX,d=n.clientY-t.offsetY,o=a.current.offsetHeight,r=a.current.offsetWidth,c=Math.max(20,Math.min(window.innerWidth-r-20,e)),u=Math.max(20,Math.min(window.innerHeight-o-20,d));s(e=>(0,l._)((0,i._)({},e),{x:c,y:u}))}},r=e=>{e(!1)}},18753:(e,t,s)=>{"use strict";s.d(t,{b:()=>n});var i=s(74692),l=s.n(i),a=s(59547);let n=(e,t)=>{if(l()(".editor-sidebar__add-elements").stop(!0,!0).fadeOut("fast"),!e){l()(".edit-text-styles, .edit-image-styles, .edit-list-styles").stop(!0,!0).fadeOut("fast");return}t(e);let s=a.text.classes.map(e=>e.class),i=a.image.classes.map(e=>e.class),n=a.lists.classes.map(e=>e.class),d=a.embed.classes.map(e=>e.class);if(s.some(t=>e.classList.contains(t))){if(l()(".edit-text-styles").is(":visible"))return;l()(".edit-image-styles").stop(!0,!0).fadeOut("fast"),l()(".edit-list-styles").stop(!0,!0).fadeOut("fast"),l()(".edit-embed-styles").stop(!0,!0).fadeOut("fast"),l()(".edit-text-styles").stop(!0,!0).fadeIn("fast"),l()(".edit-text-styles").css("display","flex").show()}if(i.some(t=>e.classList.contains(t))){if(l()(".edit-image-styles").is(":visible"))return;l()(".edit-text-styles").stop(!0,!0).fadeOut("fast"),l()(".edit-list-styles").stop(!0,!0).fadeOut("fast"),l()(".edit-embed-styles").stop(!0,!0).fadeOut("fast"),l()(".edit-image-styles").stop(!0,!0).fadeIn("fast"),l()(".edit-image-styles").css("display","flex").show()}if(n.some(t=>e.classList.contains(t))){if(l()(".edit-list-styles").is(":visible"))return;l()(".edit-text-styles").stop(!0,!0).fadeOut("fast"),l()(".edit-image-styles").stop(!0,!0).fadeOut("fast"),l()(".edit-embed-styles").stop(!0,!0).fadeOut("fast"),l()(".edit-list-styles").stop(!0,!0).fadeIn("fast"),l()(".edit-list-styles").css("display","flex").show()}if(d.some(t=>e.classList.contains(t))){if(l()(".edit-embed-styles").is(":visible"))return;l()(".edit-text-styles").stop(!0,!0).fadeOut("fast"),l()(".edit-image-styles").stop(!0,!0).fadeOut("fast"),l()(".edit-list-styles").stop(!0,!0).fadeOut("fast"),l()(".edit-embed-styles").stop(!0,!0).fadeIn("fast"),l()(".edit-embed-styles").css("display","flex").show()}}},59547:e=>{"use strict";e.exports=JSON.parse('{"text":{"classes":[{"class":"default-text","text":"Default Text"},{"class":"h1","text":"Header 1"},{"class":"h2","text":"Header 2"},{"class":"h3","text":"Header 3"},{"class":"h4","text":"Header 4"},{"class":"h5","text":"Header 5"},{"class":"h6","text":"Header 6"},{"class":"title","text":"Title","exclude":true}]},"image":{"classes":[{"class":"image","text":"Image"},{"class":"banner","text":"Banner","exclude":true}]},"lists":{"classes":[{"class":"bullet","text":"Bullet Points"}]},"embed":{"classes":[{"class":"twitter","text":"Twitter"}]},"misc":{"classes":[{"class":"divider","text":"Divider"}]},"form":{"classes":[{"class":"banner","text":"Banner"}]},"video":{"classes":[{"class":"banner","text":"Banner","exclude":false}]},"fontOptions":{"exclude":true,"options":["Noto Sans","Nunito","Poppins"]},"fontWeightOptions":{"exclude":true,"options":["100","200","300","400","500","600","700","800","900"]},"fontSizeOptions":{"exclude":true,"options":["18","24","32","38"]},"alignmentOptions":{"exclude":true,"options":[{"value":"left","icon":"fa-align-left","tooltip":"Align Left"},{"value":"center","icon":"fa-align-center","tooltip":"Align Center"},{"value":"right","icon":"fa-align-right","tooltip":"Align Right"}]},"colorOptions":{"exclude":true,"options":["black","white","red","orange","yellow","green","blue","purple"]}}')}},e=>{var t=t=>e(e.s=t);e.O(0,[3461,636,6593,8792],()=>t(77680)),_N_E=e.O()}]);