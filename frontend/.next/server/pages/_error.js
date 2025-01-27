"use strict";(()=>{var e={};e.id=731,e.ids=[220,636,731],e.modules={671:(e,t)=>{Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,a){return a in t?t[a]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,a)):"function"==typeof t&&"default"===a?t:void 0}}})},4129:(e,t,a)=>{a.a(e,async(e,r)=>{try{a.r(t),a.d(t,{config:()=>h,default:()=>u,getServerSideProps:()=>y,getStaticPaths:()=>f,getStaticProps:()=>p,reportWebVitals:()=>g,routeModule:()=>v,unstable_getServerProps:()=>b,unstable_getServerSideProps:()=>P,unstable_getStaticParams:()=>x,unstable_getStaticPaths:()=>j,unstable_getStaticProps:()=>m});var n=a(3865),s=a(9455),o=a(671),l=a(7556),i=a(3538),d=a(6218),c=e([i]);i=(c.then?(await c)():c)[0];let u=(0,o.M)(d,"default"),p=(0,o.M)(d,"getStaticProps"),f=(0,o.M)(d,"getStaticPaths"),y=(0,o.M)(d,"getServerSideProps"),h=(0,o.M)(d,"config"),g=(0,o.M)(d,"reportWebVitals"),m=(0,o.M)(d,"unstable_getStaticProps"),j=(0,o.M)(d,"unstable_getStaticPaths"),x=(0,o.M)(d,"unstable_getStaticParams"),b=(0,o.M)(d,"unstable_getServerProps"),P=(0,o.M)(d,"unstable_getServerSideProps"),v=new n.PagesRouteModule({definition:{kind:s.A.PAGES,page:"/_error",pathname:"/_error",bundlePath:"",filename:""},components:{App:i.default,Document:l.default},userland:d});r()}catch(e){r(e)}})},6218:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return c}});let r=a(9929),n=a(8732),s=r._(a(2015)),o=r._(a(3248)),l={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function i(e){let{res:t,err:a}=e;return{statusCode:t&&t.statusCode?t.statusCode:a?a.statusCode:404}}let d={error:{fontFamily:'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{lineHeight:"48px"},h1:{display:"inline-block",margin:"0 20px 0 0",paddingRight:23,fontSize:24,fontWeight:500,verticalAlign:"top"},h2:{fontSize:14,fontWeight:400,lineHeight:"28px"},wrap:{display:"inline-block"}};class c extends s.default.Component{render(){let{statusCode:e,withDarkMode:t=!0}=this.props,a=this.props.title||l[e]||"An unexpected error has occurred";return(0,n.jsxs)("div",{style:d.error,children:[(0,n.jsx)(o.default,{children:(0,n.jsx)("title",{children:e?e+": "+a:"Application error: a client-side exception has occurred"})}),(0,n.jsxs)("div",{style:d.desc,children:[(0,n.jsx)("style",{dangerouslySetInnerHTML:{__html:"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}"+(t?"@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}":"")}}),e?(0,n.jsx)("h1",{className:"next-error-h1",style:d.h1,children:e}):null,(0,n.jsx)("div",{style:d.wrap,children:(0,n.jsxs)("h2",{style:d.h2,children:[this.props.title||e?a:(0,n.jsx)(n.Fragment,{children:"Application error: a client-side exception has occurred (see the browser console for more information)"}),"."]})})]})]})}}c.displayName="ErrorPage",c.getInitialProps=i,c.origGetInitialProps=i,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2452:(e,t)=>{function a(e){let{ampFirst:t=!1,hybrid:a=!1,hasQuery:r=!1}=void 0===e?{}:e;return t||a&&r}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isInAmpMode",{enumerable:!0,get:function(){return a}})},3248:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var a in t)Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}(t,{default:function(){return h},defaultHead:function(){return u}});let r=a(9929),n=a(4588),s=a(8732),o=n._(a(2015)),l=r._(a(2495)),i=a(9811),d=a(9241),c=a(2452);function u(e){void 0===e&&(e=!1);let t=[(0,s.jsx)("meta",{charSet:"utf-8"},"charset")];return e||t.push((0,s.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")),t}function p(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}a(4636);let f=["name","httpEquiv","charSet","itemProp"];function y(e,t){let{inAmpMode:a}=t;return e.reduce(p,[]).reverse().concat(u(a).reverse()).filter(function(){let e=new Set,t=new Set,a=new Set,r={};return n=>{let s=!0,o=!1;if(n.key&&"number"!=typeof n.key&&n.key.indexOf("$")>0){o=!0;let t=n.key.slice(n.key.indexOf("$")+1);e.has(t)?s=!1:e.add(t)}switch(n.type){case"title":case"base":t.has(n.type)?s=!1:t.add(n.type);break;case"meta":for(let e=0,t=f.length;e<t;e++){let t=f[e];if(n.props.hasOwnProperty(t)){if("charSet"===t)a.has(t)?s=!1:a.add(t);else{let e=n.props[t],a=r[t]||new Set;("name"!==t||!o)&&a.has(e)?s=!1:(a.add(e),r[t]=a)}}}}return s}}()).reverse().map((e,t)=>{let r=e.key||t;if(process.env.__NEXT_OPTIMIZE_FONTS&&!a&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(t=>e.props.href.startsWith(t))){let t={...e.props||{}};return t["data-href"]=t.href,t.href=void 0,t["data-optimized-fonts"]=!0,o.default.cloneElement(e,t)}return o.default.cloneElement(e,{key:r})})}let h=function(e){let{children:t}=e,a=(0,o.useContext)(i.AmpStateContext),r=(0,o.useContext)(d.HeadManagerContext);return(0,s.jsx)(l.default,{reduceComponentsToState:y,headManager:r,inAmpMode:(0,c.isInAmpMode)(a),children:t})};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2495:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return o}});let r=a(2015),n=()=>{},s=()=>{};function o(e){var t;let{headManager:a,reduceComponentsToState:o}=e;function l(){if(a&&a.mountedInstances){let t=r.Children.toArray(Array.from(a.mountedInstances).filter(Boolean));a.updateHead(o(t,e))}}return null==a||null==(t=a.mountedInstances)||t.add(e.children),l(),n(()=>{var t;return null==a||null==(t=a.mountedInstances)||t.add(e.children),()=>{var t;null==a||null==(t=a.mountedInstances)||t.delete(e.children)}}),n(()=>(a&&(a._pendingUpdate=l),()=>{a&&(a._pendingUpdate=l)})),s(()=>(a&&a._pendingUpdate&&(a._pendingUpdate(),a._pendingUpdate=null),()=>{a&&a._pendingUpdate&&(a._pendingUpdate(),a._pendingUpdate=null)})),null}},4636:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"warnOnce",{enumerable:!0,get:function(){return a}});let a=e=>{}},9658:(e,t,a)=>{a.a(e,async(e,r)=>{try{a.d(t,{M:()=>d});var n=a(9198),s=a(6175),o=a(8704),l=a(1974),i=e([n,s,o,l]);[n,s,o,l]=i.then?(await i)():i;let d=(0,n.configureStore)({reducer:{posts:s.A,tasks:o.A,user:l.Ay}});r()}catch(e){r(e)}})},2644:(e,t,a)=>{a.d(t,{m:()=>l,z:()=>o});var r=a(8732),n=a(2015);let s=(0,n.createContext)(),o=({children:e})=>{let[t,a]=(0,n.useState)(null),[o,l]=(0,n.useState)([]),[i,d]=(0,n.useState)(null),[c,u]=(0,n.useState)({color:"",margin:"",fontFamily:""}),[p,f]=(0,n.useState)(""),[y,h]=(0,n.useState)(""),[g,m]=(0,n.useState)(""),[j,x]=(0,n.useState)({color:c.color||"#000000",fontSize:c.fontSize||18,fontFamily:c.fontFamily||"",fontWeight:c.fontWeight||"normal",currentType:c.class||"default-text",marginTop:c.marginTop||0,marginLeft:c.marginLeft||0,marginBottom:c.marginBottom||0,marginRight:c.marginRight||0}),[b,P]=(0,n.useState)(!1),v=(0,n.useRef)(null),w=(0,n.useRef)(null),S=(0,n.useCallback)((e,t)=>{i&&l(a=>a.map(a=>a.id===i.id?{...a,style:{...a.style,[e]:t}}:a))},[i]),_=e=>{let t=e.target.files[0];if(!t)return;let a=new FileReader;a.onloadend=()=>{let e=a.result;f(e),h(e)},a.readAsDataURL(t)};return(0,r.jsx)(s.Provider,{value:{post:t,setPost:a,postElements:o,setPostElements:l,selectedElement:i,setSelectedElement:d,elementStyles:c,setElementStyles:u,image:p,setImage:f,imageUrl:g,setImageUrl:m,style:j,setStyle:x,previewImage:y,setPreviewImage:h,blogPostMainRef:v,handleStyleChange:S,showColorPicker:b,setShowColorPicker:P,toggleColorPicker:()=>P(e=>!e),renderImageSelector:()=>{let e=y||"/img/placeholder.png";return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("img",{src:e,alt:"Selected preview",style:{maxWidth:"100%"},onClick:()=>w.current?.click()}),(0,r.jsx)("input",{ref:w,type:"file",onChange:e=>_(e),accept:"image/*",style:{display:"none"}})]})}},children:e})},l=()=>(0,n.useContext)(s)},5271:(e,t,a)=>{a.a(e,async(e,r)=>{try{a.d(t,{b4:()=>u,dH:()=>y,ip:()=>l,m0:()=>f,pD:()=>d,qs:()=>i,y9:()=>p,ys:()=>c});var n=a(9198),s=a(6450),o=e([n,s]);[n,s]=o.then?(await o)():o;let l=e=>({type:"posts/addPostElement",payload:e}),i=e=>({type:"posts/deletePostElement",payload:e}),d=(0,n.createAsyncThunk)("posts/create",async(e,t)=>{try{return await s.pD(e)}catch(e){return t.rejectWithValue(e.response?.data?.message||"Failed to create post")}}),c=(0,n.createAsyncThunk)("posts/deletePost",async(e,t)=>{try{return await s.ys(e)}catch(e){return t.rejectWithValue(e.response?.data?.message||"Failed to delete post")}}),u=(0,n.createAsyncThunk)("posts/fetchFeaturedPost",async(e,t)=>{try{return await s.b4()}catch(e){return t.rejectWithValue("Failed to fetch posts")}}),p=(0,n.createAsyncThunk)("posts/fetchPosts",async({limit:e,excludeFeatured:t},a)=>{try{return await s.y9(e,t)}catch(e){return a.rejectWithValue("Failed to fetch posts")}}),f=(0,n.createAsyncThunk)("posts/fetchSlug",async(e,t)=>{try{return await s.m0(e)}catch(e){return t.rejectWithValue("Failed to fetch post")}}),y=(0,n.createAsyncThunk)("posts/fetchTitle",async(e,t)=>{try{return await s.dH(e)}catch(e){return t.rejectWithValue("Failed to fetch title.")}});r()}catch(e){r(e)}})},6450:(e,t,a)=>{a.a(e,async(e,r)=>{try{a.d(t,{b4:()=>i,dH:()=>u,gg:()=>p,m0:()=>c,pD:()=>o,y9:()=>d,ys:()=>l});var n=a(1428),s=e([n]);n=(s.then?(await s)():s)[0];let o=async e=>(await n.default.post("/api/posts",e,{headers:{"Content-Type":"application/json"}})).data,l=async e=>(await n.default.delete(`/api/posts/${e}`)).data,i=async()=>{try{return(await n.default.get("/api/posts/featured")).data}catch(e){if(e.response?.status===404)throw Error("Featured post not found");throw Error(e.response?.data?.message||"Failed to fetch featured post")}},d=async(e,t=!1)=>(await n.default.get("/api/posts/recent",{params:{limit:e,excludeFeatured:t}})).data,c=async e=>(await n.default.get(`/api/posts/slug/${e}`)).data,u=async e=>(await n.default.get("/api/posts/title",{params:{title:e}})).data.available,p=async(e,t)=>(await n.default.put(`/api/posts/${e}`,t,{headers:{"Content-Type":"application/json"}})).data;r()}catch(e){r(e)}})},6175:(e,t,a)=>{a.a(e,async(e,r)=>{try{a.d(t,{A:()=>i});var n=a(9198),s=a(5271),o=e([n,s]);[n,s]=o.then?(await o)():o;let l=(0,n.createSlice)({name:"posts",initialState:{post:null,posts:[],featuredPost:null,postElements:[],isLoading:!1,error:null,newPost:null},reducers:{addPostElement:(e,t)=>{e.post&&(e.postElements=[...e.postElements,t.payload])},deletePostElement:(e,t)=>{e.post&&(e.postElements=e.postElements.filter(e=>e.id!==t.payload))}},extraReducers:e=>{e.addCase(s.m0.pending,e=>{e.isLoading=!0,e.error=null}).addCase(s.m0.fulfilled,(e,t)=>{e.isLoading=!1,e.post=t.payload,e.postElements=t.payload.elements}).addCase(s.m0.rejected,(e,t)=>{e.isLoading=!1,e.error=t.payload}),e.addCase(s.y9.pending,e=>{e.isLoading=!0,e.error=null}).addCase(s.y9.fulfilled,(e,t)=>{e.isLoading=!1,e.posts=t.payload}).addCase(s.y9.rejected,(e,t)=>{e.isLoading=!1,e.error=t.payload}),e.addCase(s.b4.pending,e=>{e.isLoading=!0,e.error=null}).addCase(s.b4.fulfilled,(e,t)=>{e.isLoading=!1,e.featuredPost=t.payload}).addCase(s.b4.rejected,(e,t)=>{e.isLoading=!1,e.error=t.payload}),e.addCase(s.ys.pending,e=>{e.isLoading=!0,e.error=null}).addCase(s.ys.fulfilled,e=>{e.isLoading=!1}).addCase(s.ys.rejected,(e,t)=>{e.isLoading=!1,e.error=t.payload}),e.addCase(s.pD.pending,e=>{e.isLoading=!0,e.error=null}).addCase(s.pD.fulfilled,(e,t)=>{e.isLoading=!1,e.newPost=t.payload}).addCase(s.pD.rejected,(e,t)=>{e.isLoading=!1,e.error=t.payload})}}),i=(0,n.combineReducers)({post:l.reducer});r()}catch(e){r(e)}})},5279:(e,t,a)=>{a.a(e,async(e,r)=>{try{a.d(t,{A:()=>o});var n=a(1428),s=e([n]);n=(s.then?(await s)():s)[0];let o=async(e,t=!1)=>(await n.default.get("/api/tasks",{params:{limit:e,excludeFeatured:t}})).data;r()}catch(e){r(e)}})},5672:(e,t,a)=>{a.a(e,async(e,r)=>{try{a.d(t,{j:()=>l});var n=a(9198),s=a(5279),o=e([n,s]);[n,s]=o.then?(await o)():o;let l=(0,n.createAsyncThunk)("tasks/fetch",async({limit:e,excludeFeatured:t=!1},a)=>{try{return await (0,s.A)(e,t)}catch(e){return a.rejectWithValue(e.response?.data?.message||"Failed to fetch tasks")}});r()}catch(e){r(e)}})},8704:(e,t,a)=>{a.a(e,async(e,r)=>{try{a.d(t,{A:()=>l});var n=a(9198),s=a(5672),o=e([n,s]);[n,s]=o.then?(await o)():o;let l=(0,n.createSlice)({name:"tasks",initialState:{tasks:[],isLoading:!1,error:null},reducers:{},extraReducers:e=>{e.addCase(s.j.pending,e=>{e.isLoading=!0,e.error=null}).addCase(s.j.fulfilled,(e,t)=>{e.isLoading=!1,e.tasks=t.payload}).addCase(s.j.rejected,(e,t)=>{e.isLoading=!1,e.error=t.payload})}}).reducer;r()}catch(e){r(e)}})},8763:(e,t,a)=>{a.a(e,async(e,r)=>{try{a.d(t,{p:()=>l});var n=a(9198),s=a(6414),o=e([n,s]);[n,s]=o.then?(await o)():o;let l=(0,n.createAsyncThunk)("users/userLogin",async({email:e,password:t},a)=>{try{return await s.p(e,t)}catch(e){return a.rejectWithValue("Failed to login user")}});r()}catch(e){r(e)}})},6414:(e,t,a)=>{a.a(e,async(e,r)=>{try{a.d(t,{p:()=>o});var n=a(1428),s=e([n]);n=(s.then?(await s)():s)[0];let o=async(e,t)=>(await n.default.post("/api/auth/user/login",{email:e,password:t},{headers:{"Content-Type":"application/json"}})).data;r()}catch(e){r(e)}})},1974:(e,t,a)=>{a.a(e,async(e,r)=>{try{a.d(t,{Ay:()=>f});var n=a(9198),s=a(8763),o=e([n,s]);[n,s]=o.then?(await o)():o;let l=(0,n.createSlice)({name:"user",initialState:{user:null,loading:!1,error:null},reducers:{},extraReducers:e=>{e.addCase(s.p.pending,e=>{e.loading=!0,e.error=null}).addCase(s.p.fulfilled,(e,t)=>{e.loading=!1,e.user=t.payload}).addCase(s.p.rejected,(e,t)=>{e.loading=!1,e.error=t.payload})}}),i=(0,n.combineReducers)({user:l.reducer}),{loginRequest:d,loginSuccess:c,loginFailure:u,logout:p}=l.actions,f=i;r()}catch(e){r(e)}})},3538:(e,t,a)=>{a.a(e,async(e,r)=>{try{a.r(t),a.d(t,{default:()=>d});var n=a(8732),s=a(4062),o=a(9658),l=a(2644),i=e([s,o]);[s,o]=i.then?(await i)():i;let d=function({Component:e,pageProps:t}){return(0,n.jsx)(s.Provider,{store:o.M,children:(0,n.jsx)(l.z,{children:(0,n.jsx)(e,{...t})})})};r()}catch(e){r(e)}})},7556:(e,t,a)=>{a.r(t),a.d(t,{default:()=>l});var r=a(8732),n=a(883),s=a.n(n);class o extends s(){render(){return(0,r.jsxs)(n.Html,{children:[(0,r.jsxs)(n.Head,{children:[(0,r.jsx)("link",{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=ubuntu:wght@700;800&family=Libre+Franklin:wght@900&display=swap"}),(0,r.jsx)("link",{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Sour+Gummy:ital,wght@0,100..900;1,100..900&display=swap"}),(0,r.jsx)("link",{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"}),(0,r.jsx)("link",{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@600;700;800;900&family=Ubuntu:wght@700&display=swap"}),(0,r.jsx)("link",{rel:"stylesheet",href:"https://fonts.googleapis.com/css?family=Nunito:400,700&display=swap"})]}),(0,r.jsxs)("body",{children:[(0,r.jsx)(n.Main,{}),(0,r.jsx)(n.NextScript,{})]})]})}}let l=o},9455:(e,t)=>{Object.defineProperty(t,"A",{enumerable:!0,get:function(){return a}});var a=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},9811:(e,t,a)=>{e.exports=a(3865).vendored.contexts.AmpContext},9241:(e,t,a)=>{e.exports=a(3865).vendored.contexts.HeadManagerContext},361:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},2015:e=>{e.exports=require("react")},8732:e=>{e.exports=require("react/jsx-runtime")},3873:e=>{e.exports=require("path")},9198:e=>{e.exports=import("@reduxjs/toolkit")},1428:e=>{e.exports=import("axios")},4062:e=>{e.exports=import("react-redux")},4588:(e,t)=>{function a(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(a=function(e){return e?r:t})(e)}t._=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=a(t);if(r&&r.has(e))return r.get(e);var n={__proto__:null},s=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var l=s?Object.getOwnPropertyDescriptor(e,o):null;l&&(l.get||l.set)?Object.defineProperty(n,o,l):n[o]=e[o]}return n.default=e,r&&r.set(e,n),n}}};var t=require("../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),r=t.X(0,[883],()=>a(4129));module.exports=r})();