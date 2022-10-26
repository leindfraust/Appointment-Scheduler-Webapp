"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[957],{7787:function(t,i,a){a.d(i,{Z:function(){return d}});var e=a(6252),s=a(2262),l=a(3577);const n={key:0,class:"notification is-danger"};var o={__name:"CatchError",props:{errMsg:null},setup(t){const i=t,a=(0,e.Fl)((()=>i.errMsg));return(t,i)=>{const o=(0,e.up)("router-link");return(0,s.SU)(a)?((0,e.wg)(),(0,e.iD)("div",n,[(0,e.Uk)("Sorry, something went wrong. "+(0,l.zw)((0,s.SU)(a).message)+", please try again later or ",1),(0,e.Wm)(o,{to:"/contactus"},{default:(0,e.w5)((()=>[(0,e.Uk)("contact us")])),_:1}),(0,e.Uk)(". ")])):(0,e.kq)("",!0)}}};const c=o;var d=c},7063:function(t,i,a){a.d(i,{Z:function(){return C}});var e=a(6252),s=a(3577);const l={class:"navbar is-hidden-desktop"},n={class:"navbar-brand"},o=(0,e._)("span",{"aria-hidden":"true"},null,-1),c=(0,e._)("span",{"aria-hidden":"true"},null,-1),d=(0,e._)("span",{"aria-hidden":"true"},null,-1),r=[o,c,d],u=(0,e._)("p",{class:"menu-label"},"General",-1),h={class:"menu-list"},p=(0,e._)("p",{class:"menu-label"},"Security",-1),g={class:"menu-list"},m=(0,e._)("p",{class:"menu-label"},"Support",-1),v={class:"menu-list"},_=(0,e._)("li",null,[(0,e._)("a",null,"FAQ")],-1),k=(0,e._)("hr",null,null,-1);function w(t,i,a,o,c,d){return(0,e.wg)(),(0,e.iD)(e.HY,null,[(0,e._)("nav",l,[(0,e._)("div",n,[(0,e._)("a",{role:"button",class:(0,s.C_)(["navbar-burger",{"is-active":!c.isActive}]),"aria-label":"menu","aria-expanded":"false","data-target":"navbar",onClick:i[0]||(i[0]=(...t)=>d.menuNav&&d.menuNav(...t))},r,2)])]),(0,e._)("aside",{class:(0,s.C_)(["menu box",{"is-hidden-mobile":c.isActive,fixedMenu:c.isActive}]),style:{"background-color":"white",padding:"20px",height:"100vh"}},[u,(0,e._)("ul",h,[(0,e._)("li",null,[(0,e._)("a",{onClick:i[1]||(i[1]=(...t)=>d.navDoctors&&d.navDoctors(...t))},"Dashboard")]),(0,e._)("li",null,[(0,e._)("a",{onClick:i[2]||(i[2]=(...t)=>d.navProfile&&d.navProfile(...t))},"Profile")])]),p,(0,e._)("ul",g,[(0,e._)("li",null,[(0,e._)("a",{onClick:i[3]||(i[3]=(...t)=>d.navChangePass&&d.navChangePass(...t))},"Registration and Password")])]),m,(0,e._)("ul",v,[_,(0,e._)("li",null,[(0,e._)("a",{onClick:i[4]||(i[4]=t=>this.$router.push("/contactus"))},"Contact Us")])]),k,(0,e._)("button",{class:"button is-danger",onClick:i[5]||(i[5]=(...t)=>d.logout&&d.logout(...t))},"Logout")],2)],64)}var D=a(196),b={name:"ManagerMenu",data(){return{isActive:!0,managerHospital:""}},async mounted(){await D.ZP.get("/session/manager").then((t=>this.managerHospital=t.data.hospital))},methods:{async logout(){await D.ZP["delete"]("/session/manager"),await this.$store.commit("managerHospital",null),await this.$router.push("/manager/login")},menuNav(){this.isActive=!this.isActive},navProfile(){this.$router.push(`/manager/${this.managerHospital}/profile`)},navDoctors(){this.$router.push(`/manager/${this.managerHospital}`)},navChangePass(){this.$router.push(`/manager/${this.managerHospital}/security`)}}},y=a(3744);const f=(0,y.Z)(b,[["render",w]]);var C=f},8957:function(t,i,a){a.r(i),a.d(i,{default:function(){return Yt}});var e=a(6252),s=a(3577),l=a(9963);const n=t=>((0,e.dD)("data-v-6bfae7c3"),t=t(),(0,e.Cn)(),t),o=n((()=>(0,e._)("div",{class:"modal-background"},null,-1))),c=n((()=>(0,e._)("div",{class:"modal-content loader"},null,-1))),d=[o,c],r={class:"columns"},u={class:"column is-2"},h={class:"column"},p={class:"section"},g={key:0,class:"notification is-light is-info"},m=n((()=>(0,e._)("b",null,"photo",-1))),v=n((()=>(0,e._)("b",null,"description",-1))),_=n((()=>(0,e._)("b",null,"contacts",-1))),k=n((()=>(0,e._)("b",null,"description",-1))),w=n((()=>(0,e._)("b",null,"contacts",-1))),D=n((()=>(0,e._)("b",null,'"Edit"',-1))),b=n((()=>(0,e._)("div",{class:"block"},null,-1))),y=n((()=>(0,e._)("b",null,"upload a photo",-1))),f={class:"box"},C=n((()=>(0,e._)("h1",{class:"title"},"Display Picture",-1))),z={key:0,class:"image is-16by9"},S=["src"],M={key:1,class:"image is-16by9"},H=["src"],U={id:"formUpload",action:"/api/imgUploadManager",method:"post",enctype:"multipart/form-data",style:{margin:"auto",width:"50%"},class:"field"},P={class:"control"},L=["value"],q={key:0,class:"buttons is-centered"},x=n((()=>(0,e._)("button",{type:"submit",value:"Upload",class:"button is-info"},"Upload Photo",-1))),$=n((()=>(0,e._)("br",null,null,-1))),I={class:"container is-max-desktop"},A={class:"block"},Z=n((()=>(0,e._)("h1",{class:"title"},"Description:",-1))),E={key:0,class:"subtitle"},V={key:1,class:"form"},Y={class:"control"},K={class:"block"},B=n((()=>(0,e._)("h1",{class:"title"},"Contacts:",-1))),N={key:0},R={class:"subtitle"},j={key:1},F={class:"subtitle"},W=["onClick"],G=n((()=>(0,e._)("br",null,null,-1))),T={key:2,class:"field has-addons"},O={class:"control"},Q={class:"control"},X=["disabled"],J={class:"columns"},tt={class:"column"},it=n((()=>(0,e._)("h1",{class:"title"},"Latitude N",-1))),at={key:0,class:"subtitle"},et={key:1,class:"field"},st=n((()=>(0,e._)("h1",{class:"title"},"Longitude E",-1))),lt={key:2,class:"subtitle"},nt={key:3,class:"field"},ot={class:"column"},ct=["src"],dt=n((()=>(0,e._)("br",null,null,-1))),rt=n((()=>(0,e._)("h1",{class:"title"},"Specializations offered",-1))),ut={key:4,class:"columns is-multiline"},ht={class:"column",id:"selectedSpecializations"},pt={key:5,class:"columns"},gt={class:"column"},mt=n((()=>(0,e._)("label",{class:"label"},"Selected Specializations",-1))),vt={class:"columns is-multiline"},_t={class:"column",id:"selectedSpecializations"},kt=["onClick"],wt={class:"column"},Dt=n((()=>(0,e._)("label",{class:"label"},"Select Specializations",-1))),bt={class:"panel"},yt={class:"panel-block"},ft={style:{"max-height":"20em",overflow:"auto"}},Ct=["value"],zt=["onClick"],St={key:6,class:"control"},Mt={class:"radio"},Ht={key:0,class:"help"},Ut=n((()=>(0,e._)("b",null,"photo",-1))),Pt=n((()=>(0,e._)("b",null,'"Cancel Editing"',-1))),Lt=n((()=>(0,e._)("br",null,null,-1))),qt=["disabled"];function xt(t,i,a,n,o,c){const xt=(0,e.up)("ManagerMenuVue"),$t=(0,e.up)("CatchError");return(0,e.wg)(),(0,e.iD)(e.HY,null,[(0,e._)("div",{class:(0,s.C_)(["modal",{"is-active":o.loading}])},d,2),(0,e._)("div",r,[(0,e._)("div",u,[(0,e.Wm)(xt)]),(0,e._)("div",h,[(0,e._)("section",p,[(0,e.Wm)($t,{"err-msg":o.errMsg},null,8,["err-msg"]),"Inactive"==o.hospitalStatus?((0,e.wg)(),(0,e.iD)("div",g,[(0,e.Uk)("To get started, upload a "),m,(0,e.Uk)(" of your hospital and fill in the details of your "),v,(0,e.Uk)(" and "),_,(0,e.Uk)(". Activation of the account is only available when you have filled up the "),k,(0,e.Uk)(" and "),w,(0,e.Uk)(". Get started by clicking "),D,(0,e.Uk)(". "),b,(0,e.Uk)(" Make sure you "),y,(0,e.Uk)(" of your hospital before activating the account. ")])):(0,e.kq)("",!0),(0,e._)("div",f,[C,"Inactive"===o.hospitalStatus||o.imgPreview?(0,e.kq)("",!0):((0,e.wg)(),(0,e.iD)("figure",z,[(0,e._)("img",{src:`https://res.cloudinary.com/leindfraust/image/upload/v${(new Date).getMonth()}${(new Date).getDate()}/assets/managers/${o.managerHospital}.jpg`},null,8,S)])),o.imgPreview?((0,e.wg)(),(0,e.iD)("figure",M,[(0,e._)("img",{src:o.imgPreview},null,8,H)])):(0,e.kq)("",!0),(0,e._)("form",U,[(0,e._)("div",P,[(0,e._)("input",{type:"hidden",name:"hospital",value:o.managerHospital},null,8,L),(0,e._)("input",{class:"input",type:"file",name:"imgFile",onChange:i[0]||(i[0]=t=>c.fileHandlerInput(t)),required:""},null,32),o.imgPreview?((0,e.wg)(),(0,e.iD)("div",q,[(0,e._)("button",{class:"button",type:"button",onClick:i[1]||(i[1]=t=>o.imgPreview="")},"Cancel Upload"),x])):(0,e.kq)("",!0)])]),$,o.editingMode?((0,e.wg)(),(0,e.iD)("a",{key:3,class:"has-text-danger",onClick:i[3]||(i[3]=(...t)=>c.editModeCancel&&c.editModeCancel(...t))},"[Cancel Editing]")):((0,e.wg)(),(0,e.iD)("a",{key:2,class:"has-text-info",onClick:i[2]||(i[2]=(...t)=>c.editMode&&c.editMode(...t))},"[Edit]")),(0,e._)("div",I,[(0,e._)("div",A,[Z,o.editingMode?(0,e.kq)("",!0):((0,e.wg)(),(0,e.iD)("p",E,(0,s.zw)(o.description),1)),o.editingMode?((0,e.wg)(),(0,e.iD)("form",V,[(0,e._)("div",Y,[(0,e.wy)((0,e._)("textarea",{class:"textarea","onUpdate:modelValue":i[4]||(i[4]=t=>o.editDescription=t),placeholder:"Edit description..."},null,512),[[l.nr,o.editDescription]])])])):(0,e.kq)("",!0)]),(0,e._)("div",K,[B,o.editingMode?((0,e.wg)(),(0,e.iD)("ul",j,[((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)(o.editContacts,((t,i)=>((0,e.wg)(),(0,e.iD)("li",{key:i},[(0,e._)("p",F,[(0,e.Uk)((0,s.zw)(t.contact)+" ",1),o.editingMode?((0,e.wg)(),(0,e.iD)("a",{key:0,class:"has-text-danger",onClick:i=>c.removeContact(t.contact)},"Remove",8,W)):(0,e.kq)("",!0)])])))),128))])):((0,e.wg)(),(0,e.iD)("ul",N,[((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)(o.contacts,((t,i)=>((0,e.wg)(),(0,e.iD)("li",{key:i},[(0,e._)("p",R,(0,s.zw)(t.contact),1)])))),128))])),G,o.editingMode?((0,e.wg)(),(0,e.iD)("div",T,[(0,e._)("div",O,[(0,e.wy)((0,e._)("input",{class:"input",type:"number","onUpdate:modelValue":i[5]||(i[5]=t=>o.contact=t),placeholder:"Add contacts..."},null,512),[[l.nr,o.contact]])]),(0,e._)("div",Q,[(0,e._)("button",{type:"submit",class:"button is-light",onClick:i[6]||(i[6]=(...t)=>c.addContact&&c.addContact(...t)),disabled:""==o.contact},"+",8,X)])])):(0,e.kq)("",!0)]),(0,e._)("div",J,[(0,e._)("div",tt,[it,o.editingMode?(0,e.kq)("",!0):((0,e.wg)(),(0,e.iD)("p",at,(0,s.zw)(o.latitude),1)),o.editingMode?((0,e.wg)(),(0,e.iD)("div",et,[(0,e.wy)((0,e._)("input",{class:"input",type:"text","onUpdate:modelValue":i[7]||(i[7]=t=>o.editLatitude=t)},null,512),[[l.nr,o.editLatitude]])])):(0,e.kq)("",!0),st,o.editingMode?(0,e.kq)("",!0):((0,e.wg)(),(0,e.iD)("p",lt,(0,s.zw)(o.longitude),1)),o.editingMode?((0,e.wg)(),(0,e.iD)("div",nt,[(0,e.wy)((0,e._)("input",{class:"input",type:"text","onUpdate:modelValue":i[8]||(i[8]=t=>o.editLongitude=t)},null,512),[[l.nr,o.editLongitude]])])):(0,e.kq)("",!0)]),(0,e._)("div",ot,[""!==o.hospitalData?((0,e.wg)(),(0,e.iD)("iframe",{key:0,width:"500",height:"500",src:`https://maps.google.com/maps?q=${o.hospitalData.location.coordinates[1]},${o.hospitalData.location.coordinates[0]}&hl=es;z=14&output=embed`},null,8,ct)):(0,e.kq)("",!0)])])]),dt,rt,o.editingMode?(0,e.kq)("",!0):((0,e.wg)(),(0,e.iD)("div",ut,[(0,e._)("div",ht,[((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)(o.hospitalSpecializations,((t,i)=>((0,e.wg)(),(0,e.iD)("button",{key:i,class:"button",style:{margin:"5px"}},(0,s.zw)(t.specialist),1)))),128))])])),o.editingMode?((0,e.wg)(),(0,e.iD)("div",pt,[(0,e._)("div",gt,[mt,(0,e._)("div",vt,[(0,e._)("div",_t,[((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)(o.editHospitalSpecializations,((t,i)=>((0,e.wg)(),(0,e.iD)("button",{key:i,class:"button is-light",style:{margin:"5px"}},[(0,e.Uk)((0,s.zw)(t.specialist)+"  ",1),(0,e._)("span",{class:"has-text-danger",onClick:i=>c.undoSpecialization(t.specialist)},"X",8,kt)])))),128))])])]),(0,e._)("div",wt,[Dt,(0,e._)("nav",bt,[(0,e._)("div",yt,[(0,e.wy)((0,e._)("input",{class:"input",type:"text","onUpdate:modelValue":i[9]||(i[9]=t=>o.searchBar=t),placeholder:"Search"},null,512),[[l.nr,o.searchBar]])]),(0,e._)("div",ft,[((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)(c.specializationListIndexed,((t,i)=>((0,e.wg)(),(0,e.iD)("div",{class:"panel-block",key:i,value:t},[(0,e._)("a",{onClick:i=>c.selectSpecialization(t)},(0,s.zw)(t),9,zt)],8,Ct)))),128))])])])])):(0,e.kq)("",!0),"Inactive"==o.hospitalStatus&&o.editingMode?((0,e.wg)(),(0,e.iD)("div",St,[(0,e._)("label",Mt,[(0,e._)("input",{type:"radio",onClick:i[10]||(i[10]=(...t)=>c.activateAccount&&c.activateAccount(...t))}),(0,e.Uk)(" Activate this account. ")]),o.activate?((0,e.wg)(),(0,e.iD)("p",Ht,[(0,e.Uk)("Please make sure you have uploaded a "),Ut,(0,e.Uk)(" of the hospital before activating it. To cancel this, just click "),Pt,(0,e.Uk)(".")])):(0,e.kq)("",!0)])):(0,e.kq)("",!0),Lt,o.editingMode?((0,e.wg)(),(0,e.iD)("button",{key:7,class:"button is-danger",onClick:i[11]||(i[11]=(...t)=>c.saveProfileEdit&&c.saveProfileEdit(...t)),disabled:""==o.editDescription||0==o.editContacts.length||""==o.editLatitude||""==o.editLongitude},(0,s.zw)("Inactive"===o.hospitalStatus&&o.activate?"Save changes and activate this account":"Save changes"),9,qt)):(0,e.kq)("",!0)])])])])],64)}var $t=a(196),It=a(7787),At=a(7063),Zt={name:"ManagerProfile",components:{ManagerMenuVue:At.Z,CatchError:It.Z},async mounted(){this.loading=!0,await $t.ZP.get("/session/manager").then((t=>this.managerHospital=t.data.hospital)),await $t.ZP.get("/session/manager").then((t=>this.managerHospitalID=t.data._id)),await $t.ZP.post(`/api/manager/${this.managerHospitalID}`).then((t=>this.hospitalData=t.data)),this.hospitalStatus=await this.hospitalData.status,this.latitude=await this.hospitalData.location.coordinates[1],this.longitude=await this.hospitalData.location.coordinates[0],this.hospitalSpecializations=await this.hospitalData.specializations,"Inactive"!==this.hospitalStatus&&(this.description=await this.hospitalData.details[0].description,this.contacts=await this.hospitalData.details[0].contacts,this.latitude=await this.hospitalData.location.coordinates[1],this.longitude=await this.hospitalData.location.coordinates[0],this.hospitalSpecializations=await this.hospitalData.specializations),this.loading=!1},computed:{specializationListIndexed(){return this.specializationList.filter((t=>t.toLowerCase().includes(this.searchBar.toLowerCase())))}},data(){return{errMsg:"",searchBar:"",specializationList:this.$store.getters.getSpecializationList,loading:!1,hospitalStatus:"",activate:!1,managerHospital:"",managerHospitalID:"",editingMode:!1,editDescription:"",editContacts:[],editLatitude:"",editLongitude:"",hospitalSpecializations:[],editHospitalSpecializations:[],latitude:"",longitude:"",description:"",contact:"",contacts:[],hospitalData:"",details:[],coordinates:[],imgPreview:"",fileHandler:""}},methods:{fileHandlerInput(t){this.fileHandler=t.target.files[0],this.imgPreview=URL.createObjectURL(this.fileHandler),this.$store.commit("imgSuccessManager",!0)},editMode(){this.editingMode=!0,this.editDescription=this.description,this.editContacts=[...this.contacts],this.editLatitude=this.latitude,this.editLongitude=this.longitude,this.editHospitalSpecializations=[...this.hospitalSpecializations]},editModeCancel(){this.editingMode=!1,this.editDescription="",this.editContacts=[],this.editLatitude="",this.editLongitude="",this.editHospitalSpecializations=[],"Inactive"==this.hospitalStatus&&(this.activate=!1)},addContact(){this.editContacts.push({contact:this.contact}),this.contact=""},removeContact(t){this.editContacts=this.editContacts.filter((i=>i.contact!==t))},activateAccount(){this.activate=!0},selectSpecialization(t){this.editHospitalSpecializations.find((i=>i.specialist===t))||this.editHospitalSpecializations.push({specialist:t})},undoSpecialization(t){this.editHospitalSpecializations=this.editHospitalSpecializations.filter((i=>i.specialist!==t))},async saveProfileEdit(){""!==this.editDescription&&0!==this.editContacts.length&&""!==this.editLongitude&&""!==this.editLongitude&&this.editHospitalSpecializations&&(this.details.push({description:this.editDescription,contacts:this.editContacts}),this.coordinates.push(this.editLongitude,this.editLatitude),this.activate?await $t.ZP.put(`/api/manager/${this.managerHospitalID}`,{details:this.details,specializations:this.editHospitalSpecializations,location:{type:"Point",coordinates:this.coordinates},status:"Active"}).catch((t=>this.errMsg=t)):await $t.ZP.put(`/api/manager/${this.managerHospitalID}`,{details:this.details,specializations:this.editHospitalSpecializations,location:{type:"Point",coordinates:this.coordinates}}).catch((t=>this.errMsg=t)),await $t.ZP.get("/api/manager").then((t=>this.hospitalData=t.data.find((t=>t._id==this.managerHospitalID)))),this.description=await this.hospitalData.details[0].description,this.contacts=await this.hospitalData.details[0].contacts,this.hospitalStatus=await this.hospitalData.status,this.latitude=await this.hospitalData.location.coordinates[1],this.longitude=await this.hospitalData.location.coordinates[0],this.hospitalSpecializations=await this.hospitalData.specializations,this.editingMode=!1,this.editDescription="",this.editContacts=[],this.editLongitude="",this.editLatitude="",this.editHospitalSpecializations=[],this.details=[],this.coordinates=[],this.activate=!1)}}},Et=a(3744);const Vt=(0,Et.Z)(Zt,[["render",xt],["__scopeId","data-v-6bfae7c3"]]);var Yt=Vt}}]);
//# sourceMappingURL=957.8dcb5e8a.js.map