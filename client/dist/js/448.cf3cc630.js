"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[448,345],{7345:function(a,e,l){l.r(e),l.d(e,{default:function(){return Q}});var s=l(6252),i=l(2262),t=l(3577),n=l(9963),o=l(594);const u=a=>((0,s.dD)("data-v-3decfc24"),a=a(),(0,s.Cn)(),a),d=u((()=>(0,s._)("div",{class:"modal-background"},null,-1))),c={class:"modal-content has-text-left",style:{width:"40%",margin:"auto"}},r={key:0,class:"section box"},v=u((()=>(0,s._)("p",{class:"title is-4 has-text-danger"},"Forgot Password",-1))),p={key:0,class:"notification is-danger"},w={key:1,class:"notification is-warning"},_={key:2,class:"container"},f={class:"field"},y={class:"control"},m=u((()=>(0,s._)("label",{class:"label"},"Enter Username",-1))),g={class:"field"},h={class:"control"},b=u((()=>(0,s._)("label",{class:"label"},"Enter Email",-1))),U={class:"field"},k={class:"control"},S=["disabled"],H={key:3,class:"notification is-danger"},D={key:1,class:"section box"},P={key:0,class:"container"},C={key:0,class:"notification is-warning"},q={class:"field"},Z={class:"control"},T=u((()=>(0,s._)("label",{class:"label"},"Enter code",-1))),x={key:1,class:"container"},V={key:0,class:"notification is-danger"},I={key:1,class:"container"},N={class:"field"},E={class:"control"},O=u((()=>(0,s._)("label",{class:"label"},"New Password:",-1))),F={class:"field"},Y={class:"control"},M=u((()=>(0,s._)("label",{class:"label"},"Confirm Password:",-1))),W={class:"field"},j={class:"control"},z=["disabled"],B={key:2,class:"container"},A=u((()=>(0,s._)("div",{class:"notification is-success"},"Your password has been successfully changed.",-1))),G=[A];var J={__name:"ForgotPassword",props:{userType:String,username:String,email:String,forgotPasswordPromptCount:{type:Number,default:0}},setup(a){const e=a;let l=(0,i.iH)(!1),u=(0,i.iH)(""),A=(0,i.iH)(!1),J=(0,i.iH)(!1),K=(0,i.iH)(""),L=(0,i.iH)(!1),Q=(0,i.iH)(!1),R=(0,i.iH)(!1),X=(0,i.iH)(""),$=(0,i.iH)(""),aa=(0,i.iH)(!1),ea=(0,i.iH)(!1),la=(0,i.iH)(!1),sa=(0,i.iH)(""),ia=(0,i.iH)(e.username),ta=(0,i.iH)(e.email);const na=(0,i.iH)(2),oa=(0,s.Fl)((()=>e.forgotPasswordPromptCount));async function ua(){if(null!=ia.value||null!=ta.value){let s;if(l.value=!0,await o.Z.post("/api/code/email",{email:ta.value}).then((a=>s=a.data)),s)J.value=!0;else if(J.value=!1,"patient"==e.userType)if(await o.Z.post("/api/user/verify_username",{username:ia.value,email:ta.value}).then((a=>sa.value=a.data)),sa.value){la.value=!1;try{await o.Z.post("/api/OTPMail",{email:ta.value}).then(L.value=!0),L.value=!0}catch(a){u.value=a}}else la.value=!0;else if("doctor"==e.userType)if(await o.Z.post("/api/doctor/verify_username",{username:ia.value,email:ta.value}).then((a=>sa.value=a.data)),sa.value){la.value=!1;try{await o.Z.post("/api/OTPMail",{email:ta.value}).then(L.value=!0),L.value=!0}catch(a){u.value=a}}else la.value=!0;else if("manager"==e.userType)if(await o.Z.post("/api/manager/verify_username",{username:ia.value,email:ta.value}).then((a=>sa.value=a.data)),sa.value){la.value=!1;try{await o.Z.post("/api/OTPMail",{email:ta.value}).then(L.value=!0),L.value=!0}catch(a){u.value=a}}else la.value=!0;l.value=!1}}async function da(){let a;R.value=!1,Q.value=!1,await o.Z.post("/api/code/verify",{code:K.value}).then((e=>a=e.data)),a?Q.value=!0:R.value=!0}async function ca(){if(X.value===$.value){if("patient"==e.userType)try{await o.Z.put("/api/fupdatePassword/patient",{patientID:sa.value._id,password:X.value}),sa.value="",ea.value=!0}catch(a){ea.value=!1,u.value=a,sa.value=""}else if("doctor"==e.userType)try{await o.Z.put("/api/fupdatePassword/doctor",{doctorID:sa.value._id,password:X.value}),sa.value="",ea.value=!0}catch(a){ea.value=!1,u.value=a,sa.value=""}else if("manager"==e.userType)try{await o.Z.put("/api/fupdatePassword/manager",{managerID:sa.value._id,password:X.value}),sa.value="",ea.value=!0}catch(a){ea.value=!1,u.value=a,sa.value=""}}else aa.value=!0}return(a,e)=>((0,s.wg)(),(0,s.iD)(s.HY,null,[(0,i.SU)(oa)>=na.value?((0,s.wg)(),(0,s.iD)("a",{key:0,class:"help has-text-danger",onClick:e[0]||(e[0]=a=>(0,i.dq)(A)?A.value=!(0,i.SU)(A):A=!(0,i.SU)(A))},"Forgot Password")):(0,s.kq)("",!0),(0,s._)("div",{class:(0,t.C_)(["modal",{"is-active":(0,i.SU)(A)}])},[d,(0,s._)("div",c,[(0,i.SU)(L)?((0,s.wg)(),(0,s.iD)("section",D,[(0,i.SU)(Q)?((0,s.wg)(),(0,s.iD)("div",x,[(0,i.SU)(aa)?((0,s.wg)(),(0,s.iD)("div",V,"Passwords not match.")):(0,s.kq)("",!0),(0,i.SU)(ea)?((0,s.wg)(),(0,s.iD)("div",B,G)):((0,s.wg)(),(0,s.iD)("div",I,[(0,s._)("div",N,[(0,s._)("div",E,[O,(0,s.wy)((0,s._)("input",{class:"input",type:"password","onUpdate:modelValue":e[4]||(e[4]=a=>(0,i.dq)(X)?X.value=a:X=a)},null,512),[[n.nr,(0,i.SU)(X)]])])]),(0,s._)("div",F,[(0,s._)("div",Y,[M,(0,s.wy)((0,s._)("input",{class:"input",type:"password","onUpdate:modelValue":e[5]||(e[5]=a=>(0,i.dq)($)?$.value=a:$=a)},null,512),[[n.nr,(0,i.SU)($)]])])]),(0,s._)("div",W,[(0,s._)("div",j,[(0,s._)("button",{class:"button",onClick:ca,disabled:""==(0,i.SU)(X)&&""==(0,i.SU)($)},"Confirm",8,z)])])]))])):((0,s.wg)(),(0,s.iD)("div",P,[(0,i.SU)(R)?((0,s.wg)(),(0,s.iD)("div",C,"Incorrect code, please try again.")):(0,s.kq)("",!0),(0,s._)("div",q,[(0,s._)("div",Z,[T,(0,s.wy)((0,s._)("input",{class:"input",type:"number","onUpdate:modelValue":e[3]||(e[3]=a=>(0,i.dq)(K)?K.value=a:K=a)},null,512),[[n.nr,(0,i.SU)(K)]])])]),(0,s._)("div",{class:"field"},[(0,s._)("div",{class:"control"},[(0,s._)("button",{class:"button",onClick:da},"Verify")])])]))])):((0,s.wg)(),(0,s.iD)("section",r,[v,(0,i.SU)(u)?((0,s.wg)(),(0,s.iD)("div",p,(0,t.zw)((0,i.SU)(u)),1)):(0,s.kq)("",!0),(0,i.SU)(la)?((0,s.wg)(),(0,s.iD)("div",w,"No account has been found linked with this email.")):(0,s.kq)("",!0),(0,i.SU)(J)?((0,s.wg)(),(0,s.iD)("div",H,"You have to wait 10 minutes before requesting a code again. ")):((0,s.wg)(),(0,s.iD)("div",_,[(0,s._)("div",f,[(0,s._)("div",y,[m,(0,s.wy)((0,s._)("input",{class:"input",type:"email","onUpdate:modelValue":e[1]||(e[1]=a=>(0,i.dq)(ia)?ia.value=a:ia=a)},null,512),[[n.nr,(0,i.SU)(ia)]])])]),(0,s._)("div",g,[(0,s._)("div",h,[b,(0,s.wy)((0,s._)("input",{class:"input",type:"email","onUpdate:modelValue":e[2]||(e[2]=a=>(0,i.dq)(ta)?ta.value=a:ta=a)},null,512),[[n.nr,(0,i.SU)(ta)]])])]),(0,s._)("div",U,[(0,s._)("div",k,[(0,s._)("button",{class:(0,t.C_)(["button",{"is-loading":(0,i.SU)(l)}]),onClick:ua,disabled:null==(0,i.SU)(ta)||null==(0,i.SU)(ia)},"Send OTP",10,S)])])]))]))]),(0,s._)("button",{class:"modal-close is-large","aria-label":"close",onClick:e[6]||(e[6]=a=>(0,i.dq)(A)?A.value=!1:A=!1)})],2)],64))}},K=l(3744);const L=(0,K.Z)(J,[["__scopeId","data-v-3decfc24"]]);var Q=L},7791:function(a,e,l){l.r(e),l.d(e,{default:function(){return I}});var s=l(6252),i=l(2262),t=l(9963),n=l(4824),o=l(594),u=l(7345);const d=a=>((0,s.dD)("data-v-7d5b71be"),a=a(),(0,s.Cn)(),a),c={class:"hero is-info is-fullheight"},r={class:"hero-body"},v={class:"container"},p={class:"box"},w={key:0,class:"notification is-danger"},_={key:1,class:"notification is-success"},f={class:"field"},y={class:"control"},m=d((()=>(0,s._)("label",{class:"label"},"Current Password:",-1))),g={key:0,class:"help is-danger"},h={class:"field"},b={class:"control"},U=d((()=>(0,s._)("label",{class:"label"},"New Password:",-1))),k={key:0,class:"help is-danger"},S={class:"field"},H={class:"control"},D=d((()=>(0,s._)("label",{class:"label"},"Confirm Password:",-1))),P={key:0,class:"help is-danger"},C={class:"field has-text-right"},q={class:"control"},Z=["disabled"];var T={__name:"UserSecurity",setup(a){let e=(0,i.iH)([]),l=(0,i.iH)(""),d=(0,i.iH)(""),T=(0,i.iH)(""),x=(0,i.iH)(""),V=(0,i.iH)(!1),I=(0,i.iH)(!1),N=(0,i.iH)(!1),E=(0,i.iH)(""),O=(0,i.iH)("");function F(){let a=document.getElementsByClassName("password");for(let e=0;e<a.length;e++)"password"===a[e].type?a[e].type="text":a[e].type="password"}async function Y(){if(""!==l.value&&d.value,d.value!==T.value?I.value=!0:I.value=!1,!I.value)try{await o.Z.put("/api/updatePassword/patient",{patientID:e.value._id,currentPassword:l.value,newPassword:d.value}).then((a=>{a.data?(l.value="",d.value="",T.value="",V.value=!0,x.value=""):(V.value=!1,N.value=!0)}))}catch(a){x.value=a,V.value=!1}}return(0,s.bv)((async()=>{await o.Z.get("/session/patient").then((a=>e.value=a.data)),E.value=await e.value.username,O.value=await e.value.email})),(a,e)=>{const o=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(n.Z),(0,s._)("section",c,[(0,s._)("div",r,[(0,s._)("div",v,[(0,s._)("div",p,[(0,i.SU)(x)?((0,s.wg)(),(0,s.iD)("div",w,[(0,s.Uk)("Oops, something went wrong. Try again later or "),(0,s.Wm)(o,{to:"/contactus"},{default:(0,s.w5)((()=>[(0,s.Uk)("contact us")])),_:1})])):(0,s.kq)("",!0),(0,i.SU)(V)?((0,s.wg)(),(0,s.iD)("div",_,"Password changed successfully.")):(0,s.kq)("",!0),(0,s._)("div",f,[(0,s._)("div",y,[m,(0,s.wy)((0,s._)("input",{class:"input password is-rounded","onUpdate:modelValue":e[0]||(e[0]=a=>(0,i.dq)(l)?l.value=a:l=a),type:"password",placeholder:"Current password"},null,512),[[t.nr,(0,i.SU)(l)]]),(0,i.SU)(N)?((0,s.wg)(),(0,s.iD)("p",g,"Current password is incorrect.")):(0,s.kq)("",!0)])]),(0,s._)("div",h,[(0,s._)("div",b,[U,(0,s.wy)((0,s._)("input",{class:"input password is-rounded","onUpdate:modelValue":e[1]||(e[1]=a=>(0,i.dq)(d)?d.value=a:d=a),type:"password",placeholder:"New password"},null,512),[[t.nr,(0,i.SU)(d)]])]),(0,i.SU)(I)?((0,s.wg)(),(0,s.iD)("p",k,"Password do not match.")):(0,s.kq)("",!0)]),(0,s._)("div",S,[(0,s._)("div",H,[D,(0,s.wy)((0,s._)("input",{class:"input password is-rounded","onUpdate:modelValue":e[2]||(e[2]=a=>(0,i.dq)(T)?T.value=a:T=a),type:"password",placeholder:"Confirm password"},null,512),[[t.nr,(0,i.SU)(T)]])]),(0,i.SU)(I)?((0,s.wg)(),(0,s.iD)("p",P,"Password do not match.")):(0,s.kq)("",!0)]),(0,s._)("div",{class:"field"},[(0,s._)("div",{class:"control"},[(0,s._)("label",{class:"checkbox"},[(0,s._)("input",{type:"checkbox",onClick:F}),(0,s.Uk)(" Show password ")])])]),(0,s._)("div",C,[(0,s._)("div",q,[(0,s._)("button",{class:"button is-danger",onClick:Y,disabled:""===(0,i.SU)(l)||""===(0,i.SU)(d)||""===(0,i.SU)(T)},"Change password",8,Z)])]),""!=(0,i.SU)(E)&&""!=(0,i.SU)(O)?((0,s.wg)(),(0,s.j4)(u["default"],{key:2,userType:"patient",username:(0,i.SU)(E),email:(0,i.SU)(O)},null,8,["username","email"])):(0,s.kq)("",!0)])])])])],64)}}},x=l(3744);const V=(0,x.Z)(T,[["__scopeId","data-v-7d5b71be"]]);var I=V}}]);
//# sourceMappingURL=448.cf3cc630.js.map