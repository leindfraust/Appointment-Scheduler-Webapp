"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[550],{5535:function(t,a,e){e.d(a,{Z:function(){return vt}});var s=e(6252),i=e(3577),l=e(475);const n=t=>((0,s.dD)("data-v-7aede87c"),t=t(),(0,s.Cn)(),t),o={class:"navbar",role:"navigation","aria-label":"main navigation"},c={class:"navbar-brand"},r=n((()=>(0,s._)("a",{class:"navbar-item",href:"/"},[(0,s._)("img",{src:l})],-1))),d=n((()=>(0,s._)("span",{"aria-hidden":"true"},null,-1))),u=n((()=>(0,s._)("span",{"aria-hidden":"true"},null,-1))),p=n((()=>(0,s._)("span",{"aria-hidden":"true"},null,-1))),v=[d,u,p],m={class:"navbar-start is-hidden-desktop"},h=n((()=>(0,s._)("a",{class:"navbar-item"},"About",-1))),_={key:0,class:"navbar-end"},w={key:0,class:"has-text-danger"},b={class:"fa-solid fa-bell animate__animated animate__heartBeat animate__infinite"},g={class:"is-size-7"},f={key:1,class:"has-text-info"},k=n((()=>(0,s._)("i",{class:"fa-solid fa-bell"},null,-1))),y=[k],D={key:0,class:"navbar-dropdown is-right notif-list"},U=["onClick"],x={class:"help"},S=["onClick"],C={key:1,class:"navbar-dropdown is-right"},N=n((()=>(0,s._)("div",{class:"navbar-item"},"No new notifications.",-1))),A=[N],z={key:0,class:"navbar-item is-hidden-mobile"},P={key:0,class:"image"},$=["src"],Z={key:1,class:"image"},I=["src"],q={class:"navbar-dropdown is-right"},H=n((()=>(0,s._)("hr",{class:"navbar-divider"},null,-1))),L=n((()=>(0,s._)("strong",null,"Logout",-1))),M=[L],F=n((()=>(0,s._)("i",{class:"fa-solid fa-bars"},null,-1))),Y=[F],j={class:"navbar-dropdown is-right"},T={key:1,class:"navbar-end"},O={class:"navbar-item"},R={class:"buttons"},V=n((()=>(0,s._)("strong",null,"Sign up",-1))),W=n((()=>(0,s._)("i",{class:"fa-solid fa-bars"},null,-1))),K=[W],B={class:"navbar-dropdown is-right"},E=n((()=>(0,s._)("a",{class:"navbar-item"},"About",-1))),G=n((()=>(0,s._)("div",{class:"modal-background"},null,-1))),J={class:"modal-content box"},Q={class:"section"},X={class:"title"},tt={class:"subtitle"},at={class:"subtitle"},et={key:0},st={class:"image is-square"},it=["src"],lt={class:"has-text-centered"},nt=["href"];function ot(t,a,e,l,n,d){const u=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s._)("nav",o,[(0,s._)("div",c,[r,(0,s._)("a",{role:"button",class:(0,i.C_)(["navbar-burger",{"is-active":n.isActive}]),"aria-label":"menu","aria-expanded":"false","data-target":"navbar",onClick:a[0]||(a[0]=(...t)=>d.navbar&&d.navbar(...t))},v,2)]),(0,s._)("div",{id:"navbar",class:(0,i.C_)(["navbar-menu",{"is-active":n.isActive}])},[(0,s._)("div",m,[h,(0,s._)("a",{class:"navbar-item",onClick:a[1]||(a[1]=t=>this.$router.push("/contactus"))},"Contact Us")]),""!=n.patient?((0,s.wg)(),(0,s.iD)("div",_,[(0,s._)("div",{class:(0,i.C_)(["navbar-item has-dropdown",{"is-active":n.isActiveNotifications}])},[(0,s._)("a",{class:"navbar-link",onClick:a[2]||(a[2]=(...t)=>d.notification&&d.notification(...t))},[n.notifications.find((t=>!0===t.new))?((0,s.wg)(),(0,s.iD)("span",w,[(0,s._)("i",b,[(0,s._)("span",g,(0,i.zw)(n.notifications.filter((t=>t.new)).length),1)])])):((0,s.wg)(),(0,s.iD)("span",f,y))]),0!==n.notifications.length?((0,s.wg)(),(0,s.iD)("div",D,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(n.notifications.sort(((t,a)=>new Date(a.date).getTime()-new Date(t.date).getTime())),((t,a)=>((0,s.wg)(),(0,s.iD)("div",{class:"navbar-item",key:a},[(0,s._)("div",{class:(0,i.C_)(["notification is-info",{"is-light":!t.new}])},[(0,s._)("a",{style:{"text-decoration":"none"},onClick:e=>d.openNotif(t,a)},[(0,s.Uk)((0,i.zw)(t.subject)+" ",1),(0,s._)("p",x,(0,i.zw)("Medic Search"==t.from?`From ${t.from}`:`From\n                                    Dr. ${t.from}`),1)],8,U),(0,s._)("button",{class:"delete",onClick:a=>d.deleteNotif(t)},null,8,S)],2)])))),128))])):((0,s.wg)(),(0,s.iD)("div",C,A))],2),(0,s._)("div",{class:(0,i.C_)(["navbar-item has-dropdown",{"is-active":n.isActiveProfileDropdown}]),onClick:a[4]||(a[4]=t=>n.isActiveProfileDropdown=!n.isActiveProfileDropdown)},[n.checkImgState?((0,s.wg)(),(0,s.iD)("a",z,[t.$store.state.checkProfileImg?((0,s.wg)(),(0,s.iD)("figure",P,[(0,s._)("img",{class:"is-rounded",src:`https://res.cloudinary.com/leindfraust/image/upload/v${(new Date).getMonth()}${(new Date).getDate()}/assets/patients/${t.$store.state.patientUsername}.jpg`},null,8,$)])):((0,s.wg)(),(0,s.iD)("figure",Z,[(0,s._)("img",{class:"is-rounded",src:`https://ui-avatars.com/api/?name=${this.$store.state.patientUsername}`},null,8,I)]))])):(0,s.kq)("",!0),(0,s._)("div",q,[(0,s.Wm)(u,{to:`/user/${n.patient}/profile`,class:"navbar-item"},{default:(0,s.w5)((()=>[(0,s.Uk)("Profile")])),_:1},8,["to"]),(0,s.Wm)(u,{to:`/user/${n.patient}/security`,class:"navbar-item"},{default:(0,s.w5)((()=>[(0,s.Uk)("Security")])),_:1},8,["to"]),H,(0,s._)("a",{class:"navbar-item has-text-danger",onClick:a[3]||(a[3]=(...t)=>d.logout&&d.logout(...t))},M)])],2),(0,s._)("div",{class:(0,i.C_)(["navbar-item has-dropdown is-hidden-mobile",{"is-active":n.isActiveMenuDropdown}])},[(0,s._)("a",{class:"navbar-item",onClick:a[5]||(a[5]=t=>n.isActiveMenuDropdown=!n.isActiveMenuDropdown)},Y),(0,s._)("div",j,[(0,s.Wm)(u,{to:"/about",class:"navbar-item"},{default:(0,s.w5)((()=>[(0,s.Uk)("About")])),_:1}),(0,s.Wm)(u,{to:"/contactus",class:"navbar-item"},{default:(0,s.w5)((()=>[(0,s.Uk)("Contact Us")])),_:1})])],2)])):((0,s.wg)(),(0,s.iD)("div",T,[(0,s._)("div",O,[(0,s._)("div",R,[(0,s.Wm)(u,{to:"/user/login",class:"button is-dark is-inverted",style:{"background-color":"transparent"}},{default:(0,s.w5)((()=>[(0,s.Uk)("Log in")])),_:1}),(0,s.Wm)(u,{to:"/user/signup",class:"button is-info"},{default:(0,s.w5)((()=>[V])),_:1})])]),(0,s._)("div",{class:(0,i.C_)(["navbar-item has-dropdown is-hidden-mobile",{"is-active":n.isActiveMenuDropdown}])},[(0,s._)("a",{class:"navbar-item",onClick:a[6]||(a[6]=t=>n.isActiveMenuDropdown=!n.isActiveMenuDropdown)},K),(0,s._)("div",B,[E,(0,s._)("a",{class:"navbar-item",onClick:a[7]||(a[7]=t=>this.$router.push("/contactus"))},"Contact Us")])],2)]))],2)]),(0,s._)("div",{class:(0,i.C_)(["modal",{"is-active":n.isActiveModal}])},[G,(0,s._)("div",J,[(0,s._)("section",Q,[(0,s._)("p",X,(0,i.zw)("Medic Search"==n.viewNotif.from?`From ${n.viewNotif.from}`:`From\n                Dr. ${n.viewNotif.from}`),1),(0,s._)("p",tt,(0,i.zw)(new Date(n.viewNotif.date).toDateString()),1),(0,s._)("p",at,(0,i.zw)(n.viewNotif.message),1),n.viewNotif.id?((0,s.wg)(),(0,s.iD)("div",et,[(0,s._)("figure",st,[(0,s._)("img",{loading:"lazy",src:`https://res.cloudinary.com/leindfraust/image/upload/v1/assets/patientimgmsg/patientCopy/${n.viewNotif.id}.jpg`},null,8,it)]),(0,s._)("div",lt,[(0,s._)("a",{href:`https://res.cloudinary.com/leindfraust/image/upload/v1/assets/patientimgmsg/patientCopy/${n.viewNotif.id}.jpg`,class:"button",download:""},"Download File",8,nt)])])):(0,s.kq)("",!0)])]),(0,s._)("button",{class:"modal-close is-large","aria-label":"close",onClick:a[8]||(a[8]=(...t)=>d.closeNotificationModal&&d.closeNotificationModal(...t))})],2)],64)}var ct=e(196),rt=e(4058),dt={name:"NavigationTab",async mounted(){await ct.ZP.get(`https://res.cloudinary.com/leindfraust/image/upload/v1/assets/patients/${this.$store.state.patientUsername}.jpg`).then((t=>200==t.status?this.$store.commit("checkProfileImg",!0):this.$store.commit("checkProfileImg",!1))).catch((t=>t?this.$store.commit("checkProfileImg",!1):this.$store.commit("checkProfileImg",!0))),this.checkImgState=!0,this.$store.state.patientID&&(rt.Z.connect(),rt.Z.emit("join room",this.$store.state.patientID),rt.Z.on("send messages",(t=>{this.notifications=t})),rt.Z.on("delete messages",(t=>{this.notifications=t})),rt.Z.on("messages",(t=>{this.notifications=t})))},data(){return{isActiveNotifications:!1,isActiveModal:!1,isActiveProfileDropdown:!1,isActiveMenuDropdown:!1,isActive:!1,patient:this.$store.state.patientUsername,notifications:[],viewNotif:[],checkImgState:!1}},methods:{navbar(){this.isActive=!this.isActive},async logout(){await this.$store.commit("patientID",null),await this.$store.commit("patientUsername",""),await ct.ZP["delete"]("/session/patient"),await this.$router.push("/user/login"),rt.Z.disconnect()},notification(){this.isActiveNotifications=!this.isActiveNotifications},async deleteNotif(t){await ct.ZP.post("/api/imgUploadImgMsgDeletePatient",{id:"assets/patientimgmsg/patientCopy/"+t.id}),rt.Z.emit("delete message",this.$store.state.patientID,t)},openNotif(t,a){this.viewNotif=t,this.isActiveModal=!0,this.viewNotif.new&&(this.notifications[a].new=!1,rt.Z.emit("update message",this.notifications))},closeNotificationModal(){this.isActiveModal=!1}}},ut=e(3744);const pt=(0,ut.Z)(dt,[["render",ot],["__scopeId","data-v-7aede87c"]]);var vt=pt},4550:function(t,a,e){e.r(a),e.d(a,{default:function(){return Ca}});var s=e(6252),i=e(2262),l=e(3577),n=e(9963),o=e(5535),c=e(196),r=e(3907),d=e(2201);const u=t=>((0,s.dD)("data-v-5eaa75c4"),t=t(),(0,s.Cn)(),t),p={class:"section"},v={id:"wrapper-container",style:{width:"75%",margin:"auto"}},m={key:0,class:"container"},h={class:"columns is-vcentered"},_={class:"column is-4"},w={class:"field",id:"file-img"},b={key:0,class:"image is-square image-outer"},g=["Src"],f=["src"],k=(0,s.uE)('<div class="buttons is-hidden-mobile" style="bottom:5%;right:10%;position:absolute;" data-v-5eaa75c4><label for="file-input" style="cursor:pointer;" data-v-5eaa75c4><a class="button is-responsive" style="border-radius:50%;height:50px;width:50px;" data-v-5eaa75c4><i class="fa-solid fa-camera" data-v-5eaa75c4></i></a></label></div><div class="buttons is-hidden-desktop" style="bottom:15%;left:75%;position:absolute;" data-v-5eaa75c4><label for="file-input" style="cursor:pointer;" data-v-5eaa75c4><a class="button is-large is-responsive" style="border-radius:50%;height:35px;width:35px;" data-v-5eaa75c4><i class="fa-solid fa-camera" data-v-5eaa75c4></i></a></label></div>',2),y={key:1,class:"image is-square image-outer"},D=["Src"],U=["src"],x=(0,s.uE)('<div class="buttons is-hidden-mobile" style="bottom:5%;right:10%;position:absolute;" data-v-5eaa75c4><label for="file-input" style="cursor:pointer;" data-v-5eaa75c4><a class="button is-medium is-responsive" data-v-5eaa75c4><i class="fa-solid fa-camera" data-v-5eaa75c4></i></a></label></div><div class="buttons is-hidden-desktop" style="bottom:15%;left:75%;position:absolute;" data-v-5eaa75c4><label for="file-input" style="cursor:pointer;" data-v-5eaa75c4><a class="button is-medium is-responsive" data-v-5eaa75c4><i class="fa-solid fa-camera" data-v-5eaa75c4></i></a></label></div>',2),S={class:"control is-hidden"},C={class:"buttons is-centered"},N={class:"column"},A={key:0,class:"notification is-danger"},z={key:1,class:"notification is-success"},P={class:"field is-horizontal"},$={class:"field-body"},Z={class:"field"},I=u((()=>(0,s._)("label",{class:"label"},"Email:",-1))),q={key:0,class:"controls"},H={key:1,class:"controls"},L={class:"field is-horizontal"},M={class:"field-body"},F={class:"field"},Y=u((()=>(0,s._)("label",{class:"label"},"First Name:",-1))),j={class:"controls"},T={class:"field"},O=u((()=>(0,s._)("label",{class:"label"},"Last Name:",-1))),R={class:"controls"},V={class:"field is-horizontal"},W={class:"field-body"},K={class:"field"},B={class:"control"},E=u((()=>(0,s._)("label",{class:"label"},"Province:",-1))),G={class:"dropdown-trigger"},J={key:0},Q={key:1},X={class:"dropdown-menu"},tt=["onClick"],at={class:"field"},et={class:"control"},st=u((()=>(0,s._)("div",{class:"label"},"City/Municipality:",-1))),it={class:"dropdown-trigger"},lt=["disabled"],nt={key:0},ot={key:1},ct={key:0,class:"dropdown-menu"},rt=["onClick"],dt={class:"field"},ut=u((()=>(0,s._)("label",{class:"label"},"Current Address:",-1))),pt={class:"controls"},vt=u((()=>(0,s._)("br",null,null,-1))),mt={class:"dropdown-trigger"},ht=u((()=>(0,s._)("span",{class:"icon is-small"},[(0,s._)("i",{class:"fas fa-angle-down","aria-hidden":"true"})],-1))),_t={class:"dropdown-menu"},wt={class:"dropdown-content"},bt=u((()=>(0,s._)("div",{class:"block"},null,-1))),gt={class:"field has-addons"},ft=u((()=>(0,s._)("div",{class:"control"},[(0,s._)("button",{class:"button is-static fa fa-search"})],-1))),kt={class:"control"},yt={key:1,class:"container box"},Dt={key:0,class:"table-container"},Ut={class:"table is-fullwidth"},xt=u((()=>(0,s._)("thead",null,[(0,s._)("tr",null,[(0,s._)("th",{class:"has-text-black-ter"},"Controls"),(0,s._)("th",{class:"has-text-black-ter"},"Reference ID"),(0,s._)("th",{class:"has-text-black-ter"},"Schedule"),(0,s._)("th",{class:"has-text-black-ter"},"Priority No."),(0,s._)("th",{class:"has-text-black-ter"},"Hospital Appointed"),(0,s._)("th",{class:"has-text-black-ter"},"Doctor Appointed"),(0,s._)("th",{class:"has-text-black-ter"},"First Name"),(0,s._)("th",{class:"has-text-black-ter"},"Last Name"),(0,s._)("th",{class:"has-text-black-ter"},"Contact Number"),(0,s._)("th",{class:"has-text-black-ter"},"Birthday"),(0,s._)("th",{class:"has-text-black-ter"},"Symptoms/Comments")])],-1))),St=["onClick"],Ct=u((()=>(0,s._)("br",null,null,-1))),Nt={class:"has-text-black-ter"},At={class:"has-text-black-ter"},zt={class:"has-text-black-ter"},Pt={class:"has-text-black-ter"},$t={class:"has-text-black-ter"},Zt={class:"has-text-black-ter"},It={class:"has-text-black-ter"},qt={class:"has-text-black-ter"},Ht={class:"has-text-black-ter"},Lt={class:"has-text-black-ter"},Mt={key:1,class:"container"},Ft=u((()=>(0,s._)("div",{class:"notification is-info"},"You do not have any ongoing appointments.",-1))),Yt=[Ft],jt={key:2,class:"container box"},Tt={key:0,class:"table-container"},Ot={class:"table is-fullwidth"},Rt=u((()=>(0,s._)("thead",null,[(0,s._)("tr",null,[(0,s._)("th",{class:"has-text-black-ter"},"Visited"),(0,s._)("th",{class:"has-text-black-ter"},"Reference ID"),(0,s._)("th",{class:"has-text-black-ter"},"Schedule"),(0,s._)("th",{class:"has-text-black-ter"},"Priority No."),(0,s._)("th",{class:"has-text-black-ter"},"Hospital Appointed"),(0,s._)("th",{class:"has-text-black-ter"},"Doctor Appointed"),(0,s._)("th",{class:"has-text-black-ter"},"First Name"),(0,s._)("th",{class:"has-text-black-ter"},"Last Name"),(0,s._)("th",{class:"has-text-black-ter"},"Contact Number"),(0,s._)("th",{class:"has-text-black-ter"},"Birthday"),(0,s._)("th",{class:"has-text-black-ter"},"Symptoms/Comments")])],-1))),Vt={class:"has-text-black-ter"},Wt={class:"has-text-black-ter"},Kt={class:"has-text-black-ter"},Bt={class:"has-text-black-ter"},Et={class:"has-text-black-ter"},Gt={class:"has-text-black-ter"},Jt={class:"has-text-black-ter"},Qt={class:"has-text-black-ter"},Xt={class:"has-text-black-ter"},ta={class:"has-text-black-ter"},aa={class:"has-text-black-ter"},ea={key:1,class:"container"},sa=u((()=>(0,s._)("div",{class:"notification is-info"},"You do not have any past appointments.",-1))),ia=[sa],la={key:3,class:"container box"},na={key:0,class:"table-container"},oa={class:"table is-fullwidth"},ca=u((()=>(0,s._)("thead",null,[(0,s._)("tr",null,[(0,s._)("th",{class:"has-text-black-ter"},"Controls"),(0,s._)("th",{class:"has-text-black-ter"},"Reference ID"),(0,s._)("th",{class:"has-text-black-ter"},"Schedule"),(0,s._)("th",{class:"has-text-black-ter"},"Priority No."),(0,s._)("th",{class:"has-text-black-ter"},"Hospital Appointed"),(0,s._)("th",{class:"has-text-black-ter"},"Doctor Appointed"),(0,s._)("th",{class:"has-text-black-ter"},"First Name"),(0,s._)("th",{class:"has-text-black-ter"},"Last Name"),(0,s._)("th",{class:"has-text-black-ter"},"Contact Number"),(0,s._)("th",{class:"has-text-black-ter"},"Birthday"),(0,s._)("th",{class:"has-text-black-ter"},"Symptoms/Comments")])],-1))),ra=["onClick"],da=u((()=>(0,s._)("br",null,null,-1))),ua={class:"has-text-black-ter"},pa={class:"has-text-black-ter"},va={class:"has-text-black-ter"},ma={class:"has-text-black-ter"},ha={class:"has-text-black-ter"},_a={class:"has-text-black-ter"},wa={class:"has-text-black-ter"},ba={class:"has-text-black-ter"},ga={class:"has-text-black-ter"},fa={class:"has-text-black-ter"},ka={key:1,class:"container"},ya=u((()=>(0,s._)("div",{class:"notification is-info"},"You do not have any cancelled appointments.",-1))),Da=[ya];var Ua={__name:"UserProfile",setup(t){const a=(0,r.oR)(),e=(0,d.tv)();let u=(0,i.iH)([]),Ft=(0,i.iH)([]),sa=(0,i.iH)([]),ya=(0,i.iH)([]),Ua=(0,i.iH)([]),xa=(0,i.iH)([]),Sa=(0,i.iH)(""),Ca=(0,i.iH)(""),Na=(0,i.iH)(!1),Aa=(0,i.iH)(!1),za=(0,i.iH)(""),Pa=(0,i.iH)(!1),$a=(0,i.iH)(!1),Za=(0,i.iH)(!0),Ia=(0,i.iH)(!1),qa=(0,i.iH)(!1),Ha=(0,i.iH)(),La=(0,i.iH)(!1),Ma=(0,i.iH)(),Fa=(0,i.iH)(""),Ya=(0,i.iH)(!1);(0,s.bv)((async()=>{await c.ZP.post("/api/appointmentList/patients",{id:a.state.patientID,ongoing:!0}).then((t=>u.value=t.data)),await c.ZP.post("/api/appointmentList/patients",{id:a.state.patientID,ongoing:!1}).then((t=>Ft.value=t.data)),await c.ZP.post("/api/appointmentList/cancelledAppointments",{id:a.state.patientID}).then((t=>sa.value=t.data)),await c.ZP.get("/session/patient").then((t=>ya.value=t.data)),await c.ZP.get("/api/geolocation").then((t=>Ua.value=t.data)),Sa.value=await ya.value.province,Ca.value=await ya.value.city,await c.ZP.get("/api/geolocation").then((t=>xa.value=t.data.find((t=>t.province===Sa.value)))),xa.value=await xa.value.citiesOrMunicipalities.sort(((t,a)=>t.name>a.name?1:-1))}));const ja=(0,s.Fl)((()=>Va())),Ta=(0,s.Fl)((()=>Ra())),Oa=(0,s.Fl)((()=>Wa()));function Ra(){return Ft.value.sort(((t,a)=>new Date(a.schedule[0].date).getTime()-new Date(t.schedule[0].date).getTime())).filter((t=>t.referenceID.toLowerCase().includes(Fa.value.toLowerCase())))}function Va(){return u.value.sort(((t,a)=>{new Date(t.schedule[0].date).getTime(),new Date(a.schedule[0].date).getTime()})).filter((t=>t.referenceID.toLowerCase().includes(Fa.value.toLowerCase())))}function Wa(){return sa.value.sort(((t,a)=>{new Date(t.schedule[0].date).getTime(),new Date(a.schedule[0].date).getTime()})).filter((t=>t.referenceID.toLowerCase().includes(Fa.value.toLowerCase())))}async function Ka(t){Na.value=!1,Ca.value="",Sa.value=t,await c.ZP.get("/api/geolocation").then((a=>xa.value=a.data.find((a=>a.province===t)))),xa.value=await xa.value.citiesOrMunicipalities.sort(((t,a)=>t.name>a.name?1:-1))}function Ba(t){Aa.value=!1,Ca.value=t}function Ea(t){Ha.value=t.target.files[0],Ma.value=URL.createObjectURL(Ha.value),La.value=!0}async function Ga(){try{await c.ZP.put("/session/patient/",{name:[ya.value.name[0],ya.value.name[1]],email:ya.value.email,province:Sa.value,city:Ca.value,currentAddress:ya.value.currentAddress}),await c.ZP.put(`/api/user/${ya.value._id}`,{name:[ya.value.name[0],ya.value.name[1]],gmail:ya.value.email,province:Sa.value,city:Ca.value,currentAddress:ya.value.currentAddress}),Pa.value=!0,za.value="",await c.ZP.get("/session/patient").then((t=>ya.value=t.data)),await c.ZP.get("/api/geolocation").then((t=>Ua.value=t.data)),Sa.value=await ya.value.province,Ca.value=await ya.value.city,await c.ZP.get("/api/geolocation").then((t=>xa.value=t.data.find((t=>t.province===Sa.value)))),xa.value=await xa.value.citiesOrMunicipalities.sort(((t,a)=>t.name>a.name?1:-1))}catch(t){za.value=t}}async function Ja(t){try{await c.ZP.put(`/api/appointmentList/${t}`,{ifPatientCancelled:!0}),await c.ZP.post("/api/appointmentList/patients",{id:a.state.patientID,ongoing:!0}).then((t=>u.value=t.data)),await c.ZP.post("/api/appointmentList/patients",{id:a.state.patientID,ongoing:!1}).then((t=>Ft.value=t.data)),await c.ZP.post("/api/appointmentList/cancelledAppointments",{id:a.state.patientID}).then((t=>sa.value=t.data))}catch(e){za.value=e}}async function Qa(t){try{await c.ZP["delete"](`/api/appointmentList/${t}`),await c.ZP.post("/api/appointmentList/patients",{id:a.state.patientID,ongoing:!0}).then((t=>u.value=t.data)),await c.ZP.post("/api/appointmentList/patients",{id:a.state.patientID,ongoing:!1}).then((t=>Ft.value=t.data)),await c.ZP.post("/api/appointmentList/cancelledAppointments",{id:a.state.patientID}).then((t=>sa.value=t.data))}catch(e){za.value=e}}async function Xa(){Ya.value=!0;const t=new FormData;t.append("username",a.state.patientUsername),t.append("imgFile",Ha.value);try{await c.ZP.post("/api/imgUploadPatient",t,{headers:{"Content-Type":"multipart/form-data"}}).then((async t=>{t&&(a.commit("imgSuccess",!0),await e.push("/imgUploadSuccessPatient"))}))}catch(s){za.value=s}Ya.value=!1}return(t,e)=>{const c=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(o.Z),(0,s._)("section",p,[(0,s._)("div",v,[0!==(0,i.SU)(ya).length?((0,s.wg)(),(0,s.iD)("div",m,[(0,s._)("div",h,[(0,s._)("div",_,[(0,s._)("div",w,[(0,i.SU)(a).state.checkProfileImg?((0,s.wg)(),(0,s.iD)("figure",b,[(0,i.SU)(Ma)?((0,s.wg)(),(0,s.iD)("img",{key:0,class:"is-rounded image-inner",Src:(0,i.SU)(Ma)},null,8,g)):((0,s.wg)(),(0,s.iD)("img",{key:1,class:"is-rounded image-inner",src:`https://res.cloudinary.com/leindfraust/image/v${(new Date).getMonth()}${(new Date).getDate()}/upload/assets/patients/${(0,i.SU)(a).state.patientUsername}.jpg`},null,8,f)),k])):((0,s.wg)(),(0,s.iD)("figure",y,[(0,i.SU)(Ma)?((0,s.wg)(),(0,s.iD)("img",{key:0,class:"is-rounded image-inner",Src:(0,i.SU)(Ma)},null,8,D)):((0,s.wg)(),(0,s.iD)("img",{key:1,class:"is-rounded image-inner",src:`https://ui-avatars.com/api/?name=${(0,i.SU)(a).state.patientUsername}`},null,8,U)),x])),(0,s._)("div",S,[(0,s._)("input",{id:"file-input",onChange:e[0]||(e[0]=t=>Ea(t)),class:"input",type:"file"},null,32)])]),(0,s._)("div",C,[(0,i.SU)(La)?((0,s.wg)(),(0,s.iD)("button",{key:0,class:"button",onClick:e[1]||(e[1]=t=>((0,i.dq)(Ma)?Ma.value=null:Ma=null,(0,i.dq)(La)?La.value=!1:La=!1))},"Cancel")):(0,s.kq)("",!0),(0,i.SU)(La)?((0,s.wg)(),(0,s.iD)("button",{key:1,class:(0,l.C_)(["button is-info",{"is-loading":(0,i.SU)(Ya)}]),onClick:Xa},"Upload Photo",2)):(0,s.kq)("",!0)])]),(0,s._)("div",N,[(0,i.SU)(za)?((0,s.wg)(),(0,s.iD)("div",A,[(0,s.Uk)(" Oops, something went wrong. Try again later or "),(0,s.Wm)(c,{to:"/contactus"},{default:(0,s.w5)((()=>[(0,s.Uk)("contact us")])),_:1})])):(0,s.kq)("",!0),(0,i.SU)(Pa)?((0,s.wg)(),(0,s.iD)("div",z,"Changes have been pushed.")):(0,s.kq)("",!0),(0,s._)("div",P,[(0,s._)("div",$,[(0,s._)("div",Z,[I,(0,i.SU)(ya).email.includes("dummyemail@email.com")?((0,s.wg)(),(0,s.iD)("div",H,[(0,s.wy)((0,s._)("input",{type:"text",class:"input","onUpdate:modelValue":e[3]||(e[3]=t=>(0,i.SU)(ya).email=t),placeholder:"Register an email for this account."},null,512),[[n.nr,(0,i.SU)(ya).email]])])):((0,s.wg)(),(0,s.iD)("div",q,[(0,s.wy)((0,s._)("input",{type:"text",class:"input","onUpdate:modelValue":e[2]||(e[2]=t=>(0,i.SU)(ya).email=t)},null,512),[[n.nr,(0,i.SU)(ya).email]])]))])])]),(0,s._)("div",L,[(0,s._)("div",M,[(0,s._)("div",F,[Y,(0,s._)("div",j,[(0,s.wy)((0,s._)("input",{type:"text",class:"input","onUpdate:modelValue":e[4]||(e[4]=t=>(0,i.SU)(ya).name[0]=t)},null,512),[[n.nr,(0,i.SU)(ya).name[0]]])])]),(0,s._)("div",T,[O,(0,s._)("div",R,[(0,s.wy)((0,s._)("input",{type:"text",class:"input","onUpdate:modelValue":e[5]||(e[5]=t=>(0,i.SU)(ya).name[1]=t)},null,512),[[n.nr,(0,i.SU)(ya).name[1]]])])])])]),(0,s._)("div",V,[(0,s._)("div",W,[(0,s._)("div",K,[(0,s._)("div",B,[E,(0,s._)("div",{class:(0,l.C_)(["dropdown",{"is-active":(0,i.SU)(Na)}])},[(0,s._)("div",G,[(0,s._)("button",{class:"button",onClick:e[6]||(e[6]=t=>(0,i.dq)(Na)?Na.value=!(0,i.SU)(Na):Na=!(0,i.SU)(Na))},[""==(0,i.SU)(Sa)?((0,s.wg)(),(0,s.iD)("span",J,"Select")):((0,s.wg)(),(0,s.iD)("span",Q,(0,l.zw)((0,i.SU)(Sa)),1))])]),(0,s._)("div",X,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)((0,i.SU)(Ua),(t=>((0,s.wg)(),(0,s.iD)("div",{class:"dropdown-content",key:t._id},[(0,s._)("a",{class:"dropdown-item",onClick:a=>Ka(t.province)},(0,l.zw)(t.province),9,tt)])))),128))])],2)])]),(0,s._)("div",at,[(0,s._)("div",et,[st,(0,s._)("div",{class:(0,l.C_)(["dropdown",{"is-active":(0,i.SU)(Aa)}])},[(0,s._)("div",it,[(0,s._)("button",{class:"button","aria-haspopup":"true",onClick:e[7]||(e[7]=t=>(0,i.dq)(Aa)?Aa.value=!(0,i.SU)(Aa):Aa=!(0,i.SU)(Aa)),disabled:""==(0,i.SU)(Sa)},[""==(0,i.SU)(Ca)?((0,s.wg)(),(0,s.iD)("span",nt,"Select")):((0,s.wg)(),(0,s.iD)("span",ot,(0,l.zw)((0,i.SU)(Ca)),1))],8,lt)]),(0,i.SU)(Sa)?((0,s.wg)(),(0,s.iD)("div",ct,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)((0,i.SU)(xa),(t=>((0,s.wg)(),(0,s.iD)("div",{class:"dropdown-content",key:t.name},[(0,s._)("a",{class:"dropdown-item",onClick:a=>Ba(t.name)},(0,l.zw)(t.name),9,rt)])))),128))])):(0,s.kq)("",!0)],2)])]),(0,s._)("div",dt,[ut,(0,s._)("div",pt,[(0,s.wy)((0,s._)("input",{type:"text",class:"input","onUpdate:modelValue":e[8]||(e[8]=t=>(0,i.SU)(ya).currentAddress=t)},null,512),[[n.nr,(0,i.SU)(ya).currentAddress]])])])])]),(0,s._)("div",{class:"field is-grouped is-grouped-right"},[(0,s._)("p",{class:"control"},[(0,s._)("a",{class:"button is-info",onClick:Ga},"Save changes")])])])])])):(0,s.kq)("",!0),vt,(0,s._)("div",{class:(0,l.C_)(["dropdown",{"is-active":(0,i.SU)($a)}])},[(0,s._)("div",mt,[(0,s._)("button",{class:"button",onClick:e[9]||(e[9]=t=>(0,i.dq)($a)?$a.value=!(0,i.SU)($a):$a=!(0,i.SU)($a))},[(0,s._)("span",null,(0,l.zw)((0,i.SU)(Za)?"Ongoing Appointments":(0,i.SU)(Ia)?"Past Appointments":"Cancelled Appointments"),1),ht])]),(0,s._)("div",_t,[(0,s._)("div",wt,[(0,s._)("a",{class:"dropdown-item",onClick:e[10]||(e[10]=t=>((0,i.dq)(Za)?Za.value=!0:Za=!0,(0,i.dq)(Ia)?Ia.value=!1:Ia=!1,(0,i.dq)(qa)?qa.value=!1:qa=!1,(0,i.dq)($a)?$a.value=!(0,i.SU)($a):$a=!(0,i.SU)($a)))}," Ongoing Appointments "),(0,s._)("a",{class:"dropdown-item",onClick:e[11]||(e[11]=t=>((0,i.dq)(Ia)?Ia.value=!0:Ia=!0,(0,i.dq)(Za)?Za.value=!1:Za=!1,(0,i.dq)(qa)?qa.value=!1:qa=!1,(0,i.dq)($a)?$a.value=!(0,i.SU)($a):$a=!(0,i.SU)($a)))}," Past Appointments "),(0,s._)("a",{class:"dropdown-item",onClick:e[12]||(e[12]=t=>((0,i.dq)(qa)?qa.value=!0:qa=!0,(0,i.dq)(Za)?Za.value=!1:Za=!1,(0,i.dq)(Ia)?Ia.value=!1:Ia=!1,(0,i.dq)($a)?$a.value=!(0,i.SU)($a):$a=!(0,i.SU)($a)))}," Cancelled Appointments ")])])],2),bt,(0,s._)("div",gt,[ft,(0,s._)("div",kt,[(0,s.wy)((0,s._)("input",{type:"text",class:"input",placeholder:"Search Reference ID","onUpdate:modelValue":e[13]||(e[13]=t=>(0,i.dq)(Fa)?Fa.value=t:Fa=t)},null,512),[[n.nr,(0,i.SU)(Fa)]])])]),(0,i.SU)(Za)?((0,s.wg)(),(0,s.iD)("div",yt,[0!==Object.keys((0,i.SU)(ja)).length?((0,s.wg)(),(0,s.iD)("div",Dt,[(0,s._)("table",Ut,[xt,(0,s._)("tbody",null,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)((0,i.SU)(ja),(t=>((0,s.wg)(),(0,s.iD)("tr",{key:t._id},[(0,s._)("button",{class:"dropdown-item button has-text-danger",type:"button",onClick:a=>Ja(t._id)},"Cancel",8,St),Ct,(0,s._)("th",Nt,(0,l.zw)(t.referenceID),1),(0,s._)("th",At,(0,l.zw)(new Date(t.schedule[0].date).toDateString()),1),(0,s._)("th",zt,(0,l.zw)(t.priorityNum),1),(0,s._)("th",Pt,(0,l.zw)(t.hospital),1),(0,s._)("th",$t,(0,l.zw)(t.doctorName),1),(0,s._)("td",Zt,(0,l.zw)(t.firstName),1),(0,s._)("td",It,(0,l.zw)(t.lastName),1),(0,s._)("td",qt,(0,l.zw)(t.contactNum),1),(0,s._)("td",Ht,(0,l.zw)(t.birthDay),1),(0,s._)("td",Lt,(0,l.zw)(t.comments),1)])))),128))])])])):((0,s.wg)(),(0,s.iD)("div",Mt,Yt))])):(0,s.kq)("",!0),(0,i.SU)(Ia)?((0,s.wg)(),(0,s.iD)("div",jt,[0!==Object.keys((0,i.SU)(Ta)).length?((0,s.wg)(),(0,s.iD)("div",Tt,[(0,s._)("table",Ot,[Rt,((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)((0,i.SU)(Ta),(t=>((0,s.wg)(),(0,s.iD)("tbody",{key:t._id},[(0,s._)("tr",null,[(0,s._)("th",Vt,(0,l.zw)(t.ifPatientVisited?"Yes":"No"),1),(0,s._)("th",Wt,(0,l.zw)(t.referenceID),1),(0,s._)("th",Kt,(0,l.zw)(new Date(t.schedule[0].date).toDateString()),1),(0,s._)("th",Bt,(0,l.zw)(t.priorityNum),1),(0,s._)("th",Et,(0,l.zw)(t.hospital),1),(0,s._)("th",Gt,(0,l.zw)(t.doctorName),1),(0,s._)("td",Jt,(0,l.zw)(t.firstName),1),(0,s._)("td",Qt,(0,l.zw)(t.lastName),1),(0,s._)("td",Xt,(0,l.zw)(t.contactNum),1),(0,s._)("td",ta,(0,l.zw)(t.birthDay),1),(0,s._)("td",aa,(0,l.zw)(t.comments),1)])])))),128))])])):((0,s.wg)(),(0,s.iD)("div",ea,ia))])):(0,s.kq)("",!0),(0,i.SU)(qa)?((0,s.wg)(),(0,s.iD)("div",la,[0!==Object.keys((0,i.SU)(Oa)).length?((0,s.wg)(),(0,s.iD)("div",na,[(0,s._)("table",oa,[ca,(0,s._)("tbody",null,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)((0,i.SU)(Oa),(t=>((0,s.wg)(),(0,s.iD)("tr",{key:t._id},[(0,s._)("button",{class:"dropdown-item button has-text-danger",type:"button",onClick:a=>Qa(t._id)},"Delete",8,ra),da,(0,s._)("th",ua,(0,l.zw)(t.referenceID),1),(0,s._)("th",pa,(0,l.zw)(new Date(t.schedule[0].date).toDateString()),1),(0,s._)("th",va,(0,l.zw)(t.priorityNum),1),(0,s._)("th",ma,(0,l.zw)(t.hospital),1),(0,s._)("th",ha,(0,l.zw)(t.doctorName),1),(0,s._)("td",_a,(0,l.zw)(t.firstName),1),(0,s._)("td",wa,(0,l.zw)(t.lastName),1),(0,s._)("td",ba,(0,l.zw)(t.contactNum),1),(0,s._)("td",ga,(0,l.zw)(t.birthDay),1),(0,s._)("td",fa,(0,l.zw)(t.comments),1)])))),128))])])])):((0,s.wg)(),(0,s.iD)("div",ka,Da))])):(0,s.kq)("",!0)])])],64)}}},xa=e(3744);const Sa=(0,xa.Z)(Ua,[["__scopeId","data-v-5eaa75c4"]]);var Ca=Sa},475:function(t,a,e){t.exports=e.p+"img/medi-search-horizontal.d15d9e4c.png"}}]);
//# sourceMappingURL=550.c355517b.js.map