"use strict";(self.webpackChunkoasis_front=self.webpackChunkoasis_front||[]).push([[616],{25616:(e,s,n)=>{n.r(s),n.d(s,{default:()=>R});var a=n(72791),i=n(96172),t=n(87284),o=n(30808),r=n(57689),l=(n(85698),n(61889)),c=n(57621),d=n(23074),u=n(78145),m=n(38314),p=n(32325),x=n(5574),h=n(16029),g=n(65661),j=n(39157),b=n(97123),Z=n(82880),f=n(80184);const w={rows:[],isLoading:!0},P=(0,i.p5)((0,i.Tg)((e=>{let{id:s,doPost:n,doGet:i,genericException:r,appSuccess:l,setOpenModal:c,refreshTable:d}=e;const[u,P]=(0,a.useState)(w),[S,C]=(0,a.useState)([]);(0,a.useEffect)((()=>{(async()=>{const e={url:"".concat(m.Z.seguridad.rolesPermission.getPermission,"/").concat(s)};try{const s=await i(e);P({rows:s,isLoading:!1})}catch(n){r(n)}})()}),[r,s,i]);const{isLoading:y,rows:R}=u,{title:v}=o.default.seguridad.rolPermission;return(0,f.jsx)(x.Z,{open:!0,onClose:c,fullWidth:!0,maxWidth:"lg",children:y?(0,f.jsx)(h.Z,{p:10,children:(0,f.jsx)(t.aN,{})}):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(g.Z,{children:v}),(0,f.jsx)(j.Z,{children:(0,f.jsx)(t.iA,{data:R,columns:[{name:"name",label:"Permiso"},{name:"description",label:"Modulo"}],onRowsSelect:e=>{C(e)}})}),(0,f.jsxs)(b.Z,{children:[(0,f.jsx)(Z.Z,{disabled:!(S.length>0),variant:"contained",onClick:async()=>{const e=[];S.forEach((s=>{e.push(s.name)}));const a={url:m.Z.seguridad.rolesPermission.base,data:{roleId:s,permissions:e}};try{await n(a),d(),c(),l(p.Z.crud.new)}catch(i){r(i)}},children:"Seleccionar"}),(0,f.jsx)(Z.Z,{variant:"contained",onClick:c,children:"Cancelar"})]})]})})}))),{title:S,updateTitle:C}=((0,i.p5)((0,i.Tg)((e=>{let{id:s,doDelete:n,appWarning:i,genericException:r}=e;const[l,c]=(0,a.useState)(null),[d,x]=(0,a.useState)(null),[h,g]=(0,a.useState)(!1),j=(0,a.useRef)(null),b=()=>c(null),Z=()=>j.current.refresh(),{deleteTitle:w,deleteMessage:S}=o.default.presolped.presolped,C=[{name:"name",label:"Permiso"},{name:"description",label:"Modulo"},{name:"acciones",label:"Acciones",filter:!1,component:e=>{const{name:s}=e;return(0,f.jsx)(t.Gh,{onDelete:()=>(e=>c(e))(s),row:e})}}];return(0,f.jsxs)(f.Fragment,{children:[Boolean(l)&&(0,f.jsx)(u.s,{open:!0,title:w,message:S,onClose:b,onAccept:async()=>{const e={url:"".concat(m.Z.seguridad.rolesPermission.base),data:{name:l}};try{await n(e),Z(),b(),i(p.Z.crud.delete)}catch(s){r(s)}}}),Boolean(h)&&(0,f.jsx)(P,{id:d,setOpenModal:()=>{g(!1),x(null)},refreshTable:Z}),(0,f.jsx)(t.iA,{forwardedRef:j,serverSideUrl:"".concat(m.Z.seguridad.rolesPermission.base,"/").concat(s),serverSideData:{id:s},onCreate:()=>function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;g(!0),x(e)}(s),columns:C})]})}))),o.default.seguridad.rol),y=[{label:"Seguridad"},{label:S}];const R=(0,i.p5)((0,i.Tg)((function(){const{id:e}=(0,r.UO)();return(0,f.jsx)(t.cc,{title:C,breadcrumbs:y,withOutCard:!0,children:(0,f.jsx)(l.ZP,{container:!0,spacing:2,sx:{pb:2,minHeight:250},children:(0,f.jsx)(l.ZP,{item:!0,xs:12,md:12,children:(0,f.jsx)(c.Z,{sx:{p:3,minHeight:"100%"},children:(0,f.jsx)(d.Z,{id:e})})})})})})))},23074:(e,s,n)=>{n.d(s,{Z:()=>j});var a=n(72791),i=n(61889),t=n(92506),o=n(81724),r=n(87284),l=n(38314),c=n(32325),d=n(96172),u=n(40720),m=n(57689),p=n(80184);const x=o.Ry({}),h=l.Z.seguridad.usuarios.base,g={name:"",email:"",role:"",password:"",compania_id:1,roles:[]},j=(0,d.p5)((0,d.Tg)((e=>{let{id:s,doGet:n,genericException:o,appSuccess:d,doPost:j,doPut:b,appInfo:Z,refresh:f}=e;const w=(0,m.s0)(),[P,S]=(0,a.useState)(g),C=(0,a.useCallback)((async()=>{const e={url:l.Z.seguridad.usuarios.initFormComponent,data:s?{id:s}:{}};return await n(e)}),[n,s,f]),y=(0,a.useCallback)((async()=>{try{const{user:e,roles:n}=await C(),{name:a,email:i,role_id:t}=e,o=n.map((e=>({value:e.id,label:e.name})));S({id:s||null,name:a||"",email:i||"",role:t||"",roles:o})}catch(e){o(e)}}),[o,C]);(0,a.useEffect)((()=>{y()}),[y]);const R=e=>{w("".concat("/app/seguridad/usuarios","/edit/").concat(e),{replace:!1})},{isLoading:v,roles:k}=P;return v?(0,p.jsx)(r.aN,{}):(0,p.jsx)(t.J9,{enableReinitialize:!0,initialValues:P,validationSchema:x,onSubmit:async e=>{const n=(e=>{const{name:s,email:n,password:a,role:i,username:t}=e;return{name:s,email:n,password:a,confirm_password:a,role_id:i,username:t}})(e),a={url:s?"".concat(h,"/").concat(s):h,data:n},i=s?b:j;try{const e=await i(a);s?(Z(c.Z.crud.update),R(e.id)):(d(c.Z.crud.new),R(e.id))}catch(t){console.log("ERROR AL GUARDAR "+t),o(t)}},children:e=>(0,p.jsxs)(t.l0,{children:[(0,p.jsx)(u.Au,{formProps:e}),(0,p.jsx)(i.ZP,{container:!0,direction:"row",spacing:2,children:(0,p.jsxs)(i.ZP,{container:!0,item:!0,spacing:2,children:[(0,p.jsx)(i.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,p.jsx)(t.gN,{label:"Nombre",name:"name",component:r.dn})}),(0,p.jsx)(i.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,p.jsx)(t.gN,{label:"Correo",name:"email",component:r.dn})}),(0,p.jsx)(i.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,p.jsx)(t.gN,{label:"Contrase\xf1a",name:"password",component:r.dn})}),(0,p.jsx)(i.ZP,{item:!0,xs:6,md:6,xl:6,children:(0,p.jsx)(t.gN,{label:"Rol",name:"role",component:u.Ky,items:k})})]})})]})})})))}}]);
//# sourceMappingURL=616.4a33cb01.chunk.js.map