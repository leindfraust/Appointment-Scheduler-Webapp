"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[634],{5634:function(e,i,a){a.r(i),a.d(i,{default:function(){return Ae}});var s=a(6252),t=a(9963),l=a(3577);const n=e=>((0,s.dD)("data-v-59bfe8bc"),e=e(),(0,s.Cn)(),e),o={class:"section"},r=n((()=>(0,s._)("i",{class:"fa-solid fa-arrow-left"},null,-1))),d={class:"container box animate__animated animate__fadeInLeft",style:{margin:"auto",width:"50%"}},c={key:0,class:"notification is-danger"},u={action:"/api/imgUploadDoctor",method:"post",enctype:"multipart/form-data"},p={class:"field is-horizontal"},h={class:"field-body"},m={class:"field"},g=n((()=>(0,s._)("label",{class:"label"},"License code:",-1))),w={class:"control"},f={class:"field"},_=n((()=>(0,s._)("label",{class:"label"},"Alias",-1))),y={key:0},k={key:0,class:"help is-danger"},v={key:0,class:"fas fa-spinner fa-spin"},F={key:1,class:"help is-success"},b={key:0,class:"fas fa-spinner fa-spin"},C={class:"control"},T={class:"field"},U={class:"field-body"},D={class:"field"},z=n((()=>(0,s._)("label",{class:"label"},"Full Name",-1))),S={class:"control"},q=n((()=>(0,s._)("div",{class:"field"},[(0,s._)("label",{class:"label"},"Profile Picture"),(0,s._)("div",{class:"control"},[(0,s._)("input",{class:"input",type:"file",name:"imgFile",required:""})])],-1))),R={class:"field"},x=n((()=>(0,s._)("label",{class:"label"},"Registration Code",-1))),A={key:0},E={key:0,class:"help is-success"},L={key:0,class:"fas fa-spinner fa-spin"},I={key:1,class:"help is-danger"},M={key:0,class:"fas fa-spinner fa-spin"},V={class:"control"},Z={class:"field is-horizontal"},B={class:"field-body"},P={class:"field"},H=n((()=>(0,s._)("label",{class:"label"},"Username",-1))),K={key:0},N={key:0,class:"help is-danger"},O={key:0,class:"fas fa-spinner fa-spin"},W={key:1,class:"help is-success"},Y={key:0,class:"fas fa-spinner fa-spin"},$={class:"control"},X={class:"field"},j=n((()=>(0,s._)("label",{class:"label"},"Email",-1))),G={key:0},J={key:0,class:"help is-danger"},Q={key:0,class:"fas fa-spinner fa-spin"},ee={key:1,class:"help is-success"},ie={key:0,class:"fas fa-spinner fa-spin"},ae={class:"control"},se={class:"field is-horizontal"},te={class:"field-body"},le={class:"field"},ne=n((()=>(0,s._)("label",{class:"label"},"Password",-1))),oe={class:"control"},re={class:"subtitle has-text-danger"},de={class:"field"},ce=n((()=>(0,s._)("label",{class:"label"},"Repeat Password",-1))),ue={class:"control"},pe={class:"subtitle has-text-danger"},he={class:"columns"},me={class:"column"},ge=n((()=>(0,s._)("label",{class:"label"},"Specializations you possess(Select all that applies)",-1))),we={class:"panel"},fe={class:"panel-block"},_e={style:{"max-height":"20em",overflow:"auto"}},ye=["value"],ke=["onClick"],ve={class:"column"},Fe=n((()=>(0,s._)("label",{class:"label"},"Selected",-1))),be={class:"columns is-multiline"},Ce={class:"column",id:"selectedSpecializations",style:{"max-height":"26em",overflow:"auto"}},Te=["onClick"],Ue={class:"has-text-right"},De=["disabled"];function ze(e,i,a,n,ze,Se){const qe=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)("section",o,[(0,s.Wm)(qe,{to:"/account/login"},{default:(0,s.w5)((()=>[r,(0,s.Uk)(" Back to Login")])),_:1}),(0,s._)("div",d,[ze.errMsg?((0,s.wg)(),(0,s.iD)("div",c,[(0,s.Uk)(" Oops, something went wrong. Try again later or "),(0,s.Wm)(qe,{to:"/contactus"},{default:(0,s.w5)((()=>[(0,s.Uk)("contact us")])),_:1})])):(0,s.kq)("",!0),(0,s._)("form",u,[(0,s._)("div",p,[(0,s._)("div",h,[(0,s._)("div",m,[g,(0,s._)("div",w,[(0,s.wy)((0,s._)("input",{class:"input",type:"text","onUpdate:modelValue":i[0]||(i[0]=e=>ze.licenseCode=e),placeholder:"license code",required:""},null,512),[[t.nr,ze.licenseCode]])])]),(0,s._)("div",f,[_,""!==ze.aliasFound?((0,s.wg)(),(0,s.iD)("div",y,[ze.aliasFound?((0,s.wg)(),(0,s.iD)("p",k,[(0,s.Uk)(" Unavailable "),ze.loadingAlias?((0,s.wg)(),(0,s.iD)("i",v)):(0,s.kq)("",!0)])):((0,s.wg)(),(0,s.iD)("p",F,[(0,s.Uk)(" Available "),ze.loadingAlias?((0,s.wg)(),(0,s.iD)("i",b)):(0,s.kq)("",!0)]))])):(0,s.kq)("",!0),(0,s._)("div",C,[(0,s.wy)((0,s._)("input",{class:"input",type:"text","onUpdate:modelValue":i[1]||(i[1]=e=>ze.alias=e),placeholder:"alias",name:"alias",required:"",onInput:i[2]||(i[2]=(...e)=>Se.aliasFindTimeout&&Se.aliasFindTimeout(...e))},null,544),[[t.nr,ze.alias]])])])])]),(0,s._)("div",T,[(0,s._)("div",U,[(0,s._)("div",D,[z,(0,s._)("div",S,[(0,s.wy)((0,s._)("input",{class:"input",type:"text","onUpdate:modelValue":i[3]||(i[3]=e=>ze.name=e),placeholder:"Last name, First name, Extension name, Middle name",required:""},null,512),[[t.nr,ze.name]])])]),q])]),(0,s._)("div",R,[x,""!==ze.registrationCodeFound?((0,s.wg)(),(0,s.iD)("div",A,[ze.registrationCodeFound?((0,s.wg)(),(0,s.iD)("p",E,[(0,s.Uk)(" Registration code is correct. "),ze.loadingRegistrationCode?((0,s.wg)(),(0,s.iD)("i",L)):(0,s.kq)("",!0)])):((0,s.wg)(),(0,s.iD)("p",I,[(0,s.Uk)(" Incorrect registration code, please refer to your hospital for your registration code. "),ze.loadingRegistrationCode?((0,s.wg)(),(0,s.iD)("i",M)):(0,s.kq)("",!0)]))])):(0,s.kq)("",!0),(0,s._)("div",V,[(0,s.wy)((0,s._)("input",{class:"input",type:"text","onUpdate:modelValue":i[4]||(i[4]=e=>ze.registrationCode=e),onInput:i[5]||(i[5]=(...e)=>Se.registrationCodeFindTimeout&&Se.registrationCodeFindTimeout(...e)),placeholder:"registration code",required:""},null,544),[[t.nr,ze.registrationCode]])])]),(0,s._)("div",Z,[(0,s._)("div",B,[(0,s._)("div",P,[H,""!==ze.usernameFound?((0,s.wg)(),(0,s.iD)("div",K,[ze.usernameFound?((0,s.wg)(),(0,s.iD)("p",N,[(0,s.Uk)(" Unavailable "),ze.loadingUsername?((0,s.wg)(),(0,s.iD)("i",O)):(0,s.kq)("",!0)])):((0,s.wg)(),(0,s.iD)("p",W,[(0,s.Uk)(" Available "),ze.loadingUsername?((0,s.wg)(),(0,s.iD)("i",Y)):(0,s.kq)("",!0)]))])):(0,s.kq)("",!0),(0,s._)("div",$,[(0,s.wy)((0,s._)("input",{class:"input",type:"text","onUpdate:modelValue":i[6]||(i[6]=e=>ze.username=e),onInput:i[7]||(i[7]=(...e)=>Se.usernameFindTimeout&&Se.usernameFindTimeout(...e)),placeholder:"username",required:""},null,544),[[t.nr,ze.username]])])]),(0,s._)("div",X,[j,""!==ze.emailFound?((0,s.wg)(),(0,s.iD)("div",G,[ze.emailFound?((0,s.wg)(),(0,s.iD)("p",J,[(0,s.Uk)(" Unavailable "),ze.loadingEmail?((0,s.wg)(),(0,s.iD)("i",Q)):(0,s.kq)("",!0)])):((0,s.wg)(),(0,s.iD)("p",ee,[(0,s.Uk)(" Available "),ze.loadingEmail?((0,s.wg)(),(0,s.iD)("i",ie)):(0,s.kq)("",!0)]))])):(0,s.kq)("",!0),(0,s._)("div",ae,[(0,s.wy)((0,s._)("input",{class:"input",type:"email","onUpdate:modelValue":i[8]||(i[8]=e=>ze.gmail=e),onInput:i[9]||(i[9]=(...e)=>Se.emailFindTimeout&&Se.emailFindTimeout(...e)),placeholder:"gmail",required:""},null,544),[[t.nr,ze.gmail]])])])])]),(0,s._)("div",se,[(0,s._)("div",te,[(0,s._)("div",le,[ne,(0,s._)("div",oe,[(0,s.wy)((0,s._)("input",{class:"input",type:"password","onUpdate:modelValue":i[10]||(i[10]=e=>ze.password=e),placeholder:"password",required:""},null,512),[[t.nr,ze.password]])]),(0,s._)("p",re,(0,l.zw)(ze.passwordMatch),1)]),(0,s._)("div",de,[ce,(0,s._)("div",ue,[(0,s.wy)((0,s._)("input",{class:"input",type:"password","onUpdate:modelValue":i[11]||(i[11]=e=>ze.passwordRepeat=e),placeholder:"repeat password",required:""},null,512),[[t.nr,ze.passwordRepeat]])]),(0,s._)("p",pe,(0,l.zw)(ze.passwordMatch),1)])])]),(0,s._)("div",he,[(0,s._)("div",me,[ge,(0,s._)("nav",we,[(0,s._)("div",fe,[(0,s.wy)((0,s._)("input",{class:"input",type:"text","onUpdate:modelValue":i[12]||(i[12]=e=>ze.searchBarSpecialization=e),placeholder:"Search"},null,512),[[t.nr,ze.searchBarSpecialization]])]),(0,s._)("div",_e,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(Se.specializationListIndexed,((e,i)=>((0,s.wg)(),(0,s.iD)("div",{class:"panel-block",key:i,value:e},[(0,s._)("a",{onClick:i=>Se.selectSpecialization(e)},(0,l.zw)(e),9,ke)],8,ye)))),128))])])]),(0,s._)("div",ve,[Fe,(0,s._)("div",be,[(0,s._)("div",Ce,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(ze.specializationsSelected,((e,i)=>((0,s.wg)(),(0,s.iD)("button",{type:"button",key:i,class:"button is-light",style:{margin:"5px"}},[(0,s.Uk)((0,l.zw)(e)+"  ",1),(0,s._)("span",{class:"has-text-danger",onClick:i=>Se.undoSpecialization(e)},"X",8,Te)])))),128))])])])]),(0,s._)("div",Ue,[(0,s._)("button",{type:"submit",value:"Submit",class:"button is-info",onClick:i[13]||(i[13]=e=>Se.create(e)),disabled:""==ze.specializationsSelected},"Create account",8,De)])])])])}var Se=a(8945),qe={name:"SignUp",computed:{specializationListIndexed(){return this.specializationList.filter((e=>e.toLowerCase().includes(this.searchBarSpecialization.toLowerCase())))}},data(){return{licenseCode:"",alias:"",name:"",registrationCode:"",username:"",password:"",passwordRepeat:"",gmail:"",passwordMatch:null,aliasFound:"",usernameFound:"",registrationCodeFound:"",emailFound:"",loadingUsername:!1,loadingAlias:!1,loadingRegistrationCode:!1,loadingEmail:!1,specializationsSelected:[],specializationList:this.$store.getters.getSpecializationList,searchBarSpecialization:"",errMsg:"",searchTimeoutUsername:null,searchTimeoutAlias:null,searchTimeoutRegistrationCode:null,searchTimeoutEmail:null}},methods:{async registrationCodeFindTimeout(){this.searchTimeoutRegistrationCode&&(clearTimeout(this.searchTimeoutRegistrationCode),this.searchTimeoutRegistrationCode=null),this.searchTimeoutRegistrationCode=setTimeout(this.registrationCodeFinder,500)},async emailFindTimeout(){this.searchTimeoutEmail&&(clearTimeout(this.searchTimeoutEmail),this.searchTimeoutEmail=null),this.searchTimeoutEmail=setTimeout(this.emailFinder,500)},async usernameFindTimeout(){this.searchTimeoutUsername&&(clearTimeout(this.searchTimeoutUsername),this.searchTimeoutUsername=null),this.searchTimeoutUsername=setTimeout(this.usernameFinder,500)},async aliasFindTimeout(){this.searchTimeoutAlias&&(clearTimeout(this.searchTimeoutAlias),this.searchTimeoutAlias=null),this.searchTimeoutAlias=setTimeout(this.aliasFinder,500)},async registrationCodeFinder(){this.loadingRegistrationCode=!0,await Se.Z.post("/api/doctor/check_registrationCode",{registrationCode:this.registrationCode}).then((e=>{this.registrationCodeFound=e.data})),""==this.registrationCode&&(this.registrationCodeFound=""),this.loadingRegistrationCode=!1},async emailFinder(){this.loadingEmail=!0,await Se.Z.post("/api/doctor/check_email",{email:this.gmail}).then((e=>{this.emailFound=e.data})),""==this.gmail&&(this.emailFound=""),this.loadingEmail=!1},async usernameFinder(){this.loadingUsername=!0,await Se.Z.post("/api/doctor/check_username",{username:this.username}).then((e=>{this.usernameFound=e.data})),""==this.username&&(this.usernameFound=""),this.loadingUsername=!1},async aliasFinder(){this.loadingAlias=!0,await Se.Z.post("/api/doctor/check_alias",{alias:this.alias}).then((e=>{this.aliasFound=e.data})),""==this.alias&&(this.aliasFound=""),this.loadingAlias=!1},async create(e){this.password!==this.passwordRepeat?(this.passwordMatch="password do not match",await e.preventDefault(),this.registrationCode&&(null==this.registrationCodeFound&&this.registrationCodeFound||await e.preventDefault()),this.alias&&(null==this.aliasFound||this.aliasFound)&&await e.preventDefault(),this.username&&(null==this.usernameFound||this.usernameFound)&&await e.preventDefault()):(this.passwordMatch=null,this.registrationCode&&(null!=this.registrationCodeFound&&this.registrationCodeFound||await e.preventDefault()),this.alias&&(null==this.aliasFound||this.aliasFound)&&await e.preventDefault(),this.username&&(null==this.usernameFound||this.usernameFound)&&await e.preventDefault()),this.password!==this.passwordRepeat||this.aliasFound||this.usernameFound||this.emailFound||!this.registrationCodeFound||(await Se.Z.post("/api/doctor",{alias:this.alias,licenseNo:this.licenseCode,name:this.name,gmail:this.gmail,specialist:this.specializationsSelected,username:this.username,password:this.password,hospitalOrigin:[this.registrationCodeFound]}).catch((e=>this.errMsg=e)),await this.$store.commit("imgSuccess",!0))},selectSpecialization(e){this.specializationsSelected.find((i=>i===e))||this.specializationsSelected.push(e)},undoSpecialization(e){this.specializationsSelected=this.specializationsSelected.filter((i=>i!==e))}}},Re=a(3744);const xe=(0,Re.Z)(qe,[["render",ze],["__scopeId","data-v-59bfe8bc"]]);var Ae=xe}}]);
//# sourceMappingURL=634.27894aac.js.map