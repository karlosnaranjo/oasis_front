"use strict";(self.webpackChunkoasis_front=self.webpackChunkoasis_front||[]).push([[723],{21498:(e,s,a)=>{a.d(s,{Z:()=>j});var t=a(72791),n=a(61889),r=a(92506),o=a(81724),c=a(87284),d=a(38314),i=a(32325),l=a(96172),u=a(40720),m=a(57689),p=a(82337),x=a(43849),h=a(80184);const b=o.Ry({code:o.Z_().required("Codigo es requerido"),name:o.Z_().required("Nombre fase es requerido"),phase_id:o.Z_().required("Fase es requerido"),status:o.Z_().required("Estado es requerido")}),g=d.Z.masters.targets.base;let Z=[];const f={code:!1,name:!1,phase_id:null,status:1},j=(0,l.p5)((0,l.Tg)((e=>{let{id:s,doGet:a,genericException:o,appSuccess:l,doPost:j,doPut:_,appInfo:R,setEditable:w,viewMode:N,refresh:C}=e;const q=(0,m.s0)(),[v,E]=(0,t.useState)(f),[P,y]=(0,t.useState)(!0),A=(0,t.useCallback)((async()=>{const e={url:d.Z.masters.targets.initForm,data:s?{id:s}:{}};return await a(e)}),[a,s,C,w]),S=(0,t.useCallback)((async()=>{try{const{targets:e,phase:s}=await A();Z=s.map((e=>({value:e.id,label:e.name})));const{code:a,name:t,phase_id:n,status:r}=e;E({code:a||"",name:t||"",phase_id:n||null,status:(0,x.rp)(r)||"Activo"}),y(!1)}catch(e){console.log("ERROR AL INICIAR"+e),o(e)}}),[o,A]);(0,t.useEffect)((()=>{S()}),[S]);const k=e=>{q("".concat("/app/general/masters/targets","/edit/").concat(e),{replace:!1})};return(0,h.jsx)(h.Fragment,{children:P?(0,h.jsx)(p.Z,{p:10,children:(0,h.jsx)(c.aN,{})}):(0,h.jsx)(r.J9,{enableReinitialize:!0,initialValues:v,validationSchema:b,onSubmit:async e=>{const a=(e=>{const{code:s,name:a,phase_id:t,status:n}=e;return{code:s,name:a,phase_id:t,status:(0,x.HY)(n)}})(e),t={url:s?"".concat(g,"/").concat(s):g,data:a},n=s?_:j;try{const e=await n(t);s?(R(i.Z.crud.update),k(e.response.data.id)):(l(i.Z.crud.new),k(e.response.data.id))}catch(r){console.log("ERROR AL GUARDAR "+r),o(r)}},children:e=>(0,h.jsxs)(r.l0,{children:[(0,h.jsx)(u.Au,{formProps:e}),(0,h.jsxs)(n.ZP,{container:!0,direction:"row",spacing:2,children:[(0,h.jsx)(n.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,h.jsx)(r.gN,{label:"Codigo",name:"code",component:c.dn})}),(0,h.jsx)(n.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,h.jsx)(r.gN,{label:"Nombre fase",name:"name",component:c.dn})}),(0,h.jsx)(n.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,h.jsx)(r.gN,{label:"Fase",name:"phase_id",component:c.Ky,items:Z})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:6,xl:6,children:(0,h.jsx)(r.gN,{label:"Estado",name:"status",component:c.dn,disabled:!0})})]})]})})})})))},62723:(e,s,a)=>{a.r(s),a.d(s,{default:()=>u});var t=a(72791),n=a(87284),r=a(30808),o=a(21498),c=a(80184);const{title:d,createTitle:i}=r.default.masters.targets,l=[{label:"Maestros"},{label:d}];const u=function(){const[e,s]=(0,t.useState)(!1),[a,r]=(0,t.useState)(!1),d=(0,t.useRef)();return(0,c.jsx)(n.cc,{title:i,breadcrumbs:l,children:(0,c.jsx)(o.Z,{refresh:d,setEditable:s,setViewMode:r,viewMode:a})})}},82337:(e,s,a)=>{a.d(s,{Z:()=>o});var t=a(33359),n=a(23814);const r=(0,a(59703).Z)("MuiBox",["root"]),o=(0,n.Z)({defaultClassName:r.root,generateClassName:t.Z.generate})}}]);
//# sourceMappingURL=723.80ddcbbd.chunk.js.map