import{s as ne,r as se,f as C,g as W,h as B,d as b,j as N,W as g,i as P,w as re,x as le,y as ae,G as V,A as j,a as K,c as L,k as M,v as w,B as p,Z as q,N as ie,T as ue,z as ce}from"./scheduler.a4eb8230.js";import{S as fe,i as me,a as k,t as E,b as D,d as F,m as G,g as _e,c as de,e as Z}from"./index.c4a4c7bc.js";import{z as Q,t as R,a as he}from"./Call.df60cc05.js";import{I as H}from"./Icon.81142d8e.js";const ge=t=>({}),X=t=>({zoomIn:t[12],zoomOut:t[13],fitView:t[14],lock:t[15],unhideAll:t[11]});function Y(t){let e,n,i,f,u;return n=new H({props:{icon:"visibility_off"}}),{c(){e=C("button"),D(n.$$.fragment),this.h()},l(o){e=W(o,"BUTTON",{class:!0});var s=B(e);F(n.$$.fragment,s),s.forEach(b),this.h()},h(){N(e,"class","unhide svelte-10dric6")},m(o,s){P(o,e,s),G(n,e,null),i=!0,f||(u=p(e,"mousedown",q(t[11])),f=!0)},p:ce,i(o){i||(k(n.$$.fragment,o),i=!0)},o(o){E(n.$$.fragment,o),i=!1},d(o){o&&b(e),Z(n),f=!1,u()}}}function be(t){let e,n,i,f,u,o,s,I,_,m,O,d,h,v,z,S,l=t[5].size>0&&Y(t);return f=new H({props:{icon:"zoom_in"}}),s=new H({props:{icon:"zoom_out"}}),m=new H({props:{icon:"filter_center_focus"}}),h=new H({props:{icon:t[4]?"lock_open":"lock"}}),{c(){e=C("div"),l&&l.c(),n=K(),i=C("button"),D(f.$$.fragment),u=K(),o=C("button"),D(s.$$.fragment),I=K(),_=C("button"),D(m.$$.fragment),O=K(),d=C("button"),D(h.$$.fragment),this.h()},l(r){e=W(r,"DIV",{class:!0});var c=B(e);l&&l.l(c),n=L(c),i=W(c,"BUTTON",{class:!0});var T=B(i);F(f.$$.fragment,T),T.forEach(b),u=L(c),o=W(c,"BUTTON",{class:!0});var A=B(o);F(s.$$.fragment,A),A.forEach(b),I=L(c),_=W(c,"BUTTON",{class:!0});var U=B(_);F(m.$$.fragment,U),U.forEach(b),O=L(c),d=W(c,"BUTTON",{class:!0});var J=B(d);F(h.$$.fragment,J),J.forEach(b),c.forEach(b),this.h()},h(){N(i,"class","zoom-in svelte-10dric6"),N(o,"class","zoom-out svelte-10dric6"),N(_,"class","reset svelte-10dric6"),N(d,"class","lock svelte-10dric6"),N(e,"class","controls-wrapper svelte-10dric6"),g(e,"horizontal",t[0]),M(e,"--prop-controls-background-color",t[1]),M(e,"--prop-controls-text-color",t[2])},m(r,c){P(r,e,c),l&&l.m(e,null),w(e,n),w(e,i),G(f,i,null),w(e,u),w(e,o),G(s,o,null),w(e,I),w(e,_),G(m,_,null),w(e,O),w(e,d),G(h,d,null),v=!0,z||(S=[p(i,"mousedown",q(t[12])),p(i,"touchstart",t[12],{passive:!0}),p(o,"mousedown",q(t[13])),p(o,"touchstart",t[13],{passive:!0}),p(_,"mousedown",q(t[14])),p(_,"touchstart",t[14],{passive:!0}),p(d,"mousedown",q(t[15])),p(d,"touchstart",t[15],{passive:!0})],z=!0)},p(r,c){r[5].size>0?l?(l.p(r,c),c&32&&k(l,1)):(l=Y(r),l.c(),k(l,1),l.m(e,n)):l&&(_e(),E(l,1,1,()=>{l=null}),de());const T={};c&16&&(T.icon=r[4]?"lock_open":"lock"),h.$set(T),(!v||c&1)&&g(e,"horizontal",r[0]),c&2&&M(e,"--prop-controls-background-color",r[1]),c&4&&M(e,"--prop-controls-text-color",r[2])},i(r){v||(k(l),k(f.$$.fragment,r),k(s.$$.fragment,r),k(m.$$.fragment,r),k(h.$$.fragment,r),v=!0)},o(r){E(l),E(f.$$.fragment,r),E(s.$$.fragment,r),E(m.$$.fragment,r),E(h.$$.fragment,r),v=!1},d(r){r&&b(e),l&&l.d(),Z(f),Z(s),Z(m),Z(h),z=!1,ie(S)}}}function pe(t){let e,n;const i=t[18].default,f=se(i,t,t[17],X),u=f||be(t);return{c(){e=C("nav"),u&&u.c(),this.h()},l(o){e=W(o,"NAV",{class:!0,"aria-label":!0});var s=B(e);u&&u.l(s),s.forEach(b),this.h()},h(){N(e,"class","graph-controls svelte-10dric6"),N(e,"aria-label","navigation"),g(e,"SW",t[3]==="SW"),g(e,"NE",t[3]==="NE"),g(e,"SE",t[3]==="SE"),g(e,"NW",t[3]==="NW")},m(o,s){P(o,e,s),u&&u.m(e,null),n=!0},p(o,[s]){f?f.p&&(!n||s&131072)&&re(f,i,o,o[17],n?ae(i,o[17],s,ge):le(o[17]),X):u&&u.p&&(!n||s&55)&&u.p(o,n?s:-1),(!n||s&8)&&g(e,"SW",o[3]==="SW"),(!n||s&8)&&g(e,"NE",o[3]==="NE"),(!n||s&8)&&g(e,"SE",o[3]==="SE"),(!n||s&8)&&g(e,"NW",o[3]==="NW")},i(o){n||(k(u,o),n=!0)},o(o){E(u,o),n=!1},d(o){o&&b(e),u&&u.d(o)}}}function ke(t,e,n){let i,f,u,o,s,{$$slots:I={},$$scope:_}=e,{increment:m=.1}=e,{horizontal:O=!1}=e,{bgColor:d=null}=e,{iconColor:h=null}=e,{corner:v="SW"}=e;const z=V("transforms"),S=V("dimensions");j(t,S,a=>n(20,u=a));const l=V("locked");j(t,l,a=>n(4,i=a));const r=V("groups");j(t,r,a=>n(21,o=a));const c=V("bounds"),{translation:T}=z,A=o.hidden.nodes;j(t,A,a=>n(5,s=a));const U=c.nodeBounds;j(t,U,a=>n(19,f=a));function J(){A.set(new Set)}function y(){Q(-1,S,z,m)}function $(){Q(1,S,z,m)}function x(){R.set(!0);const{x:a,y:oe,scale:te}=he(u,f);T.set({x:a||0,y:oe||0}),z.scale.set(te||1),R.set(!1)}function ee(){ue(l,i=!i,i)}return t.$$set=a=>{"increment"in a&&n(16,m=a.increment),"horizontal"in a&&n(0,O=a.horizontal),"bgColor"in a&&n(1,d=a.bgColor),"iconColor"in a&&n(2,h=a.iconColor),"corner"in a&&n(3,v=a.corner),"$$scope"in a&&n(17,_=a.$$scope)},[O,d,h,v,i,s,S,l,r,A,U,J,y,$,x,ee,m,_,I]}class Ne extends fe{constructor(e){super(),me(this,e,ke,pe,ne,{increment:16,horizontal:0,bgColor:1,iconColor:2,corner:3})}}export{Ne as default};
