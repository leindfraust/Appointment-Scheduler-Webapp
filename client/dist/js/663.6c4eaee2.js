"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[663],{7787:function(i,t,s){s.d(t,{Z:function(){return r}});var a=s(6252),e=s(2262),o=s(3577);const n={key:0,class:"notification is-danger"};var l={__name:"CatchError",props:{errMsg:null},setup(i){const t=i,s=(0,a.Fl)((()=>t.errMsg));return(i,t)=>{const l=(0,a.up)("router-link");return(0,e.SU)(s)?((0,a.wg)(),(0,a.iD)("div",n,[(0,a.Uk)("Sorry, something went wrong. "+(0,o.zw)((0,e.SU)(s).message)+", please try again later or ",1),(0,a.Wm)(l,{to:"/contactus"},{default:(0,a.w5)((()=>[(0,a.Uk)("contact us")])),_:1}),(0,a.Uk)(". ")])):(0,a.kq)("",!0)}}};const c=l;var r=c},2666:function(i,t,s){s.d(t,{Z:function(){return hi}});var a=s(6252),e=s(3577),o=s(475);const n=i=>((0,a.dD)("data-v-7884d220"),i=i(),(0,a.Cn)(),i),l={class:"navbar",role:"navigation","aria-label":"main navigation"},c={class:"navbar-brand"},r=n((()=>(0,a._)("a",{class:"navbar-item",href:"/"},[(0,a._)("img",{src:o})],-1))),d=n((()=>(0,a._)("span",{"aria-hidden":"true"},null,-1))),u=n((()=>(0,a._)("span",{"aria-hidden":"true"},null,-1))),p=n((()=>(0,a._)("span",{"aria-hidden":"true"},null,-1))),m=[d,u,p],h={class:"navbar-start is-hidden-desktop"},v={class:"navbar-item"},g={class:"navbar-item"},w={key:0,class:"navbar-end"},k={key:0,class:"has-text-danger"},_={class:"fa-solid fa-bell animate__animated animate__heartBeat animate__infinite"},f={class:"is-size-7"},b={key:1,class:"has-text-info"},D=n((()=>(0,a._)("i",{class:"fa-solid fa-bell"},null,-1))),y=[D],C={key:0,class:"navbar-dropdown is-right notif-list"},$=["onClick"],z={class:"help"},U=["onClick"],A={key:1,class:"navbar-dropdown is-right"},N=n((()=>(0,a._)("div",{class:"navbar-item"},"No new notifications.",-1))),S=[N],x={key:0,class:"navbar-item is-hidden-mobile"},Z={key:0,class:"image"},M=["src"],P={key:1,class:"image"},I=["src"],L={class:"navbar-dropdown is-right"},q=n((()=>(0,a._)("hr",{class:"navbar-divider"},null,-1))),W=n((()=>(0,a._)("strong",null,"Logout",-1))),j=[W],B=n((()=>(0,a._)("i",{class:"fa-solid fa-bars"},null,-1))),H=[B],F={class:"navbar-dropdown is-right"},Y={key:1,class:"navbar-end"},T={class:"navbar-item"},G={class:"navbar-item"},K=n((()=>(0,a._)("strong",null,"Sign up",-1))),E=n((()=>(0,a._)("i",{class:"fa-solid fa-bars"},null,-1))),O=[E],R={class:"navbar-dropdown is-right"},V=n((()=>(0,a._)("a",{class:"navbar-item"},"About",-1))),J=n((()=>(0,a._)("div",{class:"modal-background"},null,-1))),Q={class:"modal-content box"},X={class:"section"},ii={class:"title"},ti={class:"subtitle"},si={class:"subtitle"},ai={key:0},ei={class:"image is-square"},oi=["src"],ni={class:"has-text-centered"},li=["href"];function ci(i,t,s,o,n,d){const u=(0,a.up)("router-link");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a._)("nav",l,[(0,a._)("div",c,[r,(0,a._)("a",{role:"button",class:(0,e.C_)(["navbar-burger",{"is-active":n.isActive}]),"aria-label":"menu","aria-expanded":"false","data-target":"navbar",onClick:t[0]||(t[0]=(...i)=>d.navbar&&d.navbar(...i))},m,2)]),(0,a._)("div",{id:"navbar",class:(0,e.C_)(["navbar-menu",{"is-active":n.isActive}])},[(0,a._)("div",h,[(0,a._)("div",v,[(0,a.Wm)(u,{to:"/about",class:"button is-dark is-inverted"},{default:(0,a.w5)((()=>[(0,a.Uk)("About")])),_:1})]),(0,a._)("div",g,[(0,a.Wm)(u,{to:"/contactus",class:"button is-dark is-inverted"},{default:(0,a.w5)((()=>[(0,a.Uk)("Contact")])),_:1})])]),""!=n.patient?((0,a.wg)(),(0,a.iD)("div",w,[(0,a._)("div",{class:(0,e.C_)(["navbar-item has-dropdown",{"is-active":n.isActiveNotifications}])},[(0,a._)("a",{class:"navbar-link",onClick:t[1]||(t[1]=(...i)=>d.notification&&d.notification(...i))},[n.notifications.find((i=>!0===i.new))?((0,a.wg)(),(0,a.iD)("span",k,[(0,a._)("i",_,[(0,a._)("span",f,(0,e.zw)(n.notifications.filter((i=>i.new)).length),1)])])):((0,a.wg)(),(0,a.iD)("span",b,y))]),0!==n.notifications.length?((0,a.wg)(),(0,a.iD)("div",C,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(n.notifications.sort(((i,t)=>new Date(t.date).getTime()-new Date(i.date).getTime())),((i,t)=>((0,a.wg)(),(0,a.iD)("div",{class:"navbar-item",key:t},[(0,a._)("div",{class:(0,e.C_)(["notification is-info",{"is-light":!i.new}])},[(0,a._)("a",{style:{"text-decoration":"none"},onClick:s=>d.openNotif(i,t)},[(0,a.Uk)((0,e.zw)(i.subject)+" ",1),(0,a._)("p",z,(0,e.zw)("Medic Search"==i.from?`From ${i.from}`:`From\n                                                                            Dr. ${i.from}`),1)],8,$),(0,a._)("button",{class:"delete",onClick:t=>d.deleteNotif(i)},null,8,U)],2)])))),128))])):((0,a.wg)(),(0,a.iD)("div",A,S))],2),(0,a._)("div",{class:(0,e.C_)(["navbar-item has-dropdown",{"is-active":n.isActiveProfileDropdown}]),onClick:t[3]||(t[3]=i=>n.isActiveProfileDropdown=!n.isActiveProfileDropdown)},[n.checkImgState?((0,a.wg)(),(0,a.iD)("a",x,[i.$store.state.checkProfileImg?((0,a.wg)(),(0,a.iD)("figure",Z,[(0,a._)("img",{class:"is-rounded",src:`https://res.cloudinary.com/leindfraust/image/upload/v${(new Date).getMonth()}${(new Date).getDate()}/assets/patients/${i.$store.state.patientUsername}.jpg`},null,8,M)])):((0,a.wg)(),(0,a.iD)("figure",P,[(0,a._)("img",{class:"is-rounded",src:`https://ui-avatars.com/api/?name=${this.$store.state.patientUsername}`},null,8,I)]))])):(0,a.kq)("",!0),(0,a._)("div",L,[(0,a.Wm)(u,{to:`/user/${n.patient}/profile`,class:"navbar-item"},{default:(0,a.w5)((()=>[(0,a.Uk)("Profile")])),_:1},8,["to"]),(0,a.Wm)(u,{to:`/user/${n.patient}/security`,class:"navbar-item"},{default:(0,a.w5)((()=>[(0,a.Uk)("Security")])),_:1},8,["to"]),q,(0,a._)("a",{class:"navbar-item has-text-danger",onClick:t[2]||(t[2]=(...i)=>d.logout&&d.logout(...i))},j)])],2),(0,a._)("div",{class:(0,e.C_)(["navbar-item has-dropdown is-hidden-mobile",{"is-active":n.isActiveMenuDropdown}])},[(0,a._)("a",{class:"navbar-item",onClick:t[4]||(t[4]=i=>n.isActiveMenuDropdown=!n.isActiveMenuDropdown)},H),(0,a._)("div",F,[(0,a.Wm)(u,{to:"/about",class:"navbar-item"},{default:(0,a.w5)((()=>[(0,a.Uk)("About")])),_:1}),(0,a.Wm)(u,{to:"/contactus",class:"navbar-item"},{default:(0,a.w5)((()=>[(0,a.Uk)("Contact Us")])),_:1})])],2)])):((0,a.wg)(),(0,a.iD)("div",Y,[(0,a._)("div",T,[(0,a.Wm)(u,{to:"/user/login",class:"button is-dark is-inverted",style:{"background-color":"transparent"}},{default:(0,a.w5)((()=>[(0,a.Uk)("Log in")])),_:1})]),(0,a._)("div",G,[(0,a.Wm)(u,{to:"/user/signup",class:"button is-info"},{default:(0,a.w5)((()=>[K])),_:1})]),(0,a._)("div",{class:(0,e.C_)(["navbar-item has-dropdown is-hidden-mobile",{"is-active":n.isActiveMenuDropdown}])},[(0,a._)("a",{class:"navbar-item",onClick:t[5]||(t[5]=i=>n.isActiveMenuDropdown=!n.isActiveMenuDropdown)},O),(0,a._)("div",R,[V,(0,a._)("a",{class:"navbar-item",onClick:t[6]||(t[6]=i=>this.$router.push("/contactus"))},"Contact Us")])],2)]))],2)]),(0,a._)("div",{class:(0,e.C_)(["modal",{"is-active":n.isActiveModal}])},[J,(0,a._)("div",Q,[(0,a._)("section",X,[(0,a._)("p",ii,(0,e.zw)("Medic Search"==n.viewNotif.from?`From ${n.viewNotif.from}`:`From\n                                    Dr. ${n.viewNotif.from}`),1),(0,a._)("p",ti,(0,e.zw)(new Date(n.viewNotif.date).toDateString()),1),(0,a._)("p",si,(0,e.zw)(n.viewNotif.message),1),n.viewNotif.id?((0,a.wg)(),(0,a.iD)("div",ai,[(0,a._)("figure",ei,[(0,a._)("img",{loading:"lazy",src:`https://res.cloudinary.com/leindfraust/image/upload/v1/assets/patientimgmsg/patientCopy/${n.viewNotif.id}.jpg`},null,8,oi)]),(0,a._)("div",ni,[(0,a._)("a",{href:`https://res.cloudinary.com/leindfraust/image/upload/v1/assets/patientimgmsg/patientCopy/${n.viewNotif.id}.jpg`,class:"button",download:""},"Download File",8,li)])])):(0,a.kq)("",!0)])]),(0,a._)("button",{class:"modal-close is-large","aria-label":"close",onClick:t[7]||(t[7]=(...i)=>d.closeNotificationModal&&d.closeNotificationModal(...i))})],2)],64)}var ri=s(196),di=s(4058),ui={name:"NavigationTab",async mounted(){await ri.ZP.get(`https://res.cloudinary.com/leindfraust/image/upload/v1/assets/patients/${this.$store.state.patientUsername}.jpg`).then((i=>200==i.status?this.$store.commit("checkProfileImg",!0):this.$store.commit("checkProfileImg",!1))).catch((i=>i?this.$store.commit("checkProfileImg",!1):this.$store.commit("checkProfileImg",!0))),this.checkImgState=!0,this.$store.state.patientID&&(di.Z.connect(),di.Z.emit("join room",this.$store.state.patientID),di.Z.on("send messages",(i=>{this.notifications=i})),di.Z.on("delete messages",(i=>{this.notifications=i})),di.Z.on("messages",(i=>{this.notifications=i})))},data(){return{isActiveNotifications:!1,isActiveModal:!1,isActiveProfileDropdown:!1,isActiveMenuDropdown:!1,isActive:!1,patient:this.$store.state.patientUsername,notifications:[],viewNotif:[],checkImgState:!1}},methods:{navbar(){this.isActive=!this.isActive},async logout(){await this.$store.commit("patientID",null),await this.$store.commit("patientUsername",""),await ri.ZP["delete"]("/session/patient"),await this.$router.push("/user/login"),di.Z.disconnect()},notification(){this.isActiveNotifications=!this.isActiveNotifications},async deleteNotif(i){await ri.ZP.post("/api/imgUploadImgMsgDeletePatient",{id:"assets/patientimgmsg/patientCopy/"+i.id}),di.Z.emit("delete message",this.$store.state.patientID,i)},openNotif(i,t){this.viewNotif=i,this.isActiveModal=!0,this.viewNotif.new&&(this.notifications[t].new=!1,di.Z.emit("update message",this.notifications))},closeNotificationModal(){this.isActiveModal=!1}}},pi=s(3744);const mi=(0,pi.Z)(ui,[["render",ci],["__scopeId","data-v-7884d220"]]);var hi=mi},998:function(i,t,s){s.r(t),s.d(t,{default:function(){return bi}});var a=s(6252),e=s(3577),o=s(9963);const n=i=>((0,a.dD)("data-v-367a4912"),i=i(),(0,a.Cn)(),i),l=n((()=>(0,a._)("div",{class:"block",style:{"box-shadow":"5px 5px 5px 5px whitesmoke"}}," ",-1))),c=n((()=>(0,a._)("div",{class:"modal-background"},null,-1))),r=n((()=>(0,a._)("div",{class:"modal-content",style:{overflow:"hidden"}},[(0,a._)("div",{class:"loader",style:{margin:"auto"}})],-1))),d=[c,r],u={key:0,class:"section"},p={class:"columns"},m={class:"column",id:"hospital-overview",style:{"border-right":"3px solid whitesmoke"}},h={class:"container is-fluid"},v={class:"title"},g={class:"subtitle"},w={class:"subtitle is-6"},k={class:"content"},_=n((()=>(0,a._)("b",null,"Type of Facility:",-1))),f={key:0},b={class:"subtitle is-6"},D=n((()=>(0,a._)("b",null,"Contacts:",-1))),y=n((()=>(0,a._)("br",null,null,-1))),C={class:"image is-16by9"},$=["src"],z={class:"column"},U={class:"container"},A={class:"block"},N={key:0,class:"block"},S=n((()=>(0,a._)("h1",{class:"title"},"Pick a specialist.",-1))),x={class:"subtitle"},Z={key:1,class:"columns is-multiline is-mobile"},M=["onClick"],P={key:0,class:"image is-4by3"},I=["src"],L={key:1,class:"subtitle has-text-centered"},q={key:2,class:"container"},W=n((()=>(0,a._)("i",{class:"fa-solid fa-arrow-left"},null,-1))),j={key:1},B=n((()=>(0,a._)("br",null,null,-1))),H=n((()=>(0,a._)("p",{class:"subtitle has-text-centered"},"No doctors are currently available in this specialization.",-1))),F=[B,H],Y={key:2},T=n((()=>(0,a._)("br",null,null,-1))),G=n((()=>(0,a._)("h1",{class:"title is-3"},"Choose a doctor:",-1))),K={class:"field"},E={class:"control"},O=n((()=>(0,a._)("br",null,null,-1))),R={key:3},V={key:0},J={class:"column"},Q={class:"image is-5by4"},X=["src"],ii={class:"column is-5"},ti={class:"content"},si={key:0,class:"has-text-weight-semibold"},ai={key:1,class:"has-text-weight-semibold"},ei=n((()=>(0,a._)("br",null,null,-1))),oi=n((()=>(0,a._)("br",null,null,-1))),ni={class:"subtitle is-6 has-text-info"},li={class:"column",style:{"margin-top":"auto"}},ci=["onClick"],ri={key:0,class:"notification"},di=n((()=>(0,a._)("hr",null,null,-1))),ui={key:1},pi={key:0,class:"notification is-info"};function mi(i,t,s,n,c,r){const B=(0,a.up)("NavigationTab"),H=(0,a.up)("CatchError"),mi=(0,a.up)("router-link");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a.Wm)(B),l,(0,a._)("div",{class:(0,e.C_)(["modal",{"is-active":c.isDoctorLoading}])},d,2),0!==c.hospitalDetails.length?((0,a.wg)(),(0,a.iD)("section",u,[(0,a.Wm)(H,{"err-msg":c.errMsg},null,8,["err-msg"]),(0,a._)("div",p,[(0,a._)("div",m,[(0,a._)("div",h,[(0,a._)("h1",v,(0,e.zw)(c.hospitalDetails.hospital),1),(0,a._)("p",g,(0,e.zw)(c.hospitalDetails.barangayORStreet)+", "+(0,e.zw)(c.hospitalDetails.city)+", "+(0,e.zw)(c.hospitalDetails.province),1),(0,a._)("p",w,(0,e.zw)(c.hospitalDetails.details[0].description),1),(0,a._)("div",k,[_,(0,a.Uk)(" "+(0,e.zw)(c.hospitalDetails.type)+" ",1),"undefined"!==typeof c.hospitalDetails.details[0].contacts?((0,a.wg)(),(0,a.iD)("span",f,[(0,a._)("p",b,[D,(0,a.Uk)(),((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(c.hospitalDetails.details[0].contacts,((i,t)=>((0,a.wg)(),(0,a.iD)("span",{key:t},(0,e.zw)(i.contact+" "),1)))),128))])])):(0,a.kq)("",!0)]),y,(0,a._)("figure",C,[(0,a._)("iframe",{class:"has-ratio",src:`https://maps.google.com/maps?q=${c.hospitalDetails.location.coordinates[1]},${c.hospitalDetails.location.coordinates[0]}&hl=es;z=14&output=embed`},null,8,$)])])]),(0,a._)("div",z,[(0,a._)("div",U,[(0,a._)("div",A,[c.specializationClicked?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("div",N,[S,(0,a._)("p",x,[(0,a.Uk)(" Having trouble picking a specialist? Get appointed to a "),(0,a._)("a",{class:"has-text-link",onClick:t[0]||(t[0]=i=>r.getDoctors("General Practitioner"))},"General Practitioner"),(0,a.Uk)(". ")])])),c.specializationClicked?((0,a.wg)(),(0,a.iD)("div",q,[c.typeClinic?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("a",{key:0,class:"subtitle has-text-link",onClick:t[1]||(t[1]=i=>c.specializationClicked=!1)},[W,(0,a.Uk)(" Back")])),""==c.doctorList?((0,a.wg)(),(0,a.iD)("div",j,F)):((0,a.wg)(),(0,a.iD)("div",Y,[T,G,(0,a._)("div",K,[(0,a._)("div",E,[(0,a.wy)((0,a._)("input",{class:"input",type:"text","onUpdate:modelValue":t[2]||(t[2]=i=>c.doctorSearchBar=i),placeholder:"Search..."},null,512),[[o.nr,c.doctorSearchBar]])])])])),O,c.specializationClicked?((0,a.wg)(),(0,a.iD)("div",R,[0!==Object.keys(r.doctorSearch).length?((0,a.wg)(),(0,a.iD)("div",V,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(r.doctorSearch,(t=>((0,a.wg)(),(0,a.iD)("div",{class:"columns",key:t._id},[(0,a._)("div",J,[(0,a._)("figure",Q,[(0,a._)("img",{src:`http://res.cloudinary.com/leindfraust/image/upload/v1/assets/doctors/${t.alias}.jpg`},null,8,X)])]),(0,a._)("div",ii,[(0,a._)("div",ti,[(0,a._)("h5",null,(0,e.zw)(t.name),1),(0,a._)("p",null,[c.pickedSpecialist?((0,a.wg)(),(0,a.iD)("span",si,(0,e.zw)(c.pickedSpecialist),1)):((0,a.wg)(),(0,a.iD)("span",ai,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t.specialist,(i=>((0,a.wg)(),(0,a.iD)("span",{key:i},[(0,a.Uk)((0,e.zw)(i)+" ",1),ei])))),128))])),oi,(0,a._)("span",ni,"("+(0,e.zw)(null==t.visits?"0 visits":`${t.visits} visits`)+")",1)])])]),(0,a._)("div",li,[null!==i.$store.state.patientID?((0,a.wg)(),(0,a.iD)("button",{key:0,class:"button is-info is-rounded",onClick:i=>r.pickDoctor(t,c.pickedSpecialist)},"Book an Appointment",8,ci)):(0,a.kq)("",!0)])])))),128)),null==i.$store.state.patientID?((0,a.wg)(),(0,a.iD)("div",ri,[(0,a.Wm)(mi,{to:"/user/login",class:"has-text-weight-bold"},{default:(0,a.w5)((()=>[(0,a.Uk)("Login")])),_:1}),(0,a.Uk)(" or "),(0,a.Wm)(mi,{to:"/user/signup",class:"has-text-weight-bold"},{default:(0,a.w5)((()=>[(0,a.Uk)("create an account")])),_:1}),(0,a.Uk)(" to make an appointment. ")])):(0,a.kq)("",!0),di])):((0,a.wg)(),(0,a.iD)("div",ui,[""!=c.doctorList?((0,a.wg)(),(0,a.iD)("div",pi,"No such doctor is available right now.")):(0,a.kq)("",!0)]))])):(0,a.kq)("",!0)])):((0,a.wg)(),(0,a.iD)("div",Z,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(c.specialistList,((i,t)=>((0,a.wg)(),(0,a.iD)("div",{class:"column is-6-mobile is-4-desktop",key:t},[(0,a._)("a",{onClick:t=>r.getDoctors(i.specialist)},["General Practitioner"!==i.specialist?((0,a.wg)(),(0,a.iD)("figure",P,[(0,a._)("img",{src:`https://ui-avatars.com/api/?name=${i.specialist}`},null,8,I)])):(0,a.kq)("",!0),"General Practitioner"!==i.specialist?((0,a.wg)(),(0,a.iD)("p",L,(0,e.zw)(i.specialist),1)):(0,a.kq)("",!0)],8,M)])))),128))]))])])])])])):(0,a.kq)("",!0)],64)}var hi=s(196),vi=s(4239),gi=s(2666),wi=s(7787),ki={name:"DoctorList",components:{NavigationTab:gi.Z,CatchError:wi.Z},data(){return{errMsg:"",hospitalDetails:[],patientDetails:null,doctorList:null,specialistList:[],pickedSpecialist:null,specializationClicked:!1,doctorSearchBar:"",isDoctorLoading:!1,typeClinic:!1}},async mounted(){null!==this.$store.state.patientID&&await hi.ZP.get("/session/patient").then((i=>this.patientDetails=i.data)),await hi.ZP.post(`/api/manager/${this.$route.params.hospital}`).then((i=>{this.hospitalDetails=i.data,this.specialistList=i.data.specializations.sort()})),"Clinic"==this.hospitalDetails.type&&(this.typeClinic=!0,this.getDoctors(void 0))},computed:{doctorSearch(){return!!this.doctorList&&this.doctorList.filter((i=>i.name.toLowerCase().includes(this.doctorSearchBar.toLowerCase())))}},methods:{async getDoctors(i){this.doctorSearchBar="",this.isDoctorLoading=!0,this.specializationClicked=!0,this.pickedSpecialist=i,await hi.ZP.post("/api/checkDoctorAvailability",{hospital:this.hospitalDetails.hospital,specialist:i}).then((i=>this.doctorList=i?i.data:[])).catch((i=>this.errMsg=i)),this.isDoctorLoading=!1},async pickDoctor(i,t){vi.Z.commit("pickedSpecialization",t),vi.Z.commit("doctorDetails",i),vi.Z.commit("statusAvailability",!0),vi.Z.commit("hospitalName",this.hospitalDetails.hospital),null!==this.$store.state.patientID?await this.$router.push(`/user/${this.patientDetails.username}/registration`):await this.$router.push("/user/signup")}}},_i=s(3744);const fi=(0,_i.Z)(ki,[["render",mi],["__scopeId","data-v-367a4912"]]);var bi=fi},475:function(i,t,s){i.exports=s.p+"img/medi-search-horizontal.d15d9e4c.png"}}]);
//# sourceMappingURL=663.6c4eaee2.js.map