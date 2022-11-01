"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[823],{7787:function(t,e,s){s.d(e,{Z:function(){return r}});var a=s(6252),i=s(2262),l=s(3577);const o={key:0,class:"notification is-danger"};var n={__name:"CatchError",props:{errMsg:null},setup(t){const e=t,s=(0,a.Fl)((()=>e.errMsg));return(t,e)=>{const n=(0,a.up)("router-link");return(0,i.SU)(s)?((0,a.wg)(),(0,a.iD)("div",o,[(0,a.Uk)("Sorry, something went wrong. "+(0,l.zw)((0,i.SU)(s).message)+", please try again later or ",1),(0,a.Wm)(n,{to:"/contactus"},{default:(0,a.w5)((()=>[(0,a.Uk)("contact us")])),_:1}),(0,a.Uk)(". ")])):(0,a.kq)("",!0)}}};const c=n;var r=c},9226:function(t,e,s){s.d(e,{Z:function(){return x}});var a=s(6252),i=s(3577);const l=t=>((0,a.dD)("data-v-45fdf8bd"),t=t(),(0,a.Cn)(),t),o={class:"navbar is-hidden-desktop"},n={class:"navbar-brand"},c={class:"navbar-item"},r={class:"label"},d=l((()=>(0,a._)("span",{"aria-hidden":"true"},null,-1))),u=l((()=>(0,a._)("span",{"aria-hidden":"true"},null,-1))),h=l((()=>(0,a._)("span",{"aria-hidden":"true"},null,-1))),p=[d,u,h],g={class:"has-text-centered block",style:{padding:"5px"}},m={class:"is-hidden-mobile is-hidden-touch image image-outer is-square",style:{margin:"auto"}},_=["src"],b={key:0,class:"title is-6"},v={class:"menu-list block"},f=l((()=>(0,a._)("p",{class:"menu-label"},"General",-1))),y=l((()=>(0,a._)("p",{class:"menu-label"},"Verification and Information",-1))),w=l((()=>(0,a._)("p",{class:"menu-label"},"Support",-1))),k={class:"block has-text-centered"};function D(t,e,s,l,d,u){return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a._)("nav",o,[(0,a._)("div",n,[(0,a._)("a",c,[(0,a._)("label",r,"Dr. "+(0,i.zw)(t.$store.state.doctorName),1)]),(0,a._)("a",{role:"button",class:(0,i.C_)(["navbar-burger",{"is-active":!d.isActive}]),"aria-label":"menu","aria-expanded":"false","data-target":"navbar",onClick:e[0]||(e[0]=(...t)=>u.menuNav&&u.menuNav(...t))},p,2)])]),(0,a._)("aside",{class:(0,i.C_)(["menu box",{"is-hidden-mobile":d.isActive,fixedMenu:d.isActive}]),style:{"background-color":"#D8E5FF",padding:"20px"}},[(0,a._)("div",g,[(0,a._)("figure",m,[(0,a._)("img",{class:"is-rounded image-inner",src:`http://res.cloudinary.com/leindfraust/image/upload/v${(new Date).getMonth()}${(new Date).getDate()}/assets/doctors/${d.alias}.jpg`},null,8,_)]),d.isActive?((0,a.wg)(),(0,a.iD)("h5",b,"Dr. "+(0,i.zw)(t.$store.state.doctorName),1)):(0,a.kq)("",!0)]),(0,a._)("ul",v,[f,(0,a._)("li",null,[(0,a._)("a",{onClick:e[1]||(e[1]=(...t)=>u.routeHome&&u.routeHome(...t))},"Appointments")]),(0,a._)("li",null,[(0,a._)("a",{onClick:e[2]||(e[2]=(...t)=>u.openPatientHistory&&u.openPatientHistory(...t))},"Appointment History")]),(0,a._)("li",null,[(0,a._)("a",{onClick:e[3]||(e[3]=(...t)=>u.openPatientAppointmentsCancelled&&u.openPatientAppointmentsCancelled(...t))},"Cancelled Appointments")]),(0,a._)("li",null,[(0,a._)("a",{onClick:e[4]||(e[4]=(...t)=>u.openSchedule&&u.openSchedule(...t))},"Schedule")]),y,(0,a._)("li",null,[(0,a._)("a",{onClick:e[5]||(e[5]=(...t)=>u.openProfile&&u.openProfile(...t))},"Profile")]),(0,a._)("li",null,[(0,a._)("a",{onClick:e[6]||(e[6]=(...t)=>u.openSecurity&&u.openSecurity(...t))},"Security")]),w,(0,a._)("li",null,[(0,a._)("a",{onClick:e[7]||(e[7]=(...e)=>t.openFAQs&&t.openFAQs(...e))},"FAQ")]),(0,a._)("li",null,[(0,a._)("a",{onClick:e[8]||(e[8]=t=>this.$router.push("/contactus"))},"Contact Us")])]),(0,a._)("div",k,[(0,a._)("button",{onClick:e[9]||(e[9]=(...t)=>u.logout&&u.logout(...t)),class:"button is-link is-rounded",type:"button"},"Logout")])],2)],64)}var C=s(4239),M=s(196),P={name:"AdminMenu",data(){return{alias:C.Z.state.alias,isActive:!0}},methods:{async logout(){C.Z.commit("alias",null),await M.ZP["delete"]("/session/doctor"),await this.$router.push("/doctor/login")},async routeHome(){await this.$router.push(`/doctor/${this.alias}/appointments`)},async openProfile(){await this.$router.push(`/doctor/${this.alias}/profile`)},async openPatientHistory(){await this.$router.push(`/doctor/${this.alias}/appointments/history`)},async openPatientAppointmentsCancelled(){await this.$router.push(`/doctor/${this.alias}/appointments/cancelled`)},async openSecurity(){await this.$router.push(`/doctor/${this.alias}/security`)},async openSchedule(){await this.$router.push(`/doctor/${this.alias}/schedule`)},menuNav(){this.isActive=!this.isActive}}},S=s(3744);const N=(0,S.Z)(P,[["render",D],["__scopeId","data-v-45fdf8bd"]]);var x=N},3823:function(t,e,s){s.r(e),s.d(e,{default:function(){return xt}});var a=s(6252),i=s(3577),l=s(9963);const o={class:"main-doctor"},n={class:"columns"},c={class:"column is-2"},r={class:"column"},d=(0,a._)("div",{class:"modal-background"},null,-1),u={class:"modal-content"},h={class:"section box"},p={class:"field is-horizontal"},g={class:"field-body"},m={class:"field"},_={class:"control"},b=(0,a._)("label",{class:"label"},"From:",-1),v=["value"],f={class:"field"},y={class:"control"},w=(0,a._)("div",{class:"label"},"To(Patient):",-1),k=["value"],D={class:"field"},C={class:"control"},M=(0,a._)("label",{class:"label"},"Attach an image(optional):",-1),P={class:"field"},S={class:"control"},N=(0,a._)("label",{class:"label"},"Subject: ",-1),x={class:"field"},I={class:"control"},$=(0,a._)("label",{class:"label"},"Message:",-1),A={class:"field"},H={class:"control has-text-right"},Z=["disabled"],z={key:0,class:"has-text-success"},U=(0,a._)("p",{class:"subtitle"},"Messaging History",-1),F={key:1,class:"container"},j=(0,a._)("p",{class:"subtitle is-size-6 has-text-right"},"Are you sure you want to delete all messages?",-1),B={class:"buttons is-right"},L={key:2},q={class:"notification",style:{margin:"5%"}},T={class:"content"},Y={key:0},E={class:"image is-square"},O=["src"],R={class:"has-text-centered"},V=["href"],K=(0,a._)("br",null,null,-1),Q=["onClick"],W={key:3},G=(0,a._)("p",null,"No past messages yet.",-1),J=[G],X={class:"section"},tt={class:"container is-widescreen is-fullhd",style:{padding:"15"}},et=(0,a._)("h1",{class:"title"}," APPOINTMENT HISTORY ",-1),st={key:0,class:"field"},at={class:"control"},it={key:1,class:"container"},lt={class:"subtitle has-text-black"},ot={class:"table-container"},nt={class:"table is-fullwidth"},ct=(0,a._)("thead",null,[(0,a._)("tr",null,[(0,a._)("th",{class:"has-text-black-ter"},"Controls"),(0,a._)("th",{class:"has-text-black-ter"},"Reference ID"),(0,a._)("th",{class:"has-text-black-ter"},"Priority No."),(0,a._)("th",{class:"has-text-black-ter"},"Hospital Appointed"),(0,a._)("th",{class:"has-text-black-ter"},"First Name"),(0,a._)("th",{class:"has-text-black-ter"},"Last Name"),(0,a._)("th",{class:"has-text-black-ter"},"Contact Number"),(0,a._)("th",{class:"has-text-black-ter"},"Birthday"),(0,a._)("th",{class:"has-text-black-ter"},"Symptoms/Comments")])],-1),rt=["onClick"],dt={class:"has-text-black-ter"},ut={class:"has-text-black-ter"},ht={class:"has-text-black-ter"},pt={class:"has-text-black-ter"},gt={class:"has-text-black-ter"},mt={class:"has-text-black-ter"},_t={class:"has-text-black-ter"},bt={class:"has-text-black-ter",style:{"white-space":"pre-wrap"}},vt={key:2,class:"notification is-info"};function ft(t,e,s,G,ft,yt){const wt=(0,a.up)("DoctorMenu"),kt=(0,a.up)("CatchError");return(0,a.wg)(),(0,a.iD)("div",o,[(0,a._)("div",n,[(0,a._)("div",c,[(0,a.Wm)(wt)]),(0,a._)("div",r,[(0,a._)("div",{class:(0,i.C_)(["modal",{"is-active":ft.isActiveModal}])},[d,(0,a._)("div",u,[(0,a._)("div",h,[(0,a._)("div",p,[(0,a._)("div",g,[(0,a._)("div",m,[(0,a._)("div",_,[b,(0,a._)("input",{class:"input",type:"text",value:"Dr. "+ft.doctorName,disabled:""},null,8,v)])]),(0,a._)("div",f,[(0,a._)("div",y,[w,(0,a._)("input",{class:"input",type:"text",value:ft.selectedPatient,disabled:""},null,8,k)])])])]),(0,a._)("div",D,[(0,a._)("div",C,[M,(0,a._)("input",{class:"input",type:"file",onChange:e[0]||(e[0]=t=>yt.handleFile(t))},null,32)])]),(0,a._)("div",P,[(0,a._)("div",S,[N,(0,a.wy)((0,a._)("input",{class:"input",type:"text",placeholder:"Subject","onUpdate:modelValue":e[1]||(e[1]=t=>ft.titleMsg=t)},null,512),[[l.nr,ft.titleMsg]])])]),(0,a._)("div",x,[(0,a._)("div",I,[$,(0,a.wy)((0,a._)("textarea",{class:"textarea",placeholder:"Message","onUpdate:modelValue":e[2]||(e[2]=t=>ft.noticeMsg=t)},"default value",512),[[l.nr,ft.noticeMsg]])])]),(0,a._)("div",A,[(0,a._)("div",H,[(0,a._)("button",{class:(0,i.C_)(["button is-primary",{"is-loading":ft.loadingButton}]),onClick:e[3]||(e[3]=(...t)=>yt.sendNotif&&yt.sendNotif(...t)),disabled:""==ft.selectedPatient||""==ft.noticeMsg},"Send",10,Z)])]),ft.notificationSent?((0,a.wg)(),(0,a.iD)("p",z,[(0,a.Uk)(" A message has been sent to "),(0,a._)("b",null,(0,i.zw)(ft.messageSuccessSelectedPatient),1),(0,a.Uk)(". ")])):(0,a.kq)("",!0),(0,a._)("a",{class:"button is-size-6 has-text-danger is-pulled-right",onClick:e[4]||(e[4]=t=>ft.clearMsgPrompt=!0)},"Clear message history"),U,ft.clearMsgPrompt?((0,a.wg)(),(0,a.iD)("div",F,[j,(0,a._)("div",B,[(0,a._)("button",{class:"button",onClick:e[5]||(e[5]=(...t)=>yt.clearNotif&&yt.clearNotif(...t))},"Yes"),(0,a._)("button",{class:"button",onClick:e[6]||(e[6]=t=>ft.clearMsgPrompt=!1)},"No")])])):(0,a.kq)("",!0),0!==Object.keys(ft.messageHistory).length?((0,a.wg)(),(0,a.iD)("div",L,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(ft.messageHistory,((e,s)=>((0,a.wg)(),(0,a.iD)("div",{class:"container",key:s},[(0,a._)("div",q,[(0,a._)("div",T,[(0,a._)("p",null,"To: "+(0,i.zw)(e.to),1),(0,a._)("p",null,"Subject: "+(0,i.zw)(e.subject),1),(0,a._)("p",null,"Message: "+(0,i.zw)(e.message),1),e.id?((0,a.wg)(),(0,a.iD)("div",Y,[(0,a._)("figure",E,[(0,a._)("img",{loading:"lazy",src:`https://res.cloudinary.com/leindfraust/image/upload/v1/assets/patientimgmsg/doctorCopy/${t.$store.state.doctorID+e.id}.jpg`},null,8,O)]),(0,a._)("div",R,[(0,a._)("a",{href:`https://res.cloudinary.com/leindfraust/image/upload/v1/assets/patientimgmsg/doctorCopy/${t.$store.state.doctorID+e.id}.jpg`,class:"button",download:""},"Download File",8,V)])])):(0,a.kq)("",!0),K,(0,a._)("p",null,"Date: "+(0,i.zw)(new Date(e.date).toLocaleString()),1)]),(0,a._)("button",{class:"delete",onClick:t=>yt.deleteNotif(e)},null,8,Q)])])))),128))])):((0,a.wg)(),(0,a.iD)("div",W,J))])]),(0,a._)("button",{class:"modal-close is-large","aria-label":"close",onClick:e[7]||(e[7]=(...t)=>yt.sendNotifInactive&&yt.sendNotifInactive(...t))})],2),(0,a._)("section",X,[(0,a.Wm)(kt,{"err-msg":ft.errMsg},null,8,["err-msg"]),(0,a._)("div",tt,[et,0!==ft.appointmentSched.length?((0,a.wg)(),(0,a.iD)("div",st,[(0,a._)("div",at,[(0,a.wy)((0,a._)("input",{class:"input",type:"text",style:{width:"50% !important"},"onUpdate:modelValue":e[8]||(e[8]=t=>ft.searchBar=t),placeholder:"Search..."},null,512),[[l.nr,ft.searchBar]])])])):(0,a.kq)("",!0),0!==Object.keys(yt.appointmentSchedules).length?((0,a.wg)(),(0,a.iD)("div",it,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(yt.appointmentSchedules,((t,e)=>((0,a.wg)(),(0,a.iD)("div",{class:(0,i.C_)(["box",{"is-hidden":new Date(e).toDateString()==(new Date).toDateString()}]),key:e},[(0,a._)("h1",lt,"Schedule: "+(0,i.zw)(new Date(e).toDateString()),1),(0,a._)("div",ot,[(0,a._)("table",nt,[ct,(0,a._)("tbody",null,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t,(t=>((0,a.wg)(),(0,a.iD)("tr",{key:t._id},[(0,a._)("button",{class:"button is-info is-light",onClick:e=>yt.sendNotifActive(t.patientID,t.firstName,t.lastName)},"Send a notification",8,rt),(0,a._)("th",dt,(0,i.zw)(t.referenceID),1),(0,a._)("th",ut,(0,i.zw)(t.priorityNum),1),(0,a._)("th",ht,(0,i.zw)(t.hospital),1),(0,a._)("td",pt,(0,i.zw)(t.firstName),1),(0,a._)("td",gt,(0,i.zw)(t.lastName),1),(0,a._)("td",mt,(0,i.zw)(t.contactNum),1),(0,a._)("td",_t,(0,i.zw)(t.birthDay),1),(0,a._)("td",bt,(0,i.zw)(t.comments),1)])))),128))])])])],2)))),128))])):((0,a.wg)(),(0,a.iD)("div",vt,"No previous appointments."))])])])])])}var yt=s(196),wt=s(7739),kt=s.n(wt),Dt=s(7787),Ct=s(9226),Mt=s(4058),Pt={name:"PatientLogs",components:{DoctorMenu:Ct.Z,CatchError:Dt.Z},async mounted(){await yt.ZP.post("/api/appointmentList/doctors",{id:this.$store.state.doctorID,ongoing:!1}).then((t=>this.appointmentSched=t.data)),await yt.ZP.get("/session/doctor").then((t=>this.doctorName=t.data.fullname)),await yt.ZP.get("/session/doctor").then((t=>this.messageHistory=t.data.messageHistory.reverse()))},data(){return{errMsg:"",clearMsgPrompt:!1,loadingButton:!1,searchBar:"",appointmentSched:[],alias:this.$store.state.alias,file:null,isActiveModal:!1,selectedPatient:"",messageSuccessSelectedPatient:"",refID:"",doctorName:"",titleMsg:"",noticeMsg:"Dear",notificationSent:!1,messageHistory:[]}},computed:{appointmentSchedules(){return!!this.appointmentSched&&kt()(this.appointmentSched.filter((t=>t.firstName.toLowerCase().includes(this.searchBar.toLowerCase())||t.lastName.toLowerCase().includes(this.searchBar.toLowerCase())||t.referenceID.toLowerCase().includes(this.searchBar.toLowerCase()))).sort(((t,e)=>new Date(e.schedule[0].date).getTime()-new Date(t.schedule[0].date).getTime())),"schedule[0].date")}},methods:{sendNotifActive(t,e,s){this.isActiveModal=!0,this.selectedPatient=e+" "+s,this.noticeMsg=`Dear Ms/Mr. ${this.selectedPatient},`,Mt.Z.connect(),Mt.Z.emit("join room",t)},sendNotifInactive(){this.isActiveModal=!1,this.selectedPatient="",Mt.Z.disconnect()},generateRefID(){let t="",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",s=e.length;for(let a=0;a<12;a++)t+=e.charAt(Math.floor(Math.random()*s));this.refID=t},async sendNotif(){if(this.loadingButton=!0,this.file){this.generateRefID();const t=new FormData;t.append("id",this.refID),t.append("doctorID",this.$store.state.doctorID),t.append("imgFile",this.file),await yt.ZP.post("/api/imgUploadImgMsg",t,{headers:{"Content-Type":"multipart/form-data"}})}else this.refID=null;let t;this.messageSuccessSelectedPatient=this.selectedPatient,Mt.Z.emit("message",this.refID,this.titleMsg,this.noticeMsg,this.doctorName,new Date),await yt.ZP.post("/api/pushMsg",{id:this.$store.state.doctorID,message:{id:this.refID,to:this.selectedPatient,subject:this.titleMsg,message:this.noticeMsg,date:new Date}}).then((e=>t=e.data)).catch((t=>this.errMsg=t)),await yt.ZP.put("/session/doctor",{messageHistory:t}),this.messageHistory=t.reverse(),this.noticeMsg="",this.notificationSent=!0,this.loadingButton=!1},async deleteNotif(t){let e;try{await yt.ZP.post("/api/imgUploadImgMsgDeleteDoctor",{doctorID:"assets/patientimgmsg/doctorCopy/"+this.$store.state.doctorID,id:t.id}),await yt.ZP.post("/api/pullMsg",{id:this.$store.state.doctorID,message:t}).then((t=>e=t.data)).catch((t=>{this.errMsg=t})),await yt.ZP.put("/session/doctor",{messageHistory:e})}catch(s){this.errMsg=s}this.messageHistory=e.reverse()},async clearNotif(){try{await yt.ZP.post("/api/imgUploadImgMsgClearDoctor",{doctorID:this.$store.state.doctorID}),await yt.ZP.post("/api/clearMsg",{id:this.$store.state.doctorID}).then((t=>this.messageHistory=t.data)).catch((t=>this.errMsg=t)),await yt.ZP.put("/session/doctor",{messageHistory:this.messageHistory})}catch(t){this.errMsg=t}this.clearMsgPrompt=!1},handleFile(t){this.file=t.target.files[0]}}},St=s(3744);const Nt=(0,St.Z)(Pt,[["render",ft]]);var xt=Nt}}]);
//# sourceMappingURL=823.b59dc135.js.map