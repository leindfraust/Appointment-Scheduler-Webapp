"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[826],{6919:function(i,s,a){a.d(s,{Z:function(){return U}});var t=a(6252),e=a(3577);const l=i=>((0,t.dD)("data-v-adff8ddc"),i=i(),(0,t.Cn)(),i),o={class:"navbar is-hidden-desktop"},n={class:"navbar-brand"},d={class:"navbar-item"},c={class:"label"},r=l((()=>(0,t._)("span",{"aria-hidden":"true"},null,-1))),u=l((()=>(0,t._)("span",{"aria-hidden":"true"},null,-1))),p=l((()=>(0,t._)("span",{"aria-hidden":"true"},null,-1))),h=[r,u,p],g={class:"has-text-centered block",style:{padding:"5px"}},m={class:"is-hidden-mobile is-hidden-touch image image-outer is-square",style:{margin:"auto"}},v=["src"],_={key:0,class:"title is-6"},b={class:"menu-list block"},f=l((()=>(0,t._)("p",{class:"menu-label"},"General",-1))),w=l((()=>(0,t._)("p",{class:"menu-label"},"Verification and Information",-1))),y=l((()=>(0,t._)("p",{class:"menu-label"},"Support",-1))),k={class:"block has-text-centered"};function C(i,s,a,l,r,u){return(0,t.wg)(),(0,t.iD)(t.HY,null,[(0,t._)("nav",o,[(0,t._)("div",n,[(0,t._)("a",d,[(0,t._)("label",c,"Dr. "+(0,e.zw)(i.$store.state.doctorName),1)]),(0,t._)("a",{role:"button",class:(0,e.C_)(["navbar-burger",{"is-active":!r.isActive}]),"aria-label":"menu","aria-expanded":"false","data-target":"navbar",onClick:s[0]||(s[0]=(...i)=>u.menuNav&&u.menuNav(...i))},h,2)])]),(0,t._)("aside",{class:(0,e.C_)(["menu box",{"is-hidden-mobile":r.isActive,fixedMenu:r.isActive}]),style:{"background-color":"#D8E5FF",padding:"20px"}},[(0,t._)("div",g,[(0,t._)("figure",m,[(0,t._)("img",{class:"is-rounded image-inner",src:`http://res.cloudinary.com/leindfraust/image/upload/v${(new Date).getMonth()}${(new Date).getDate()}/assets/doctors/${r.alias}.jpg`},null,8,v)]),r.isActive?((0,t.wg)(),(0,t.iD)("h5",_,"Dr. "+(0,e.zw)(i.$store.state.doctorName),1)):(0,t.kq)("",!0)]),(0,t._)("ul",b,[f,(0,t._)("li",null,[(0,t._)("a",{onClick:s[1]||(s[1]=(...i)=>u.routeHome&&u.routeHome(...i))},"Appointments")]),(0,t._)("li",null,[(0,t._)("a",{onClick:s[2]||(s[2]=(...i)=>u.patientLogs&&u.patientLogs(...i))},"Patient History")]),(0,t._)("li",null,[(0,t._)("a",{onClick:s[3]||(s[3]=(...i)=>u.openSchedule&&u.openSchedule(...i))},"Schedule")]),w,(0,t._)("li",null,[(0,t._)("a",{onClick:s[4]||(s[4]=(...i)=>u.profile&&u.profile(...i))},"Profile")]),(0,t._)("li",null,[(0,t._)("a",{onClick:s[5]||(s[5]=(...i)=>u.openSecurity&&u.openSecurity(...i))},"Security")]),y,(0,t._)("li",null,[(0,t._)("a",{onClick:s[6]||(s[6]=(...s)=>i.openFAQs&&i.openFAQs(...s))},"FAQ")]),(0,t._)("li",null,[(0,t._)("a",{onClick:s[7]||(s[7]=i=>this.$router.push("/contactus"))},"Contact Us")])]),(0,t._)("div",k,[(0,t._)("button",{onClick:s[8]||(s[8]=(...i)=>u.logout&&u.logout(...i)),class:"button is-link is-rounded",type:"button"},"Logout")])],2)],64)}var D=a(4239),A=a(9669),O=a.n(A),S={name:"AdminMenu",data(){return{alias:D.Z.state.alias,isActive:!0}},methods:{async logout(){D.Z.commit("alias",null),await O()["delete"]("/session/doctor"),await this.$router.push("/doctor/login")},async routeHome(){await this.$router.push(`/doctor/${this.alias}`)},async profile(){await this.$router.push(`/doctor/${this.alias}/profile`)},async patientLogs(){await this.$router.push(`/doctor/${this.alias}/patients`)},async openSecurity(){await this.$router.push(`/doctor/${this.alias}/security`)},async openSchedule(){await this.$router.push(`/doctor/${this.alias}/schedule`)},menuNav(){this.isActive=!this.isActive}}},$=a(3744);const N=(0,$.Z)(S,[["render",C],["__scopeId","data-v-adff8ddc"]]);var U=N},6826:function(i,s,a){a.r(s),a.d(s,{default:function(){return $i}});var t=a(6252),e=a(9963),l=a(3577);const o=i=>((0,t.dD)("data-v-9fdebae0"),i=i(),(0,t.Cn)(),i),n={class:"main-doctor"},d={class:"columns"},c={class:"column is-2"},r={class:"column"},u={class:"section"},p=o((()=>(0,t._)("h1",{class:"title"},"PROFILE",-1))),h={class:"container box is-fluid"},g={key:0,class:"message is-danger"},m=o((()=>(0,t._)("div",{class:"message-header"},[(0,t._)("p",null,"YOU ARE NOT VERIFIED ❌")],-1))),v=o((()=>(0,t._)("div",{class:"message-body"},[(0,t.Uk)(" To get started, please visit "),(0,t._)("b",null,"Security"),(0,t.Uk)(" tab under "),(0,t._)("b",null,"VERIFICATION AND INFORMATION.")],-1))),_=[m,v],b={key:1,class:"message is-success"},f=o((()=>(0,t._)("div",{class:"message-header"},[(0,t._)("p",null,"YOU ARE VERIFIED ✓")],-1))),w=o((()=>(0,t._)("div",{class:"message-body"},[(0,t.Uk)(" Your basic information is "),(0,t._)("b",null,"locked"),(0,t.Uk)(". To edit, please go to the "),(0,t._)("b",null,"Security"),(0,t.Uk)(" tab. ")],-1))),y=[f,w],k={class:"columns"},C={class:"column is-4"},D={id:"formUpload",action:"/api/imgUpload",method:"post",enctype:"multipart/form-data"},A={class:"image image-outer is-square"},O=["src"],S=["src"],$=(0,t.uE)('<div class="buttons is-hidden-mobile" style="bottom:5%;right:10%;position:absolute;" data-v-9fdebae0><label for="file-input" style="cursor:pointer;" data-v-9fdebae0><a class="button is-medium is-responsive" data-v-9fdebae0><i class="fa-solid fa-camera" data-v-9fdebae0></i></a></label></div><div class="buttons is-hidden-desktop" style="bottom:15%;left:75%;position:absolute;" data-v-9fdebae0><label for="file-input" style="cursor:pointer;" data-v-9fdebae0><a class="button is-medium is-responsive" data-v-9fdebae0><i class="fa-solid fa-camera" data-v-9fdebae0></i></a></label></div>',2),N={class:"control"},U=["value"],x={key:0,class:"buttons is-centered"},H=o((()=>(0,t._)("button",{type:"submit",value:"Upload",class:"button is-info"},"Upload Picture",-1))),I={class:"column"},F={class:"field"},z=o((()=>(0,t._)("label",{class:"label"},[(0,t._)("b",null,"License No.")],-1))),R={class:"control"},V=["disabled"],L={class:"field is-horizontal"},q={class:"field-body"},E={class:"field"},M=o((()=>(0,t._)("label",{class:"label"},[(0,t._)("b",null,"Full Name:")],-1))),P={class:"control"},Z=["disabled"],Y={class:"field"},T=o((()=>(0,t._)("label",{class:"label"},[(0,t._)("b",null,"Gmail:")],-1))),j={class:"control"},K=["disabled"],Q={class:"field"},G={class:"control"},B={key:1,class:"notification is-success is-light"},W={class:"field"},J=o((()=>(0,t._)("label",{class:"label"},[(0,t._)("b",null,"Managed Hospitals:")],-1))),X={class:"control"},ii={class:"buttons"},si=["onClick"],ai={class:"field"},ti=o((()=>(0,t._)("label",{class:"label"},[(0,t._)("b",null,"Specializations:")],-1))),ei={class:"control"},li=["onClick"],oi={class:"dropdown-trigger"},ni={class:"dropdown-menu"},di=["onClick"],ci=o((()=>(0,t._)("div",{class:"modal-background"},null,-1))),ri={class:"modal-content"},ui={class:"section box"},pi={key:0,class:"notification is-danger"},hi={key:1,class:"notification is-warning"},gi={class:"field"},mi=o((()=>(0,t._)("label",{class:"label"},"Input the hospital's registration code.",-1))),vi={class:"control"},_i=o((()=>(0,t._)("br",null,null,-1))),bi={class:"has-text-centered"},fi=["disabled"];function wi(i,s,a,o,m,v){const f=(0,t.up)("DoctorMenu");return(0,t.wg)(),(0,t.iD)("div",n,[(0,t._)("div",d,[(0,t._)("div",c,[(0,t.Wm)(f)]),(0,t._)("div",r,[(0,t._)("section",u,[p,(0,t._)("div",h,[m.verified?(0,t.kq)("",!0):((0,t.wg)(),(0,t.iD)("article",g,_)),m.verified?((0,t.wg)(),(0,t.iD)("article",b,y)):(0,t.kq)("",!0),(0,t._)("div",k,[(0,t._)("div",C,[(0,t._)("form",D,[(0,t._)("figure",A,[m.imgPreviewFile?((0,t.wg)(),(0,t.iD)("img",{key:0,class:"is-rounded image-inner",src:m.imgPreviewFile},null,8,O)):((0,t.wg)(),(0,t.iD)("img",{key:1,class:"is-rounded image-inner",src:`http://res.cloudinary.com/leindfraust/image/upload/v${(new Date).getMonth()}${(new Date).getDate()}/assets/doctors/${m.alias}.jpg`},null,8,S)),$]),(0,t._)("div",N,[(0,t._)("input",{type:"hidden",name:"alias",value:m.alias},null,8,U),(0,t._)("input",{class:"input is-hidden",id:"file-input",type:"file",name:"imgFile",onChange:s[0]||(s[0]=i=>v.handleFile(i)),required:""},null,32)]),m.fileReady?((0,t.wg)(),(0,t.iD)("div",x,[(0,t._)("button",{type:"button",class:"button",onClick:s[1]||(s[1]=i=>(m.fileReady=!1,m.imgPreviewFile=null))},"Cancel"),H])):(0,t.kq)("",!0)])]),(0,t._)("div",I,[(0,t._)("div",F,[z,(0,t._)("div",R,[(0,t.wy)((0,t._)("input",{class:"input",type:"text","onUpdate:modelValue":s[2]||(s[2]=i=>m.licenseNo=i),style:{width:"33%"},disabled:1==m.verified},null,8,V),[[e.nr,m.licenseNo]])])]),(0,t._)("div",L,[(0,t._)("div",q,[(0,t._)("div",E,[M,(0,t._)("div",P,[(0,t.wy)((0,t._)("input",{class:"input",size:"5",type:"text","onUpdate:modelValue":s[3]||(s[3]=i=>m.fullname=i),disabled:1==m.verified},null,8,Z),[[e.nr,m.fullname]])])]),(0,t._)("div",Y,[T,(0,t._)("div",j,[(0,t.wy)((0,t._)("input",{class:"input",size:"5",type:"text","onUpdate:modelValue":s[4]||(s[4]=i=>m.gmail=i),disabled:1==m.verified},null,8,K),[[e.nr,m.gmail]])])])])]),(0,t._)("div",Q,[(0,t._)("div",G,[m.verified?(0,t.kq)("",!0):((0,t.wg)(),(0,t.iD)("button",{key:0,class:"button is-link",type:"button",onClick:s[5]||(s[5]=(...i)=>v.updateInfo&&v.updateInfo(...i))},"Save changes")),m.infoValidate?((0,t.wg)(),(0,t.iD)("div",B,(0,l.zw)(m.infoValidateMessage),1)):(0,t.kq)("",!0)])]),(0,t._)("div",W,[J,(0,t._)("div",X,[(0,t._)("div",ii,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(m.hospitalOrigin,(i=>((0,t.wg)(),(0,t.iD)("button",{class:"button",key:i.hospital},[(0,t.Uk)((0,l.zw)(i.hospital)+"  ",1),(0,t._)("span",{class:"has-text-danger",onClick:s=>v.pullHospital(i.hospital)},"x",8,si)])))),128)),(0,t.Uk)("  "),(0,t._)("button",{onClick:s[6]||(s[6]=i=>m.modalActive=!m.modalActive),class:"button"},"+")])])]),(0,t._)("div",ai,[ti,(0,t._)("div",ei,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(m.specialist,((i,s)=>((0,t.wg)(),(0,t.iD)("button",{class:"button",style:{margin:"5px"},key:s},[(0,t.Uk)((0,l.zw)(i)+"  ",1),(0,t._)("span",{class:"has-text-danger",onClick:s=>v.pullSpecialization(i)},"x",8,li)])))),128)),(0,t.Uk)("  "),(0,t._)("div",{class:(0,l.C_)(["dropdown",{"is-active":m.isActiveDropdownSpecialist}])},[(0,t._)("div",oi,[(0,t._)("button",{onClick:s[7]||(s[7]=(...i)=>v.dropdownSpecialist&&v.dropdownSpecialist(...i)),class:"button"},"+")]),(0,t._)("div",ni,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(m.specializationList,((i,s)=>((0,t.wg)(),(0,t.iD)("div",{class:"dropdown-content",key:s},[(0,t._)("a",{class:"dropdown-item",onClick:s=>v.addSpecialization(i)},(0,l.zw)(i),9,di)])))),128))])],2)])])])])]),(0,t._)("div",{class:(0,l.C_)(["modal",{"is-active":m.modalActive}])},[ci,(0,t._)("div",ri,[(0,t._)("section",ui,[m.errorCode?((0,t.wg)(),(0,t.iD)("div",pi,"Invalid registration code.")):(0,t.kq)("",!0),m.duplicateHospital?((0,t.wg)(),(0,t.iD)("div",hi,"Hospital has already been registered")):(0,t.kq)("",!0),(0,t._)("div",gi,[mi,(0,t._)("div",vi,[(0,t.wy)((0,t._)("input",{class:"input","onUpdate:modelValue":s[8]||(s[8]=i=>m.registrationCode=i),type:"text",placeholder:"registration code"},null,512),[[e.nr,m.registrationCode]])]),_i,(0,t._)("div",bi,[(0,t._)("button",{class:"button is-info",onClick:s[9]||(s[9]=(...i)=>v.addHospital&&v.addHospital(...i)),disabled:""==m.registrationCode},"Confirm",8,fi)])])])]),(0,t._)("button",{class:"modal-close is-large","aria-label":"close",onClick:s[10]||(s[10]=(...i)=>v.modalClose&&v.modalClose(...i))})],2)])])])])}var yi=a(4239),ki=a(9669),Ci=a.n(ki),Di=a(6919),Ai={name:"DoctorProfile",data(){return{alias:yi.Z.state.alias,fullname:null,password:null,passwordRepeat:null,infoValidate:null,infoValidateMessage:null,doctorDetails:null,id:null,profileImg:yi.Z.state.profileImg,hospitalOrigin:null,specialist:null,hospital:null,gmail:null,specializationList:this.$store.getters.getSpecializationList,hospitalList:[],isActiveDropdownSpecialist:!1,licenseNo:null,verified:null,modalActive:!1,registrationCode:"",errorCode:!1,duplicateHospital:!1,codeSent:!1,selectedHospital:"",fileReady:!1,imgPreviewFile:null}},components:{DoctorMenu:Di.Z},async mounted(){await Ci().get("/session/doctor").then((i=>this.doctorDetails=i.data)),this.verified=await this.doctorDetails.verified,this.licenseNo=await this.doctorDetails.licenseNo,this.fullname=await this.doctorDetails.fullname,this.id=await this.doctorDetails._id,this.specialist=await this.doctorDetails.specialist,this.gmail=await this.doctorDetails.gmail,this.hospitalOrigin=await this.doctorDetails.hospitalOrigin,await Ci().get("/api/manager").then((i=>this.hospitalList=i.data))},methods:{async updateInfo(){this.verified||(await Ci().put(`/api/doctor/${this.id}`,{licenseNo:this.licenseNo,name:this.fullname,gmail:this.gmail}),await Ci().put("/session/doctor",{licenseNo:this.licenseNo,name:this.fullname,gmail:this.gmail}),await Ci().get("/session/doctor").then((i=>this.fullname=i.data.fullname)),this.infoValidate=!0,this.infoValidateMessage="changes saved successfully")},handleFile(i){this.imgPreviewFile=URL.createObjectURL(i.target.files[0]),this.fileReady=!0,yi.Z.commit("imgSuccess",!0)},showPass(){let i=document.getElementsByClassName("password");for(let s=0;s<i.length;s++)"password"===i[s].type?i[s].type="text":i[s].type="password"},dropdownSpecialist(){this.isActiveDropdownSpecialist=!this.isActiveDropdownSpecialist},async addSpecialization(i){this.specialist.find((s=>s===i))||(this.specialist.push(i),this.isActiveDropdownSpecialist=!1,await Ci().put(`/api/doctor/${this.id}`,{specialist:this.specialist}),await Ci().put("/session/doctor",{specialist:this.specialist}),await Ci().get("/session/doctor").then((i=>this.specialist=i.data.specialist)))},async addHospital(){this.errorCode=!1,this.duplicateHospital=!1,await Ci().post("/api/doctor/check_registrationCode",{registrationCode:this.registrationCode}).then((i=>this.hospital=i.data)),this.hospital?this.hospitalOrigin.find((i=>i.hospital==this.hospital.hospital))?this.duplicateHospital=!0:(this.hospitalOrigin.push({hospital:this.hospital.hospital}),await Ci().put(`/api/doctor/${this.id}`,{hospitalOrigin:this.hospitalOrigin}),await Ci().put("/session/doctor",{hospitalOrigin:this.hospitalOrigin}),await Ci().get("/session/doctor").then((i=>this.hospitalOrigin=i.data.hospitalOrigin)),this.modalActive=!1):this.errorCode=!0},async pullSpecialization(i){this.specialist=this.specialist.filter((s=>s!==i)),await Ci().put(`/api/doctor/${this.id}`,{specialist:this.specialist}),await Ci().put("/session/doctor",{specialist:this.specialist}),await Ci().get("/session/doctor").then((i=>this.specialist=i.data.specialist))},async pullHospital(i){this.hospitalOrigin=this.hospitalOrigin.filter((s=>s.hospital!==i)),await Ci().put(`/api/doctor/${this.id}`,{hospitalOrigin:this.hospitalOrigin}),await Ci().put("/session/doctor",{hospitalOrigin:this.hospitalOrigin}),await Ci().get("/session/doctor").then((i=>this.hospitalOrigin=i.data.hospitalOrigin))},modalClose(){this.modalActive=!1}}},Oi=a(3744);const Si=(0,Oi.Z)(Ai,[["render",wi],["__scopeId","data-v-9fdebae0"]]);var $i=Si}}]);
//# sourceMappingURL=826.41d6daf3.js.map