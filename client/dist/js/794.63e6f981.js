"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[794],{9460:function(t,e,i){i.r(e),i.d(e,{default:function(){return Pt}});var a=i(6252),s=i(3577),n=i(9963);const l=t=>((0,a.dD)("data-v-ac514048"),t=t(),(0,a.Cn)(),t),o={class:"section"},c={key:0,class:"notification is-warning"},d=l((()=>(0,a._)("div",{class:"modal-background"},null,-1))),r=l((()=>(0,a._)("div",{class:"modal-content",style:{overflow:"hidden"}},[(0,a._)("div",{class:"loader",style:{margin:"auto"}})],-1))),p=[d,r],h=l((()=>(0,a._)("div",{class:"modal-background"},null,-1))),u={class:"modal-content box"},m={class:"section"},y=l((()=>(0,a._)("div",{class:"notification is-info"},"This schedule requires you to pay first before continuing!",-1))),_={class:"buttons is-centered"},g=l((()=>(0,a._)("div",{class:"modal-background"},null,-1))),b={class:"modal-content box"},f={class:"section"},D=l((()=>(0,a._)("div",{class:"notification is-info"},"You have an existing appointment with the same details, do you want to cancel your last appointment and make a new appointment?",-1))),v={class:"buttons is-centered"},k=l((()=>(0,a._)("div",{class:"modal-background"},null,-1))),w={class:"modal-content box"},C={class:"section"},N=l((()=>(0,a._)("div",{class:"notification is-info"},"You have an existing appointment with the same schedule but different details, do you still want to continue with your appointment?",-1))),A={class:"buttons is-centered"},S={class:"columns registration-form",style:{width:"75%",margin:"auto"}},x={class:"column"},I=l((()=>(0,a._)("div",{class:"block"},"Please enter the patient's information.",-1))),Z={key:0,class:"notification is-info"},P={class:"field is-horizontal"},L={class:"field-body"},U={class:"field"},F=l((()=>(0,a._)("label",{class:"label"},"First name",-1))),T={class:"control"},z={class:"field"},q=l((()=>(0,a._)("label",{class:"label"},"Last Name",-1))),M={class:"control"},V={class:"field is-horizontal"},Y={class:"field-body"},R={class:"field"},B=l((()=>(0,a._)("label",{class:"label"},"Contact Number:",-1))),E={class:"control"},H={class:"field"},W=l((()=>(0,a._)("label",{class:"label"},"Birthdate",-1))),$={class:"control"},K={class:"is-block"},Q=["onClick"],j=["value"],G={class:"field"},J={class:"control"},O=l((()=>(0,a._)("label",{class:"label"},"Current Address",-1))),X=["value"],tt={class:"field"},et=l((()=>(0,a._)("label",{class:"label"},"Reason for your visit:",-1))),it={class:"column",style:{position:"relative"}},at={class:"field"},st=l((()=>(0,a._)("h1",{class:"subtitle is-5 has-text-black has-text-weight-bold"},"Pick your preferred schedule: ",-1))),nt=l((()=>(0,a._)("div",{class:"block"},null,-1))),lt={class:"controls"},ot={class:"radio"},ct=["onClick"],dt={class:"subtitle is-6 has-text-weight-semibold"},rt=l((()=>(0,a._)("br",null,null,-1))),pt={class:"has-text-black"},ht={style:{"pointer-events":"none"},class:"button statusSched"},ut={key:0,class:"has-text-success"},mt={key:1,class:"has-text-danger"},yt={key:0,class:"block has-text-centered"},_t=l((()=>(0,a._)("hr",null,null,-1))),gt=l((()=>(0,a._)("h1",{class:"subtitle is-5 has-text-black has-text-weight-bold has-text-left"},"Let the doctor know what are you appointing for: ",-1))),bt={class:"select"},ft=["value"],Dt={class:"block has-text-centered"},vt=["disabled"];function kt(t,e,i,l,d,r){const kt=(0,a.up)("NavigationTab"),wt=(0,a.up)("CatchError"),Ct=(0,a.up)("v-date-picker");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a.Wm)(kt),(0,a._)("section",o,[(0,a.Wm)(wt,{"err-msg":d.errMsg},null,8,["err-msg"]),d.paymentFailed?((0,a.wg)(),(0,a.iD)("div",c,"Payment transaction failed. Please try again.")):(0,a.kq)("",!0),(0,a._)("div",{class:(0,s.C_)(["modal",{"is-active":d.isLoading}])},p,2),(0,a._)("div",{class:(0,s.C_)(["modal",{"is-active":d.paymentFirstToggle}])},[h,(0,a._)("div",u,[(0,a._)("section",m,[y,(0,a._)("div",_,[(0,a._)("button",{class:"button",onClick:e[0]||(e[0]=(...t)=>r.reloadPage&&r.reloadPage(...t))},"Cancel"),(0,a._)("button",{class:"button is-info",onClick:e[1]||(e[1]=t=>d.paymentFirstToggle=!1)},"Confirm")])])])],2),(0,a._)("div",{class:(0,s.C_)(["modal",{"is-active":d.doubleAppointmentID}])},[g,(0,a._)("div",b,[(0,a._)("section",f,[D,(0,a._)("div",v,[(0,a._)("button",{class:"button",onClick:e[2]||(e[2]=(...t)=>r.reloadPage&&r.reloadPage(...t))},"No"),(0,a._)("button",{class:"button is-info",onClick:e[3]||(e[3]=(...t)=>r.reAppointment&&r.reAppointment(...t))},"Yes")])])])],2),(0,a._)("div",{class:(0,s.C_)(["modal",{"is-active":d.multipleAppointment}])},[k,(0,a._)("div",w,[(0,a._)("section",C,[N,(0,a._)("div",A,[(0,a._)("button",{class:"button",onClick:e[4]||(e[4]=(...t)=>r.reloadPage&&r.reloadPage(...t))},"No"),(0,a._)("button",{class:"button is-info",onClick:e[5]||(e[5]=(...t)=>r.appoint&&r.appoint(...t))},"Yes")])])])],2),(0,a._)("div",S,[(0,a._)("div",x,[(0,a._)("form",null,[I,d.confirmDetails?((0,a.wg)(),(0,a.iD)("div",Z,"Before we continue, please confirm the patient's details to ensure they are correct as they cannot be changed later on.")):(0,a.kq)("",!0),(0,a._)("div",P,[(0,a._)("div",L,[(0,a._)("div",U,[F,(0,a._)("div",T,[(0,a.wy)((0,a._)("input",{class:(0,s.C_)(["input",{"is-info":d.confirmDetails}]),type:"text","onUpdate:modelValue":e[6]||(e[6]=t=>d.firstName=t),placeholder:"First Name",required:""},null,2),[[n.nr,d.firstName]])])]),(0,a._)("div",z,[q,(0,a._)("div",M,[(0,a.wy)((0,a._)("input",{class:(0,s.C_)(["input",{"is-info":d.confirmDetails}]),type:"text","onUpdate:modelValue":e[7]||(e[7]=t=>d.lastName=t),placeholder:"Last Name",required:""},null,2),[[n.nr,d.lastName]])])])])]),(0,a._)("div",V,[(0,a._)("div",Y,[(0,a._)("div",R,[B,(0,a._)("div",E,[(0,a.wy)((0,a._)("input",{class:(0,s.C_)(["input",{"is-info":d.confirmDetails}]),type:"number","onUpdate:modelValue":e[8]||(e[8]=t=>d.contactNum=t),placeholder:"Contact Number",required:""},null,2),[[n.nr,d.contactNum]])])]),(0,a._)("div",H,[W,(0,a._)("div",$,[(0,a.Wm)(Ct,{class:"block",modelValue:d.birthDay,"onUpdate:modelValue":e[9]||(e[9]=t=>d.birthDay=t),"max-date":new Date},{default:(0,a.w5)((({inputValue:t,togglePopover:e})=>[(0,a._)("div",K,[(0,a._)("a",{style:{margin:"auto"},onClick:t=>e()},[(0,a._)("input",{style:{cursor:"pointer"},value:t,class:(0,s.C_)(["input",{"is-info":d.confirmDetails}]),readonly:""},null,10,j)],8,Q)])])),_:1},8,["modelValue","max-date"])])])])]),(0,a._)("div",G,[(0,a._)("div",J,[O,(0,a._)("input",{class:(0,s.C_)(["input",{"is-info":d.confirmDetails}]),type:"text",value:d.currentAddress},null,10,X)])]),(0,a._)("div",tt,[et,(0,a.wy)((0,a._)("textarea",{class:(0,s.C_)(["textarea",{"is-info":d.confirmDetails}]),style:{"white-space":"pre-wrap"},"onUpdate:modelValue":e[10]||(e[10]=t=>d.comments=t),placeholder:"Your symptoms, general well being etc...",required:""},null,2),[[n.nr,d.comments]])])])]),(0,a._)("div",it,[(0,a._)("form",at,[st,((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(d.doctorSched,((t,e)=>((0,a.wg)(),(0,a.iD)("div",{key:t.id,style:{width:"75%",margin:"auto"}},[nt,(0,a._)("div",lt,[(0,a._)("label",ot,[(0,a._)("input",{type:"radio",class:"radioSched",name:"schedule",onClick:i=>r.pickSched(e,t,t.prefix,t.appointmentCategories,t.paymentAmount)},null,8,ct),(0,a._)("span",dt," "+(0,s.zw)(new Date(t.date).toDateString()),1),rt,(0,a._)("span",pt,(0,s.zw)(t.timeStart)+" - "+(0,s.zw)(t.timeEnd),1)]),(0,a._)("a",ht,[d.schedAvailability?((0,a.wg)(),(0,a.iD)("span",ut,"Available")):((0,a.wg)(),(0,a.iD)("span",mt,"Unavailable"))])])])))),128))]),0!==d.appointmentCategories.length?((0,a.wg)(),(0,a.iD)("div",yt,[_t,gt,(0,a._)("div",bt,[(0,a.wy)((0,a._)("select",{"onUpdate:modelValue":e[11]||(e[11]=t=>d.appointmentCategory=t)},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(d.appointmentCategories,(t=>((0,a.wg)(),(0,a.iD)("option",{key:t,value:t},(0,s.zw)(t),9,ft)))),128))],512),[[n.bM,d.appointmentCategory]])])])):(0,a.kq)("",!0),(0,a._)("div",Dt,[(0,a._)("button",{type:"button",class:"button is-info",disabled:null==d.comments||null==d.schedule||""==d.firstName||""==d.lastName||null==d.birthDay||""==d.contactNum||""==d.comments||""==d.currentAddress,onClick:e[12]||(e[12]=t=>d.confirmDetails?r.checkAppointmentDuplication():d.confirmDetails=!0)},"Submit appointment",8,vt)])])])])],64)}var wt=i(6154),Ct=i(4239),Nt=i(465),At=i(7787),St=i(3343),xt={name:"RegForm",components:{NavigationTab:Nt.Z,CatchError:At.Z},data(){return{checkPatientRecord:null,patient:null,doctorSched:Ct.Z.state.doctorDetails.schedule,firstName:null,lastName:null,birthDay:null,comments:null,contactNum:null,schedule:null,currentAddress:null,priorityNum:null,patientsAppointed:null,doctorDetails:Ct.Z.state.doctorDetails,pickedSpecialization:Ct.Z.state.pickedSpecialization,isLoading:!1,schedAvailability:!1,radioIndex:null,prefix:null,hospital:Ct.Z.state.hospitalName,refID:null,errMsg:"",initialScheduleCheck:!0,appointmentCategory:"",appointmentCategories:[],client:(0,St.Z)("sk_test_Y6nQ7BnqHoe8Ua4Q9ytu7rb4"),checkoutUrl:"",paymentFirstToggle:!1,paymentAmount:"",paymentFailed:!1,paymentStatus:Ct.Z.state.paymentStatus,paymentSuccesPatientDetails:Ct.Z.state.patientDetails,paymentWindowWaiting:!1,doubleAppointmentID:!1,multipleAppointment:!1,confirmDetails:!1}},async created(){"pending"!==this.paymentStatus&&"failed"==this.paymentStatus&&(this.paymentFailed=!0,Ct.Z.commit("paymentStatus","pending"))},async mounted(){this.doctorSched=this.doctorSched.filter((t=>new Date(t.date).getTime()>(new Date).getTime()&&t.hospital===this.hospital)).sort(((t,e)=>new Date(t.date).getTime()-new Date(e.date).getTime())),await wt.Z.get("/session/patient").then((t=>this.patient=t.data)),this.firstName=await this.patient.name[0],this.lastName=await this.patient.name[1],this.checkPatientRecord=await this.doctorDetails.patients.find((t=>t.patient===this.patient._id)),this.currentAddress=await this.patient.currentAddress;for await(const[t,e]of this.doctorSched.entries())await this.pickSched(t,e,e.prefix,e.appointmentCategories,e.paymentAmount);this.initialScheduleCheck=!1},methods:{async checkAppointmentDuplication(){this.confirmDetails=!1;try{await wt.Z.post("/api/appointmentList/check-double-appointment",{firstName:this.firstName,lastName:this.lastName,schedule:this.schedule,patientID:this.patient._id,doctorID:this.doctorDetails._id}).then((t=>t.data?this.doubleAppointmentID=t.data:this.doubleAppointmentID=!1)),this.doubleAppointmentID||await wt.Z.post("/api/appointmentList/check-multiple-appointment",{schedule:this.schedule,patientID:this.patient._id,doctorID:this.doctorDetails._id}).then((t=>t.data?this.multipleAppointment=!0:this.multipleAppointment=!1))}catch(t){this.errMsg=t}this.doubleAppointmentID||this.multipleAppointment||await this.appoint()},async reAppointment(){await wt.Z["delete"](`/api/appointmentList/${this.doubleAppointmentID}`).catch((t=>this.errMsg=t)),this.doubleAppointmentID=!1,await this.appoint()},async appoint(){this.isLoading=!0;let t=document.getElementsByClassName("radioSched"),e=document.getElementsByClassName("statusSched");if(await wt.Z.post("/api/appointmentList/doctors/checkPriority",{doctorID:this.doctorDetails._id,schedule:this.schedule.date}).then((t=>this.patientsAppointed=t.data)),await this.patientsAppointed<this.schedule.appointmentLimit){await wt.Z.post("/api/appointmentList/doctors/checkPriority",{doctorID:this.doctorDetails._id,schedule:this.schedule.date}).then((t=>this.priorityNum=t.data+1));try{"undefined"!==typeof this.checkPatientRecord&&this.checkPatientRecord||await wt.Z.post("/api/patientUpdate",{doctorID:this.doctorDetails._id,patientID:this.patient._id,patientFullName:this.firstName+" "+this.lastName}),this.generateRefID(),await wt.Z.put(`/api/manager/${Ct.Z.state.hospitalDetails._id}`,{engagements:Ct.Z.state.hospitalDetails.engagements+5}),await wt.Z.post("/api/appointmentList",{referenceID:this.refID,hospital:this.hospital,doctorID:this.doctorDetails._id,doctorName:this.doctorDetails.name,doctorSpecialization:this.pickedSpecialization,patientID:this.patient._id,firstName:this.firstName,lastName:this.lastName,contactNum:this.contactNum,birthDay:this.birthDay.toDateString(),comments:this.comments,schedule:this.schedule,priorityNum:this.prefix?this.prefix+"-"+this.priorityNum:this.priorityNum,appointmentCategory:this.appointmentCategory}).then((async t=>{Ct.Z.commit("patientDetails",t.data),await this.createSource()}))}catch(i){this.errMsg=i}}else this.schedAvailability=!1,this.schedule=null,t[this.radioIndex].checked=!1,t[this.radioIndex].disabled=!0,e[this.radioIndex].style.display="block";this.isLoading=!1},async pickSched(t,e,i,a,s){this.appointmentCategory=a[0],this.initialScheduleCheck||(this.appointmentCategories=a),this.radioIndex=t,this.isLoading=!0;let n=document.getElementsByClassName("radioSched"),l=document.getElementsByClassName("statusSched");for(let o=0;o<l.length;o++)l[o].style.display="none";this.schedule=await e,await wt.Z.post("/api/appointmentList/doctors/checkPriority",{doctorID:this.doctorDetails._id,schedule:this.schedule.date}).then((t=>this.patientsAppointed=t.data)),await this.patientsAppointed<this.schedule.appointmentLimit?(this.isLoading=!1,this.initialScheduleCheck||(this.schedAvailability=!0,this.prefix=i,l[t].style.display="block",this.paymentFirstToggle=!0,this.paymentAmount=s)):(this.isLoading=!1,this.schedAvailability=!1,this.schedule=null,n[t].checked=!1,l[t].style.display="block",this.paymentAmount="",this.initialScheduleCheck&&(this.doctorSched=this.doctorSched.filter((t=>t!=e)))),this.initialScheduleCheck&&(this.schedule=null)},generateRefID(){let t="";for(let e=0;e<6;e++)t+=Math.floor(9*Math.random());this.refID=t.toUpperCase()},async createSource(){const t=location.origin;try{await this.client.source.create({type:"gcash",currency:"PHP",amount:parseInt(`${this.paymentAmount}00`),redirect:{success:`${t}/payment-status`,failed:`${t}/payment-status`}}).then((t=>{this.checkoutUrl=t.data.attributes.redirect.checkout_url,Ct.Z.commit("paymentID",t.data.id)})),this.checkoutUrl&&window.location.replace(this.checkoutUrl)}catch(e){this.isLoading=!1,this.errMsg=e}},reloadPage(){location.reload()}}},It=i(3744);const Zt=(0,It.Z)(xt,[["render",kt],["__scopeId","data-v-ac514048"]]);var Pt=Zt}}]);
//# sourceMappingURL=794.63e6f981.js.map