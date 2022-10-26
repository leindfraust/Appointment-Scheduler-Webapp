"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[119,848],{2848:function(e,a,s){s.r(a),s.d(a,{default:function(){return G}});var t=s(6252),i=s(2262),l=s(3577),n=s(9963),u=s(196);const r=e=>((0,t.dD)("data-v-29b358e4"),e=e(),(0,t.Cn)(),e),o=r((()=>(0,t._)("div",{class:"modal-background"},null,-1))),c={class:"modal-content has-text-left",style:{width:"40%",margin:"auto"}},d={key:0,class:"section box"},v=r((()=>(0,t._)("p",{class:"title is-4 has-text-danger"},"Forgot Password",-1))),p={key:0,class:"notification is-danger"},m={key:1,class:"notification is-warning"},w={key:2,class:"container"},h={class:"field"},_={class:"control"},y=r((()=>(0,t._)("label",{class:"label"},"Enter Username",-1))),g={class:"field"},f={class:"control"},b=r((()=>(0,t._)("label",{class:"label"},"Enter Email",-1))),P={class:"field"},U={class:"control"},k=["disabled"],D={key:3,class:"notification is-danger"},S={key:1,class:"section box"},C={key:0,class:"container"},H={key:0,class:"notification is-warning"},Z={class:"field"},q={class:"control"},x=r((()=>(0,t._)("label",{class:"label"},"Enter code",-1))),T={key:1,class:"container"},I={key:0,class:"notification is-danger"},M={key:1,class:"container"},$={class:"field"},V={class:"control"},A=r((()=>(0,t._)("label",{class:"label"},"New Password:",-1))),E={class:"field"},F={class:"control"},O=r((()=>(0,t._)("label",{class:"label"},"Confirm Password:",-1))),Y={class:"field"},z={class:"control"},L=["disabled"],K={key:2,class:"container"},N=r((()=>(0,t._)("div",{class:"notification is-success"},"Your password has been successfully changed.",-1))),R=[N];var B={__name:"ForgotPassword",props:{userType:String,username:String,email:String},setup(e){const a=e;let s=(0,i.iH)(!1),r=(0,i.iH)(""),N=(0,i.iH)(!1),B=(0,i.iH)(!1),W=(0,i.iH)(""),j=(0,i.iH)(!1),G=(0,i.iH)(!1),J=(0,i.iH)(!1),Q=(0,i.iH)(""),X=(0,i.iH)(""),ee=(0,i.iH)(!1),ae=(0,i.iH)(!1),se=(0,i.iH)(!1),te=(0,i.iH)(""),ie=(0,i.iH)(a.username),le=(0,i.iH)(a.email);async function ne(){if(null!=ie.value||null!=le.value){let t;if(s.value=!0,await u.ZP.post("/api/code/email",{email:le.value}).then((e=>t=e.data)),t)B.value=!0;else if(B.value=!1,"patient"==a.userType)if(await u.ZP.post("/api/user/verify_username",{username:ie.value,email:le.value}).then((e=>te.value=e.data)),te.value){se.value=!1;try{await u.ZP.post("/api/OTPMail",{email:le.value}).then(j.value=!0),j.value=!0}catch(e){r.value=e}}else se.value=!0;else if("doctor"==a.userType)if(await u.ZP.post("/api/doctor/verify_username",{username:ie.value,email:le.value}).then((e=>te.value=e.data)),te.value){se.value=!1;try{await u.ZP.post("/api/OTPMail",{email:le.value}).then(j.value=!0),j.value=!0}catch(e){r.value=e}}else se.value=!0;else if("manager"==a.userType)if(await u.ZP.post("/api/manager/verify_username",{username:ie.value,email:le.value}).then((e=>te.value=e.data)),te.value){se.value=!1;try{await u.ZP.post("/api/OTPMail",{email:le.value}).then(j.value=!0),j.value=!0}catch(e){r.value=e}}else se.value=!0;s.value=!1}}async function ue(){let e;J.value=!1,G.value=!1,await u.ZP.post("/api/code/verify",{code:W.value}).then((a=>e=a.data)),e?G.value=!0:J.value=!0}async function re(){if(Q.value===X.value){if("patient"==a.userType)try{await u.ZP.put("/api/fupdatePassword/patient",{patientID:te.value._id,password:Q.value}),te.value="",ae.value=!0}catch(e){ae.value=!1,r.value=e,te.value=""}else if("doctor"==a.userType)try{await u.ZP.put("/api/fupdatePassword/doctor",{doctorID:te.value._id,password:Q.value}),te.value="",ae.value=!0}catch(e){ae.value=!1,r.value=e,te.value=""}else if("manager"==a.userType)try{await u.ZP.put("/api/fupdatePassword/manager",{managerID:te.value._id,password:Q.value}),te.value="",ae.value=!0}catch(e){ae.value=!1,r.value=e,te.value=""}}else ee.value=!0}return(e,a)=>((0,t.wg)(),(0,t.iD)(t.HY,null,[(0,t._)("a",{class:"subtitle has-text-danger",onClick:a[0]||(a[0]=e=>(0,i.dq)(N)?N.value=!(0,i.SU)(N):N=!(0,i.SU)(N))},"Forgot Password"),(0,t._)("div",{class:(0,l.C_)(["modal",{"is-active":(0,i.SU)(N)}])},[o,(0,t._)("div",c,[(0,i.SU)(j)?((0,t.wg)(),(0,t.iD)("section",S,[(0,i.SU)(G)?((0,t.wg)(),(0,t.iD)("div",T,[(0,i.SU)(ee)?((0,t.wg)(),(0,t.iD)("div",I,"Passwords not match.")):(0,t.kq)("",!0),(0,i.SU)(ae)?((0,t.wg)(),(0,t.iD)("div",K,R)):((0,t.wg)(),(0,t.iD)("div",M,[(0,t._)("div",$,[(0,t._)("div",V,[A,(0,t.wy)((0,t._)("input",{class:"input",type:"password","onUpdate:modelValue":a[4]||(a[4]=e=>(0,i.dq)(Q)?Q.value=e:Q=e)},null,512),[[n.nr,(0,i.SU)(Q)]])])]),(0,t._)("div",E,[(0,t._)("div",F,[O,(0,t.wy)((0,t._)("input",{class:"input",type:"password","onUpdate:modelValue":a[5]||(a[5]=e=>(0,i.dq)(X)?X.value=e:X=e)},null,512),[[n.nr,(0,i.SU)(X)]])])]),(0,t._)("div",Y,[(0,t._)("div",z,[(0,t._)("button",{class:"button",onClick:re,disabled:""==(0,i.SU)(Q)&&""==(0,i.SU)(X)},"Confirm",8,L)])])]))])):((0,t.wg)(),(0,t.iD)("div",C,[(0,i.SU)(J)?((0,t.wg)(),(0,t.iD)("div",H,"Incorrect code, please try again.")):(0,t.kq)("",!0),(0,t._)("div",Z,[(0,t._)("div",q,[x,(0,t.wy)((0,t._)("input",{class:"input",type:"number","onUpdate:modelValue":a[3]||(a[3]=e=>(0,i.dq)(W)?W.value=e:W=e)},null,512),[[n.nr,(0,i.SU)(W)]])])]),(0,t._)("div",{class:"field"},[(0,t._)("div",{class:"control"},[(0,t._)("button",{class:"button",onClick:ue},"Verify")])])]))])):((0,t.wg)(),(0,t.iD)("section",d,[v,(0,i.SU)(r)?((0,t.wg)(),(0,t.iD)("div",p,(0,l.zw)((0,i.SU)(r)),1)):(0,t.kq)("",!0),(0,i.SU)(se)?((0,t.wg)(),(0,t.iD)("div",m,"No account has been found linked with this email.")):(0,t.kq)("",!0),(0,i.SU)(B)?((0,t.wg)(),(0,t.iD)("div",D,"You have to wait 10 minutes before requesting a code again. ")):((0,t.wg)(),(0,t.iD)("div",w,[(0,t._)("div",h,[(0,t._)("div",_,[y,(0,t.wy)((0,t._)("input",{class:"input",type:"email","onUpdate:modelValue":a[1]||(a[1]=e=>(0,i.dq)(ie)?ie.value=e:ie=e)},null,512),[[n.nr,(0,i.SU)(ie)]])])]),(0,t._)("div",g,[(0,t._)("div",f,[b,(0,t.wy)((0,t._)("input",{class:"input",type:"email","onUpdate:modelValue":a[2]||(a[2]=e=>(0,i.dq)(le)?le.value=e:le=e)},null,512),[[n.nr,(0,i.SU)(le)]])])]),(0,t._)("div",P,[(0,t._)("div",U,[(0,t._)("button",{class:(0,l.C_)(["button",{"is-loading":(0,i.SU)(s)}]),onClick:ne,disabled:null==(0,i.SU)(le)||null==(0,i.SU)(ie)},"Send OTP",10,k)])])]))]))]),(0,t._)("button",{class:"modal-close is-large","aria-label":"close",onClick:a[6]||(a[6]=e=>(0,i.dq)(N)?N.value=!1:N=!1)})],2)],64))}},W=s(3744);const j=(0,W.Z)(B,[["__scopeId","data-v-29b358e4"]]);var G=j},4119:function(e,a,s){s.r(a),s.d(a,{default:function(){return x}});var t=s(6252),i=s(9963),l=s(3577);const n=e=>((0,t.dD)("data-v-e015d0aa"),e=e(),(0,t.Cn)(),e),u={class:"hero is-fullheight"},r={class:"hero-body"},o={class:"container"},c={class:"container has-text-centered animate__animated animate__fadeInLeft"},d={class:"box",style:{width:"35%",margin:"auto"}},v={key:0,class:"notification is-success"},p=n((()=>(0,t._)("br",null,null,-1))),m=n((()=>(0,t._)("h1",{class:"title has-text-info has-text-centered"},"MEDIC SEARCH",-1))),w={class:"field"},h={class:"control"},_={class:"control",style:{"margin-top":"2%"}},y={key:0,class:"subtitle has-text-danger"},g={key:1,class:"subtitle has-text-danger"},f=n((()=>(0,t._)("br",null,null,-1))),b=n((()=>(0,t._)("br",null,null,-1))),P=n((()=>(0,t._)("h1",{class:"subtitle"},"OR",-1))),U=n((()=>(0,t._)("a",{href:"/user/signup"},"Create an account",-1)));function k(e,a,s,n,k,D){const S=(0,t.up)("ForgotPassword");return(0,t.wg)(),(0,t.iD)("section",u,[(0,t._)("div",r,[(0,t._)("div",o,[(0,t._)("div",c,[(0,t._)("div",d,[k.newAccount?((0,t.wg)(),(0,t.iD)("div",v,"Your account has been successfully created.")):(0,t.kq)("",!0),p,m,(0,t._)("div",w,[(0,t._)("div",h,[(0,t.wy)((0,t._)("input",{class:"input is-rounded",type:"text","onUpdate:modelValue":a[0]||(a[0]=e=>k.username=e),placeholder:"username",onKeyup:a[1]||(a[1]=(0,i.D2)(((...e)=>D.login&&D.login(...e)),["enter"])),required:""},null,544),[[i.nr,k.username]])]),(0,t._)("div",_,[(0,t.wy)((0,t._)("input",{class:"input is-rounded",type:"password","onUpdate:modelValue":a[2]||(a[2]=e=>k.password=e),placeholder:"password",onKeyup:a[3]||(a[3]=(0,i.D2)(((...e)=>D.login&&D.login(...e)),["enter"])),required:""},null,544),[[i.nr,k.password]])]),k.incorrectUserPass?((0,t.wg)(),(0,t.iD)("h1",y,(0,l.zw)(k.validateMessage),1)):0==k.incorrectUserPass?((0,t.wg)(),(0,t.iD)("h1",g,(0,l.zw)(k.validateMessage),1)):(0,t.kq)("",!0),(0,t._)("button",{type:"button",class:"button is-info is-rounded",onClick:a[4]||(a[4]=(...e)=>D.login&&D.login(...e))},"Login"),f,b,P,U]),(0,t.Wm)(S,{userType:"patient"})])])])])])}var D=s(196),S=s(4239),C=s(2848),H={username:"UserLogin",components:{ForgotPassword:C["default"]},data(){return{username:null,password:null,userPatient:null,validateMessage:null,incorrectUserPass:Boolean,newAccount:!1}},async mounted(){1==this.$store.state.accountCreated&&(this.newAccount=!0,await this.$store.commit("accountCreated",!1))},async beforeCreate(){await D.ZP.get("/session/patient").then((async e=>{"undefined"!==typeof e.data.username&&(this.$store.commit("patientUsername",e.data.username),this.$store.commit("patientID",e.data._id),await this.$router.push(`/user/${this.$store.state.patientUsername}`))}))},methods:{async login(){null==this.username||null==this.password?(this.incorrectUserPass=!1,this.validateMessage="empty username or password",this.username=null,this.password=null):await D.ZP.post("/api/auth/patient",{username:this.username,password:this.password}).then((async e=>{this.userPatient=await e.data,await this.userPatient?(await D.ZP.post("/session/patient",{_id:this.userPatient._id,name:this.userPatient.name,email:this.userPatient.gmail,username:this.username,province:this.userPatient.province,city:this.userPatient.city,currentAddress:this.userPatient.currentAddress}),S.Z.commit("patientUsername",this.userPatient.username),S.Z.commit("patientID",this.userPatient._id),await this.$router.push(`/user/${this.userPatient.username}`)):(this.validateMessage="Incorrect username or password",this.incorrectUserPass=!0,this.username=null,this.password=null)}))}}},Z=s(3744);const q=(0,Z.Z)(H,[["render",k],["__scopeId","data-v-e015d0aa"]]);var x=q}}]);
//# sourceMappingURL=119.ce9e5f3a.js.map