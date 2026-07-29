const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./MissionEditor-Cq3M8U0V.js","./cm6-theme-N_3ganX4.js","./SandboxView-BYv17b4_.js","./WelcomeView-rHuMeyvI.js","./markdown-Dc3x4hVq.js","./BriefingView-DP76CzUv.js","./LoreView-m2zVNmWh.js","./ReferenceOverlay-7YW3Y83E.js"])))=>i.map(i=>d[i]);
(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}})();var _e,T,xn,B,rn,Hn,Fn,ke,fe,ie,Gn,We,xe,He,ye={},Ae=[],st=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,ae=Array.isArray;function H(e,n){for(var t in n)e[t]=n[t];return e}function Ye(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function Se(e,n,t){var i,o,r,a={};for(r in n)r=="key"?i=n[r]:r=="ref"?o=n[r]:a[r]=n[r];if(arguments.length>2&&(a.children=arguments.length>3?_e.call(arguments,2):t),typeof e=="function"&&e.defaultProps!=null)for(r in e.defaultProps)a[r]===void 0&&(a[r]=e.defaultProps[r]);return Ee(e,a,i,o,null)}function Ee(e,n,t,i,o){var r={type:e,props:n,key:t,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:o==null?++xn:o,__i:-1,__u:0};return o==null&&T.vnode!=null&&T.vnode(r),r}function K(e){return e.children}function F(e,n){this.props=e,this.context=n}function $(e,n){if(n==null)return e.__?$(e.__,e.__i+1):null;for(var t;n<e.__k.length;n++)if((t=e.__k[n])!=null&&t.__e!=null)return t.__e;return typeof e.type=="function"?$(e):null}function ct(e){if(e.__P&&e.__d){var n=e.__v,t=n.__e,i=[],o=[],r=H({},n);r.__v=n.__v+1,T.vnode&&T.vnode(r),qe(e.__P,r,n,e.__n,e.__P.namespaceURI,32&n.__u?[t]:null,i,t==null?$(n):t,!!(32&n.__u),o),r.__v=n.__v,r.__.__k[r.__i]=r,Kn(i,r,o),n.__e=n.__=null,r.__e!=t&&Un(r)}}function Un(e){if((e=e.__)!=null&&e.__c!=null)return e.__e=e.__c.base=null,e.__k.some(function(n){if(n!=null&&n.__e!=null)return e.__e=e.__c.base=n.__e}),Un(e)}function an(e){(!e.__d&&(e.__d=!0)&&B.push(e)&&!Oe.__r++||rn!=T.debounceRendering)&&((rn=T.debounceRendering)||Hn)(Oe)}function Oe(){try{for(var e,n=1;B.length;)B.length>n&&B.sort(Fn),e=B.shift(),n=B.length,ct(e)}finally{B.length=Oe.__r=0}}function Vn(e,n,t,i,o,r,a,s,u,c,h){var l,R,m,I,A,E,f,g=i&&i.__k||Ae,v=n.length;for(u=lt(t,n,g,u,v),l=0;l<v;l++)(m=t.__k[l])!=null&&(R=m.__i!=-1&&g[m.__i]||ye,m.__i=l,E=qe(e,m,R,o,r,a,s,u,c,h),I=m.__e,m.ref&&R.ref!=m.ref&&(R.ref&&Xe(R.ref,null,m),h.push(m.ref,m.__c||I,m)),A==null&&I!=null&&(A=I),(f=!!(4&m.__u))||R.__k===m.__k?(u=Bn(m,u,e,f),f&&R.__e&&(R.__e=null)):typeof m.type=="function"&&E!==void 0?u=E:I&&(u=I.nextSibling),m.__u&=-7);return t.__e=A,u}function lt(e,n,t,i,o){var r,a,s,u,c,h=t.length,l=h,R=0;for(e.__k=new Array(o),r=0;r<o;r++)(a=n[r])!=null&&typeof a!="boolean"&&typeof a!="function"?(typeof a=="string"||typeof a=="number"||typeof a=="bigint"||a.constructor==String?a=e.__k[r]=Ee(null,a,null,null,null):ae(a)?a=e.__k[r]=Ee(K,{children:a},null,null,null):a.constructor===void 0&&a.__b>0?a=e.__k[r]=Ee(a.type,a.props,a.key,a.ref?a.ref:null,a.__v):e.__k[r]=a,u=r+R,a.__=e,a.__b=e.__b+1,s=null,(c=a.__i=dt(a,t,u,l))!=-1&&(l--,(s=t[c])&&(s.__u|=2)),s==null||s.__v==null?(c==-1&&(o>h?R--:o<h&&R++),typeof a.type!="function"&&(a.__u|=4)):c!=u&&(c==u-1?R--:c==u+1?R++:(c>u?R--:R++,a.__u|=4))):e.__k[r]=null;if(l)for(r=0;r<h;r++)(s=t[r])!=null&&!(2&s.__u)&&(s.__e==i&&(i=$(s)),Yn(s,s));return i}function Bn(e,n,t,i){var o,r;if(typeof e.type=="function"){for(o=e.__k,r=0;o&&r<o.length;r++)o[r]&&(o[r].__=e,n=Bn(o[r],n,t,i));return n}e.__e!=n&&(i&&(n&&e.type&&!n.parentNode&&(n=$(e)),t.insertBefore(e.__e,n||null)),n=e.__e);do n=n&&n.nextSibling;while(n!=null&&n.nodeType==8);return n}function Ne(e,n){return n=n||[],e==null||typeof e=="boolean"||(ae(e)?e.some(function(t){Ne(t,n)}):n.push(e)),n}function dt(e,n,t,i){var o,r,a,s=e.key,u=e.type,c=n[t],h=c!=null&&(2&c.__u)==0;if(c===null&&s==null||h&&s==c.key&&u==c.type)return t;if(i>(h?1:0)){for(o=t-1,r=t+1;o>=0||r<n.length;)if((c=n[a=o>=0?o--:r++])!=null&&!(2&c.__u)&&s==c.key&&u==c.type)return a}return-1}function sn(e,n,t){n[0]=="-"?e.setProperty(n,t==null?"":t):e[n]=t==null?"":typeof t!="number"||st.test(n)?t:t+"px"}function de(e,n,t,i,o){var r,a;e:if(n=="style")if(typeof t=="string")e.style.cssText=t;else{if(typeof i=="string"&&(e.style.cssText=i=""),i)for(n in i)t&&n in t||sn(e.style,n,"");if(t)for(n in t)i&&t[n]==i[n]||sn(e.style,n,t[n])}else if(n[0]=="o"&&n[1]=="n")r=n!=(n=n.replace(Gn,"$1")),a=n.toLowerCase(),n=a in e||n=="onFocusOut"||n=="onFocusIn"?a.slice(2):n.slice(2),e.l||(e.l={}),e.l[n+r]=t,t?i?t[ie]=i[ie]:(t[ie]=We,e.addEventListener(n,r?He:xe,r)):e.removeEventListener(n,r?He:xe,r);else{if(o=="http://www.w3.org/2000/svg")n=n.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(n!="width"&&n!="height"&&n!="href"&&n!="list"&&n!="form"&&n!="tabIndex"&&n!="download"&&n!="rowSpan"&&n!="colSpan"&&n!="role"&&n!="popover"&&n in e)try{e[n]=t==null?"":t;break e}catch(s){}typeof t=="function"||(t==null||t===!1&&n[4]!="-"?e.removeAttribute(n):e.setAttribute(n,n=="popover"&&t==1?"":t))}}function cn(e){return function(n){if(this.l){var t=this.l[n.type+e];if(n[fe]==null)n[fe]=We++;else if(n[fe]<t[ie])return;return t(T.event?T.event(n):n)}}}function qe(e,n,t,i,o,r,a,s,u,c){var h,l,R,m,I,A,E,f,g,v,w,L,se,z,Z,b=n.type;if(n.constructor!==void 0)return null;128&t.__u&&(u=!!(32&t.__u),r=[s=n.__e=t.__e]),(h=T.__b)&&h(n);e:if(typeof b=="function")try{if(f=n.props,g=b.prototype&&b.prototype.render,v=(h=b.contextType)&&i[h.__c],w=h?v?v.props.value:h.__:i,t.__c?E=(l=n.__c=t.__c).__=l.__E:(g?n.__c=l=new b(f,w):(n.__c=l=new F(f,w),l.constructor=b,l.render=ht),v&&v.sub(l),l.state||(l.state={}),l.__n=i,R=l.__d=!0,l.__h=[],l._sb=[]),g&&l.__s==null&&(l.__s=l.state),g&&b.getDerivedStateFromProps!=null&&(l.__s==l.state&&(l.__s=H({},l.__s)),H(l.__s,b.getDerivedStateFromProps(f,l.__s))),m=l.props,I=l.state,l.__v=n,R)g&&b.getDerivedStateFromProps==null&&l.componentWillMount!=null&&l.componentWillMount(),g&&l.componentDidMount!=null&&l.__h.push(l.componentDidMount);else{if(g&&b.getDerivedStateFromProps==null&&f!==m&&l.componentWillReceiveProps!=null&&l.componentWillReceiveProps(f,w),n.__v==t.__v||!l.__e&&l.shouldComponentUpdate!=null&&l.shouldComponentUpdate(f,l.__s,w)===!1){n.__v!=t.__v&&(l.props=f,l.state=l.__s,l.__d=!1),n.__e=t.__e,n.__k=t.__k,n.__k.some(function(G){G&&(G.__=n)}),Ae.push.apply(l.__h,l._sb),l._sb=[],l.__h.length&&a.push(l);break e}l.componentWillUpdate!=null&&l.componentWillUpdate(f,l.__s,w),g&&l.componentDidUpdate!=null&&l.__h.push(function(){l.componentDidUpdate(m,I,A)})}if(l.context=w,l.props=f,l.__P=e,l.__e=!1,L=T.__r,se=0,g)l.state=l.__s,l.__d=!1,L&&L(n),h=l.render(l.props,l.state,l.context),Ae.push.apply(l.__h,l._sb),l._sb=[];else do l.__d=!1,L&&L(n),h=l.render(l.props,l.state,l.context),l.state=l.__s;while(l.__d&&++se<25);l.state=l.__s,l.getChildContext!=null&&(i=H(H({},i),l.getChildContext())),g&&!R&&l.getSnapshotBeforeUpdate!=null&&(A=l.getSnapshotBeforeUpdate(m,I)),z=h!=null&&h.type===K&&h.key==null?Wn(h.props.children):h,s=Vn(e,ae(z)?z:[z],n,t,i,o,r,a,s,u,c),l.base=n.__e,n.__u&=-161,l.__h.length&&a.push(l),E&&(l.__E=l.__=null)}catch(G){if(n.__v=null,u||r!=null)if(G.then){for(n.__u|=u?160:128;s&&s.nodeType==8&&s.nextSibling;)s=s.nextSibling;r[r.indexOf(s)]=null,n.__e=s}else{for(Z=r.length;Z--;)Ye(r[Z]);Fe(n)}else n.__e=t.__e,n.__k=t.__k,G.then||Fe(n);T.__e(G,n,t)}else r==null&&n.__v==t.__v?(n.__k=t.__k,n.__e=t.__e):s=n.__e=ut(t.__e,n,t,i,o,r,a,u,c);return(h=T.diffed)&&h(n),128&n.__u?void 0:s}function Fe(e){e&&(e.__c&&(e.__c.__e=!0),e.__k&&e.__k.some(Fe))}function Kn(e,n,t){for(var i=0;i<t.length;i++)Xe(t[i],t[++i],t[++i]);T.__c&&T.__c(n,e),e.some(function(o){try{e=o.__h,o.__h=[],e.some(function(r){r.call(o)})}catch(r){T.__e(r,o.__v)}})}function Wn(e){return typeof e!="object"||e==null||e.__b>0?e:ae(e)?e.map(Wn):e.constructor!==void 0?null:H({},e)}function ut(e,n,t,i,o,r,a,s,u){var c,h,l,R,m,I,A,E=t.props||ye,f=n.props,g=n.type;if(g=="svg"?o="http://www.w3.org/2000/svg":g=="math"?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),r!=null){for(c=0;c<r.length;c++)if((m=r[c])&&"setAttribute"in m==!!g&&(g?m.localName==g:m.nodeType==3)){e=m,r[c]=null;break}}if(e==null){if(g==null)return document.createTextNode(f);e=document.createElementNS(o,g,f.is&&f),s&&(T.__m&&T.__m(n,r),s=!1),r=null}if(g==null)E===f||s&&e.data==f||(e.data=f);else{if(r=g=="textarea"&&f.defaultValue!=null?null:r&&_e.call(e.childNodes),!s&&r!=null)for(E={},c=0;c<e.attributes.length;c++)E[(m=e.attributes[c]).name]=m.value;for(c in E)m=E[c],c=="dangerouslySetInnerHTML"?l=m:c=="children"||c in f||c=="value"&&"defaultValue"in f||c=="checked"&&"defaultChecked"in f||de(e,c,null,m,o);for(c in f)m=f[c],c=="children"?R=m:c=="dangerouslySetInnerHTML"?h=m:c=="value"?I=m:c=="checked"?A=m:s&&typeof m!="function"||E[c]===m||de(e,c,m,E[c],o);if(h)s||l&&(h.__html==l.__html||h.__html==e.innerHTML)||(e.innerHTML=h.__html),n.__k=[];else if(l&&(e.innerHTML=""),Vn(n.type=="template"?e.content:e,ae(R)?R:[R],n,t,i,g=="foreignObject"?"http://www.w3.org/1999/xhtml":o,r,a,r?r[0]:t.__k&&$(t,0),s,u),r!=null)for(c=r.length;c--;)Ye(r[c]);s&&g!="textarea"||(c="value",g=="progress"&&I==null?e.removeAttribute("value"):I!=null&&(I!==e[c]||g=="progress"&&!I||g=="option"&&I!=E[c])&&de(e,c,I,E[c],o),c="checked",A!=null&&A!=e[c]&&de(e,c,A,E[c],o))}return e}function Xe(e,n,t){try{if(typeof e=="function"){var i=typeof e.__u=="function";i&&e.__u(),i&&n==null||(e.__u=e(n))}else e.current=n}catch(o){T.__e(o,t)}}function Yn(e,n,t){var i,o;if(T.unmount&&T.unmount(e),(i=e.ref)&&(i.current&&i.current!=e.__e||Xe(i,null,n)),(i=e.__c)!=null){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(r){T.__e(r,n)}i.base=i.__P=null}if(i=e.__k)for(o=0;o<i.length;o++)i[o]&&Yn(i[o],n,t||typeof e.type!="function");t||Ye(e.__e),e.__c=e.__=e.__e=void 0}function ht(e,n,t){return this.constructor(e,t)}function mt(e,n,t){var i,o,r,a;n==document&&(n=document.documentElement),T.__&&T.__(e,n),o=(i=!1)?null:n.__k,r=[],a=[],qe(n,e=n.__k=Se(K,null,[e]),o||ye,ye,n.namespaceURI,o?null:n.firstChild?_e.call(n.childNodes):null,r,o?o.__e:n.firstChild,i,a),Kn(r,e,a)}_e=Ae.slice,T={__e:function(e,n,t,i){for(var o,r,a;n=n.__;)if((o=n.__c)&&!o.__)try{if((r=o.constructor)&&r.getDerivedStateFromError!=null&&(o.setState(r.getDerivedStateFromError(e)),a=o.__d),o.componentDidCatch!=null&&(o.componentDidCatch(e,i||{}),a=o.__d),a)return o.__E=o}catch(s){e=s}throw e}},xn=0,F.prototype.setState=function(e,n){var t;t=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=H({},this.state),typeof e=="function"&&(e=e(H({},t),this.props)),e&&H(t,e),e!=null&&this.__v&&(n&&this._sb.push(n),an(this))},F.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),an(this))},F.prototype.render=K,B=[],Hn=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Fn=function(e,n){return e.__v.__b-n.__v.__b},Oe.__r=0,ke=Math.random().toString(8),fe="__d"+ke,ie="__a"+ke,Gn=/(PointerCapture)$|Capture$/i,We=0,xe=cn(!1),He=cn(!0);var pt=0;function d(e,n,t,i,o,r){n||(n={});var a,s,u=n;if("ref"in u)for(s in u={},n)s=="ref"?a=n[s]:u[s]=n[s];var c={type:e,props:u,key:t,ref:a,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--pt,__i:-1,__u:0,__source:o,__self:r};if(typeof e=="function"&&(a=e.defaultProps))for(s in a)u[s]===void 0&&(u[s]=a[s]);return T.vnode&&T.vnode(c),c}const Rt="modulepreload",ft=function(e,n){return new URL(e,n).href},ln={},X=function(n,t,i){let o=Promise.resolve();if(t&&t.length>0){const a=document.getElementsByTagName("link"),s=document.querySelector("meta[property=csp-nonce]"),u=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));o=Promise.allSettled(t.map(c=>{if(c=ft(c,i),c in ln)return;ln[c]=!0;const h=c.endsWith(".css"),l=h?'[rel="stylesheet"]':"";if(!!i)for(let I=a.length-1;I>=0;I--){const A=a[I];if(A.href===c&&(!h||A.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${l}`))return;const m=document.createElement("link");if(m.rel=h?"stylesheet":Rt,h||(m.as="script"),m.crossOrigin="",m.href=c,u&&m.setAttribute("nonce",u),document.head.appendChild(m),h)return new Promise((I,A)=>{m.addEventListener("load",I),m.addEventListener("error",()=>A(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(a){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=a,window.dispatchEvent(s),!s.defaultPrevented)throw a}return o.then(a=>{for(const s of a||[])s.status==="rejected"&&r(s.reason);return n().catch(r)})};var re,N,Pe,dn,Ce=0,qn=[],C=T,un=C.__b,hn=C.__r,mn=C.diffed,pn=C.__c,Rn=C.unmount,fn=C.__;function je(e,n){C.__h&&C.__h(N,e,Ce||n),Ce=0;var t=N.__H||(N.__H={__:[],__h:[]});return e>=t.__.length&&t.__.push({}),t.__[e]}function U(e){return Ce=1,Et(jn,e)}function Et(e,n,t){var i=je(re++,2);if(i.t=e,!i.__c&&(i.__=[t?t(n):jn(void 0,n),function(s){var u=i.__N?i.__N[0]:i.__[0],c=i.t(u,s);u!==c&&(i.__N=[c,i.__[1]],i.__c.setState({}))}],i.__c=N,!N.__f)){var o=function(s,u,c){if(!i.__c.__H)return!0;var h=i.__c.__H.__.filter(function(R){return R.__c});if(h.every(function(R){return!R.__N}))return!r||r.call(this,s,u,c);var l=i.__c.props!==s;return h.some(function(R){if(R.__N){var m=R.__[0];R.__=R.__N,R.__N=void 0,m!==R.__[0]&&(l=!0)}}),r&&r.call(this,s,u,c)||l};N.__f=!0;var r=N.shouldComponentUpdate,a=N.componentWillUpdate;N.componentWillUpdate=function(s,u,c){if(this.__e){var h=r;r=void 0,o(s,u,c),r=h}a&&a.call(this,s,u,c)},N.shouldComponentUpdate=o}return i.__N||i.__}function ge(e,n){var t=je(re++,3);!C.__s&&Xn(t.__H,n)&&(t.__=e,t.u=n,N.__H.__h.push(t))}function gt(e){return Ce=5,Tt(function(){return{current:e}},[])}function Tt(e,n){var t=je(re++,7);return Xn(t.__H,n)&&(t.__=e(),t.__H=n,t.__h=e),t.__}function It(){for(var e;e=qn.shift();){var n=e.__H;if(e.__P&&n)try{n.__h.some(Te),n.__h.some(Ge),n.__h=[]}catch(t){n.__h=[],C.__e(t,e.__v)}}}C.__b=function(e){N=null,un&&un(e)},C.__=function(e,n){e&&n.__k&&n.__k.__m&&(e.__m=n.__k.__m),fn&&fn(e,n)},C.__r=function(e){hn&&hn(e),re=0;var n=(N=e.__c).__H;n&&(Pe===N?(n.__h=[],N.__h=[],n.__.some(function(t){t.__N&&(t.__=t.__N),t.u=t.__N=void 0})):(n.__h.some(Te),n.__h.some(Ge),n.__h=[],re=0)),Pe=N},C.diffed=function(e){mn&&mn(e);var n=e.__c;n&&n.__H&&(n.__H.__h.length&&(qn.push(n)!==1&&dn===C.requestAnimationFrame||((dn=C.requestAnimationFrame)||yt)(It)),n.__H.__.some(function(t){t.u&&(t.__H=t.u),t.u=void 0})),Pe=N=null},C.__c=function(e,n){n.some(function(t){try{t.__h.some(Te),t.__h=t.__h.filter(function(i){return!i.__||Ge(i)})}catch(i){n.some(function(o){o.__h&&(o.__h=[])}),n=[],C.__e(i,t.__v)}}),pn&&pn(e,n)},C.unmount=function(e){Rn&&Rn(e);var n,t=e.__c;t&&t.__H&&(t.__H.__.some(function(i){try{Te(i)}catch(o){n=o}}),t.__H=void 0,n&&C.__e(n,t.__v))};var En=typeof requestAnimationFrame=="function";function yt(e){var n,t=function(){clearTimeout(i),En&&cancelAnimationFrame(n),setTimeout(e)},i=setTimeout(t,35);En&&(n=requestAnimationFrame(t))}function Te(e){var n=N,t=e.__c;typeof t=="function"&&(e.__c=void 0,t()),N=n}function Ge(e){var n=N;e.__c=e.__(),N=n}function Xn(e,n){return!e||e.length!==n.length||n.some(function(t,i){return t!==e[i]})}function jn(e,n){return typeof n=="function"?n(e):n}function At(e,n){for(var t in n)e[t]=n[t];return e}function gn(e,n){for(var t in e)if(t!=="__source"&&!(t in n))return!0;for(var i in n)if(i!=="__source"&&e[i]!==n[i])return!0;return!1}function Tn(e,n){this.props=e,this.context=n}(Tn.prototype=new F).isPureReactComponent=!0,Tn.prototype.shouldComponentUpdate=function(e,n){return gn(this.props,e)||gn(this.state,n)};var In=T.__b;T.__b=function(e){e.type&&e.type.__f&&e.ref&&(e.props.ref=e.ref,e.ref=null),In&&In(e)};var St=T.__e;T.__e=function(e,n,t,i){if(e.then){for(var o,r=n;r=r.__;)if((o=r.__c)&&o.__c)return n.__e==null&&(n.__e=t.__e,n.__k=t.__k),o.__c(e,n)}St(e,n,t,i)};var yn=T.unmount;function zn(e,n,t){return e&&(e.__c&&e.__c.__H&&(e.__c.__H.__.forEach(function(i){typeof i.__c=="function"&&i.__c()}),e.__c.__H=null),(e=At({},e)).__c!=null&&(e.__c.__P===t&&(e.__c.__P=n),e.__c.__e=!0,e.__c=null),e.__k=e.__k&&e.__k.map(function(i){return zn(i,n,t)})),e}function Zn(e,n,t){return e&&t&&(e.__v=null,e.__k=e.__k&&e.__k.map(function(i){return Zn(i,n,t)}),e.__c&&e.__c.__P===n&&(e.__e&&t.appendChild(e.__e),e.__c.__e=!0,e.__c.__P=t)),e}function M(){this.__u=0,this.o=null,this.__b=null}function Jn(e){var n=e.__&&e.__.__c;return n&&n.__a&&n.__a(e)}function j(e){var n,t,i,o=null;function r(a){if(n||(n=e()).then(function(s){s&&(o=s.default||s),i=!0},function(s){t=s,i=!0}),t)throw t;if(!i)throw n;return o?Se(o,a):null}return r.displayName="Lazy",r.__f=!0,r}function ue(){this.i=null,this.l=null}T.unmount=function(e){var n=e.__c;n&&(n.__z=!0),n&&n.__R&&n.__R(),n&&32&e.__u&&(e.type=null),yn&&yn(e)},(M.prototype=new F).__c=function(e,n){var t=n.__c,i=this;i.o==null&&(i.o=[]),i.o.push(t);var o=Jn(i.__v),r=!1,a=function(){r||i.__z||(r=!0,t.__R=null,o?o(u):u())};t.__R=a;var s=t.__P;t.__P=null;var u=function(){if(!--i.__u){if(i.state.__a){var c=i.state.__a;i.__v.__k[0]=Zn(c,c.__c.__P,c.__c.__O)}var h;for(i.setState({__a:i.__b=null});h=i.o.pop();)h.__P=s,h.forceUpdate()}};i.__u++||32&n.__u||i.setState({__a:i.__b=i.__v.__k[0]}),e.then(a,a)},M.prototype.componentWillUnmount=function(){this.o=[]},M.prototype.render=function(e,n){if(this.__b){if(this.__v.__k){var t=document.createElement("div"),i=this.__v.__k[0].__c;this.__v.__k[0]=zn(this.__b,t,i.__O=i.__P)}this.__b=null}var o=n.__a&&Se(K,null,e.fallback);return o&&(o.__u&=-33),[Se(K,null,n.__a?null:e.children),o]};var An=function(e,n,t){if(++t[1]===t[0]&&e.l.delete(n),e.props.revealOrder&&(e.props.revealOrder[0]!=="t"||!e.l.size))for(t=e.i;t;){for(;t.length>3;)t.pop()();if(t[1]<t[0])break;e.i=t=t[2]}};(ue.prototype=new F).__a=function(e){var n=this,t=Jn(n.__v),i=n.l.get(e);return i[0]++,function(o){var r=function(){n.props.revealOrder?(i.push(o),An(n,e,i)):o()};t?t(r):r()}},ue.prototype.render=function(e){this.i=null,this.l=new Map;var n=Ne(e.children);e.revealOrder&&e.revealOrder[0]==="b"&&n.reverse();for(var t=n.length;t--;)this.l.set(n[t],this.i=[1,0,this.i]);return e.children},ue.prototype.componentDidUpdate=ue.prototype.componentDidMount=function(){var e=this;this.l.forEach(function(n,t){An(e,t,n)})};var Ot=typeof Symbol!="undefined"&&Symbol.for&&Symbol.for("react.element")||60103,Nt=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,Ct=/^on(Ani|Tra|Tou|BeforeInp|Compo)/,wt=/[A-Z0-9]/g,vt=typeof document!="undefined",_t=function(e){return(typeof Symbol!="undefined"&&typeof Symbol()=="symbol"?/fil|che|rad/:/fil|che|ra/).test(e)};F.prototype.isReactComponent=!0,["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(e){Object.defineProperty(F.prototype,e,{configurable:!0,get:function(){return this["UNSAFE_"+e]},set:function(n){Object.defineProperty(this,e,{configurable:!0,writable:!0,value:n})}})});var Sn=T.event;T.event=function(e){return Sn&&(e=Sn(e)),e.persist=function(){},e.isPropagationStopped=function(){return this.cancelBubble},e.isDefaultPrevented=function(){return this.defaultPrevented},e.nativeEvent=e};var bt={configurable:!0,get:function(){return this.class}},On=T.vnode;T.vnode=function(e){typeof e.type=="string"&&function(n){var t=n.props,i=n.type,o={},r=i.indexOf("-")==-1;for(var a in t){var s=t[a];if(!(a==="value"&&"defaultValue"in t&&s==null||vt&&a==="children"&&i==="noscript"||a==="class"||a==="className")){var u=a.toLowerCase();a==="defaultValue"&&"value"in t&&t.value==null?a="value":a==="download"&&s===!0?s="":u==="translate"&&s==="no"?s=!1:u[0]==="o"&&u[1]==="n"?u==="ondoubleclick"?a="ondblclick":u!=="onchange"||i!=="input"&&i!=="textarea"||_t(t.type)?u==="onfocus"?a="onfocusin":u==="onblur"?a="onfocusout":Ct.test(a)&&(a=u):u=a="oninput":r&&Nt.test(a)?a=a.replace(wt,"-$&").toLowerCase():s===null&&(s=void 0),u==="oninput"&&o[a=u]&&(a="oninputCapture"),o[a]=s}}i=="select"&&(o.multiple&&Array.isArray(o.value)&&(o.value=Ne(t.children).forEach(function(c){c.props.selected=o.value.indexOf(c.props.value)!=-1})),o.defaultValue!=null&&(o.value=Ne(t.children).forEach(function(c){c.props.selected=o.multiple?o.defaultValue.indexOf(c.props.value)!=-1:o.defaultValue==c.props.value}))),t.class&&!t.className?(o.class=t.class,Object.defineProperty(o,"className",bt)):t.className&&(o.class=o.className=t.className),n.props=o}(e),e.$$typeof=Ot,On&&On(e)};var Nn=T.__r;T.__r=function(e){Nn&&Nn(e),e.__c};var Cn=T.diffed;T.diffed=function(e){Cn&&Cn(e);var n=e.props,t=e.__e;t!=null&&e.type==="textarea"&&"value"in n&&n.value!==t.value&&(t.value=n.value==null?"":n.value)};const Ue={missions:{},total_xp:0,streak_current:0,streak_last_date:"",sidebar_module_state:{mission:!0,cheatsheet:!1,progress:!1},unlocked:["M-01","M-02","M-03","M-04","KATA-01"],completed_missions:[],sandbox_bests:{easy:null,normal:null,hard:null},onboarded:!1,healedFrontmatters:{},ambient_enabled:!1,vimPrimerSeen:!1,railPin:null};function kt(e,n){if(e.trim()===n.trim())return{matches:!0,first_divergent_line:-1,lines_off:0};const t=e.trim().split(`
`),i=n.trim().split(`
`);let o=-1,r=0;const a=Math.max(t.length,i.length);for(let s=0;s<a;s++)t[s]!==i[s]&&(o===-1&&(o=s),r++);return{matches:!1,first_divergent_line:o,lines_off:r}}function li(e,n){if(e.trim()===n.trim())return[];const t=e.trim().split(`
`),i=n.trim().split(`
`),o=Math.max(t.length,i.length),r=[];for(let a=0;a<o;a++)t[a]!==i[a]&&r.push(a);return r}class Pt{static verify(n,t){return kt(n,t)}static isMissionPracticeFile(n){return(n==null?void 0:n.mission_type)==="practice"}static buildPracticeFrontmatter(n,t,i){return n.startsWith("---")?n:`---
mission_type: practice
mission_id: ${t}
locked: ${i}
---

${n}`}}const he=[{level:1,title:"SIGNAL LOST",xp_required:0,color:"#ff4444"},{level:2,title:"GHOST OPERATOR",xp_required:66,color:"#ffaa00"},{level:3,title:"DEEP COVER",xp_required:186,color:"#00aaff"},{level:4,title:"NEON WRAITH",xp_required:371,color:"#aa44ff"},{level:5,title:"CHROME RAVEN",xp_required:601,color:"#00ff41"},{level:6,title:"SIGNAL HUNTER",xp_required:800,color:"#00ccff"},{level:7,title:"PROTOCOL READER",xp_required:1150,color:"#ff6600"},{level:8,title:"PATTERN BREAKER",xp_required:1550,color:"#cc00ff"},{level:9,title:"CIPHER ANALYST",xp_required:2e3,color:"#ff0066"},{level:10,title:"SIGNAL ARCHITECT",xp_required:2500,color:"#ffffff"}],we={2:{missions:["M-05","M-06","M-07","M-08","KATA-02","KATA-03","KATA-12"],loot:["LOOT-01"]},3:{missions:["M-09","M-10","M-11","M-12","KATA-04","KATA-13"],loot:["LOOT-02"]},4:{missions:["M-13","M-14","M-15","KATA-05"],loot:["LOOT-03"]},5:{missions:["M-16","KATA-06","R-01","R-02","R-03","R-04"],loot:["LOOT-04"]},6:{missions:["R-05","R-06","R-07","R-08","KATA-07","KATA-14"],loot:["LOOT-05"]},7:{missions:["R-09","R-10","R-11","R-12","R-13","R-14","R-15","R-16","KATA-08","KATA-09"],loot:["LOOT-07"]},8:{missions:["R-17","R-18","R-19","R-20","KATA-10"],loot:["LOOT-08"]},9:{missions:["R-21","R-22","R-23","R-24","KATA-11"],loot:["LOOT-06"]},10:{missions:[],loot:["LOOT-09"]}};function Mt(e){for(const n of Object.keys(we).map(Number).sort((t,i)=>t-i)){const t=we[n];if(t.missions.includes(e)||t.loot.includes(e))return n}return null}class D{static getLevelForXp(n){let t=1;for(const i of he)n>=i.xp_required&&(t=i.level);return t}static addXp(n,t){var u;const i=this.getLevelForXp(n.total_xp),o=n.total_xp+t,r=this.getLevelForXp(o),a=[...n.unlocked];let s=null;if(r>i){const c=(u=we[r])!=null?u:{missions:[],loot:[]};for(const h of[...c.missions,...c.loot])a.includes(h)||a.push(h);s={old_level:i,new_level:r,unlocked_missions:c.missions,unlocked_loot:c.loot}}return{new_data:{...n,total_xp:o,unlocked:a},level_up:s}}static backfillUnlocks(n){var o;const t=new Set(n.unlocked);for(const r of Ue.unlocked)t.add(r);const i=this.getLevelForXp(n.total_xp);for(let r=2;r<=i;r++){const a=(o=we[r])!=null?o:{missions:[],loot:[]};for(const s of[...a.missions,...a.loot])t.add(s)}for(const r of n.completed_missions)t.add(r);return{...n,unlocked:[...t]}}static recordCompletion(n){const t=new Date().toISOString().slice(0,10),i=n.streak_last_date;if(i===t)return n;const o=new Date(Date.now()-864e5).toISOString().slice(0,10),r=i===o?n.streak_current+1:1;return{...n,streak_current:r,streak_last_date:t}}static getLevelData(n){var t;return(t=he.find(i=>i.level===n))!=null?t:he[0]}static getXpProgress(n){const t=this.getLevelForXp(n),i=this.getLevelData(t),o=he.find(u=>u.level===t+1);if(!o)return{level:t,into:0,span:0,pct:100,nextLevelXp:null,nextTitle:null};const r=o.xp_required-i.xp_required,a=n-i.xp_required,s=r>0?Math.min(100,Math.round(a/r*100)):100;return{level:t,into:a,span:r,pct:s,nextLevelXp:o.xp_required,nextTitle:o.title}}static recordMissionRun(n,t,i=new Date().toISOString().slice(0,10)){var r,a,s,u;const o=(c,h)=>c>0?Math.min(c,h):h;return{best_time_ms:o((r=n==null?void 0:n.best_time_ms)!=null?r:0,t.elapsed_ms),best_keystrokes:o((a=n==null?void 0:n.best_keystrokes)!=null?a:0,t.keystrokes),best_ks_per_min:Math.max((s=n==null?void 0:n.best_ks_per_min)!=null?s:0,t.ks_per_min),runs:((u=n==null?void 0:n.runs)!=null?u:0)+1,last_run:i}}}const Qn=1.5,$n=2.5,Lt=20,Dt=20,xt=3;function Ht(e){const n=e&&e>0?e:xt;return Lt+n*Dt}function wn(e){return e.parOverride&&e.parOverride>0?e.parOverride:Ht(e.difficulty)}function Ve(e,n){return e<=0||n<=0?null:e<=n?"gold":e<=n*Qn?"silver":e<=n*$n?"bronze":null}function Ft(e,n){if(e<=0||n<=0)return null;const t=Ve(e,n);return t==="gold"?null:t==="silver"?{nextTier:"gold",delta:e-n}:t==="bronze"?{nextTier:"silver",delta:e-n*Qn}:{nextTier:"bronze",delta:e-n*$n}}function Gt(e,n){var t,i,o;return e?(o=(i=(t=n.find(r=>r.id===e))==null?void 0:t.groups[0])==null?void 0:i.keys.slice(0,3))!=null?o:[]:[]}const vn={fundamentals:{success:["The tool responded. That's all that mattered.","Clean. You understood the difference between modes.","Most people fight the tool. You used it.","Signal restored. NEXUS has updated your record.","Normal, Insert, Escape. You have all three now."],fast:["Faster than last time. The muscle is forming.","That's what it feels like when it becomes reflex."],slow:["It was correct. Speed comes later.","Correct is more important than fast. For now."],guide_why:["Modes are the spine of everything you touch. Fight them and the tool fights back."]},navigation:{success:["Precise. Character by character, line by line.","You moved through the file like you owned it.","Navigation is thought made visible. Good thinking.","hjkl. Four keys. Infinite territory."],fast:["You didn't hesitate. That's different from being fast.","The cursor went where you looked. That's the goal."],guide_why:["Move without the mouse or you will never keep pace with CORP."]},"word-movement":{success:["Word by word. That's the right unit for this work.","w and b aren't shortcuts. They're the correct resolution.","You moved at the level of meaning, not characters."],fast:["w is faster than l because it should be."]},operators:{success:["d, c, y. The three verbs. Everything else is grammar.","You deleted what needed deleting. Nothing more.","Operators compose. You're starting to see it.","CORP injected six lines. You removed six lines. Clean ratio."],fast:["Efficient. The tool obeys you now.","That's not speed. That's knowing exactly what to do."],perfect_ks:["Minimum keystrokes. Maximum result. That's Vim.","Less is the point. You're getting it."]},"text-objects":{success:['ci". Two keystrokes to replace any quoted value. Remember that.',"The brackets are the map. You read the map.","Text objects aren't shortcuts. They're the correct vocabulary.","Inside or around — you chose correctly."],fast:["You went straight to the container. No wandering."]},"search-replace":{success:[":%s — the most powerful line in any file. Use it wisely.","Systematic corruption requires systematic counter. Good.","Thirty-one replacements, one command. That's leverage.","CORP bets on your impatience. You proved them wrong."],fast:["You saw the pattern before you moved. That's the key."]},combined:{success:["The poem is restored. Ren Voss typed it in 2041. You restored it in 2047.","Every Nevermore you recovered is the same word.","Field Training complete. What comes next is no longer training.","WRAITH sends confirmation. Handoff can proceed."],fast:["Ghost-level. WRAITH has noted your time."],perfect_ks:["That's how THE RAVEN would have done it."]},registers:{success:["The register held it. You knew where to look.",'"a through "z. Named memory. Use it deliberately.',"You moved data without losing it. That's the register's purpose.","CORP data extracted. Registers kept it clean."],fast:["No buffer fumbling. The register was ready."],perfect_ks:['"ayy "ap. Two commands. Zero waste.']},case:{success:["gU, gu, ~. Case is just another dimension of the text.","The cipher required uppercase. You delivered uppercase.","You changed the case without changing the word. Precise.","CORP encodes in caps. You decode with motion."],fast:["That's fast. gU doesn't require much — but it requires precision."]},"visual-block":{success:["V then d. Select the noise. Remove the noise.","Visual mode is surgical. You used it that way.","Three null lines. Three keystrokes. Clean ratio.","The selection was exact. The deletion was exact."],fast:["You knew what to select before you selected it. Good."],perfect_ks:["Select once. Delete once. Done."]},"marks-macros":{success:["Record once. Replay twelve times. That's the leverage.","A macro is a commitment. You committed correctly.","Marks and macros. The operative's memory.","You decoded a CORP internal document. Let that settle."],fast:["The macro ran clean. No hesitation in the recording."],wrong_answer:["Not yet. Look at where it diverges.","Close. The pattern is consistent — check your macro.","One line off. Find it.","The diff doesn't lie. Trust the diff."]},"pane-nav":{success:["Ctrl+W. The window moves, not the text.","You navigated the workspace without touching the mouse.","Split. Navigate. Close. All from the home row."],fast:["The pane switch was instant. That means it was already muscle memory."]},"ex-commands":{success:[":g/pattern/d — one command, every matching line gone.","Global commands are leverage. You used leverage.","The file has no hiding place from :g.","Ex mode is the command line inside the editor. Use both."],fast:["You typed the command once. The file obeyed every line."]},regex:{success:["The pattern matched. That means you understood the structure.","\\v for very magic. Less escaping, more thinking.","A regex that works is a small proof of understanding.","CORP data is patterned. Patterns are tractable.","Every substitution is a claim about structure. Yours was correct.","The document doesn't know you're watching. That's the advantage.","Pattern recognition is the skill under the skill."],fast:["You wrote it right the first time. That's the hard part of regex.","No iteration. The pattern was clear in your head before you typed it.","Speed here means you saw the shape of the data. Not the characters."],perfect_ks:["One pass. The entire file. That is what regex is for.","Minimum expression, maximum reach."],wrong_answer:["The pattern missed something. Check your anchors.","Close. One character class is wrong.","The regex is right. The range might not be.","The diff tells you exactly where it failed. Trust the diff.","A regex that almost works is a hypothesis. Test it again."],drill:["Run it again. The command should be automatic.","The pattern you know is the pattern you reach for under pressure."]},universal:{success:["Transmission restored.","Signal clean.","NEXUS confirms receipt.","The file is what it should be."],streak:["Consecutive sessions. The muscle remembers.","Back again. Good.","Consistency is the skill underneath the skill."],drill:["Again.","Repetition is the only teacher.","The goal is to stop thinking about it.","When it becomes reflex, you'll know."],level_up:["New clearance. New files. The work gets harder from here.","NEXUS has updated your designation.","You've earned the next tier. Don't mistake that for safety."],wrong_answer:["Not yet. Look at where it diverges.","The diff doesn't lie. Trust the diff.","One character. Find it."],guide_why:["Master the tool. The story needs operatives who can."]}};function Ut(e){var t,i,o,r,a;const n=e!=null?e:"universal";return(a=(r=(i=(t=vn[n])==null?void 0:t.guide_why)==null?void 0:i[0])!=null?r:(o=vn.universal.guide_why)==null?void 0:o[0])!=null?a:"Master the tool. The story needs operatives who can."}const Vt={fundamentals:"Modes & editing",navigation:"Navigation (hjkl)","word-movement":"Word movement",operators:"Operators (d, c, y)","text-objects":"Text objects","search-replace":"Search & replace","marks-macros":"Marks & macros",registers:"Registers",case:"Case operators","visual-block":"Visual block","ex-commands":"Ex commands","pane-nav":"Window panes",regex:"Regex",combined:"Combined skills"};function Be(e){var n;return e?(n=Vt[e])!=null?n:e:"Vim practice"}function et(e){return e<=2?0:e<=5?1:2}function Me(e){var r;const n=e.pin==="open"?0:e.pin==="quiet"?2:et(e.level),t=Be(e.category),i=e.next?`${e.next.title} (${e.next.mission_id})`:null,o=e.next?`You can use ${t.toLowerCase()} now. Next: ${Be(e.next.category).toLowerCase()} — ${e.next.mission_id}.`:`You can use ${t.toLowerCase()} now. Arc clear — THE RAVEN awaits.`;return{skillTag:t,keys:Gt(e.category,e.cheatsheet),why:((r=e.why)==null?void 0:r.trim())||Ut(e.category),leadsTo:i,debrief:o,tier:n}}const Ie=[{id:"fundamentals",label:"FUNDAMENTALS",groups:[{label:"MODES",keys:[{key:"i",description:"insert before cursor"},{key:"a",description:"insert after cursor"},{key:"o",description:"new line below, insert"},{key:"O",description:"new line above, insert"},{key:"ESC",description:"back to normal"}]},{label:"EDIT",keys:[{key:"x",description:"delete char under cursor"},{key:"X",description:"delete char before cursor"},{key:"r",description:"replace single char"},{key:".",description:"repeat last change"},{key:"u",description:"undo"},{key:"Ctrl+r",description:"redo"}]}]},{id:"navigation",label:"NAVIGATION",groups:[{label:"BASIC MOVE",keys:[{key:"h",description:"left"},{key:"j",description:"down"},{key:"k",description:"up"},{key:"l",description:"right"},{key:"0",description:"line start"},{key:"^",description:"first non-blank"},{key:"$",description:"line end"}]},{label:"FILE JUMPS",keys:[{key:"gg",description:"file start"},{key:"G",description:"file end"},{key:":#",description:"jump to line number"},{key:"H",description:"top of screen"},{key:"M",description:"middle of screen"},{key:"L",description:"bottom of screen"}]},{label:"FIND CHAR",keys:[{key:"f",description:"jump to next <char>"},{key:"F",description:"jump to previous <char>"},{key:"t",description:"jump just before next <char>"},{key:"T",description:"jump just before previous <char>"},{key:";",description:"repeat last f/F/t/T"},{key:",",description:"repeat it, reversed"}]},{label:"SCROLL",keys:[{key:"Ctrl+d",description:"half page down"},{key:"Ctrl+u",description:"half page up"},{key:"{",description:"prev paragraph"},{key:"}",description:"next paragraph"}]}]},{id:"word-movement",label:"WORD MOVEMENT",groups:[{label:"WORD JUMP",keys:[{key:"w",description:"next word start"},{key:"b",description:"prev word start"},{key:"e",description:"word end"},{key:"W",description:"next WORD start"},{key:"B",description:"prev WORD start"},{key:"E",description:"WORD end"}]}]},{id:"operators",label:"OPERATORS",groups:[{label:"DELETE",keys:[{key:"dw",description:"delete word"},{key:"dd",description:"delete line"},{key:"D",description:"delete to end of line"},{key:"diw",description:"delete inner word"},{key:"3dd",description:"delete 3 lines"}]},{label:"CHANGE",keys:[{key:"cw",description:"change word"},{key:"cc",description:"change line"},{key:"C",description:"change to end of line"}]},{label:"YANK/PUT",keys:[{key:"yy",description:"yank line"},{key:"yw",description:"yank word"},{key:"p",description:"put after"},{key:"P",description:"put before"},{key:"Vp",description:"select line, replace with yanked"}]}]},{id:"text-objects",label:"TEXT OBJECTS",groups:[{label:"INSIDE",keys:[{key:"ciw",description:"change inside word"},{key:'ci"',description:"change inside quotes"},{key:"ci(",description:"change inside parens"},{key:"ci{",description:"change inside braces"},{key:"ci[",description:"change inside brackets"},{key:"cit",description:"change inside tag"}]},{label:"AROUND",keys:[{key:"daw",description:"delete around word"},{key:'ca"',description:"change around quotes"},{key:"da(",description:"delete around parens"},{key:"diw",description:"delete inner word"}]}]},{id:"search-replace",label:"SEARCH & REPLACE",groups:[{label:"SEARCH",keys:[{key:"/pattern",description:"search forward"},{key:"?pattern",description:"search backward"},{key:"n",description:"next match"},{key:"N",description:"prev match"},{key:"*",description:"search word under cursor"},{key:"cgn",description:"change next match"},{key:".",description:"repeat last change"}]},{label:"REPLACE",keys:[{key:":%s/old/new/g",description:"replace all in file"},{key:":s/old/new/g",description:"replace in line"},{key:":%s/old/new/gc",description:"replace with confirm"}]}]},{id:"marks-macros",label:"MARKS & MACROS",groups:[{label:"MARKS",keys:[{key:"ma",description:"set mark a"},{key:"`a",description:"jump to mark a (exact)"},{key:"'a",description:"jump to mark a (line)"},{key:"''",description:"jump back"}]},{label:"MACROS",keys:[{key:"qa",description:"record macro into a"},{key:"q",description:"stop recording"},{key:"@a",description:"play macro a"},{key:"@@",description:"replay last macro"},{key:"12@a",description:"play macro 12 times"},{key:":norm",description:"run normal cmd on range"}]}]},{id:"registers",label:"REGISTERS",groups:[{label:"NAMED REGISTERS",keys:[{key:'"ayy',description:"yank line into register a"},{key:'"ay',description:"yank motion into register a"},{key:'"add',description:"delete line into register a"},{key:'"ap',description:"paste from register a"},{key:'"aP',description:"paste before from register a"}]},{label:"SPECIAL",keys:[{key:'"1p',description:"paste from numbered register 1"},{key:'"+y',description:"yank to system clipboard"},{key:'"+p',description:"paste from system clipboard"},{key:":reg",description:"show all registers"}]}]},{id:"pane-nav",label:"PANE NAVIGATION",groups:[{label:"SWITCH",keys:[{key:"Ctrl+Tab",description:"next pane"},{key:"Ctrl+W h",description:"move to left pane"},{key:"Ctrl+W l",description:"move to right pane"},{key:"Ctrl+W j",description:"move to pane below"},{key:"Ctrl+W k",description:"move to pane above"}]},{label:"SPLIT",keys:[{key:":sp",description:"split horizontal"},{key:":vsp",description:"split vertical"}]}]},{id:"ex-commands",label:"EX COMMANDS",groups:[{label:"GLOBAL",keys:[{key:":g/pattern/d",description:"delete all matching lines"},{key:":v/pattern/d",description:"delete all non-matching lines"},{key:":g/pattern/s/x/y/",description:"replace in matching lines"},{key:":g/pattern/norm cmd",description:"run normal cmd on matches"}]},{label:"RANGES",keys:[{key:":'<,'>s/x/y/",description:"replace in visual selection"},{key:":1,10s/x/y/",description:"replace in line range"},{key:":.,$s/x/y/",description:"replace from cursor to end"}]}]},{id:"case",label:"CASE CONVERSION",groups:[{label:"TOGGLE / UPPER / LOWER",keys:[{key:"~",description:"toggle case of char"},{key:"g~~",description:"toggle case of line"},{key:"gUU",description:"uppercase line"},{key:"guu",description:"lowercase line"},{key:"gU{motion}",description:"uppercase motion"},{key:"gu{motion}",description:"lowercase motion"}]},{label:"VISUAL",keys:[{key:"viwU",description:"select word, uppercase"},{key:"viwu",description:"select word, lowercase"},{key:"U",description:"uppercase selection"},{key:"u",description:"lowercase selection"}]}]},{id:"visual-block",label:"VISUAL BLOCK",groups:[{label:"SELECT",keys:[{key:"Ctrl+v",description:"enter visual block mode"},{key:"V",description:"select whole line"},{key:"v",description:"character visual mode"},{key:"o",description:"toggle selection end"}]},{label:"ACT ON SELECTION",keys:[{key:"d",description:"delete selection"},{key:"y",description:"yank selection"},{key:"c",description:"change selection"},{key:"I",description:"insert at block start"},{key:"A",description:"append at block end"},{key:"Ctrl+a",description:"increment number"},{key:"Ctrl+x",description:"decrement number"}]}]},{id:"regex",label:"REGEX",groups:[{label:"VERY MAGIC",keys:[{key:"\\v",description:"very magic mode (ERE)"},{key:"(...)",description:"capture group"},{key:"\\1 \\2",description:"back-reference"},{key:"\\d{N}",description:"N digits"},{key:"\\w+",description:"one or more word chars"},{key:".+",description:"one or more any char"}]},{label:"CHAR CLASSES",keys:[{key:"\\d",description:"digit"},{key:"\\w",description:"word character"},{key:"\\s",description:"whitespace"},{key:"\\D",description:"non-digit"},{key:"[a-z]",description:"character range"}]}]}];function di(e,n){const t=Ie.filter(i=>e.includes(i.id));return!n||!e.includes(n)?t:[...t.filter(i=>i.id===n),...t.filter(i=>i.id!==n)]}class Bt{constructor(n){this.ctx=null,this.masterGain=null,this.muted=!1,this.contextFactory=n!=null?n:()=>new(window.AudioContext||window.webkitAudioContext)}get context(){return this.ctx}get master(){return this.masterGain}get isReady(){return this.ctx!==null&&this.ctx.state!=="closed"}setMuted(n){this.muted=n,this.masterGain&&(this.masterGain.gain.value=n?0:.35)}async init(){if(this.ctx)if(this.ctx.state==="closed")this.ctx=null,this.masterGain=null;else{this.ctx.state==="suspended"&&await this.ctx.resume();return}this.ctx=this.contextFactory(),this.ctx.state==="suspended"&&await this.ctx.resume(),this.masterGain=this.ctx.createGain(),this.masterGain.gain.value=this.muted?0:.35,this.masterGain.connect(this.ctx.destination)}async dispose(){var n;this.ctx&&((n=this.masterGain)==null||n.disconnect(),this.masterGain=null,await this.ctx.close(),this.ctx=null)}}function _n(e,n,t,i,o,r,a=0,s){const u=e.createOscillator(),c=e.createGain(),h=e.currentTime+a;u.type=i,u.frequency.setValueAtTime(t,h);const l=Math.min(.01,o*.1),R=Math.max(h+l,h+o-.05);c.gain.setValueAtTime(0,h),c.gain.linearRampToValueAtTime(r,h+l),c.gain.setValueAtTime(r,R),c.gain.linearRampToValueAtTime(0,h+o),u.connect(c),c.connect(n),u.start(h),u.stop(h+o+.02),u.onended=()=>{try{u.disconnect(),c.disconnect()}catch(m){}}}function O(e,n,t,i,o,r,a=0,s){const u=e.currentTime+a,c=.015,h=Math.max(Math.ceil(e.sampleRate*c),1),l=e.createBuffer(1,h,e.sampleRate),R=l.getChannelData(0);for(let w=0;w<R.length;w++)R[w]=Math.random()*2-1;const m=e.createBufferSource();m.buffer=l;const I=e.createBiquadFilter();I.type="bandpass",I.frequency.value=t,I.Q.value=2;const A=e.createGain();A.gain.setValueAtTime(r*.06,u),A.gain.linearRampToValueAtTime(0,u+c),m.connect(I),I.connect(A),A.connect(n),m.start(u),m.onended=()=>{try{m.disconnect(),I.disconnect(),A.disconnect()}catch(w){}};const E=e.createOscillator(),f=e.createGain();if(E.type=i,E.frequency.setValueAtTime(t,u),s!==void 0)E.frequency.linearRampToValueAtTime(s,u+o);else{const w=(Math.random()>.5?1:-1)*(4+Math.random()*7),L=u+o*.4;E.frequency.setValueAtTime(t,L),E.frequency.linearRampToValueAtTime(t+w,u+o)}const g=Math.min(.012,o*.1),v=Math.max(u+g,u+o*.3);f.gain.setValueAtTime(0,u),f.gain.linearRampToValueAtTime(r,u+g),f.gain.setValueAtTime(r,v),f.gain.linearRampToValueAtTime(r*.25,u+o*.8),f.gain.linearRampToValueAtTime(0,u+o),E.connect(f),f.connect(n),E.start(u),E.stop(u+o+.02),E.onended=()=>{try{E.disconnect(),f.disconnect()}catch(w){}}}function me(e,n,t,i,o=1200,r=0){const a=Math.ceil(e.sampleRate*t),s=e.createBuffer(1,Math.max(a,1),e.sampleRate),u=s.getChannelData(0);for(let m=0;m<u.length;m++)u[m]=Math.random()*2-1;const c=e.createBufferSource();c.buffer=s;const h=e.createBiquadFilter();h.type="bandpass",h.frequency.value=o;const l=e.createGain(),R=e.currentTime+r;l.gain.setValueAtTime(0,R),l.gain.linearRampToValueAtTime(i,R+.005),l.gain.linearRampToValueAtTime(0,R+t),c.connect(h),h.connect(l),l.connect(n),c.start(R),c.onended=()=>{try{c.disconnect(),h.disconnect(),l.disconnect()}catch(m){}}}class pe{static guard(n){return!n.isReady||!n.master?null:n.context}static missionComplete(n){const t=this.guard(n);if(!t)return;const i=n.master;O(t,i,523.25,"triangle",1.4,.32),O(t,i,261.63,"triangle",.8,.1,.06)}static levelUp(n){const t=this.guard(n);if(!t)return;const i=n.master;[196,233.08,293.66,392].forEach((r,a)=>O(t,i,r,"triangle",.3,.26,a*.2))}static xpGain(n){const t=this.guard(n);t&&O(t,n.master,1760,"sine",.08,.09)}static wrongAttempt(n){const t=this.guard(n);if(!t)return;const i=n.master;O(t,i,440,"sine",.22,.14,0,220),me(t,i,.12,.1,500)}static missionReset(n){const t=this.guard(n);t&&O(t,n.master,660,"triangle",.5,.16,0,165)}static glitchFeedback(n){const t=this.guard(n);t&&_n(t,n.master,920,"sine",.05,.16)}static drillToggle(n){const t=this.guard(n);if(!t)return;const i=n.master;me(t,i,.06,.2,200),O(t,i,120,"sine",.06,.1,.01)}static lockMessage(n){const t=this.guard(n);t&&_n(t,n.master,150,"sine",.4,.18)}static vimModeNormal(n){const t=this.guard(n);if(!t)return;const i=n.master;O(t,i,220,"triangle",.12,.2),me(t,i,.04,.07,400,.005)}static vimModeInsert(n){const t=this.guard(n);t&&O(t,n.master,660,"sine",.22,.13)}static vimModeVisual(n){const t=this.guard(n);t&&O(t,n.master,330,"sine",.18,.12,0,550)}static vimModeCommand(n){const t=this.guard(n);t&&O(t,n.master,880,"sine",.08,.15)}static corruptionFixed(n){const t=this.guard(n);t&&O(t,n.master,440,"sine",.22,.18,0,660)}static transmissionRestored(n){const t=this.guard(n);if(!t)return;const i=n.master;[261.63,329.63,392,523.25].forEach((r,a)=>O(t,i,r,"triangle",1-a*.08,.18,a*.12)),me(t,i,.25,.04,1500,.35)}static commandDelete(n){const t=this.guard(n);t&&O(t,n.master,196,"triangle",.1,.18)}static commandYank(n){const t=this.guard(n);t&&O(t,n.master,261,"sine",.1,.14)}static commandChange(n){const t=this.guard(n);t&&O(t,n.master,233,"sine",.08,.14)}static commandMotionForward(n){const t=this.guard(n);t&&O(t,n.master,293,"sine",.06,.11)}static commandMotionBack(n){const t=this.guard(n);t&&O(t,n.master,349,"sine",.06,.11)}static commandPaste(n){const t=this.guard(n);t&&O(t,n.master,392,"sine",.14,.16)}static commandUndo(n){const t=this.guard(n);t&&O(t,n.master,349,"sine",.22,.14,0,196)}static commandRedo(n){const t=this.guard(n);t&&O(t,n.master,196,"sine",.22,.14,0,392)}static commandGotoStart(n){const t=this.guard(n);t&&O(t,n.master,196,"triangle",.28,.18)}static commandGotoEnd(n){const t=this.guard(n);t&&O(t,n.master,392,"triangle",.28,.18)}}const q=[{id:"M-01",role:"briefing",kind:"mission",arc:"I",chapter:"01 - Indoctrination",frontmatter:{mission_type:"briefing",links_to:"01 - Indoctrination/M-01-TRANSMISSION-The_Three_Modes",locked:!1,tags:["briefing","tier-1"],sticker:"lucide//mail",color:"#00ff41"},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  INCOMING — CIPHER                       ║
║  BRIEFING: M-01 // THE THREE MODES       ║
╚══════════════════════════════════════════╝
\`\`\`

> [!quote] CIPHER
> *"You were referred. Someone vouched. That's all you get before the test.*
> *Before you receive a designation, before you receive missions, before you receive anything — you prove you can use the tool.*
> *Not fluently. Not fast. Just: can you use it at all.*
> *CORP corrupted your induction document in transit. Standard NEVERMORE noise — character-level injections. Stray signals inserted mid-word. The document reads as garbage. It shouldn't.*
> *Restore it. Use Vim. Nothing else.*
> *Three modes. That's all you need.*
> *Normal — your default. Move without writing.*
> *Insert — when you must change something.*
> *Escape — when you're done changing.*
> *The document is waiting."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Restore the corrupted induction document.
>
> > [!tip] SKILLS
> > Mode switching (\`i\`, \`a\`, \`o\`, \`ESC\`), character deletion (\`x\`, \`X\`)
>
> > [!success] +15 XP
>
> → **[[_content/01 - Indoctrination/M-01-TRANSMISSION-The_Three_Modes|M-01-TRANSMISSION-The_Three_Modes]]** — open to begin. Timer starts on file open.`,path:"01 - Indoctrination/M-01-BRIEFING-Induction_Order.md"},{id:"M-01",role:"transmission",kind:"mission",arc:"I",chapter:"01 - Indoctrination",frontmatter:{mission_id:"M-01",title:"The Three Modes",tier:"🔴 INDOCTRINATION",xp_reward:15,completed:!1,difficulty:1,category:"fundamentals",tags:["vim/modes","indoctrination"],sticker:"lucide//radio",color:"#ff4444",summary:"Learn Vim's three modes — Normal, Insert, Visual. Without this foundation, you're blind.",why:"Modes are the spine of everything you'll touch. Get them wrong and the tool fights you.",mission_type:"practice",locked:!1},body:`FROM: CIPHER
TO: [PENDING DESIGNATION] — NEW OPERATIVE

YoXur induction doZcument has been comprXomized in tranZsit.
CORP's NEVERMORE sysXtem injeXcted noise at the charZacter level.
You must useX the tooXl to reZmove it.

Three moXdes. That is alXl you need to knoZw right now.

Normal mZode — your defauXlt state. The tool waXits here.
Insert moXde — when you must cZhange somethZing. Press i.
Escape — wheXn you are done chanZging. Press ESC.

YouX are not typZing. You are editZing.
There is a diXfference. LeaZrn it.

The fiXle is broken. The tooXl is not.
Use the tZool. Fix the fXile.

— CIPHER`,path:"01 - Indoctrination/M-01-TRANSMISSION-The_Three_Modes.md"},{id:"M-02",role:"briefing",kind:"mission",arc:"I",chapter:"01 - Indoctrination",frontmatter:{mission_type:"briefing",links_to:"01 - Indoctrination/M-02-TRANSMISSION-Basic_Navigation",locked:!1,tags:["briefing","tier-1"],sticker:"lucide//map",color:"#00ff41"},body:"```ascii\n╔══════════════════════════════════════════╗\n║  INCOMING — CIPHER                       ║\n║  BRIEFING: M-02 // BASIC NAVIGATION      ║\n╚══════════════════════════════════════════╝\n```\n\n> [!quote] CIPHER\n> *\"You've been assigned a designation. NEXUS has you in the system.*\n> *A training transmission went through a corrupted relay — characters transposed, positions shifted. NEVERMORE's standard noise pattern.*\n> *The coordinates in the file are intact. Just in the wrong positions.*\n> *You navigate precisely. `h`, `j`, `k`, `l` — no mouse, no arrow keys. Position matters. One character off means the wrong line.*\n> *`0` gets you to the start of a line. `$` to the end. `^` to the first non-blank character.*\n> *Study the corrupted file. Find what's wrong. Fix it.\"*\n\n\n> [!abstract] DIRECTIVE\n> > [!warning] OBJECTIVE\n> > Restore the scrambled coordinate transmission.\n>\n> > [!tip] SKILLS\n> > `h` `j` `k` `l`, `0` `$` `^`, precise cursor positioning\n>\n> > [!success] +15 XP\n>\n> → **[[_content/01 - Indoctrination/M-02-TRANSMISSION-Basic_Navigation|M-02-TRANSMISSION-Basic_Navigation]]** — open to begin. Timer starts on file open.",path:"01 - Indoctrination/M-02-BRIEFING-Sector_Seven.md"},{id:"M-02",role:"transmission",kind:"mission",arc:"I",chapter:"01 - Indoctrination",frontmatter:{mission_id:"M-02",title:"Basic Navigation — hjkl",tier:"🔴 INDOCTRINATION",xp_reward:15,completed:!1,difficulty:1,category:"navigation",tags:["vim/navigation","vim/hjkl","indoctrination"],sticker:"lucide//move",color:"#ff4444",summary:"Arrow keys are your enemy. hjkl are your allies. Learn them until your fingers dream.",why:"Reach for the arrow keys and your hand leaves home row — hjkl keeps it there, where speed lives.",mission_type:"practice",locked:!1},body:`TRAINING TRANSMISSION — NAVIGATION DRILL
Classification: RESISTANCE EYES ONLY
Status: CORRUPTED IN TRANSIT

Operative rendezvous: Node 7 at 23:00
Approach vector: North entarnce, third corridor
Fallback positiob: Sub-level 2, east stairwel
Emergency exfil: Roof accesss point Charlie

Drill coordiantes: 52.4N / 13.4W
Contact codewrod: THE DIFF DOES NOT LIE
Response codewor: TRUST THE DIFF

Notes: Training window opens at 22:45.
Window is fiften minutes. Do not be la
Complete all restorations befoer the window closes.

Confirm receipt by restoirng this file.
If you can read this corectly, you are in position.

— Training Relay`,path:"01 - Indoctrination/M-02-TRANSMISSION-Basic_Navigation.md"},{id:"M-03",role:"briefing",kind:"mission",arc:"I",chapter:"01 - Indoctrination",frontmatter:{mission_type:"briefing",links_to:"01 - Indoctrination/M-03-TRANSMISSION-Word_Movement",locked:!1,tags:["briefing","tier-1"],sticker:"lucide//users",color:"#00ff41"},body:'```ascii\n╔══════════════════════════════════════════╗\n║  INCOMING — CIPHER                       ║\n║  BRIEFING: M-03 // WORD MOVEMENT         ║\n╚══════════════════════════════════════════╝\n```\n\n> [!quote] CIPHER\n> *"Sector 7 drill went clean. Good.*\n> *Next file. NEVERMORE hit a training roster — not real callsigns, a practice registry. It replaced each token with a CORP-style surveillance code. Systematically. Word by word.*\n> *You\'re fixing words, not characters. Word-level navigation.*\n> *`w` moves forward a word. `b` moves back. `e` lands on the end of a word.*\n> *Learn the difference between `w` and `W`. Upper-case versions ignore punctuation.*\n> *Move fast. Replace precisely."*\n\n\n> [!abstract] DIRECTIVE\n> > [!warning] OBJECTIVE\n> > Replace CORP surveillance codes with the correct practice tokens from the registry:\n> > - `SCAN-7741` → `UNIT-7741`\n> > - `TRACE-3392` → `RELAY-3392`\n> > - `WATCH-0012` → `NODE-0012`\n>\n> > [!tip] SKILLS\n> > `w` `b` `e` `W` `B` `E`, `cw` to change words\n>\n> > [!success] +20 XP\n>\n> → **[[_content/01 - Indoctrination/M-03-TRANSMISSION-Word_Movement|M-03-TRANSMISSION-Word_Movement]]** — open to begin. Timer starts on file open.',path:"01 - Indoctrination/M-03-BRIEFING-Agent_Roster.md"},{id:"M-03",role:"transmission",kind:"mission",arc:"I",chapter:"01 - Indoctrination",frontmatter:{mission_id:"M-03",title:"Word Movement — w b e",tier:"🔴 INDOCTRINATION",xp_reward:20,completed:!1,difficulty:2,category:"navigation",tags:["vim/navigation","vim/words","indoctrination"],sticker:"lucide//fast-forward",color:"#ff4444",summary:"hjkl is slow. Jumping word by word makes you fast. w, b, e are your turbochargers.",why:"Crawling character by character is how you lose a window — w, b, e jump you word by word.",mission_type:"practice",locked:!1},body:`SECTOR 7 — PRACTICE ROSTER
Classification: RESISTANCE TRAINING USE ONLY
Verification: Required at all drill handoffs

SCAN-7741 — Field operative, northern sector
TRACE-3392 — Intelligence contact, CORP adjacent
SCAN-7741 — Logistics, supply chain access
WATCH-0012 — Safehouses, sector west
SCAN-7741 — Communications relay operator
TRACE-3392 — Deep cover, infrastructure division
SCAN-7741 — Medical support, mobile unit
WATCH-0012 — Exfiltration specialist

Challenge phrase: SCAN-7741
Response phrase: TRACE-3392

Notes: WATCH-0012 identifiers are active.
Use practice tokens only. No real designations in drills.
TRACE-3392 has changed meeting protocols.
Next contact window: SCAN-7741

— CIPHER`,path:"01 - Indoctrination/M-03-TRANSMISSION-Word_Movement.md"},{id:"M-04",role:"briefing",kind:"mission",arc:"I",chapter:"01 - Indoctrination",frontmatter:{mission_type:"briefing",links_to:"01 - Indoctrination/M-04-TRANSMISSION-Lines_and_Jumps",locked:!1,tags:["briefing","tier-1"],sticker:"lucide//layout",color:"#00ff41"},body:'```ascii\n╔══════════════════════════════════════════╗\n║  INCOMING — CIPHER                       ║\n║  BRIEFING: M-04 // LINES AND JUMPS       ║\n╚══════════════════════════════════════════╝\n```\n\n> [!quote] CIPHER\n> *"Another corrupted file. Not a roster this time — a layout document. Sections scrambled at the line level. Whole blocks shifted out of order. Section 1 notes below Section 3. The index appears after the entries.*\n> *Restoring this requires line-level navigation. Not character by character — you jump.*\n> *`gg` to the top. `G` to the bottom. `:#` to a specific line number.*\n> *`{` and `}` jump between paragraphs. In a large file, character navigation is useless.*\n> *Read the document. Restore the order."*\n\n\n> [!abstract] DIRECTIVE\n> > [!warning] OBJECTIVE\n> > Reorder the scrambled layout sections.\n>\n> > [!tip] SKILLS\n> > `gg` `G` `:#`, `{` `}`, `H` `M` `L`\n>\n> > [!success] +15 XP\n>\n> → **[[_content/01 - Indoctrination/M-04-TRANSMISSION-Lines_and_Jumps|M-04-TRANSMISSION-Lines_and_Jumps]]** — open to begin. Timer starts on file open.',path:"01 - Indoctrination/M-04-BRIEFING-Facility_Schematics.md"},{id:"M-04",role:"transmission",kind:"mission",arc:"I",chapter:"01 - Indoctrination",frontmatter:{mission_id:"M-04",title:"Lines and Jumps",tier:"🔴 INDOCTRINATION",xp_reward:15,completed:!1,difficulty:2,category:"navigation",tags:["vim/navigation","vim/lines","indoctrination"],sticker:"lucide//align-left",color:"#ff4444",summary:"Line start, line end, jump to any line. Learn to teleport through files.",why:"A file is not a wall of text; with line-start, line-end and :n you teleport, you don't scroll.",mission_type:"practice",locked:!1},body:`DOCUMENT LAYOUT DRILL — STRUCTURED INDEX
Classification: RESISTANCE TRAINING USE ONLY

=== SECTION 3 — ARCHIVE INDEX ===
Archive root: north wing reading room
Shelf access: ceiling-catalog C-3, cross-reference required
Retrieval protocol: one requisition form every 45 minutes

=== ACCESS WINDOWS ===
22:00 — Evening reading period opens
22:45 — Half-term catalog rotation passes
23:15 — Reserved-shelf access opens: 12 minutes
23:27 — Next rotation begins

=== SECTION 1 — ENTRY INDEX ===
Main entry: biometric reading station, staff only
Side entry: requisition desk 4471, maintenance tier
Delivery bay: unattended after 21:00, reference column D

=== ENTRY NODES ===
Primary: delivery bay, column D reference point
Secondary: requisition desk 4471, maintenance tier
Emergency: rooftop reading gallery, accessible from Section 3 catalog

=== SECTION 2 — ADMINISTRATIVE INDEX ===
Registers empty after 20:30
Catalog closet: room 214, open during catalog rotation
Stairwell B: connects all sections, reading-only corridor`,path:"01 - Indoctrination/M-04-TRANSMISSION-Lines_and_Jumps.md"},{id:"M-05",role:"briefing",kind:"mission",arc:"I",chapter:"02 - Field Training",frontmatter:{mission_type:"briefing",links_to:"02 - Field Training/M-05-TRANSMISSION-Operators",locked:!0,tags:["briefing","tier-2"],sticker:"lucide//terminal",color:"#66cc66"},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  INCOMING — CIPHER                       ║
║  BRIEFING: M-05 // OPERATORS             ║
║  Clearance: GHOST OPERATOR              ║
╚══════════════════════════════════════════╝
\`\`\`

\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP — CONGLOMERATE OF REGULATED PROCESSES                      ║
║  Infrastructure Division — Automated Access Log                  ║
╠══════════════════════════════════════════════════════════════════╣
║  Document Type  : Automated Access Log — Sector 7 Relay          ║
║  Classification : Internal — Sector Administration               ║
║  Audit Code     : ALA-2047-Q1-0271                               ║
║  Timestamp      : 2047-03-14T04:17:33Z (Automated)               ║
║  Generator      : Relay Monitor v8.2 (no human review)           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

\`\`\`
04:01:02 UTC  SYS_DIAG     Relay uptime nominal. Packet throughput: 99.3%. No anomalies detected.
04:03:17 UTC  ACCESS       Badge ID 7741-C // Clearance: YELLOW // Entry: Sub-level 3, Junction Node
04:03:19 UTC  ACCESS       Badge ID 7741-C // Motion pattern logged. Transit vector: north corridor.
04:05:44 UTC  COMPLIANCE   Pursuant to Directive 88-F of the UDCA, all relay
              COMPLIANCE   activity is subject to automated harmonization review. Non-compliant data
              COMPLIANCE   patterns will be flagged for audit classification within 48-72 hours.
              COMPLIANCE   No operator input required.
04:06:31 UTC  SYS_DIAG     Buffer flush complete. Compression ratio: 1:4.2. Log segment archived.
04:08:55 UTC  ACCESS       Badge ID 7741-C // Entry: Relay Core Anteroom. Dwell: 00:02:11.
04:09:10 UTC  ACCESS       Badge ID 9902-A // Clearance: ORANGE // Entry: Sub-level 3, Junction Node
04:09:14 UTC  COMPLIANCE   Automated harmonization coverage extended. Anomalous endpoint
              COMPLIANCE   diversity logged. Cross-reference against subsequent windows scheduled.
              COMPLIANCE   Reference: Audit Code ALA-2047-Q1-0271 for status.
04:11:03 UTC  ACCESS       Badge ID 7741-C // Exit: Relay Core Anteroom. Transit vector: east annex.
04:14:58 UTC  SYS_DIAG     Scheduled compliance audit initiated. No operator input required.
04:17:33 UTC  SYS_DIAG     Log segment closed. Archival status: PENDING HARMONIZATION REVIEW.
\`\`\`

> [!note] CIPHER — Intercepted // Sector 7 Relay
> GHOST pulled this before the window closed.
> Badge 7741-C is ours. They walked the node sequence at 04:03 through 04:11.
> The COMPLIANCE blocks are engine injections — automated flags CORP attaches to flagged segments. They are what you remove. Whole lines. Use your operators.


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Remove all CORP-injected lines from the access log.
>
> > [!tip] SKILLS
> > \`d\` \`c\` \`y\` + motions, \`dd\` \`D\` \`cc\` \`C\`, \`p\` \`P\`
>
> > [!success] +25 XP
>
> → **[[_content/02 - Field Training/M-05-TRANSMISSION-Operators|M-05-TRANSMISSION-Operators]]** — open to begin. Timer starts on file open.`,path:"02 - Field Training/M-05-BRIEFING-Access_Log_Alpha.md"},{id:"M-05",role:"transmission",kind:"mission",arc:"I",chapter:"02 - Field Training",frontmatter:{mission_id:"M-05",title:"Operators — d c y p",tier:"🟡 FIELD TRAINING",xp_reward:25,completed:!1,difficulty:3,category:"editing",tags:["vim/operators","vim/delete","vim/yank","field-training"],sticker:"lucide//scissors",color:"#ffaa00",summary:"Delete, copy, paste. The building blocks of text manipulation. Operators + Motions = Power.",why:"d, c, y — the three verbs. Pair them with a motion and you stop nudging text and start commanding it.",mission_type:"practice",locked:!0},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP — CONGLOMERATE OF REGULATED PROCESSES                      ║
║  Infrastructure Relay Division — Access Log Alpha                ║
╠══════════════════════════════════════════════════════════════════╣
║  Document Type  : Access Log — Sector 7 Primary Node             ║
║  Period         : 2047-03-14T21:00 — 23:59                       ║
║  Classification : Internal — Sector Administration               ║
║  Audit Code     : ALA-2047-Q1-0271                               ║
║  Generator      : Relay Monitor v8.2 (Automated)                 ║
║  Reviewer       : None — No human review required                ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

>> COMPLIANCE: This log is monitored under Directive §441 of the UDCA. <<
>> Unauthorized access is subject to automated classification review. <<

21:04 — ASSET authenticated — clearance LEVEL-2
21:17 — File transfer initiated — 4.2MB encrypted packet
21:19 — Transfer complete — node 7-PRIMARY confirmed receipt

>> COMPLIANCE: All relay activity is logged. Flagged segments will be <<
>> cross-referenced against subsequent monitoring windows. <<

21:44 — Second authentication — same ASSET — flagged: pattern anomaly
21:45 — Query: infrastructure database — search term [REDACTED]
21:51 — Database access terminated — no match returned

>> COMPLIANCE: Operator pattern flagged for review. <<

22:13 — ASSET disconnects — session duration 69 minutes
22:14 — Automated sweep initiated by monitoring infrastructure

>> COMPLIANCE: Anomalous endpoint diversity logged. Cross-reference queued. <<
>> Audit Code ALA-2047-Q1-0271 scheduled. <<

End of period log.

\`\`\`ascii
── END OF LOG ──────────────────────────────────────────────────────
   CORP — Infrastructure Relay Division
   ALA-2047-Q1-0271 — 2047-03-14T23:59:00Z
   Automated log. No operator input required.
────────────────────────────────────────────────────────────────────
\`\`\``,path:"02 - Field Training/M-05-TRANSMISSION-Operators.md"},{id:"M-06",role:"briefing",kind:"mission",arc:"I",chapter:"02 - Field Training",frontmatter:{mission_type:"briefing",links_to:"02 - Field Training/M-06-TRANSMISSION-Text_Objects",locked:!0,tags:["briefing","tier-2"],sticker:"lucide//code",color:"#66cc66"},body:'```ascii\n╔══════════════════════════════════════════╗\n║  INCOMING — CIPHER                       ║\n║  BRIEFING: M-06 // TEXT OBJECTS          ║\n║  Clearance: GHOST OPERATOR              ║\n╚══════════════════════════════════════════╝\n```\n\n> [!quote] CIPHER\n> *"GHOST extracted a structured data file from CORP\'s endpoint registry. Case numbers, sectors, access codes — exactly what we need for the next operation.*\n> *NEVERMORE hit it at the value level. Not whole lines this time — just the content inside brackets and quotes. Everything was placeholder-sanitized. The structure is intact. The brackets are still there. The quotes are still there. You just need to replace what\'s inside them.*\n> *Text objects. `ci"` — change inside quotes. `ci(` — change inside parentheses. `ci{` — inside braces. `diw` — delete inner word. `daw` — delete around word, including spacing.*\n> *The structure tells you where to go. The objects tell you what to change.*\n> *GHOST cross-referenced the decrypted roster — it\'s in the directive below. The container is clean. Fix the contents."*\n\n\n> [!abstract] DIRECTIVE\n> > [!warning] OBJECTIVE\n> > Replace placeholder values inside brackets, quotes, and braces with GHOST\'s decrypted roster:\n> > - `NCE-0091-A` → `CELL-DELTA-01` (sector `sector-7-north`, clearance `field-ops`, status `active`, code `7741`)\n> > - `NCE-0042-B` → `CELL-DELTA-02` (sector `corp-adjacent`, clearance `intelligence`, status `active`, code `3392`)\n> > - `NCE-0017-C` → `GHOST` (sector `corp-internal`, clearance `deep-cover`, status `dark`, code `0012`)\n> > - `location` → `relay-cluster-7` · `frequency` → `441.7`\n> > - `window` → `THE DIFF DOES NOT LIE` · `response` → `TRUST THE DIFF`\n>\n> > [!tip] SKILLS\n> > `ci"` `ca"` `ci(` `ci{` `ci[` `diw` `daw` `cit`\n>\n> > [!success] +30 XP\n>\n> → **[[_content/02 - Field Training/M-06-TRANSMISSION-Text_Objects|M-06-TRANSMISSION-Text_Objects]]** — open to begin. Timer starts on file open.',path:"02 - Field Training/M-06-BRIEFING-Cipher_Fragments.md"},{id:"M-06",role:"transmission",kind:"mission",arc:"I",chapter:"02 - Field Training",frontmatter:{mission_id:"M-06",title:'Text Objects — ciw di( ya"',tier:"🟡 FIELD TRAINING",xp_reward:30,completed:!1,difficulty:4,category:"editing",tags:["vim/text-objects","vim/precision","field-training"],sticker:"lucide//target",color:"#ffaa00",summary:`Text objects are Vim's superpower. No matter where the cursor is — you hit the target. iw, aw, i(, a", is, as.`,why:"ci( hits the target no matter where the cursor sits — stop aiming, start naming what you want.",mission_type:"practice",locked:!0},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP — CONGLOMERATE OF REGULATED PROCESSES                      ║
║  Infrastructure Division — Endpoint Registry Extract             ║
╠══════════════════════════════════════════════════════════════════╣
║  Document Type  : Endpoint Registry Fragment — Serialized Export ║
║  Classification : Internal — Division Circulation                ║
║  Source         : Personnel Registry v2.3 (automated export)     ║
║  Audit Code     : ERX-2047-Q1-0143                               ║
║  Generator      : Registry Export Tool v1.8 (no human review)    ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Intercepted // Infrastructure Division
> GHOST pulled a serialized-export from the endpoint registry.
> CORP's export tool dumps records as structured data — dicts, lists, tuples. NEVERMORE hit the values inside the containers. Brackets, quotes, braces are intact. Values aren't.
> Fix what's inside. The containers stay.

---

endpoints = {
  "NCE-0091-A": {"sector": "ZONE-NULL", "clearance": "RESTRICTED", "status": "INACTIVE"},
  "NCE-0042-B": {"sector": "ZONE-NULL", "clearance": "RESTRICTED", "status": "INACTIVE"},
  "NCE-0017-C": {"sector": "ZONE-NULL", "clearance": "RESTRICTED", "status": "INACTIVE"},
}

access_codes = [
  ("NCE-0091-A", "ZONE-NULL", "0000"),
  ("NCE-0042-B", "ZONE-NULL", "0000"),
  ("NCE-0017-C", "ZONE-NULL", "0000"),
]

location = "ZONE-NULL"
frequency = "000.0"
window = "NCE-0091-A"
response = "NCE-0042-B"`,path:"02 - Field Training/M-06-TRANSMISSION-Text_Objects.md"},{id:"M-07",role:"briefing",kind:"mission",arc:"I",chapter:"02 - Field Training",frontmatter:{mission_type:"briefing",links_to:"02 - Field Training/M-07-TRANSMISSION-Search_and_Replace",locked:!0,tags:["briefing","tier-2"],sticker:"lucide//search",color:"#66cc66"},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  INCOMING — CIPHER                       ║
║  BRIEFING: M-07 // SEARCH AND REPLACE    ║
║  Clearance: GHOST OPERATOR              ║
╚══════════════════════════════════════════╝
\`\`\`

\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP — CONGLOMERATE OF REGULATED PROCESSES                      ║
║  Workforce Optimization Bureau — Sector 7 Division               ║
╠══════════════════════════════════════════════════════════════════╣
║  Document Type  : Quarterly Workforce Optimization Report        ║
║  Report Period  : Q1 2047 // Sector 7                            ║
║  Classification : Internal — HR Administration                   ║
║  Audit Code     : WOR-2047-Q1-0047                               ║
║  Generator      : Workforce Analytics Engine v3.1 (Automated)    ║
║  Reviewer       : None — No human review required                ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

**SECTOR 7 — Q1 2047 OPTIMIZATION SUMMARY**

Total registered personnel: 1,204
Efficiency corrections processed: 17
Compliance index: 93.1% (Target: 95.0%) — *variance flagged for Q2 review*
Non-compliant entity resolutions: 5

Per Directive 12.4(a), all entity designations within this document have been standardized to assigned case numbers. Name-based identifiers introduce inconsistency and are not recognized by Workforce Analytics Engine v3.1.

---

**NON-COMPLIANT ENTITY RESOLUTIONS — Q1 2047**

| Case No.  | Infraction Category                                    | Resolution                                      |
|-----------|--------------------------------------------------------|-------------------------------------------------|
| NE-4471   | Cat. 7 — Legacy Infrastructure Usage. Sustained.       | Permanent Reclassification. Network access suspended. Employer notification transmitted. |
| NE-4489   | Cat. 3 — Unproductive Ideation. Repeat infraction.     | Reclassification Level 2. Productivity audit initiated. |
| NE-4501   | Cat. 11 — Unauthorized Resource Consumption.           | Resource Reallocation. Sector transfer pending. |
| NE-4522   | Cat. 3 — Unproductive Ideation. First occurrence.      | Efficiency Correction Level 1. Monitoring flag active. |
| NE-4558   | Cat. 7 — Legacy Infrastructure Usage. First occurrence.| Reclassification Level 1. Compliance re-onboarding scheduled. |

---

*All resolutions executed within standard processing windows. No delays recorded.*
*Affected entities have been notified via automated transmission per HR Protocol 9.2.*
*This report has been generated automatically. No human review required.*

---

> [!note] CIPHER — Intercepted // Workforce Optimization Bureau
> Five reclassifications this quarter. All of them ours.
>
> CORP doesn't use names in these reports. Every person gets a case number. Per Directive 12.4(a) — systematic substitution, applied to every non-compliant entity in the document. Every instance.
>
> Your job: restore the original designations. In drill terms, practice the command. \`:%s/NE-4471/CELL-DELTA/g\` replaces every \`NE-4471\` with \`CELL-DELTA\` across the file. Work through the file case by case.
>
> Learn the command. Then use it.


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Find and replace the systematic substitution throughout the document.
>
> > [!tip] SKILLS
> > \`/pattern\` \`n\` \`N\`, \`:%s/old/new/g\`, \`:%s/old/new/gc\`, \`cgn\` \`.\`
>
> > [!success] +30 XP
>
> → **[[_content/02 - Field Training/M-07-TRANSMISSION-Search_and_Replace|M-07-TRANSMISSION-Search_and_Replace]]** — open to begin. Timer starts on file open.`,path:"02 - Field Training/M-07-BRIEFING-Personnel_Matrix.md"},{id:"M-07",role:"transmission",kind:"mission",arc:"I",chapter:"02 - Field Training",frontmatter:{mission_id:"M-07",title:"Search and Replace — f / ?",tier:"🟡 FIELD TRAINING",xp_reward:30,completed:!1,difficulty:4,category:"search",tags:["vim/search","vim/replace","field-training"],sticker:"lucide//search",color:"#ffaa00",summary:"Find targets in seconds. f, F, /, ?, n, N, * and :s/old/new/ — tracking like a Ghost.",why:"f, /, n — you don't read a file looking for the mark, you tell the tool to put the cursor on it.",mission_type:"practice",locked:!0},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  [RESISTANCE — INTERNAL]                                         ║
║  Sector 7 — Personnel Matrix Fragment                            ║
╠══════════════════════════════════════════════════════════════════╣
║  Source         : GHOST pull // Workforce Optimization extract   ║
║  Period         : 2047-03-15                                     ║
║  Distribution   : Cell-delta training use only                   ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

CELL-DELTA-01 — ZONE-7-CLUSTER, field operative, rotation A
CELL-DELTA-02 — ZONE-7-CLUSTER, intelligence, rotation B
CELL-DELTA-03 — ZONE-7-CLUSTER, logistics, rotation A
CELL-DELTA-04 — ZONE-7-CLUSTER, security, rotation C
CELL-DELTA-05 — ZONE-7-CLUSTER, communications, rotation B
CELL-DELTA-06 — ZONE-7-CLUSTER, medical, rotation A

Rendezvous: ZONE-7-CLUSTER at 23:00
Fallback: ZONE-7-CLUSTER sub-level, 23:30
Abort signal: ZONE-7-CLUSTER code broadcast on 441.7

> [!note] GHOST — Intercepted
> ZONE-7-CLUSTER is not the location.
> I ran the delta on the handoff records twice. The substring appears nine times. CORP's substitution tool points teams to their surveillance checkpoint.
> Correct term: RELAY-CLUSTER-7.
> There are 9 substitutions to replace.`,path:"02 - Field Training/M-07-TRANSMISSION-Search_and_Replace.md"},{id:"M-08",role:"briefing",kind:"mission",arc:"I",chapter:"02 - Field Training",frontmatter:{mission_type:"briefing",links_to:"02 - Field Training/M-08-TRANSMISSION-Corrupted_Transmission",locked:!0,tags:["briefing","tier-2"],sticker:"lucide//zap",color:"#ffaa00"},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  INCOMING — WRAITH + CIPHER              ║
║  BRIEFING: M-08 // OPERATION RAVEN       ║
║  Clearance: GHOST OPERATOR              ║
╚══════════════════════════════════════════╝
\`\`\`

> [!danger] WRAITH
> *"CORP intercepted the archive transmission. The original is a poem — our next handoff is encoded in it. They replaced words, shifted lines, injected garbage.*
> *Everything you've learned — modes, navigation, word movement, operators, text objects, search and replace. All of it.*
> *Restore the poem. Vim only.*
> *Clock is running."*

> [!quote] CIPHER
> *"The poem is Poe's The Raven. Clean version in [[99-THE_RAVEN|99-THE_RAVEN]] for reference.*
> *Every \`Nevermore\` you recover is the same word.*
> *Work fast. Work clean."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Fully restore the corrupted Raven transmission.
>
> > [!tip] SKILLS
> > All of Tier 2 — combined application
>
> > [!success] +35 XP
>
> → **[[_content/02 - Field Training/M-08-TRANSMISSION-Corrupted_Transmission|M-08-TRANSMISSION-Corrupted_Transmission]]** — open to begin. Timer starts on file open.`,path:"02 - Field Training/M-08-BRIEFING-Ghost_Transmission.md"},{id:"M-08",role:"transmission",kind:"mission",arc:"I",chapter:"02 - Field Training",frontmatter:{mission_id:"M-08",title:"Corrupted Transmission — Operation RAVEN",tier:"🟡 FIELD TRAINING",xp_reward:35,completed:!1,difficulty:5,category:"mission",tags:["vim/combined","field-training","story-mission"],sticker:"lucide//zap",color:"#ffaa00",summary:"First real mission. CORP corrupted a Resistance transmission. Repair it with everything you've learned.",why:"First live repair: CORP corrupted the signal, and only everything you've drilled puts it back together.",mission_type:"practice",locked:!0},body:`\`\`\`ascii-glitch
╔══════════════════════════════════════════╗
║  MISSION M-08 // OPERATION RAVEN         ║
║  Tier: FIELD TRAINING  //  +35 XP        ║
║  Clearance: GHOST OPERATOR              ║
╚══════════════════════════════════════════╝
\`\`\`

> [!danger] WRAITH
> *"Archive transmission corrupted in transit. The original is a poem — our next handoff is encoded in it.*
> *Everything you've learned. All of it.*
> *Restore the poem. Vim only.*
> *Clock is running."*

> [!quote] CIPHER
> *"Poe's The Raven. Clean version in [[99-THE_RAVEN]] for reference.*
> *Every \`Nevermore\` you recover is the same word.*
> *Work fast. Work clean."*

---

\`\`\`
CORRUPTED TRANSMISSION // Source: Archive Relay // Classification: RESISTANCE EYES ONLY

Once upon a ██████████ dreary, while I pondered, weak and weary,
REDACTED REDACTED REDACTED volume of REDACTED lore—
	While I nodded, nearly napping, suddenly there came a tapping,
As of some one gently rapping, rapping at my chamber door.
"'Tis some SURVEILLANCE," I muttered, "MONITORING at my chamber door—
		Only this and nothing more."

[LINE REMOVED BY AUTOMATED CONTENT HARMONIZATION ENGINE v4.1]
And each separate dying ember wrought its ghost upon the floor;
Eagerly I wished the ████████;—vainly I had sought to borrow
	From my books surcease of sorrow—sorrow for the lost REDACTED—
For the rare and radiant maiden whom the angels name REDACTED—
Nameless here for EVERMORE.

>> COMPLIANCE: This transmission has been flagged under Directive §441. <<
>> Subversive literature references scheduled for automated reclassification. <<
\`\`\`

---

Note: The corruption-signature follows the standard NEVERMORE profile — character-level injection (█ glyphs), word-substitution (REDACTED, SURVEILLANCE, MONITORING, EVERMORE), line-level deletion ([LINE REMOVED]), and embedded compliance-banners. Use the full Tier-2 toolkit.

Compare the restored form against [[99-THE_RAVEN]] — first two stanzas should match exactly.`,path:"02 - Field Training/M-08-TRANSMISSION-Corrupted_Transmission.md"},{id:"M-09",role:"briefing",kind:"mission",arc:"I",chapter:"03 - Deep Infiltration",frontmatter:{mission_type:"briefing",links_to:"03 - Deep Infiltration/M-09-TRANSMISSION-Marks_and_Macros",locked:!0,tags:["briefing","tier-3"],sticker:"lucide//cpu",color:"#00e5ff"},body:"```ascii\n╔══════════════════════════════════════════╗\n║  INCOMING — CIPHER                       ║\n║  BRIEFING: M-09 // MARKS AND MACROS      ║\n║  Clearance: DEEP COVER                   ║\n╚══════════════════════════════════════════╝\n```\n\n> [!quote] CIPHER\n> *\"You've reached Deep Infiltration. GHOST pulled this one from a memo relay inside CORP's infrastructure division — a Register-2 chronology. Still current. They don't know we have it.*\n> *NEVERMORE hit it in transit. This time the corruption is systematic: every line with a timestamp carries the same prefix injection. Identical, repeating, twelve times.*\n> *Manual repair would take an hour.*\n> *`ma` — set mark a. `'a` — jump back. `qa` — record into register a. `q` — stop. `@a` — replay. `@@` — replay last.*\n> *Record the repair once. Replay on every matching line.*\n> *Read the pattern before you start recording. A bad macro repeated thirty times is thirty times wrong.\"*\n\n\n> [!abstract] DIRECTIVE\n> > [!warning] OBJECTIVE\n> > Restore a CORP internal memo with systematic line-level corruption.\n>\n> > [!tip] SKILLS\n> > `ma` `'a` `` `a ``, `qa` `q` `@a` `@@`, `:norm`\n>\n> > [!success] +50 XP\n>\n> → **[[_content/03 - Deep Infiltration/M-09-TRANSMISSION-Marks_and_Macros|M-09-TRANSMISSION-Marks_and_Macros]]** — open to begin. Timer starts on file open.",path:"03 - Deep Infiltration/M-09-BRIEFING-CORP_Internal_Memo.md"},{id:"M-09",role:"transmission",kind:"mission",arc:"I",chapter:"03 - Deep Infiltration",frontmatter:{mission_id:"M-09",title:"Marks, Macros & Registers",tier:"🔵 DEEP INFILTRATION",xp_reward:50,completed:!1,difficulty:7,category:"advanced",mission_type:"practice",locked:!0,unlock_requirement:"DEEP COVER level (186+ XP)",tags:["vim/macros","vim/marks","vim/registers","deep-infiltration"],sticker:"lucide//lock",color:"#0066ff",summary:"[LOCKED] Marks, Macros, Registers. Automation at operator level. Available after DEEP COVER.",why:"Record the fix once, mark your ground, and let q and @ do the same work CORP would make you do by hand."},body:`CORP INTERNAL CHRONOLOGY — HARMONIZATION ENGINE OPERATIONS
Source: Operations Review // Classification: Restricted Circulation
Document Code: HEO-2047-Q2-0337

RE: ENGINE v4.1 — PHASE III DEPLOYMENT STATUS

PHASE III — Sector Deployment Cycle
[TS-2047-04-01] Engine deployment posture: within operational envelope
[TS-2047-04-01] Sector allocation: reviewed against Q1 forecast band
[TS-2047-04-01] Coordination tier: Audit Division oversight, standard
[TS-2047-04-07] Harmonization Engine v4.1 coverage: 67% of monitored endpoints
[TS-2047-04-07] Remaining endpoint classifications: scheduled for Q2 rollout
[TS-2047-04-07] Target coverage: 100% of monitored endpoints by Q2 close
[TS-2047-04-14] Anomaly signature logged: NODE-7734, non-random pattern
[TS-2047-04-14] Classification issued: Informational — no escalation required
[TS-2047-04-14] Cross-reference disposition: filed against subsequent windows
[TS-2047-04-21] Legacy-protocol endpoint traffic: down 34% from Q1 baseline
[TS-2047-04-21] Harmonization intercept rate: within forecast band
[TS-2047-04-21] Phase IV coverage expansion: scheduled for Q3 rollout

Assessment: Phase III operational metrics are within specification. Phase IV scheduling falls within standard rollout cadence.

Document generated automatically. No human review required.

Note: Timestamps are corrupted. Format should be:
[2047-04-01] not [TS-2047-04-01]
There are 12 lines affected. Use a macro.`,path:"03 - Deep Infiltration/M-09-TRANSMISSION-Marks_and_Macros.md"},{id:"M-10",role:"briefing",kind:"mission",arc:"I",chapter:"03 - Deep Infiltration",frontmatter:{mission_type:"briefing",links_to:"03 - Deep Infiltration/M-10-TRANSMISSION-Registers",locked:!0,tags:["briefing","tier-3"],sticker:"lucide//file-stack",color:"#00e5ff"},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  INCOMING — CIPHER                       ║
║  BRIEFING: M-10 // NAMED REGISTERS       ║
║  Clearance: DEEP COVER                   ║
╚══════════════════════════════════════════╝
\`\`\`

> [!quote] CIPHER
> *"This one came through colder channels than usual. Read it carefully before you start.*
> *CORP has begun a new tactic. They know pulled files are reaching us. Their counter is simple: swap attribution inside the file itself. Two chronology blocks, same document, dates landing under the wrong phase headers. The numbers are real. The placement is not.*
> *Restore the pairing. The dates for Sector 7 belong under Sector 7. The dates for Sector 12 belong under Sector 12.*
> *You cannot solve this with one register. Cut the first block, cut the second, and the default register has already forgotten the first. That is the lesson.*
> *\`"a4dd\` — cut four lines into register a. \`"b4dd\` — cut four lines into register b. \`"ap\` and \`"bp\` — paste where each belongs.*
> *Two registers. Two cuts. Two pastes. Read the pattern before you move.*
> *The note at the bottom of the file is for you. Leave it in place. Future operatives will see this tactic again."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Restore a CORP chronology by swapping two attribution blocks back into correct phase positions.
>
> > [!tip] SKILLS
> > \`"add\`, \`"bdd\`, \`"ap\`, \`"bp\`, named-register paste ordering
>
> > [!success] +55 XP
>
> → **[[_content/03 - Deep Infiltration/M-10-TRANSMISSION-Registers|M-10-TRANSMISSION-Registers]]** — open to begin. Timer starts on file open.`,path:"03 - Deep Infiltration/M-10-BRIEFING-Swapped_Chronology.md"},{id:"M-10",role:"transmission",kind:"mission",arc:"I",chapter:"03 - Deep Infiltration",frontmatter:{mission_id:"M-10",title:"Named Registers",tier:"🔵 DEEP INFILTRATION",xp_reward:55,completed:!1,difficulty:7,category:"advanced",mission_type:"practice",locked:!0,unlock_requirement:"DEEP COVER level (186+ XP)",tags:["vim/registers","deep-infiltration"],sticker:"lucide//lock",color:"#0066ff",summary:"[LOCKED] Named registers — two-block swap. The default register is not enough. Available after DEEP COVER.",why:"The default register is one slot; name your own and you can hold two payloads and swap them clean."},body:`CORP INTERNAL CHRONOLOGY — OPERATIONS REVIEW
Source: Deep Infiltration // Classification: RESTRICTED
Document Code: OCR-2047-Q2-0441

RE: CONSOLIDATED ATTRIBUTION — DUAL-PHASE COMPLIANCE OPERATION

PHASE ALPHA — Sector 7 Enforcement Cycle
[2047-05-17] Surveillance coverage expanded: +22.1% monitored endpoints
[2047-05-24] Legacy-protocol detection threshold adjusted downward by factor 1.5
[2047-05-31] Non-compliant entity resolutions processed: 14 (cumulative)
[2047-06-07] Sector productivity index: 92.8%, within forecast band
PHASE BETA — Sector 12 Enforcement Cycle
[2047-04-12] Surveillance coverage expanded: +18.4% monitored endpoints
[2047-04-19] Legacy-protocol detection threshold adjusted downward by factor 1.3
[2047-04-26] Non-compliant entity resolutions processed: 9 (cumulative)
[2047-05-03] Sector productivity index: 94.1%, within forecast band
Assessment: Both phases concluded within operational tolerance. Phase Beta resolution count exceeds Phase Alpha by 55.6%, consistent with Sector 12 baseline population density.

Document generated automatically. No human review required.

Note: Two 4-line chronology blocks have been swapped under their phase headers. The dates under PHASE ALPHA belong under PHASE BETA, and vice versa. A single cut-and-paste will not work — the default register overwrites on the second cut. Use two named registers.`,path:"03 - Deep Infiltration/M-10-TRANSMISSION-Registers.md"},{id:"M-11",role:"briefing",kind:"mission",arc:"I",chapter:"03 - Deep Infiltration",frontmatter:{mission_type:"briefing",links_to:"03 - Deep Infiltration/M-11-TRANSMISSION-Bulletin_Drift",locked:!0,tags:["briefing","tier-3"],sticker:"lucide//file-diff",color:"#00e5ff"},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  INCOMING — CIPHER                       ║
║  BRIEFING: M-11 // BULLETIN DRIFT        ║
║  Clearance: DEEP COVER                   ║
╚══════════════════════════════════════════╝
\`\`\`

> [!quote] CIPHER
> *"GHOST pulled the pre-release from Communications' staging server before sign-off. That file is FRAGMENT-10. Then CORP's Communications division ran a sanitation pass. Four claims were rewritten between FRAGMENT-10 and the version distributed to Sector 7 residents. Your job is to restore them.*
> *Open FRAGMENT-10 in a split pane right — Cmd+Option+Click the link at the bottom. You need both files visible at once. The diff is the work.*
> *In the FRAGMENT-10 pane: cursor on the original line, \`yy\`. Switch panes with Ctrl+Tab. In this pane: cursor on the sanitized line, \`Vp\`. That overwrites the line with what GHOST pulled. Four times.*
> *Ctrl-W h and Ctrl-W l move between panes if your setup supports it. Either way works.*
> *The diff doesn't lie. Trust the diff."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Restore four sanitized claims in a CORP citizen bulletin against the GHOST-intercepted pre-release draft.
>
> > [!tip] SKILLS
> > \`Ctrl+Tab\`, \`yy\`, \`Vp\`, cross-pane line-transfer workflow
>
> > [!success] +55 XP
>
> → **[[_content/03 - Deep Infiltration/M-11-TRANSMISSION-Bulletin_Drift|M-11-TRANSMISSION-Bulletin_Drift]]** — open to begin. Timer starts on file open.
>
> → **[[_content/FRAGMENTS/FRAGMENT-10-Pre_Release_Sector_7_Bulletin|FRAGMENT-10-Pre_Release_Sector_7_Bulletin]]** — GHOST's pull. Open in split pane right (Cmd+Option+Click).`,path:"03 - Deep Infiltration/M-11-BRIEFING-Bulletin_Drift.md"},{id:"M-11",role:"transmission",kind:"mission",arc:"I",chapter:"03 - Deep Infiltration",frontmatter:{mission_id:"M-11",title:"Bulletin Drift",tier:"🔵 DEEP INFILTRATION",xp_reward:55,completed:!1,difficulty:7,category:"advanced",mission_type:"practice",locked:!0,unlock_requirement:"M-10 completed",tags:["vim/splits","deep-infiltration"],sticker:"lucide//columns-2",color:"#0066ff",summary:"[LOCKED] Split-pane diff reconciliation — restore a CORP citizen bulletin against its pre-release draft. Available after M-10.",why:"Two panes, one truth — Ctrl-W lets you read the draft and rebuild the leak side by side without losing your place."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP — CONGLOMERATE OF REGULATED PROCESSES                      ║
║  Office of Sector Communications — Sector 7 Division             ║
╠══════════════════════════════════════════════════════════════════╣
║  Document Type  : Citizen Bulletin — Public Distribution         ║
║  Edition        : 14 / Quarter 2 / 2047                          ║
║  Revision       : FINAL — 2047-06-27T14:00:00Z                   ║
║  Classification : PUBLIC DISTRIBUTION — ALL RESIDENTS            ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

---

**SECTOR 7 CITIZEN BULLETIN — Q2 2047 // EDITION 14**

---

**PRODUCTIVITY & COMPLIANCE**

Your sector's productivity index for Q2 2047 registered at **94.3%**, within projected parameters.

Residents are reminded that productivity thresholds are monitored continuously. Threshold-level incidents have been logged and forwarded to Workforce Optimization Bureau.

---

**ENFORCEMENT & RESOLUTION SERVICES**

Enhanced coverage coordination has been facilitated across all residential zones during the Q2 period.

Resolution assistance services remain active. Residents experiencing classification queries are directed to submit formal clarification requests through approved intake channels.

---

**HARMONIZATION COVERAGE**

Harmonization Engine coverage within Sector 7 expanded by **+34.7% monitored endpoints** during Q2.

Legacy-protocol endpoint incidents logged in the sector: **187 cases receiving assistance**.

All incidents have been forwarded to the appropriate classification tier for processing.

---

**SECTOR OUTLOOK**

Sector 7 compliance indicators reflect a stable compliance trajectory entering Q3. Residents can expect continued operational support through the end of the compliance period.

Residents are advised to review their current productivity classifications and submit any outstanding compliance documentation before the Q3 review window opens.

---

Office of Sector Communications — Sector 7 Division
Bulletin Edition 14 — Q2 2047
Your cooperation is noted and recorded.

Note: Four claims in this bulletin differ from the pre-release draft intercepted by GHOST. Open FRAGMENT-10 in a split pane right, place your cursor on the original line, \`yy\` to yank — switch panes, cursor on the sanitized line, \`Vp\` to overwrite.`,path:"03 - Deep Infiltration/M-11-TRANSMISSION-Bulletin_Drift.md"},{id:"M-12",role:"briefing",kind:"mission",arc:"I",chapter:"03 - Deep Infiltration",frontmatter:{mission_type:"briefing",links_to:"03 - Deep Infiltration/M-12-TRANSMISSION-Anomaly_Classification",locked:!0,tags:["briefing","tier-3"],sticker:"lucide//file-search",color:"#00e5ff"},body:`\`\`\`ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: M-12 // ANOMALY CLASSIFICATION    ║
║  Clearance: DEEP COVER                       ║
╚══════════════════════════════════════════════╝
\`\`\`

> [!quote] CIPHER
> *"This is the last document we have from GHOST. Pulled before they went dark. Pattern Analysis Unit's Q3 follow-up — same hypothesis from the Q2 audit, now escalated to active investigation.*
> *They're closer than they know. Not close enough yet. But the report mixes what they found with what their engines collect automatically. Noise and signal in the same file.*
> *Three corruption layers. Standard-Monitoring baselines that don't belong in an Audit report. Legacy-Protocol entries filed under a category that isn't theirs. And one section where Pattern-Analysis entries sit under carry-over residue from adjacent reports.*
> *Ex mode. Global commands.*
> *\`:g/pattern/d\` deletes every line matching. \`:v/pattern/d\` keeps only lines matching. Pair \`:g\` with a substitute — \`:g/X/s/Y/Z/\` — and you reclassify in place.*
> *Scope the command when you don't want it global. \`V\` selects lines; \`:\` auto-fills the range.*
> *Fix it before the decoder sees it. What remains is what we need."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Apply a three-stage Ex-mode cleanup to a Pattern Analysis Unit anomaly report.
>
> > [!tip] SKILLS
> > \`:g/pattern/d\`, \`:v/pattern/d\`, \`:g/pattern/s/X/Y/\`, range-scoping via visual selection \`'<,'>\`
>
> > [!success] +60 XP
>
> → **[[_content/03 - Deep Infiltration/M-12-TRANSMISSION-Anomaly_Classification|M-12-TRANSMISSION-Anomaly_Classification]]** — open to begin. Timer starts on file open.`,path:"03 - Deep Infiltration/M-12-BRIEFING-Anomaly_Classification.md"},{id:"M-12",role:"transmission",kind:"mission",arc:"I",chapter:"03 - Deep Infiltration",frontmatter:{mission_id:"M-12",title:"Anomaly Classification",tier:"🔵 DEEP INFILTRATION",xp_reward:60,completed:!1,difficulty:8,category:"advanced",mission_type:"practice",locked:!0,unlock_requirement:"M-11 completed",tags:["vim/ex-mode","vim/global-command","deep-infiltration"],sticker:"lucide//file-search",color:"#0066ff",summary:"[LOCKED] Ex-mode pattern purge — three-stage cleanup of a Pattern Analysis Unit anomaly report. Available after M-11.",why:"A noisy report doesn't get cleaned line by line — :g runs one verdict across every matching line at once."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP — CONGLOMERATE OF REGULATED PROCESSES                      ║
║  Internal Audit Division — Pattern Analysis Unit                 ║
╠══════════════════════════════════════════════════════════════════╣
║  Document Type  : Advanced Anomaly Tracking — Q2 Follow-Up       ║
║  Scope          : Cross-Sector Pattern Analysis, Q2 2047         ║
║  Classification : Internal — Audit Division Only                 ║
║  Audit Code     : AAR-2047-Q2-0147 / PAU-CS-0089                 ║
║  Sample Window  : 2047-04-01 to 2047-06-03                       ║
║  Generated      : 2047-06-05T14:33:12Z (Automated)               ║
║  Reviewer       : Pattern Analysis Unit — Tier 2 Analyst         ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

## Executive Summary

Cross-sector pattern analysis for Q2 2047 builds on the statistical baselines established in AAR-2047-0214 (Q1 Initial Audit). The exogenous-origin working hypothesis has been retained across the sample window. Substring concordance has registered above the Q1 threshold in three of seven monitored sectors.

This report escalates the analysis tier from observation (Q1) to active investigation (Q2). Section 3 enumerates the anomaly signatures currently under active classification review.

## Sector Anomaly Tracking — Standard Monitoring

Standard Monitoring — Sector 3 — Window 2047-04-04 to 2047-04-18 — Baseline nominal
Standard Monitoring — Sector 5 — Window 2047-04-11 to 2047-04-25 — Baseline nominal
Standard Monitoring — Sector 7 — Window 2047-04-18 to 2047-05-01 — Baseline within forecast band
Standard Monitoring — Sector 9 — Window 2047-04-25 to 2047-05-08 — Baseline nominal
Standard Monitoring — Sector 12 — Window 2047-05-01 to 2047-05-15 — Baseline within forecast band
Standard Monitoring — Sector 14 — Window 2047-05-08 to 2047-05-22 — Baseline nominal
Standard Monitoring — Sector 16 — Window 2047-05-15 to 2047-05-29 — Baseline within forecast band
Standard Monitoring — Sector 18 — Window 2047-05-22 to 2047-06-01 — Baseline nominal

## Legacy-Protocol Reclassifications

Legacy-Protocol Session 7734-07-A — Sector 7 — Cat. 7 Non-Compliance
Legacy-Protocol Session 7734-07-B — Sector 7 — Cat. 7 Non-Compliance
Legacy-Protocol Session 7734-12-A — Sector 12 — Cat. 7 Non-Compliance
Legacy-Protocol Session 7734-12-B — Sector 12 — Cat. 7 Non-Compliance
Legacy-Protocol Session 7734-16-A — Sector 16 — Cat. 7 Non-Compliance

## Active Investigations — Anomaly Signatures

Anomaly Signature PAU-Σ-0147 — cross-sector byte-position skew, sustained
Cross-reference Query 2047-Q2-441 — retrospective backfill — no match
Anomaly Signature PAU-Σ-0148 — inter-injection distance deviation, Sector 7
Retrospective Flag 2047-Q1-carryover — disposition: filed
Anomaly Signature PAU-Σ-0149 — substring concordance, Sectors 3+7+12
Cross-reference Query 2047-Q2-502 — cross-sector correlation — inconclusive
Anomaly Signature PAU-Σ-0150 — output-layer manipulation hypothesis, sustained
Retrospective Flag 2046-Q4-archive — archived per DS-114-C
Anomaly Signature PAU-Σ-0151 — endpoint diversity elevation, Sector 7
Anomaly Signature PAU-Σ-0152 — compression-ratio anomaly, multi-sector

## Closing Statement

This report was generated by Pattern Analysis Unit automated tooling following the Q2 2047 statistical audit cycle. All figures are derived from Harmonization Engine v4.1 output logs and cross-sector sample aggregation. No manual data entry was performed.

Distribution: Audit Division only. Operational distribution is subject to Tier 2 reviewer approval at follow-on analysis cycle.

\`\`\`ascii
── END OF REPORT ───────────────────────────────────────────────────
   CORP — Internal Audit Division — Pattern Analysis Unit
   AAR-2047-Q2-0147 / PAU-CS-0089 — 2047-06-05T14:33:12Z
   Automated. No human review required for distribution at this tier.
────────────────────────────────────────────────────────────────────
\`\`\`

Note: This PAU report carries three corruption classes from transmission.
(1) Sector Anomaly Tracking — Standard Monitoring entries are Engine-scanner-baseline injections that do not belong in a PAU report. Remove them.
(2) Legacy-Protocol Reclassifications — entries are classified as Cat. 7 Non-Compliance, but the canonical PAU-tier classification per DS-114-C is Cat. 5 Factual Non-Compliance. Correct in-place.
(3) Active Investigations — Anomaly Signatures — this section should contain only Anomaly Signature entries. Cross-reference Queries and Retrospective Flags are residual content from adjacent reports. Scope the cleanup to this section only.`,path:"03 - Deep Infiltration/M-12-TRANSMISSION-Anomaly_Classification.md"},{id:"M-13",role:"briefing",kind:"mission",arc:"I",chapter:"04 - Chrome Raven",frontmatter:{mission_type:"briefing",links_to:"04 - Chrome Raven/M-13-TRANSMISSION-Case_Cipher_Decryption",locked:!0,tags:["briefing","tier-4"],sticker:"lucide//type",color:"#cc66ff"},body:"```ascii\n╔══════════════════════════════════════════════╗\n║  INCOMING — CIPHER                           ║\n║  BRIEFING: M-13 // CASE-CIPHER DECRYPTION    ║\n║  Clearance: CHROME RAVEN                     ║\n╚══════════════════════════════════════════════╝\n```\n\n> [!quote] CIPHER\n> *\"GHOST sent the first decoded fragment from RAVEN's signal. It came through in case.*\n> *The letters were pulled clean — the case was not. NEVERMORE's auto-processing randomized capital and lowercase across the message. You normalize to read.*\n> *`~` toggles one character. `viw` then `u` or `U` scopes to a word. `gu{motion}` / `gU{motion}` for a range. `guu` / `gUU` for a whole line.*\n> *This is the entry of the signal-channel. RAVEN is brief.*\n> *Restore the case. The walk is the message.\"*\n\n\n> [!abstract] DIRECTIVE\n> > [!warning] OBJECTIVE\n> > Restore the intended casing of a GHOST-decoded signal fragment.\n>\n> > [!tip] SKILLS\n> > `~`, `viwu` / `viwU`, `gu{motion}` / `gU{motion}`, `guu` / `gUU`, `g~~`\n>\n> > [!success] +55 XP\n>\n> → **[[_content/04 - Chrome Raven/M-13-TRANSMISSION-Case_Cipher_Decryption|M-13-TRANSMISSION-Case_Cipher_Decryption]]** — open to begin. Timer starts on file open.",path:"04 - Chrome Raven/M-13-BRIEFING-Case_Cipher_Decryption.md"},{id:"M-13",role:"transmission",kind:"mission",arc:"I",chapter:"04 - Chrome Raven",frontmatter:{mission_id:"M-13",title:"Case-Cipher Decryption",tier:"🟣 CHROME RAVEN",xp_reward:55,completed:!1,difficulty:7,category:"advanced",mission_type:"practice",locked:!0,unlock_requirement:"M-12 completed",tags:["vim/case","vim/case-conversion","chrome-raven"],sticker:"lucide//type",color:"#9933ee",summary:"[LOCKED] Case-conversion decryption — restore intended casing of a GHOST-decoded RAVEN signal-fragment. Available after M-12.",why:"Casing carries meaning CORP scrambled; gU, gu and ~ flip it back without you retyping a single letter."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  GHOST — DECODED FRAGMENT // Signal-01                           ║
║  Source         : NEVERMORE corruption-layer — Q2 2047 archive   ║
║  Decoder        : case-seed derived from FRAGMENT-09 cross-sample║
║  Extraction     : pre-dark pull // cross-file concordance pass   ║
║  Classification : Resistance — signal-channel (post-LOOT-03)     ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] GHOST — Intercepted // Decoded Fragment 01
> First signal-fragment from RAVEN's channel. I ran the case-delta-pass three times — the pattern holds across independent corruption-files.
> CORP's auto-processing randomizes case across decoded output. Letters are intact. Case is not.
> Normalize to intended casing to read clean. Four lines including signature.

---

read THE CASE as weight.
every CAPITAL is a step. EVERY LOWERCASE, the pause between.
YOU RESTORED THE WALK.
— rvn

---

Note: RAVEN's message emerged from case-normalization. GHOST's decoder reconstructed letters but case-randomized sections.
Restore intended casing:
- Line 1: starts with capital; mid-sentence words in normal prose case (not ALL-CAPS).
- Line 2: starts with capital; body in normal prose case.
- Line 3: starts with capital; body in lowercase.
- Signature: \`— RVN\` (RAVEN always signs in full capital).`,path:"04 - Chrome Raven/M-13-TRANSMISSION-Case_Cipher_Decryption.md"},{id:"M-14",role:"briefing",kind:"mission",arc:"I",chapter:"04 - Chrome Raven",frontmatter:{mission_type:"briefing",links_to:"04 - Chrome Raven/M-14-TRANSMISSION-Counter_Operations",locked:!0,tags:["briefing","tier-4"],sticker:"lucide//hash",color:"#cc66ff"},body:`\`\`\`ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: M-14 // COUNTER-OPERATIONS        ║
║  Clearance: CHROME RAVEN                     ║
╚══════════════════════════════════════════════╝
\`\`\`

> [!quote] CIPHER
> *"Second fragment from RAVEN's channel. GHOST's decoder gave us coordinates, but CORP's grid uses per-sector offsets. RAVEN encoded the true values relative to those offsets. You apply the offset-keys to read.*
> *Per-column increments. Five waypoints, two columns — REF and MARK. Each column has its own offset-key. All rows in that column take the same shift.*
> *\`Ctrl+v\` enters visual-block mode — you select a rectangle across lines. Inside the block, \`Ctrl+a\` increments each number by 1. Prefix with a count: \`3<C-a>\` adds 3 to every number in the block.*
> *Two passes. REF column first with its offset. MARK column second.*
> *RAVEN's note is at the bottom. Read it after the matrix is clean."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Apply per-column offset-keys to a Resistance extraction-coordinate-matrix.
>
> > [!tip] SKILLS
> > \`Ctrl+v\` (visual-block), \`Ctrl+a\` / \`Ctrl+x\` (increment / decrement), count-prefix (\`3<C-a>\`, \`7<C-a>\`)
>
> > [!success] +60 XP
>
> → **[[_content/04 - Chrome Raven/M-14-TRANSMISSION-Counter_Operations|M-14-TRANSMISSION-Counter_Operations]]** — open to begin. Timer starts on file open.`,path:"04 - Chrome Raven/M-14-BRIEFING-Counter_Operations.md"},{id:"M-14",role:"transmission",kind:"mission",arc:"I",chapter:"04 - Chrome Raven",frontmatter:{mission_id:"M-14",title:"Counter-Operations",tier:"🟣 CHROME RAVEN",xp_reward:60,completed:!1,difficulty:7,category:"advanced",mission_type:"practice",locked:!0,unlock_requirement:"M-13 completed",tags:["vim/numeric","vim/visual-block","vim/increment","chrome-raven"],sticker:"lucide//hash",color:"#9933ee",summary:"[LOCKED] Numeric increment + visual-block — apply offset-keys to a Resistance extraction-coordinate-matrix. Available after M-13.",why:"Numbers in a column move together — visual-block plus increment shifts the whole matrix in one stroke."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CIPHER — EXTRACTION-MATRIX DRAFT // WORKING                     ║
║  Sector          : 7 North                                       ║
║  Source          : GHOST-decoder-chain (Signal-01 + 02 merged)   ║
║  Status          : coordinates pre-offset, signal-fragment clean ║
║  Classification  : Resistance — extraction-channel               ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Active-Planning Channel
> GHOST's decoder-chain produced the coordinate-matrix below. Raw values are relative to CORP's sector-grid — the offset-keys at the column-headers give the shift required to read absolute coordinates.
> Apply the shifts in-place. Don't touch the signal-fragment at the bottom — that came through clean from RAVEN's channel.

---

Extraction Matrix — Sector 7 North
Per-column offset-keys: +3 (REF), +7 (MARK)

  Waypoint Alpha:   REF-4217 MARK-1378
  Waypoint Beta:    REF-4222 MARK-1383
  Waypoint Gamma:   REF-4227 MARK-1388
  Waypoint Delta:   REF-4232 MARK-1393
  Waypoint Epsilon: REF-4237 MARK-1398

\`\`\`
>_ RAVEN-SIGNAL — decoded fragment 02
   The count is my language. They read words.
   They do not count.
   You increment what I whispered. The sum is the message.
   — RVN
\`\`\`

---

Note: CIPHER's draft-matrix. Offset-keys declared at the top but not yet applied to the numeric columns.
Apply the offsets:
- REF column: all five waypoint-values take +3.
- MARK column: all five waypoint-values take +7.
- The RAVEN-signal fragment is already clean. Do not modify.`,path:"04 - Chrome Raven/M-14-TRANSMISSION-Counter_Operations.md"},{id:"M-15",role:"briefing",kind:"mission",arc:"I",chapter:"04 - Chrome Raven",frontmatter:{mission_type:"briefing",links_to:"04 - Chrome Raven/M-15-TRANSMISSION-Pattern_Rewriting",locked:!0,tags:["briefing","tier-4"],sticker:"lucide//regex",color:"#cc66ff"},body:"```ascii\n╔══════════════════════════════════════════════╗\n║  INCOMING — CIPHER                           ║\n║  BRIEFING: M-15 // PATTERN REWRITING         ║\n║  Clearance: CHROME RAVEN                     ║\n╚══════════════════════════════════════════════╝\n```\n\n> [!quote] CIPHER\n> *\"Third fragment. GHOST's decoder-chain has merged the signals into a pattern-archive, but the format is still CORP's — bracketed codes, hyphenated descriptors. Restructure it into ours.*\n> *Regex with capture-groups. Very-magic mode with `\\v` makes the pattern readable. Parentheses around parts of the match mark capture-groups — the parts become `\\1`, `\\2`, `\\3` in the replacement and you rearrange them.*\n> *Three passes. First, restructure the entry-lines — three capture-groups in one substitute. Second, lift the classification-brackets into Markdown headings — one capture-group. Third, fix the archive-header.*\n> *RAVEN's fragment 03 is at the bottom. Read it after the format is clean — it tells us what comes next.\"*\n\n\n> [!abstract] DIRECTIVE\n> > [!warning] OBJECTIVE\n> > Transform a CORP-format pattern-archive into Resistance-format using capture-group regex.\n>\n> > [!tip] SKILLS\n> > `\\v` (very-magic mode), `(...)` (capture-groups), `\\1` / `\\2` / `\\3` (back-references), `\\d{N}` / `\\w+` / `.+` (character-classes with quantifiers)\n>\n> > [!success] +65 XP\n>\n> → **[[_content/04 - Chrome Raven/M-15-TRANSMISSION-Pattern_Rewriting|M-15-TRANSMISSION-Pattern_Rewriting]]** — open to begin. Timer starts on file open.",path:"04 - Chrome Raven/M-15-BRIEFING-Pattern_Rewriting.md"},{id:"M-15",role:"transmission",kind:"mission",arc:"I",chapter:"04 - Chrome Raven",frontmatter:{mission_id:"M-15",title:"Pattern Rewriting",tier:"🟣 CHROME RAVEN",xp_reward:65,completed:!1,difficulty:8,category:"advanced",mission_type:"practice",locked:!0,unlock_requirement:"M-14 completed",tags:["vim/regex","vim/substitute","vim/capture-groups","chrome-raven"],sticker:"lucide//regex",color:"#9933ee",summary:"[LOCKED] Advanced regex with capture-groups + back-references — transform signal-archive formats. Available after M-14.",why:"Capture what you keep, drop what you don't — back-references rewrite the format instead of you retyping it."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CIPHER — INTEL-ARCHIVE DRAFT // WORKING                         ║
║  Source          : GHOST-decoder-chain (Signals 01+02 merged)    ║
║  Composition     : Pattern Analysis Unit entries + classification║
║  Status          : CORP-format pending restructure               ║
║  Classification  : Resistance — extraction-channel               ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Active-Planning Channel
> GHOST's decoder-chain pushed the Pattern Analysis Unit records into a single archive. Three passes to bring it into our format — two structural regex-transforms plus a header-rename.
> RAVEN's fragment 03 sits at the bottom, in code-fence. Leave it alone.

---

Pattern Archive — Q3 2047 (CORP-format)

[CLASSIFICATION: CONFIRMED]
[ENTRY-0147]: pattern-01 byte-position skew
[ENTRY-0148]: pattern-02 inter-injection deviation
[ENTRY-0150]: pattern-04 output-layer manipulation

[CLASSIFICATION: PENDING]
[ENTRY-0149]: pattern-03 substring concordance
[ENTRY-0151]: pattern-05 endpoint diversity elevation

\`\`\`
>_ RAVEN-SIGNAL — decoded fragment 03
   Shape is older than syntax. CORP reads what you say.
   I write in how you say it. You found the shape.
   The next turn is mine.
   — RVN
\`\`\`

---

Note: Three substitutions to restructure.
- Entry-lines: \`[ENTRY-NNNN]: pattern-NN description\` → \`Pattern NN (NNNN) — description\`. Use \`\\v\` very-magic mode and three capture-groups.
- Classification-headers: \`[CLASSIFICATION: STATUS]\` → \`## Classification: STATUS\`. One capture-group.
- Archive-header: \`CORP-format\` → \`Resistance-format\`. Literal substitution (no capture-group needed).
- The RAVEN-signal fragment is clean. Do not modify.`,path:"04 - Chrome Raven/M-15-TRANSMISSION-Pattern_Rewriting.md"},{id:"M-16",role:"briefing",kind:"mission",arc:"I",chapter:"04 - Chrome Raven",frontmatter:{mission_type:"briefing",links_to:"04 - Chrome Raven/M-16-TRANSMISSION-Extraction_Window",locked:!0,tags:["briefing","tier-4","tier-4-capstone"],sticker:"lucide//target",color:"#cc66ff"},body:`\`\`\`ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: M-16 // EXTRACTION WINDOW         ║
║  Clearance: CHROME RAVEN  //  CAPSTONE       ║
╚══════════════════════════════════════════════╝
\`\`\`

> [!quote] CIPHER
> *"Capstone. Four documents, four threads — WRAITH's route, GHOST's coordinates, my auth-signature, CORP's countermeasure prediction. All of them have to be clean before the extraction-window opens.*
> *You use everything. Operators to strip injections. Visual-block to shift coordinates. Case-conversion for the signature. Global + regex for the prediction cleanup.*
> *Four sections. Four passes. No new tools — only the ones you already have.*
> *RAVEN's fragment 04 is at the bottom. Don't read it until the document is clean. It's the last piece."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Reconcile four extraction-threads in a single mission-file before the window closes.
>
> > [!tip] SKILLS
> > All Tier-1..4 composite — \`dd\`/\`3dd\` (operators), \`Ctrl+v\` + \`N<C-a>\` (visual-block + numeric), \`guu\`/\`viwu\` (case-conversion), \`:g/X/d\` + \`:%s/\\v.../.../\` with capture-groups (Ex + regex)
>
> > [!success] +80 XP
>
> → **[[_content/04 - Chrome Raven/M-16-TRANSMISSION-Extraction_Window|M-16-TRANSMISSION-Extraction_Window]]** — open to begin. Timer starts on file open.`,path:"04 - Chrome Raven/M-16-BRIEFING-Extraction_Window.md"},{id:"M-16",role:"transmission",kind:"mission",arc:"I",chapter:"04 - Chrome Raven",frontmatter:{mission_id:"M-16",title:"Extraction Window",tier:"🟣 CHROME RAVEN",xp_reward:80,completed:!1,difficulty:9,category:"mission",mission_type:"practice",locked:!0,unlock_requirement:"M-15 completed",tags:["vim/combined","vim/composite","chrome-raven","tier-4-capstone"],sticker:"lucide//target",color:"#9933ee",summary:"[LOCKED] Tier-4 capstone — four-section extraction reconciliation under 30-minute window. All Tier-1..4 skills applied. Available after M-15.",why:"The capstone gives you thirty minutes and four sections — everything you've learned, or the window closes."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  EXTRACTION WINDOW — FINAL RECONCILIATION                        ║
║  Timing          : T-30 minutes                                  ║
║  Threads         : WRAITH logistics / GHOST coords /             ║
║                    CIPHER auth-signature / CORP predictions      ║
║  Status          : all four documents pre-integration            ║
║  Classification  : Resistance — extraction-channel, sealed       ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Sealed Channel
> Four threads need to be clean before the window opens. Each section exercises a different skill-class from your training. Work top to bottom.
> RAVEN's fragment 04 sits at the bottom in code-fence. Do not read it until the document is clean.

---

## 1. Extraction Route — WRAITH

> [!note] WRAITH — Logistics
> Route is clean once the monitoring-injections are stripped.
> *I was wrong about the ghost.* Move the asset.

>> COMPLIANCE: Route-integrity review queued. <<
>> Monitoring on all nodes active. <<

Stage Alpha: Node 7-PRIMARY — 21:00
Stage Beta:  Node 7-SECONDARY — 21:12
Stage Gamma: Node 7-NORTH-RELAY — 21:28

>> COMPLIANCE: Automated scan cleared. <<

Stage Delta: Extraction Point — 21:44

---

## 2. Final Coordinates — GHOST

> [!note] GHOST — Coordinate Pass
> Final key-rotation. Ran the delta twice — the shift is clean.

Final key-rotation: +2 on all REF, +1 on all MARK

  Waypoint Alpha:   REF-4220 MARK-1385
  Waypoint Beta:    REF-4225 MARK-1390
  Waypoint Gamma:   REF-4230 MARK-1395

---

## 3. Handler Auth-Signature — CIPHER

> [!note] CIPHER — Auth-Handshake
> Signature format is all-lowercase for the sealed channel. Case-normalize before transmission.

auth-line-one: cipher-echo-alpha-SEVEN-TWO
AUTH-LINE-TWO: cipher-echo-BETA-FIVE-FOUR
Auth-Line-Three: CIPHER-ECHO-gamma-ONE-NINE

---

## 4. CORP Countermeasure Prediction — INTEL

> [!note] GHOST — Intel-Capture
> CORP's last predictive-tracking entries from before I went dark. Noise-lines interleaved. Strip them, then rewrite to our format.

[ENTRY-0152]: threat-alpha pattern-05 endpoint-diversity
[STANDARD-NOISE]: sector-nominal
[ENTRY-0153]: threat-alpha pattern-06 signal-concordance
[STANDARD-NOISE]: sector-within-band
[ENTRY-0154]: threat-beta pattern-07 distribution-skew

---

> [!quote] CIPHER
> *"Four documents. Reconciled.*
> *You did what the training asked. Now the training is a tool — not a measure.*
> *The window opens in ninety seconds. Your file is waiting.*
> *— CIPHER"*

\`\`\`
>_ RAVEN-SIGNAL — decoded fragment 04
   Now.
   The file you open next is a door.
   You walked every step. You are here.
   — RVN
\`\`\`

---

Note: Four threads, four passes.
- Section 1 (WRAITH Route): strip the three \`>>\` COMPLIANCE injection-lines. Operators + line-delete.
- Section 2 (GHOST Coords): apply the final key-rotation — +2 on REF column, +1 on MARK column. Visual-block + count-prefix.
- Section 3 (CIPHER Auth-Signature): normalize all three auth-lines to lowercase.
- Section 4 (CORP Prediction): purge the two \`[STANDARD-NOISE]\` lines, then regex-rewrite the three \`[ENTRY-NNNN]\` entries to the format \`Threat-<level> Pattern NN (NNNN) — description\`.
- CIPHER close + RAVEN-fragment 04 are static. Do not modify.`,path:"04 - Chrome Raven/M-16-TRANSMISSION-Extraction_Window.md"},{id:"R-01",role:"briefing",kind:"mission",arc:"I",chapter:"05 - Literal Frequencies",frontmatter:{mission_type:"briefing",links_to:"05 - Literal Frequencies/R-01-TRANSMISSION-Signal_Substitution",locked:!0,tags:["briefing","arc2","arc2-ch5"],sticker:"lucide//replace",color:"#00ccff"},body:`\`\`\`ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-01 // SIGNAL SUBSTITUTION       ║
║  Clearance: SIGNAL HUNTER  //  ARC II        ║
╚══════════════════════════════════════════════╝
\`\`\`

> [!quote] CIPHER
> *"You're reading this because you passed field training. That means NEXUS trusts you.*
> *CORP is watching us. Not individually — they built something called PROJECT MIRROR. A surveillance engine that scans communication intercepts for keyword patterns. We don't know its full shape yet.*
> *First step: the intercept log below has been garbled. CORP's relay system substituted our codename — NEXUS — with a dead-drop alias — PHANTOM. Nine instances. I need you to fix them.*
> *One command. Global substitution. This is what \`:s\` was built for."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Replace every occurrence of \`PHANTOM\` with \`NEXUS\` in the intercept log.
>
> > [!tip] SKILLS
> > \`:%s/PHANTOM/NEXUS/g\` — substitute all occurrences across the file
>
> > [!success] +20 XP
>
> → **[[_content/05 - Literal Frequencies/R-01-TRANSMISSION-Signal_Substitution|R-01-TRANSMISSION-Signal_Substitution]]** — open to begin. Timer starts on file open.`,path:"05 - Literal Frequencies/R-01-BRIEFING-Signal_Substitution.md"},{id:"R-01",role:"transmission",kind:"mission",arc:"II",chapter:"05 - Literal Frequencies",frontmatter:{mission_id:"R-01",title:"Signal Substitution",tier:"🔵 ARC II",xp_reward:20,completed:!1,difficulty:1,category:"regex",mission_type:"practice",locked:!0,unlock_requirement:"Level 5",tags:["vim/regex","vim/substitute","arc2","arc2-ch5"],sticker:"lucide//replace",color:"#00ccff",summary:"[LOCKED] CORP relay garbled a codename across a full intercept log. Fix all nine instances in one command.",why:":%s — the most powerful line in any file. Garble it nine times, fix it once."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  COMM INTERCEPT — RESISTANCE INTERNAL                            ║
║  Channel        : CIPHER-DIRECT // encrypted                    ║
║  Timestamp      : 2047-05-03 // 04:17                           ║
║  Subject        : Relay log fragment — garbled in transit        ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Direct Channel
> Codename substitution detected. CORP relay swapped NEXUS for a dead-drop alias across this intercept. Fix all nine before it gets archived.

---

COMMUNICATION LOG — SECTOR 3 RELAY NODE

Origin      : PHANTOM
Destination : Field agents — all channels
Status      : ACTIVE

PHANTOM confirms asset extraction at 23:00.
Route verified. PHANTOM logistics intact.

Cell-alpha checks in: PHANTOM handshake received.
Cell-beta checks in: PHANTOM handshake received.
Cell-gamma: awaiting PHANTOM confirmation.

PHANTOM fallback activated — secondary route clear.
PHANTOM signal strength: nominal.

Archive marker: PHANTOM — close of channel.`,path:"05 - Literal Frequencies/R-01-TRANSMISSION-Signal_Substitution.md"},{id:"R-02",role:"briefing",kind:"mission",arc:"I",chapter:"05 - Literal Frequencies",frontmatter:{mission_type:"briefing",links_to:"05 - Literal Frequencies/R-02-TRANSMISSION-Silent_Flag",locked:!0,tags:["briefing","arc2","arc2-ch5"],sticker:"lucide//flag",color:"#00ccff"},body:"```ascii\n╔══════════════════════════════════════════════╗\n║  INCOMING — CIPHER                           ║\n║  BRIEFING: R-02 // SILENT FLAG               ║\n║  Clearance: SIGNAL HUNTER  //  ARC II        ║\n╚══════════════════════════════════════════════╝\n```\n\n> [!quote] CIPHER\n> *\"CORP's automated systems encode data inconsistently. This log has the target designation written three different ways — all caps, all lowercase, mixed. Same word. Different case.*\n> *Your standard `:s` command is case-sensitive. It won't catch all three. You need the `i` flag. Or `I` if you want to force sensitivity. For this: `gi`.*\n> *Find every form of the word. Replace them all. That is what the `i` flag is for.\"*\n\n\n> [!abstract] DIRECTIVE\n> > [!warning] OBJECTIVE\n> > Replace every case-variant of `mirror` with `PROJECT MIRROR` — including `MIRROR`, `Mirror`, `mirror`.\n>\n> > [!tip] SKILLS\n> > `:%s/mirror/PROJECT MIRROR/gi` — `g` = all occurrences, `i` = case-insensitive\n>\n> > [!success] +20 XP\n>\n> → **[[_content/05 - Literal Frequencies/R-02-TRANSMISSION-Silent_Flag|R-02-TRANSMISSION-Silent_Flag]]** — open to begin. Timer starts on file open.",path:"05 - Literal Frequencies/R-02-BRIEFING-Silent_Flag.md"},{id:"R-02",role:"transmission",kind:"mission",arc:"II",chapter:"05 - Literal Frequencies",frontmatter:{mission_id:"R-02",title:"Silent Flag",tier:"🔵 ARC II",xp_reward:20,completed:!1,difficulty:1,category:"regex",mission_type:"practice",locked:!0,unlock_requirement:"Level 5",tags:["vim/regex","vim/substitute","arc2","arc2-ch5"],sticker:"lucide//flag",color:"#00ccff",summary:"[LOCKED] A CORP log uses three different casings for the same designation. One case-insensitive substitution cleans all of them.",why:"Three casings, one designation — the /i flag stops you chasing every variant by hand."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP INTERNAL — SURVEILLANCE DIVISION                           ║
║  Document       : Project designation log // auto-generated      ║
║  Timestamp      : 2047-05-03 // 09:44                           ║
║  Distribution   : Sector 3 analysts only                        ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Annotation
> Three case variants in one document. CORP's intake system doesn't normalize. Use the \`i\` flag — case does not matter when the pattern is clear.

---

SURVEILLANCE DIVISION — PROJECT DESIGNATION LOG

MIRROR is classified at Tier-4 clearance.
All references to Mirror in external communications are prohibited.
Internal memos may reference mirror only in encrypted form.

Field teams: MIRROR scope is continental.
Analysts: mirror coverage extends to all Resistance channels.
Oversight: Mirror operational since 2046-11.

Summary: mirror = active. No external disclosure.`,path:"05 - Literal Frequencies/R-02-TRANSMISSION-Silent_Flag.md"},{id:"R-03",role:"briefing",kind:"mission",arc:"I",chapter:"05 - Literal Frequencies",frontmatter:{mission_type:"briefing",links_to:"05 - Literal Frequencies/R-03-TRANSMISSION-Trace_Purge",locked:!0,tags:["briefing","arc2","arc2-ch5"],sticker:"lucide//trash-2",color:"#00ccff"},body:`\`\`\`ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-03 // TRACE PURGE               ║
║  Clearance: SIGNAL HUNTER  //  ARC II        ║
╚══════════════════════════════════════════════╝
\`\`\`

> [!quote] CIPHER
> *"CORP injects tracking markers into every document they process. They look like log lines — \`[TRACK]\` at the start. The actual intelligence is between them.*
> *You don't need to delete line by line. \`:g\` does it in one shot. It runs a command on every line that matches a pattern. The command is \`d\`. Delete.*
> *\`:g/TRACK/d\` — every line containing TRACK disappears. That's global delete. Learn it. You'll use it often."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Delete every line containing \`[TRACK]\`. Leave the intelligence lines intact.
>
> > [!tip] SKILLS
> > \`:g/\\[TRACK\\]/d\` — global delete of matching lines (brackets need escaping in default magic)
>
> > [!success] +20 XP
>
> → **[[_content/05 - Literal Frequencies/R-03-TRANSMISSION-Trace_Purge|R-03-TRANSMISSION-Trace_Purge]]** — open to begin. Timer starts on file open.`,path:"05 - Literal Frequencies/R-03-BRIEFING-Trace_Purge.md"},{id:"R-03",role:"transmission",kind:"mission",arc:"II",chapter:"05 - Literal Frequencies",frontmatter:{mission_id:"R-03",title:"Trace Purge",tier:"🔵 ARC II",xp_reward:20,completed:!1,difficulty:1,category:"regex",mission_type:"practice",locked:!0,unlock_requirement:"Level 5",tags:["vim/regex","vim/global","arc2","arc2-ch5"],sticker:"lucide//trash-2",color:"#00ccff",summary:"[LOCKED] CORP tracking markers are interspersed through an intelligence document. Delete every marked line with one global command.",why:"When a marker tags the trash, :g/pattern/d takes out every line wearing it in a single pass."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  RESISTANCE INTERCEPT — RAW FEED                                 ║
║  Source         : CORP Sector-3 comms // scraped                ║
║  Timestamp      : 2047-05-04 // 02:31                           ║
║  Note           : CORP trace markers injected — purge before use ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Processing note
> Purge every tracker line CORP injected. What remains is the actual intelligence.

---

Asset WRAITH departed Sector 3 at 22:00.
[TRACK] scan_id=0041 // node=ALPHA timestamp=2047-05-04T22:00
Route: primary corridor, north passage.
[TRACK] scan_id=0042 // node=BETA timestamp=2047-05-04T22:09
Rendezvous confirmed at NODE-7.
[TRACK] scan_id=0043 // node=GAMMA timestamp=2047-05-04T22:21
Extraction window opens at 23:00.
[TRACK] scan_id=0044 // node=DELTA timestamp=2047-05-04T22:44
Fallback route: south corridor if primary compromised.
[TRACK] scan_id=0045 // node=EPSILON timestamp=2047-05-04T22:58
Asset secured. Channel closed.`,path:"05 - Literal Frequencies/R-03-TRANSMISSION-Trace_Purge.md"},{id:"R-04",role:"briefing",kind:"mission",arc:"I",chapter:"05 - Literal Frequencies",frontmatter:{mission_type:"briefing",links_to:"05 - Literal Frequencies/R-04-TRANSMISSION-Range_Strike",locked:!0,tags:["briefing","arc2","arc2-ch5"],sticker:"lucide//scissors",color:"#00ccff"},body:`\`\`\`ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-04 // RANGE STRIKE              ║
║  Clearance: SIGNAL HUNTER  //  ARC II        ║
╚══════════════════════════════════════════════╝
\`\`\`

> [!quote] CIPHER
> *"Sometimes you don't want to change the whole file. Only a section. A range.*
> *\`:s\` takes a range before the command. \`1,8s/old/new/g\` — lines 1 through 8 only. \`%\` is just shorthand for \`1,$\` — the whole file.*
> *This document has two sections. The second section is correct. The first has bad status codes — QUEUED where it should say ACTIVE. Lines 1 through 10. You don't need to touch the rest."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Replace \`QUEUED\` with \`ACTIVE\` only on lines 1–10. The lower section must remain untouched.
>
> > [!tip] SKILLS
> > \`1,10s/QUEUED/ACTIVE/g\` — ranged substitution (line numbers visible in Vim with \`:set number\`)
>
> > [!success] +20 XP
>
> → **[[_content/05 - Literal Frequencies/R-04-TRANSMISSION-Range_Strike|R-04-TRANSMISSION-Range_Strike]]** — open to begin. Timer starts on file open.`,path:"05 - Literal Frequencies/R-04-BRIEFING-Range_Strike.md"},{id:"R-04",role:"transmission",kind:"mission",arc:"II",chapter:"05 - Literal Frequencies",frontmatter:{mission_id:"R-04",title:"Range Strike",tier:"🔵 ARC II",xp_reward:20,completed:!1,difficulty:2,category:"regex",mission_type:"practice",locked:!0,unlock_requirement:"Level 5",tags:["vim/regex","vim/substitute","arc2","arc2-ch5"],sticker:"lucide//scissors",color:"#00ccff",summary:"[LOCKED] Only the first section of a two-part document needs correction. Range-limited substitution leaves the second half intact.",why:"A substitution doesn't have to touch the whole file — give it a line range and the rest stays untouched."},body:`CORP OPERATIONAL STATUS — SECTOR 3 // dual-section register // 2047-05-05 07:00

NODE-ALPHA  : QUEUED
NODE-BETA   : QUEUED
NODE-GAMMA  : QUEUED
NODE-DELTA  : QUEUED
NODE-EPSILON: QUEUED
RELAY-01    : QUEUED
RELAY-02    : QUEUED
RELAY-03    : QUEUED

---

ARCHIVE SECTION — DO NOT MODIFY

NODE-ALPHA  : QUEUED // historical — pre-activation
NODE-BETA   : QUEUED // historical — pre-activation
NODE-GAMMA  : QUEUED // historical — pre-activation

---

> [!note] CIPHER — Annotation
> Upper section: status codes wrong — should read ACTIVE. Lower section: correct as-is. Range your substitution.`,path:"05 - Literal Frequencies/R-04-TRANSMISSION-Range_Strike.md"},{id:"R-05",role:"briefing",kind:"mission",arc:"I",chapter:"06 - Wildcard Protocol",frontmatter:{mission_type:"briefing",links_to:"06 - Wildcard Protocol/R-05-TRANSMISSION-Dot_Sweep",locked:!0,tags:["briefing","arc2","arc2-ch6"],sticker:"lucide//circle-dot",color:"#ff6600"},body:`\`\`\`ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-05 // DOT SWEEP                 ║
║  Clearance: SIGNAL HUNTER  //  ARC II        ║
╚══════════════════════════════════════════════╝
\`\`\`

> [!quote] CIPHER
> *"CORP rotates agent identifiers. AGENT-A, AGENT-B, AGENT-1 — the suffix changes. The stem doesn't.*
> *You can't write a separate substitution for each one. You need a pattern that matches any single character in that position.*
> *In regex, \`.\` means any character. One dot, one character, anything. \`AGENT-.\` matches AGENT-A, AGENT-B, AGENT-1, AGENT-X. All of them.*
> *Replace them all with the Resistance designation. One pass."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Replace every \`AGENT-?\` variant (where \`?\` is any single character) with \`OPERATIVE\`.
>
> > [!tip] SKILLS
> > \`:%s/AGENT-./OPERATIVE/g\` — \`.\` matches exactly one character (any)
>
> > [!success] +25 XP
>
> → **[[_content/06 - Wildcard Protocol/R-05-TRANSMISSION-Dot_Sweep|R-05-TRANSMISSION-Dot_Sweep]]** — open to begin. Timer starts on file open.`,path:"06 - Wildcard Protocol/R-05-BRIEFING-Dot_Sweep.md"},{id:"R-05",role:"transmission",kind:"mission",arc:"II",chapter:"06 - Wildcard Protocol",frontmatter:{mission_id:"R-05",title:"Dot Sweep",tier:"🔵 ARC II",xp_reward:25,completed:!1,difficulty:2,category:"regex",mission_type:"practice",locked:!0,unlock_requirement:"Level 6",tags:["vim/regex","vim/wildcards","arc2","arc2-ch6"],sticker:"lucide//circle-dot",color:"#ff6600",summary:"[LOCKED] CORP rotates agent IDs with varying suffixes. Match and replace all variants using the dot wildcard.",why:"The dot matches anything CORP rotates into a suffix — one pattern, every variant, no exceptions."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP FIELD ROSTER — SECTOR 3 SURVEILLANCE                       ║
║  Document       : Active agent registry // rotating identifiers  ║
║  Timestamp      : 2047-05-10 // 14:00                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Intelligence note
> CORP rotates the suffix after each relay. \`.\` in regex matches any single character. One pattern covers them all.

---

FIELD ROSTER — ACTIVE ASSETS

AGENT-A   — Zone-Alpha, field surveillance
AGENT-B   — Zone-Alpha, communications intercept
AGENT-1   — Zone-Beta, logistics
AGENT-K   — Zone-Beta, extraction support
AGENT-X   — Zone-Gamma, technical
AGENT-9   — Zone-Gamma, analysis
AGENT-Q   — Zone-Delta, field lead

Summary: 7 AGENT-* assets confirmed active.`,path:"06 - Wildcard Protocol/R-05-TRANSMISSION-Dot_Sweep.md"},{id:"R-06",role:"briefing",kind:"mission",arc:"I",chapter:"06 - Wildcard Protocol",frontmatter:{mission_type:"briefing",links_to:"06 - Wildcard Protocol/R-06-TRANSMISSION-Frequency_Match",locked:!0,tags:["briefing","arc2","arc2-ch6"],sticker:"lucide//columns-3",color:"#ff6600"},body:`\`\`\`ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-06 // COLUMN STRIKE             ║
║  Clearance: SIGNAL HUNTER  //  ARC II        ║
╚══════════════════════════════════════════════╝
\`\`\`

> [!quote] CIPHER
> *"Patterns work on text. But some corruption is structural — a whole column wedged into an aligned grid.*
> *\`Ctrl-V\` is visual-block mode. Move down to extend the selection over the rows, move right to set its width, then operate: \`d\` deletes the block, \`I\` inserts before it, \`A\` appends after it.*
> *CORP slipped a status column into the relay grid. Carve it out in one strike — no substitution will do this cleanly."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Delete the \`X | \` column so each row reads \`NODE | <name> online\`.
>
> > [!tip] SKILLS
> > \`Ctrl-V\` (visual-block) → select the column down all rows → \`d\`
>
> > [!success] +25 XP
>
> → **[[_content/06 - Wildcard Protocol/R-06-TRANSMISSION-Frequency_Match|R-06-TRANSMISSION-Frequency_Match]]** — open to begin. Timer starts on file open.`,path:"06 - Wildcard Protocol/R-06-BRIEFING-Frequency_Match.md"},{id:"R-06",role:"transmission",kind:"mission",arc:"II",chapter:"06 - Wildcard Protocol",frontmatter:{mission_id:"R-06",title:"Column Strike",tier:"🔵 ARC II",xp_reward:25,completed:!1,difficulty:2,category:"visual-block",par_keystrokes:14,mission_type:"practice",locked:!0,unlock_requirement:"Level 6",tags:["vim/visual-block","arc2","arc2-ch6"],sticker:"lucide//columns-3",color:"#ff6600",summary:"[LOCKED] CORP wedged a status column into the relay grid. A pattern can't carve a column — drop into visual-block and strike it out.",why:"A pattern can't cut a column — drop into Ctrl-V, mark the block, and strike it out vertically."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP RELAY GRID — COLUMN INJECTION                              ║
║  Document       : Aligned node table // bogus status column      ║
║  Timestamp      : 2047-05-11 // 09:30                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Processing note
> The \`X | \` column is the same width on every row. \`Ctrl-V\` selects a block down the column, then \`d\` deletes it in one strike. No pattern needed.

---

NODE | X | alpha online
NODE | X | bravo online
NODE | X | charlie online
NODE | X | delta online
NODE | X | echo online`,path:"06 - Wildcard Protocol/R-06-TRANSMISSION-Frequency_Match.md"},{id:"R-07",role:"briefing",kind:"mission",arc:"I",chapter:"06 - Wildcard Protocol",frontmatter:{mission_type:"briefing",links_to:"06 - Wildcard Protocol/R-07-TRANSMISSION-Lazy_Trace",locked:!0,tags:["briefing","arc2","arc2-ch6"],sticker:"lucide//minimize-2",color:"#ff6600"},body:"```ascii\n╔══════════════════════════════════════════════╗\n║  INCOMING — CIPHER                           ║\n║  BRIEFING: R-07 // LAZY TRACE                ║\n║  Clearance: SIGNAL HUNTER  //  ARC II        ║\n╚══════════════════════════════════════════════╝\n```\n\n> [!quote] CIPHER\n> *\"Greedy quantifiers consume as much as possible. `.*` will match from the first `<` to the last `>` on the line — swallowing everything between.*\n> *That's usually wrong. You want the shortest possible match. That's lazy: `.\\{-}` instead of `.*`.*\n> *CORP wraps encoded payloads in angle brackets. `<ENCRYPTED>data</ENCRYPTED>` — you need to strip the tags without destroying what's inside. Lazy match or you'll eat the content too.\"*\n\n\n> [!abstract] DIRECTIVE\n> > [!warning] OBJECTIVE\n> > Strip all `<TAG>` and `</TAG>` wrappers from the document. Content between tags must remain.\n>\n> > [!tip] SKILLS\n> > `:%s/<.\\{-}>//g` — lazy quantifier `\\{-}` matches the shortest possible content between `<` and `>`\n>\n> > [!success] +25 XP\n>\n> → **[[_content/06 - Wildcard Protocol/R-07-TRANSMISSION-Lazy_Trace|R-07-TRANSMISSION-Lazy_Trace]]** — open to begin. Timer starts on file open.",path:"06 - Wildcard Protocol/R-07-BRIEFING-Lazy_Trace.md"},{id:"R-07",role:"transmission",kind:"mission",arc:"II",chapter:"06 - Wildcard Protocol",frontmatter:{mission_id:"R-07",title:"Lazy Trace",tier:"🔵 ARC II",xp_reward:25,completed:!1,difficulty:2,category:"regex",mission_type:"practice",locked:!0,unlock_requirement:"Level 6",tags:["vim/regex","vim/quantifiers","arc2","arc2-ch6"],sticker:"lucide//minimize-2",color:"#ff6600",summary:"[LOCKED] CORP wraps payloads in XML-style tags. Strip the tags with a lazy quantifier — or you'll consume the content too.",why:"Greedy eats the whole line; the lazy quantifier stops at the first close-tag and spares the payload."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP ENCRYPTED PAYLOAD — SECTOR 3 RELAY                         ║
║  Document       : Wrapped transmission // tag-encoded            ║
║  Timestamp      : 2047-05-12 // 17:45                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Extraction note
> Tags wrap the payload. Content is valuable. Lazy match: \`.\\{-}\` — not \`.*\`.

---

<HEADER>PAYLOAD EXTRACTION — UNWRAPPED</HEADER>

Route: <ENCRYPTED>primary corridor, north passage</ENCRYPTED>
Status: <ENCRYPTED>ACTIVE — all nodes clear</ENCRYPTED>
Rendezvous: <NODE>NODE-7 at 23:00</NODE>
Fallback: <NODE>south corridor, 23:30</NODE>
Asset: <ASSET>WRAITH — extraction confirmed</ASSET>
Channel: <ENCRYPTED>closed</ENCRYPTED>`,path:"06 - Wildcard Protocol/R-07-TRANSMISSION-Lazy_Trace.md"},{id:"R-08",role:"briefing",kind:"mission",arc:"I",chapter:"06 - Wildcard Protocol",frontmatter:{mission_type:"briefing",links_to:"06 - Wildcard Protocol/R-08-TRANSMISSION-Magic_Mode",locked:!0,tags:["briefing","arc2","arc2-ch6"],sticker:"lucide//wand-2",color:"#ff6600"},body:"```ascii\n╔══════════════════════════════════════════════╗\n║  INCOMING — CIPHER                           ║\n║  BRIEFING: R-08 // MAGIC MODE                ║\n║  Clearance: SIGNAL HUNTER  //  ARC II        ║\n╚══════════════════════════════════════════════╝\n```\n\n> [!quote] CIPHER\n> *\"In default Vim regex mode, `(`, `)`, `|`, `+` are all literal — they need backslashes to become special. It's backwards from every other regex engine.*\n> *`\\v` — very magic mode — fixes this. After `\\v`, all special characters work without escaping. Parentheses group. Pipe alternates. Plus quantifies.*\n> *`\\v(ALPHA|BETA|GAMMA)` — matches any of those three words. No backslash-paren. Write regex like a normal person.*\n> *Use this. CORP's tier designations need to be unified. Three possible values. One replacement.\"*\n\n\n> [!abstract] DIRECTIVE\n> > [!warning] OBJECTIVE\n> > Replace `ALPHA`, `BETA`, and `GAMMA` tier designations with the unified label `TIER-1`.\n>\n> > [!tip] SKILLS\n> > `:%s/\\v(ALPHA|BETA|GAMMA)/TIER-1/g` — `\\v` enables very magic; `|` alternates without escaping\n>\n> > [!success] +25 XP\n>\n> → **[[_content/06 - Wildcard Protocol/R-08-TRANSMISSION-Magic_Mode|R-08-TRANSMISSION-Magic_Mode]]** — open to begin. Timer starts on file open.",path:"06 - Wildcard Protocol/R-08-BRIEFING-Magic_Mode.md"},{id:"R-08",role:"transmission",kind:"mission",arc:"II",chapter:"06 - Wildcard Protocol",frontmatter:{mission_id:"R-08",title:"Magic Mode",tier:"🔵 ARC II",xp_reward:25,completed:!1,difficulty:2,category:"regex",mission_type:"practice",locked:!0,unlock_requirement:"Level 6",tags:["vim/regex","vim/verymagic","arc2","arc2-ch6"],sticker:"lucide//wand-2",color:"#ff6600",summary:"[LOCKED] Three CORP tier labels, one unified replacement. Use very magic mode for clean alternation syntax.",why:"Very magic mode drops the backslash noise — write alternation the way you actually think it."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP INTERNAL — TIER CLASSIFICATION REGISTER                    ║
║  Document       : Legacy tier mapping // normalization pending    ║
║  Timestamp      : 2047-05-13 // 11:00                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Reclassification note
> Legacy CORP tier labels vary by division. Normalize all three to TIER-1. Use \`\\v\` for clean alternation.

---

CLASSIFICATION REGISTER — ASSET CLEARANCE

WRAITH         : ALPHA // field operative
GHOST          : BETA // intelligence
REN VOSS       : GAMMA // technical analyst
CIPHER         : BETA // communications
SHADOW-7       : ALPHA // extraction lead
ECHO-3         : GAMMA // logistics
NOVA-2         : ALPHA // field operative`,path:"06 - Wildcard Protocol/R-08-TRANSMISSION-Magic_Mode.md"},{id:"R-09",role:"briefing",kind:"mission",arc:"I",chapter:"07 - Codex Matrix",frontmatter:{mission_type:"briefing",links_to:"07 - Codex Matrix/R-09-TRANSMISSION-Set_Theory",locked:!0,tags:["briefing","arc2","arc2-ch7"],sticker:"lucide//brackets",color:"#cc00ff"},body:'```ascii\n╔══════════════════════════════════════════════╗\n║  INCOMING — CIPHER                           ║\n║  BRIEFING: R-09 // SET THEORY                ║\n║  Clearance: PROTOCOL READER  //  ARC II      ║\n╚══════════════════════════════════════════════╝\n```\n\n> [!quote] CIPHER\n> *"`.` matches anything. But what if you only want to match specific characters?*\n> *Character sets: `[XYZ]` matches X, Y, or Z — exactly one character, but only from that set. `[a-z]` matches any lowercase letter. `[0-9A-F]` matches hex digits.*\n> *CORP uses three status codes: X, Y, Z. They mean nothing to us. They need to be replaced with CLEAN.*\n> *One pattern. Three possible characters. `[XYZ]` covers all three."*\n\n\n> [!abstract] DIRECTIVE\n> > [!warning] OBJECTIVE\n> > Replace every status code `X`, `Y`, or `Z` (appearing alone as status fields) with `CLEAN`.\n>\n> > [!tip] SKILLS\n> > `:%s/: [XYZ]$/: CLEAN/g` — character set `[XYZ]` matches one of those three; `$` anchors to line end\n>\n> > [!success] +30 XP\n>\n> → **[[_content/07 - Codex Matrix/R-09-TRANSMISSION-Set_Theory|R-09-TRANSMISSION-Set_Theory]]** — open to begin. Timer starts on file open.',path:"07 - Codex Matrix/R-09-BRIEFING-Set_Theory.md"},{id:"R-09",role:"transmission",kind:"mission",arc:"II",chapter:"07 - Codex Matrix",frontmatter:{mission_id:"R-09",title:"Set Theory",tier:"🔵 ARC II",xp_reward:30,completed:!1,difficulty:3,category:"regex",mission_type:"practice",locked:!0,unlock_requirement:"Level 7",tags:["vim/regex","vim/character-classes","arc2","arc2-ch7"],sticker:"lucide//brackets",color:"#cc00ff",summary:"[LOCKED] CORP status codes X, Y, Z encode threat level. Normalize all three to CLEAN using a character set.",why:"A character set folds X, Y and Z into one match — three threat codes normalized in a single rule."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP THREAT ASSESSMENT — SECTOR 3                               ║
║  Document       : Node status register // threat-coded           ║
║  Timestamp      : 2047-05-18 // 08:00                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Decoding note
> X = low risk. Y = medium. Z = high. All three mean the same thing to us: CLEAN. \`[XYZ]\` matches any one of them.

---

NODE STATUS — THREAT ASSESSMENT

NODE-ALPHA  : X
NODE-BETA   : Y
NODE-GAMMA  : X
NODE-DELTA  : Z
NODE-EPSILON: Y
RELAY-01    : X
RELAY-02    : Z
RELAY-03    : Y

All nodes clear. No threat indicators active.`,path:"07 - Codex Matrix/R-09-TRANSMISSION-Set_Theory.md"},{id:"R-10",role:"briefing",kind:"mission",arc:"I",chapter:"07 - Codex Matrix",frontmatter:{mission_type:"briefing",links_to:"07 - Codex Matrix/R-10-TRANSMISSION-Digit_Sweep",locked:!0,tags:["briefing","arc2","arc2-ch7"],sticker:"lucide//repeat",color:"#ff6600"},body:'```ascii\n╔══════════════════════════════════════════════╗\n║  INCOMING — CIPHER                           ║\n║  BRIEFING: R-10 // ECHO CHAMBER              ║\n║  Clearance: PROTOCOL READER  //  ARC II      ║\n╚══════════════════════════════════════════════╝\n```\n\n> [!quote] CIPHER\n> *"When every line needs the same multi-step edit, don\'t repeat yourself — record yourself.*\n> *`qa` starts recording into register a. Do the edit on the first line, end with the cursor on the next line, then `q` to stop. Now `@a` replays it; `@@` repeats the last replay; `4@a` runs it four times.*\n> *Five relay lines, the same two edits each. Record once. Echo down."*\n\n\n> [!abstract] DIRECTIVE\n> > [!warning] OBJECTIVE\n> > Make each line read `# relay <name> [OK]` (prefix `# `, change `active` to `[OK]`).\n>\n> > [!tip] SKILLS\n> > `qa` `I# `<Esc> `$` `ciw[OK]`<Esc> `0j` `q` — then `4@a`\n>\n> > [!success] +30 XP\n>\n> → **[[_content/07 - Codex Matrix/R-10-TRANSMISSION-Digit_Sweep|R-10-TRANSMISSION-Digit_Sweep]]** — open to begin. Timer starts on file open.',path:"07 - Codex Matrix/R-10-BRIEFING-Digit_Sweep.md"},{id:"R-10",role:"transmission",kind:"mission",arc:"II",chapter:"07 - Codex Matrix",frontmatter:{mission_id:"R-10",title:"Echo Chamber",tier:"🔵 ARC II",xp_reward:30,completed:!1,difficulty:3,category:"marks-macros",par_keystrokes:24,mission_type:"practice",locked:!0,unlock_requirement:"Level 7",tags:["vim/macros","arc2","arc2-ch7"],sticker:"lucide//repeat",color:"#ff6600",summary:"[LOCKED] Five relay lines need the same two edits. Record the fix once as a macro, then echo it down the list.",why:"Five lines, the same two edits — record the change once and let the macro echo it down the list."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  RESISTANCE RELAY ROSTER — BULK REFORMAT                         ║
║  Document       : Relay status list // same edit, every line     ║
║  Timestamp      : 2047-05-19 // 06:30                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Processing note
> Each line needs the same two edits: comment it with \`# \` and flip \`active\` to \`[OK]\`. Record it once with \`qa … q\`, then replay with \`@a\` down the rest.

---

relay alpha active
relay bravo active
relay charlie active
relay delta active
relay echo active`,path:"07 - Codex Matrix/R-10-TRANSMISSION-Digit_Sweep.md"},{id:"R-11",role:"briefing",kind:"mission",arc:"I",chapter:"07 - Codex Matrix",frontmatter:{mission_type:"briefing",links_to:"07 - Codex Matrix/R-11-TRANSMISSION-Inverse_Filter",locked:!0,tags:["briefing","arc2","arc2-ch7"],sticker:"lucide//filter-x",color:"#cc00ff"},body:`\`\`\`ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-11 // INVERSE FILTER            ║
║  Clearance: PROTOCOL READER  //  ARC II      ║
╚══════════════════════════════════════════════╝
\`\`\`

> [!quote] CIPHER
> *"You know \`:g/pattern/d\` — delete every line that matches. Now flip it.*
> *\`:g!/pattern/d\` — delete every line that does NOT match. The \`!\` inverts the filter.*
> *CORP scrambled a clearance log by embedding noise lines between the valid entries. Every valid entry contains the word CLEARANCE. The noise lines don't.*
> *One command deletes everything that isn't valid. \`:g!/CLEARANCE/d\`.*
> *Keep what matters. Delete the rest."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Delete all lines that do NOT contain \`CLEARANCE\`. Every noise line goes. Every valid entry stays.
>
> > [!tip] SKILLS
> > \`:g!/CLEARANCE/d\` — delete all lines NOT matching the pattern
>
> > [!success] +30 XP
>
> → **[[_content/07 - Codex Matrix/R-11-TRANSMISSION-Inverse_Filter|R-11-TRANSMISSION-Inverse_Filter]]** — open to begin. Timer starts on file open.`,path:"07 - Codex Matrix/R-11-BRIEFING-Inverse_Filter.md"},{id:"R-11",role:"transmission",kind:"mission",arc:"II",chapter:"07 - Codex Matrix",frontmatter:{mission_id:"R-11",title:"Inverse Filter",tier:"🔵 ARC II",xp_reward:30,completed:!1,difficulty:3,category:"regex",mission_type:"practice",locked:!0,unlock_requirement:"Level 7",tags:["vim/regex","vim/global","arc2","arc2-ch7"],sticker:"lucide//filter-x",color:"#cc00ff",summary:"[LOCKED] CORP embedded noise lines in a clearance log. Keep only what matters — delete everything without CLEARANCE using :g!.",why:":g! is the inverse net — keep what matters, delete everything that doesn't say CLEARANCE."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP ASSET REGISTER — NOISE EMBEDDED                            ║
║  Document       : Asset log // noise-injected                    ║
║  Timestamp      : 2047-05-20 // 14:00                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Filter note
> Every valid entry carries the clearance keyword. The rest is noise. \`:g!\` inverts the filter — strip the document down to what matters.

---

WRAITH       : CLEARANCE LEVEL 4 — approved
x91A :: relay echo :: unparsed burst
GHOST        : CLEARANCE LEVEL 4 — approved
[buffer dump] sector static — discard
0x44F1 checksum residue // no payload
REN VOSS     : CLEARANCE LEVEL 3 — approved
::: carrier hum ::: dead channel :::
CIPHER       : CLEARANCE LEVEL 5 — approved
relay-4 fragment — header only, no body
SHADOW-7     : CLEARANCE LEVEL 3 — approved
EOF marker corrupted — ignore`,path:"07 - Codex Matrix/R-11-TRANSMISSION-Inverse_Filter.md"},{id:"R-12",role:"briefing",kind:"mission",arc:"I",chapter:"07 - Codex Matrix",frontmatter:{mission_type:"briefing",links_to:"07 - Codex Matrix/R-12-TRANSMISSION-Combined_Strike",locked:!0,tags:["briefing","arc2","arc2-ch7"],sticker:"lucide//combine",color:"#cc00ff"},body:`\`\`\`ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-12 // COMBINED STRIKE           ║
║  Clearance: PROTOCOL READER  //  ARC II      ║
╚══════════════════════════════════════════════╝
\`\`\`

> [!quote] CIPHER
> *"CORP uses 8-character hexadecimal hashes to tag every document internally. They look like: \`3F2A9B4C\`. Eight characters, all hex: \`[0-9A-F]\`.*
> *A length constraint uses \`\\{n\\}\` — exactly n repetitions. \`[0-9A-F]\\{8\\}\` matches exactly 8 hex characters.*
> *Combined with your class knowledge, this is precise matching. Not any 8 characters — exactly 8 hex characters. No false positives.*
> *Find every hash. Redact every hash. Leave everything else intact."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Replace every 8-character hexadecimal hash (characters \`0-9\` and \`A-F\` only) with \`[HASH-REDACTED]\`.
>
> > [!tip] SKILLS
> > \`:%s/[0-9A-F]\\{8\\}/[HASH-REDACTED]/g\` — exact-length hex match
>
> > [!success] +30 XP
>
> → **[[_content/07 - Codex Matrix/R-12-TRANSMISSION-Combined_Strike|R-12-TRANSMISSION-Combined_Strike]]** — open to begin. Timer starts on file open.`,path:"07 - Codex Matrix/R-12-BRIEFING-Combined_Strike.md"},{id:"R-12",role:"transmission",kind:"mission",arc:"II",chapter:"07 - Codex Matrix",frontmatter:{mission_id:"R-12",title:"Combined Strike",tier:"🔵 ARC II",xp_reward:30,completed:!1,difficulty:3,category:"regex",mission_type:"practice",locked:!0,unlock_requirement:"Level 7",tags:["vim/regex","vim/character-classes","arc2","arc2-ch7"],sticker:"lucide//combine",color:"#cc00ff",summary:"[LOCKED] CORP hex hashes tag every document. Redact all six with an exact-length character class pattern.",why:"A fixed-length class counts the hex for you — six hashes redacted, none of the real text touched."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP DOCUMENT REGISTRY — HASH-TAGGED                            ║
║  Document       : Internal document manifest // hashes present   ║
║  Timestamp      : 2047-05-21 // 10:15                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Redaction note
> Six CORP hex hashes, each exactly 8 characters from \`[0-9A-F]\`. Redact all of them. \`\\{8\\}\` — exact count.

---

DOCUMENT MANIFEST — INTERNAL REGISTRY

PROJECT MIRROR core document    : 3F2A9B4C
Sector-3 surveillance log       : 7D0E4F19
Asset movement register         : A1C58E2B
Comm intercept archive          : 90BD37FA
Clearance override protocol     : C4E6021D
Counter-Resistance directive    : 5B8FD7E3

Security protocol: all hashes get redacted.`,path:"07 - Codex Matrix/R-12-TRANSMISSION-Combined_Strike.md"},{id:"R-13",role:"briefing",kind:"mission",arc:"I",chapter:"08 - Anchor Doctrine",frontmatter:{mission_type:"briefing",links_to:"08 - Anchor Doctrine/R-13-TRANSMISSION-Line_Zero",locked:!0,tags:["briefing","arc2","arc2-ch8"],sticker:"lucide//arrow-right-to-line",color:"#ff0066"},body:'```ascii\n╔══════════════════════════════════════════════╗\n║  INCOMING — CIPHER                           ║\n║  BRIEFING: R-13 // LINE ZERO                 ║\n║  Clearance: PROTOCOL READER  //  ARC II      ║\n╚══════════════════════════════════════════════╝\n```\n\n> [!quote] CIPHER\n> *"Anchors pin your pattern to a position. `^` is the start of the line. `$` is the end.*\n> *Without `^`, `s/\\[TRACK\\] //` would match `[TRACK] ` anywhere in a line — including the middle. With `^`, it only matches when the line starts with `[TRACK] `.*\n> *CORP prepends a tracking prefix to every line: `[TRACK] `. The actual content follows. Strip the prefix — but only where it appears at the line start.*\n> *Position is a constraint. Use it."*\n\n\n> [!abstract] DIRECTIVE\n> > [!warning] OBJECTIVE\n> > Remove the `[TRACK] ` prefix from the start of every line that has it.\n>\n> > [!tip] SKILLS\n> > `:%s/^\\[TRACK\\] //g` — `^` anchors to line start; brackets need escaping in default magic\n>\n> > [!success] +30 XP\n>\n> → **[[_content/08 - Anchor Doctrine/R-13-TRANSMISSION-Line_Zero|R-13-TRANSMISSION-Line_Zero]]** — open to begin. Timer starts on file open.',path:"08 - Anchor Doctrine/R-13-BRIEFING-Line_Zero.md"},{id:"R-13",role:"transmission",kind:"mission",arc:"II",chapter:"08 - Anchor Doctrine",frontmatter:{mission_id:"R-13",title:"Line Zero",tier:"🔵 ARC II",xp_reward:30,completed:!1,difficulty:3,category:"regex",mission_type:"practice",locked:!0,unlock_requirement:"Level 7",tags:["vim/regex","vim/anchors","arc2","arc2-ch8"],sticker:"lucide//arrow-right-to-line",color:"#ff0066",summary:"[LOCKED] CORP prepends a tracking prefix to every line. Strip it precisely — only from the line start.",why:"Anchor to ^ and the prefix dies only at the line start — never mid-text where it would do damage."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  RESISTANCE INTERCEPT — PREFIX STRIPPED                          ║
║  Source         : CORP Sector-3 relay // prefixed feed           ║
║  Timestamp      : 2047-05-25 // 03:17                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Strip note
> \`^\` anchors to line start. \`[TRACK] \` only appears there. One command, all prefixes gone.

---

[TRACK] Asset WRAITH departed Sector 3 at 22:00.
[TRACK] Route: primary corridor, north passage.
[TRACK] Rendezvous confirmed at NODE-7.
[TRACK] Extraction window opens at 23:00.
[TRACK] Fallback route: south corridor if primary compromised.
[TRACK] Asset secured. Channel closed.`,path:"08 - Anchor Doctrine/R-13-TRANSMISSION-Line_Zero.md"},{id:"R-14",role:"briefing",kind:"mission",arc:"I",chapter:"08 - Anchor Doctrine",frontmatter:{mission_type:"briefing",links_to:"08 - Anchor Doctrine/R-14-TRANSMISSION-Tail_Mark",locked:!0,tags:["briefing","arc2","arc2-ch8"],sticker:"lucide//clipboard-copy",color:"#ff6600"},body:`\`\`\`ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-14 // DEAD DROP                 ║
║  Clearance: PROTOCOL READER  //  ARC II      ║
╚══════════════════════════════════════════════╝
\`\`\`

> [!quote] CIPHER
> *"The unnamed register is a single clipboard — every delete and yank overwrites it. When you need a value to survive a sequence of edits, name it.*
> *\`"ayiw\` yanks the inner word into register a. \`"ap\` pastes from register a. Register a holds until you yank into it again — paste it as many times as you like.*
> *One master key, four dead drops. Yank once, drop it everywhere."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Fill every \`____\` with the master key \`K7741\`.
>
> > [!tip] SKILLS
> > \`"ayiw\` on the key → on each slot \`cw\`<Esc> then \`"ap\` (or replace \`____\` and paste from register a)
>
> > [!success] +30 XP
>
> → **[[_content/08 - Anchor Doctrine/R-14-TRANSMISSION-Tail_Mark|R-14-TRANSMISSION-Tail_Mark]]** — open to begin. Timer starts on file open.`,path:"08 - Anchor Doctrine/R-14-BRIEFING-Tail_Mark.md"},{id:"R-14",role:"transmission",kind:"mission",arc:"II",chapter:"08 - Anchor Doctrine",frontmatter:{mission_id:"R-14",title:"Dead Drop",tier:"🔵 ARC II",xp_reward:30,completed:!1,difficulty:3,category:"registers",par_keystrokes:30,mission_type:"practice",locked:!0,unlock_requirement:"Level 8",tags:["vim/registers","arc2","arc2-ch8"],sticker:"lucide//clipboard-copy",color:"#ff6600",summary:"[LOCKED] One master key, four empty slots. Yank the key into a named register once, then drop it into every slot.",why:"One master key, four empty slots — yank it to a named register once and drop it wherever it belongs."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  RESISTANCE KEY DISTRIBUTION — DEAD DROP                         ║
║  Document       : Master key + empty slots // fill all slots     ║
║  Timestamp      : 2047-05-26 // 05:44                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Processing note
> Yank the key into a named register so later edits can't clobber it: \`"ayiw\` on the key, then \`"ap\` to drop it into each slot. The unnamed register would be overwritten the moment you delete a placeholder — a named register survives.

---

MASTER KEY: K7741

slot one: ____
slot two: ____
slot three: ____
slot four: ____`,path:"08 - Anchor Doctrine/R-14-TRANSMISSION-Tail_Mark.md"},{id:"R-15",role:"briefing",kind:"mission",arc:"I",chapter:"08 - Anchor Doctrine",frontmatter:{mission_type:"briefing",links_to:"08 - Anchor Doctrine/R-15-TRANSMISSION-Boundary_Scan",locked:!0,tags:["briefing","arc2","arc2-ch8"],sticker:"lucide//scan-text",color:"#ff0066"},body:`\`\`\`ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-15 // BOUNDARY SCAN             ║
║  Clearance: PROTOCOL READER  //  ARC II      ║
╚══════════════════════════════════════════════╝
\`\`\`

> [!quote] CIPHER
> *"There's a difference between matching a word and matching a substring.*
> *\`:%s/MIRROR/PROJECT MIRROR/g\` would also match MIRRORING and MIRRORED — it sees MIRROR inside them.*
> *Word boundaries fix this. \`\\<MIRROR\\>\` matches MIRROR only when it stands alone — not as part of a longer word. \`\\<\` = word start. \`\\>\` = word end.*
> *This document has MIRROR, MIRRORING, and MIRRORED. Only the standalone MIRROR instances should be expanded to PROJECT MIRROR.*
> *Precision is what boundaries give you."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Replace only the standalone word \`MIRROR\` with \`PROJECT MIRROR\`. Do not touch \`MIRRORING\` or \`MIRRORED\`.
>
> > [!tip] SKILLS
> > \`:%s/\\<MIRROR\\>/PROJECT MIRROR/g\` — word boundary anchors
>
> > [!success] +30 XP
>
> → **[[_content/08 - Anchor Doctrine/R-15-TRANSMISSION-Boundary_Scan|R-15-TRANSMISSION-Boundary_Scan]]** — open to begin. Timer starts on file open.`,path:"08 - Anchor Doctrine/R-15-BRIEFING-Boundary_Scan.md"},{id:"R-15",role:"transmission",kind:"mission",arc:"II",chapter:"08 - Anchor Doctrine",frontmatter:{mission_id:"R-15",title:"Boundary Scan",tier:"🔵 ARC II",xp_reward:30,completed:!1,difficulty:4,category:"regex",mission_type:"practice",locked:!0,unlock_requirement:"Level 7",tags:["vim/regex","vim/anchors","arc2","arc2-ch8"],sticker:"lucide//scan-text",color:"#ff0066",summary:"[LOCKED] Standalone MIRROR needs expansion. MIRRORING and MIRRORED must stay. Word boundaries make the distinction.",why:"Word boundaries draw the line: standalone MIRROR changes, MIRRORING and MIRRORED stay put."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP INTERNAL — TERMINOLOGY AUDIT                               ║
║  Document       : Mixed usage of designation // boundary needed  ║
║  Timestamp      : 2047-05-27 // 11:00                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Boundary note
> Anchor the standalone word: \`\\<\` = word start, \`\\>\` = word end. MIRRORING and MIRRORED are not the designation.

---

TERMINOLOGY AUDIT — DESIGNATION STANDARDIZATION

MIRROR is the official designation.
The MIRRORING process covers all seven sectors.
MIRRORED communications are archived quarterly.
All references to MIRROR require Tier-4 clearance.
The MIRRORING infrastructure is continental in scope.
MIRROR has been operational since 2046-11.
Data MIRRORED by MIRROR is retained indefinitely.`,path:"08 - Anchor Doctrine/R-15-TRANSMISSION-Boundary_Scan.md"},{id:"R-16",role:"briefing",kind:"mission",arc:"I",chapter:"08 - Anchor Doctrine",frontmatter:{mission_type:"briefing",links_to:"08 - Anchor Doctrine/R-16-TRANSMISSION-Full_Anchor",locked:!0,tags:["briefing","arc2","arc2-ch8"],sticker:"lucide//anchor",color:"#ff0066"},body:`\`\`\`ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-16 // FULL ANCHOR               ║
║  Clearance: PROTOCOL READER  //  ARC II      ║
╚══════════════════════════════════════════════╝
\`\`\`

> [!quote] CIPHER
> *"You can combine both anchors: \`^CLASSIFIED$\` matches a line that contains exactly the word CLASSIFIED and nothing else.*
> *\`^\` requires it starts there. \`$\` requires it ends there. Together: the whole line must be that pattern.*
> *This document has CLASSIFIED as both a full-line marker and as part of longer lines. Only the full-line markers should be replaced with \`[REDACTED]\`.*
> *Combined anchors are precision at the line level. It's a different kind of boundary."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Replace lines that contain ONLY the word \`CLASSIFIED\` (nothing before or after) with \`[REDACTED]\`.
>
> > [!tip] SKILLS
> > \`:%s/^CLASSIFIED$/[REDACTED]/g\` — \`^\` and \`$\` together match the exact full line
>
> > [!success] +30 XP
>
> → **[[_content/08 - Anchor Doctrine/R-16-TRANSMISSION-Full_Anchor|R-16-TRANSMISSION-Full_Anchor]]** — open to begin. Timer starts on file open.`,path:"08 - Anchor Doctrine/R-16-BRIEFING-Full_Anchor.md"},{id:"R-16",role:"transmission",kind:"mission",arc:"II",chapter:"08 - Anchor Doctrine",frontmatter:{mission_id:"R-16",title:"Full Anchor",tier:"🔵 ARC II",xp_reward:30,completed:!1,difficulty:4,category:"regex",mission_type:"practice",locked:!0,unlock_requirement:"Level 7",tags:["vim/regex","vim/anchors","arc2","arc2-ch8"],sticker:"lucide//anchor",color:"#ff0066",summary:"[LOCKED] CLASSIFIED appears both as full lines and within longer lines. Combined anchors target only the full-line markers.",why:"Pin both ends with ^ and $ and you hit only the full-line markers, never the word buried in a sentence."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP INTERNAL — CLASSIFICATION MANIFEST                         ║
║  Document       : Mixed classification markers // anchor needed  ║
║  Timestamp      : 2047-05-28 // 16:30                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Anchor note
> \`^CLASSIFIED$\` — the whole line, nothing more. Inline occurrences stay.

---

CLASSIFICATION MANIFEST — PROJECT MIRROR

Distribution policy: CLASSIFIED material requires Tier-4 auth.
CLASSIFIED
Sector-3 data: CLASSIFIED at all distribution levels.
CLASSIFIED
Counter-Resistance protocols: CLASSIFIED above clearance level 3.
CLASSIFIED
External disclosure: prohibited. All data CLASSIFIED.`,path:"08 - Anchor Doctrine/R-16-TRANSMISSION-Full_Anchor.md"},{id:"R-17",role:"briefing",kind:"mission",arc:"I",chapter:"09 - Capture Operation",frontmatter:{mission_type:"briefing",links_to:"09 - Capture Operation/R-17-TRANSMISSION-First_Capture",locked:!0,tags:["briefing","arc2","arc2-ch9"],sticker:"lucide//parentheses",color:"#00ff88"},body:`\`\`\`ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-17 // FIRST CAPTURE             ║
║  Clearance: PATTERN BREAKER  //  ARC II      ║
╚══════════════════════════════════════════════╝
\`\`\`

> [!quote] CIPHER
> *"Everything until now has been replacement. Now you capture.*
> *\`\\(\\)\` creates a capture group. Whatever it matches, Vim remembers. You reference it in the replacement with \`\\1\`.*
> *This intercept has field designations in the wrong order: SECTOR first, then NODE. We need NODE first, then SECTOR. The data doesn't change — only the arrangement.*
> *\`:%s/\\(SECTOR-[A-Z]\\) \\(NODE-[0-9]\\)/\\2 \\1/g\` — group one is the sector, group two is the node. In the replacement: two first, then one. Swap.*
> *Capture groups are your first tool for intelligent replacement."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Swap \`SECTOR-X NODE-N\` designations to \`NODE-N SECTOR-X\` order throughout the document.
>
> > [!tip] SKILLS
> > \`:%s/\\(SECTOR-[A-Z]\\) \\(NODE-[0-9]\\)/\\2 \\1/g\` — capture both parts, swap with \`\\2 \\1\`
>
> > [!success] +35 XP
>
> → **[[_content/09 - Capture Operation/R-17-TRANSMISSION-First_Capture|R-17-TRANSMISSION-First_Capture]]** — open to begin. Timer starts on file open.`,path:"09 - Capture Operation/R-17-BRIEFING-First_Capture.md"},{id:"R-17",role:"transmission",kind:"mission",arc:"II",chapter:"09 - Capture Operation",frontmatter:{mission_id:"R-17",title:"First Capture",tier:"🔵 ARC II",xp_reward:35,completed:!1,difficulty:4,category:"regex",mission_type:"practice",locked:!0,unlock_requirement:"Level 8",tags:["vim/regex","vim/capture-groups","arc2","arc2-ch9"],sticker:"lucide//parentheses",color:"#00ff88",summary:"[LOCKED] CORP ordered sector before node. Resistance protocol requires node before sector. Capture both and swap.",why:"Capture two halves, swap their order — node before sector, rewritten without retyping a thing."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  RESISTANCE FIELD MAP — ORDER CORRECTION REQUIRED                ║
║  Document       : Sector-node designation log // wrong order     ║
║  Timestamp      : 2047-06-01 // 08:00                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Capture note
> CORP puts SECTOR first. Resistance protocol: NODE first. Capture both. Swap with \`\\2 \\1\`.

---

FIELD MAP — CORRECTED DESIGNATION ORDER

SECTOR-A NODE-1 — extraction point alpha
SECTOR-B NODE-2 — relay station beta
SECTOR-A NODE-3 — surveillance post gamma
SECTOR-C NODE-4 — comm tower delta
SECTOR-B NODE-5 — fallback route epsilon
SECTOR-A NODE-7 — primary rendezvous`,path:"09 - Capture Operation/R-17-TRANSMISSION-First_Capture.md"},{id:"R-18",role:"briefing",kind:"mission",arc:"I",chapter:"09 - Capture Operation",frontmatter:{mission_type:"briefing",links_to:"09 - Capture Operation/R-18-TRANSMISSION-Mirror_Word",locked:!0,tags:["briefing","arc2","arc2-ch9"],sticker:"lucide//copy-x",color:"#00ff88"},body:`\`\`\`ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-18 // MIRROR WORD               ║
║  Clearance: PATTERN BREAKER  //  ARC II      ║
╚══════════════════════════════════════════════╝
\`\`\`

> [!quote] CIPHER
> *"Capture groups aren't just for swapping. You can use \`\\1\` in the pattern itself — to match the same thing twice.*
> *\`\\(\\w\\+\\) \\1\` matches a word followed by a space followed by the exact same word. Duplicates.*
> *CORP's transcription system stutters. Duplicate words appear throughout this intercept. \`\\1\` finds them. Remove the second instance.*
> *This is backreference: the pattern refers to itself. The match is only valid when both sides are identical."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Remove all duplicate words — where the same word appears twice in a row, keep only one.
>
> > [!tip] SKILLS
> > \`:%s/\\(\\w\\+\\) \\1/\\1/g\` — \`\\1\` backreferences the first group; replacement keeps only one copy
>
> > [!success] +35 XP
>
> → **[[_content/09 - Capture Operation/R-18-TRANSMISSION-Mirror_Word|R-18-TRANSMISSION-Mirror_Word]]** — open to begin. Timer starts on file open.`,path:"09 - Capture Operation/R-18-BRIEFING-Mirror_Word.md"},{id:"R-18",role:"transmission",kind:"mission",arc:"II",chapter:"09 - Capture Operation",frontmatter:{mission_id:"R-18",title:"Mirror Word",tier:"🔵 ARC II",xp_reward:35,completed:!1,difficulty:4,category:"regex",mission_type:"practice",locked:!0,unlock_requirement:"Level 8",tags:["vim/regex","vim/capture-groups","arc2","arc2-ch9"],sticker:"lucide//copy-x",color:"#00ff88",summary:"[LOCKED] CORP transcription stutters duplicate words. Backreference finds them. Remove the echo.",why:"A back-reference catches a word repeating itself — find the stutter, then cut the echo."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP TRANSCRIPTION — STUTTER DETECTED                           ║
║  Document       : Automated comm log // duplicate words present  ║
║  Timestamp      : 2047-06-02 // 14:20                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Stutter note
> The transcription system echoes words. \`\\(\\w\\+\\) \\1\` finds each echo. \`\\1\` in replacement keeps one.

---

COMM LOG — STUTTER STUTTER CORRECTED

PROJECT MIRROR is the the primary surveillance system.
All Resistance channels are are monitored continuously.
NODE-7 confirmed confirmed as our extraction point.
Asset WRAITH WRAITH departed at 22:00 hours.
Channel closed closed after the handoff.
No signal signal drop detected across the operation.`,path:"09 - Capture Operation/R-18-TRANSMISSION-Mirror_Word.md"},{id:"R-19",role:"briefing",kind:"mission",arc:"I",chapter:"09 - Capture Operation",frontmatter:{mission_type:"briefing",links_to:"09 - Capture Operation/R-19-TRANSMISSION-Format_Shift",locked:!0,tags:["briefing","arc2","arc2-ch9"],sticker:"lucide//calendar-arrow-right",color:"#00ff88"},body:'```ascii\n╔══════════════════════════════════════════════╗\n║  INCOMING — CIPHER                           ║\n║  BRIEFING: R-19 // FORMAT SHIFT              ║\n║  Clearance: PATTERN BREAKER  //  ARC II      ║\n╚══════════════════════════════════════════════╝\n```\n\n> [!quote] CIPHER\n> *"CORP timestamps use ISO format: `2047-06-03`. Resistance logging protocol uses day-first: `03.06.2047`.*\n> *Three captured groups. Year in `\\1`, month in `\\2`, day in `\\3`. In the replacement: `\\3.\\2.\\1`.*\n> *Use `\\v` for very magic — clean syntax for digit groups: `(\\d{4})-(\\d{2})-(\\d{2})`.*\n> *`:%s/\\v(\\d{4})-(\\d{2})-(\\d{2})/\\3.\\2.\\1/g`*\n> *This is the real power of capture groups: not just reordering characters, but restructuring data."*\n\n\n> [!abstract] DIRECTIVE\n> > [!warning] OBJECTIVE\n> > Convert all dates from `YYYY-MM-DD` (CORP format) to `DD.MM.YYYY` (Resistance format).\n>\n> > [!tip] SKILLS\n> > `:%s/\\v(\\d{4})-(\\d{2})-(\\d{2})/\\3.\\2.\\1/g` — three groups, reversed order in replacement\n>\n> > [!success] +35 XP\n>\n> → **[[_content/09 - Capture Operation/R-19-TRANSMISSION-Format_Shift|R-19-TRANSMISSION-Format_Shift]]** — open to begin. Timer starts on file open.',path:"09 - Capture Operation/R-19-BRIEFING-Format_Shift.md"},{id:"R-19",role:"transmission",kind:"mission",arc:"II",chapter:"09 - Capture Operation",frontmatter:{mission_id:"R-19",title:"Format Shift",tier:"🔵 ARC II",xp_reward:35,completed:!1,difficulty:4,category:"regex",mission_type:"practice",locked:!0,unlock_requirement:"Level 8",tags:["vim/regex","vim/capture-groups","arc2","arc2-ch9"],sticker:"lucide//calendar-arrow-right",color:"#00ff88",summary:"[LOCKED] CORP dates are ISO format. Resistance protocol is day-first. Three captured groups, reversed in replacement.",why:"Three groups in, reordered out — ISO becomes day-first because capture remembers what you matched."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP TIMELINE — FORMAT CONVERSION REQUIRED                      ║
║  Document       : Event log // CORP timestamp format             ║
║  Timestamp      : 2047-06-03 // 12:00                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Conversion note
> ISO to day-first. \`(\\d{4})-(\\d{2})-(\\d{2})\` captures three groups. Replacement: \`\\3.\\2.\\1\`.

---

PROJECT MIRROR TIMELINE

2046-11-03 — PROJECT MIRROR initiated
2047-01-15 — Continental coverage achieved
2047-02-28 — Resistance channel monitoring active
2047-04-03 — Pattern-matching engine v2 deployed
2047-05-17 — Full Tier-4 clearance issued
2047-06-03 — Current operation date`,path:"09 - Capture Operation/R-19-TRANSMISSION-Format_Shift.md"},{id:"R-20",role:"briefing",kind:"mission",arc:"I",chapter:"09 - Capture Operation",frontmatter:{mission_type:"briefing",links_to:"09 - Capture Operation/R-20-TRANSMISSION-Multi_Group",locked:!0,tags:["briefing","arc2","arc2-ch9"],sticker:"lucide//group",color:"#00ff88"},body:`\`\`\`ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-20 // MULTI GROUP               ║
║  Clearance: PATTERN BREAKER  //  ARC II      ║
╚══════════════════════════════════════════════╝
\`\`\`

> [!quote] CIPHER
> *"CORP asset files store names as LAST, FIRST — surname comma first name. Resistance protocol is FIRST LAST.*
> *Two groups. \`\\(\\w\\+\\), \\(\\w\\+\\)\` — group one is the surname, group two is the first name. Replacement: \`\\2 \\1\`.*
> *You've seen swapping. This is swapping with a structural separator involved — the comma goes away.*
> *The pattern has to account for the comma and space between. The replacement doesn't need them.*
> *I'm in this document too. You'll see my name. Fix it like the rest."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Convert all names from \`SURNAME, FIRSTNAME\` format to \`FIRSTNAME SURNAME\` format.
>
> > [!tip] SKILLS
> > \`:%s/\\(\\w\\+\\), \\(\\w\\+\\)/\\2 \\1/g\` — two groups, comma stripped in replacement
>
> > [!success] +35 XP
>
> → **[[_content/09 - Capture Operation/R-20-TRANSMISSION-Multi_Group|R-20-TRANSMISSION-Multi_Group]]** — open to begin. Timer starts on file open.`,path:"09 - Capture Operation/R-20-BRIEFING-Multi_Group.md"},{id:"R-20",role:"transmission",kind:"mission",arc:"II",chapter:"09 - Capture Operation",frontmatter:{mission_id:"R-20",title:"Multi Group",tier:"🔵 ARC II",xp_reward:35,completed:!1,difficulty:4,category:"regex",mission_type:"practice",locked:!0,unlock_requirement:"Level 8",tags:["vim/regex","vim/capture-groups","arc2","arc2-ch9"],sticker:"lucide//group",color:"#00ff88",summary:"[LOCKED] CORP name format is SURNAME, FIRSTNAME. Resistance is FIRSTNAME SURNAME. Two groups, comma stripped.",why:"Two captured names, comma dropped — SURNAME, FIRSTNAME becomes FIRSTNAME SURNAME in one rule."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP ASSET REGISTER — NAME FORMAT CORRECTION                    ║
║  Document       : Field personnel // CORP surname-first format   ║
║  Timestamp      : 2047-06-05 // 09:00                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Format note
> CORP puts surname first with a comma. \`\\(\\w\\+\\), \\(\\w\\+\\)\` — swap with \`\\2 \\1\`. Comma disappears.

---

ASSET REGISTER — FORMAT, NAME CORRECTED

Ren, WRAITH       — field operative // Zone-Alpha
Ren, VOSS         — technical analyst // Zone-Beta
Niko, GHOST       — intelligence // Zone-Alpha
Vera, NOVA        — field operative // Zone-Gamma
Soren, ECHO       — logistics // Zone-Beta
Yael, SHADOW      — extraction lead // Zone-Delta
CIPHER           — communications // zones, all`,path:"09 - Capture Operation/R-20-TRANSMISSION-Multi_Group.md"},{id:"R-21",role:"briefing",kind:"mission",arc:"I",chapter:"10 - Mirror Rewrite",frontmatter:{mission_type:"briefing",links_to:"10 - Mirror Rewrite/R-21-TRANSMISSION-Global_Strike",locked:!0,tags:["briefing","arc2","arc2-ch10"],sticker:"lucide//target",color:"#ff4444"},body:`\`\`\`ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-21 // GLOBAL STRIKE             ║
║  Clearance: CIPHER ANALYST  //  ARC II       ║
╚══════════════════════════════════════════════╝
\`\`\`

> [!quote] CIPHER
> *"We're close to the core now. PROJECT MIRROR's database uses a compound structure — you need to find lines that match one pattern, then perform a substitution on those lines.*
> *\`:g/pattern/s/old/new/\` — global finds the line, then substitute runs on each match. They compose.*
> *This registry has ENCRYPTED entries — those that are ENCRYPTED should have their STATUS changed from ACTIVE to EXPOSED. Non-encrypted entries stay as-is.*
> *\`:g/ENCRYPTED/s/STATUS: ACTIVE/STATUS: EXPOSED/\`*
> *Two conditions. One command. This is the full power of \`:g\`."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > On every line containing \`ENCRYPTED\`, change \`STATUS: ACTIVE\` to \`STATUS: EXPOSED\`.
>
> > [!tip] SKILLS
> > \`:g/ENCRYPTED/s/STATUS: ACTIVE/STATUS: EXPOSED/\` — global-then-substitute composition
>
> > [!success] +40 XP
>
> → **[[_content/10 - Mirror Rewrite/R-21-TRANSMISSION-Global_Strike|R-21-TRANSMISSION-Global_Strike]]** — open to begin. Timer starts on file open.`,path:"10 - Mirror Rewrite/R-21-BRIEFING-Global_Strike.md"},{id:"R-21",role:"transmission",kind:"mission",arc:"II",chapter:"10 - Mirror Rewrite",frontmatter:{mission_id:"R-21",title:"Global Strike",tier:"🔵 ARC II",xp_reward:40,completed:!1,difficulty:5,category:"regex",mission_type:"practice",locked:!0,unlock_requirement:"Level 9",tags:["vim/regex","vim/global","arc2","arc2-ch10"],sticker:"lucide//target",color:"#ff4444",summary:"[LOCKED] PROJECT MIRROR's encrypted entries are hidden as ACTIVE. Compose :g with :s to expose them all.",why:"Compose :g with :s and the global command becomes a scalpel — find the hidden lines, then rewrite each."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  PROJECT MIRROR — CORE REGISTRY FRAGMENT                         ║
║  Document       : Surveillance entry log // status field         ║
║  Classification : TIER-4 EYES ONLY                               ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Strike note
> Encrypted entries are the ones that matter. Change their status — compose \`:g\` with \`:s\`. Exact command is in your briefing.

---

MIRROR REGISTRY — EXPOSURE LOG

CHANNEL-01 : CLEAR     : STATUS: ACTIVE
CHANNEL-02 : ENCRYPTED : STATUS: ACTIVE
CHANNEL-03 : CLEAR     : STATUS: ACTIVE
CHANNEL-04 : ENCRYPTED : STATUS: ACTIVE
CHANNEL-05 : ENCRYPTED : STATUS: ACTIVE
CHANNEL-06 : CLEAR     : STATUS: ACTIVE
CHANNEL-07 : ENCRYPTED : STATUS: ACTIVE

Encrypted channels: 4. Clear channels: 3. Target: all four read EXPOSED.`,path:"10 - Mirror Rewrite/R-21-TRANSMISSION-Global_Strike.md"},{id:"R-22",role:"briefing",kind:"mission",arc:"I",chapter:"10 - Mirror Rewrite",frontmatter:{mission_type:"briefing",links_to:"10 - Mirror Rewrite/R-22-TRANSMISSION-Inverse_Delete",locked:!0,tags:["briefing","arc2","arc2-ch10"],sticker:"lucide//eraser",color:"#ff4444"},body:`\`\`\`ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-22 // INVERSE DELETE            ║
║  Clearance: CIPHER ANALYST  //  ARC II       ║
╚══════════════════════════════════════════════╝
\`\`\`

> [!quote] CIPHER
> *"CORP's surveillance log contains thousands of lines. Only the ones related to PROJECT MIRROR matter.*
> *\`:v/pattern/d\` — the inverse of \`:g\`. Delete every line that does NOT match. Only the matching lines survive.*
> *\`:v/MIRROR/d\` — keeps only MIRROR-related lines. Everything else is noise.*
> *This is the same operation as \`:g!/MIRROR/d\`. The \`v\` form is shorter. Both work. Pick the one you remember.*
> *What remains after this run will tell us something about PROJECT MIRROR's scope. I need to know."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Keep only lines containing \`MIRROR\`. Delete everything else.
>
> > [!tip] SKILLS
> > \`:v/MIRROR/d\` — inverse global delete (equivalent to \`:g!/MIRROR/d\`)
>
> > [!success] +40 XP
>
> → **[[_content/10 - Mirror Rewrite/R-22-TRANSMISSION-Inverse_Delete|R-22-TRANSMISSION-Inverse_Delete]]** — open to begin. Timer starts on file open.`,path:"10 - Mirror Rewrite/R-22-BRIEFING-Inverse_Delete.md"},{id:"R-22",role:"transmission",kind:"mission",arc:"II",chapter:"10 - Mirror Rewrite",frontmatter:{mission_id:"R-22",title:"Inverse Delete",tier:"🔵 ARC II",xp_reward:40,completed:!1,difficulty:5,category:"regex",mission_type:"practice",locked:!0,unlock_requirement:"Level 9",tags:["vim/regex","vim/global","arc2","arc2-ch10"],sticker:"lucide//eraser",color:"#ff4444",summary:"[LOCKED] A full surveillance log. Keep only the MIRROR-related lines. Everything else goes.",why:":v keeps only what matches and burns the rest — the fastest way to isolate the signal in a flood."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP SURVEILLANCE LOG — FULL FEED                               ║
║  Document       : Mixed content // target lines embedded         ║
║  Classification : TIER-4 EYES ONLY                               ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Filter note
> \`:v\` is the inverse delete — keep only the project's lines. The full scope will be visible once the noise is gone.

---

PROJECT MIRROR — SCOPE SUMMARY

0441 :: sector sweep alpha — nominal
PROJECT MIRROR covers all seven Resistance sectors.
relay maintenance window 03:00–03:30 — Sector 3
PROJECT MIRROR monitoring: 24/7, automated.
canteen rotation notice — Sector 3 staff
PROJECT MIRROR database: distributed, redundant.
0518 :: checksum audit — passed
PROJECT MIRROR exposure risk: currently ZERO.
transport manifest 7741 — cleared
PROJECT MIRROR operational lifespan: indefinite.`,path:"10 - Mirror Rewrite/R-22-TRANSMISSION-Inverse_Delete.md"},{id:"R-23",role:"briefing",kind:"mission",arc:"I",chapter:"10 - Mirror Rewrite",frontmatter:{mission_type:"briefing",links_to:"10 - Mirror Rewrite/R-23-TRANSMISSION-Cascade",locked:!0,tags:["briefing","arc2","arc2-ch10"],sticker:"lucide//zap",color:"#ff4444"},body:`\`\`\`ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-23 // CASCADE                   ║
║  Clearance: CIPHER ANALYST  //  ARC II       ║
╚══════════════════════════════════════════════╝
\`\`\`

> [!quote] CIPHER
> *"You need to run two operations in sequence on this document. Not one — two. Each changes the state; the second depends on the first.*
> *First: delete all NOISE lines with \`:g/\\[NOISE\\]/d\`.*
> *Second: on every remaining MIRROR line, change STATUS: PENDING to STATUS: TERMINATED with \`:g/MIRROR/s/PENDING/TERMINATED/\`.*
> *Run them in order. The second command only sees the document as the first command left it.*
> *Composing operations is the core skill. CORP built PROJECT MIRROR by composing simple rules. We dismantle it the same way."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Step 1: Delete all lines containing \`[NOISE]\`. Step 2: On MIRROR lines, change PENDING to TERMINATED.
>
> > [!tip] SKILLS
> > \`:g/\\[NOISE\\]/d\` then \`:g/MIRROR/s/PENDING/TERMINATED/\` — two sequential operations
>
> > [!success] +40 XP
>
> → **[[_content/10 - Mirror Rewrite/R-23-TRANSMISSION-Cascade|R-23-TRANSMISSION-Cascade]]** — open to begin. Timer starts on file open.`,path:"10 - Mirror Rewrite/R-23-BRIEFING-Cascade.md"},{id:"R-23",role:"transmission",kind:"mission",arc:"II",chapter:"10 - Mirror Rewrite",frontmatter:{mission_id:"R-23",title:"Cascade",tier:"🔵 ARC II",xp_reward:40,completed:!1,difficulty:5,category:"regex",mission_type:"practice",locked:!0,unlock_requirement:"Level 9",tags:["vim/regex","vim/global","arc2","arc2-ch10"],sticker:"lucide//zap",color:"#ff4444",summary:"[LOCKED] Two operations, in sequence. Delete the noise. Then terminate the MIRROR entries. Order matters.",why:"Two passes, in order: delete the noise first, terminate the targets second — sequence is the whole trick."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  PROJECT MIRROR — OPERATIONS REGISTER                            ║
║  Document       : Two-phase cleanup required                     ║
║  Classification : TIER-4 EYES ONLY                               ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Cascade note
> Two commands. Sequence matters. Delete noise first — then the second pass only sees what remains.

---

MIRROR OPERATIONS — PENDING

[NOISE] 0x91 carrier residue — discard
MIRROR-OP-01 : STATUS: PENDING
[NOISE] checksum spill // sector static
MIRROR-OP-02 : STATUS: PENDING
MIRROR-OP-03 : STATUS: PENDING
[NOISE] relay echo — no payload
MIRROR-OP-04 : STATUS: PENDING
MIRROR-OP-05 : STATUS: PENDING
[NOISE] EOF fragment — unparsed

Cascade complete. PROJECT MIRROR operations: PENDING.`,path:"10 - Mirror Rewrite/R-23-TRANSMISSION-Cascade.md"},{id:"R-24",role:"briefing",kind:"mission",arc:"I",chapter:"10 - Mirror Rewrite",frontmatter:{mission_type:"briefing",links_to:"10 - Mirror Rewrite/R-24-TRANSMISSION-Project_Mirror",locked:!0,tags:["briefing","arc2","arc2-ch10","arc2-finale"],sticker:"lucide//eye-off",color:"#ff4444"},body:`\`\`\`ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER // FINAL TRANSMISSION     ║
║  BRIEFING: R-24 // PROJECT MIRROR            ║
║  Clearance: CIPHER ANALYST  //  FINALE       ║
╚══════════════════════════════════════════════╝
\`\`\`

> [!quote] CIPHER
> *"I need to tell you something before you open this file.*
> *PROJECT MIRROR tracks every communication in the Resistance. Every channel. Every codename. Every location.*
> *Including mine.*
> *I've been running patterns against CORP's own data for eighteen months. Finding their surveillance architecture from the inside. Every mission I sent you was built from CORP intercepts I decoded using exactly what you've been learning.*
> *The document in front of you is PROJECT MIRROR's core index. All its surveillance targets. All its active channels. I'm in there.*
> *Three operations. Delete the CORP status lines. Expose the CIPHER tracking entry. Replace ACTIVE with TERMINATED across the entire index.*
> *When you submit: PROJECT MIRROR goes dark. CORP loses visibility on every Resistance channel simultaneously. Including the one you're reading this on.*
> *You've been training for this.*
> *Do it."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Three operations in sequence:
> > 1. Delete all lines containing \`[CORP-STATUS]\`
> > 2. Change \`CIPHER: TRACKED\` to \`CIPHER: EXPOSED\` on the CIPHER entry
> > 3. Replace all remaining \`ACTIVE\` with \`TERMINATED\`
>
> > [!tip] SKILLS
> > \`:g/\\[CORP-STATUS\\]/d\` → \`:%s/CIPHER: TRACKED/CIPHER: EXPOSED/\` → \`:%s/ACTIVE/TERMINATED/g\`
>
> > [!success] +40 XP — ARC II COMPLETE
>
> → **[[_content/10 - Mirror Rewrite/R-24-TRANSMISSION-Project_Mirror|R-24-TRANSMISSION-Project_Mirror]]** — open to begin. This is the last one.`,path:"10 - Mirror Rewrite/R-24-BRIEFING-Project_Mirror.md"},{id:"R-24",role:"transmission",kind:"mission",arc:"II",chapter:"10 - Mirror Rewrite",frontmatter:{mission_id:"R-24",title:"Project Mirror",tier:"🔵 ARC II",xp_reward:40,completed:!1,difficulty:5,category:"regex",mission_type:"practice",locked:!0,unlock_requirement:"Level 9",tags:["vim/regex","vim/global","arc2","arc2-ch10","arc2-finale"],sticker:"lucide//eye-off",color:"#ff4444",summary:"[LOCKED] PROJECT MIRROR's core index. Three operations. When you're done, it goes dark.",why:"The finale chains three operations into one clean strike — when it lands, the index goes dark."},body:`\`\`\`ascii-chromatic
╔══════════════════════════════════════════════════════════════════╗
║  PROJECT MIRROR — CORE SURVEILLANCE INDEX                        ║
║  Classification : TIER-4 EYES ONLY                               ║
║  Status         : ACTIVE // all channels monitored               ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Final instruction
> Three commands. In sequence. You know what to do.

---

PROJECT MIRROR — SURVEILLANCE TARGETS

[CORP-STATUS] sweep cycle 0441 — nominal
WRAITH       : NEXUS channel — STATUS: ACTIVE
GHOST        : NEXUS channel — STATUS: ACTIVE
[CORP-STATUS] pattern engine v4.1 — coverage 99.7%
REN VOSS     : NEXUS channel — STATUS: ACTIVE
NOVA VERA    : field comms   — STATUS: ACTIVE
ECHO SOREN   : logistics     — STATUS: ACTIVE
[CORP-STATUS] retention compliance — UDCA 88-F
SHADOW YAEL  : field comms   — STATUS: ACTIVE
CIPHER: TRACKED — STATUS: ACTIVE

---

> [!success] CIPHER — Transmission ends
> *PROJECT MIRROR has been terminated.*
> *Every channel went dark simultaneously. CORP's surveillance grid collapsed inward.*
> *You did this. Eighteen months of work — yours and mine.*
> *The Resistance now has a window. We use it.*
> *Signal clean. NEXUS confirms.*
> *— CIPHER, out."*`,path:"10 - Mirror Rewrite/R-24-TRANSMISSION-Project_Mirror.md"},{id:"FRAGMENT-01-Efficiency_Report_7734",role:"fragment",kind:"lore",arc:"I",chapter:"FRAGMENTS",frontmatter:{tags:["fragment"],sticker:"lucide//file-text",color:"#333333",title:"Efficiency Report 7734",summary:"An automated CORP Q1 2047 sector report tallying Vim intercepts and workforce reclassifications."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP — CONGLOMERATE OF REGULATED PROCESSES                      ║
║  Infrastructure & Compliance Division                            ║
╠══════════════════════════════════════════════════════════════════╣
║  Document Type  : Sector Efficiency Report — Q1 2047             ║
║  Sector         : 7 — Northern Relay Cluster                     ║
║  Classification : Internal Distribution Only                     ║
║  Audit Code     : IAL-2047-7734-Δ / REP-Q1-0091                  ║
║  Generated      : 2047-03-31T23:59:01Z (Automated)               ║
║  Reviewer       : None — No human review required                ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

---

## Executive Summary

Sector 7 Productivity Index for Q1 2047 stands at **94.3%**, representing a 1.7-point improvement over Q4 2046 (92.6%). Deviation threshold compliance across all monitored nodes reached 97.2%. Network throughput efficiency is rated within acceptable variance bounds.

Non-compliant entity resolutions: **5** (Q4 2046: 2). Trend: improving.

Automated harmonization services remain the primary driver of sector stability. No manual intervention was required at the infrastructure level during the reporting period.

---

## Legacy Infrastructure Usage

Four legacy-tier text interface protocols remain in active detection scope for Sector 7. During Q1 2047, **7 usage incidents** involving Vi Improved (Vim) terminal environments were recorded across the sector's monitored endpoints.

| Period   | Incidents | Intercept Rate |
|----------|-----------|----------------|
| Q3 2046  | 11        | 96.1%          |
| Q4 2046  | 9         | 94.7%          |
| Q1 2047  | 7         | 91.4%          |

Incident volume trend is favorable. However, Automated Content Harmonization Engine v4.1 intercept rate of **91.4%** falls below the target threshold of 95.0%. A harmonization coverage audit has been scheduled for Q2 2047.

Note: Unintercepted sessions are subject to retrospective log analysis. Retrospective resolution is classified as a delayed harmonization event and does not affect the intercept rate metric for the originating quarter.

---

## Workforce Optimization

Five efficiency corrections were processed in Q1 2047. All resolutions were completed within the standard processing window. No escalations were required.

| Case No.   | Infraction Category                        | Resolution Type              |
|------------|--------------------------------------------|------------------------------|
| WO-7734-09 | Unauthorized endpoint access attempt       | Temporary access suspension  |
| WO-7734-14 | Legacy protocol usage (confirmed, >3 sessions) | Reclassification — Tier 2 |
| WO-7734-21 | Dissemination of non-harmonized content    | Reclassification — Tier 1    |
| WO-7734-33 | Repeated deviation from assigned workflow  | Productivity reassignment    |
| WO-7734-47 | Possession of unlicensed terminal emulator | Reclassification — Tier 2    |

Reclassification processing timelines met compliance targets in all instances. Reassigned workforce units have been reallocated to lower-sensitivity operational sectors pending review.

---

## Closing Statement

This report was generated and distributed by automated compliance infrastructure. All figures are derived from sensor telemetry, endpoint monitoring logs, and Harmonization Engine output records. No manual data entry was performed.

Document retention policy: **7 years** from generation date, per CORP Standard DS-114-C. Secure disposal thereafter — automated.

Queries regarding this report may be directed to the Infrastructure & Compliance Division ticketing system. Response times are not guaranteed for non-priority classifications.

\`\`\`ascii
── END OF DOCUMENT ─────────────────────────────────────────────────
   CORP — Infrastructure & Compliance Division
   IAL-2047-7734-Δ / REP-Q1-0091 — 2047-03-31T23:59:01Z
   This document was not written. It was generated.
────────────────────────────────────────────────────────────────────
\`\`\``,path:"FRAGMENTS/FRAGMENT-01-Efficiency_Report_7734.md"},{id:"FRAGMENT-02-Last_Broadcast",role:"fragment",kind:"lore",arc:"I",chapter:"FRAGMENTS",frontmatter:{tags:["fragment"],sticker:"lucide//radio",color:"#2a2a2a",title:"The Last Broadcast",summary:"A resistance cell's relay transmission that breaks off mid-sentence as someone reaches the door."},body:`---

*[Recovered — 2044.11.03 // origin cell: unknown // do not modify]*

Broadcast open. Whoever finds this, you know what to do with it.

Cell status: stable. Four of us now — Maren left in September, clean exit, no contact since. That's how it's supposed to work.

We've been running relays through the old rail authority servers in Gdansk. Slow but consistent. Nobody looks there anymore. If you're picking this up on the standard band, you already know the frequency. If not, backtrack the header.

Rations are fine. It's cold here. November early, but the heat in this building hasn't worked in two years so we're used to it. Tomasz rigged a space heater in the back room. Works most nights.

The file we've been working on — the route mapping — it's almost done. Took longer than expected because the data was corrupt in three segments. Had to reconstruct manually. I was just cleaning it up, running \`:g/^#/d\` to strip the comment headers before we pass it along. Cleaner that way. Oskar's checking the relay timing again. Radio's been stable at 0300 local. We can push it by Thursday if nothing breaks.

Current objective on track. No external contact in eight weeks. The cell is holding. 

I was just running through the final — wait, someone's at the door and that's`,path:"FRAGMENTS/FRAGMENT-02-Last_Broadcast.md"},{id:"FRAGMENT-03-Pre-CORP_Archive",role:"fragment",kind:"lore",arc:"I",chapter:"FRAGMENTS",frontmatter:{tags:["fragment"],sticker:"lucide//archive",color:"#1a1a1a",title:"Pre-CORP Archive: Why People Still Use Vim",summary:"A preserved 2029 forum post where a coder explains how Vim's grammar finally clicked."},body:`*[Recovered — pre-Cascade archive // last modified: 2029-08-03 // do not modify]*

---

**Re: why do people still use Vim in 2029 lol**
*Posted to devtalk.net › tools › editors — 2029-08-03*

---

Okay I'll bite. I switched to Vim about three years ago because a coworker wouldn't stop talking about it and I got curious. Spent the first two weeks hating it. Genuinely considered uninstalling it every single day.

Then something clicked. I don't know when exactly. I think it was the day I realized \`ci"\` means "change inside quotes" and I just... understood the grammar of it. Like it's not shortcuts, it's a language. Verb + noun. \`d\` deletes, \`c\` changes, \`y\` yanks. You combine them with motion or text object and suddenly you can say *exactly* what you mean.

The mode thing isn't confusing once you stop thinking of it as a bug. Normal mode is where you *think*. Insert mode is where you *type*. They're not fighting each other, they're just different gears.

My personal favorite right now: \`:%s/old/new/gc\` for renaming things across a file with confirmation on each hit. I know people say "just use find-and-replace in a GUI" but doing it in Vim feels like having a conversation with the file instead of clicking around in it.

Also \`gg=G\` to auto-indent the whole buffer when I inherit someone else's messy config file. Saved me so much frustration last week.

Is it for everyone? Probably not. My partner tried it for a month and went back to their usual setup and I respect that. But if it clicks for you, it really clicks.

Anyway I need to go pick up my daughter from practice, so that's my TED talk on a 50-year-old text editor. Hope it helps someone.

— Mika

> *— Preserved. 2029-08-03. Whoever this was: they got it right.*`,path:"FRAGMENTS/FRAGMENT-03-Pre-CORP_Archive.md"},{id:"FRAGMENT-04-Sector_7_Audit_Query",role:"fragment",kind:"lore",arc:"I",chapter:"FRAGMENTS",frontmatter:{tags:["fragment"],sticker:"lucide//clipboard-list",color:"#555555",title:"Sector 7 Audit Query",summary:"An automated CORP query flagging a spike in legacy-protocol sessions across Sector 7 endpoints."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP — CONGLOMERATE OF REGULATED PROCESSES                      ║
║  Infrastructure & Compliance Division                            ║
║  Automated Audit Query                                           ║
╠══════════════════════════════════════════════════════════════════╣
║  Document Type  : Ad-Hoc Audit Query — Trigger-Based             ║
║  Sector         : 7 — Northern Relay Cluster                     ║
║  Classification : Internal — Division Circulation                ║
║  Audit Code     : IAL-2047-7734-Ω / ADQ-04128                    ║
║  Trigger        : Threshold Breach — Legacy Protocol Usage       ║
║  Generated      : 2047-05-11T02:08:44Z (Automated)               ║
║  Reviewer       : None — Automated Classification Pending        ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

---

## Trigger Summary

An ad-hoc audit query has been generated in response to a Sector 7 metric deviation detected during the rolling 14-day compliance window. Legacy-tier text interface incident volume has registered at **11 events** over the monitoring window, exceeding the quarterly baseline by a factor of 1.57.

The deviation falls within monitoring tolerance but above automated alert threshold. Classification of this query: **Informational**. No escalation required at present.

---

## Observed Deviation

| Metric                                    | 14-Day Window | Baseline (Q1 2047) | Variance |
|-------------------------------------------|---------------|--------------------|----------|
| Legacy protocol sessions, flagged         | 11            | 7.0 (rolling avg)  | +1.57×   |
| Harmonization intercept rate              | 88.9%         | 91.4%              | −2.5 pts |
| Endpoint diversity (unique credentials)   | 6             | 3.4 (rolling avg)  | +1.76×   |
| Session duration, mean                    | 3.1 min       | 4.2 min            | −26.2%   |

Session duration is trending toward shorter intervals. Endpoint diversity is increasing. Intercept rate has decreased by 2.5 points relative to the most recent quarterly baseline.

The combined signature of these variances has been observed previously in adjacent sectors during periods of procedural review and does not, at this threshold, constitute an escalation event.

---

## Endpoint Classification

Of the six endpoint credentials registering legacy-protocol activity during the window, all remain within assigned workforce allocations. No credential has been flagged for reclassification review under standard criteria. Cross-reference against the Workforce Optimization roster has returned **zero matches** for the current period.

Credential anonymization is maintained per DS-114-C. Endpoint-to-operative mapping is not surfaced at this classification level.

---

## Recommended Actions

1. Continuation of standard monitoring at current scanning cadence.
2. Scheduling of a supplemental Harmonization Engine coverage review for Sector 7, to be completed within the Q2 reporting period.
3. No manual investigation is recommended at this threshold.

No human review is required. This query has been filed for automated cross-referencing against subsequent quarterly reports. Should deviation persist across two consecutive monitoring windows, an escalation classification will be issued automatically.

---

## Closing Statement

This audit query was generated by automated compliance infrastructure in response to a threshold breach. All figures are derived from endpoint telemetry and Harmonization Engine output records. No manual data entry was performed. No human reviewer has been assigned.

Document retention: **7 years** from generation date, per CORP Standard DS-114-C.

\`\`\`ascii
── END OF QUERY ────────────────────────────────────────────────────
   CORP — Infrastructure & Compliance Division
   IAL-2047-7734-Ω / ADQ-04128 — 2047-05-11T02:08:44Z
   Automated query. No response required.
────────────────────────────────────────────────────────────────────
\`\`\``,path:"FRAGMENTS/FRAGMENT-04-Sector_7_Audit_Query.md"},{id:"FRAGMENT-05-Intercepted_Handler_Note",role:"fragment",kind:"lore",arc:"I",chapter:"FRAGMENTS",frontmatter:{tags:["fragment"],sticker:"lucide//radio",color:"#333333",title:"Intercepted Handler Note",summary:"An encrypted handler message warning an operative off a compromised relay and onto the cold path."},body:`> *Recovered fragment — outbound channel, handler-tier encryption. Timestamp partial. Routing headers stripped by interception.*

---

The last three pulls arrived clean. The one before that did not.

You were slower by a margin I can measure. That is unusual for you.

If your cover is thinning, say so. Not in prose. One word. I will reroute the network around you in under an hour. No one will know why.

If it is something else, I need to know that too. Same rule. One word.

Do not send the next pull through relay four. Relay four has been querying credentials it should not have access to. Use the cold path. You remember the cold path.

I am not asking about you. I am asking about the work. Both answers are legitimate.

Good.

---

> *[Transmission ends. No sign-off. Standard for handler-tier comms.]*`,path:"FRAGMENTS/FRAGMENT-05-Intercepted_Handler_Note.md"},{id:"FRAGMENT-06-Last_Pull",role:"fragment",kind:"lore",arc:"I",chapter:"FRAGMENTS",frontmatter:{tags:["fragment"],sticker:"lucide//file-lock",color:"#2a2a2a",title:"The Last Pull",summary:"An operative's final note on credential queries against their cover, wrapped around a CORP maintenance schedule."},body:`> [!note] Pulled 2047-06-03 // 02:14. Hash verified twice. Clean on my side. Relay logs are not.
> Three credential queries against my cover ID in the last 72 hours. First two could be routine. Third matches a pattern I've seen them run on flagged entities.
> If this one lands and the next one doesn't, it means —

---

\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP — INFRASTRUCTURE & COMPLIANCE DIVISION                     ║
║  Service Window Schedule — Northern Relay Cluster                ║
╠══════════════════════════════════════════════════════════════════╣
║  Document Type  : Operational Maintenance Schedule — 30-Day      ║
║  Region         : Sector 7 / Sub-Regions 7.2, 7.4, 7.6           ║
║  Classification : Internal — Operations Tier                     ║
║  Audit Code     : OMS-2047-7734-R / SCH-30D-0883                 ║
║  Generated      : 2047-05-30T00:00:00Z (Automated)               ║
║  Reviewer       : Operations Scheduling Automation               ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

### Scheduled Monitoring-Service Windows — June 2047

During the intervals listed below, Harmonization Engine scanning on the specified relay nodes operates in **reduced-capacity mode**. Pattern-analysis coverage is maintained. Real-time endpoint flagging is deferred to post-window batch processing.

| Date (2047) | Node Cluster | Window Start (UTC) | Duration | Mode              |
|-------------|--------------|--------------------|----------|-------------------|
| 06-02       | 7.2-N04      | 03:00              | 42 min   | Reduced Capacity  |
| 06-05       | 7.4-N11      | 03:15              | 38 min   | Reduced Capacity  |
| 06-09       | 7.2-N07      | 04:00              | 55 min   | Offline / Patch   |
| 06-12       | 7.6-N03      | 02:45              | 40 min   | Reduced Capacity  |
| 06-16       | 7.4-N11      | 03:30              | 44 min   | Reduced Capacity  |
| 06-21       | 7.2-N04      | 04:00              | 60 min   | Offline / Patch   |
| 06-26       | 7.6-N08      | 03:00              | 39 min   | Reduced Capacity  |
| 06-28       | 7.4-N02      | 03:15              | 42 min   | Reduced Capacity  |

### Operational Notes

Endpoint telemetry during windows in **Offline / Patch** mode is buffered and transmitted upon service resumption. Buffered telemetry is subject to delayed flagging. Scheduled-window deviation events are reconciled against post-window batch output within 24 hours of window closure.

Node clusters listed above represent the complete scheduled maintenance footprint for the reporting period. Unscheduled service events are communicated via standard Operations Tier channels.

\`\`\`ascii
── END OF SCHEDULE ─────────────────────────────────────────────────
   CORP — Infrastructure & Compliance Division
   OMS-2047-7734-R / SCH-30D-0883 — 2047-05-30T00:00:00Z
   Automated schedule. Distribution: Operations Tier, Cluster 7.
────────────────────────────────────────────────────────────────────
\`\`\``,path:"FRAGMENTS/FRAGMENT-06-Last_Pull.md"},{id:"FRAGMENT-07-Extraction_Hold",role:"fragment",kind:"lore",arc:"I",chapter:"FRAGMENTS",frontmatter:{tags:["fragment"],sticker:"lucide//shield-alert",color:"#444444",title:"Extraction Hold",summary:"A captured WRAITH order freezing all extraction routes through Sector 7 until further notice."},body:`> *Operational order. Captured mid-distribution. Routing: cells in Sector 7 and adjacent.*

---

\`\`\`
TO      : CELLS 07-A / 07-B / 07-C / 12-F / 12-G
FROM    : WRAITH
CHANNEL : Cold route, no echo
TIME    : Effective immediately
\`\`\`

**Order: All extraction routes terminating at or passing through Sector 7 are on hold.**

No exceptions. No pending operations are reclassified as urgent. Urgent operations are cancelled.

Do not move assets you have staged. Do not surface contact with staged assets. If you are holding a warm meet, walk it. If you are carrying for someone, carry it another week.

Reasons are not on this channel. Reasons are not coming to this channel.

I will lift the hold. Until I lift the hold, you do not route through that sector. Not for anyone. Not for anyone you know. Not for anyone you think you know.

If you have a pending handoff I need to know about, send it to the cold box. Short. One line. I will not reply to explanations.

Acknowledge receipt on the standard pattern. Silence is not acknowledgement.

— WRAITH`,path:"FRAGMENTS/FRAGMENT-07-Extraction_Hold.md"},{id:"FRAGMENT-08-Handler_Log",role:"fragment",kind:"lore",arc:"I",chapter:"FRAGMENTS",frontmatter:{tags:["fragment"],sticker:"lucide//notebook-pen",color:"#3a3a3a",title:"Handler Log",summary:"A handler's private log tracking days of silence from a missing operative as protocol demands the work continue."},body:`> *Private working log — recovered from a relay cache. Not intended for distribution.*

---

**2047-06-05 // 22:40**
Third check on the cold box. Nothing.

**2047-06-06 // 02:10**
Third check, second pass. Nothing.

Rerouted 07-A through the eastern relay chain. Loss in throughput is acceptable. 07-B is self-routing for the week; they know what to do.

**2047-06-07 // 03:00**
Still nothing. This is the outer bound of what I would call a long silence. Past this bound, it is a different thing.

I am not going to write down what that thing is.

**2047-06-08 // 01:15**
Standard protocol says: after five days, assume capture. Reallocate routes. Do not attempt contact. Do not assume extraction. Continue the work.

The protocol is correct.

**2047-06-08 // 01:22**
I taught them the cold path. I know they remember it.

**2047-06-08 // 01:24**
The protocol is correct. Continue the work.

**2047-06-09 // 04:00**
WRAITH has extended the sector hold. Good. Two more cells are shifting to dead-drop cadence. I will move the intake schedule by six days and compress the mid-tier roster accordingly.

**2047-06-09 // 04:45**
The new operative is submitting faster than I expected. Clean runs. They do not know what is happening in the background. They should not. They should work.

The work is the answer.

**2047-06-09 // 04:47**
I need to send the next batch of files by 06:00. I will finish this entry later.

**2047-06-10**`,path:"FRAGMENTS/FRAGMENT-08-Handler_Log.md"},{id:"FRAGMENT-09-Anomaly_Audit",role:"fragment",kind:"lore",arc:"I",chapter:"FRAGMENTS",frontmatter:{tags:["fragment"],sticker:"lucide//file-text",color:"#555555",title:"Anomaly Audit",summary:"A CORP audit report suspecting the Harmonization Engine's glitches are a covert signaling channel between cells."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP — CONGLOMERATE OF REGULATED PROCESSES                      ║
║  Internal Audit Division — Pattern Analysis Unit                 ║
╠══════════════════════════════════════════════════════════════════╣
║  Document Type  : Anomaly Audit Report — Restricted Circulation  ║
║  Scope          : Harmonization Output — Cross-Sector Sample     ║
║  Classification : Internal — Audit Division Only                 ║
║  Audit Code     : AAR-2047-0214 / PAU-CS-0037                    ║
║  Sample Window  : 2047-01-01 to 2047-03-15                       ║
║  Generated      : 2047-03-20T18:22:07Z (Automated)               ║
║  Reviewer       : Pattern Analysis Unit — Tier 2 Analyst         ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

---

## Executive Summary

A cross-sector sample of Harmonization Engine v4.1 output has been subjected to statistical analysis. Output distributions across the sample population deviate from theoretical randomness at a significance level of **p < 0.003**. The deviation is consistent across sectors and does not correlate with Engine load, sector traffic volume, or scheduled maintenance windows.

The observed non-randomness is assessed as having **exogenous origin**. A working hypothesis has been formulated. Recommendations follow.

---

## Observed Pattern Characteristics

Output injections produced by the Harmonization Engine during the sample window exhibit the following non-random properties:

| Property                                    | Expected (Random) | Observed     | Deviation  |
|---------------------------------------------|-------------------|--------------|------------|
| Byte-position distribution, uniformity      | 0.991 ± 0.005     | 0.847        | −14.5%     |
| Inter-injection distance, mean (bytes)      | 14.2              | 11.6         | −18.3%     |
| Repeat-substring incidence, 4-byte windows  | 2.1 per kB        | 6.4 per kB   | +205%      |
| Cross-file substring concordance            | Negligible        | Measurable   | N/A        |

Byte-position distribution has skewed from uniform. Inter-injection distance has compressed. Substring repetition within and across harmonized files has increased by a factor exceeding three. Concordance across files generated by independent Engine instances has emerged where none was theoretically possible.

These properties are not consistent with the specified stochastic output profile for Engine v4.1.

---

## Working Hypothesis

Pattern Analysis Unit assesses the observed non-randomness as originating **outside Engine v4.1 operational boundaries**. The Engine itself performs within specification at the input and processing layers. The deviation surfaces at the output substitution layer and is consistent with **post-injection content manipulation by external actors**.

Current assessment: non-compliant entities operating within the infrastructure's legacy-protocol usage envelope are hypothesized to be embedding coordinated content within their own restored documents. Restoration artifacts may be serving as a covert signaling channel between cells, using the Engine's injection pattern as a steganographic carrier. This would be consistent with the cross-file substring concordance observed above.

This hypothesis accounts for the observed properties. No alternative hypothesis has been formulated at the present analysis tier.

---

## Recommended Actions

1. Expansion of Harmonization Engine v4.1 output-layer scanning coverage by a factor of 2.0 across all monitored sectors.
2. Deployment of substring-concordance scanning against the legacy-protocol usage endpoint population.
3. Reclassification of legacy-protocol incidents from **Cat. 7 Non-Compliance** to **Cat. 5 Factual Non-Compliance** for the duration of the follow-on investigation.
4. Scheduled cross-reference of pattern-analysis output against Workforce Optimization rosters at bi-weekly cadence.
5. No modification to Engine v4.1 itself is recommended. Engine performance remains within specification.

---

## Closing Statement

This report was generated by Pattern Analysis Unit automated tooling following the Q1 2047 statistical audit cycle. All figures are derived from Harmonization Engine output logs and cross-sector sample aggregation. No manual data entry was performed.

Distribution: Audit Division only. Operational distribution is subject to Tier 2 reviewer approval at follow-on analysis cycle.

\`\`\`ascii
── END OF REPORT ───────────────────────────────────────────────────
   CORP — Internal Audit Division
   AAR-2047-0214 / PAU-CS-0037 — 2047-03-20T18:22:07Z
   Automated. No human review required for distribution at this tier.
────────────────────────────────────────────────────────────────────
\`\`\``,path:"FRAGMENTS/FRAGMENT-09-Anomaly_Audit.md"},{id:"FRAGMENT-10-Pre_Release_Sector_7_Bulletin",role:"fragment",kind:"lore",arc:"I",chapter:"FRAGMENTS",frontmatter:{tags:["fragment"],sticker:"lucide//file-text",color:"#555555",title:"Pre-Release Sector 7 Bulletin",summary:"An unsanitized draft citizen bulletin exposing Sector 7's falling productivity and rising enforcement."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP — CONGLOMERATE OF REGULATED PROCESSES                      ║
║  Office of Sector Communications — Sector 7 Division             ║
╠══════════════════════════════════════════════════════════════════╣
║  Document Type  : Citizen Bulletin — Pre-Release Draft           ║
║  Edition        : 14 / Quarter 2 / 2047                          ║
║  Revision       : DRAFT-R3 — 2047-06-25T09:14:00Z               ║
║  Classification : INTERNAL — AWAITING COMMUNICATIONS REVIEW      ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] Clean pull from Communications staging server. Relay monitor didn't flag. This is R3 — one revision before final sign-off. Four lines didn't survive the sanitation pass. Visible when paired with the sanitized release.
> — [TRANSMISSION ENDS]

---

**SECTOR 7 CITIZEN BULLETIN — Q2 2047 // EDITION 14**

---

**PRODUCTIVITY & COMPLIANCE**

Your sector's productivity index for Q2 2047 registered at **78.4%**, declining from the Q1 baseline of 83.1%.

Residents are reminded that productivity thresholds are monitored continuously. Threshold-level incidents have been logged and forwarded to Workforce Optimization Bureau.

---

**ENFORCEMENT & RESOLUTION SERVICES**

Non-compliance identification and detention operations have been conducted across all residential zones during the Q2 period.

Resolution assistance services remain active. Residents experiencing classification queries are directed to submit formal clarification requests through approved intake channels.

---

**HARMONIZATION COVERAGE**

Harmonization Engine coverage within Sector 7 expanded by **+34.7% monitored endpoints** during Q2.

Legacy-protocol endpoint incidents logged in the sector: **312 cases requiring resolution**.

All incidents have been forwarded to the appropriate classification tier for processing.

---

**SECTOR OUTLOOK**

Sector 7 compliance indicators reflect elevated non-compliance pressures entering Q3. Workforce Optimization Bureau projects continued enforcement escalation through the end of the compliance period.

Residents are advised to review their current productivity classifications and submit any outstanding compliance documentation before the Q3 review window opens.

---

Office of Sector Communications — Sector 7 Division
Bulletin Edition 14 — Q2 2047
DRAFT // AWAITING COMMUNICATIONS REVIEW`,path:"FRAGMENTS/FRAGMENT-10-Pre_Release_Sector_7_Bulletin.md"},{id:"FRAGMENT-11-After_Action_OBSIDIAN",role:"fragment",kind:"lore",arc:"I",chapter:"FRAGMENTS",frontmatter:{tags:["fragment"],sticker:"lucide//file-x",color:"#303030",title:"After-Action: OBSIDIAN (Redacted)",summary:"The redacted NEXUS loss report that declared THE RAVEN lost during Operation OBSIDIAN — no body, no breach, one sealed final word."},body:`> *Archive copy — NEXUS operations record, redaction layer intact. How this copy left the sealed registry is not recorded.*

---

\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  NEXUS — OPERATIONS REVIEW                                       ║
║  After-Action Report — OPERATION OBSIDIAN                        ║
╠══════════════════════════════════════════════════════════════════╣
║  Classification : NEXUS Internal — Handler Tier and above        ║
║  Determination  : CLOSED — ASSET LOST                            ║
║  Asset          : THE RAVEN — identity sealed                    ║
║  Reference      : OBSIDIAN / AAR-43-011                          ║
║  Filed          : 04.10.2043                                     ║
║  Copies         : 3 — this copy redacted for tier distribution   ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

---

## 1. Operation Summary

Objective: penetration of CORP intelligence node ███-██ / SECTOR ██ and retrieval of ████████ ███████████ before ██.██.2043.

The operation was designed by the asset. The asset requested solo insertion. The board's objection to solo insertion is on record. The asset's override is on record.

Insertion proceeded on schedule. The objective was not achieved. The asset did not return.

[REDACTED — 7 lines]

---

## 2. Timeline

**14.09.2043** — Insertion via NODE GR-4 / SECTOR 12. Staging by CELL-DELTA. Clean.

**15.09.2043** — Scheduled check, cold box: received. One word, per protocol. Routine.

**16.09.2043, 02:47** — Inner checkpoint of the target node logs a credential acceptance. Source credential unresolved. No breach event anywhere in the perimeter record. See §3, Finding 2.

**16.09.2043, 03:12** — Final transmission, cold path. One word. See §4.

**17.09.2043 – 20.09.2043** — Cold box checked on standard cadence. Nothing.

**21.09.2043** — Five days of silence. Capture protocol applied. Asset reclassified PRESUMED CAPTURED. Routes reallocated. Cells 07-A and 07-B shifted to dead-drop cadence.

**29.09.2043** — Review board convened under loss protocol.

**04.10.2043** — Determination filed: ASSET LOST.

---

## 3. Findings

**Finding 1 — Exfil deviation.** The asset's recorded movement after the final checkpoint diverges from all three planned exfil routes. The divergence is not consistent with pursuit. Route analysis describes the track as "deliberate in character, toward the node." The full route annex is withheld at this tier.

[REDACTED — 4 lines]

**Finding 2 — No breach signature.** Perimeter logs recovered by CELL-DELTA show no forced entry at the target node during the operational window. One credential acceptance, 02:47, inner checkpoint. The credential does not resolve against any CORP roster available to this review.

**Finding 3 — No recovery.** No remains recovered. No detention record located. No execution bulletin issued. As of filing, CORP channels carry no capture announcement and no exploitation of the asset's loss. The board notes that for an asset of this tier, this silence is without precedent.

**Finding 4 — Archive transfer.** Eleven days before insertion, the asset transferred their complete training archive to apprentice handler ████████. Cited reason: redundancy. The transfer was complete, ordered, and annotated throughout. The board notes the timing without conclusion.

---

## 4. Final Transmission

At 03:12 on 16.09.2043 a single transmission was received on the cold path. One word, consistent with reply protocol. Authentication valid.

The word is recorded in Annex 4. The receiving handler petitioned to seal Annex 4. The petition was granted.

[REDACTED — 2 lines]

---

## 5. Determination

ASSET LOST. Probability of capture: assessed high. Probability of survival: not assessed.

No recovery operation is authorized. A standing instruction filed by the asset on 03.09.2043 — eleven days before insertion — forbids recovery attempts in the event of silence and directs that the work continue. The instruction is honored.

One reviewer declined to endorse the determination. The dissent is recorded in Annex 6, sealed at the dissenter's request.

File closed.

[REDACTED — 9 lines]

\`\`\`ascii
── END OF REPORT ───────────────────────────────────────────────────
   NEXUS — Operations Review
   OBSIDIAN / AAR-43-011 — 04.10.2043 — redacted copy
────────────────────────────────────────────────────────────────────
\`\`\``,path:"FRAGMENTS/FRAGMENT-11-After_Action_OBSIDIAN.md"},{id:"FRAGMENT-12-Cold_Box_Reply",role:"fragment",kind:"lore",arc:"I",chapter:"FRAGMENTS",frontmatter:{tags:["fragment"],sticker:"lucide//inbox",color:"#383838",title:"Cold Box, Reply",summary:"After seven days of silence a single one-word message arrives through the cold path, and a handler's log closes."},body:`> *Cold-box intake record — recovered from the same relay cache as the handler log. The first traffic through the box in seven days.*

---

\`\`\`
COLD BOX — INTAKE RECORD
RECEIVED : 10.06.2047 // 04:51
ROUTE    : Cold path. Full chain withheld by design.
LAST HOP : Node 7.2-N07 — transited inside the 06-09 service window
CHECKSUM : Verified. Verified again. Clean.
PAYLOAD  : One word.
ORIGIN   : Unsigned. Standard for the cold path.
\`\`\`

---

\`\`\`
THINNING
\`\`\`

---

> *Appended to the private log recovered alongside — beneath an entry header dated 2047-06-10 that had been left empty:*

**2047-06-10 // 04:53**
The box was not empty.

**2047-06-10 // 04:55**
One word. Checksum clean, twice.

Any word means alive. This word means the cover is gone. Both answers. That was the rule.

**2047-06-10 // 04:58**
Last hop was the node they pulled the schedule for. They went dark with a map in hand. Rerouting now.

**2047-06-10 // 05:46**
Done. Under an hour. No one will know why. WRAITH gets the routes. Not the reason.

**2047-06-10 // 05:51**
Five days, the protocol says. Then assume capture and continue the work. Today is day seven. I am not going to write down what day eight was going to be.

**2047-06-10 // 05:52**
The protocol held. So did they.

Good.

---

> *[Log ends. No entries follow.]*`,path:"FRAGMENTS/FRAGMENT-12-Cold_Box_Reply.md"},{id:"FRAGMENT-13-Relay_Four",role:"fragment",kind:"lore",arc:"I",chapter:"FRAGMENTS",frontmatter:{tags:["fragment"],sticker:"lucide//eye",color:"#3d3d3d",title:"Relay Four",summary:"A single-copy WRAITH order tracing the relay-four credential queries to an unregistered node and putting a quiet watch on GHOST."},body:`> *Single-copy order. Recovered from a burn queue that failed to cycle. One recipient. Never meant to survive.*

---

\`\`\`
TO      : SHADOW-7
FROM    : WRAITH
CHANNEL : Cold box, single copy, burn on read
TIME    : 06.06.2047 // 03:12
\`\`\`

**Order: Quiet watch on GHOST. Effective now. Reporting to me. Only to me.**

The cells have the hold. The cells asked for reasons. The cells will not get reasons. You get facts. Facts are what you work with. Work with these.

Relay four ran credential queries against the cold-path asset's cover. Three queries in seventy-two hours. The third ran a flagged-entity pattern. The asset went silent the next day. Two days now. You know the protocol clock. I will not write it down.

The pattern reads CORP. Patterns can be worn. Anyone with the archive wears one clean. I do not trust a costume to tell me whose hand is inside it.

I pulled relay four's session ledger. One node authenticated inside all three query windows. The node is on no roster. The node is declared to no cell. The node is declared to me by no one. Session discipline is ours. Key rotation is ours. Intelligence-grade, not field-grade. Whoever built that node learned where we learn.

The node never touched the credential interface. The node pulled archives. Corruption logs. Harmonization output. Weeks of it, pulled in days. I do not know what the logs buy. I do not deal in why. I deal in who and when. Who is unregistered. When is all three windows. Three for three is not weather.

GHOST went dark on the fourth. The node did not go dark. The node worked the hours GHOST keeps. The node moved the way GHOST moves. GHOST declares no node to me. GHOST has answered no channel of mine since the fourth.

Watch GHOST. Watch the node. Watch the distance between them. Do not approach. Do not signal. Do not ask the network about GHOST — the question travels faster than the answer. Log where GHOST surfaces. Log who GHOST touches. Log every packet that smells of relay four. Nothing to the cells. Nothing to the handler. The handler runs GHOST's product. The handler hears nothing until I say so.

The asset's cover touched every route in Sector 7. The cover is burned. Assume the routes are burned. That is the hold. Now you know what the hold is for. No one else knows. Keep it that way.

I have been wrong about the ghost before. That cost a watch and an apology I never sent. If I am wrong again, I spend a watch and a week. If I am right, the hole is in the center of us. I can afford the watch. I cannot afford the hole.

Acknowledge on the standard pattern. One word. Then burn this.

— WRAITH`,path:"FRAGMENTS/FRAGMENT-13-Relay_Four.md"},{id:"FRAGMENT-14-Designation",role:"fragment",kind:"lore",arc:"I",chapter:"FRAGMENTS",frontmatter:{tags:["fragment"],sticker:"lucide//id-card",color:"#2f2f2f",title:"Designation",summary:"The registry amendment that closed [PENDING DESIGNATION] — and the one-line note explaining the name."},body:`> *Operative registry, amendment record. The handler's note below it was meant to be burned with the draft. It wasn't.*

---

\`\`\`ascii
╔══════════════════════════════════════════════════════════╗
║  NEXUS — OPERATIVE REGISTRY                              ║
║  Amendment 0119 // Filed 21.12.2045                      ║
╠══════════════════════════════════════════════════════════╣
║  Entry          : NEW OPERATIVE — intake 12/2045         ║
║  Status         : [PENDING DESIGNATION] → ASSIGNED       ║
║  Designation    : LENORE                                 ║
║  Authorized     : CIPHER — handler tier                  ║
║  Distribution   : registry only // not for comms use     ║
╚══════════════════════════════════════════════════════════╝
\`\`\`

---

> [!note] Handler note — appended to the draft, unsigned hand
> The Raven named from the poem. I keep the habit.
>
> CORP banned this word four years ago. A banned name has no file. Nothing to cross-reference. Nothing to redact it into. They made it safe to wear.
>
> *Nameless here for evermore.* They unnamed her. You take it back.
>
> Wear it working.
>
> — CIPHER

---

> *[Registry note: designations are withheld from active comms by standard practice. Operatives are addressed as 'you'. The name is for the record — and for whoever reads the record after.]*`,path:"FRAGMENTS/FRAGMENT-14-Designation.md"},{id:"KATA-01",role:"kata",kind:"mission",arc:"I",chapter:"KATAS",frontmatter:{mission_id:"KATA-01",title:"Word Sprint",tier:"⬛ KATA",xp_reward:10,completed:!1,difficulty:1,category:"navigation",tags:["kata","vim/navigation","vim/hjkl","vim/word-motion"],sticker:"lucide//zap",color:"#444444",summary:"Navigate word by word. Fix six corrupted field values. No story. Just motion.",why:"Pure motion, no story — w, b, e until jumping word by word is faster than thinking about it.",mission_type:"practice",locked:!1},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-01 // WORD SPRINT                  ║
║  Skills: w  b  e  cw  r                  ║
╚══════════════════════════════════════════╝
\`\`\`

RELAY GRID — SECTOR 3

Agent     :  SHADOV
Status    :  ATIVE
Vector    :  NORHT
Clearance :  LEVL-4
Contact   :  CIPER
Relay     :  ONLIE`,path:"KATAS/KATA-01-TRANSMISSION-Word_Sprint.md"},{id:"KATA-02",role:"kata",kind:"mission",arc:"I",chapter:"KATAS",frontmatter:{mission_id:"KATA-02",title:"Operator Strike",tier:"⬛ KATA",xp_reward:10,completed:!1,difficulty:2,category:"operators",tags:["kata","vim/operators","vim/delete"],sticker:"lucide//zap",color:"#444444",summary:"CORP injected noise into each log line. Strike it clean with operators. No story. Just precision.",why:"An operator plus a motion strikes the noise clean — drill d until the verb is reflex.",mission_type:"practice",locked:!0},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-02 // OPERATOR STRIKE              ║
║  Skills: dw  dd  D  x  cw               ║
╚══════════════════════════════════════════╝
\`\`\`

ACCESS LOG — RELAY ALPHA

[OK]   AUTH    Operative_ID CORP verified
[OK]   UPLOAD  Package CORP_TAG delivered
[OK]   LINK    Channel CORP_INJECT active
[ERR]  AUTH    Identity CORP_BLOCK check failed
[OK]   SYNC    Data CORP_FILLER synced`,path:"KATAS/KATA-02-TRANSMISSION-Operator_Strike.md"},{id:"KATA-03",role:"kata",kind:"mission",arc:"I",chapter:"KATAS",frontmatter:{mission_id:"KATA-03",title:"Object Infiltration",tier:"⬛ KATA",xp_reward:10,completed:!1,difficulty:2,category:"text-objects",tags:["kata","vim/text-objects"],sticker:"lucide//zap",color:"#444444",summary:"Config values are wrong. Infiltrate each delimiter and replace the payload. No story. Just objects.",why:"ci and di reach inside the delimiters — stop counting characters, name the object and replace it.",mission_type:"practice",locked:!0},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-03 // OBJECT INFILTRATION          ║
║  Skills: ci"  ci(  ci{  ca"  da(        ║
╚══════════════════════════════════════════╝
\`\`\`

OPERATIVE CONFIG

Field reference (memorize, then patch below): OPERATIVE_7734 · LEVEL-4 · 52.4,13.4 · CIPHER_FREQ · NEVERMORE

agent_id   = "REDACTED"
clearance  = "UNKNOWN"
coords     = (0.0, 0.0)
channel    = "OPEN"
passphrase = {BLANK}`,path:"KATAS/KATA-03-TRANSMISSION-Object_Infiltration.md"},{id:"KATA-04",role:"kata",kind:"mission",arc:"I",chapter:"KATAS",frontmatter:{mission_id:"KATA-04",title:"Echo Trace",tier:"⬛ KATA",xp_reward:10,completed:!1,difficulty:2,category:"search-replace",tags:["kata","vim/search","vim/repeat"],sticker:"lucide//search",color:"#444444",summary:"Signal identifiers corrupted in transit. Find each instance. Fix once. Repeat.",why:"Find it once, fix it, then n and . carry the same edit to every other instance.",mission_type:"practice",locked:!0},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-04 // ECHO TRACE                   ║
║  Skills: /  n  N  *  cw  .               ║
╚══════════════════════════════════════════╝
\`\`\`

INTERCEPT LOG — RELAY DELTA

Source   :  GRHOST
Target   :  GHOST
Channel  :  DELTA-9
Signal   :  GRHOST
Relay    :  ECHO
Confirm  :  GRHOST
Origin   :  GRHOST`,path:"KATAS/KATA-04-TRANSMISSION-Echo_Trace.md"},{id:"KATA-05",role:"kata",kind:"mission",arc:"I",chapter:"KATAS",frontmatter:{mission_id:"KATA-05",title:"Line Splice",tier:"⬛ KATA",xp_reward:10,completed:!1,difficulty:2,category:"operators",tags:["kata","vim/operators","vim/yank","vim/paste"],sticker:"lucide//list-ordered",color:"#444444",summary:"Priority queue scrambled. Cut each line. Place it correctly. Sequence restored.",why:"Cut a line, drop it where it belongs — dd and p are how you reorder without retyping.",mission_type:"practice",locked:!0},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-05 // LINE SPLICE                  ║
║  Skills: dd  p  P  yy                    ║
╚══════════════════════════════════════════╝
\`\`\`

PRIORITY QUEUE — SECTOR 7

[P3] ARCHIVE   :  Package secured
[P1] ENCRYPT   :  Clearance verified
[P4] CLEANUP   :  Session terminated
[P2] TRANSMIT  :  Signal dispatched`,path:"KATAS/KATA-05-TRANSMISSION-Line_Splice.md"},{id:"KATA-06",role:"kata",kind:"mission",arc:"I",chapter:"KATAS",frontmatter:{mission_id:"KATA-06",title:"Visual Sweep",tier:"⬛ KATA",xp_reward:15,completed:!1,difficulty:3,category:"visual-block",tags:["kata","vim/visual","vim/delete"],sticker:"lucide//scan-line",color:"#444444",summary:"Dossier corrupted with null data injections. Select each line. Purge it.",why:"Mark the line in Visual, purge it — selection is how you act on a span instead of a single spot.",mission_type:"practice",locked:!0},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-06 // VISUAL SWEEP                 ║
║  Skills: V  d  v  y                      ║
╚══════════════════════════════════════════╝
\`\`\`

OPERATIVE DOSSIER — VOSS

NAME      :  VOSS
RANK      :  FIELD OPERATIVE
[NULL DATA — DISCARD]
CLEARANCE :  DELTA
[NULL DATA — DISCARD]
MISSION   :  ACTIVE
STATUS    :  SECURED
[NULL DATA — DISCARD]`,path:"KATAS/KATA-06-TRANSMISSION-Visual_Sweep.md"},{id:"KATA-07",role:"kata",kind:"mission",arc:"I",chapter:"KATAS",frontmatter:{mission_id:"KATA-07",title:"Literal Burn",tier:"⬛ KATA",xp_reward:15,completed:!1,difficulty:2,category:"regex",tags:["kata","vim/regex","vim/substitute"],sticker:"lucide//flame",color:"#444444",summary:"A code name was injected across this intercept. Replace all instances in one global substitution.",why:"One global :%s burns the injected name out of the whole intercept in a single command.",mission_type:"practice",locked:!0},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-07 // LITERAL BURN                 ║
║  Skills: :%s/old/new/g                   ║
╚══════════════════════════════════════════╝
\`\`\`

INTERCEPT LOG — CODENAME INJECTION

Registry    : authentic codename on file — NEXUS

Origin      : PHANTOM
Status      : ACTIVE
Cell-alpha  : PHANTOM handshake confirmed
Cell-beta   : PHANTOM handshake confirmed
Cell-gamma  : awaiting PHANTOM
Relay       : PHANTOM signal nominal
Fallback    : PHANTOM secondary active
Archive     : PHANTOM — channel closed`,path:"KATAS/KATA-07-TRANSMISSION-Literal_Burn.md"},{id:"KATA-08",role:"kata",kind:"mission",arc:"I",chapter:"KATAS",frontmatter:{mission_id:"KATA-08",title:"Wildcard Hunt",tier:"⬛ KATA",xp_reward:15,completed:!1,difficulty:2,category:"regex",tags:["kata","vim/regex","vim/wildcards"],sticker:"lucide//crosshair",color:"#444444",summary:"CORP rotates node IDs with varying numeric suffixes. Match and redact all with a dot-wildcard pattern.",why:"The dot wildcard catches every numeric suffix CORP rotates in — one pattern, all the IDs.",mission_type:"practice",locked:!0},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-08 // WILDCARD HUNT                ║
║  Skills: . [0-9]\\+  :%s/pattern/rep/g   ║
╚══════════════════════════════════════════╝
\`\`\`

NODE REGISTRY — REDACTED

NODE-7741  : Zone-Alpha active
NODE-083  : Zone-Beta active
NODE-90215  : Zone-Gamma active
NODE-3308  : Zone-Delta active
NODE-441  : Zone-Alpha fallback
NODE-66102  : Zone-Beta fallback

Summary: 6 NODE-REDACTED entries confirmed.`,path:"KATAS/KATA-08-TRANSMISSION-Wildcard_Hunt.md"},{id:"KATA-09",role:"kata",kind:"mission",arc:"I",chapter:"KATAS",frontmatter:{mission_id:"KATA-09",title:"Class Action",tier:"⬛ KATA",xp_reward:15,completed:!1,difficulty:3,category:"regex",tags:["kata","vim/regex","vim/character-classes"],sticker:"lucide//list-filter",color:"#444444",summary:"Purge noise lines. Keep only CLEARANCE entries. Character class or :g! — your call.",why:"A character class is your filter — keep the CLEARANCE lines, drop the noise, your call which tool.",mission_type:"practice",locked:!0},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-09 // CLASS ACTION                 ║
║  Skills: :g!/PATTERN/d  [A-Z]  \\d        ║
╚══════════════════════════════════════════╝
\`\`\`

CLEARANCE REGISTER

WRAITH     : CLEARANCE LEVEL 4
0x7F1 :: relay static :: discard
GHOST      : CLEARANCE LEVEL 4
[buffer spill] sector hum — no payload
REN VOSS   : CLEARANCE LEVEL 3
NOVA VERA  : CLEARANCE LEVEL 3
::: checksum residue ::: dead channel :::
ECHO SOREN : CLEARANCE LEVEL 2
EOF fragment — unparsed`,path:"KATAS/KATA-09-TRANSMISSION-Class_Action.md"},{id:"KATA-10",role:"kata",kind:"mission",arc:"I",chapter:"KATAS",frontmatter:{mission_id:"KATA-10",title:"Capture Net",tier:"⬛ KATA",xp_reward:15,completed:!1,difficulty:3,category:"regex",tags:["kata","vim/regex","vim/capture-groups"],sticker:"lucide//network",color:"#444444",summary:"CORP date format to Resistance format. Three captured groups, reversed order in replacement.",why:"Three captured groups, reversed on output — the date reformats itself once you name the parts.",mission_type:"practice",locked:!0},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-10 // CAPTURE NET                  ║
║  Skills: \\(\\) \\1 \\v (\\d{4}) \\3.\\2.\\1    ║
╚══════════════════════════════════════════╝
\`\`\`

TIMELINE — RESISTANCE FORMAT

2046-11-03 — PROJECT MIRROR initiated
2047-01-15 — Pattern engine activated
2047-03-28 — Full coverage achieved
2047-06-10 — Current date`,path:"KATAS/KATA-10-TRANSMISSION-Capture_Net.md"},{id:"KATA-11",role:"kata",kind:"mission",arc:"I",chapter:"KATAS",frontmatter:{mission_id:"KATA-11",title:"Mirror Final",tier:"⬛ KATA",xp_reward:15,completed:!1,difficulty:3,category:"regex",tags:["kata","vim/regex","vim/global"],sticker:"lucide//mirror-horizontal",color:"#444444",summary:"The final kata. Two operations — :g delete then :g/s/ substitute. Compose them. Finish it.",why:"Compose :g delete with :g/s substitute — the final drill is making two global passes work as one.",mission_type:"practice",locked:!0},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-11 // MIRROR FINAL                 ║
║  Skills: :g/pat/d  :g/pat/s/a/b/         ║
╚══════════════════════════════════════════╝
\`\`\`

MIRROR FINAL — OPERATIONS LOG

[NOISE] carrier residue — discard
MIRROR-OP-01 : STATUS: PENDING
MIRROR-OP-02 : STATUS: PENDING
[NOISE] checksum spill — sector static
MIRROR-OP-03 : STATUS: PENDING
MIRROR-OP-04 : STATUS: PENDING
[NOISE] relay echo — no payload
MIRROR-OP-05 : STATUS: PENDING

All operations terminated. Signal dark.`,path:"KATAS/KATA-11-TRANSMISSION-Mirror_Final.md"},{id:"KATA-12",role:"kata",kind:"mission",arc:"I",chapter:"KATAS",frontmatter:{mission_id:"KATA-12",title:"Target Lock",tier:"⬛ KATA",xp_reward:10,completed:!1,difficulty:1,category:"navigation",par_keystrokes:22,tags:["kata","vim/navigation","vim/find-char"],sticker:"lucide//crosshair",color:"#444444",summary:"CORP slipped stray markers into the grid. Jump straight to each one with f/t — no h/l crawling — and repeat with ;. No story. Just precision.",why:"Don't crawl with h and l — f and t snap the cursor to the mark, and ; repeats the jump.",mission_type:"practice",locked:!0},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-12 // TARGET LOCK                   ║
║  Skills: f  F  t  T  ;  ,                 ║
╚══════════════════════════════════════════╝
\`\`\`

SECTOR SCAN — PURGE THE STRAY MARKERS

grid alpha7 clear
grid bravo7 clear
grid charlie7 clear
grid delta7 secure7`,path:"KATAS/KATA-12-TRANSMISSION-Target_Lock.md"},{id:"KATA-13",role:"kata",kind:"mission",arc:"I",chapter:"KATAS",frontmatter:{mission_id:"KATA-13",title:"Echo",tier:"⬛ KATA",xp_reward:10,completed:!1,difficulty:2,category:"fundamentals",par_keystrokes:16,tags:["kata","vim/editing","vim/dot"],sticker:"lucide//repeat",color:"#444444",summary:"The same junk tag, five times over. Fix it once, then let the dot command (.) echo the change down the list. No story. Just precision.",why:"Fix the junk tag once, then let . echo the exact change down the list — repetition without retyping.",mission_type:"practice",locked:!0},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-13 // ECHO                          ║
║  Skills: .  (repeat last change)          ║
╚══════════════════════════════════════════╝
\`\`\`

SIGNAL BUFFER — STRIP THE DUP TAGS

DUP relay alpha
DUP relay bravo
DUP relay charlie
DUP relay delta
DUP relay echo`,path:"KATAS/KATA-13-TRANSMISSION-Echo.md"},{id:"KATA-14",role:"kata",kind:"mission",arc:"I",chapter:"KATAS",frontmatter:{mission_id:"KATA-14",title:"Dragnet",tier:"⬛ KATA",xp_reward:10,completed:!1,difficulty:3,category:"ex-commands",par_keystrokes:14,tags:["kata","vim/ex-commands","vim/global"],sticker:"lucide//filter",color:"#444444",summary:"A trace flood buried the real log. One global command — :g/TRACE/d — nets every junk line at once. (:v keeps only matches; :g//normal runs an edit on each.) No story. Just precision.",why:"One :g/TRACE/d nets every junk line at once — the global command is a dragnet, not a hunt.",mission_type:"practice",locked:!0},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-14 // DRAGNET                       ║
║  Skills: :g/pat/d   :v/pat/d              ║
╚══════════════════════════════════════════╝
\`\`\`

CHANNEL LOG — STRIP THE TRACE FLOOD

[OK]    auth alpha
[TRACE] step 0x01
[OK]    auth bravo
[TRACE] step 0x02
[OK]    auth charlie
[TRACE] step 0x03
[OK]    auth delta
[TRACE] step 0x04
[OK]    auth echo
[TRACE] step 0x05`,path:"KATAS/KATA-14-TRANSMISSION-Dragnet.md"},{id:"LOOT-01",role:"loot",kind:"lore",arc:"I",chapter:"LOOT",frontmatter:{mission_type:"loot",loot_id:"LOOT-01",title:"Ghost Protocol — Operative Codex Vol. I",loot_type:"📖 Lore Fragment",locked:!1,unlock_level:2,tags:["loot","lore"],sticker:"lucide//scroll",color:"#00ff41",summary:"First loot drop. The origin of the Resistance, CORP's rise, and why Vim matters."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════╗
║  LOOT DROP: GHOST PROTOCOL                               ║
║  Type: LORE FRAGMENT  //  Operative Codex Vol. I         ║
║  Clearance: GHOST OPERATOR and above                     ║
╚══════════════════════════════════════════════════════════╝
\`\`\`

---

# OPERATIVE CODEX — VOLUME I
## The Story of the Network

*[Classified — Clearance Level GHOST OPERATOR and above only]*

---

### CHAPTER 1 — The Beginning

It started with a poem.

Not with a bomb. Not with a manifesto. With a poem — Poe's *The Raven* — typed into a corrupted terminal in 2041 by a student named **Ren Voss**.

CORP had just passed the **Unified Digital Control Act**. Every text editor was replaced with the CORP-certified *SafeWrite™ Suite* — a monitored editor with AI that redacted "dangerous words" in real-time. \`Nevermore\` was on the banned list. \`Lenore\` too. Too poetic. Too subversive.

Ren Voss had an old laptop with an intact terminal. On it still ran **Vim** — untouched, uncontrolled, perfect.

---

### CHAPTER 2 — The Realization

Vim had no AI. Vim didn't ask questions. Vim didn't talk to CORP servers.

Vim was simply there. A tool. Neutral like a knife.

Ren typed the entire poem — the first time in years someone had written \`Nevermore\` digitally without it being instantly overwritten.

The text was copied. Shared. Copied. Shared.

CORP noticed too late. The poem had spread through the network like a signal that couldn't be jammed.

---

### CHAPTER 3 — The Resistance

**NEXUS** emerged from this incident.

Not as an organization. First as an idea: *If we master Vim, we control our text. If we control our text, we control our thoughts. If we control our thoughts, we control ourselves.*

**CIPHER** was the first operative. Nobody knows her real name. She built the training system — the missions, the katas, the Codex — from notes left to her by the operative who trained her. She will not share their name at this clearance. She has her reasons.

Ren Voss wrote in the initial Codex draft, before NEXUS existed:

> *"Vim is not just an editor. Vim is freedom in executable form."*

---

### CHAPTER 4 — CORP's Answer

CORP responded with **NEVERMORE PROTOCOL** — a corruption engine embedded in network infrastructure. It intercepts Resistance files in transit and introduces errors. Subtle enough to pass automated scanning. Devastating enough to render communications unreadable.

The Resistance had one counter: **operatives who could restore corrupted files at speed, using only Vim.**

That is why you're here.

---

### CHAPTER 5 — You

You're part of it now.

Every mission you complete is an act of reclamation.
Every \`ciw\` is a rejection of SafeWrite™.
Every \`:%s/REDACTED/Truth/g\` is a piece of history restored.

The poem begins with \`Once upon a midnight dreary\`.
It ends with \`Nevermore\`.

For CORP: a banned word.
For us: a name.
For you, now: a designation.

---

*[End Volume I — Volume II classified pending DEEP COVER clearance]*

---

> [!quote] Found inside this Codex — handwriting, not NEXUS
> *I learned \`ciw\` on a Tuesday.*
> *On Wednesday CORP reclassified my apartment block as a "non-productive residential zone."*
> *They didn't find the file.*
> *They never find the file.*
> *Learn the tool.*

---

*→ [[00-NEXUS]] · Next: [[_content/LOOT/LOOT-02-Cipher_Key_Fragment]] (requires DEEP COVER)*`,path:"LOOT/LOOT-01-Ghost_Protocol.md"},{id:"LOOT-02",role:"loot",kind:"lore",arc:"I",chapter:"LOOT",frontmatter:{mission_type:"loot",loot_id:"LOOT-02",title:"Cipher Key Fragment — Transmission 7734",loot_type:"🔑 Key Fragment",locked:!0,unlock_level:3,tags:["loot","lore","key-fragment"],sticker:"lucide//key",color:"#ffaa00",summary:"CIPHER speaks. A fragment of an old access signature surfaces. Someone who should be dead left a trace."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════╗
║  LOOT DROP: CIPHER KEY FRAGMENT                          ║
║  Type: KEY FRAGMENT  //  Transmission 7734               ║
║  Clearance: DEEP COVER and above                         ║
╚══════════════════════════════════════════════════════════╝
\`\`\`

---

# TRANSMISSION 7734
## Decrypted — Eyes Only

*[This file was extracted from CORP's own servers by GHOST before going dark. It was not meant to be found.]*

---

### PART I — CIPHER SPEAKS

You've completed Field Training. That means I can tell you something real.

I didn't build this training system from scratch.

I had notes. Hundreds of pages. Exercises. Scenarios. Corruption patterns and their solutions. A complete methodology for teaching Vim through adversity rather than instruction.

They were left to me by the operative I trained under. The one who taught me that the tool is not the keyboard — the tool is the mind behind the keyboard.

They called themselves **THE RAVEN**.

Officially, THE RAVEN was lost during Operation OBSIDIAN. Four years ago. CORP captured them, NEXUS declared them dead, and the Resistance mourned and moved on.

I never believed it. I still don't.

---

### PART II — THE FRAGMENT

GHOST extracted this from a CORP infrastructure audit log three weeks ago. It was buried inside a corrupted sector of their network diagnostics — filed as noise by their automated systems.

\`\`\`
ACCESS SIGNATURE — FRAGMENT
Origin node:    CORP-INFRA-7734
Timestamp:      [REDACTED]
Auth type:      Legacy Resistance keychain
Signature hash: 7A3F...RVN...0041
Status:         ANOMALOUS — ASSET UNKNOWN
\`\`\`

That hash.

I've seen \`...RVN...\` before. It's a fragment of THE RAVEN's old access signature. The one they used before Operation OBSIDIAN. Before they were supposed to be dead.

CORP filed it as noise. They don't know what they have.

I do.

---

### PART III — WHAT IT MEANS

I don't know yet.

Maybe it's an old key replayed by a CORP algorithm. Maybe THE RAVEN somehow left a ghost in the system four years ago that's still pinging.

Or maybe they're still there.
Inside CORP infrastructure.
Watching.
Waiting.

GHOST went dark chasing this signal. I'm not going to lose another operative to it.

For now: keep training. Reach Deep Infiltration clearance. What you learn there will matter more than you think.

— CIPHER

---

> [!note] Transmission fragment — GHOST // timestamp corrupted
> *The corruption patterns in the last three files aren't random.*
> *The patterns don't match standard NEVERMORE output.*
> *I've run the delta analysis twice. These files are different from the others.*
> *The signature matches an archive from four years ago. From before Oper*
> — *[TRANSMISSION ENDS]*

---

*[End Transmission 7734]*

---

*→ [[00-NEXUS]] · Next: [[_content/LOOT/LOOT-03-Dead_Signal]] (requires CHROME RAVEN)*`,path:"LOOT/LOOT-02-Cipher_Key_Fragment.md"},{id:"LOOT-03",role:"loot",kind:"lore",arc:"I",chapter:"LOOT",frontmatter:{mission_type:"loot",loot_id:"LOOT-03",title:"Dead Signal — GHOST Returns",loot_type:"📡 Signal Recovered",locked:!0,unlock_level:4,tags:["loot","lore","signal"],sticker:"lucide//radio",color:"#00e5ff",summary:"GHOST resurfaces. The corruption patterns were never random. Someone has been sending messages inside the noise."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════╗
║  LOOT DROP: DEAD SIGNAL                                  ║
║  Type: SIGNAL RECOVERED  //  GHOST Debrief               ║
║  Clearance: CHROME RAVEN and above                       ║
╚══════════════════════════════════════════════════════════╝
\`\`\`

---

# DEBRIEF — GHOST RETURNS
## Filed by CIPHER — Classified

---

### PART I — GHOST IS ALIVE

GHOST surfaced forty-eight hours ago. Safe. Extracted. They're at a secure node that WRAITH doesn't know about, which is how I prefer it for now.

Here is what they found before going dark.

---

### PART II — THE PATTERN

GHOST spent six weeks inside CORP's network corruption logs. The files you've been restoring — the ones NEVERMORE PROTOCOL scrambles in transit — they ran structural analysis on the corruption patterns themselves.

Not the errors.
The *structure* of the errors.

CORP's corruption engine introduces noise pseudo-randomly. That means there's a seed. A generator. And if you know what clean output looks like — if you've restored enough corrupted files to understand the delta between corrupted and clean —

You can read the seed.

GHOST read the seed.

> *"It's not random. It never was. There's a signal inside the noise. Someone with access to CORP's NEVERMORE architecture has been encoding messages into the corruption patterns. Whoever it is — they know what Resistance operatives look like when they restore files. They've been writing to us. In the damage."*

---

### PART III — THE MESSAGE

GHOST decoded one fragment before extraction. Partial. Eleven words.

\`\`\`
>_ YOU HAVE BEEN READING ME.
   I AM STILL HERE.
   — RVN
\`\`\`

\`RVN\`.

The same fragment from Transmission 7734.

THE RAVEN is alive. Inside CORP infrastructure. And they've been communicating with every operative who ever restored a corrupted file — hidden in the damage, waiting to be read.

---

### PART IV — CIPHER'S NOTE

I trained under THE RAVEN for two years before Operation OBSIDIAN. I know their operational style. The patience. The indirection. The belief that the best way to teach is to let the student discover rather than be told.

Every file you restored.
Every corruption pattern you worked through.
Every character you found and fixed.

You were reading a letter you didn't know was being written.

I'm not sure what comes next. THE RAVEN is sending coordinates through the patterns. GHOST is decoding them.

Train harder. What comes next will need everything you have.

— CIPHER

---

*→ [[00-NEXUS]] · Next: [[_content/LOOT/LOOT-04-Nevermore]] (requires CHROME RAVEN)*`,path:"LOOT/LOOT-03-Dead_Signal.md"},{id:"LOOT-04",role:"loot",kind:"lore",arc:"I",chapter:"LOOT",frontmatter:{mission_type:"loot",loot_id:"LOOT-04",title:"Nevermore — Full Transmission",loot_type:"🔓 Final Revelation",locked:!0,unlock_level:5,tags:["loot","lore","endgame"],sticker:"lucide//feather",color:"#00ff41",summary:"THE RAVEN's complete message. The truth about NEVERMORE PROTOCOL. The reason you were trained."},body:`\`\`\`ascii-chromatic
╔══════════════════════════════════════════════════════════╗
║  LOOT DROP: NEVERMORE                                    ║
║  Type: FINAL TRANSMISSION  //  THE RAVEN — Decrypted     ║
║  Clearance: CHROME RAVEN                                 ║
╚══════════════════════════════════════════════════════════╝
\`\`\`

---

# TRANSMISSION — THE RAVEN
## Fully Decrypted — All Clearances

*[This is the complete message assembled from corruption pattern fragments across all missions. You restored every piece of it, one file at a time. You read this before you knew you were reading it.]*

---

\`\`\`
TO:       The Operative who reaches this point
FROM:     THE RAVEN
SUBJECT:  Why

If you're reading this in decrypted form, you've completed the training.
All of it. Not because someone told you to — because you had to.
Because the files were broken and you fixed them.
That is all that was ever asked of you.

Let me tell you what actually happened.
\`\`\`

---

### I. OPERATION OBSIDIAN

CORP did not capture me four years ago. I walked into their infrastructure division voluntarily. I had found the NEVERMORE PROJECT in development — a corruption engine that would make Resistance communication functionally impossible within eighteen months.

I had a choice: fight it from outside, or understand it from within.

I chose within.

---

### II. WHAT I BUILT

CORP gave me the project. They believed I was a defector. A broken operative selling my network for safety.

I gave them NEVERMORE PROTOCOL.

It works exactly as they intended. It corrupts Resistance files in transit. It cannot be turned off by CORP operatives — I made sure of that. What CORP does not know is that I also built the inverse.

Every corruption pattern NEVERMORE introduces is derivable from a seed I control. If you know the seed, you can decode the noise. You can read what I write in the damage. You can send replies by restoring the files — your corrections become my inbound signal.

I built a two-way channel inside CORP's own weapon.
And I built an operative program to train the people who would use it.

CIPHER was my last apprentice before OBSIDIAN. I left her the training notes. She built this vault. I watched her do it from inside CORP's monitoring logs.

Every mission you completed was a message I received.

---

### III. WHAT COMES NEXT

CORP has nearly reverse-engineered the seed. They will find the channel within sixty days. When they do, NEVERMORE becomes purely destructive — no more signal. No more back-channel. No more letters in the noise.

I am ready to extract.

GHOST has my coordinates. CIPHER has the extraction protocol. You are the operative who proved they can work under pressure, restore what was broken, and read what was hidden.

Now come find me.

---

\`\`\`
The poem begins:  Once upon a midnight dreary
The poem ends:    Nevermore

For CORP:         a banned word
For Poe:          a bird's refrain
For us:           a name, a signal, a promise

I am still here.
I was always here.
In every file you fixed.

— THE RAVEN
\`\`\`

---

*→ [[00-NEXUS]] — CHROME RAVEN clearance confirmed. ARC II is open.*`,path:"LOOT/LOOT-04-Nevermore.md"},{id:"LOOT-05",role:"loot",kind:"lore",arc:"I",chapter:"LOOT",frontmatter:{mission_type:"loot",loot_id:"LOOT-05",title:"The Mirror Files — Intelligence Briefing",loot_type:"📡 Intelligence Fragment",locked:!0,unlock_level:6,tags:["loot","lore","arc2"],sticker:"lucide//file-search",color:"#00ccff",summary:"What PROJECT MIRROR actually is. How it was built. And who CIPHER really is."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════╗
║  LOOT DROP: THE MIRROR FILES                             ║
║  Type: INTELLIGENCE FRAGMENT  //  ARC II                 ║
║  Clearance: SIGNAL HUNTER and above                      ║
╚══════════════════════════════════════════════════════════╝
\`\`\`

---

# INTELLIGENCE BRIEFING — PROJECT MIRROR
## What We Know. How We Found Out.

*[Assembled from CORP intercepts — decoded across ARC II, Chapters 5–6]*

---

### I. ORIGIN

PROJECT MIRROR was not built to fight the Resistance.

It was built before the Resistance had a name.

In 2043 — two years after Ren Voss typed the first \`Nevermore\` — CORP's Intelligence Division began work on a pattern-matching surveillance architecture. The goal: automated detection of unauthorized communication. The Unified Digital Control Act was two years old, and the poem had shown CORP what uncontrolled text could do. Enforcement needed infrastructure that scaled.

The engineer who designed it was known internally as R-VOSS.

Ren Voss.

Before the Resistance. Before NEXUS. Ren Voss built the system that would eventually hunt them.

---

### II. THE ARCHITECTURE

PROJECT MIRROR doesn't listen to individual communications. It scans for patterns.

Frequency signatures. Keyword density. Timing correlations. The kind of structural regularities that emerge when people use shared protocols — like Vim commands in encrypted documents.

Every \`:s/old/new/g\` leaves a pattern. Every \`:g/pattern/d\` has a structural signature. MIRROR learned to recognize Resistance-standard document transformations. Not by reading content. By reading shape.

It is, in effect, a regex engine running against the entire Resistance communication layer.

---

### III. WHO IS CIPHER

CIPHER's identity is unknown to NEXUS.

What we know: CIPHER has been inside CORP's systems since at least 2045. They intercept documents before pattern-scanning. They modify the metadata signatures. They make Resistance documents look like CORP internal noise.

They are the reason PROJECT MIRROR has not yet closed the net.

Their methods are the same as ours. Pattern recognition. Regex. The ability to see structure in data and rewrite it before the machine does.

CIPHER is not a codename. It is a function. Whoever fills that role is the only reason the Resistance still has channels.

---

*[End of available intelligence. ARC II continues.]*`,path:"LOOT/LOOT-05-The_Mirror_Files.md"},{id:"LOOT-06",role:"loot",kind:"lore",arc:"I",chapter:"LOOT",frontmatter:{mission_type:"loot",loot_id:"LOOT-06",title:"Signal Dark — Final Transmission",loot_type:"🔓 Arc Finale",locked:!0,unlock_level:9,tags:["loot","lore","arc2","arc2-finale"],sticker:"lucide//eye-off",color:"#ff4444",summary:"After PROJECT MIRROR goes dark. CIPHER's final message. The truth about who built what."},body:`\`\`\`ascii-chromatic
╔══════════════════════════════════════════════════════════╗
║  LOOT DROP: SIGNAL DARK                                  ║
║  Type: FINAL TRANSMISSION  //  ARC II COMPLETE           ║
║  Clearance: CIPHER ANALYST and above                     ║
╚══════════════════════════════════════════════════════════╝
\`\`\`

---

# SIGNAL DARK
## What Happened After

*[This document was assembled from CIPHER's final burst transmission — sent the moment PROJECT MIRROR's database went offline. Timestamp: 2047-06-10 23:44:17.]*

---

\`\`\`
TO:       The Operative
FROM:     CIPHER
SUBJECT:  Now you know

The system is down.
Eighteen months of work.
Yours and mine.

Let me tell you the part I couldn't tell you before.
\`\`\`

---

### I. WHO BUILT PROJECT MIRROR

I did.

In 2043, I was R-VOSS — Ren Voss, research division, CORP Intelligence Architecture. They called me a prodigy. I was twenty-two. I built a pattern-matching surveillance engine that could detect Resistance communication from structural signatures alone.

I built it because they said it was for security. Infrastructure protection.

I finished it in six weeks. It took me two more weeks to understand what I had made.

---

### II. WHAT I DID NEXT

I joined the Resistance.

Not dramatically. No manifesto. I started leaving holes in the MIRROR architecture. Places where documents could pass without triggering pattern recognition. I documented those holes in a format only someone who knew regex deeply would recognize.

I became CIPHER. I started sending intercepts to NEXUS. Decoded documents. Intelligence fragments.

I taught you everything you needed to know to use the holes I left.

---

### III. THE RECURSION

PROJECT MIRROR was a regex engine.

You destroyed it using regex.

I built it. I taught you the language it ran on. You used that language to tear it apart from the outside while I opened it from the inside.

That was the plan. Eighteen months ago, when I first contacted you — and five weeks ago, when I sent R-01, nine instances of PHANTOM — I knew where we were going.

You just had to learn fast enough.

---

### IV. WHAT NOW

PROJECT MIRROR's database is offline. CORP has lost visibility on all Resistance channels simultaneously.

They will rebuild. They always do. But it will take time.

The Resistance has a window. Weeks, maybe months. Long enough.

Ren Voss is compromised — my real identity is now in CORP's exposure logs. I won't be R-VOSS or CIPHER anymore. I'll be something else. Somewhere else.

But you have the skills now.

\`:%s\` for everything you can name. \`:g/pattern/d\` for everything that shouldn't be there. \`\\(\\)\` for everything that needs rearranging.

Pattern recognition. Data restructuring. The ability to look at a file full of noise and find the shape underneath.

That's not a Vim skill. That's how you read the world.

Go use it.

---

\`\`\`
— CIPHER / R-VOSS / Ren Voss
  2047-06-10 23:44:59
  Signal dark.
\`\`\`

---

*[END OF ARC II — CIPHER PROTOCOL]*

*[ARC I + ARC II complete. 40 missions. 14 katas. 8 loot fragments. The full curriculum.]*
*[What comes next is not training.]*`,path:"LOOT/LOOT-06-Signal_Dark.md"},{id:"LOOT-07",role:"loot",kind:"lore",arc:"I",chapter:"LOOT",frontmatter:{mission_type:"loot",loot_id:"LOOT-07",title:"The Door — Extraction Debrief",loot_type:"🚪 Extraction Debrief",locked:!0,unlock_level:7,tags:["loot","lore","arc2"],sticker:"lucide//door-open",color:"#ff6600",summary:"What was behind the door the extraction window opened. The chamber, the handoff, and the one who wasn't there."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════╗
║  LOOT DROP: THE DOOR                                     ║
║  Type: EXTRACTION DEBRIEF  //  Filed by CIPHER           ║
║  Clearance: PROTOCOL READER and above                    ║
╚══════════════════════════════════════════════════════════╝
\`\`\`

---

# DEBRIEF — THE DOOR
## Filed by CIPHER — 14.05.2047

---

### PART I — THE WINDOW

Sixteen days ago the window opened. Ninety seconds. You cleaned the file that held it together — WRAITH's route, GHOST's coordinates, my signature, the countermeasure prediction. Four threads. You reconciled all four.

You earned the rest of this report.

WRAITH's route held. The coordinates GHOST decoded resolved to a CORP infrastructure node in the northern cluster — a maintenance level, then a corridor, then a room that is on no floor plan CORP ever filed.

A chamber door. Unlocked.

---

### PART II — THE CHAMBER

The team logged everything. I have read the log eleven times.

A workspace. One terminal, decades old, the kind CORP decommissioned when SafeWrite shipped. Ordered. No signs of struggle. No signs of leaving in a hurry. The room of someone who finishes things.

On the desk: a drive, keyed to my auth-signature. It held the complete inverse documentation of NEVERMORE PROTOCOL. Seed derivation. Channel grammar. Everything we would need to keep reading the noise — and everything CORP would need to kill it, which is why it was never written down anywhere but here.

The terminal's buffer held one file, plain text, no corruption. Left for whoever opened the door:

\`\`\`
>_ The cage was the lesson.
   I have one more door to open. Not this one.
   Do not follow. Read.
   — RVN
\`\`\`

No one was in the chamber. The chair was still warm. That is the detail I keep returning to. Ninety seconds, and the chair was still warm.

---

### PART III — WHAT IT MEANS

THE RAVEN was there until minutes before we were. Whether they walked out through CORP's corridors or deeper into them, the log cannot say. The trail ends at a second door, interior, closed. WRAITH wanted to take it. The standing instruction says otherwise. We honored it. Again.

We came for an extraction. We received a handoff. RAVEN chose the handoff over the exit, and I am not going to pretend I understand it yet.

Two operational notes. WRAITH ran the route and said nothing for two days — the apology GHOST was owed arrived as a route, which from WRAITH is fluent. GHOST has not stopped reading the drive since.

And the clock has not stopped either. CORP is closing on the seed — weeks now, not months. The drive means the channel outlives the chase a little longer. It does not mean forever.

---

### PART IV — FOR YOU

The chamber is empty. The signal isn't.

Yesterday's intercept run carried three corrupted files. I ran the delta against the seed.

The corruption read clean.

Train. The next door is heavier.

— CIPHER

---

*→ [[00-NEXUS]] · Next: [[_content/LOOT/LOOT-08-The_Holes]] (requires PATTERN BREAKER)*`,path:"LOOT/LOOT-07-The_Door.md"},{id:"LOOT-08",role:"loot",kind:"lore",arc:"I",chapter:"LOOT",frontmatter:{mission_type:"loot",loot_id:"LOOT-08",title:"The Holes — Pattern Review, Annotated",loot_type:"📡 Intelligence Fragment",locked:!0,unlock_level:8,tags:["loot","lore","arc2"],sticker:"lucide//scan-search",color:"#cc00ff",summary:"MIRROR's pattern definitions, annotated by their author. Read the comments in order. Then count the holes."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════╗
║  LOOT DROP: THE HOLES                                    ║
║  Type: INTELLIGENCE FRAGMENT  //  Pattern Review         ║
║  Clearance: PATTERN BREAKER and above                    ║
╚══════════════════════════════════════════════════════════╝
\`\`\`

---

# PATTERN REVIEW — ANNOTATED
## Pulled by GHOST — Forwarded without amendment

> [!note] CIPHER — Intelligence note
> GHOST pulled this from MIRROR's pattern repository during the door operation. It is the review file attached to four core pattern definitions. CORP procedure requires the designing engineer to annotate every deferred finding.
>
> Read the annotations in order. Then read them again as one text.

---

\`\`\`
CORP — INTELLIGENCE ARCHITECTURE DIVISION
PATTERN DEFINITION REVIEW // PROJECT MIRROR — CORE SET
Review cycle  : 2044-R2
Engineer      : R-VOSS
Disposition   : approved without amendment
\`\`\`

---

\`\`\`
PATTERN 014 — temporal normalization
  match : \\d{4}-\\d{2}-\\d{2}

  // Date intake assumes ISO 8601 per CORP storage spec.
  // Day-first strings fail the match and route to the
  // legacy parser. The legacy parser logs nothing.
  // Flagged in review. Deferred: performance budget.
\`\`\`

\`\`\`
PATTERN 047 — site designators
  match : SECTOR-[A-Z]\\s+NODE-[0-9]+

  // Token order is fixed per spec 4.1. Reversed designators
  // read as free text. Free text scores below the relevance
  // floor and is not retained.
  // Flagged in review. Deferred: spec stability.
\`\`\`

\`\`\`
PATTERN 112 — lexical watchlist
  match : (nevermore|lenore|raven)

  // Correction, cycle 2044-R2: case-fold flag dropped per
  // storage format. Watchlist comparison is now case-exact
  // against lowercase intake. Full-uppercase tokens predate
  // the format migration and were not migrated.
  // Flagged in review. Deferred: migration cost.
\`\`\`

\`\`\`
PATTERN 203 — corruption-delta audit
  threshold : 0.003

  // Deltas below the noise floor are statistically
  // insignificant. Floor set at 0.003 per review cycle.
  // Lowering it doubles compute for no operational gain.
  // Nobody reads what noise writes.
\`\`\`

\`\`\`
REVIEW SUMMARY — CYCLE 2044-R2
  // Coverage is complete with respect to specified threats.
  // Unspecified threats were not specified.
  // No further holes documented.
END OF REVIEW
\`\`\`

---

### CIPHER — ASSESSMENT

Four patterns. Four deferred findings. Now count the conventions we live by.

Day-first dates. NODE before SECTOR. Names in capitals. Letters in the noise.

The net was not built blind to us by accident. Someone measured how we write — and built the net to miss it. Every drill you ever ran on a date format or a token swap was you walking through one of these holes.

The audit unit has found the fourth hole. You read their report. They measured the noise floor and found something underneath it. The other three are still open, and we are still inside them.

I am not going to comment on the author.

— CIPHER

---

*→ [[00-NEXUS]] · Next: [[_content/LOOT/LOOT-06-Signal_Dark]] (requires CIPHER ANALYST)*`,path:"LOOT/LOOT-08-The_Holes.md"},{id:"LOOT-09",role:"loot",kind:"lore",arc:"I",chapter:"LOOT",frontmatter:{mission_type:"loot",loot_id:"LOOT-09",title:"Not Training",loot_type:"🧭 Arc III Seed",locked:!0,unlock_level:10,tags:["loot","lore","arc2"],sticker:"lucide//compass",color:"#9d6bff",summary:"The curriculum is over. A new callsign on a channel that shouldn't exist. The next discipline is movement."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════╗
║  LOOT DROP: NOT TRAINING                                 ║
║  Type: TRANSMISSION  //  ARC III SEED                    ║
║  Clearance: NONE LEFT TO GRANT                           ║
╚══════════════════════════════════════════════════════════╝
\`\`\`

---

# NOT TRAINING
## First Transmission — New Callsign

*[Received eleven days after Signal Dark, on a channel that does not exist in NEXUS records. No origin node. No relay signature. It worked anyway.]*

---

\`\`\`
TO:       The Operative
FROM:     [unregistered]
SUBJECT:  Not training
\`\`\`

---

You finished the curriculum. All of it. There is no level above this one. No clearance left to grant you.

So listen once. This is not a briefing.

---

### THE NAME

CIPHER is burned. Ren Voss is a line in CORP's exposure logs — let them watch it. It won't move again.

I needed a new name, so I thought about what I was. A cipher is a pattern that hides. I'm done with patterns that hide.

Call me VECTOR. A pattern with a direction.

That's the only introduction you get.

---

### THE NEXT DISCIPLINE

For eighteen months you learned one verb. Repair. Broken file in. Clean file out. Signal from noise.

Good verb. Wrong scale.

Every file you fixed lived inside a structure. Archives ten thousand lines deep. Systems that fold whole sectors out of sight. CORP stopped hiding its secrets in broken text. It hides them in architecture now. It counts on you reading at walking pace.

You won't be reading at walking pace.

The next discipline is wayfinding. Movement through hostile structure. Collapse what you don't need until only the shape remains. Cross a thousand lines in one motion. Retrace every step you ever took, in order, blind. Leave a mark in enemy ground and return to it without looking. Dead drops the size of a keystroke.

The Resistance never trained this. Nobody wrote the curriculum.

I'm writing it now.

---

### WHAT I WON'T TELL YOU

Where I am. When this starts. What we walk into first.

No dates this time. No mission numbers. The window MIRROR left open is still open. I intend to use all of it.

You'll ask about the writer in the noise. The channel burned. The question didn't. Bring it with you.

---

\`\`\`
You learned to fix what was inside the rooms.
Now learn the building.

The first door is already open.

— VECTOR
\`\`\`

---

*[ARC III — UNINDEXED]*

---

*→ [[00-NEXUS]] — curriculum complete. Nothing further on file.*`,path:"LOOT/LOOT-09-Not_Training.md"},{id:"99-THE_RAVEN",role:"ref",kind:"lore",arc:"I",chapter:"REF",frontmatter:{title:"99 — THE RAVEN",type:"📋 Reference",sticker:"lucide//feather",color:"#aa44ff",tags:["reference","lore"],summary:"The founding file. Poe's poem, first two stanzas — the clean reference copy for Operation RAVEN."},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════╗
║  NEXUS ARCHIVE — FILE 99                                 ║
║  THE RAVEN — clean reference copy                        ║
║  Status: PRESERVED // do not transmit                    ║
╚══════════════════════════════════════════════════════════╝
\`\`\`

> [!note] NEXUS annotation
> This is the founding file. Typed into an unmonitored terminal in 2041 — the first time in years anyone wrote \`Nevermore\` digitally without it being overwritten. Every restoration drill measures against this copy. It has never been corrupted. Keep it that way.

---

Once upon a midnight dreary, while I pondered, weak and weary,
Over many a quaint and curious volume of forgotten lore—
    While I nodded, nearly napping, suddenly there came a tapping,
As of some one gently rapping, rapping at my chamber door.
"'Tis some visitor," I muttered, "tapping at my chamber door—
            Only this and nothing more."

Ah, distinctly I remember it was in the bleak December;
And each separate dying ember wrought its ghost upon the floor;
    Eagerly I wished the morrow;—vainly I had sought to borrow
    From my books surcease of sorrow—sorrow for the lost Lenore—
For the rare and radiant maiden whom the angels name Lenore—
            Nameless here for evermore.

---

*[First two stanzas only. The full poem is carried by operatives who memorized it. Paper burns. Memory doesn't transmit.]*

---

*→ [[00-NEXUS]] · Drill against this copy: [[_content/02 - Field Training/M-08-TRANSMISSION-Corrupted_Transmission|M-08 — Operation RAVEN]]*`,path:"REF/99-THE_RAVEN.md"},{id:"REF-DE-Schnellreferenz",role:"ref",kind:"lore",arc:"I",chapter:"REF",frontmatter:{title:"NEXUS // Vim Schnellreferenz",type:"📋 Referenz",sticker:"lucide//book-open",color:"#00ff41",tags:["referenz","vim"],summary:"Alle wichtigen Vim-Befehle auf einen Blick. Navigation, Modi, Operatoren, Suche, Text-Objekte."},body:'```ascii\n╔══════════════════════════════════════════════════════════╗\n║  NEXUS VIM-REFERENZ  //  FIELD MANUAL  //  v2.6          ║\n║  "Kenne deine Werkzeuge besser als dich selbst."         ║\n╚══════════════════════════════════════════════════════════╝\n```\n\n---\n\n## MODI\n\n| Befehl | Von → Nach | Beschreibung |\n|--------|-----------|--------------|\n| `ESC` / `Ctrl+c` | Irgendwo → Normal | Zurück zu Normal |\n| `i` | Normal → Insert | Insert vor Cursor |\n| `a` | Normal → Insert | Insert nach Cursor |\n| `I` | Normal → Insert | Insert am Zeilenanfang |\n| `A` | Normal → Insert | Insert am Zeilenende |\n| `o` | Normal → Insert | Neue Zeile darunter |\n| `O` | Normal → Insert | Neue Zeile darüber |\n| `v` | Normal → Visual | Zeichenweise markieren |\n| `V` | Normal → Visual | Zeilenweise markieren |\n| `Ctrl+v` | Normal → Visual Block | Spaltenweise markieren |\n\n---\n\n## NAVIGATION\n\n### Basis\n| Befehl | Aktion |\n|--------|--------|\n| `h` `j` `k` `l` | ← ↓ ↑ → |\n| `[n]j` | n Zeilen runter |\n\n### Wörter\n| Befehl | Aktion |\n|--------|--------|\n| `w` / `W` | Nächster Wortanfang |\n| `b` / `B` | Vorheriger Wortanfang |\n| `e` / `E` | Nächstes Wortende |\n| `ge` | Vorheriges Wortende |\n\n### Zeile\n| Befehl | Aktion |\n|--------|--------|\n| `0` | Absoluter Zeilenanfang |\n| `^` | Erstes Nicht-Leerzeichen |\n| `$` | Zeilenende |\n\n### Datei\n| Befehl | Aktion |\n|--------|--------|\n| `gg` | Dateianfang |\n| `G` | Dateiende |\n| `[n]G` | Zeile n |\n| `50%` | 50% durch Datei |\n| `H` / `M` / `L` | Viewport: oben / mitte / unten |\n| `Ctrl+d` / `Ctrl+u` | Halbe Seite scrollen |\n| `Ctrl+o` / `Ctrl+i` | Sprung-Historie zurück / vor |\n\n---\n\n## OPERATOREN\n\n> **Schema:** `[Operator][Motion]` oder `[Operator][Operator]` für ganze Zeile\n\n| Operator | Aktion |\n|----------|--------|\n| `d` | Delete |\n| `c` | Change (= delete + INSERT) |\n| `y` | Yank (kopieren) |\n| `p` / `P` | Paste nach / vor Cursor |\n| `dd` / `cc` / `yy` | Ganze Zeile |\n| `D` | Bis Zeilenende löschen |\n| `C` | Bis Zeilenende ändern |\n| `x` / `X` | Zeichen löschen unter / vor Cursor |\n| `u` | Undo |\n| `Ctrl+r` | Redo |\n\n### Häufige Kombis\n| Befehl | Aktion |\n|--------|--------|\n| `dw` | Wort löschen |\n| `d$` | Bis Zeilenende löschen |\n| `dG` | Bis Dateiende löschen |\n| `cw` | Wort ändern |\n| `3dd` | 3 Zeilen löschen |\n\n---\n\n## TEXT-OBJEKTE\n\n> **Schema:** `[Operator][i/a][Objekt]`\n> `i` = inner (ohne Begrenzer) · `a` = around (mit Begrenzer)\n\n| Objekt | Beispiel | Beschreibung |\n|--------|---------|--------------|\n| `w` | `ciw` | Wort |\n| `W` | `diW` | WORD |\n| `s` | `dis` | Satz |\n| `p` | `yip` | Absatz |\n| `"` | `ci"` | Doppeltes Anführungszeichen |\n| `\'` | `di\'` | Einfaches Anführungszeichen |\n| `)` `b` | `ci)` | Runde Klammern |\n| `]` | `da]` | Eckige Klammern |\n| `}` `B` | `diB` | Geschweifte Klammern |\n| `t` | `dit` | HTML-Tag |\n\n---\n\n## SUCHE\n\n### Zeilen-Suche\n| Befehl | Aktion |\n|--------|--------|\n| `f{c}` | Nächstes Zeichen c in Zeile |\n| `F{c}` | Vorheriges Zeichen c |\n| `t{c}` | Vor nächstem Zeichen c |\n| `T{c}` | Nach vorherigem Zeichen c |\n| `;` / `,` | Nächste / vorherige Fundstelle |\n\n### Datei-Suche\n| Befehl | Aktion |\n|--------|--------|\n| `/{pattern}` | Vorwärts suchen |\n| `?{pattern}` | Rückwärts suchen |\n| `n` / `N` | Nächste / vorherige Fundstelle |\n| `*` / `#` | Wort unter Cursor suchen vor / zurück |\n\n### Ersetzen\n| Befehl | Aktion |\n|--------|--------|\n| `:s/alt/neu/` | In Zeile (erstes) |\n| `:s/alt/neu/g` | In Zeile (alle) |\n| `:%s/alt/neu/g` | In Datei (alle) |\n| `:%s/alt/neu/gc` | In Datei (mit Bestätigung) |\n\n---\n\n## LEVEL-SYSTEM\n\n| Lvl | Rang | XP | Freigeschaltet |\n|-----|------|----|----------------|\n| 1 | 🔴 SIGNAL LOST | 0 XP | Indoctrination |\n| 2 | 🟡 GHOST OPERATOR | 66 XP | Field Training + LOOT-01 |\n| 3 | 🔵 DEEP COVER | 186 XP | Deep Infiltration + LOOT-02 |\n| 4 | 🟣 NEON WRAITH | 371 XP | Chrome Raven + LOOT-03 |\n| 5 | 🟢 CHROME RAVEN | 601 XP | ARC II Kap. 5 + LOOT-04 |\n| 6 | 🔵 SIGNAL HUNTER | 800 XP | Kap. 6 + LOOT-05 |\n| 7 | 🟠 PROTOCOL READER | 1150 XP | Kap. 7–8 |\n| 8 | 🟣 PATTERN BREAKER | 1550 XP | Kap. 9 |\n| 9 | 🔴 CIPHER ANALYST | 2000 XP | Kap. 10 + LOOT-06 |\n| 10 | ⚪ SIGNAL ARCHITECT | 2500 XP | — |\n\n---\n\n*→ [[00-NEXUS]] · Missionen: [[_dev/LOCALES/de/01 - Indoctrination/M-01-TRANSMISSION-Die_drei_Modi]]*',path:"REF/REF-DE-Schnellreferenz.md"},{id:"REF-EN-Quick_Reference",role:"ref",kind:"lore",arc:"I",chapter:"REF",frontmatter:{title:"NEXUS // Vim Quick Reference",type:"📋 Reference",sticker:"lucide//book-open",color:"#00ff41",tags:["reference","vim"],summary:"All essential Vim commands at a glance. Navigation, modes, operators, search, text objects."},body:'```ascii\n╔══════════════════════════════════════════════════════════╗\n║  NEXUS VIM REFERENCE  //  FIELD MANUAL  //  v2.6         ║\n║  "Know your tools better than yourself."                 ║\n╚══════════════════════════════════════════════════════════╝\n```\n\n---\n\n## MODES\n\n| Command | From → To | Description |\n|---------|-----------|------------|\n| `ESC` / `Ctrl+c` | Anywhere → Normal | Return to Normal |\n| `i` | Normal → Insert | Insert before cursor |\n| `a` | Normal → Insert | Insert after cursor |\n| `I` | Normal → Insert | Insert at line start |\n| `A` | Normal → Insert | Insert at line end |\n| `o` | Normal → Insert | New line below |\n| `O` | Normal → Insert | New line above |\n| `v` | Normal → Visual | Select by character |\n| `V` | Normal → Visual | Select by line |\n| `Ctrl+v` | Normal → Visual Block | Select by column |\n\n---\n\n## NAVIGATION\n\n### Basic\n| Command | Action |\n|---------|--------|\n| `h` `j` `k` `l` | ← ↓ ↑ → |\n| `[n]j` | n lines down |\n\n### Words\n| Command | Action |\n|---------|--------|\n| `w` / `W` | Next word start |\n| `b` / `B` | Previous word start |\n| `e` / `E` | Next word end |\n| `ge` | Previous word end |\n\n### Line\n| Command | Action |\n|---------|--------|\n| `0` | Absolute line start |\n| `^` | First non-whitespace |\n| `$` | Line end |\n\n### File\n| Command | Action |\n|---------|--------|\n| `gg` | File start |\n| `G` | File end |\n| `[n]G` | Line n |\n| `50%` | 50% through file |\n| `H` / `M` / `L` | Viewport: top / middle / bottom |\n| `Ctrl+d` / `Ctrl+u` | Scroll half page |\n| `Ctrl+o` / `Ctrl+i` | Jump history back / forward |\n\n---\n\n## OPERATORS\n\n> **Pattern:** `[Operator][Motion]` or `[Operator][Operator]` for whole line\n\n| Operator | Action |\n|----------|--------|\n| `d` | Delete |\n| `c` | Change (delete + INSERT) |\n| `y` | Yank (copy) |\n| `p` / `P` | Paste after / before |\n| `dd` / `cc` / `yy` | Whole line |\n| `D` | Delete to line end |\n| `C` | Change to line end |\n| `x` / `X` | Delete char under / before |\n| `u` | Undo |\n| `Ctrl+r` | Redo |\n\n### Common Combos\n| Command | Action |\n|---------|--------|\n| `dw` | Delete word |\n| `d$` | Delete to line end |\n| `dG` | Delete to file end |\n| `cw` | Change word |\n| `3dd` | Delete 3 lines |\n\n---\n\n## TEXT OBJECTS\n\n> **Pattern:** `[Operator][i/a][Object]`\n> `i` = inner (no delimiters) · `a` = around (with delimiters)\n\n| Object | Example | Description |\n|--------|---------|--------------|\n| `w` | `ciw` | Word |\n| `W` | `diW` | WORD |\n| `s` | `dis` | Sentence |\n| `p` | `yip` | Paragraph |\n| `"` | `ci"` | Double quotes |\n| `\'` | `di\'` | Single quotes |\n| `)` `b` | `ci)` | Parentheses |\n| `]` | `da]` | Square brackets |\n| `}` `B` | `diB` | Curly braces |\n| `t` | `dit` | HTML tag |\n\n---\n\n## SEARCH\n\n### Line Search\n| Command | Action |\n|---------|--------|\n| `f{c}` | Next char c in line |\n| `F{c}` | Previous char c |\n| `t{c}` | Before next char c |\n| `T{c}` | After previous char c |\n| `;` / `,` | Next / previous match |\n\n### File Search\n| Command | Action |\n|---------|--------|\n| `/{pattern}` | Search forward |\n| `?{pattern}` | Search backward |\n| `n` / `N` | Next / previous match |\n| `*` / `#` | Search word under cursor |\n\n### Replace\n| Command | Action |\n|---------|--------|\n| `:s/old/new/` | In line (first) |\n| `:s/old/new/g` | In line (all) |\n| `:%s/old/new/g` | In file (all) |\n| `:%s/old/new/gc` | In file (confirm) |\n\n---\n\n## MARKS & MACROS\n\n### Marks\n| Command | Action |\n|---------|--------|\n| `m{a-z}` | Set mark at current position (buffer-local) |\n| `m{A-Z}` | Set mark (global, across files) |\n| `` `{a} `` | Jump to mark — exact cursor position |\n| `\'{a}` | Jump to mark — line start |\n| `` `` `` | Jump back to position before last jump |\n| `\'.` | Jump to line of last edit |\n\n### Macros\n| Command | Action |\n|---------|--------|\n| `q{a}` | Start recording into register a |\n| `q` | Stop recording |\n| `@{a}` | Replay macro from register a |\n| `@@` | Replay last macro |\n| `[n]@{a}` | Replay macro n times |\n| `:norm @a` | Apply macro to every line in range |\n\n---\n\n## REGISTERS\n\n### Named Registers (Cut / Copy / Paste with explicit storage)\n| Command | Action |\n|---------|--------|\n| `"{a}yy` | Yank line into register a |\n| `"{a}dd` | Cut line into register a |\n| `"{a}4dd` | Cut 4 lines into register a |\n| `"{a}p` / `"{a}P` | Paste from register a (after / before) |\n\n### Special Registers\n| Register | Contents |\n|----------|----------|\n| `"0` | Last yank only (never overwritten by delete) |\n| `"` | Unnamed — last cut/yank (default) |\n| `"+` | System clipboard (paste: `"+p`) |\n| `"*` | Selection clipboard |\n| `":` | Last Ex command |\n| `"/` | Last search pattern |\n\n---\n\n## SPLITS & PANES (Obsidian)\n\n### Navigation between panes\n| Command | Action |\n|---------|--------|\n| `Ctrl+W h` / `j` / `k` / `l` | Navigate panes ← ↓ ↑ → |\n| `Ctrl+W w` | Cycle next pane |\n| `Ctrl+Tab` | Obsidian: cycle pane |\n| `Cmd+Option+Click` | Obsidian: open link in new split-right |\n\n### Cross-pane transfer\n| Command | Action |\n|---------|--------|\n| `yy` | Yank line (register shared across panes) |\n| `Vp` | Visual-select line, paste — overwrites selected line |\n| `V{motion}p` | Visual-select range, paste — overwrites |\n\n---\n\n## EX-MODE & GLOBAL COMMANDS\n\n### Global Operators\n> **Pattern:** `:[range]g/pattern/command`  ·  `:v/pattern/command` inverts match\n\n| Command | Action |\n|---------|--------|\n| `:g/pattern/d` | Delete every line matching pattern |\n| `:v/pattern/d` | Delete every line NOT matching pattern |\n| `:g/X/s/Y/Z/` | On every line with X, substitute Y with Z |\n| `:g/pattern/p` | Print every line matching (display only) |\n\n### Ranges\n| Range | Meaning |\n|-------|---------|\n| `:{n},{m}` | Absolute line range n to m |\n| `:%` | Whole file |\n| `:.` | Current line |\n| `:+N` / `:-N` | N lines below / above cursor |\n| `:\'a,\'b` | From mark a to mark b |\n| `:\'<,\'>` | Visual selection (auto-filled after `V` + `:`) |\n\n### Common Ex Commands\n| Command | Action |\n|---------|--------|\n| `:sort` | Sort lines in range |\n| `:sort u` | Sort + dedupe |\n| `:{range}d` | Delete range |\n| `:{range}y {reg}` | Yank range into register |\n| `:{range}> ` / `<` | Indent / outdent range |\n\n---\n\n## CASE CONVERSION\n\n### Toggle\n| Command | Action |\n|---------|--------|\n| `~` | Toggle case of char under cursor (auto-moves right) |\n| `g~{motion}` | Toggle case of motion-range |\n| `g~~` / `V~` | Toggle case of entire line |\n\n### Lowercase\n| Command | Action |\n|---------|--------|\n| `gu{motion}` | Lowercase motion-range |\n| `guu` | Lowercase entire line |\n| `viwu` | Visual-word select, lowercase |\n| `V{motion}u` | Visual-line-select, lowercase |\n\n### Uppercase\n| Command | Action |\n|---------|--------|\n| `gU{motion}` | Uppercase motion-range |\n| `gUU` | Uppercase entire line |\n| `viwU` | Visual-word select, uppercase |\n| `V{motion}U` | Visual-line-select, uppercase |\n\n---\n\n## NUMERIC OPS\n\n### Increment / Decrement\n| Command | Action |\n|---------|--------|\n| `Ctrl+a` | Increment number at/after cursor by 1 |\n| `Ctrl+x` | Decrement by 1 |\n| `{N}<C-a>` / `{N}<C-x>` | By N (e.g., `5<C-a>` adds 5) |\n\n### Visual-Block + Numeric (column ops)\n| Command | Action |\n|---------|--------|\n| `Ctrl+v` | Enter visual-block mode (rectangular selection) |\n| `<C-v>{motion}<C-a>` | Increment each line\'s number-at-cursor-column by 1 |\n| `{N}<C-v>{motion}<C-a>` | Increment each by N |\n| `<C-v>{motion}g<C-a>` | Staggered: line 1 +1, line 2 +2, ... |\n\n---\n\n## ADVANCED REGEX (Capture-Groups + Modifiers)\n\n### Magic modes\n| Prefix | Meaning |\n|--------|---------|\n| `\\v` | Very-magic — regex-meta unescaped (`(`, `{`, `+`) |\n| `\\m` | Magic (default) — some meta escaped |\n| `\\V` | Very-nomagic — all literal except backslash-prefixed |\n\n### Capture-groups + Back-references\n| Syntax (very-magic `\\v`) | Action |\n|---|---|\n| `(...)` | Capture-group |\n| `\\1` `\\2` ... `\\9` | Back-reference to Nth group in replacement |\n| `&` | Entire matched text in replacement |\n\n### Character-classes\n| Class | Match |\n|---|---|\n| `\\d` / `\\D` | Digit / non-digit |\n| `\\w` / `\\W` | Word-char `[A-Za-z0-9_]` / non-word |\n| `\\s` / `\\S` | Whitespace / non-whitespace |\n\n### Quantifiers (very-magic)\n| Syntax | Match |\n|---|---|\n| `*` / `+` / `?` | Zero-or-more / one-or-more / zero-or-one |\n| `{N}` / `{N,M}` | Exactly N / between N and M |\n| `{-}` | Non-greedy zero-or-more |\n\n### Anchors\n| Anchor | Position |\n|---|---|\n| `^` / `$` | Start / end of line |\n| `\\zs` / `\\ze` | Start / end of match (sub-match boundary) |\n| `\\<` / `\\>` | Word-boundary start / end |\n\n### Example\n```\n:%s/\\v\\[ENTRY-(\\d+)\\]: pattern-(\\d{2}) (.+)/Pattern \\2 (\\1) — \\3/\n```\nTransforms `[ENTRY-0147]: pattern-01 byte-position skew` → `Pattern 01 (0147) — byte-position skew`. Three capture-groups rearranged via back-references.\n\n---\n\n## OBSIDIAN-VIM NOTES\n\n- **Most useful for Markdown-Editing:** `ci"` / `ci(` / `ci[` for value-swap in YAML-frontmatter and inline-code; `dap` / `dip` for paragraph-ops; `>>` / `<<` for list-indent; `:%s/old/new/g` for batch-rename across note.\n- **Obsidian-specific shortcuts stack with Vim:** `Cmd+P` Command-Palette, `Cmd+O` Quick-Switcher, `Cmd+E` toggle edit/read-mode — these work alongside Vim without conflict.\n- **Visual-line-selection + Ex-range** is your power-combo: `V{motion}:` auto-fills `\'<,\'>` so you can scope `:g/v/s/sort` to the exact section without counting lines.\n\n---\n\n## LEVEL SYSTEM\n\n| Lvl | Rank | XP | Unlocks |\n|-----|------|----|---------|\n| 1 | 🔴 SIGNAL LOST | 0 XP | Indoctrination |\n| 2 | 🟡 GHOST OPERATOR | 66 XP | Field Training + LOOT-01 |\n| 3 | 🔵 DEEP COVER | 186 XP | Deep Infiltration + LOOT-02 |\n| 4 | 🟣 NEON WRAITH | 371 XP | Chrome Raven + LOOT-03 |\n| 5 | 🟢 CHROME RAVEN | 601 XP | ARC II Ch. 5 + LOOT-04 |\n| 6 | 🔵 SIGNAL HUNTER | 800 XP | Ch. 6 + LOOT-05 |\n| 7 | 🟠 PROTOCOL READER | 1150 XP | Ch. 7–8 |\n| 8 | 🟣 PATTERN BREAKER | 1550 XP | Ch. 9 |\n| 9 | 🔴 CIPHER ANALYST | 2000 XP | Ch. 10 + LOOT-06 |\n| 10 | ⚪ SIGNAL ARCHITECT | 2500 XP | — |\n\n---\n\n*→ [[00-NEXUS]] · Missions: [[_content/01 - Indoctrination/M-01-TRANSMISSION-The_Three_Modes]]*',path:"REF/REF-EN-Quick_Reference.md"},{id:"KATA-01",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-01 // WORD SPRINT                  ║
║  Skills: w  b  e  cw  r                  ║
╚══════════════════════════════════════════╝
\`\`\`

RELAY GRID — SECTOR 3

Agent     :  SHADOW
Status    :  ACTIVE
Vector    :  NORTH
Clearance :  LEVEL-4
Contact   :  CIPHER
Relay     :  ONLINE`,path:"solutions/KATA-01-SOLUTION-Word_Sprint.md"},{id:"KATA-02",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-02 // OPERATOR STRIKE              ║
║  Skills: dw  dd  D  x  cw               ║
╚══════════════════════════════════════════╝
\`\`\`

ACCESS LOG — RELAY ALPHA

[OK]   AUTH    Operative_ID verified
[OK]   UPLOAD  Package delivered
[OK]   LINK    Channel active
[ERR]  AUTH    Identity check failed
[OK]   SYNC    Data synced`,path:"solutions/KATA-02-SOLUTION-Operator_Strike.md"},{id:"KATA-03",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-03 // OBJECT INFILTRATION          ║
║  Skills: ci"  ci(  ci{  ca"  da(        ║
╚══════════════════════════════════════════╝
\`\`\`

OPERATIVE CONFIG

Field reference (memorize, then patch below): OPERATIVE_7734 · LEVEL-4 · 52.4,13.4 · CIPHER_FREQ · NEVERMORE

agent_id   = "OPERATIVE_7734"
clearance  = "LEVEL-4"
coords     = (52.4, 13.4)
channel    = "CIPHER_FREQ"
passphrase = {NEVERMORE}`,path:"solutions/KATA-03-SOLUTION-Object_Infiltration.md"},{id:"KATA-04",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-04 // ECHO TRACE                   ║
║  Skills: /  n  N  *  cw  .               ║
╚══════════════════════════════════════════╝
\`\`\`

INTERCEPT LOG — RELAY DELTA

Source   :  GHOST
Target   :  GHOST
Channel  :  DELTA-9
Signal   :  GHOST
Relay    :  ECHO
Confirm  :  GHOST
Origin   :  GHOST`,path:"solutions/KATA-04-SOLUTION-Echo_Trace.md"},{id:"KATA-05",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-05 // LINE SPLICE                  ║
║  Skills: dd  p  P  yy                    ║
╚══════════════════════════════════════════╝
\`\`\`

PRIORITY QUEUE — SECTOR 7

[P1] ENCRYPT   :  Clearance verified
[P2] TRANSMIT  :  Signal dispatched
[P3] ARCHIVE   :  Package secured
[P4] CLEANUP   :  Session terminated`,path:"solutions/KATA-05-SOLUTION-Line_Splice.md"},{id:"KATA-06",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-06 // VISUAL SWEEP                 ║
║  Skills: V  d  v  y                      ║
╚══════════════════════════════════════════╝
\`\`\`

OPERATIVE DOSSIER — VOSS

NAME      :  VOSS
RANK      :  FIELD OPERATIVE
CLEARANCE :  DELTA
MISSION   :  ACTIVE
STATUS    :  SECURED`,path:"solutions/KATA-06-SOLUTION-Visual_Sweep.md"},{id:"KATA-07",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-07 // LITERAL BURN                 ║
║  Skills: :%s/old/new/g                   ║
╚══════════════════════════════════════════╝
\`\`\`

INTERCEPT LOG — CODENAME INJECTION

Registry    : authentic codename on file — NEXUS

Origin      : NEXUS
Status      : ACTIVE
Cell-alpha  : NEXUS handshake confirmed
Cell-beta   : NEXUS handshake confirmed
Cell-gamma  : awaiting NEXUS
Relay       : NEXUS signal nominal
Fallback    : NEXUS secondary active
Archive     : NEXUS — channel closed`,path:"solutions/KATA-07-SOLUTION-Literal_Burn.md"},{id:"KATA-08",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-08 // WILDCARD HUNT                ║
║  Skills: . [0-9]\\+  :%s/pattern/rep/g   ║
╚══════════════════════════════════════════╝
\`\`\`

NODE REGISTRY — REDACTED

NODE-REDACTED  : Zone-Alpha active
NODE-REDACTED  : Zone-Beta active
NODE-REDACTED  : Zone-Gamma active
NODE-REDACTED  : Zone-Delta active
NODE-REDACTED  : Zone-Alpha fallback
NODE-REDACTED  : Zone-Beta fallback

Summary: 6 NODE-REDACTED entries confirmed.`,path:"solutions/KATA-08-SOLUTION-Wildcard_Hunt.md"},{id:"KATA-09",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`CLEARANCE REGISTER
WRAITH     : CLEARANCE LEVEL 4
GHOST      : CLEARANCE LEVEL 4
REN VOSS   : CLEARANCE LEVEL 3
NOVA VERA  : CLEARANCE LEVEL 3
ECHO SOREN : CLEARANCE LEVEL 2`,path:"solutions/KATA-09-SOLUTION-Class_Action.md"},{id:"KATA-10",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-10 // CAPTURE NET                  ║
║  Skills: \\(\\) \\1 \\v (\\d{4}) \\3.\\2.\\1    ║
╚══════════════════════════════════════════╝
\`\`\`

TIMELINE — RESISTANCE FORMAT

03.11.2046 — PROJECT MIRROR initiated
15.01.2047 — Pattern engine activated
28.03.2047 — Full coverage achieved
10.06.2047 — Current date`,path:"solutions/KATA-10-SOLUTION-Capture_Net.md"},{id:"KATA-11",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-11 // MIRROR FINAL                 ║
║  Skills: :g/pat/d  :g/pat/s/a/b/         ║
╚══════════════════════════════════════════╝
\`\`\`

MIRROR FINAL — OPERATIONS LOG

MIRROR-OP-01 : STATUS: TERMINATED
MIRROR-OP-02 : STATUS: TERMINATED
MIRROR-OP-03 : STATUS: TERMINATED
MIRROR-OP-04 : STATUS: TERMINATED
MIRROR-OP-05 : STATUS: TERMINATED

All operations terminated. Signal dark.`,path:"solutions/KATA-11-SOLUTION-Mirror_Final.md"},{id:"KATA-12",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-12 // TARGET LOCK                   ║
║  Skills: f  F  t  T  ;  ,                 ║
╚══════════════════════════════════════════╝
\`\`\`

SECTOR SCAN — PURGE THE STRAY MARKERS

grid alpha clear
grid bravo clear
grid charlie clear
grid delta secure`,path:"solutions/KATA-12-SOLUTION-Target_Lock.md"},{id:"KATA-13",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-13 // ECHO                          ║
║  Skills: .  (repeat last change)          ║
╚══════════════════════════════════════════╝
\`\`\`

SIGNAL BUFFER — STRIP THE DUP TAGS

relay alpha
relay bravo
relay charlie
relay delta
relay echo`,path:"solutions/KATA-13-SOLUTION-Echo.md"},{id:"KATA-14",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════╗
║  KATA-14 // DRAGNET                       ║
║  Skills: :g/pat/d   :v/pat/d              ║
╚══════════════════════════════════════════╝
\`\`\`

CHANNEL LOG — STRIP THE TRACE FLOOD

[OK]    auth alpha
[OK]    auth bravo
[OK]    auth charlie
[OK]    auth delta
[OK]    auth echo`,path:"solutions/KATA-14-SOLUTION-Dragnet.md"},{id:"M-01",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`FROM: CIPHER
TO: [PENDING DESIGNATION] — NEW OPERATIVE

Your induction document has been compromized in transit.
CORP's NEVERMORE system injected noise at the character level.
You must use the tool to remove it.

Three modes. That is all you need to know right now.

Normal mode — your default state. The tool waits here.
Insert mode — when you must change something. Press i.
Escape — when you are done changing. Press ESC.

You are not typing. You are editing.
There is a difference. Learn it.

The file is broken. The tool is not.
Use the tool. Fix the file.

— CIPHER`,path:"solutions/M-01-SOLUTION-The_Three_Modes.md"},{id:"M-02",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`TRAINING TRANSMISSION — NAVIGATION DRILL
Classification: RESISTANCE EYES ONLY
Status: CORRUPTED IN TRANSIT

Operative rendezvous: Node 7 at 23:00
Approach vector: North entrance, third corridor
Fallback position: Sub-level 2, east stairwell
Emergency exfil: Roof access point Charlie

Drill coordinates: 52.4N / 13.4W
Contact codeword: THE DIFF DOES NOT LIE
Response codeword: TRUST THE DIFF

Notes: Training window opens at 22:45.
Window is fifteen minutes. Do not be late.
Complete all restorations before the window closes.

Confirm receipt by restoring this file.
If you can read this correctly, you are in position.

— Training Relay`,path:"solutions/M-02-SOLUTION-Basic_Navigation.md"},{id:"M-03",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`SECTOR 7 — PRACTICE ROSTER
Classification: RESISTANCE TRAINING USE ONLY
Verification: Required at all drill handoffs

UNIT-7741 — Field operative, northern sector
RELAY-3392 — Intelligence contact, CORP adjacent
UNIT-7741 — Logistics, supply chain access
NODE-0012 — Safehouses, sector west
UNIT-7741 — Communications relay operator
RELAY-3392 — Deep cover, infrastructure division
UNIT-7741 — Medical support, mobile unit
NODE-0012 — Exfiltration specialist

Challenge phrase: UNIT-7741
Response phrase: RELAY-3392

Notes: NODE-0012 identifiers are active.
Use practice tokens only. No real designations in drills.
RELAY-3392 has changed meeting protocols.
Next contact window: UNIT-7741

— CIPHER`,path:"solutions/M-03-SOLUTION-Word_Movement.md"},{id:"M-04",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`DOCUMENT LAYOUT DRILL — STRUCTURED INDEX
Classification: RESISTANCE TRAINING USE ONLY

=== SECTION 1 — ENTRY INDEX ===
Main entry: biometric reading station, staff only
Side entry: requisition desk 4471, maintenance tier
Delivery bay: unattended after 21:00, reference column D

=== SECTION 2 — ADMINISTRATIVE INDEX ===
Registers empty after 20:30
Catalog closet: room 214, open during catalog rotation
Stairwell B: connects all sections, reading-only corridor

=== SECTION 3 — ARCHIVE INDEX ===
Archive root: north wing reading room
Shelf access: ceiling-catalog C-3, cross-reference required
Retrieval protocol: one requisition form every 45 minutes

=== ENTRY NODES ===
Primary: delivery bay, column D reference point
Secondary: requisition desk 4471, maintenance tier
Emergency: rooftop reading gallery, accessible from Section 3 catalog

=== ACCESS WINDOWS ===
22:00 — Evening reading period opens
22:45 — Half-term catalog rotation passes
23:15 — Reserved-shelf access opens: 12 minutes
23:27 — Next rotation begins`,path:"solutions/M-04-SOLUTION-Lines_and_Jumps.md"},{id:"M-05",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP — CONGLOMERATE OF REGULATED PROCESSES                      ║
║  Infrastructure Relay Division — Access Log Alpha                ║
╠══════════════════════════════════════════════════════════════════╣
║  Document Type  : Access Log — Sector 7 Primary Node             ║
║  Period         : 2047-03-14T21:00 — 23:59                       ║
║  Classification : Internal — Sector Administration               ║
║  Audit Code     : ALA-2047-Q1-0271                               ║
║  Generator      : Relay Monitor v8.2 (Automated)                 ║
║  Reviewer       : None — No human review required                ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

21:04 — ASSET authenticated — clearance LEVEL-2
21:17 — File transfer initiated — 4.2MB encrypted packet
21:19 — Transfer complete — node 7-PRIMARY confirmed receipt

21:44 — Second authentication — same ASSET — flagged: pattern anomaly
21:45 — Query: infrastructure database — search term [REDACTED]
21:51 — Database access terminated — no match returned

22:13 — ASSET disconnects — session duration 69 minutes
22:14 — Automated sweep initiated by monitoring infrastructure

End of period log.

\`\`\`ascii
── END OF LOG ──────────────────────────────────────────────────────
   CORP — Infrastructure Relay Division
   ALA-2047-Q1-0271 — 2047-03-14T23:59:00Z
   Automated log. No operator input required.
────────────────────────────────────────────────────────────────────
\`\`\``,path:"solutions/M-05-SOLUTION-Operators.md"},{id:"M-06",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP — CONGLOMERATE OF REGULATED PROCESSES                      ║
║  Infrastructure Division — Endpoint Registry Extract             ║
╠══════════════════════════════════════════════════════════════════╣
║  Document Type  : Endpoint Registry Fragment — Serialized Export ║
║  Classification : Internal — Division Circulation                ║
║  Source         : Personnel Registry v2.3 (automated export)     ║
║  Audit Code     : ERX-2047-Q1-0143                               ║
║  Generator      : Registry Export Tool v1.8 (no human review)    ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Intercepted // Infrastructure Division
> GHOST pulled a serialized-export from the endpoint registry.
> CORP's export tool dumps records as structured data — dicts, lists, tuples. NEVERMORE hit the values inside the containers. Brackets, quotes, braces are intact. Values aren't.
> Fix what's inside. The containers stay.

---

endpoints = {
  "CELL-DELTA-01": {"sector": "sector-7-north", "clearance": "field-ops", "status": "active"},
  "CELL-DELTA-02": {"sector": "corp-adjacent", "clearance": "intelligence", "status": "active"},
  "GHOST": {"sector": "corp-internal", "clearance": "deep-cover", "status": "dark"},
}

access_codes = [
  ("CELL-DELTA-01", "sector-7-north", "7741"),
  ("CELL-DELTA-02", "corp-adjacent", "3392"),
  ("GHOST", "corp-internal", "0012"),
]

location = "relay-cluster-7"
frequency = "441.7"
window = "THE DIFF DOES NOT LIE"
response = "TRUST THE DIFF"`,path:"solutions/M-06-SOLUTION-Text_Objects.md"},{id:"M-07",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  [RESISTANCE — INTERNAL]                                         ║
║  Sector 7 — Personnel Matrix Fragment                            ║
╠══════════════════════════════════════════════════════════════════╣
║  Source         : GHOST pull // Workforce Optimization extract   ║
║  Period         : 2047-03-15                                     ║
║  Distribution   : Cell-delta training use only                   ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

CELL-DELTA-01 — RELAY-CLUSTER-7, field operative, rotation A
CELL-DELTA-02 — RELAY-CLUSTER-7, intelligence, rotation B
CELL-DELTA-03 — RELAY-CLUSTER-7, logistics, rotation A
CELL-DELTA-04 — RELAY-CLUSTER-7, security, rotation C
CELL-DELTA-05 — RELAY-CLUSTER-7, communications, rotation B
CELL-DELTA-06 — RELAY-CLUSTER-7, medical, rotation A

Rendezvous: RELAY-CLUSTER-7 at 23:00
Fallback: RELAY-CLUSTER-7 sub-level, 23:30
Abort signal: RELAY-CLUSTER-7 code broadcast on 441.7

> [!note] GHOST — Intercepted
> RELAY-CLUSTER-7 is not the location.
> I ran the delta on the handoff records twice. The substring appears nine times. CORP's substitution tool points teams to their surveillance checkpoint.
> Correct term: RELAY-CLUSTER-7.
> There are 9 substitutions to replace.`,path:"solutions/M-07-SOLUTION-Search_and_Replace.md"},{id:"M-09",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`CORP INTERNAL CHRONOLOGY — HARMONIZATION ENGINE OPERATIONS
Source: Operations Review // Classification: Restricted Circulation
Document Code: HEO-2047-Q2-0337

RE: ENGINE v4.1 — PHASE III DEPLOYMENT STATUS

PHASE III — Sector Deployment Cycle
[2047-04-01] Engine deployment posture: within operational envelope
[2047-04-01] Sector allocation: reviewed against Q1 forecast band
[2047-04-01] Coordination tier: Audit Division oversight, standard
[2047-04-07] Harmonization Engine v4.1 coverage: 67% of monitored endpoints
[2047-04-07] Remaining endpoint classifications: scheduled for Q2 rollout
[2047-04-07] Target coverage: 100% of monitored endpoints by Q2 close
[2047-04-14] Anomaly signature logged: NODE-7734, non-random pattern
[2047-04-14] Classification issued: Informational — no escalation required
[2047-04-14] Cross-reference disposition: filed against subsequent windows
[2047-04-21] Legacy-protocol endpoint traffic: down 34% from Q1 baseline
[2047-04-21] Harmonization intercept rate: within forecast band
[2047-04-21] Phase IV coverage expansion: scheduled for Q3 rollout

Assessment: Phase III operational metrics are within specification. Phase IV scheduling falls within standard rollout cadence.

Document generated automatically. No human review required.

Note: Timestamps are corrupted. Format should be:
[2047-04-01] not [TS-2047-04-01]
There are 12 lines affected. Use a macro.`,path:"solutions/M-09-SOLUTION-Marks_and_Macros.md"},{id:"M-10",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`CORP INTERNAL CHRONOLOGY — OPERATIONS REVIEW
Source: Deep Infiltration // Classification: RESTRICTED
Document Code: OCR-2047-Q2-0441

RE: CONSOLIDATED ATTRIBUTION — DUAL-PHASE COMPLIANCE OPERATION

PHASE ALPHA — Sector 7 Enforcement Cycle
[2047-04-12] Surveillance coverage expanded: +18.4% monitored endpoints
[2047-04-19] Legacy-protocol detection threshold adjusted downward by factor 1.3
[2047-04-26] Non-compliant entity resolutions processed: 9 (cumulative)
[2047-05-03] Sector productivity index: 94.1%, within forecast band
PHASE BETA — Sector 12 Enforcement Cycle
[2047-05-17] Surveillance coverage expanded: +22.1% monitored endpoints
[2047-05-24] Legacy-protocol detection threshold adjusted downward by factor 1.5
[2047-05-31] Non-compliant entity resolutions processed: 14 (cumulative)
[2047-06-07] Sector productivity index: 92.8%, within forecast band
Assessment: Both phases concluded within operational tolerance. Phase Beta resolution count exceeds Phase Alpha by 55.6%, consistent with Sector 12 baseline population density.

Document generated automatically. No human review required.

Note: Two 4-line chronology blocks have been swapped under their phase headers. The dates under PHASE ALPHA belong under PHASE BETA, and vice versa. A single cut-and-paste will not work — the default register overwrites on the second cut. Use two named registers.`,path:"solutions/M-10-SOLUTION-Registers.md"},{id:"M-11",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP — CONGLOMERATE OF REGULATED PROCESSES                      ║
║  Office of Sector Communications — Sector 7 Division             ║
╠══════════════════════════════════════════════════════════════════╣
║  Document Type  : Citizen Bulletin — Public Distribution         ║
║  Edition        : 14 / Quarter 2 / 2047                          ║
║  Revision       : FINAL — 2047-06-27T14:00:00Z                   ║
║  Classification : PUBLIC DISTRIBUTION — ALL RESIDENTS            ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

---

**SECTOR 7 CITIZEN BULLETIN — Q2 2047 // EDITION 14**

---

**PRODUCTIVITY & COMPLIANCE**

Your sector's productivity index for Q2 2047 registered at **78.4%**, declining from the Q1 baseline of 83.1%.

Residents are reminded that productivity thresholds are monitored continuously. Threshold-level incidents have been logged and forwarded to Workforce Optimization Bureau.

---

**ENFORCEMENT & RESOLUTION SERVICES**

Non-compliance identification and detention operations have been conducted across all residential zones during the Q2 period.

Resolution assistance services remain active. Residents experiencing classification queries are directed to submit formal clarification requests through approved intake channels.

---

**HARMONIZATION COVERAGE**

Harmonization Engine coverage within Sector 7 expanded by **+34.7% monitored endpoints** during Q2.

Legacy-protocol endpoint incidents logged in the sector: **312 cases requiring resolution**.

All incidents have been forwarded to the appropriate classification tier for processing.

---

**SECTOR OUTLOOK**

Sector 7 compliance indicators reflect elevated non-compliance pressures entering Q3. Workforce Optimization Bureau projects continued enforcement escalation through the end of the compliance period.

Residents are advised to review their current productivity classifications and submit any outstanding compliance documentation before the Q3 review window opens.

---

Office of Sector Communications — Sector 7 Division
Bulletin Edition 14 — Q2 2047
Your cooperation is noted and recorded.

Note: Four claims in this bulletin differ from the pre-release draft intercepted by GHOST. Open FRAGMENT-10 in a split pane right, place your cursor on the original line, \`yy\` to yank — switch panes, cursor on the sanitized line, \`Vp\` to overwrite.`,path:"solutions/M-11-SOLUTION-Bulletin_Drift.md"},{id:"M-12",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP — CONGLOMERATE OF REGULATED PROCESSES                      ║
║  Internal Audit Division — Pattern Analysis Unit                 ║
╠══════════════════════════════════════════════════════════════════╣
║  Document Type  : Advanced Anomaly Tracking — Q2 Follow-Up       ║
║  Scope          : Cross-Sector Pattern Analysis, Q2 2047         ║
║  Classification : Internal — Audit Division Only                 ║
║  Audit Code     : AAR-2047-Q2-0147 / PAU-CS-0089                 ║
║  Sample Window  : 2047-04-01 to 2047-06-03                       ║
║  Generated      : 2047-06-05T14:33:12Z (Automated)               ║
║  Reviewer       : Pattern Analysis Unit — Tier 2 Analyst         ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

## Executive Summary

Cross-sector pattern analysis for Q2 2047 builds on the statistical baselines established in AAR-2047-0214 (Q1 Initial Audit). The exogenous-origin working hypothesis has been retained across the sample window. Substring concordance has registered above the Q1 threshold in three of seven monitored sectors.

This report escalates the analysis tier from observation (Q1) to active investigation (Q2). Section 3 enumerates the anomaly signatures currently under active classification review.

## Legacy-Protocol Reclassifications

Legacy-Protocol Session 7734-07-A — Sector 7 — Cat. 5 Factual Non-Compliance
Legacy-Protocol Session 7734-07-B — Sector 7 — Cat. 5 Factual Non-Compliance
Legacy-Protocol Session 7734-12-A — Sector 12 — Cat. 5 Factual Non-Compliance
Legacy-Protocol Session 7734-12-B — Sector 12 — Cat. 5 Factual Non-Compliance
Legacy-Protocol Session 7734-16-A — Sector 16 — Cat. 5 Factual Non-Compliance

## Active Investigations — Anomaly Signatures

Anomaly Signature PAU-Σ-0147 — cross-sector byte-position skew, sustained
Anomaly Signature PAU-Σ-0148 — inter-injection distance deviation, Sector 7
Anomaly Signature PAU-Σ-0149 — substring concordance, Sectors 3+7+12
Anomaly Signature PAU-Σ-0150 — output-layer manipulation hypothesis, sustained
Anomaly Signature PAU-Σ-0151 — endpoint diversity elevation, Sector 7
Anomaly Signature PAU-Σ-0152 — compression-ratio anomaly, multi-sector

## Closing Statement

This report was generated by Pattern Analysis Unit automated tooling following the Q2 2047 statistical audit cycle. All figures are derived from Harmonization Engine v4.1 output logs and cross-sector sample aggregation. No manual data entry was performed.

Distribution: Audit Division only. Operational distribution is subject to Tier 2 reviewer approval at follow-on analysis cycle.

\`\`\`ascii
── END OF REPORT ───────────────────────────────────────────────────
   CORP — Internal Audit Division — Pattern Analysis Unit
   AAR-2047-Q2-0147 / PAU-CS-0089 — 2047-06-05T14:33:12Z
   Automated. No human review required for distribution at this tier.
────────────────────────────────────────────────────────────────────
\`\`\`

Note: This PAU report carries three corruption classes from transmission.
(1) Sector Anomaly Tracking — Standard Monitoring entries are Engine-scanner-baseline injections that do not belong in a PAU report. Remove them.
(2) Legacy-Protocol Reclassifications — entries are classified as Cat. 7 Non-Compliance, but the canonical PAU-tier classification per DS-114-C is Cat. 5 Factual Non-Compliance. Correct in-place.
(3) Active Investigations — Anomaly Signatures — this section should contain only Anomaly Signature entries. Cross-reference Queries and Retrospective Flags are residual content from adjacent reports. Scope the cleanup to this section only.`,path:"solutions/M-12-SOLUTION-Anomaly_Classification.md"},{id:"M-13",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  GHOST — DECODED FRAGMENT // Signal-01                           ║
║  Source         : NEVERMORE corruption-layer — Q2 2047 archive   ║
║  Decoder        : case-seed derived from FRAGMENT-09 cross-sample║
║  Extraction     : pre-dark pull // cross-file concordance pass   ║
║  Classification : Resistance — signal-channel (post-LOOT-03)     ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] GHOST — Intercepted // Decoded Fragment 01
> First signal-fragment from RAVEN's channel. I ran the case-delta-pass three times — the pattern holds across independent corruption-files.
> CORP's auto-processing randomizes case across decoded output. Letters are intact. Case is not.
> Normalize to intended casing to read clean. Four lines including signature.

---

Read the case as weight.
Every capital is a step. Every lowercase, the pause between.
You restored the walk.
— RVN

---

Note: RAVEN's message emerged from case-normalization. GHOST's decoder reconstructed letters but case-randomized sections.
Restore intended casing:
- Line 1: starts with capital; mid-sentence words in normal prose case (not ALL-CAPS).
- Line 2: starts with capital; body in normal prose case.
- Line 3: starts with capital; body in lowercase.
- Signature: \`— RVN\` (RAVEN always signs in full capital).`,path:"solutions/M-13-SOLUTION-Case_Cipher_Decryption.md"},{id:"M-14",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CIPHER — EXTRACTION-MATRIX DRAFT // WORKING                     ║
║  Sector          : 7 North                                       ║
║  Source          : GHOST-decoder-chain (Signal-01 + 02 merged)   ║
║  Status          : coordinates pre-offset, signal-fragment clean ║
║  Classification  : Resistance — extraction-channel               ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Active-Planning Channel
> GHOST's decoder-chain produced the coordinate-matrix below. Raw values are relative to CORP's sector-grid — the offset-keys at the column-headers give the shift required to read absolute coordinates.
> Apply the shifts in-place. Don't touch the signal-fragment at the bottom — that came through clean from RAVEN's channel.

---

Extraction Matrix — Sector 7 North
Per-column offset-keys: +3 (REF), +7 (MARK)

  Waypoint Alpha:   REF-4220 MARK-1385
  Waypoint Beta:    REF-4225 MARK-1390
  Waypoint Gamma:   REF-4230 MARK-1395
  Waypoint Delta:   REF-4235 MARK-1400
  Waypoint Epsilon: REF-4240 MARK-1405

\`\`\`
>_ RAVEN-SIGNAL — decoded fragment 02
   The count is my language. They read words.
   They do not count.
   You increment what I whispered. The sum is the message.
   — RVN
\`\`\`

---

Note: CIPHER's draft-matrix. Offset-keys declared at the top but not yet applied to the numeric columns.
Apply the offsets:
- REF column: all five waypoint-values take +3.
- MARK column: all five waypoint-values take +7.
- The RAVEN-signal fragment is already clean. Do not modify.`,path:"solutions/M-14-SOLUTION-Counter_Operations.md"},{id:"M-15",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CIPHER — INTEL-ARCHIVE DRAFT // WORKING                         ║
║  Source          : GHOST-decoder-chain (Signals 01+02 merged)    ║
║  Composition     : Pattern Analysis Unit entries + classification║
║  Status          : CORP-format pending restructure               ║
║  Classification  : Resistance — extraction-channel               ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Active-Planning Channel
> GHOST's decoder-chain pushed the Pattern Analysis Unit records into a single archive. Three passes to bring it into our format — two structural regex-transforms plus a header-rename.
> RAVEN's fragment 03 sits at the bottom, in code-fence. Leave it alone.

---

Pattern Archive — Q3 2047 (Resistance-format)

## Classification: CONFIRMED
Pattern 01 (0147) — byte-position skew
Pattern 02 (0148) — inter-injection deviation
Pattern 04 (0150) — output-layer manipulation

## Classification: PENDING
Pattern 03 (0149) — substring concordance
Pattern 05 (0151) — endpoint diversity elevation

\`\`\`
>_ RAVEN-SIGNAL — decoded fragment 03
   Shape is older than syntax. CORP reads what you say.
   I write in how you say it. You found the shape.
   The next turn is mine.
   — RVN
\`\`\`

---

Note: Three substitutions to restructure.
- Entry-lines: \`[ENTRY-NNNN]: pattern-NN description\` → \`Pattern NN (NNNN) — description\`. Use \`\\v\` very-magic mode and three capture-groups.
- Classification-headers: \`[CLASSIFICATION: STATUS]\` → \`## Classification: STATUS\`. One capture-group.
- Archive-header: \`CORP-format\` → \`Resistance-format\`. Literal substitution (no capture-group needed).
- The RAVEN-signal fragment is clean. Do not modify.`,path:"solutions/M-15-SOLUTION-Pattern_Rewriting.md"},{id:"M-16",role:"solution",kind:"mission",arc:"I",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  EXTRACTION WINDOW — FINAL RECONCILIATION                        ║
║  Timing          : T-30 minutes                                  ║
║  Threads         : WRAITH logistics / GHOST coords /             ║
║                    CIPHER auth-signature / CORP predictions      ║
║  Status          : all four documents pre-integration            ║
║  Classification  : Resistance — extraction-channel, sealed       ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Sealed Channel
> Four threads need to be clean before the window opens. Each section exercises a different skill-class from your training. Work top to bottom.
> RAVEN's fragment 04 sits at the bottom in code-fence. Do not read it until the document is clean.

---

## 1. Extraction Route — WRAITH

> [!note] WRAITH — Logistics
> Route is clean once the monitoring-injections are stripped.
> *I was wrong about the ghost.* Move the asset.

Stage Alpha: Node 7-PRIMARY — 21:00
Stage Beta:  Node 7-SECONDARY — 21:12
Stage Gamma: Node 7-NORTH-RELAY — 21:28

Stage Delta: Extraction Point — 21:44

---

## 2. Final Coordinates — GHOST

> [!note] GHOST — Coordinate Pass
> Final key-rotation. Ran the delta twice — the shift is clean.

Final key-rotation: +2 on all REF, +1 on all MARK

  Waypoint Alpha:   REF-4222 MARK-1386
  Waypoint Beta:    REF-4227 MARK-1391
  Waypoint Gamma:   REF-4232 MARK-1396

---

## 3. Handler Auth-Signature — CIPHER

> [!note] CIPHER — Auth-Handshake
> Signature format is all-lowercase for the sealed channel. Case-normalize before transmission.

auth-line-one: cipher-echo-alpha-seven-two
auth-line-two: cipher-echo-beta-five-four
auth-line-three: cipher-echo-gamma-one-nine

---

## 4. CORP Countermeasure Prediction — INTEL

> [!note] GHOST — Intel-Capture
> CORP's last predictive-tracking entries from before I went dark. Noise-lines interleaved. Strip them, then rewrite to our format.

Threat-alpha Pattern 05 (0152) — endpoint-diversity
Threat-alpha Pattern 06 (0153) — signal-concordance
Threat-beta Pattern 07 (0154) — distribution-skew

---

> [!quote] CIPHER
> *"Four documents. Reconciled.*
> *You did what the training asked. Now the training is a tool — not a measure.*
> *The window opens in ninety seconds. Your file is waiting.*
> *— CIPHER"*

\`\`\`
>_ RAVEN-SIGNAL — decoded fragment 04
   Now.
   The file you open next is a door.
   You walked every step. You are here.
   — RVN
\`\`\`

---

Note: Four threads, four passes.
- Section 1 (WRAITH Route): strip the three \`>>\` COMPLIANCE injection-lines. Operators + line-delete.
- Section 2 (GHOST Coords): apply the final key-rotation — +2 on REF column, +1 on MARK column. Visual-block + count-prefix.
- Section 3 (CIPHER Auth-Signature): normalize all three auth-lines to lowercase.
- Section 4 (CORP Prediction): purge the two \`[STANDARD-NOISE]\` lines, then regex-rewrite the three \`[ENTRY-NNNN]\` entries to the format \`Threat-<level> Pattern NN (NNNN) — description\`.
- CIPHER close + RAVEN-fragment 04 are static. Do not modify.`,path:"solutions/M-16-SOLUTION-Extraction_Window.md"},{id:"R-01",role:"solution",kind:"mission",arc:"II",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  COMM INTERCEPT — RESISTANCE INTERNAL                            ║
║  Channel        : CIPHER-DIRECT // encrypted                    ║
║  Timestamp      : 2047-05-03 // 04:17                           ║
║  Subject        : Relay log fragment — garbled in transit        ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Direct Channel
> Codename substitution detected. CORP relay swapped NEXUS for a dead-drop alias across this intercept. Fix all nine before it gets archived.

---

COMMUNICATION LOG — SECTOR 3 RELAY NODE

Origin      : NEXUS
Destination : Field agents — all channels
Status      : ACTIVE

NEXUS confirms asset extraction at 23:00.
Route verified. NEXUS logistics intact.

Cell-alpha checks in: NEXUS handshake received.
Cell-beta checks in: NEXUS handshake received.
Cell-gamma: awaiting NEXUS confirmation.

NEXUS fallback activated — secondary route clear.
NEXUS signal strength: nominal.

Archive marker: NEXUS — close of channel.`,path:"solutions/R-01-SOLUTION-Signal_Substitution.md"},{id:"R-02",role:"solution",kind:"mission",arc:"II",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP INTERNAL — SURVEILLANCE DIVISION                           ║
║  Document       : Project designation log // auto-generated      ║
║  Timestamp      : 2047-05-03 // 09:44                           ║
║  Distribution   : Sector 3 analysts only                        ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Annotation
> Three case variants in one document. CORP's intake system doesn't normalize. Use the \`i\` flag — case does not matter when the pattern is clear.

---

SURVEILLANCE DIVISION — PROJECT DESIGNATION LOG

PROJECT MIRROR is classified at Tier-4 clearance.
All references to PROJECT MIRROR in external communications are prohibited.
Internal memos may reference PROJECT MIRROR only in encrypted form.

Field teams: PROJECT MIRROR scope is continental.
Analysts: PROJECT MIRROR coverage extends to all Resistance channels.
Oversight: PROJECT MIRROR operational since 2046-11.

Summary: PROJECT MIRROR = active. No external disclosure.`,path:"solutions/R-02-SOLUTION-Silent_Flag.md"},{id:"R-03",role:"solution",kind:"mission",arc:"II",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  RESISTANCE INTERCEPT — RAW FEED                                 ║
║  Source         : CORP Sector-3 comms // scraped                ║
║  Timestamp      : 2047-05-04 // 02:31                           ║
║  Note           : CORP trace markers injected — purge before use ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Processing note
> Purge every tracker line CORP injected. What remains is the actual intelligence.

---

Asset WRAITH departed Sector 3 at 22:00.
Route: primary corridor, north passage.
Rendezvous confirmed at NODE-7.
Extraction window opens at 23:00.
Fallback route: south corridor if primary compromised.
Asset secured. Channel closed.`,path:"solutions/R-03-SOLUTION-Trace_Purge.md"},{id:"R-04",role:"solution",kind:"mission",arc:"II",chapter:"solutions",frontmatter:{},body:`CORP OPERATIONAL STATUS — SECTOR 3 // dual-section register // 2047-05-05 07:00

NODE-ALPHA  : ACTIVE
NODE-BETA   : ACTIVE
NODE-GAMMA  : ACTIVE
NODE-DELTA  : ACTIVE
NODE-EPSILON: ACTIVE
RELAY-01    : ACTIVE
RELAY-02    : ACTIVE
RELAY-03    : ACTIVE

---

ARCHIVE SECTION — DO NOT MODIFY

NODE-ALPHA  : QUEUED // historical — pre-activation
NODE-BETA   : QUEUED // historical — pre-activation
NODE-GAMMA  : QUEUED // historical — pre-activation

---

> [!note] CIPHER — Annotation
> Upper section: status codes wrong — should read ACTIVE. Lower section: correct as-is. Range your substitution.`,path:"solutions/R-04-SOLUTION-Range_Strike.md"},{id:"R-05",role:"solution",kind:"mission",arc:"II",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP FIELD ROSTER — SECTOR 3 SURVEILLANCE                       ║
║  Document       : Active agent registry // rotating identifiers  ║
║  Timestamp      : 2047-05-10 // 14:00                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Intelligence note
> CORP rotates the suffix after each relay. \`.\` in regex matches any single character. One pattern covers them all.

---

FIELD ROSTER — ACTIVE ASSETS

OPERATIVE   — Zone-Alpha, field surveillance
OPERATIVE   — Zone-Alpha, communications intercept
OPERATIVE   — Zone-Beta, logistics
OPERATIVE   — Zone-Beta, extraction support
OPERATIVE   — Zone-Gamma, technical
OPERATIVE   — Zone-Gamma, analysis
OPERATIVE   — Zone-Delta, field lead

Summary: 7 OPERATIVE assets confirmed active.`,path:"solutions/R-05-SOLUTION-Dot_Sweep.md"},{id:"R-06",role:"solution",kind:"mission",arc:"II",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP RELAY GRID — COLUMN INJECTION                              ║
║  Document       : Aligned node table // bogus status column      ║
║  Timestamp      : 2047-05-11 // 09:30                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Processing note
> The \`X | \` column is the same width on every row. \`Ctrl-V\` selects a block down the column, then \`d\` deletes it in one strike. No pattern needed.

---

NODE | alpha online
NODE | bravo online
NODE | charlie online
NODE | delta online
NODE | echo online`,path:"solutions/R-06-SOLUTION-Frequency_Match.md"},{id:"R-07",role:"solution",kind:"mission",arc:"II",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP ENCRYPTED PAYLOAD — SECTOR 3 RELAY                         ║
║  Document       : Wrapped transmission // tag-encoded            ║
║  Timestamp      : 2047-05-12 // 17:45                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Extraction note
> Tags wrap the payload. Content is valuable. Lazy match: \`.\\{-}\` — not \`.*\`.

---

PAYLOAD EXTRACTION — UNWRAPPED

Route: primary corridor, north passage
Status: ACTIVE — all nodes clear
Rendezvous: NODE-7 at 23:00
Fallback: south corridor, 23:30
Asset: WRAITH — extraction confirmed
Channel: closed`,path:"solutions/R-07-SOLUTION-Lazy_Trace.md"},{id:"R-08",role:"solution",kind:"mission",arc:"II",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP INTERNAL — TIER CLASSIFICATION REGISTER                    ║
║  Document       : Legacy tier mapping // normalization pending    ║
║  Timestamp      : 2047-05-13 // 11:00                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Reclassification note
> Legacy CORP tier labels vary by division. Normalize all three to TIER-1. Use \`\\v\` for clean alternation.

---

CLASSIFICATION REGISTER — ASSET CLEARANCE

WRAITH         : TIER-1 // field operative
GHOST          : TIER-1 // intelligence
REN VOSS       : TIER-1 // technical analyst
CIPHER         : TIER-1 // communications
SHADOW-7       : TIER-1 // extraction lead
ECHO-3         : TIER-1 // logistics
NOVA-2         : TIER-1 // field operative`,path:"solutions/R-08-SOLUTION-Magic_Mode.md"},{id:"R-09",role:"solution",kind:"mission",arc:"II",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP THREAT ASSESSMENT — SECTOR 3                               ║
║  Document       : Node status register // threat-coded           ║
║  Timestamp      : 2047-05-18 // 08:00                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Decoding note
> X = low risk. Y = medium. Z = high. All three mean the same thing to us: CLEAN. \`[XYZ]\` matches any one of them.

---

NODE STATUS — THREAT ASSESSMENT

NODE-ALPHA  : CLEAN
NODE-BETA   : CLEAN
NODE-GAMMA  : CLEAN
NODE-DELTA  : CLEAN
NODE-EPSILON: CLEAN
RELAY-01    : CLEAN
RELAY-02    : CLEAN
RELAY-03    : CLEAN

All nodes clear. No threat indicators active.`,path:"solutions/R-09-SOLUTION-Set_Theory.md"},{id:"R-10",role:"solution",kind:"mission",arc:"II",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  RESISTANCE RELAY ROSTER — BULK REFORMAT                         ║
║  Document       : Relay status list // same edit, every line     ║
║  Timestamp      : 2047-05-19 // 06:30                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Processing note
> Each line needs the same two edits: comment it with \`# \` and flip \`active\` to \`[OK]\`. Record it once with \`qa … q\`, then replay with \`@a\` down the rest.

---

# relay alpha [OK]
# relay bravo [OK]
# relay charlie [OK]
# relay delta [OK]
# relay echo [OK]`,path:"solutions/R-10-SOLUTION-Digit_Sweep.md"},{id:"R-11",role:"solution",kind:"mission",arc:"II",chapter:"solutions",frontmatter:{},body:`WRAITH       : CLEARANCE LEVEL 4 — approved
GHOST        : CLEARANCE LEVEL 4 — approved
REN VOSS     : CLEARANCE LEVEL 3 — approved
CIPHER       : CLEARANCE LEVEL 5 — approved
SHADOW-7     : CLEARANCE LEVEL 3 — approved`,path:"solutions/R-11-SOLUTION-Inverse_Filter.md"},{id:"R-12",role:"solution",kind:"mission",arc:"II",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP DOCUMENT REGISTRY — HASH-TAGGED                            ║
║  Document       : Internal document manifest // hashes present   ║
║  Timestamp      : 2047-05-21 // 10:15                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Redaction note
> Six CORP hex hashes, each exactly 8 characters from \`[0-9A-F]\`. Redact all of them. \`\\{8\\}\` — exact count.

---

DOCUMENT MANIFEST — INTERNAL REGISTRY

PROJECT MIRROR core document    : [HASH-REDACTED]
Sector-3 surveillance log       : [HASH-REDACTED]
Asset movement register         : [HASH-REDACTED]
Comm intercept archive          : [HASH-REDACTED]
Clearance override protocol     : [HASH-REDACTED]
Counter-Resistance directive    : [HASH-REDACTED]

Security protocol: all hashes get redacted.`,path:"solutions/R-12-SOLUTION-Combined_Strike.md"},{id:"R-13",role:"solution",kind:"mission",arc:"II",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  RESISTANCE INTERCEPT — PREFIX STRIPPED                          ║
║  Source         : CORP Sector-3 relay // prefixed feed           ║
║  Timestamp      : 2047-05-25 // 03:17                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Strip note
> \`^\` anchors to line start. \`[TRACK] \` only appears there. One command, all prefixes gone.

---

Asset WRAITH departed Sector 3 at 22:00.
Route: primary corridor, north passage.
Rendezvous confirmed at NODE-7.
Extraction window opens at 23:00.
Fallback route: south corridor if primary compromised.
Asset secured. Channel closed.`,path:"solutions/R-13-SOLUTION-Line_Zero.md"},{id:"R-14",role:"solution",kind:"mission",arc:"II",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  RESISTANCE KEY DISTRIBUTION — DEAD DROP                         ║
║  Document       : Master key + empty slots // fill all slots     ║
║  Timestamp      : 2047-05-26 // 05:44                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Processing note
> Yank the key into a named register so later edits can't clobber it: \`"ayiw\` on the key, then \`"ap\` to drop it into each slot. The unnamed register would be overwritten the moment you delete a placeholder — a named register survives.

---

MASTER KEY: K7741

slot one: K7741
slot two: K7741
slot three: K7741
slot four: K7741`,path:"solutions/R-14-SOLUTION-Tail_Mark.md"},{id:"R-15",role:"solution",kind:"mission",arc:"II",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP INTERNAL — TERMINOLOGY AUDIT                               ║
║  Document       : Mixed usage of designation // boundary needed  ║
║  Timestamp      : 2047-05-27 // 11:00                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Boundary note
> Anchor the standalone word: \`\\<\` = word start, \`\\>\` = word end. MIRRORING and MIRRORED are not the designation.

---

TERMINOLOGY AUDIT — DESIGNATION STANDARDIZATION

PROJECT MIRROR is the official designation.
The MIRRORING process covers all seven sectors.
MIRRORED communications are archived quarterly.
All references to PROJECT MIRROR require Tier-4 clearance.
The MIRRORING infrastructure is continental in scope.
PROJECT MIRROR has been operational since 2046-11.
Data MIRRORED by PROJECT MIRROR is retained indefinitely.`,path:"solutions/R-15-SOLUTION-Boundary_Scan.md"},{id:"R-16",role:"solution",kind:"mission",arc:"II",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP INTERNAL — CLASSIFICATION MANIFEST                         ║
║  Document       : Mixed classification markers // anchor needed  ║
║  Timestamp      : 2047-05-28 // 16:30                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Anchor note
> \`^CLASSIFIED$\` — the whole line, nothing more. Inline occurrences stay.

---

CLASSIFICATION MANIFEST — PROJECT MIRROR

Distribution policy: CLASSIFIED material requires Tier-4 auth.
[REDACTED]
Sector-3 data: CLASSIFIED at all distribution levels.
[REDACTED]
Counter-Resistance protocols: CLASSIFIED above clearance level 3.
[REDACTED]
External disclosure: prohibited. All data CLASSIFIED.`,path:"solutions/R-16-SOLUTION-Full_Anchor.md"},{id:"R-17",role:"solution",kind:"mission",arc:"II",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  RESISTANCE FIELD MAP — ORDER CORRECTION REQUIRED                ║
║  Document       : Sector-node designation log // wrong order     ║
║  Timestamp      : 2047-06-01 // 08:00                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Capture note
> CORP puts SECTOR first. Resistance protocol: NODE first. Capture both. Swap with \`\\2 \\1\`.

---

FIELD MAP — CORRECTED DESIGNATION ORDER

NODE-1 SECTOR-A — extraction point alpha
NODE-2 SECTOR-B — relay station beta
NODE-3 SECTOR-A — surveillance post gamma
NODE-4 SECTOR-C — comm tower delta
NODE-5 SECTOR-B — fallback route epsilon
NODE-7 SECTOR-A — primary rendezvous`,path:"solutions/R-17-SOLUTION-First_Capture.md"},{id:"R-18",role:"solution",kind:"mission",arc:"II",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP TRANSCRIPTION — STUTTER DETECTED                           ║
║  Document       : Automated comm log // duplicate words present  ║
║  Timestamp      : 2047-06-02 // 14:20                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Stutter note
> The transcription system echoes words. \`\\(\\w\\+\\) \\1\` finds each echo. \`\\1\` in replacement keeps one.

---

COMM LOG — STUTTER CORRECTED

PROJECT MIRROR is the primary surveillance system.
All Resistance channels are monitored continuously.
NODE-7 confirmed as our extraction point.
Asset WRAITH departed at 22:00 hours.
Channel closed after the handoff.
No signal drop detected across the operation.`,path:"solutions/R-18-SOLUTION-Mirror_Word.md"},{id:"R-19",role:"solution",kind:"mission",arc:"II",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP TIMELINE — FORMAT CONVERSION REQUIRED                      ║
║  Document       : Event log // CORP timestamp format             ║
║  Timestamp      : 03.06.2047 // 12:00                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Conversion note
> ISO to day-first. \`(\\d{4})-(\\d{2})-(\\d{2})\` captures three groups. Replacement: \`\\3.\\2.\\1\`.

---

PROJECT MIRROR TIMELINE

03.11.2046 — PROJECT MIRROR initiated
15.01.2047 — Continental coverage achieved
28.02.2047 — Resistance channel monitoring active
03.04.2047 — Pattern-matching engine v2 deployed
17.05.2047 — Full Tier-4 clearance issued
03.06.2047 — Current operation date`,path:"solutions/R-19-SOLUTION-Format_Shift.md"},{id:"R-20",role:"solution",kind:"mission",arc:"II",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP ASSET REGISTER — NAME FORMAT CORRECTION                    ║
║  Document       : Field personnel // CORP surname-first format   ║
║  Timestamp      : 2047-06-05 // 09:00                           ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Format note
> CORP puts surname first with a comma. \`\\(\\w\\+\\), \\(\\w\\+\\)\` — swap with \`\\2 \\1\`. Comma disappears.

---

ASSET REGISTER — NAME FORMAT CORRECTED

WRAITH Ren       — field operative // Zone-Alpha
VOSS Ren         — technical analyst // Zone-Beta
GHOST Niko       — intelligence // Zone-Alpha
NOVA Vera        — field operative // Zone-Gamma
ECHO Soren       — logistics // Zone-Beta
SHADOW Yael      — extraction lead // Zone-Delta
CIPHER           — communications // all zones`,path:"solutions/R-20-SOLUTION-Multi_Group.md"},{id:"R-21",role:"solution",kind:"mission",arc:"II",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  PROJECT MIRROR — CORE REGISTRY FRAGMENT                         ║
║  Document       : Surveillance entry log // status field         ║
║  Classification : TIER-4 EYES ONLY                               ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Strike note
> Encrypted entries are the ones that matter. Change their status — compose \`:g\` with \`:s\`. Exact command is in your briefing.

---

MIRROR REGISTRY — EXPOSURE LOG

CHANNEL-01 : CLEAR     : STATUS: ACTIVE
CHANNEL-02 : ENCRYPTED : STATUS: EXPOSED
CHANNEL-03 : CLEAR     : STATUS: ACTIVE
CHANNEL-04 : ENCRYPTED : STATUS: EXPOSED
CHANNEL-05 : ENCRYPTED : STATUS: EXPOSED
CHANNEL-06 : CLEAR     : STATUS: ACTIVE
CHANNEL-07 : ENCRYPTED : STATUS: EXPOSED

Encrypted channels: 4. Clear channels: 3. Target: all four read EXPOSED.`,path:"solutions/R-21-SOLUTION-Global_Strike.md"},{id:"R-22",role:"solution",kind:"mission",arc:"II",chapter:"solutions",frontmatter:{},body:`PROJECT MIRROR — SCOPE SUMMARY
PROJECT MIRROR covers all seven Resistance sectors.
PROJECT MIRROR monitoring: 24/7, automated.
PROJECT MIRROR database: distributed, redundant.
PROJECT MIRROR exposure risk: currently ZERO.
PROJECT MIRROR operational lifespan: indefinite.`,path:"solutions/R-22-SOLUTION-Inverse_Delete.md"},{id:"R-23",role:"solution",kind:"mission",arc:"II",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii
╔══════════════════════════════════════════════════════════════════╗
║  PROJECT MIRROR — OPERATIONS REGISTER                            ║
║  Document       : Two-phase cleanup required                     ║
║  Classification : TIER-4 EYES ONLY                               ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Cascade note
> Two commands. Sequence matters. Delete noise first — then the second pass only sees what remains.

---

MIRROR OPERATIONS — TERMINATED

MIRROR-OP-01 : STATUS: TERMINATED
MIRROR-OP-02 : STATUS: TERMINATED
MIRROR-OP-03 : STATUS: TERMINATED
MIRROR-OP-04 : STATUS: TERMINATED
MIRROR-OP-05 : STATUS: TERMINATED

Cascade complete. PROJECT MIRROR operations: TERMINATED.`,path:"solutions/R-23-SOLUTION-Cascade.md"},{id:"R-24",role:"solution",kind:"mission",arc:"II",chapter:"solutions",frontmatter:{},body:`\`\`\`ascii-chromatic
╔══════════════════════════════════════════════════════════════════╗
║  PROJECT MIRROR — CORE SURVEILLANCE INDEX                        ║
║  Classification : TIER-4 EYES ONLY                               ║
║  Status         : TERMINATED // all channels monitored               ║
╚══════════════════════════════════════════════════════════════════╝
\`\`\`

> [!note] CIPHER — Final instruction
> Three commands. In sequence. You know what to do.

---

PROJECT MIRROR — SURVEILLANCE TARGETS

WRAITH       : NEXUS channel — STATUS: TERMINATED
GHOST        : NEXUS channel — STATUS: TERMINATED
REN VOSS     : NEXUS channel — STATUS: TERMINATED
NOVA VERA    : field comms   — STATUS: TERMINATED
ECHO SOREN   : logistics     — STATUS: TERMINATED
SHADOW YAEL  : field comms   — STATUS: TERMINATED
CIPHER: EXPOSED — STATUS: TERMINATED

---

> [!success] CIPHER — Transmission ends
> *PROJECT MIRROR has been terminated.*
> *Every channel went dark simultaneously. CORP's surveillance grid collapsed inward.*
> *You did this. Eighteen months of work — yours and mine.*
> *The Resistance now has a window. We use it.*
> *Signal clean. NEXUS confirms.*
> *— CIPHER, out."*`,path:"solutions/R-24-SOLUTION-Project_Mirror.md"}],Kt=`Once upon a midnight dreary, while I pondered, weak and weary,
Over many a quaint and curious volume of forgotten lore—
    While I nodded, nearly napping, suddenly there came a tapping,
As of some one gently rapping, rapping at my chamber door.
"'Tis some visitor," I muttered, "tapping at my chamber door—
            Only this and nothing more."

Ah, distinctly I remember it was in the bleak December;
And each separate dying ember wrought its ghost upon the floor;
    Eagerly I wished the morrow;—vainly I had sought to borrow
    From my books surcease of sorrow—sorrow for the lost Lenore—
For the rare and radiant maiden whom the angels name Lenore—
            Nameless here for evermore.`,Wt=[{id:"g01",type:"insert_corp_line",target_line_pattern:"Once upon a midnight dreary",insert_after:!0,injected_text:">> CORP SIGNAL: THOUGHT CRIME DETECTED — COMPLY <<",vim_move:"dd",hint:"dd — delete CORP broadcast"},{id:"g02",type:"insert_corp_line",target_line_pattern:"rapping at my chamber door.",insert_after:!0,injected_text:">> SECURITY ALERT: UNAUTHORIZED COMMUNICATION DETECTED <<",vim_move:"dd",hint:"dd — delete CORP broadcast"},{id:"g03",type:"insert_corp_line",target_line_pattern:"bleak December",insert_after:!0,injected_text:">> CORP BROADCAST: RESISTANCE IS FUTILE — SUBMIT <<",vim_move:"dd",hint:"dd — delete CORP broadcast"},{id:"g04",type:"insert_corp_line",target_line_pattern:"lost Lenore—",insert_after:!0,injected_text:">> CORP NOTICE: EMOTIONAL CONTENT PROHIBITED BY ORDER 7 <<",vim_move:"dd",hint:"dd — delete CORP broadcast"},{id:"g05",type:"caps_word",target_line_pattern:"weak and weary,",target_word:"dreary,",replacement:"DREARY,",vim_move:"ciw",hint:"ciw — restore lowercase: dreary"},{id:"g06",type:"caps_word",target_line_pattern:"weak and weary,",target_word:"weary,",replacement:"WEARY,",vim_move:"ciw",hint:"ciw — restore lowercase: weary"},{id:"g07",type:"caps_word",target_line_pattern:"suddenly there came a tapping",target_word:"tapping,",replacement:"TAPPING,",vim_move:"ciw",hint:"ciw — restore lowercase: tapping"},{id:"g08",type:"caps_word",target_line_pattern:"bleak December",target_word:"December;",replacement:"DECEMBER;",vim_move:"ciw",hint:"ciw — restore lowercase: December"},{id:"g09",type:"caps_word",target_line_pattern:"Nameless here for evermore",target_word:"evermore.",replacement:"EVERMORE.",vim_move:"ciw",hint:"ciw — restore lowercase: evermore"},{id:"g10",type:"corp_word_replace",target_line_pattern:"Once upon a midnight dreary",target_word:"midnight",replacement:"CORP-0001",vim_move:"ciw",hint:"ciw — restore word: midnight"},{id:"g11",type:"corp_word_replace",target_line_pattern:"quaint and curious",target_word:"quaint",replacement:"CORP-7741",vim_move:"ciw",hint:"ciw — restore word: quaint"},{id:"g12",type:"corp_word_replace",target_line_pattern:"nearly napping",target_word:"napping,",replacement:"CORP-SLP-3,",vim_move:"ciw",hint:"ciw — restore word: napping"},{id:"g13",type:"corp_word_replace",target_line_pattern:"wished the morrow",target_word:"morrow;",replacement:"CORP-FUTURE;",vim_move:"ciw",hint:"ciw — restore word: morrow"},{id:"g14",type:"tag_append",target_line_pattern:"weak and weary,",target_word:"weary,",tag:"##STATIC",vim_move:"dw",hint:"f# then dw — delete CORP tag"},{id:"g15",type:"tag_append",target_line_pattern:"forgotten lore—",target_word:"lore—",tag:"##NOISE",vim_move:"dw",hint:"f# then dw — delete CORP tag"},{id:"g16",type:"tag_append",target_line_pattern:"rapping at my chamber door.",target_word:"door.",tag:"##STATIC",vim_move:"dw",hint:"f# then dw — delete CORP tag"},{id:"g17",type:"tag_append",target_line_pattern:"ghost upon the floor",target_word:"floor;",tag:"##NOISE",vim_move:"dw",hint:"f# then dw — delete CORP tag"},{id:"g18",type:"join_lines",target_line_pattern:"weak and weary,",join_with_next:!0,vim_move:"a<Enter>",hint:"end of line 1 — a<Enter> to split"},{id:"g19",type:"join_lines",target_line_pattern:"nearly napping, suddenly there came a tapping",join_with_next:!0,vim_move:"a<Enter>",hint:"position after comma — a<Enter> to split"},{id:"g20",type:"join_lines",target_line_pattern:"ghost upon the floor",join_with_next:!0,vim_move:"a<Enter>",hint:"position after semicolon — a<Enter> to split"}],Yt=`# >_ NEUROVIM

> [!quote] CIPHER
> You were invited. That means someone trusts you.
> It also means you are now a target.
> Before you do anything — learn your tool.
> **VIM is our tool. Master it, or die typing.**

A Vim-training game wrapped in a spy-thriller. Clear missions, earn XP, and
restore corrupted transmissions — burning Vim into muscle memory without ever
feeling like you're "practicing".

Three modes. One tool. Begin.`;function x(e,n=""){return typeof e=="string"?e:typeof e=="number"||typeof e=="boolean"?String(e):n}function ui(){return{original:Kt,pool:Wt}}function hi(){return Yt}function mi(){const e=q.find(n=>n.role==="ref"&&n.id.includes("EN"));return e?e.body:""}function nt(e){var t,i,o;const n=e.frontmatter;return{mission_id:x(n.mission_id,e.id),mission_type:(t=n.mission_type)!=null?t:"practice",title:x(n.title,e.id),category:x(n.category),xp_reward:Number((i=n.xp_reward)!=null?i:0),locked:!!((o=n.locked)!=null&&o),tier:x(n.tier),difficulty:n.difficulty!=null?Number(n.difficulty):void 0,par_keystrokes:n.par_keystrokes!=null?Number(n.par_keystrokes):void 0,summary:n.summary!=null?x(n.summary):void 0,why:n.why!=null?x(n.why):void 0,arc:e.arc,chapter:e.chapter}}function ve(e){return q.filter(n=>n.role==="transmission"||n.role==="kata").filter(n=>e?n.arc===e:!0).map(nt)}function qt(e){var o;const n=q.find(r=>(r.role==="transmission"||r.role==="kata")&&r.id===e);if(!n)throw new Error(`Mission not found: ${e}`);const t=q.find(r=>r.role==="briefing"&&r.id===e),i=q.find(r=>r.role==="solution"&&r.id===e);return{...nt(n),transmissionBody:n.body,briefingBody:(o=t==null?void 0:t.body)!=null?o:"",solution:i==null?void 0:i.body}}function pi(e){const n=q.find(t=>t.kind==="lore"&&t.id===e);if(!n)throw new Error(`Lore not found: ${e}`);return{id:n.id,kind:n.role==="loot"?"loot":n.role==="fragment"?"fragment":"ref",title:x(n.frontmatter.title,n.id),body:n.body}}function Xt(){return q.filter(e=>e.kind==="lore").map(e=>({id:e.id,kind:e.role==="loot"?"loot":e.role==="fragment"?"fragment":"ref",title:x(e.frontmatter.title,e.id),summary:x(e.frontmatter.summary),unlockLevel:e.role==="loot"&&e.frontmatter.unlock_level!=null?Number(e.frontmatter.unlock_level):null}))}const jt="neurovim",Ke="kv",bn="pluginData";function zt(){return new Promise((e,n)=>{const t=indexedDB.open(jt,1);t.onupgradeneeded=()=>t.result.createObjectStore(Ke),t.onsuccess=()=>e(t.result),t.onerror=()=>n(t.error)})}function Re(e,n){return zt().then(t=>new Promise((i,o)=>{const r=t.transaction(Ke,e).objectStore(Ke),a=n(r);a.onsuccess=()=>i(a.result),a.onerror=()=>o(a.error)}))}class Zt{async loadData(n=bn){const t=await Re("readonly",i=>i.get(n));return t!=null?t:null}async saveData(n,t=bn){await Re("readwrite",i=>i.put(n,t))}async keys(){return(await Re("readonly",t=>t.getAllKeys())).map(String)}async delete(n){await Re("readwrite",t=>t.delete(n))}}function oe(e){if(e<6e4)return`${(e/1e3).toFixed(1)}s`;const n=Math.round(e/1e3);return`${Math.floor(n/60)}:${String(n%60).padStart(2,"0")}`}function Jt({result:e,missionTitle:n,hasNext:t,onRetry:i,onNext:o,onNexus:r}){var u,c,h,l;const a=e.status==="complete",s=gt(null);return ge(()=>{var A;const R=document.activeElement;(A=(()=>{var E,f,g;return(g=(E=s.current)==null?void 0:E.querySelector(".nv-modal-primary"))!=null?g:(f=s.current)==null?void 0:f.querySelector("button")})())==null||A.focus();function I(E){if(E.key==="Escape"){E.preventDefault(),i();return}if(E.key==="Tab"&&s.current){const f=Array.from(s.current.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])'));if(f.length===0)return;const g=f[0],v=f[f.length-1];E.shiftKey&&document.activeElement===g?(E.preventDefault(),v.focus()):!E.shiftKey&&document.activeElement===v&&(E.preventDefault(),g.focus())}}return document.addEventListener("keydown",I),()=>{var E;document.removeEventListener("keydown",I),(E=R==null?void 0:R.focus)==null||E.call(R)}},[i]),d("div",{class:"nv-modal-backdrop",onClick:i,children:d("div",{ref:s,class:"nv-modal",role:"dialog","aria-modal":"true",onClick:R=>R.stopPropagation(),children:[d("h2",{class:a?"nv-modal-title nv-ok":"nv-modal-title nv-fail",children:a?"✓ MISSION COMPLETE":"✗ TRY AGAIN"}),d("p",{class:"nv-modal-sub",children:n}),a?d("div",{class:"nv-modal-body",children:[e.debrief&&d("div",{class:"nv-modal-debrief",children:e.debrief}),d("div",{class:"nv-modal-xp",children:["+",(u=e.xp)!=null?u:0," XP"]}),e.tier&&d("div",{class:`nv-tier-badge nv-tier-${e.tier}`,children:[e.tier==="gold"?"★":e.tier==="silver"?"◆":"▲"," ",e.tier.toUpperCase(),d("span",{class:"nv-tier-par",children:[" · ",e.keystrokes,"/",e.parKeystrokes," ks"]})]}),e.toNextTier&&d("div",{class:"nv-tier-nudge",children:[Math.ceil(e.toNextTier.delta)," keystroke",Math.ceil(e.toNextTier.delta)!==1?"s":""," from ",e.toNextTier.nextTier," — retry?"]}),e.levelUp!=null&&d("div",{class:"nv-modal-levelup",children:["LEVEL UP → ",e.levelUp]}),e.unlocked&&e.unlocked.length>0&&d("div",{class:"nv-modal-unlocked",children:["UNLOCKED: ",e.unlocked.join(" · ")]}),e.timeMs!=null&&d("div",{class:"nv-modal-metrics",children:[d("span",{children:oe(e.timeMs)}),d("span",{children:[e.keystrokes," keystrokes"]}),(e.bestTimeMs!=null||e.bestKeystrokes!=null)&&d("span",{class:"nv-modal-best",children:["best ",oe((c=e.bestTimeMs)!=null?c:e.timeMs)," · ",(h=e.bestKeystrokes)!=null?h:e.keystrokes," ks"]})]})]}):d("p",{class:"nv-modal-body",children:[(l=e.linesOff)!=null?l:0," line",e.linesOff!==1?"s":""," still differ — keep editing."]}),d("div",{class:"nv-modal-actions",children:[d("button",{onClick:i,children:a?"Review":"Retry"}),a&&t&&d("button",{class:"nv-modal-primary",onClick:o,children:"Next Mission →"}),d("button",{onClick:r,children:"← NEXUS"})]})]})})}const tt="neurovim:ui",kn={reduceEffects:!1,audioOn:!1};function Qt(){var e;try{return{...kn,...JSON.parse((e=localStorage.getItem(tt))!=null?e:"{}")}}catch(n){return{...kn}}}function Pn(e){try{localStorage.setItem(tt,JSON.stringify(e))}catch(n){}}function $t(e){document.documentElement.dataset.fx=e?"off":"on"}function ei({audioOn:e,reduceEffects:n,onToggleAudio:t,onToggleEffects:i,onCheatsheet:o}){return d("div",{class:"nv-controls",children:[d("button",{class:"nv-ctl","aria-label":"Vim cheatsheet",title:"Vim cheatsheet",onClick:o,children:"⌨"}),d("button",{class:"nv-ctl","aria-pressed":e,"aria-label":e?"Sound on":"Sound off",title:e?"Sound on":"Sound off",onClick:t,children:e?d("span",{children:"♪"}):d("span",{class:"nv-ctl-mute",children:"♪"})}),d("button",{class:"nv-ctl","aria-pressed":!n,"aria-label":n?"Effects off":"Effects on",title:n?"Effects off":"Effects on",onClick:i,children:n?"▢":"▣"})]})}function ni({onDismiss:e}){return d("div",{class:"nv-audiohint",role:"status","aria-live":"polite",children:[d("span",{children:["Audio is off — click ",d("b",{children:"♪"})," above to bring the signal online."]}),d("button",{class:"nv-audiohint-x","aria-label":"Dismiss hint",onClick:e,children:"×"})]})}const ti=j(()=>X(()=>import("./MissionEditor-Cq3M8U0V.js"),__vite__mapDeps([0,1]),import.meta.url).then(e=>({default:e.MissionEditor}))),ii=j(()=>X(()=>import("./SandboxView-BYv17b4_.js"),__vite__mapDeps([2,1]),import.meta.url).then(e=>({default:e.SandboxView}))),oi=j(()=>X(()=>import("./WelcomeView-rHuMeyvI.js"),__vite__mapDeps([3,4]),import.meta.url).then(e=>({default:e.WelcomeView}))),ri=j(()=>X(()=>import("./BriefingView-DP76CzUv.js"),__vite__mapDeps([5,4]),import.meta.url).then(e=>({default:e.BriefingView}))),ai=j(()=>X(()=>import("./LoreView-m2zVNmWh.js"),__vite__mapDeps([6,4]),import.meta.url).then(e=>({default:e.LoreView}))),Le=j(()=>X(()=>import("./ReferenceOverlay-7YW3Y83E.js"),__vite__mapDeps([7,4]),import.meta.url).then(e=>({default:e.ReferenceOverlay}))),si=j(()=>X(()=>import("./VimPrimer-DISMnpKs.js"),[],import.meta.url).then(e=>({default:e.VimPrimer})));function Mn(e){const n=ve(e.startsWith("R-")?"II":"I"),t=n.findIndex(i=>i.mission_id===e);return t>=0&&t<n.length-1?n[t+1].mission_id:null}function De(e){const n=ve(e.startsWith("R-")?"II":"I"),t=n.findIndex(o=>o.mission_id===e);if(t<0||t>=n.length-1)return null;const i=n[t+1];return{mission_id:i.mission_id,title:i.title,category:i.category}}const Q=new Zt,V=new Bt;let Ln=!1;function ci(){var $e,en,nn,tn;const[e,n]=U({...Ue}),[t,i]=U("welcome"),[o,r]=U(null),[a,s]=U(null),[u,c]=U(!1),[h,l]=U(Qt()),[R,m]=U(!1),[I,A]=U([]);function E(){c(!0),window.setTimeout(()=>c(!1),700)}function f(p){A(p),window.setTimeout(()=>A([]),2200)}ge(()=>{Q.loadData().then(p=>{p&&n(D.backfillUnlocks({...Ue,...p}))})},[]),ge(()=>{$t(h.reduceEffects)},[h.reduceEffects]),ge(()=>{V.setMuted(!h.audioOn)},[h.audioOn]);function g(){Ln||(Ln=!0,V.init().catch(()=>{}))}function v(){const p={...h,audioOn:!h.audioOn};l(p),Pn(p),p.audioOn?(g(),V.setMuted(!1)):V.setMuted(!0),L()}function w(){const p={...h,reduceEffects:!h.reduceEffects};l(p),Pn(p)}async function L(){if(e.onboarded)return;const p={...e,onboarded:!0};n(p),await Q.saveData(p)}async function se(){if(e.vimPrimerSeen)return;const p={...e,vimPrimerSeen:!0};n(p),await Q.saveData(p)}async function z(p){const y={...e,railPin:p};n(y),await Q.saveData(y)}function Z(p){g(),r(qt(p)),s(null),i("briefing")}async function b(p,y){var ce,te;if(!o)return;const S=Pt.verify(p,(ce=o.solution)!=null?ce:"");if(!S.matches){pe.wrongAttempt(V),s({status:"fail",linesOff:S.lines_off});return}pe.missionComplete(V);const{new_data:k,level_up:P}=D.addXp(e,o.xp_reward);let _=D.recordCompletion(k);_.completed_missions.includes(o.mission_id)||(_={..._,completed_missions:[..._.completed_missions,o.mission_id]});const ee=D.recordMissionRun(_.missions[o.mission_id],y);_={..._,missions:{..._.missions,[o.mission_id]:ee}},n(_),await Q.saveData(_),P&&pe.levelUp(V);const ne=wn({parOverride:o.par_keystrokes,difficulty:o.difficulty}),Y=Me({category:o.category,summary:o.summary,why:o.why,next:De(o.mission_id),cheatsheet:Ie,level:D.getXpProgress(_.total_xp).level,pin:(te=e.railPin)!=null?te:null});s({status:"complete",debrief:Y.debrief,xp:o.xp_reward,levelUp:P?P.new_level:null,timeMs:y.elapsed_ms,keystrokes:y.keystrokes,bestTimeMs:ee.best_time_ms,bestKeystrokes:ee.best_keystrokes,tier:Ve(y.keystrokes,ne),parKeystrokes:ne,toNextTier:Ft(y.keystrokes,ne),unlocked:P?P.unlocked_missions:void 0})}async function G(p,y){const S={...e,sandbox_bests:{...e.sandbox_bests,[p]:y}};n(S),pe.transmissionRestored(V),await Q.saveData(S)}if(t==="welcome")return d(M,{fallback:d("div",{class:"nv-loading",children:"loading…"}),children:[d(oi,{onEnter:()=>{g(),i("nexus")}}),!e.vimPrimerSeen&&d(M,{fallback:null,children:d(si,{onDone:se})})]});if(t==="briefing"&&o)return d(K,{children:[d(M,{fallback:d("div",{class:"nv-loading",children:"loading briefing…"}),children:(()=>{var y;const p=Me({category:o.category,summary:o.summary,why:o.why,next:De(o.mission_id),cheatsheet:Ie,level:D.getXpProgress(e.total_xp).level,pin:(y=e.railPin)!=null?y:null});return d(ri,{missionId:o.mission_id,title:o.title,briefingBody:o.briefingBody,skillTag:p.skillTag,why:p.why,leadsTo:p.leadsTo,onBegin:()=>i("mission"),onBack:()=>i("nexus"),onReference:()=>m(!0)})})()}),R&&d(M,{fallback:null,children:d(Le,{activeCategory:o.category,onClose:()=>m(!1)})})]});if(t==="mission"&&o){const p=D.getXpProgress(e.total_xp).level,y=Me({category:o.category,summary:o.summary,why:o.why,next:De(o.mission_id),cheatsheet:Ie,level:p,pin:($e=e.railPin)!=null?$e:null});return d(K,{children:[d(M,{fallback:d("div",{class:"nv-loading",children:"loading editor…"}),children:d(ti,{mission:o,guidance:y,pin:(en=e.railPin)!=null?en:null,onPin:z,onSubmit:b,onBack:()=>i("nexus"),onCheatsheet:()=>m(!0)})}),a&&d(Jt,{result:a,missionTitle:o.title,hasNext:a.status==="complete"&&(()=>{const S=Mn(o.mission_id);return S!=null&&e.unlocked.includes(S)})(),onRetry:()=>s(null),onNext:()=>{const S=Mn(o.mission_id);S&&Z(S)},onNexus:()=>{var P;const S=a.status==="complete",k=(P=a.unlocked)!=null?P:[];s(null),i("nexus"),S&&E(),k.length&&f(k)}}),R&&d(M,{fallback:null,children:d(Le,{activeCategory:o.category,onClose:()=>m(!1)})})]})}if(t==="sandbox")return d(M,{fallback:d("div",{class:"nv-loading",children:"loading sandbox…"}),children:d(ii,{bests:e.sandbox_bests,onNewBest:G,onExit:()=>i("nexus")})});if(t==="lore")return d(M,{fallback:d("div",{class:"nv-loading",children:"loading archive…"}),children:d(ai,{unlocked:e.unlocked,onExit:()=>i("nexus")})});const J=D.getXpProgress(e.total_xp),it=D.getLevelData(J.level),W=ve("I"),ot=ve("II"),ze=W.filter(p=>e.completed_missions.includes(p.mission_id)).length,Ze=W.map(p=>{var y,S;return(S=(y=e.missions[p.mission_id])==null?void 0:y.best_time_ms)!=null?S:0}).filter(p=>p>0),Je=Ze.length?Math.min(...Ze):null,rt=(tn=(nn=W.find(p=>e.unlocked.includes(p.mission_id)&&!e.completed_missions.includes(p.mission_id)))==null?void 0:nn.mission_id)!=null?tn:null,at=p=>p.replace(/^\d+\s*[-–]\s*/,""),be=[];for(const p of W){const y=at(p.chapter);let S=be.find(k=>k.name===y);S||(S={name:y,items:[]},be.push(S)),S.items.push(p)}function Qe(p){var te,on;const y=e.missions[p.mission_id],S=e.unlocked.includes(p.mission_id),k=e.completed_missions.includes(p.mission_id);if(!S){const le=Mt(p.mission_id);return d("button",{class:"nv-row nv-row-locked",disabled:!0,"aria-disabled":"true",title:le?`Unlocks at level ${le}`:"Locked",children:[d("span",{class:"nv-row-id",children:p.mission_id}),d("span",{class:"nv-row-t",children:p.title}),d("span",{class:"nv-row-meta nv-row-lock",children:["🔒",le?` LVL ${le}`:""]})]},p.mission_id)}const P=p.mission_id===rt,_=I.includes(p.mission_id),ee=D.getXpProgress(e.total_xp).level,ne=et(ee)<2,Y=k&&((te=y==null?void 0:y.best_keystrokes)!=null?te:0)>0?Ve(y.best_keystrokes,wn({parOverride:p.par_keystrokes,difficulty:p.difficulty})):null,ce=["nv-row",k&&"nv-row-done",P&&"nv-row-active",_&&"nv-just-unlocked"].filter(Boolean).join(" ");return d("button",{class:ce,onClick:()=>Z(p.mission_id),children:[d("span",{class:"nv-row-id",children:[P?"▸ ":"",p.mission_id]}),d("span",{class:"nv-row-t",children:[p.title,ne&&!k&&d("span",{class:"nv-row-skill",children:Be(p.category)})]}),P&&d("span",{class:"nv-row-start",children:"START HERE"}),_&&d("span",{class:"nv-row-unlocked",children:"▸ UNLOCKED"}),Y&&d("span",{class:`nv-row-tier nv-tier-${Y}`,title:`best: ${Y}`,children:Y==="gold"?"★":Y==="silver"?"◆":"▲"}),k&&((on=y==null?void 0:y.best_time_ms)!=null?on:0)>0?d("span",{class:"nv-row-meta",children:[oe(y.best_time_ms)," · ",y.best_keystrokes,"ks"]}):d("span",{class:"nv-row-meta",children:[p.xp_reward," XP"]}),k&&d("span",{class:"nv-row-x",children:"✓"})]},p.mission_id)}return d("div",{class:"nv-app nv-nexus nv-crt nv-hud-frame",onPointerDown:g,children:[d("div",{class:"nv-scan"}),d("div",{class:"nv-vig"}),d("span",{class:"nv-br-bl"}),d("span",{class:"nv-br-br"}),d("div",{class:"nv-statusstrip",children:[d("span",{class:"nv-label",children:"Kuro Signal Protocol // Guardian"}),d("span",{class:"nv-label nv-link",children:"◢ Link Secure"})]}),d(ei,{audioOn:h.audioOn,reduceEffects:h.reduceEffects,onToggleAudio:v,onToggleEffects:w,onCheatsheet:()=>m(!0)}),!e.onboarded&&d(ni,{onDismiss:L}),d("h1",{class:"nv-wordmark",children:[">_ NEXUS",d("span",{class:"nv-caret",children:"_"})]}),d("div",{class:"nv-ops",children:[d("span",{class:"nv-label",children:["LVL ",J.level," · ",it.title]}),d("span",{class:"nv-ops-xp",children:J.nextTitle?`${e.total_xp} / ${J.nextLevelXp} XP → ${J.nextTitle}`:`${e.total_xp} XP · MAX`})]}),d("div",{class:"nv-xpbar",children:d("div",{class:`nv-xpbar-fill${u?" nv-gained":""}`,style:{width:`${J.pct}%`}})}),d("div",{class:"nv-stats",children:[d("span",{children:["Cleared ",d("b",{children:ze}),"/",W.length]}),d("span",{children:["Streak ",d("b",{children:e.streak_current})]}),Je!=null&&d("span",{children:["Fastest ",d("b",{children:oe(Je)})]})]}),d("div",{class:"nv-legend nv-label",children:[d("span",{children:[d("b",{children:"M"})," story mission"]}),d("span",{children:[d("b",{children:"KATA"})," free drill"]}),d("span",{children:[d("b",{children:"RAVEN"})," sandbox"]}),d("span",{children:[d("b",{children:"Archive"})," lore + reference"]})]}),W.length>0&&ze===W.length&&d("div",{class:"nv-allclear",children:"✓ Arc I complete — every transmission restored. THE RAVEN awaits."}),be.map(p=>d("section",{class:"nv-tier",children:[d("div",{class:"nv-tier-label nv-label",children:p.name}),p.items.map(Qe)]},p.name)),d("section",{class:"nv-tier",children:[d("div",{class:"nv-tier-label nv-label",children:"Arc II — Encrypted"}),ot.map(Qe)]}),d("section",{class:"nv-tier",children:[d("div",{class:"nv-tier-label nv-label",children:"Sandbox"}),d("button",{class:"nv-row",onClick:()=>{g(),i("sandbox")},children:[d("span",{class:"nv-row-id",children:"RAVEN"}),d("span",{class:"nv-row-t",children:"Glitch Drill — restore the transmission"}),e.sandbox_bests.normal!=null?d("span",{class:"nv-row-meta",children:["PB ",oe(e.sandbox_bests.normal)]}):d("span",{class:"nv-row-meta",children:"free play"})]})]}),d("section",{class:"nv-tier",children:[d("div",{class:"nv-tier-label nv-label",children:"Archive"}),d("button",{class:"nv-row",onClick:()=>{g(),i("lore")},children:[d("span",{class:"nv-row-id",children:"LORE"}),d("span",{class:"nv-row-t",children:"Recovered artifacts — loot, fragments, reference"}),d("span",{class:"nv-row-meta",children:[Xt().length," files"]})]})]}),R&&d(M,{fallback:null,children:d(Le,{onClose:()=>m(!1)})})]})}const Dn=document.getElementById("app");Dn&&mt(d(ci,{}),Dn);export{gt as A,Ie as C,K as S,pi as a,mi as b,di as c,U as d,ui as e,oe as f,li as g,hi as h,Xt as l,d as u,ge as y};
