import{d as u,u as _,r as f,c as i,o as m,b as o,e as l,F as p,g as w,k as B,l as M,t as b,h as n,_ as h}from"./index-CQyfpWoR.js";import{M as k}from"./MovieRow-FkeBdPtz.js";const G={class:"browse-view"},y={class:"genre-filter"},C=["onClick"],V={class:"browse-content"},A=u({__name:"BrowseView",setup(S){const e=_(),r=f("All"),c=i(()=>["All",...e.allGenres]),v=i(()=>e.filteredMovies);m(()=>{e.filterMoviesByGenre("All")});const d=t=>{r.value=t,e.filterMoviesByGenre(t)};return(t,a)=>(n(),o("div",G,[a[0]||(a[0]=l("h1",{class:"title"},"Browse Movies & TV Shows",-1)),l("div",y,[(n(!0),o(p,null,w(c.value,s=>(n(),o("button",{key:s,onClick:x=>d(s),class:M([{active:r.value===s},"genre-button"])},b(s),11,C))),128))]),l("div",V,[B(k,{title:"All Content",movies:v.value},null,8,["movies"])])]))}}),g=h(A,[["__scopeId","data-v-bfc39a3c"]]);export{g as default};
