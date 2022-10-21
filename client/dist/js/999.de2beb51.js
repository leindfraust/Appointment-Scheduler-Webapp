"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[999,848],{2848:function(a,e,s){s.r(e),s.d(e,{default:function(){return Q}});var t=s(6252),i=s(2262),l=s(3577),n=s(9963),o=s(9669),r=s.n(o);const u=a=>((0,t.dD)("data-v-29b358e4"),a=a(),(0,t.Cn)(),a),c=u((()=>(0,t._)("div",{class:"modal-background"},null,-1))),d={class:"modal-content has-text-left",style:{width:"40%",margin:"auto"}},v={key:0,class:"section box"},p=u((()=>(0,t._)("p",{class:"title is-4 has-text-danger"},"Forgot Password",-1))),g={key:0,class:"notification is-danger"},m={key:1,class:"notification is-warning"},w={key:2,class:"container"},h={class:"field"},y={class:"control"},_=u((()=>(0,t._)("label",{class:"label"},"Enter Username",-1))),f={class:"field"},b={class:"control"},k=u((()=>(0,t._)("label",{class:"label"},"Enter Email",-1))),U={class:"field"},S={class:"control"},D=["disabled"],C={key:3,class:"notification is-danger"},H={key:1,class:"section box"},P={key:0,class:"container"},M={key:0,class:"notification is-warning"},q={class:"field"},T={class:"control"},x=u((()=>(0,t._)("label",{class:"label"},"Enter code",-1))),$={key:1,class:"container"},I={key:0,class:"notification is-danger"},V={key:1,class:"container"},F={class:"field"},O={class:"control"},E=u((()=>(0,t._)("label",{class:"label"},"New Password:",-1))),L={class:"field"},z={class:"control"},A=u((()=>(0,t._)("label",{class:"label"},"Confirm Password:",-1))),Y={class:"field"},K={class:"control"},N=["disabled"],Z={key:2,class:"container"},W=u((()=>(0,t._)("div",{class:"notification is-success"},"Your password has been successfully changed.",-1))),j=[W];var B={__name:"ForgotPassword",props:{userType:String,username:String,email:String},setup(a){const e=a;let s=(0,i.iH)(!1),o=(0,i.iH)(""),u=(0,i.iH)(!1),W=(0,i.iH)(!1),B=(0,i.iH)(""),G=(0,i.iH)(!1),J=(0,i.iH)(!1),Q=(0,i.iH)(!1),R=(0,i.iH)(""),X=(0,i.iH)(""),aa=(0,i.iH)(!1),ea=(0,i.iH)(!1),sa=(0,i.iH)(!1),ta=(0,i.iH)(""),ia=(0,i.iH)(e.username),la=(0,i.iH)(e.email);async function na(){if(null!=ia.value||null!=la.value){let t;if(s.value=!0,await r().post("/api/code/email",{email:la.value}).then((a=>t=a.data)),t)W.value=!0;else if(W.value=!1,"patient"==e.userType)if(await r().post("/api/user/verify_username",{username:ia.value,email:la.value}).then((a=>ta.value=a.data)),ta.value){sa.value=!1;try{await r().post("/api/OTPMail",{email:la.value}).then(G.value=!0),G.value=!0}catch(a){o.value=a}}else sa.value=!0;else if("doctor"==e.userType)if(await r().post("/api/doctor/verify_username",{username:ia.value,email:la.value}).then((a=>ta.value=a.data)),ta.value){sa.value=!1;try{await r().post("/api/OTPMail",{email:la.value}).then(G.value=!0),G.value=!0}catch(a){o.value=a}}else sa.value=!0;else if("manager"==e.userType)if(await r().post("/api/manager/verify_username",{username:ia.value,email:la.value}).then((a=>ta.value=a.data)),ta.value){sa.value=!1;try{await r().post("/api/OTPMail",{email:la.value}).then(G.value=!0),G.value=!0}catch(a){o.value=a}}else sa.value=!0;s.value=!1}}async function oa(){let a;Q.value=!1,J.value=!1,await r().post("/api/code/verify",{code:B.value}).then((e=>a=e.data)),a?J.value=!0:Q.value=!0}async function ra(){if(R.value===X.value){if("patient"==e.userType)try{await r().put("/api/fupdatePassword/patient",{patientID:ta.value._id,password:R.value}),ta.value="",ea.value=!0}catch(a){ea.value=!1,o.value=a,ta.value=""}else if("doctor"==e.userType)try{await r().put("/api/fupdatePassword/doctor",{doctorID:ta.value._id,password:R.value}),ta.value="",ea.value=!0}catch(a){ea.value=!1,o.value=a,ta.value=""}else if("manager"==e.userType)try{await r().put("/api/fupdatePassword/manager",{managerID:ta.value._id,password:R.value}),ta.value="",ea.value=!0}catch(a){ea.value=!1,o.value=a,ta.value=""}}else aa.value=!0}return(a,e)=>((0,t.wg)(),(0,t.iD)(t.HY,null,[(0,t._)("a",{class:"subtitle has-text-danger",onClick:e[0]||(e[0]=a=>(0,i.dq)(u)?u.value=!(0,i.SU)(u):u=!(0,i.SU)(u))},"Forgot Password"),(0,t._)("div",{class:(0,l.C_)(["modal",{"is-active":(0,i.SU)(u)}])},[c,(0,t._)("div",d,[(0,i.SU)(G)?((0,t.wg)(),(0,t.iD)("section",H,[(0,i.SU)(J)?((0,t.wg)(),(0,t.iD)("div",$,[(0,i.SU)(aa)?((0,t.wg)(),(0,t.iD)("div",I,"Passwords not match.")):(0,t.kq)("",!0),(0,i.SU)(ea)?((0,t.wg)(),(0,t.iD)("div",Z,j)):((0,t.wg)(),(0,t.iD)("div",V,[(0,t._)("div",F,[(0,t._)("div",O,[E,(0,t.wy)((0,t._)("input",{class:"input",type:"password","onUpdate:modelValue":e[4]||(e[4]=a=>(0,i.dq)(R)?R.value=a:R=a)},null,512),[[n.nr,(0,i.SU)(R)]])])]),(0,t._)("div",L,[(0,t._)("div",z,[A,(0,t.wy)((0,t._)("input",{class:"input",type:"password","onUpdate:modelValue":e[5]||(e[5]=a=>(0,i.dq)(X)?X.value=a:X=a)},null,512),[[n.nr,(0,i.SU)(X)]])])]),(0,t._)("div",Y,[(0,t._)("div",K,[(0,t._)("button",{class:"button",onClick:ra,disabled:""==(0,i.SU)(R)&&""==(0,i.SU)(X)},"Confirm",8,N)])])]))])):((0,t.wg)(),(0,t.iD)("div",P,[(0,i.SU)(Q)?((0,t.wg)(),(0,t.iD)("div",M,"Incorrect code, please try again.")):(0,t.kq)("",!0),(0,t._)("div",q,[(0,t._)("div",T,[x,(0,t.wy)((0,t._)("input",{class:"input",type:"number","onUpdate:modelValue":e[3]||(e[3]=a=>(0,i.dq)(B)?B.value=a:B=a)},null,512),[[n.nr,(0,i.SU)(B)]])])]),(0,t._)("div",{class:"field"},[(0,t._)("div",{class:"control"},[(0,t._)("button",{class:"button",onClick:oa},"Verify")])])]))])):((0,t.wg)(),(0,t.iD)("section",v,[p,(0,i.SU)(o)?((0,t.wg)(),(0,t.iD)("div",g,(0,l.zw)((0,i.SU)(o)),1)):(0,t.kq)("",!0),(0,i.SU)(sa)?((0,t.wg)(),(0,t.iD)("div",m,"No account has been found linked with this email.")):(0,t.kq)("",!0),(0,i.SU)(W)?((0,t.wg)(),(0,t.iD)("div",C,"You have to wait 10 minutes before requesting a code again. ")):((0,t.wg)(),(0,t.iD)("div",w,[(0,t._)("div",h,[(0,t._)("div",y,[_,(0,t.wy)((0,t._)("input",{class:"input",type:"email","onUpdate:modelValue":e[1]||(e[1]=a=>(0,i.dq)(ia)?ia.value=a:ia=a)},null,512),[[n.nr,(0,i.SU)(ia)]])])]),(0,t._)("div",f,[(0,t._)("div",b,[k,(0,t.wy)((0,t._)("input",{class:"input",type:"email","onUpdate:modelValue":e[2]||(e[2]=a=>(0,i.dq)(la)?la.value=a:la=a)},null,512),[[n.nr,(0,i.SU)(la)]])])]),(0,t._)("div",U,[(0,t._)("div",S,[(0,t._)("button",{class:(0,l.C_)(["button",{"is-loading":(0,i.SU)(s)}]),onClick:na,disabled:null==(0,i.SU)(la)||null==(0,i.SU)(ia)},"Send OTP",10,D)])])]))]))]),(0,t._)("button",{class:"modal-close is-large","aria-label":"close",onClick:e[6]||(e[6]=a=>(0,i.dq)(u)?u.value=!1:u=!1)})],2)],64))}},G=s(3744);const J=(0,G.Z)(B,[["__scopeId","data-v-29b358e4"]]);var Q=J},999:function(a,e,s){s.r(e),s.d(e,{default:function(){return M}});var t=s(6252),i=s(9963),l=s(3577);const n=a=>((0,t.dD)("data-v-1aa59fb8"),a=a(),(0,t.Cn)(),a),o={class:"hero is-fullheight",style:{"background-color":"whitesmoke"}},r={class:"hero-body"},u={class:"container has-text-centered"},c={class:"animate__animated animate__fadeInLeft"},d={key:0,class:"notification is-success"},v={class:"box",style:{width:"33%",margin:"auto"}},p={class:"content"},g={class:"field",style:{"margin-top":"5%"}},m=n((()=>(0,t._)("h1",{class:"title"},"Login",-1))),w={class:"control"},h={class:"control",style:{"margin-top":"2%"}},y={key:0,class:"has-text-danger",style:{"margin-top":"5%"}},_={key:1,class:"has-text-danger",style:{"margin-top":"5%"}},f=n((()=>(0,t._)("hr",null,null,-1))),b=n((()=>(0,t._)("h1",{class:"title"},"Or",-1)));function k(a,e,s,n,k,U){const S=(0,t.up)("ForgotPassword");return(0,t.wg)(),(0,t.iD)("section",o,[(0,t._)("div",r,[(0,t._)("div",u,[(0,t._)("div",c,[k.newAccount?((0,t.wg)(),(0,t.iD)("p",d,"The account has been successfully created, login to activate the account now.")):(0,t.kq)("",!0),(0,t._)("div",v,[(0,t._)("div",p,[(0,t._)("form",g,[m,(0,t._)("div",w,[(0,t.wy)((0,t._)("input",{class:"input",type:"text","onUpdate:modelValue":e[0]||(e[0]=a=>k.username=a),placeholder:"username",required:"",onKeyup:e[1]||(e[1]=(0,i.D2)(((...a)=>U.login&&U.login(...a)),["enter"]))},null,544),[[i.nr,k.username]])]),(0,t._)("div",h,[(0,t.wy)((0,t._)("input",{class:"input",type:"password","onUpdate:modelValue":e[2]||(e[2]=a=>k.password=a),placeholder:"password",required:"",onKeyup:e[3]||(e[3]=(0,i.D2)(((...a)=>U.login&&U.login(...a)),["enter"]))},null,544),[[i.nr,k.password]])]),k.incorrectUserPass?((0,t.wg)(),(0,t.iD)("p",y,(0,l.zw)(k.validateMessage),1)):0==k.incorrectUserPass?((0,t.wg)(),(0,t.iD)("p",_,(0,l.zw)(k.validateMessage),1)):(0,t.kq)("",!0),(0,t._)("button",{type:"button",class:"button is-primary",onClick:e[4]||(e[4]=(...a)=>U.login&&U.login(...a))},"Login"),f,b,(0,t._)("a",{onClick:e[5]||(e[5]=(...a)=>U.signup&&U.signup(...a)),class:"is-danger"},"Create an account")])]),(0,t.Wm)(S,{userType:"manager"})])])])])])}var U=s(9669),S=s.n(U),D=s(2848),C={name:"ManagerLogin",component:D["default"],data(){return{username:"",password:"",userManager:null,incorrectUserPass:"",validateMessage:"",newAccount:!1}},async mounted(){1==this.$store.state.accountCreated&&(this.newAccount=!0,await this.$store.commit("accountCreated",!1))},async beforeCreate(){await S().get("/session/manager").then((async a=>{"undefined"!==typeof a.data.hospital&&(this.$store.commit("managerHospital",a.data.hospital),await this.$router.push(`/manager/${this.$store.state.managerHospital}`))}))},methods:{async login(){null==this.username||null==this.password?(this.incorrectUserPass=!1,this.validateMessage="empty username or password",this.username=null,this.password=null):await S().post("/api/auth/manager",{username:this.username,password:this.password}).then((async a=>{this.userManager=a.data,await this.userManager?(await S().post("/session/manager",{_id:this.userManager._id,registrationCode:this.userManager.registrationCode,hospital:this.userManager.hospital}),this.$store.commit("managerHospital",this.userManager.hospital),await this.$router.push(`/manager/${this.userManager.hospital}`)):(this.validateMessage="Incorrect username or password",this.incorrectUserPass=!0,this.username=null,this.password=null)}))},async signup(){await this.$router.push("/manager/signup")}},components:{ForgotPassword:D["default"]}},H=s(3744);const P=(0,H.Z)(C,[["render",k],["__scopeId","data-v-1aa59fb8"]]);var M=P}}]);
//# sourceMappingURL=999.de2beb51.js.map