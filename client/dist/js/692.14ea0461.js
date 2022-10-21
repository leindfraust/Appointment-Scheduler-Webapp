"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[692],{1199:function(a,t,e){e.d(t,{Z:function(){return ha}});var i=e(6252),s=e(3577),n=e(475);const l=a=>((0,i.dD)("data-v-74b627be"),a=a(),(0,i.Cn)(),a),o={class:"navbar",role:"navigation","aria-label":"main navigation"},c={class:"navbar-brand"},r=l((()=>(0,i._)("a",{class:"navbar-item",href:"/"},[(0,i._)("img",{src:n})],-1))),d=l((()=>(0,i._)("span",{"aria-hidden":"true"},null,-1))),u=l((()=>(0,i._)("span",{"aria-hidden":"true"},null,-1))),v=l((()=>(0,i._)("span",{"aria-hidden":"true"},null,-1))),p=[d,u,v],m={class:"navbar-start is-hidden-desktop"},h=l((()=>(0,i._)("a",{class:"navbar-item"},"About",-1))),g={key:0,class:"navbar-end"},_={key:0,class:"has-text-danger"},w={class:"fa-solid fa-bell animate__animated animate__heartBeat animate__infinite"},b={class:"is-size-7"},f={key:1,class:"has-text-info"},k=l((()=>(0,i._)("i",{class:"fa-solid fa-bell"},null,-1))),y=[k],D={key:0,class:"navbar-dropdown is-right notif-list"},U=["onClick"],S={class:"help"},C=["onClick"],x={key:1,class:"navbar-dropdown is-right"},N=l((()=>(0,i._)("div",{class:"navbar-item"},"No new notifications.",-1))),A=[N],z={key:0,class:"navbar-item is-hidden-mobile"},$={key:0,class:"image"},H=["src"],I={key:1,class:"image"},M=["src"],q={class:"navbar-dropdown is-right"},P=l((()=>(0,i._)("hr",{class:"navbar-divider"},null,-1))),L=l((()=>(0,i._)("strong",null,"Logout",-1))),F=[L],Z=l((()=>(0,i._)("i",{class:"fa-solid fa-bars"},null,-1))),j=[Z],Y={class:"navbar-dropdown is-right"},O=l((()=>(0,i._)("a",{class:"navbar-item"},"About",-1))),T={key:1,class:"navbar-end"},R={class:"navbar-item"},V={class:"buttons"},W=l((()=>(0,i._)("strong",null,"Sign up",-1))),K=l((()=>(0,i._)("i",{class:"fa-solid fa-bars"},null,-1))),B=[K],E={class:"navbar-dropdown is-right"},G=l((()=>(0,i._)("a",{class:"navbar-item"},"About",-1))),J=l((()=>(0,i._)("div",{class:"modal-background"},null,-1))),Q={class:"modal-content box"},X={class:"section"},aa={class:"title"},ta={class:"subtitle"},ea={class:"subtitle"},ia={key:0},sa={class:"image is-square"},na=["src"],la={class:"has-text-centered"},oa=["href"];function ca(a,t,e,n,l,d){const u=(0,i.up)("router-link");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i._)("nav",o,[(0,i._)("div",c,[r,(0,i._)("a",{role:"button",class:(0,s.C_)(["navbar-burger",{"is-active":l.isActive}]),"aria-label":"menu","aria-expanded":"false","data-target":"navbar",onClick:t[0]||(t[0]=(...a)=>d.navbar&&d.navbar(...a))},p,2)]),(0,i._)("div",{id:"navbar",class:(0,s.C_)(["navbar-menu",{"is-active":l.isActive}])},[(0,i._)("div",m,[h,(0,i._)("a",{class:"navbar-item",onClick:t[1]||(t[1]=a=>this.$router.push("/contactus"))},"Contact Us")]),""!=l.patient?((0,i.wg)(),(0,i.iD)("div",g,[(0,i._)("div",{class:(0,s.C_)(["navbar-item has-dropdown",{"is-active":l.isActiveNotifications}])},[(0,i._)("a",{class:"navbar-link",onClick:t[2]||(t[2]=(...a)=>d.notification&&d.notification(...a))},[l.notifications.find((a=>!0===a.new))?((0,i.wg)(),(0,i.iD)("span",_,[(0,i._)("i",w,[(0,i._)("span",b,(0,s.zw)(l.notifications.filter((a=>a.new)).length),1)])])):((0,i.wg)(),(0,i.iD)("span",f,y))]),0!==l.notifications.length?((0,i.wg)(),(0,i.iD)("div",D,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(l.notifications.sort(((a,t)=>new Date(t.date).getTime()-new Date(a.date).getTime())),((a,t)=>((0,i.wg)(),(0,i.iD)("div",{class:"navbar-item",key:t},[(0,i._)("div",{class:(0,s.C_)(["notification is-info",{"is-light":!a.new}])},[(0,i._)("a",{style:{"text-decoration":"none"},onClick:e=>d.openNotif(a,t)},[(0,i.Uk)((0,s.zw)(a.subject)+" ",1),(0,i._)("p",S,(0,s.zw)("Med Search"==a.from?`From ${a.from}`:`From\n                                    Dr. ${a.from}`),1)],8,U),(0,i._)("button",{class:"delete",onClick:t=>d.deleteNotif(a)},null,8,C)],2)])))),128))])):((0,i.wg)(),(0,i.iD)("div",x,A))],2),(0,i._)("div",{class:(0,s.C_)(["navbar-item has-dropdown",{"is-active":l.isActiveProfileDropdown}]),onClick:t[4]||(t[4]=a=>l.isActiveProfileDropdown=!l.isActiveProfileDropdown)},[l.checkImgState?((0,i.wg)(),(0,i.iD)("a",z,[a.$store.state.checkProfileImg?((0,i.wg)(),(0,i.iD)("figure",$,[(0,i._)("img",{class:"is-rounded",src:`https://res.cloudinary.com/leindfraust/image/upload/v${(new Date).getMonth()}${(new Date).getDate()}/assets/patients/${a.$store.state.patientUsername}.jpg`},null,8,H)])):((0,i.wg)(),(0,i.iD)("figure",I,[(0,i._)("img",{class:"is-rounded",src:`https://ui-avatars.com/api/?name=${this.$store.state.patientUsername}`},null,8,M)]))])):(0,i.kq)("",!0),(0,i._)("div",q,[(0,i.Wm)(u,{to:`/user/${l.patient}/profile`,class:"navbar-item"},{default:(0,i.w5)((()=>[(0,i.Uk)("Profile")])),_:1},8,["to"]),(0,i.Wm)(u,{to:`/user/${l.patient}/security`,class:"navbar-item"},{default:(0,i.w5)((()=>[(0,i.Uk)("Security")])),_:1},8,["to"]),P,(0,i._)("a",{class:"navbar-item has-text-danger",onClick:t[3]||(t[3]=(...a)=>d.logout&&d.logout(...a))},F)])],2),(0,i._)("div",{class:(0,s.C_)(["navbar-item has-dropdown is-hidden-mobile",{"is-active":l.isActiveMenuDropdown}])},[(0,i._)("a",{class:"navbar-item",onClick:t[5]||(t[5]=a=>l.isActiveMenuDropdown=!l.isActiveMenuDropdown)},j),(0,i._)("div",Y,[O,(0,i._)("a",{class:"navbar-item",onClick:t[6]||(t[6]=a=>this.$router.push("/contactus"))},"Contact Us")])],2)])):((0,i.wg)(),(0,i.iD)("div",T,[(0,i._)("div",R,[(0,i._)("div",V,[(0,i.Wm)(u,{to:"/user/login",class:"button is-dark is-inverted",style:{"background-color":"transparent"}},{default:(0,i.w5)((()=>[(0,i.Uk)("Log in")])),_:1}),(0,i.Wm)(u,{to:"/user/signup",class:"button is-info"},{default:(0,i.w5)((()=>[W])),_:1})])]),(0,i._)("div",{class:(0,s.C_)(["navbar-item has-dropdown is-hidden-mobile",{"is-active":l.isActiveMenuDropdown}])},[(0,i._)("a",{class:"navbar-item",onClick:t[7]||(t[7]=a=>l.isActiveMenuDropdown=!l.isActiveMenuDropdown)},B),(0,i._)("div",E,[G,(0,i._)("a",{class:"navbar-item",onClick:t[8]||(t[8]=a=>this.$router.push("/contactus"))},"Contact Us")])],2)]))],2)]),(0,i._)("div",{class:(0,s.C_)(["modal",{"is-active":l.isActiveModal}])},[J,(0,i._)("div",Q,[(0,i._)("section",X,[(0,i._)("p",aa,(0,s.zw)("Med Search"==l.viewNotif.from?`From ${l.viewNotif.from}`:`From\n                Dr. ${l.viewNotif.from}`),1),(0,i._)("p",ta,(0,s.zw)(new Date(l.viewNotif.date).toDateString()),1),(0,i._)("p",ea,(0,s.zw)(l.viewNotif.message),1),l.viewNotif.id?((0,i.wg)(),(0,i.iD)("div",ia,[(0,i._)("figure",sa,[(0,i._)("img",{loading:"lazy",src:`https://res.cloudinary.com/leindfraust/image/upload/v1/assets/patientimgmsg/patientCopy/${l.viewNotif.id}.jpg`},null,8,na)]),(0,i._)("div",la,[(0,i._)("a",{href:`https://res.cloudinary.com/leindfraust/image/upload/v1/assets/patientimgmsg/patientCopy/${l.viewNotif.id}.jpg`,class:"button",download:""},"Download File",8,oa)])])):(0,i.kq)("",!0)])]),(0,i._)("button",{class:"modal-close is-large","aria-label":"close",onClick:t[9]||(t[9]=(...a)=>d.closeNotificationModal&&d.closeNotificationModal(...a))})],2)],64)}var ra=e(9669),da=e.n(ra),ua=e(4058),va={name:"NavigationTab",async mounted(){await da().get(`https://res.cloudinary.com/leindfraust/image/upload/v1/assets/patients/${this.$store.state.patientUsername}.jpg`).then((a=>200==a.status?this.$store.commit("checkProfileImg",!0):this.$store.commit("checkProfileImg",!1))).catch((a=>a?this.$store.commit("checkProfileImg",!1):this.$store.commit("checkProfileImg",!0))),this.checkImgState=!0,this.$store.state.patientID&&(ua.Z.connect(),ua.Z.emit("join room",this.$store.state.patientID),ua.Z.on("send messages",(a=>{this.notifications=a})),ua.Z.on("delete messages",(a=>{this.notifications=a})),ua.Z.on("messages",(a=>{this.notifications=a})))},data(){return{isActiveNotifications:!1,isActiveModal:!1,isActiveProfileDropdown:!1,isActiveMenuDropdown:!1,isActive:!1,patient:this.$store.state.patientUsername,notifications:[],viewNotif:[],checkImgState:!1}},methods:{navbar(){this.isActive=!this.isActive},async logout(){await this.$store.commit("patientID",null),await this.$store.commit("patientUsername",""),await da()["delete"]("/session/patient"),await this.$router.push("/user/login"),ua.Z.disconnect()},notification(){this.isActiveNotifications=!this.isActiveNotifications},async deleteNotif(a){await da().post("/api/imgUploadImgMsgDeletePatient",{id:"assets/patientimgmsg/patientCopy/"+a.id}),ua.Z.emit("delete message",this.$store.state.patientID,a)},openNotif(a,t){this.viewNotif=a,this.isActiveModal=!0,this.viewNotif.new&&(this.notifications[t].new=!1,ua.Z.emit("update message",this.notifications))},closeNotificationModal(){this.isActiveModal=!1}}},pa=e(3744);const ma=(0,pa.Z)(va,[["render",ca],["__scopeId","data-v-74b627be"]]);var ha=ma},692:function(a,t,e){e.r(t),e.d(t,{default:function(){return ut}});var i=e(6252),s=e(2262),n=e(3577),l=e(9963),o=e(1199),c=e(9669),r=e.n(c),d=e(3907),u=e(2201);const v=a=>((0,i.dD)("data-v-64938f7a"),a=a(),(0,i.Cn)(),a),p={class:"section"},m={id:"wrapper-container",style:{width:"75%",margin:"auto"}},h={key:0,class:"container"},g={class:"columns is-vcentered"},_={class:"column is-4"},w={class:"field",id:"file-img"},b={key:0,class:"image is-square image-outer"},f=["Src"],k=["src"],y=(0,i.uE)('<div class="buttons is-hidden-mobile" style="bottom:5%;right:10%;position:absolute;" data-v-64938f7a><label for="file-input" style="cursor:pointer;" data-v-64938f7a><a class="button is-responsive" style="border-radius:50%;height:50px;width:50px;" data-v-64938f7a><i class="fa-solid fa-camera" data-v-64938f7a></i></a></label></div><div class="buttons is-hidden-desktop" style="bottom:15%;left:75%;position:absolute;" data-v-64938f7a><label for="file-input" style="cursor:pointer;" data-v-64938f7a><a class="button is-large is-responsive" style="border-radius:50%;height:35px;width:35px;" data-v-64938f7a><i class="fa-solid fa-camera" data-v-64938f7a></i></a></label></div>',2),D={key:1,class:"image is-square image-outer"},U=["Src"],S=["src"],C=(0,i.uE)('<div class="buttons is-hidden-mobile" style="bottom:5%;right:10%;position:absolute;" data-v-64938f7a><label for="file-input" style="cursor:pointer;" data-v-64938f7a><a class="button is-medium is-responsive" data-v-64938f7a><i class="fa-solid fa-camera" data-v-64938f7a></i></a></label></div><div class="buttons is-hidden-desktop" style="bottom:15%;left:75%;position:absolute;" data-v-64938f7a><label for="file-input" style="cursor:pointer;" data-v-64938f7a><a class="button is-medium is-responsive" data-v-64938f7a><i class="fa-solid fa-camera" data-v-64938f7a></i></a></label></div>',2),x={class:"control is-hidden"},N={class:"buttons is-centered"},A={class:"column"},z={key:0,class:"notification is-danger"},$={key:1,class:"notification is-success"},H={class:"field is-horizontal"},I={class:"field-body"},M={class:"field"},q=v((()=>(0,i._)("label",{class:"label"},"Email:",-1))),P={key:0,class:"controls"},L={key:1,class:"controls"},F=v((()=>(0,i._)("input",{type:"text",class:"input",placeholder:"Register an email for this account."},null,-1))),Z=[F],j={class:"field is-horizontal"},Y={class:"field-body"},O={class:"field"},T=v((()=>(0,i._)("label",{class:"label"},"First Name:",-1))),R={class:"controls"},V={class:"field"},W=v((()=>(0,i._)("label",{class:"label"},"Last Name:",-1))),K={class:"controls"},B={class:"field is-horizontal"},E={class:"field-body"},G={class:"field"},J={class:"control"},Q=v((()=>(0,i._)("label",{class:"label"},"Province:",-1))),X={class:"dropdown-trigger"},aa={key:0},ta={key:1},ea={class:"dropdown-menu"},ia=["onClick"],sa={class:"field"},na={class:"control"},la=v((()=>(0,i._)("div",{class:"label"},"City/Municipality:",-1))),oa={class:"dropdown-trigger"},ca=["disabled"],ra={key:0},da={key:1},ua={key:0,class:"dropdown-menu"},va=["onClick"],pa={class:"field"},ma=v((()=>(0,i._)("label",{class:"label"},"Current Address:",-1))),ha={class:"controls"},ga=v((()=>(0,i._)("br",null,null,-1))),_a={class:"dropdown-trigger"},wa=v((()=>(0,i._)("span",{class:"icon is-small"},[(0,i._)("i",{class:"fas fa-angle-down","aria-hidden":"true"})],-1))),ba={class:"dropdown-menu"},fa={class:"dropdown-content"},ka=v((()=>(0,i._)("div",{class:"block"},null,-1))),ya={class:"field has-addons"},Da=v((()=>(0,i._)("div",{class:"control"},[(0,i._)("button",{class:"button is-static fa fa-search"})],-1))),Ua={class:"control"},Sa={key:1,class:"container"},Ca={key:0,class:"table-container"},xa={class:"table is-striped is-fullwidth is-bordered"},Na=v((()=>(0,i._)("thead",null,[(0,i._)("tr",null,[(0,i._)("th",{class:"has-text-black-ter"},"Controls"),(0,i._)("th",{class:"has-text-black-ter"},"Reference ID"),(0,i._)("th",{class:"has-text-black-ter"},"Schedule"),(0,i._)("th",{class:"has-text-black-ter"},"Priority No."),(0,i._)("th",{class:"has-text-black-ter"},"Hospital Appointed"),(0,i._)("th",{class:"has-text-black-ter"},"Doctor Appointed"),(0,i._)("th",{class:"has-text-black-ter"},"First Name"),(0,i._)("th",{class:"has-text-black-ter"},"Last Name"),(0,i._)("th",{class:"has-text-black-ter"},"Contact Number"),(0,i._)("th",{class:"has-text-black-ter"},"Birthday"),(0,i._)("th",{class:"has-text-black-ter"},"Symptoms/Comments")])],-1))),Aa=["onClick"],za=v((()=>(0,i._)("br",null,null,-1))),$a={class:"has-text-black-ter"},Ha={class:"has-text-black-ter"},Ia={class:"has-text-black-ter"},Ma={class:"has-text-black-ter"},qa={class:"has-text-black-ter"},Pa={class:"has-text-black-ter"},La={class:"has-text-black-ter"},Fa={class:"has-text-black-ter"},Za={class:"has-text-black-ter"},ja={class:"has-text-black-ter"},Ya={key:1,class:"container"},Oa=v((()=>(0,i._)("div",{class:"notification is-info"},"You do not have any ongoing appointments.",-1))),Ta=[Oa],Ra={key:2,class:"container"},Va={key:0,class:"table-container"},Wa={class:"table is-striped is-fullwidth is-bordered"},Ka=v((()=>(0,i._)("thead",null,[(0,i._)("tr",null,[(0,i._)("th",{class:"has-text-black-ter"},"Visited"),(0,i._)("th",{class:"has-text-black-ter"},"Reference ID"),(0,i._)("th",{class:"has-text-black-ter"},"Schedule"),(0,i._)("th",{class:"has-text-black-ter"},"Priority No."),(0,i._)("th",{class:"has-text-black-ter"},"Hospital Appointed"),(0,i._)("th",{class:"has-text-black-ter"},"Doctor Appointed"),(0,i._)("th",{class:"has-text-black-ter"},"First Name"),(0,i._)("th",{class:"has-text-black-ter"},"Last Name"),(0,i._)("th",{class:"has-text-black-ter"},"Contact Number"),(0,i._)("th",{class:"has-text-black-ter"},"Birthday"),(0,i._)("th",{class:"has-text-black-ter"},"Symptoms/Comments")])],-1))),Ba={class:"has-text-black-ter"},Ea={class:"has-text-black-ter"},Ga={class:"has-text-black-ter"},Ja={class:"has-text-black-ter"},Qa={class:"has-text-black-ter"},Xa={class:"has-text-black-ter"},at={class:"has-text-black-ter"},tt={class:"has-text-black-ter"},et={class:"has-text-black-ter"},it={class:"has-text-black-ter"},st={class:"has-text-black-ter"},nt={key:1,class:"container"},lt=v((()=>(0,i._)("div",{class:"notification is-info"},"You do not have any past appointments.",-1))),ot=[lt];var ct={__name:"UserProfile",setup(a){const t=(0,d.oR)(),e=(0,u.tv)();let c=(0,s.iH)([]),v=(0,s.iH)([]),F=(0,s.iH)([]),Oa=(0,s.iH)([]),lt=(0,s.iH)([]),ct=(0,s.iH)(""),rt=(0,s.iH)(""),dt=(0,s.iH)(!1),ut=(0,s.iH)(!1),vt=(0,s.iH)(""),pt=(0,s.iH)(!1),mt=(0,s.iH)(!1),ht=(0,s.iH)(!0),gt=(0,s.iH)(!1),_t=(0,s.iH)(),wt=(0,s.iH)(!1),bt=(0,s.iH)(),ft=(0,s.iH)(""),kt=(0,s.iH)(!1);(0,i.bv)((async()=>{await r().post("/api/appointmentList/patients",{id:t.state.patientID,ongoing:!0}).then((a=>c.value=a.data)),await r().post("/api/appointmentList/patients",{id:t.state.patientID,ongoing:!1}).then((a=>v.value=a.data)),await r().get("/session/patient").then((a=>F.value=a.data)),await r().get("/api/geolocation").then((a=>Oa.value=a.data)),ct.value=await F.value.province,rt.value=await F.value.city,await r().get("/api/geolocation").then((a=>lt.value=a.data.find((a=>a.province===ct.value)))),lt.value=await lt.value.citiesOrMunicipalities.sort(((a,t)=>a.name>t.name?1:-1))}));const yt=(0,i.Fl)((()=>St())),Dt=(0,i.Fl)((()=>Ut()));function Ut(){return v.value.sort(((a,t)=>new Date(t.schedule[0].date).getTime()-new Date(a.schedule[0].date).getTime())).filter((a=>a.referenceID.toLowerCase().includes(ft.value.toLowerCase())))}function St(){return c.value.sort(((a,t)=>{new Date(a.schedule[0].date).getTime(),new Date(t.schedule[0].date).getTime()})).filter((a=>a.referenceID.toLowerCase().includes(ft.value.toLowerCase())))}async function Ct(a){dt.value=!1,rt.value="",ct.value=a,await r().get("/api/geolocation").then((t=>lt.value=t.data.find((t=>t.province===a)))),lt.value=await lt.value.citiesOrMunicipalities.sort(((a,t)=>a.name>t.name?1:-1))}function xt(a){ut.value=!1,rt.value=a}function Nt(a){_t.value=a.target.files[0],bt.value=URL.createObjectURL(_t.value),wt.value=!0}async function At(){try{await r().put("/session/patient/",{name:[F.value.name[0],F.value.name[1]],province:ct.value,city:rt.value,currentAddress:F.value.currentAddress}),await r().put(`/api/user/${F.value._id}`,{name:[F.value.name[0],F.value.name[1]],province:ct.value,city:rt.value,currentAddress:F.value.currentAddress}),pt.value=!0,vt.value="",await r().get("/session/patient").then((a=>F.value=a.data)),await r().get("/api/geolocation").then((a=>Oa.value=a.data)),ct.value=await F.value.province,rt.value=await F.value.city,await r().get("/api/geolocation").then((a=>lt.value=a.data.find((a=>a.province===ct.value)))),lt.value=await lt.value.citiesOrMunicipalities.sort(((a,t)=>a.name>t.name?1:-1))}catch(a){vt.value=a}}async function zt(a){try{await r()["delete"](`/api/appointmentList/${a}`),await r().post("/api/appointmentList/patients",{id:t.state.patientID,ongoing:!0}).then((a=>c.value=a.data)),await r().post("/api/appointmentList/patients",{id:t.state.patientID,ongoing:!1}).then((a=>v.value=a.data))}catch(e){vt.value=e}}async function $t(){kt.value=!0;const a=new FormData;a.append("username",t.state.patientUsername),a.append("imgFile",_t.value);try{await r().post("/api/imgUploadPatient",a,{headers:{"Content-Type":"multipart/form-data"}}).then((async a=>{a&&(t.commit("imgSuccess",!0),await e.push("/imgUploadSuccessPatient"))}))}catch(i){vt.value=i,console.log(i)}kt.value=!1}return(a,e)=>{const c=(0,i.up)("router-link");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i.Wm)(o.Z),(0,i._)("section",p,[(0,i._)("div",m,[0!==(0,s.SU)(F).length?((0,i.wg)(),(0,i.iD)("div",h,[(0,i._)("div",g,[(0,i._)("div",_,[(0,i._)("div",w,[(0,s.SU)(t).state.checkProfileImg?((0,i.wg)(),(0,i.iD)("figure",b,[(0,s.SU)(bt)?((0,i.wg)(),(0,i.iD)("img",{key:0,class:"is-rounded image-inner",Src:(0,s.SU)(bt)},null,8,f)):((0,i.wg)(),(0,i.iD)("img",{key:1,class:"is-rounded image-inner",src:`https://res.cloudinary.com/leindfraust/image/v${(new Date).getMonth()}${(new Date).getDate()}/upload/assets/patients/${(0,s.SU)(t).state.patientUsername}.jpg`},null,8,k)),y])):((0,i.wg)(),(0,i.iD)("figure",D,[(0,s.SU)(bt)?((0,i.wg)(),(0,i.iD)("img",{key:0,class:"is-rounded image-inner",Src:(0,s.SU)(bt)},null,8,U)):((0,i.wg)(),(0,i.iD)("img",{key:1,class:"is-rounded image-inner",src:`https://ui-avatars.com/api/?name=${(0,s.SU)(t).state.patientUsername}`},null,8,S)),C])),(0,i._)("div",x,[(0,i._)("input",{id:"file-input",onChange:e[0]||(e[0]=a=>Nt(a)),class:"input",type:"file"},null,32)])]),(0,i._)("div",N,[(0,s.SU)(wt)?((0,i.wg)(),(0,i.iD)("button",{key:0,class:"button",onClick:e[1]||(e[1]=a=>((0,s.dq)(bt)?bt.value=null:bt=null,(0,s.dq)(wt)?wt.value=!1:wt=!1))},"Cancel")):(0,i.kq)("",!0),(0,s.SU)(wt)?((0,i.wg)(),(0,i.iD)("button",{key:1,class:(0,n.C_)(["button is-info",{"is-loading":(0,s.SU)(kt)}]),onClick:$t},"Upload Photo",2)):(0,i.kq)("",!0)])]),(0,i._)("div",A,[(0,s.SU)(vt)?((0,i.wg)(),(0,i.iD)("div",z,[(0,i.Uk)(" Oops, something went wrong. Try again later or "),(0,i.Wm)(c,{to:"/contactus"},{default:(0,i.w5)((()=>[(0,i.Uk)("contact us")])),_:1})])):(0,i.kq)("",!0),(0,s.SU)(pt)?((0,i.wg)(),(0,i.iD)("div",$,"Changes have been pushed.")):(0,i.kq)("",!0),(0,i._)("div",H,[(0,i._)("div",I,[(0,i._)("div",M,[q,(0,s.SU)(F).email.includes("dummyemail@email.com")?((0,i.wg)(),(0,i.iD)("div",L,Z)):((0,i.wg)(),(0,i.iD)("div",P,[(0,i.wy)((0,i._)("input",{type:"text",class:"input","onUpdate:modelValue":e[2]||(e[2]=a=>(0,s.SU)(F).email=a)},null,512),[[l.nr,(0,s.SU)(F).email]])]))])])]),(0,i._)("div",j,[(0,i._)("div",Y,[(0,i._)("div",O,[T,(0,i._)("div",R,[(0,i.wy)((0,i._)("input",{type:"text",class:"input","onUpdate:modelValue":e[3]||(e[3]=a=>(0,s.SU)(F).name[0]=a)},null,512),[[l.nr,(0,s.SU)(F).name[0]]])])]),(0,i._)("div",V,[W,(0,i._)("div",K,[(0,i.wy)((0,i._)("input",{type:"text",class:"input","onUpdate:modelValue":e[4]||(e[4]=a=>(0,s.SU)(F).name[1]=a)},null,512),[[l.nr,(0,s.SU)(F).name[1]]])])])])]),(0,i._)("div",B,[(0,i._)("div",E,[(0,i._)("div",G,[(0,i._)("div",J,[Q,(0,i._)("div",{class:(0,n.C_)(["dropdown",{"is-active":(0,s.SU)(dt)}])},[(0,i._)("div",X,[(0,i._)("button",{class:"button",onClick:e[5]||(e[5]=a=>(0,s.dq)(dt)?dt.value=!(0,s.SU)(dt):dt=!(0,s.SU)(dt))},[""==(0,s.SU)(ct)?((0,i.wg)(),(0,i.iD)("span",aa,"Select")):((0,i.wg)(),(0,i.iD)("span",ta,(0,n.zw)((0,s.SU)(ct)),1))])]),(0,i._)("div",ea,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)((0,s.SU)(Oa),(a=>((0,i.wg)(),(0,i.iD)("div",{class:"dropdown-content",key:a._id},[(0,i._)("a",{class:"dropdown-item",onClick:t=>Ct(a.province)},(0,n.zw)(a.province),9,ia)])))),128))])],2)])]),(0,i._)("div",sa,[(0,i._)("div",na,[la,(0,i._)("div",{class:(0,n.C_)(["dropdown",{"is-active":(0,s.SU)(ut)}])},[(0,i._)("div",oa,[(0,i._)("button",{class:"button","aria-haspopup":"true",onClick:e[6]||(e[6]=a=>(0,s.dq)(ut)?ut.value=!(0,s.SU)(ut):ut=!(0,s.SU)(ut)),disabled:""==(0,s.SU)(ct)},[""==(0,s.SU)(rt)?((0,i.wg)(),(0,i.iD)("span",ra,"Select")):((0,i.wg)(),(0,i.iD)("span",da,(0,n.zw)((0,s.SU)(rt)),1))],8,ca)]),(0,s.SU)(ct)?((0,i.wg)(),(0,i.iD)("div",ua,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)((0,s.SU)(lt),(a=>((0,i.wg)(),(0,i.iD)("div",{class:"dropdown-content",key:a.name},[(0,i._)("a",{class:"dropdown-item",onClick:t=>xt(a.name)},(0,n.zw)(a.name),9,va)])))),128))])):(0,i.kq)("",!0)],2)])]),(0,i._)("div",pa,[ma,(0,i._)("div",ha,[(0,i.wy)((0,i._)("input",{type:"text",class:"input","onUpdate:modelValue":e[7]||(e[7]=a=>(0,s.SU)(F).currentAddress=a)},null,512),[[l.nr,(0,s.SU)(F).currentAddress]])])])])]),(0,i._)("div",{class:"field is-grouped is-grouped-right"},[(0,i._)("p",{class:"control"},[(0,i._)("a",{class:"button is-info",onClick:At},"Save changes")])])])])])):(0,i.kq)("",!0),ga,(0,i._)("div",{class:(0,n.C_)(["dropdown",{"is-active":(0,s.SU)(mt)}])},[(0,i._)("div",_a,[(0,i._)("button",{class:"button",onClick:e[8]||(e[8]=a=>(0,s.dq)(mt)?mt.value=!(0,s.SU)(mt):mt=!(0,s.SU)(mt))},[(0,i._)("span",null,(0,n.zw)((0,s.SU)(ht)?"Ongoing Appointments":"Past Appointments"),1),wa])]),(0,i._)("div",ba,[(0,i._)("div",fa,[(0,i._)("a",{class:"dropdown-item",onClick:e[9]||(e[9]=a=>((0,s.dq)(ht)?ht.value=!(0,s.SU)(ht):ht=!(0,s.SU)(ht),(0,s.dq)(gt)?gt.value=!(0,s.SU)(gt):gt=!(0,s.SU)(gt),(0,s.dq)(mt)?mt.value=!(0,s.SU)(mt):mt=!(0,s.SU)(mt)))},(0,n.zw)((0,s.SU)(ht)?"Past Appointments":"Ongoing Appointments"),1)])])],2),ka,(0,i._)("div",ya,[Da,(0,i._)("div",Ua,[(0,i.wy)((0,i._)("input",{type:"text",class:"input",placeholder:"Search Reference ID","onUpdate:modelValue":e[10]||(e[10]=a=>(0,s.dq)(ft)?ft.value=a:ft=a)},null,512),[[l.nr,(0,s.SU)(ft)]])])]),(0,s.SU)(ht)?((0,i.wg)(),(0,i.iD)("div",Sa,[0!==Object.keys((0,s.SU)(yt)).length?((0,i.wg)(),(0,i.iD)("div",Ca,[(0,i._)("table",xa,[Na,((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)((0,s.SU)(yt),(a=>((0,i.wg)(),(0,i.iD)("tbody",{key:a._id},[(0,i._)("tr",null,[(0,i._)("button",{class:"dropdown-item button has-text-danger",type:"button",onClick:t=>zt(a._id)},"Cancel",8,Aa),za,(0,i._)("th",$a,(0,n.zw)(a.referenceID),1),(0,i._)("th",Ha,(0,n.zw)(new Date(a.schedule[0].date).toDateString()),1),(0,i._)("th",Ia,(0,n.zw)(a.priorityNum),1),(0,i._)("th",Ma,(0,n.zw)(a.hospital),1),(0,i._)("th",qa,(0,n.zw)(a.doctorName),1),(0,i._)("td",Pa,(0,n.zw)(a.firstName),1),(0,i._)("td",La,(0,n.zw)(a.lastName),1),(0,i._)("td",Fa,(0,n.zw)(a.contactNum),1),(0,i._)("td",Za,(0,n.zw)(a.birthDay),1),(0,i._)("td",ja,(0,n.zw)(a.comments),1)])])))),128))])])):((0,i.wg)(),(0,i.iD)("div",Ya,Ta))])):(0,i.kq)("",!0),(0,s.SU)(gt)?((0,i.wg)(),(0,i.iD)("div",Ra,[0!==Object.keys((0,s.SU)(Dt)).length?((0,i.wg)(),(0,i.iD)("div",Va,[(0,i._)("table",Wa,[Ka,((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)((0,s.SU)(Dt),(a=>((0,i.wg)(),(0,i.iD)("tbody",{key:a._id},[(0,i._)("tr",null,[(0,i._)("th",Ba,(0,n.zw)(a.ifPatientVisited?"Yes":"No"),1),(0,i._)("th",Ea,(0,n.zw)(a.referenceID),1),(0,i._)("th",Ga,(0,n.zw)(new Date(a.schedule[0].date).toDateString()),1),(0,i._)("th",Ja,(0,n.zw)(a.priorityNum),1),(0,i._)("th",Qa,(0,n.zw)(a.hospital),1),(0,i._)("th",Xa,(0,n.zw)(a.doctorName),1),(0,i._)("td",at,(0,n.zw)(a.firstName),1),(0,i._)("td",tt,(0,n.zw)(a.lastName),1),(0,i._)("td",et,(0,n.zw)(a.contactNum),1),(0,i._)("td",it,(0,n.zw)(a.birthDay),1),(0,i._)("td",st,(0,n.zw)(a.comments),1)])])))),128))])])):((0,i.wg)(),(0,i.iD)("div",nt,ot))])):(0,i.kq)("",!0)])])],64)}}},rt=e(3744);const dt=(0,rt.Z)(ct,[["__scopeId","data-v-64938f7a"]]);var ut=dt},475:function(a,t,e){a.exports=e.p+"img/medi-search-horizontal.d15d9e4c.png"}}]);
//# sourceMappingURL=692.14ea0461.js.map