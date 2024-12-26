"use strict";(self.webpackChunkoasis_front=self.webpackChunkoasis_front||[]).push([[455],{40526:(e,t,a)=>{a.d(t,{Z:()=>q});var o=a(72791),s=a(61889),n=a(92506),i=a(81724),r=a(87284),l=a(38314),d=a(32325),c=a(96172),u=a(40720),m=a(57689),p=a(82337),x=a(43849),_=a(92983),Z=a(80184);const h=i.Ry({code:i.Z_().required("Codigo es requerido"),patient_id:i.Z_().required("Paciente es requerido"),employee_id:i.Z_().required("Empleado es requerido"),date_of_evolution:i.Z_().required("Fecha de registro es requerido"),area:i.Z_().required("Area que registra evolucion es requerido"),comments:i.Z_().required("Notas es requerido"),status:i.Z_().required("Estado es requerido")}),j=l.Z.transactions.evolutions.base;let b=[],f=[];const g={code:!1,patient_id:null,employee_id:null,date_of_evolution:!1,area:!1,comments:!1,status:1},v=e=>e.map((e=>({value:e.id,label:e.name}))),q=(0,c.p5)((0,c.Tg)((e=>{let{id:t,doGet:a,genericException:i,appSuccess:c,doPost:q,doPut:y,appInfo:N,setEditable:P,viewMode:R,refresh:w}=e;const E=(0,m.s0)(),[A,C]=(0,o.useState)(g),[S,k]=(0,o.useState)(!0),M=(0,o.useCallback)((async()=>{const e={url:l.Z.transactions.evolutions.initForm,data:t?{id:t}:{}};return await a(e)}),[a,t,w,P]),F=(0,o.useCallback)((async()=>{try{const{evolutions:e,patient:t,employee:a}=await M();b=v(t),f=v(a);const{code:o,patient_id:s,employee_id:n,date_of_evolution:i,area:r,comments:l,status:d}=e;C({code:o||"",patient_id:s||null,employee_id:n||null,date_of_evolution:i||"",area:r||"",comments:l||"",status:(0,x.rp)(d)||"Activo"}),k(!1)}catch(e){console.log("ERROR AL INICIAR"+e),i(e)}}),[i,M]);(0,o.useEffect)((()=>{F()}),[F]);const I=e=>{E("".concat("/app/general/transactions/evolutions","/edit/").concat(e),{replace:!1})};return(0,Z.jsx)(Z.Fragment,{children:S?(0,Z.jsx)(p.Z,{p:10,children:(0,Z.jsx)(r.aN,{})}):(0,Z.jsx)(n.J9,{enableReinitialize:!0,initialValues:A,validationSchema:h,onSubmit:async e=>{const a=(e=>{const{code:t,patient_id:a,employee_id:o,date_of_evolution:s,area:n,comments:i,status:r}=e;return{code:t,patient_id:a,employee_id:o,date_of_evolution:s,area:n,comments:i,status:(0,x.HY)(r)}})(e),o={url:t?"".concat(j,"/").concat(t):j,data:a},s=t?y:q;try{const e=await s(o);t?(N(d.Z.crud.update),I(e.response.data.id)):(c(d.Z.crud.new),I(e.response.data.id))}catch(n){console.log("ERROR AL GUARDAR "+n),i(n)}},children:e=>(0,Z.jsxs)(n.l0,{children:[(0,Z.jsx)(u.Au,{formProps:e}),(0,Z.jsxs)(s.ZP,{container:!0,direction:"row",spacing:2,children:[(0,Z.jsx)(s.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,Z.jsx)(n.gN,{label:"Codigo",name:"code",component:r.dn})}),(0,Z.jsx)(s.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,Z.jsx)(n.gN,{label:"Paciente",name:"patient_id",component:r.Ky,items:b})}),(0,Z.jsx)(s.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,Z.jsx)(n.gN,{label:"Empleado",name:"employee_id",component:r.Ky,items:f})}),(0,Z.jsx)(s.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,Z.jsx)(n.gN,{label:"Fecha de registro",name:"date_of_evolution",component:_.Z})}),(0,Z.jsx)(s.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,Z.jsx)(n.gN,{label:"Area que registra evolucion",name:"area",component:r.dn})}),(0,Z.jsx)(s.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,Z.jsx)(n.gN,{label:"Notas",name:"comments",component:r.OW})}),(0,Z.jsx)(s.ZP,{item:!0,xs:12,md:6,xl:6,children:(0,Z.jsx)(n.gN,{label:"Estado",name:"status",component:r.dn,disabled:!0})})]})]})})})})))},78455:(e,t,a)=>{a.r(t),a.d(t,{default:()=>u});var o=a(72791),s=a(87284),n=a(30808),i=a(40526),r=a(80184);const{title:l,createTitle:d}=n.default.transactions.evolutions,c=[{label:"Maestros"},{label:l}];const u=function(){const[e,t]=(0,o.useState)(!1),[a,n]=(0,o.useState)(!1),l=(0,o.useRef)();return(0,r.jsx)(s.cc,{title:d,breadcrumbs:c,children:(0,r.jsx)(i.Z,{refresh:l,setEditable:t,setViewMode:n,viewMode:a})})}},82337:(e,t,a)=>{a.d(t,{Z:()=>i});var o=a(33359),s=a(23814);const n=(0,a(59703).Z)("MuiBox",["root"]),i=(0,s.Z)({defaultClassName:n.root,generateClassName:o.Z.generate})}}]);
//# sourceMappingURL=455.bfbbe28c.chunk.js.map