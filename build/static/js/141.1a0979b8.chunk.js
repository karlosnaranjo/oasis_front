"use strict";(self.webpackChunkoasis_front=self.webpackChunkoasis_front||[]).push([[141],{24568:(e,s,a)=>{a.d(s,{Z:()=>j});var t=a(72791),n=a(61889),o=a(92506),r=a(81724),c=a(87284),d=a(38314),i=a(32325),l=a(96172),u=a(40720),m=a(57689),p=a(82337),x=a(43849),h=a(80184);const b=r.Ry({code:r.Z_().required("Codigo es requerido"),name:r.Z_().required("Nombre fase es requerido"),status:r.Z_().required("Estado es requerido")}),Z=d.Z.masters.phases.base,f={code:!1,name:!1,status:1},j=(0,l.p5)((0,l.Tg)((e=>{let{id:s,doGet:a,genericException:r,appSuccess:l,doPost:j,doPut:g,appInfo:R,setEditable:w,viewMode:C,refresh:N}=e;const E=(0,m.s0)(),[v,A]=(0,t.useState)(f),[P,S]=(0,t.useState)(!0),k=(0,t.useCallback)((async()=>{const e={url:d.Z.masters.phases.initForm,data:s?{id:s}:{}};return await a(e)}),[a,s,N,w]),q=(0,t.useCallback)((async()=>{try{const{phases:e}=await k(),{code:s,name:a,status:t}=e;A({code:s||"",name:a||"",status:(0,x.rp)(t)||"Activo"}),S(!1)}catch(e){console.log("ERROR AL INICIAR"+e),r(e)}}),[r,k]);(0,t.useEffect)((()=>{q()}),[q]);const y=e=>{E("".concat("/app/general/masters/phases","/edit/").concat(e),{replace:!1})};return(0,h.jsx)(h.Fragment,{children:P?(0,h.jsx)(p.Z,{p:10,children:(0,h.jsx)(c.aN,{})}):(0,h.jsx)(o.J9,{enableReinitialize:!0,initialValues:v,validationSchema:b,onSubmit:async e=>{const a=(e=>{const{code:s,name:a,status:t}=e;return{code:s,name:a,status:(0,x.HY)(t)}})(e),t={url:s?"".concat(Z,"/").concat(s):Z,data:a},n=s?g:j;try{const e=await n(t);s?(R(i.Z.crud.update),y(e.response.data.id)):(l(i.Z.crud.new),y(e.response.data.id))}catch(o){console.log("ERROR AL GUARDAR "+o),r(o)}},children:e=>(0,h.jsxs)(o.l0,{children:[(0,h.jsx)(u.Au,{formProps:e}),(0,h.jsxs)(n.ZP,{container:!0,direction:"row",spacing:2,children:[(0,h.jsx)(n.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,h.jsx)(o.gN,{label:"Codigo",name:"code",component:c.dn})}),(0,h.jsx)(n.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,h.jsx)(o.gN,{label:"Nombre fase",name:"name",component:c.dn})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:6,xl:6,children:(0,h.jsx)(o.gN,{label:"Estado",name:"status",component:c.dn,disabled:!0})})]})]})})})})))},6141:(e,s,a)=>{a.r(s),a.d(s,{default:()=>u});var t=a(72791),n=a(87284),o=a(30808),r=a(24568),c=a(80184);const{title:d,createTitle:i}=o.default.masters.phases,l=[{label:"Maestros"},{label:d}];const u=function(){const[e,s]=(0,t.useState)(!1),[a,o]=(0,t.useState)(!1),d=(0,t.useRef)();return(0,c.jsx)(n.cc,{title:i,breadcrumbs:l,children:(0,c.jsx)(r.Z,{refresh:d,setEditable:s,setViewMode:o,viewMode:a})})}},82337:(e,s,a)=>{a.d(s,{Z:()=>r});var t=a(33359),n=a(23814);const o=(0,a(59703).Z)("MuiBox",["root"]),r=(0,n.Z)({defaultClassName:o.root,generateClassName:t.Z.generate})}}]);
//# sourceMappingURL=141.1a0979b8.chunk.js.map