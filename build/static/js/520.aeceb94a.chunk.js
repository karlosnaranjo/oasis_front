"use strict";(self.webpackChunkoasis_front=self.webpackChunkoasis_front||[]).push([[520],{94967:(e,i,t)=>{t.d(i,{Z:()=>N});var s=t(72791),n=t(61889),a=t(92506),o=t(81724),r=t(87284),d=t(38314),l=t(32325),m=t(96172),c=t(40720),u=t(57689),_=t(82337),p=t(43849),x=t(92983),h=t(80184);const g=o.Ry({code:o.Z_().required("Codigo es requerido"),issue_date:o.Z_().required("Fecha de Elaboracion es requerido"),patient_id:o.Z_().required("Paciente es requerido"),reason_of_visit:o.Z_().required("Motivo de consulta es requerido"),family_history:o.Z_().required("Antecedentes familiares es requerido"),work_history:o.Z_().required("Antecedentes laborales es requerido"),personal_history:o.Z_().required("Historia personal es requerido"),addiction_history:o.Z_().required("Historia de adiccion es requerido"),way_administration:o.Z_().required("Via de administracion es requerido"),other_substances:o.Z_().required("Otras subtancias es requerido"),highest_substance:o.Z_().required("Mayor sustancia es requerido"),current_consumption:o.Z_().required("Consumo actual es requerido"),addictive_behavior:o.Z_().required("Esta realizando la conducta adictiva? es requerido"),previous_treatment:o.Z_().required("Tratamientos anteriores es requerido"),place_treatment:o.Z_().required("Lugares y tiempos de tratamiento es requerido"),mental_illness:o.Z_().required("Historia de enfermedad mental es requerido"),suicidal_thinking:o.Z_().required("Ha tenido pensamientos o intentos de suicidio? es requerido"),homicidal_attempts:o.Z_().required("Ha tenido pensamientos o intentos homicidas? es requerido"),language:o.Z_().required("Lenguaje y pensamiento es requerido"),orientation:o.Z_().required("Orientacion (Persona, espacio y tiempo): es requerido"),memory:o.Z_().required("Memoria es requerido"),mood:o.Z_().required("Estado de animo es requerido"),feeding:o.Z_().required("Alimentacion es requerido"),sleep:o.Z_().required("Sueno es requerido"),medication:o.Z_().required("Esta tomando algun tipo de medicamento? es requerido"),legal_issues:o.Z_().required("Problematicas judiciales y/o comportamentales es requerido"),defense_mechanism:o.Z_().required("Mecanismos de defensa es requerido"),another_difficulty:o.Z_().required("Otras dificultades es requerido"),expectation:o.Z_().required("Que expectativas y motivaciones tiene para el proceso? es requerido"),diagnostic_impression:o.Z_().required("Impresion diagnostica es requerido"),intervention:o.Z_().required("Propuesta de intervencion es requerido"),comments:o.Z_().required("Observaciones es requerido"),employee_id:o.Z_().required("Funcionario es requerido"),status:o.Z_().required("Estado es requerido")}),y=d.Z.transactions.psychologies.base;let b=[],j=[{label:"SI",value:"SI"},{label:"NO",value:"NO"}],Z=[{label:"SI",value:"SI"},{label:"NO",value:"NO"}],q=[{label:"SI",value:"SI"},{label:"NO",value:"NO"}],f=[];const v={code:!1,issue_date:!1,patient_id:null,reason_of_visit:!1,family_history:!1,work_history:!1,personal_history:!1,addiction_history:!1,way_administration:!1,other_substances:!1,highest_substance:!1,current_consumption:"",addictive_behavior:"",previous_treatment:"",place_treatment:!1,mental_illness:!1,suicidal_thinking:!1,homicidal_attempts:!1,language:!1,orientation:!1,memory:!1,mood:!1,feeding:!1,sleep:!1,medication:!1,legal_issues:!1,defense_mechanism:!1,another_difficulty:!1,expectation:!1,diagnostic_impression:!1,intervention:!1,comments:!1,employee_id:null,status:1},P=e=>e.map((e=>({value:e.id,label:e.name}))),N=(0,m.p5)((0,m.Tg)((e=>{let{id:i,doGet:t,genericException:o,appSuccess:m,doPost:N,doPut:O,appInfo:W,setEditable:w,viewMode:k,refresh:E}=e;const S=(0,u.s0)(),[A,M]=(0,s.useState)(v),[I,R]=(0,s.useState)(!0),C=(0,s.useCallback)((async()=>{const e={url:d.Z.transactions.psychologies.initForm,data:i?{id:i}:{}};return await t(e)}),[t,i,E,w]),H=(0,s.useCallback)((async()=>{try{const{psychologies:e,patient:i,employee:t}=await C();b=P(i),f=P(t);const{code:s,issue_date:n,patient_id:a,reason_of_visit:o,family_history:r,work_history:d,personal_history:l,addiction_history:m,way_administration:c,other_substances:u,highest_substance:_,current_consumption:x,addictive_behavior:h,previous_treatment:g,place_treatment:y,mental_illness:j,suicidal_thinking:Z,homicidal_attempts:q,language:v,orientation:N,memory:O,mood:W,feeding:w,sleep:k,medication:E,legal_issues:S,defense_mechanism:A,another_difficulty:I,expectation:H,diagnostic_impression:F,intervention:L,comments:K,employee_id:T,status:V}=e;M({code:s||"",issue_date:n||"",patient_id:a||null,reason_of_visit:o||"",family_history:r||"",work_history:d||"",personal_history:l||"",addiction_history:m||"",way_administration:c||"",other_substances:u||"",highest_substance:_||"",current_consumption:x||"",addictive_behavior:h||"",previous_treatment:g||"",place_treatment:y||"",mental_illness:j||"",suicidal_thinking:Z||"",homicidal_attempts:q||"",language:v||"",orientation:N||"",memory:O||"",mood:W||"",feeding:w||"",sleep:k||"",medication:E||"",legal_issues:S||"",defense_mechanism:A||"",another_difficulty:I||"",expectation:H||"",diagnostic_impression:F||"",intervention:L||"",comments:K||"",employee_id:T||null,status:(0,p.rp)(V)||"Activo"}),R(!1)}catch(e){console.log("ERROR AL INICIAR"+e),o(e)}}),[o,C]);(0,s.useEffect)((()=>{H()}),[H]);const F=e=>{S("".concat("/app/general/transactions/psychologies","/edit/").concat(e),{replace:!1})};return(0,h.jsx)(h.Fragment,{children:I?(0,h.jsx)(_.Z,{p:10,children:(0,h.jsx)(r.aN,{})}):(0,h.jsx)(a.J9,{enableReinitialize:!0,initialValues:A,validationSchema:g,onSubmit:async e=>{const t=(e=>{const{code:i,issue_date:t,patient_id:s,reason_of_visit:n,family_history:a,work_history:o,personal_history:r,addiction_history:d,way_administration:l,other_substances:m,highest_substance:c,current_consumption:u,addictive_behavior:_,previous_treatment:x,place_treatment:h,mental_illness:g,suicidal_thinking:y,homicidal_attempts:b,language:j,orientation:Z,memory:q,mood:f,feeding:v,sleep:P,medication:N,legal_issues:O,defense_mechanism:W,another_difficulty:w,expectation:k,diagnostic_impression:E,intervention:S,comments:A,employee_id:M,status:I}=e;return{code:i,issue_date:t,patient_id:s,reason_of_visit:n,family_history:a,work_history:o,personal_history:r,addiction_history:d,way_administration:l,other_substances:m,highest_substance:c,current_consumption:u,addictive_behavior:_,previous_treatment:x,place_treatment:h,mental_illness:g,suicidal_thinking:y,homicidal_attempts:b,language:j,orientation:Z,memory:q,mood:f,feeding:v,sleep:P,medication:N,legal_issues:O,defense_mechanism:W,another_difficulty:w,expectation:k,diagnostic_impression:E,intervention:S,comments:A,employee_id:M,status:(0,p.HY)(I)}})(e),s={url:i?"".concat(y,"/").concat(i):y,data:t},n=i?O:N;try{const e=await n(s);i?(W(l.Z.crud.update),F(e.response.data.id)):(m(l.Z.crud.new),F(e.response.data.id))}catch(a){console.log("ERROR AL GUARDAR "+a),o(a)}},children:e=>(0,h.jsxs)(a.l0,{children:[(0,h.jsx)(c.Au,{formProps:e}),(0,h.jsxs)(n.ZP,{container:!0,direction:"row",spacing:2,children:[(0,h.jsx)(n.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,h.jsx)(a.gN,{label:"Codigo",name:"code",component:r.dn})}),(0,h.jsx)(n.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,h.jsx)(a.gN,{label:"Fecha de Elaboracion",name:"issue_date",component:x.Z})}),(0,h.jsx)(n.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,h.jsx)(a.gN,{label:"Paciente",name:"patient_id",component:r.Ky,items:b})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Motivo de consulta",name:"reason_of_visit",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Antecedentes familiares",name:"family_history",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Antecedentes laborales",name:"work_history",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Historia personal",name:"personal_history",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Historia de adiccion",name:"addiction_history",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Via de administracion",name:"way_administration",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Otras subtancias",name:"other_substances",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Mayor sustancia",name:"highest_substance",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:6,xl:6,children:(0,h.jsx)(a.gN,{label:"Consumo actual",name:"current_consumption",component:r.Ky,items:j})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:6,xl:6,children:(0,h.jsx)(a.gN,{label:"Esta realizando la conducta adictiva?",name:"addictive_behavior",component:r.Ky,items:Z})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:6,xl:6,children:(0,h.jsx)(a.gN,{label:"Tratamientos anteriores",name:"previous_treatment",component:r.Ky,items:q})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Lugares y tiempos de tratamiento",name:"place_treatment",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Historia de enfermedad mental",name:"mental_illness",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Ha tenido pensamientos o intentos de suicidio?",name:"suicidal_thinking",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Ha tenido pensamientos o intentos homicidas?",name:"homicidal_attempts",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Lenguaje y pensamiento",name:"language",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Orientacion (Persona, espacio y tiempo):",name:"orientation",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Memoria",name:"memory",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Estado de animo",name:"mood",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Alimentacion",name:"feeding",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Sueno",name:"sleep",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Esta tomando algun tipo de medicamento?",name:"medication",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Problematicas judiciales y/o comportamentales",name:"legal_issues",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Mecanismos de defensa",name:"defense_mechanism",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Otras dificultades",name:"another_difficulty",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Que expectativas y motivaciones tiene para el proceso?",name:"expectation",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Impresion diagnostica",name:"diagnostic_impression",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Propuesta de intervencion",name:"intervention",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:12,xl:12,children:(0,h.jsx)(a.gN,{label:"Observaciones",name:"comments",component:r.OW})}),(0,h.jsx)(n.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,h.jsx)(a.gN,{label:"Funcionario",name:"employee_id",component:r.Ky,items:f})}),(0,h.jsx)(n.ZP,{item:!0,xs:12,md:6,xl:6,children:(0,h.jsx)(a.gN,{label:"Estado",name:"status",component:r.dn,disabled:!0})})]})]})})})})))},16520:(e,i,t)=>{t.r(i),t.d(i,{default:()=>c});var s=t(72791),n=t(87284),a=t(30808),o=t(94967),r=t(80184);const{title:d,createTitle:l}=a.default.transactions.psychologies,m=[{label:"Maestros"},{label:d}];const c=function(){const[e,i]=(0,s.useState)(!1),[t,a]=(0,s.useState)(!1),d=(0,s.useRef)();return(0,r.jsx)(n.cc,{title:l,breadcrumbs:m,children:(0,r.jsx)(o.Z,{refresh:d,setEditable:i,setViewMode:a,viewMode:t})})}},82337:(e,i,t)=>{t.d(i,{Z:()=>o});var s=t(33359),n=t(23814);const a=(0,t(59703).Z)("MuiBox",["root"]),o=(0,n.Z)({defaultClassName:a.root,generateClassName:s.Z.generate})}}]);
//# sourceMappingURL=520.aeceb94a.chunk.js.map