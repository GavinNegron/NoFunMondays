(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3744],{12254:(e,s,t)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/posts/recent-posts",function(){return t(10836)}])},32410:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>r});var l=t(74848);t(96540);var c=t(95093),a=t.n(c),d=t(91106),n=t.n(d);let r=function(e){let{post:s}=e;if(!s)return null;let t=s.imageUrl||"/img/placeholder.png",c=s.slug||"#",d=s.title||"Untitled",r=s.description||"No description available.",i=s.createdAt||new Date;return(0,l.jsxs)("div",{className:"post-card d-flex col-md-12 flex-md-row col-lg-5 flex-lg-column",children:[(0,l.jsx)("div",{className:"post-card__left d-flex",children:(0,l.jsx)("div",{className:"post-card__img",children:(0,l.jsx)(n(),{style:{backgroundImage:"url(".concat(t,")")},href:"/blog/".concat(c),"aria-label":" ".concat(d," ")})})}),(0,l.jsx)("div",{className:"post-card__right d-flex",children:(0,l.jsxs)("div",{className:"post-card__content",children:[(0,l.jsx)("div",{className:"post-card__title",children:(0,l.jsx)(n(),{href:"/blog/".concat(c),children:d})}),(0,l.jsx)("div",{className:"post-card__description",children:(0,l.jsx)("p",{children:r})}),(0,l.jsx)("div",{className:"post-card__date",children:(0,l.jsx)("p",{children:a()(i).format("MM/DD/YYYY")})})]})})]})}},10836:(e,s,t)=>{"use strict";t.r(s),t.d(s,{__N_SSP:()=>r,default:()=>i});var l=t(74848),c=t(96540),a=t(71468),d=t(2950),n=t(32410),r=!0;let i=function(e){let{initialPosts:s,initialLoading:t}=e,r=(0,a.wA)(),{posts:i=[],isLoading:o}=(0,a.d4)(e=>e.posts.fetchPosts),[_,h]=(0,c.useState)(6);return(0,c.useEffect)(()=>{(s||0!==i.length)&&6===_||r((0,d.y)({limit:_,excludeFeatured:!0}))},[r,_,s,i.length]),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("div",{className:"recent-posts",children:[(0,l.jsx)("div",{className:"recent-posts__header",children:(0,l.jsx)("p",{children:"Recent Blog Posts"})}),(0,l.jsx)("div",{className:"recent-posts__inner",children:null==i?void 0:i.map(e=>(0,l.jsx)(n.default,{post:e},e._id))})]}),(0,l.jsx)("div",{className:"recent-posts__load",children:(0,l.jsx)("button",{className:"fortnite-btn",onClick:()=>{h(e=>e+4)},disabled:o||t,children:"Load More Posts"})})]})}}},e=>{var s=s=>e(e.s=s);e.O(0,[3197,1106,636,6593,8792],()=>s(12254)),_N_E=e.O()}]);