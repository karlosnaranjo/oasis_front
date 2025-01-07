"use strict";(self.webpackChunkoasis_front=self.webpackChunkoasis_front||[]).push([[976],{15976:(e,i,a)=>{a.r(i),a.d(i,{default:()=>K});var n=a(72791),t=a(96172),s=a(87284),o=a(30808),r=a(57689),l=a(85698),c=a(61889),d=a(57621),m=a(94967),u=a(78145),p=a(38314),_=a(32325),x=a(5574),h=a(65661),g=a(39157),y=a(92506),b=a(81724),j=a(82337),Z=a(80184);const f=b.Ry({name:b.Z_().required("Nombres y Apellidos es requerido"),relative_id:b.Z_().required("Parentesco es requerido"),age:b.Z_().required("Edad es requerido"),relationship_type:b.Z_().required("Tipo de relacion es requerido")}),v=p.Z.transactions.psychologyRelatives.base;let q=[{label:"Padre",value:"Padre"},{label:"Madre",value:"Madre"},{label:"Hermano/a",value:"Hermano/a"},{label:"Tio/a",value:"Tio/a"},{label:"Primo/a",value:"Primo/a"},{label:"Sobrino/a",value:"Sobrino/a"},{label:"Amigo/a",value:"Amigo/a"}],P=[{label:"Estrecha",value:"Estrecha"},{label:"Cercana",value:"Cercana"},{label:"Distante",value:"Distante"}];const N={name:!1,relative_id:null,age:!1,relationship_type:""},O=(0,t.p5)((0,t.Tg)((e=>{let{id:i,psychology_id:a,doGet:t,genericException:o,appSuccess:r,doPost:l,doPut:d,appInfo:m,setEditable:u,viewMode:b,setOpenModal:O,refreshData:w,refreshTable:R}=e;const[E,S]=(0,n.useState)(N),[C,A]=(0,n.useState)(!0),W=(0,n.useCallback)((async()=>{const e={url:p.Z.transactions.psychologyRelatives.initForm,data:i?{id:i}:{}};return await t(e)}),[t,i,u]),k=(0,n.useCallback)((async()=>{try{const{psychologyRelatives:e}=await W(),{name:i,relative_id:a,age:n,relationship_type:t}=e;S({name:i||"",relative_id:a||null,age:n||"",relationship_type:t||""}),A(!1)}catch(e){console.log("ERROR AL INICIAR"+e),o(e)}}),[o,W]);(0,n.useEffect)((()=>{k()}),[k]);return(0,Z.jsxs)(x.Z,{fullWidth:!0,maxWidth:"xl",open:!0,onClose:()=>O(!1),"aria-labelledby":"max-width-dialog-title",children:[(0,Z.jsx)(h.Z,{id:"max-width-dialog-title",children:"Historia Familiar"}),(0,Z.jsx)(g.Z,{children:C?(0,Z.jsx)(j.Z,{p:10,children:(0,Z.jsx)(s.aN,{})}):(0,Z.jsx)(y.J9,{enableReinitialize:!0,initialValues:E,validationSchema:f,onSubmit:async e=>{const n=i?d:l,t=(e=>{const{name:i,relative_id:n,age:t,relationship_type:s}=e;return{psychology_id:a,name:i,relative_id:n,age:t,relationship_type:s}})(e),s={url:"".concat(v).concat(i?"/".concat(i):""),data:t};try{await n(s);i?m(_.Z.crud.update):r(_.Z.crud.new),R()}catch(c){console.log("ERROR AL GUARDAR "+c),o(c)}finally{O(!1),w.current.refresh()}},children:e=>(0,Z.jsxs)(y.l0,{children:[(0,Z.jsxs)(c.ZP,{container:!0,direction:"row",spacing:2,children:[(0,Z.jsx)(c.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,Z.jsx)(y.gN,{label:"Nombres y Apellidos",name:"name",component:s.dn})}),(0,Z.jsx)(c.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,Z.jsx)(y.gN,{label:"Parentesco",name:"relative_id",component:s.Ky,items:q})}),(0,Z.jsx)(c.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,Z.jsx)(y.gN,{label:"Edad",name:"age",component:s.dn})}),(0,Z.jsx)(c.ZP,{item:!0,xs:12,md:6,xl:6,children:(0,Z.jsx)(y.gN,{label:"Tipo de relacion",name:"relationship_type",component:s.Ky,items:P})})]}),(0,Z.jsx)(c.ZP,{container:!0,direction:"row",style:{paddingTop:30},justify:"flex-end",children:(0,Z.jsxs)(c.ZP,{item:!0,children:[(0,Z.jsx)(s.Dv,{}),(0,Z.jsx)(s.Xd,{onClick:()=>O(!1),label:"Cancelar",style:{marginLeft:15}})]})})]})})})]})})));var w=a(43849);const R="general:transactions:psychology_relatives:create",E="general:transactions:psychology_relatives:delete",S=(0,t.p5)((0,t.Tg)((e=>{let{id:i,doDelete:a,appWarning:t,genericException:r,editable:l}=e;const[c,d]=(0,n.useState)(null),[m,x]=(0,n.useState)(null),h=i,[g,y]=(0,n.useState)(!1),b=(0,n.useRef)(null),j=()=>d(null),f=()=>b.current.refresh(),v=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;y(!0),x(e)},q=e=>{const{id:i}=e;return(0,Z.jsx)(s.Gh,{onEdit:()=>v(i),onDelete:()=>d(i),row:e})},{deleteTitle:P,deleteMessage:N}=o.default.transactions.psychologyRelatives,S=[{name:"name",label:"Nombres y Apellidos"},{name:"relative_name",label:"Parentesco"},{name:"age",label:"Edad"},{name:"relationship_type",label:"Tipo de relacion"},{label:"Estado",filter:!1,component:e=>(0,Z.jsx)(s.Fm,{estado:(0,w.rp)(e.status)})},{name:"acciones",label:"Acciones",filter:!1,component:e=>q(e)}];return(0,Z.jsxs)(Z.Fragment,{children:[Boolean(c)&&(0,Z.jsx)(u.s,{open:!0,title:P,message:N,onClose:j,onAccept:async()=>{const e={url:"".concat(p.Z.transactions.psychologyRelatives.base,"/").concat(c)};try{await a(e),f(),j(),t(_.Z.crud.delete)}catch(i){r(i)}},createPermissions:E}),Boolean(g)&&(0,Z.jsx)(O,{id:m,psychology_id:h,setOpenModal:()=>{y(!1),x(null)},refreshTable:f,editable:l}),(0,Z.jsx)(s.iA,{forwardedRef:b,serverSideUrl:p.Z.transactions.psychologyRelatives.base,serverSideData:{where:"psychology_id=".concat(h)},onCreate:v,columns:S,createPermissions:R})]})})));var C=a(92983);const A=b.Ry({drug_id:b.Z_().required("Sustancia es requerido"),start_age:b.Z_().required("Edad de inicio es requerido"),frecuency_of_consumption:b.Z_().required("Frecuencia de Consumo es requerido"),maximum_abstinence:b.Z_().required("Maxima abstinencia es requerido"),consumption_date:b.Z_().required("Fecha ultimo consumo es requerido")}),W=p.Z.transactions.psychologyDrugs.base;let k=[];const M={drug_id:null,start_age:!1,frecuency_of_consumption:!1,maximum_abstinence:!1,consumption_date:!1},T=(0,t.p5)((0,t.Tg)((e=>{let{id:i,psychology_id:a,doGet:t,genericException:o,appSuccess:r,doPost:l,doPut:d,appInfo:m,setEditable:u,viewMode:b,setOpenModal:f,refreshData:v,refreshTable:q}=e;const[P,N]=(0,n.useState)(M),[O,w]=(0,n.useState)(!0),R=(0,n.useCallback)((async()=>{const e={url:p.Z.transactions.psychologyDrugs.initForm,data:i?{id:i}:{}};return await t(e)}),[t,i,u]),E=(0,n.useCallback)((async()=>{try{const{psychologyDrugs:e,drug:i}=await R();k=i.map((e=>({value:e.id,label:e.name})));const{drug_id:a,start_age:n,frecuency_of_consumption:t,maximum_abstinence:s,consumption_date:o}=e;N({drug_id:a||null,start_age:n||"",frecuency_of_consumption:t||"",maximum_abstinence:s||"",consumption_date:o||""}),w(!1)}catch(e){console.log("ERROR AL INICIAR"+e),o(e)}}),[o,R]);(0,n.useEffect)((()=>{E()}),[E]);return(0,Z.jsxs)(x.Z,{fullWidth:!0,maxWidth:"xl",open:!0,onClose:()=>f(!1),"aria-labelledby":"max-width-dialog-title",children:[(0,Z.jsx)(h.Z,{id:"max-width-dialog-title",children:"Cuadro de consumo"}),(0,Z.jsx)(g.Z,{children:O?(0,Z.jsx)(j.Z,{p:10,children:(0,Z.jsx)(s.aN,{})}):(0,Z.jsx)(y.J9,{enableReinitialize:!0,initialValues:P,validationSchema:A,onSubmit:async e=>{const n=i?d:l,t=(e=>{const{drug_id:i,start_age:n,frecuency_of_consumption:t,maximum_abstinence:s,consumption_date:o}=e;return{psychology_id:a,drug_id:i,start_age:n,frecuency_of_consumption:t,maximum_abstinence:s,consumption_date:o}})(e),s={url:"".concat(W).concat(i?"/".concat(i):""),data:t};try{await n(s);i?m(_.Z.crud.update):r(_.Z.crud.new),q()}catch(c){console.log("ERROR AL GUARDAR "+c),o(c)}finally{f(!1),v.current.refresh()}},children:e=>(0,Z.jsxs)(y.l0,{children:[(0,Z.jsxs)(c.ZP,{container:!0,direction:"row",spacing:2,children:[(0,Z.jsx)(c.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,Z.jsx)(y.gN,{label:"Sustancia",name:"drug_id",component:s.Ky,items:k})}),(0,Z.jsx)(c.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,Z.jsx)(y.gN,{label:"Edad de inicio",name:"start_age",component:s.dn})}),(0,Z.jsx)(c.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,Z.jsx)(y.gN,{label:"Frecuencia de Consumo",name:"frecuency_of_consumption",component:s.dn})}),(0,Z.jsx)(c.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,Z.jsx)(y.gN,{label:"Maxima abstinencia",name:"maximum_abstinence",component:s.dn})}),(0,Z.jsx)(c.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,Z.jsx)(y.gN,{label:"Fecha ultimo consumo",name:"consumption_date",component:C.Z})})]}),(0,Z.jsx)(c.ZP,{container:!0,direction:"row",style:{paddingTop:30},justify:"flex-end",children:(0,Z.jsxs)(c.ZP,{item:!0,children:[(0,Z.jsx)(s.Dv,{}),(0,Z.jsx)(s.Xd,{onClick:()=>f(!1),label:"Cancelar",style:{marginLeft:15}})]})})]})})})]})}))),D="general:transactions:psychology_drugs:create",F="general:transactions:psychology_drugs:delete",I=(0,t.p5)((0,t.Tg)((e=>{let{id:i,doDelete:a,appWarning:t,genericException:r,editable:l}=e;const[c,d]=(0,n.useState)(null),[m,x]=(0,n.useState)(null),h=i,[g,y]=(0,n.useState)(!1),b=(0,n.useRef)(null),j=()=>d(null),f=()=>b.current.refresh(),v=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;y(!0),x(e)},q=e=>{const{id:i}=e;return(0,Z.jsx)(s.Gh,{onEdit:()=>v(i),onDelete:()=>d(i),row:e})},{deleteTitle:P,deleteMessage:N}=o.default.transactions.psychologyDrugs,O=[{name:"drug_name",label:"Sustancia"},{name:"start_age",label:"Edad de inicio"},{name:"frecuency_of_consumption",label:"Frecuencia de Consumo"},{name:"maximum_abstinence",label:"Maxima abstinencia"},{name:"consumption_date",label:"Fecha ultimo consumo"},{label:"Estado",filter:!1,component:e=>(0,Z.jsx)(s.Fm,{estado:(0,w.rp)(e.status)})},{name:"acciones",label:"Acciones",filter:!1,component:e=>q(e)}];return(0,Z.jsxs)(Z.Fragment,{children:[Boolean(c)&&(0,Z.jsx)(u.s,{open:!0,title:P,message:N,onClose:j,onAccept:async()=>{const e={url:"".concat(p.Z.transactions.psychologyDrugs.base,"/").concat(c)};try{await a(e),f(),j(),t(_.Z.crud.delete)}catch(i){r(i)}},createPermissions:F}),Boolean(g)&&(0,Z.jsx)(T,{id:m,psychology_id:h,setOpenModal:()=>{y(!1),x(null)},refreshTable:f,editable:l}),(0,Z.jsx)(s.iA,{forwardedRef:b,serverSideUrl:p.Z.transactions.psychologyDrugs.base,serverSideData:{where:"psychology_id=".concat(h)},onCreate:v,columns:O,createPermissions:D})]})}))),{title:H,updateTitle:L}=o.default.transactions.psychologies,G=[{label:"Maestros"},{label:H}];const K=(0,t.p5)((0,t.Tg)((function(){const{id:e}=(0,r.UO)(),[i,a]=(0,n.useState)(!1),[t,o]=(0,n.useState)(!1),u=(0,n.useRef)(),p=()=>u.current.refresh(),_=[{label:"Historia Familiar",component:(0,Z.jsx)(S,{id:e,refreshParent:p,editable:!i})},{label:"Cuadro de consumo",component:(0,Z.jsx)(I,{id:e,refreshParent:p,editable:!i})}];return(0,Z.jsxs)(s.cc,{title:L,breadcrumbs:G,withOutCard:!0,children:[(0,Z.jsx)(c.ZP,{container:!0,spacing:2,sx:{pb:2,minHeight:250},children:(0,Z.jsx)(c.ZP,{item:!0,xs:12,md:12,children:(0,Z.jsx)(d.Z,{sx:{p:3,minHeight:"100%"},children:(0,Z.jsx)(m.Z,{id:e,refresh:u,setEditable:a,setViewMode:o,viewMode:t})})})}),(0,Z.jsx)(d.Z,{sx:{pl:2,pr:2},children:(0,Z.jsx)(l.Z,{config:_})})]})})))},94967:(e,i,a)=>{a.d(i,{Z:()=>N});var n=a(72791),t=a(61889),s=a(92506),o=a(81724),r=a(87284),l=a(38314),c=a(32325),d=a(96172),m=a(40720),u=a(57689),p=a(82337),_=a(43849),x=a(92983),h=a(80184);const g=o.Ry({code:o.Z_().required("Codigo es requerido"),issue_date:o.Z_().required("Fecha de Elaboracion es requerido"),patient_id:o.Z_().required("Paciente es requerido"),reason_of_visit:o.Z_().required("Motivo de consulta es requerido"),family_history:o.Z_().required("Antecedentes familiares es requerido"),work_history:o.Z_().required("Antecedentes laborales es requerido"),personal_history:o.Z_().required("Historia personal es requerido"),addiction_history:o.Z_().required("Historia de adiccion es requerido"),way_administration:o.Z_().required("Via de administracion es requerido"),other_substances:o.Z_().required("Otras subtancias es requerido"),highest_substance:o.Z_().required("Mayor sustancia es requerido"),current_consumption:o.Z_().required("Consumo actual es requerido"),addictive_behavior:o.Z_().required("Esta realizando la conducta adictiva? es requerido"),previous_treatment:o.Z_().required("Tratamientos anteriores es requerido"),place_treatment:o.Z_().required("Lugares y tiempos de tratamiento es requerido"),mental_illness:o.Z_().required("Historia de enfermedad mental es requerido"),suicidal_thinking:o.Z_().required("Ha tenido pensamientos o intentos de suicidio? es requerido"),homicidal_attempts:o.Z_().required("Ha tenido pensamientos o intentos homicidas? es requerido"),language:o.Z_().required("Lenguaje y pensamiento es requerido"),orientation:o.Z_().required("Orientacion (Persona, espacio y tiempo): es requerido"),memory:o.Z_().required("Memoria es requerido"),mood:o.Z_().required("Estado de animo es requerido"),feeding:o.Z_().required("Alimentacion es requerido"),sleep:o.Z_().required("Sueno es requerido"),medication:o.Z_().required("Esta tomando algun tipo de medicamento? es requerido"),legal_issues:o.Z_().required("Problematicas judiciales y/o comportamentales es requerido"),defense_mechanism:o.Z_().required("Mecanismos de defensa es requerido"),another_difficulty:o.Z_().required("Otras dificultades es requerido"),expectation:o.Z_().required("Que expectativas y motivaciones tiene para el proceso? es requerido"),diagnostic_impression:o.Z_().required("Impresion diagnostica es requerido"),intervention:o.Z_().required("Propuesta de intervencion es requerido"),comments:o.Z_().required("Observaciones es requerido"),employee_id:o.Z_().required("Funcionario es requerido"),status:o.Z_().required("Estado es requerido")}),y=l.Z.transactions.psychologies.base;let b=[],j=[{label:"SI",value:"SI"},{label:"NO",value:"NO"}],Z=[{label:"SI",value:"SI"},{label:"NO",value:"NO"}],f=[{label:"SI",value:"SI"},{label:"NO",value:"NO"}],v=[];const q={code:!1,issue_date:!1,patient_id:null,reason_of_visit:!1,family_history:!1,work_history:!1,personal_history:!1,addiction_history:!1,way_administration:!1,other_substances:!1,highest_substance:!1,current_consumption:"",addictive_behavior:"",previous_treatment:"",place_treatment:!1,mental_illness:!1,suicidal_thinking:!1,homicidal_attempts:!1,language:!1,orientation:!1,memory:!1,mood:!1,feeding:!1,sleep:!1,medication:!1,legal_issues:!1,defense_mechanism:!1,another_difficulty:!1,expectation:!1,diagnostic_impression:!1,intervention:!1,comments:!1,employee_id:null,status:1},P=e=>e.map((e=>({value:e.id,label:e.name}))),N=(0,d.p5)((0,d.Tg)((e=>{let{id:i,doGet:a,genericException:o,appSuccess:d,doPost:N,doPut:O,appInfo:w,setEditable:R,viewMode:E,refresh:S}=e;const C=(0,u.s0)(),[A,W]=(0,n.useState)(q),[k,M]=(0,n.useState)(!0),T=(0,n.useCallback)((async()=>{const e={url:l.Z.transactions.psychologies.initForm,data:i?{id:i}:{}};return await a(e)}),[a,i,S,R]),D=(0,n.useCallback)((async()=>{try{const{psychologies:e,patient:i,employee:a}=await T();b=P(i),v=P(a);const{code:n,issue_date:t,patient_id:s,reason_of_visit:o,family_history:r,work_history:l,personal_history:c,addiction_history:d,way_administration:m,other_substances:u,highest_substance:p,current_consumption:x,addictive_behavior:h,previous_treatment:g,place_treatment:y,mental_illness:j,suicidal_thinking:Z,homicidal_attempts:f,language:q,orientation:N,memory:O,mood:w,feeding:R,sleep:E,medication:S,legal_issues:C,defense_mechanism:A,another_difficulty:k,expectation:D,diagnostic_impression:F,intervention:I,comments:H,employee_id:L,status:G}=e;W({code:n||"",issue_date:t||"",patient_id:s||null,reason_of_visit:o||"",family_history:r||"",work_history:l||"",personal_history:c||"",addiction_history:d||"",way_administration:m||"",other_substances:u||"",highest_substance:p||"",current_consumption:x||"",addictive_behavior:h||"",previous_treatment:g||"",place_treatment:y||"",mental_illness:j||"",suicidal_thinking:Z||"",homicidal_attempts:f||"",language:q||"",orientation:N||"",memory:O||"",mood:w||"",feeding:R||"",sleep:E||"",medication:S||"",legal_issues:C||"",defense_mechanism:A||"",another_difficulty:k||"",expectation:D||"",diagnostic_impression:F||"",intervention:I||"",comments:H||"",employee_id:L||null,status:(0,_.rp)(G)||"Activo"}),M(!1)}catch(e){console.log("ERROR AL INICIAR"+e),o(e)}}),[o,T]);(0,n.useEffect)((()=>{D()}),[D]);const F=e=>{C("".concat("/app/general/transactions/psychologies","/edit/").concat(e),{replace:!1})};return(0,h.jsx)(h.Fragment,{children:k?(0,h.jsx)(p.Z,{p:10,children:(0,h.jsx)(r.aN,{})}):(0,h.jsx)(s.J9,{enableReinitialize:!0,initialValues:A,validationSchema:g,onSubmit:async e=>{const a=(e=>{const{code:i,issue_date:a,patient_id:n,reason_of_visit:t,family_history:s,work_history:o,personal_history:r,addiction_history:l,way_administration:c,other_substances:d,highest_substance:m,current_consumption:u,addictive_behavior:p,previous_treatment:x,place_treatment:h,mental_illness:g,suicidal_thinking:y,homicidal_attempts:b,language:j,orientation:Z,memory:f,mood:v,feeding:q,sleep:P,medication:N,legal_issues:O,defense_mechanism:w,another_difficulty:R,expectation:E,diagnostic_impression:S,intervention:C,comments:A,employee_id:W,status:k}=e;return{code:i,issue_date:a,patient_id:n,reason_of_visit:t,family_history:s,work_history:o,personal_history:r,addiction_history:l,way_administration:c,other_substances:d,highest_substance:m,current_consumption:u,addictive_behavior:p,previous_treatment:x,place_treatment:h,mental_illness:g,suicidal_thinking:y,homicidal_attempts:b,language:j,orientation:Z,memory:f,mood:v,feeding:q,sleep:P,medication:N,legal_issues:O,defense_mechanism:w,another_difficulty:R,expectation:E,diagnostic_impression:S,intervention:C,comments:A,employee_id:W,status:(0,_.HY)(k)}})(e),n={url:i?"".concat(y,"/").concat(i):y,data:a},t=i?O:N;try{const e=await t(n);i?(w(c.Z.crud.update),F(e.response.data.id)):(d(c.Z.crud.new),F(e.response.data.id))}catch(s){console.log("ERROR AL GUARDAR "+s),o(s)}},children:e=>(0,h.jsxs)(s.l0,{children:[(0,h.jsx)(m.Au,{formProps:e}),(0,h.jsxs)(t.ZP,{container:!0,direction:"row",spacing:2,children:[(0,h.jsx)(t.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,h.jsx)(s.gN,{label:"Codigo",name:"code",component:r.dn})}),(0,h.jsx)(t.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,h.jsx)(s.gN,{label:"Fecha de Elaboracion",name:"issue_date",component:x.Z})}),(0,h.jsx)(t.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,h.jsx)(s.gN,{label:"Paciente",name:"patient_id",component:r.Ky,items:b})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Motivo de consulta",name:"reason_of_visit",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Antecedentes familiares",name:"family_history",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Antecedentes laborales",name:"work_history",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Historia personal",name:"personal_history",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Historia de adiccion",name:"addiction_history",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Via de administracion",name:"way_administration",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Otras subtancias",name:"other_substances",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Mayor sustancia",name:"highest_substance",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:6,xl:6,children:(0,h.jsx)(s.gN,{label:"Consumo actual",name:"current_consumption",component:r.Ky,items:j})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:6,xl:6,children:(0,h.jsx)(s.gN,{label:"Esta realizando la conducta adictiva?",name:"addictive_behavior",component:r.Ky,items:Z})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:6,xl:6,children:(0,h.jsx)(s.gN,{label:"Tratamientos anteriores",name:"previous_treatment",component:r.Ky,items:f})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Lugares y tiempos de tratamiento",name:"place_treatment",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Historia de enfermedad mental",name:"mental_illness",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Ha tenido pensamientos o intentos de suicidio?",name:"suicidal_thinking",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Ha tenido pensamientos o intentos homicidas?",name:"homicidal_attempts",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Lenguaje y pensamiento",name:"language",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Orientacion (Persona, espacio y tiempo):",name:"orientation",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Memoria",name:"memory",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Estado de animo",name:"mood",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Alimentacion",name:"feeding",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Sueno",name:"sleep",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Esta tomando algun tipo de medicamento?",name:"medication",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Problematicas judiciales y/o comportamentales",name:"legal_issues",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Mecanismos de defensa",name:"defense_mechanism",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Otras dificultades",name:"another_difficulty",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Que expectativas y motivaciones tiene para el proceso?",name:"expectation",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Impresion diagnostica",name:"diagnostic_impression",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Propuesta de intervencion",name:"intervention",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(s.gN,{label:"Observaciones",name:"comments",component:r.OW})}),(0,h.jsx)(t.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,h.jsx)(s.gN,{label:"Funcionario",name:"employee_id",component:r.Ky,items:v})}),(0,h.jsx)(t.ZP,{item:!0,xs:12,md:6,xl:6,children:(0,h.jsx)(s.gN,{label:"Estado",name:"status",component:r.dn,disabled:!0})})]})]})})})})))},82337:(e,i,a)=>{a.d(i,{Z:()=>o});var n=a(33359),t=a(23814);const s=(0,a(59703).Z)("MuiBox",["root"]),o=(0,t.Z)({defaultClassName:s.root,generateClassName:n.Z.generate})}}]);
//# sourceMappingURL=976.ab50bc2a.chunk.js.map