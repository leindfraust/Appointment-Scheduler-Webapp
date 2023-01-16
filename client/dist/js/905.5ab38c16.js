"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[905,268],{4268:function(a,e,l){l.r(e),l.d(e,{default:function(){return G}});var t=l(6252),i=l(2262),s=l(3577),u=l(9963),n=l(8945);const o=a=>((0,t.dD)("data-v-6278675d"),a=a(),(0,t.Cn)(),a),v=o((()=>(0,t._)("div",{class:"modal-background"},null,-1))),c={class:"modal-content has-text-left",style:{width:"40%",margin:"auto"}},r={key:0,class:"section box"},d=o((()=>(0,t._)("p",{class:"title is-4 has-text-danger"},"Forgot Password",-1))),p={key:0,class:"notification is-danger"},m={key:1,class:"notification is-warning"},w={key:2,class:"container"},y={class:"field"},f={class:"control"},_=o((()=>(0,t._)("label",{class:"label"},"Enter Username",-1))),g={class:"field"},h={class:"control"},b=o((()=>(0,t._)("label",{class:"label"},"Enter Email",-1))),k={class:"field"},H={class:"control"},D=["disabled"],C={key:3,class:"notification is-danger"},Z={key:1,class:"section box"},P={key:0,class:"container"},I={key:0,class:"notification is-warning"},x={class:"field"},U={class:"control"},q=o((()=>(0,t._)("label",{class:"label"},"Enter code",-1))),V={key:1,class:"container"},N={key:0,class:"notification is-danger"},E={key:1,class:"container"},M={class:"field"},O={class:"control"},$=o((()=>(0,t._)("label",{class:"label"},"New Password:",-1))),F={class:"field"},S={class:"control"},K=o((()=>(0,t._)("label",{class:"label"},"Confirm Password:",-1))),T={class:"field"},Y={class:"control"},z=["disabled"],A={key:2,class:"container"},L=o((()=>(0,t._)("div",{class:"notification is-success"},"Your password has been successfully changed.",-1))),R=[L];var B={__name:"ForgotPassword",props:{username:String,email:String,forgotPasswordPromptCount:{type:Number,default:0}},setup(a){const e=a,l=(0,i.iH)(!1),o=(0,i.iH)(""),L=(0,i.iH)(!1),B=(0,i.iH)(!1),W=(0,i.iH)(""),j=(0,i.iH)(!1),G=(0,i.iH)(!1),J=(0,i.iH)(!1),Q=(0,i.iH)(""),X=(0,i.iH)(""),aa=(0,i.iH)(!1),ea=(0,i.iH)(!1),la=(0,i.iH)(!1),ta=(0,i.iH)(!1),ia=(0,i.iH)(""),sa=(0,i.iH)(e.username),ua=(0,i.iH)(e.email),na=(0,i.iH)(""),oa=(0,i.iH)(2),va=(0,t.Fl)((()=>e.forgotPasswordPromptCount));async function ca(){if(await n.Z.post("/api/user/verify_username",{username:sa.value,email:ua.value}).then((a=>ia.value=a.data)),ia.value){la.value=!1;try{await n.Z.post("/api/OTPMail",{email:ua.value}).then(j.value=!0),j.value=!0,na.value="patient",ta.value=!1}catch(a){o.value=a}}else la.value=!0}async function ra(){if(await n.Z.post("/api/doctor/verify_username",{username:sa.value,email:ua.value}).then((a=>ia.value=a.data)),ia.value){la.value=!1;try{await n.Z.post("/api/OTPMail",{email:ua.value}).then(j.value=!0),j.value=!0,na.value="doctor",ta.value=!1}catch(a){o.value=a}}else la.value=!0}async function da(){if(await n.Z.post("/api/manager/verify_username",{username:sa.value,email:ua.value}).then((a=>ia.value=a.data)),ia.value){la.value=!1;try{await n.Z.post("/api/OTPMail",{email:ua.value}).then(j.value=!0),j.value=!0,na.value="provider",ta.value=!1}catch(a){o.value=a}}else la.value=!0}async function pa(){if(null!=sa.value||null!=ua.value){let a;if(l.value=!0,await n.Z.post("/api/code/email",{email:ua.value}).then((e=>a=e.data)),a)B.value=!0;else{B.value=!1,ta.value=!0;while(ta.value)await ca(),await ra(),await da(),ta.value=!1}l.value=!1}}async function ma(){let a;J.value=!1,G.value=!1,await n.Z.post("/api/code/verify",{code:W.value}).then((e=>a=e.data)),a?G.value=!0:J.value=!0}async function wa(){if(Q.value===X.value){if("patient"==na.value)try{await n.Z.put("/api/fupdatePassword/patient",{patientID:ia.value._id,password:Q.value}),ia.value="",ea.value=!0}catch(a){ea.value=!1,o.value=a,ia.value=""}else if("doctor"==na.value)try{await n.Z.put("/api/fupdatePassword/doctor",{doctorID:ia.value._id,password:Q.value}),ia.value="",ea.value=!0}catch(a){ea.value=!1,o.value=a,ia.value=""}else if("provider"==na.value)try{await n.Z.put("/api/fupdatePassword/manager",{managerID:ia.value._id,password:Q.value}),ia.value="",ea.value=!0}catch(a){ea.value=!1,o.value=a,ia.value=""}}else aa.value=!0}return(a,e)=>((0,t.wg)(),(0,t.iD)(t.HY,null,[(0,i.SU)(va)>=oa.value?((0,t.wg)(),(0,t.iD)("a",{key:0,class:"help has-text-danger",onClick:e[0]||(e[0]=a=>L.value=!L.value)},"Forgot Password")):(0,t.kq)("",!0),(0,t._)("div",{class:(0,s.C_)(["modal",{"is-active":L.value}])},[v,(0,t._)("div",c,[j.value?((0,t.wg)(),(0,t.iD)("section",Z,[G.value?((0,t.wg)(),(0,t.iD)("div",V,[aa.value?((0,t.wg)(),(0,t.iD)("div",N,"Passwords not match.")):(0,t.kq)("",!0),ea.value?((0,t.wg)(),(0,t.iD)("div",A,R)):((0,t.wg)(),(0,t.iD)("div",E,[(0,t._)("div",M,[(0,t._)("div",O,[$,(0,t.wy)((0,t._)("input",{class:"input",type:"password","onUpdate:modelValue":e[4]||(e[4]=a=>Q.value=a)},null,512),[[u.nr,Q.value]])])]),(0,t._)("div",F,[(0,t._)("div",S,[K,(0,t.wy)((0,t._)("input",{class:"input",type:"password","onUpdate:modelValue":e[5]||(e[5]=a=>X.value=a)},null,512),[[u.nr,X.value]])])]),(0,t._)("div",T,[(0,t._)("div",Y,[(0,t._)("button",{class:"button",onClick:wa,disabled:""==Q.value&&""==X.value},"Confirm",8,z)])])]))])):((0,t.wg)(),(0,t.iD)("div",P,[J.value?((0,t.wg)(),(0,t.iD)("div",I,"Incorrect code, please try again.")):(0,t.kq)("",!0),(0,t._)("div",x,[(0,t._)("div",U,[q,(0,t.wy)((0,t._)("input",{class:"input",type:"number","onUpdate:modelValue":e[3]||(e[3]=a=>W.value=a)},null,512),[[u.nr,W.value]])])]),(0,t._)("div",{class:"field"},[(0,t._)("div",{class:"control"},[(0,t._)("button",{class:"button",onClick:ma},"Verify")])])]))])):((0,t.wg)(),(0,t.iD)("section",r,[d,o.value?((0,t.wg)(),(0,t.iD)("div",p,(0,s.zw)(o.value),1)):(0,t.kq)("",!0),la.value?((0,t.wg)(),(0,t.iD)("div",m,"No account has been found linked with this email.")):(0,t.kq)("",!0),B.value?((0,t.wg)(),(0,t.iD)("div",C,"You have to wait 10 minutes before requesting a code again. ")):((0,t.wg)(),(0,t.iD)("div",w,[(0,t._)("div",y,[(0,t._)("div",f,[_,(0,t.wy)((0,t._)("input",{class:"input",type:"email","onUpdate:modelValue":e[1]||(e[1]=a=>sa.value=a)},null,512),[[u.nr,sa.value]])])]),(0,t._)("div",g,[(0,t._)("div",h,[b,(0,t.wy)((0,t._)("input",{class:"input",type:"email","onUpdate:modelValue":e[2]||(e[2]=a=>ua.value=a)},null,512),[[u.nr,ua.value]])])]),(0,t._)("div",k,[(0,t._)("div",H,[(0,t._)("button",{class:(0,s.C_)(["button",{"is-loading":l.value}]),onClick:pa,disabled:null==ua.value||null==sa.value},"Send OTP",10,D)])])]))]))]),(0,t._)("button",{class:"modal-close is-large","aria-label":"close",onClick:e[6]||(e[6]=a=>L.value=!1)})],2)],64))}},W=l(3744);const j=(0,W.Z)(B,[["__scopeId","data-v-6278675d"]]);var G=j},4905:function(a,e,l){l.r(e),l.d(e,{default:function(){return N}});var t=l(6252),i=l(9963),s=l(3577),u=l(2262),n=l(8945),o=l(4268),v=l(3907),c=l(2201);const r=a=>((0,t.dD)("data-v-5a39279a"),a=a(),(0,t.Cn)(),a),d={class:"hero is-fullheight"},p={class:"hero-body"},m={class:"container"},w={class:"container has-text-centered animate__animated animate__fadeInLeft"},y={class:"box",style:{width:"35%",margin:"auto"}},f={key:0,class:"notification is-success"},_=r((()=>(0,t._)("br",null,null,-1))),g=r((()=>(0,t._)("h1",{class:"title has-text-info has-text-centered"},"MEDIC SEARCH",-1))),h={class:"field"},b={class:"control"},k=["onKeyup"],H={class:"control",style:{"margin-top":"2%"}},D=["onKeyup"],C={key:0,class:"subtitle has-text-danger"},Z={key:1,class:"subtitle has-text-danger"},P=r((()=>(0,t._)("br",null,null,-1))),I=r((()=>(0,t._)("br",null,null,-1))),x=r((()=>(0,t._)("a",{href:"/user/signup"},"Create an account",-1)));var U={__name:"DynamicLogin",setup(a){const e=(0,v.oR)(),l=(0,c.tv)(),r=(0,u.iH)(!1),U=(0,u.iH)(null),q=(0,u.iH)(null),V=(0,u.iH)(null),N=(0,u.iH)(null),E=(0,u.iH)(Boolean),M=(0,u.iH)(!1),O=(0,u.iH)(0),$=(0,u.iH)(!1);async function F(){await n.Z.post("/api/auth/patient",{username:U.value,password:q.value}).then((async a=>{V.value=await a.data,await V.value&&(r.value=!1,await n.Z.post("/session/patient",{_id:V.value._id,name:V.value.name,email:V.value.gmail,username:U.value,province:V.value.province,city:V.value.city,currentAddress:V.value.currentAddress}),e.commit("patientUsername",V.value.username),e.commit("patientID",V.value._id),await l.push(`/user/${V.value.username}`))}))}async function S(){await n.Z.post("/api/auth/doctor",{username:U.value,password:q.value}).then((async a=>{V.value=await a.data,await V.value&&(r.value=!1,await n.Z.post("/session/doctor",{verified:V.value.verified,_id:V.value._id,licenseNo:V.value.licenseNo,alias:V.value.alias,fullname:V.value.name,specialist:V.value.specialist,gmail:V.value.gmail,hospitalOrigin:V.value.hospitalOrigin,schedule:V.value.schedule,username:V.value.username,messageHistory:V.value.messageHistory,appointmentCategories:V.value.appointmentCategories,paymentMethods:V.value.paymentMethods}),e.commit("alias",V.value.alias),e.commit("doctorID",V.value._id),e.commit("doctorName",V.value.name),await l.push(`/doctor/${V.value.alias}/appointments`))}))}async function K(){await n.Z.post("/api/auth/manager",{username:U.value,password:q.value}).then((async a=>{V.value=await a.data,await V.value&&(await n.Z.post("/session/manager",{_id:V.value._id,registrationCode:V.value.registrationCode,hospital:V.value.hospital}),e.commit("managerHospital",V.value.hospital),await l.push(`/manager/${V.value.hospital}`))}))}async function T(){if($.value=!0,null==U.value||null==q.value)E.value=!1,N.value="empty username or password",U.value=null,q.value=null;else{r.value=!0;while(r.value)await F(),await S(),await K(),r.value=!1,O.value=O.value+1,N.value="Incorrect username or password",E.value=!0,U.value=null,q.value=null;$.value=!1}}return(0,t.bv)((async()=>{1==e.state.accountCreated&&(M.value=!0,e.commit("accountCreated",!1))})),(0,t.wF)((async()=>{await n.Z.get("/session/patient").then((async a=>{"undefined"!==typeof a.data.username&&(e.commit("patientUsername",a.data.username),e.commit("patientID",a.data._id),await l.push(`/user/${e.state.patientUsername}`))})),await n.Z.get("/session/doctor").then((async a=>{"undefined"!==typeof a.data.alias&&(e.commit("alias",a.data.alias),e.commit("doctorID",a.data._id),e.commit("doctorName",a.data.fullname),await l.push(`/doctor/${e.state.alias}/appointments`))})),await n.Z.get("/session/manager").then((async a=>{"undefined"!==typeof a.data.hospital&&(e.commit("managerHospital",a.data.hospital),await l.push(`/manager/${e.state.managerHospital}`))}))})),(a,e)=>((0,t.wg)(),(0,t.iD)("section",d,[(0,t._)("div",p,[(0,t._)("div",m,[(0,t._)("div",w,[(0,t._)("div",y,[M.value?((0,t.wg)(),(0,t.iD)("div",f,"Your account has been successfully created.")):(0,t.kq)("",!0),_,g,(0,t._)("div",h,[(0,t._)("div",b,[(0,t.wy)((0,t._)("input",{class:"input is-rounded",type:"text","onUpdate:modelValue":e[0]||(e[0]=a=>U.value=a),placeholder:"username",onKeyup:(0,i.D2)(T,["enter"]),required:""},null,40,k),[[i.nr,U.value]])]),(0,t._)("div",H,[(0,t.wy)((0,t._)("input",{class:"input is-rounded",type:"password","onUpdate:modelValue":e[1]||(e[1]=a=>q.value=a),placeholder:"password",onKeyup:(0,i.D2)(T,["enter"]),required:""},null,40,D),[[i.nr,q.value]])]),E.value?((0,t.wg)(),(0,t.iD)("h1",C,(0,s.zw)(N.value),1)):0==E.value?((0,t.wg)(),(0,t.iD)("h1",Z,(0,s.zw)(N.value),1)):(0,t.kq)("",!0),(0,t._)("button",{type:"button",class:(0,s.C_)(["button is-info is-rounded",{"is-loading":$.value}]),onClick:T},"Login",2),P,I,x]),(0,t.Wm)(o["default"],{forgotPasswordPromptCount:O.value},null,8,["forgotPasswordPromptCount"])])])])])]))}},q=l(3744);const V=(0,q.Z)(U,[["__scopeId","data-v-5a39279a"]]);var N=V}}]);
//# sourceMappingURL=905.5ab38c16.js.map