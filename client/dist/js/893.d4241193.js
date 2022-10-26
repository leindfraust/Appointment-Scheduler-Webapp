"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[893],{4432:function(i,e,t){t.r(e),t.d(e,{default:function(){return Ui}});var a=t(6252),s=t(3577),l=t(9963);const o=i=>((0,a.dD)("data-v-aa722d4a"),i=i(),(0,a.Cn)(),i),n={id:"background"},r=o((()=>(0,a._)("div",{class:"modal-background"},null,-1))),c=o((()=>(0,a._)("div",{class:"modal-content",style:{overflow:"hidden"}},[(0,a._)("div",{class:"loader",style:{margin:"auto"}})],-1))),d=[r,c],p=o((()=>(0,a._)("div",{class:"modal-background"},null,-1))),u={class:"modal-content",style:{overflow:"auto"}},h={class:"box"},g={class:"section has-text-centered"},m={class:"has-text-left"},f=o((()=>(0,a._)("label",{class:"label"},"Choose Preferred Date",-1))),v=o((()=>(0,a._)("div",{class:"block"},null,-1))),y=o((()=>(0,a._)("label",{class:"label"},"Choose Preferred Time ",-1))),w={class:"buttons is-centered"},_=o((()=>(0,a._)("div",{class:"block"},null,-1))),D={class:"buttons is-centered"},b=["disabled"],k=o((()=>(0,a._)("div",{class:"block is-hidden-desktop"},null,-1))),F={key:0},C={class:"columns is-mobile",style:{overflow:"auto"}},T={class:"column is-narrow"},L={class:"select is-rounded"},H=o((()=>(0,a._)("option",{value:!1},"Sort by Recommended",-1))),S=o((()=>(0,a._)("option",{value:!0},"Sort by Nearest",-1))),U=[H,S],$={class:"column is-narrow"},N={class:"select is-rounded"},P=o((()=>(0,a._)("option",{value:"",disabled:""},"City/Municipality",-1))),z=o((()=>(0,a._)("option",{value:""},"Any",-1))),M={class:"column is-narrow"},x={class:"select is-rounded"},q=(0,a.uE)('<option value="" disabled data-v-aa722d4a>Type of Facility</option><option value="" data-v-aa722d4a>Any</option><option value="Public" data-v-aa722d4a>Public Hospital</option><option value="Private" data-v-aa722d4a>Private Hospital</option><option value="Clinic" data-v-aa722d4a>Clinic</option>',5),A=[q],I={class:"column is-narrow"},O={class:"select is-rounded"},V=o((()=>(0,a._)("option",{value:"",disabled:""},"Specialist",-1))),Z=o((()=>(0,a._)("option",{value:""},"Any",-1))),Y=["value"],K={class:"column is-narrow"},E=o((()=>(0,a._)("i",{class:"has-text-link fa-sharp fa-solid fa-angle-down"},null,-1))),W={class:"column"},B={class:"is-pulled-right"},R={class:"field has-addons"},j={class:"control has-icons-left"},G=o((()=>(0,a._)("span",{class:"icon is-small is-left"},[(0,a._)("i",{class:"fa-solid fa-location-dot"})],-1))),J={id:"provinces"},Q={class:"control"},X=["disabled"],ii={class:"columns"},ei={key:0,class:"column",style:{"max-height":"100vh",overflow:"auto"}},ti={class:"container is-fluid"},ai={class:"column is-5"},si=["onClick"],li={class:"image is-3by2 is-rounded"},oi=["src"],ni={class:"column"},ri={key:0,class:"notification is-info is-light"},ci=["onClick"],di={class:"title is-4"},pi={class:"subtitle is-6"},ui=o((()=>(0,a._)("br",null,null,-1))),hi={class:"content"},gi=o((()=>(0,a._)("b",null,"Type of Facility:",-1))),mi={key:0},fi={class:"subtitle is-6"},vi=o((()=>(0,a._)("b",null,"Contacts:",-1))),yi=o((()=>(0,a._)("hr",null,null,-1))),wi={key:0,class:"column notification is-danger is-light has-text-centered"},_i={key:1,class:"column notification is-danger is-light has-text-centered"},Di={class:"column is-5"},bi=["src"];function ki(i,e,t,o,r,c){const H=(0,a.up)("NavigationTab"),S=(0,a.up)("v-date-picker"),q=(0,a.up)("FooterBlock");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a._)("div",n,[(0,a.Wm)(H),(0,a._)("div",{class:(0,s.C_)(["modal",{"is-active":r.isHospitalLoading}])},d,2),(0,a._)("div",{class:(0,s.C_)(["modal",{"is-active":r.dateTimeFilter}])},[p,(0,a._)("div",u,[(0,a._)("div",h,[(0,a._)("section",g,[(0,a._)("div",m,[(0,a._)("button",{class:"button is-info",onClick:e[0]||(e[0]=i=>(r.filterDate="",r.filterTime="",r.clearFilterDateTime=!0))},"Clear Filter")]),f,(0,a.Wm)(S,{modelValue:r.filterDate,"onUpdate:modelValue":e[1]||(e[1]=i=>r.filterDate=i),"is-expanded":""},null,8,["modelValue"]),v,y,(0,a._)("div",w,[(0,a._)("button",{class:(0,s.C_)(["button",{"is-active":"AM"==r.filterTime}]),onClick:e[2]||(e[2]=i=>r.filterTime="AM")},"AM",2),(0,a._)("button",{class:(0,s.C_)(["button",{"is-active":"PM"==r.filterTime}]),onClick:e[3]||(e[3]=i=>r.filterTime="PM")},"PM",2)]),_,(0,a._)("div",D,[(0,a._)("button",{class:"button",onClick:e[4]||(e[4]=i=>r.dateTimeFilter=!1)},"Cancel"),r.clearFilterDateTime?((0,a.wg)(),(0,a.iD)("button",{key:1,class:"button is-info",onClick:e[6]||(e[6]=i=>(c.filterSpecialistDateTime(),r.dateTimeFilter=!1,r.clearFilterDateTime=!1))},"Confirm")):((0,a.wg)(),(0,a.iD)("button",{key:0,class:"button is-info",disabled:null==r.filterTime||null==r.filterDate,onClick:e[5]||(e[5]=i=>(c.filterSpecialistDateTime(),r.dateTimeFilter=!1))},"Confirm",8,b))])])])])],2),k,""!=r.citiesOrMunicipalities?((0,a.wg)(),(0,a.iD)("div",F,[(0,a._)("div",C,[(0,a._)("div",T,[(0,a._)("div",L,[(0,a.wy)((0,a._)("select",{"onUpdate:modelValue":e[7]||(e[7]=i=>r.distanceFilter=i)},U,512),[[l.bM,r.distanceFilter]])])]),(0,a._)("div",$,[(0,a._)("div",N,[(0,a.wy)((0,a._)("select",{"onUpdate:modelValue":e[8]||(e[8]=i=>r.city=i)},[P,z,((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(r.citiesOrMunicipalities.citiesOrMunicipalities.sort(((i,e)=>i.name>e.name?1:-1)),((i,e)=>((0,a.wg)(),(0,a.iD)("option",{key:e},(0,s.zw)(i.name),1)))),128))],512),[[l.bM,r.city]])])]),(0,a._)("div",M,[(0,a._)("div",x,[(0,a.wy)((0,a._)("select",{"onUpdate:modelValue":e[9]||(e[9]=i=>r.typeFilter=i)},A,512),[[l.bM,r.typeFilter]])])]),(0,a._)("div",I,[(0,a._)("div",O,[(0,a.wy)((0,a._)("select",{"onUpdate:modelValue":e[10]||(e[10]=i=>r.filterSpecialist=i),onChange:e[11]||(e[11]=(...i)=>c.filterSpecialistDateTime&&c.filterSpecialistDateTime(...i))},[V,Z,((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(r.specializations,(i=>((0,a.wg)(),(0,a.iD)("option",{key:i,value:i},(0,s.zw)(i),9,Y)))),128))],544),[[l.bM,r.filterSpecialist]])])]),(0,a._)("div",K,[(0,a._)("button",{class:"button is-rounded",onClick:e[12]||(e[12]=i=>r.dateTimeFilter=!0)},[(0,a.Uk)((0,s.zw)(r.filterDate&&r.filterTime?`${new Date(r.filterDate).toDateString()}, ${r.filterTime}`:"Date and Time")+"  ",1),E])]),(0,a._)("div",W,[(0,a._)("div",B,[(0,a._)("div",R,[(0,a._)("div",j,[(0,a.wy)((0,a._)("input",{class:"input",type:"text","onUpdate:modelValue":e[13]||(e[13]=i=>r.province=i),style:{width:"300px"},placeholder:"What province are you located?",list:"provinces"},null,512),[[l.nr,r.province]]),G]),(0,a._)("datalist",J,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(c.geolocationIndexed,(i=>((0,a.wg)(),(0,a.iD)("option",{key:i._id},(0,s.zw)(i.province),1)))),128))]),(0,a._)("div",Q,[(0,a._)("button",{class:"button is-info is-rounded",onClick:e[14]||(e[14]=i=>c.loadProvider()),disabled:""==r.province},"Search",8,X)])])])])]),(0,a._)("div",ii,[0!==r.geoHospitalNearestUser.length?((0,a.wg)(),(0,a.iD)("div",ei,[(0,a._)("div",ti,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(c.geoHospitalNearestUserIndexed,((i,e)=>((0,a.wg)(),(0,a.iD)("div",{class:"columns has-text-left",id:"hospital",style:{"margin-bottom":"5%"},key:e},[(0,a._)("div",ai,[(0,a._)("a",{onClick:e=>c.bookAppointment(i)},[(0,a._)("figure",li,[(0,a._)("img",{loading:"lazy",style:{"border-radius":"10px"},src:`https://res.cloudinary.com/leindfraust/image/upload/v${(new Date).getMonth()}${(new Date).getDate()}/assets/managers/${i.hospital}.jpg`},null,8,oi)])],8,si)]),(0,a._)("div",ni,[0!==i?.arrFilter?((0,a.wg)(),(0,a.iD)("div",ri,(0,s.zw)(i?.arrFilter)+" "+(0,s.zw)(new Date(r.filterDate)instanceof Date&&!isNaN(new Date(r.filterDate))&&null!=r.filterTime?`available ${r.filterSpecialist} on ${new Date(r.filterDate).toDateString()}, ${r.filterTime}`:`available\n                                    ${r.filterSpecialist}`),1)):(0,a.kq)("",!0),(0,a._)("a",{onClick:e=>c.bookAppointment(i)},[(0,a._)("h1",di,(0,s.zw)(i.hospital),1),(0,a._)("p",pi,(0,s.zw)(i.barangayORStreet)+", "+(0,s.zw)(i.city)+", "+(0,s.zw)(i.province),1)],8,ci),ui,(0,a._)("div",hi,[gi,(0,a.Uk)(" "+(0,s.zw)(i.type)+" ",1),"undefined"!==typeof i.details[0].contacts?((0,a.wg)(),(0,a.iD)("span",mi,[(0,a._)("p",fi,[vi,(0,a.Uk)(),((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(i.details[0].contacts,((i,e)=>((0,a.wg)(),(0,a.iD)("span",{key:e},(0,s.zw)(i.contact+" "),1)))),128))])])):(0,a.kq)("",!0)])]),yi])))),128))]),0==c.geoHospitalNearestUserIndexed.length?((0,a.wg)(),(0,a.iD)("div",wi," Sorry, no Hospitals/Clinics has been found. ")):(0,a.kq)("",!0)])):r.isHospitalLoading?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("div",_i," Hospitals/Clinics not found, please try again or search another province. ")),(0,a._)("div",Di,[(0,a._)("iframe",{loading:"lazy",id:"geoIframe",src:`https://maps.google.com/maps?q=${r.userLatitude},${r.userLongitude}&hl=es;z=14&output=embed`},null,8,bi)])])])):(0,a.kq)("",!0)]),(0,a.Wm)(q)],64)}var Fi=t(196),Ci=t(778),Ti=t(5535),Li={name:"HospitalFinder",computed:{geolocationIndexed(){return this.geolocation.filter((i=>i.province.toLowerCase().includes(this.province.toLowerCase())))},geoHospitalNearestUserIndexed(){return this.geoHospitalNearestUser&&this.filterSpecialist||new Date(this.filterDate)instanceof Date&&!isNaN(new Date(this.filterDate))&&null!=this.filterTime?this.geoHospitalNearestUser.slice().filter((i=>i.hospital.toLowerCase().includes(this.hospital.toLowerCase()))).filter((i=>i?.arrFilter>0)).filter((i=>""==this.typeFilter?"Private"==i.type||"Public"==i.type||"Clinic"==i.type:i.type==this.typeFilter)).filter((i=>i.city.includes(this.city))).slice().sort(((i,e)=>e.arrFilter-i.arrFilter)):!!this.geoHospitalNearestUser&&this.geoHospitalNearestUser.slice().filter((i=>i.hospital.toLowerCase().includes(this.hospital.toLowerCase()))).filter((i=>""==this.typeFilter?"Private"==i.type||"Public"==i.type||"Clinic"==i.type:i.type==this.typeFilter)).filter((i=>i.city.includes(this.city))).slice().sort(((i,e)=>e.arrFilter-i.arrFilter))}},async mounted(){await Fi.ZP.get("/api/geolocation").then((i=>this.geolocation=i.data)),await this.loadProvider()},watch:{distanceFilter(i){i!=!i&&this.filterDistanceToggle()}},data(){return{city:"",isHospitalLoading:!1,checkUser:"",hospital:"",geolocation:[],typeFilter:"",citiesOrMunicipalities:[],province:this.$route.query.name,userLatitude:this.$route.query.userLat,userLongitude:this.$route.query.userLong,geoHospitalNearestUser:"",specializations:this.$store.getters.getSpecializationList,filterSpecialist:this.$route.query.symptom,filterDate:this.$route.query.date,filterTime:this.$route.query.time,clearFilterDateTime:!1,distanceFilter:!1,dateTimeFilter:!1,doctorSpecialistFilter:[],provincePrompt:!1}},methods:{async bookAppointment(i){this.$store.commit("hospitalDetails",i),await Fi.ZP.put(`/api/manager/${i._id}`,{engagements:i.engagements+1}),await this.$router.push(`/${i._id}/doctors`)},filterDistanceToggle(){this.isHospitalLoading=!0,this.geoHospitalNearestUser.sort(((i,e)=>this.distanceFilter?i.distance-e.distance:(e.engagements+Math.pow(e.ratings,2)/100)*e.distance-(i.engagements+Math.pow(i.ratings,2)/100)*i.distance)),this.isHospitalLoading=!1},async loadProvider(){this.isHospitalLoading=!0,await this.geolocation.find((i=>i.province===this.province))&&(this.$router.push({path:"/provider",query:{name:this.province,symptom:this.filterSpecialist,userLat:this.userLatitude,userLong:this.userLongitude,date:new Date(this.filterDate).toLocaleDateString(),time:this.filterTime}}),this.citiesOrMunicipalities=this.geolocation.find((i=>i.province===this.province)),await Fi.ZP.post("/api/geoFindHospitalNearestUser",{province:this.province,latitude:parseFloat(this.userLatitude),longitude:parseFloat(this.userLongitude)}).then((i=>this.geoHospitalNearestUser=i.data)),document.getElementById("background").style.background="none",(this.filterSpecialist||new Date(this.filterDate)instanceof Date&&!isNaN(new Date(this.filterDate))&&null!=this.filterTime)&&await this.filterSpecialistDateTime()),this.isHospitalLoading=!1},async filterSpecialistDateTime(){this.doctorSpecialistFilter=[],await this.$router.push({path:"/provider",query:{name:this.province,symptom:this.filterSpecialist,userLat:this.userLatitude,userLong:this.userLongitude,date:null!=this.filterDate?new Date(this.filterDate).toLocaleDateString():"",time:this.filterTime}}),await this.geoHospitalNearestUser.forEach((async i=>{this.isHospitalLoading=!0,await Fi.ZP.post("/api/doctor/filteration",{hospital:i.hospital,filterSpecialist:this.filterSpecialist,date:this.filterDate,time:this.filterTime}).then((async e=>{this.doctorSpecialistFilter.push({hospital:i.hospital,docLength:e.data.filter((e=>this.filterSpecialist?i.specializations.find((i=>i.specialist===this.filterSpecialist))&&e.hospitalOrigin.filter((e=>e===i.hospital)):e.hospitalOrigin.filter((e=>e===i.hospital)))).length}),this.isHospitalLoading=!1})),await this.geoHospitalNearestUser.forEach((i=>i["arrFilter"]=this.doctorSpecialistFilter.find((e=>i.hospital==e.hospital))?.docLength))}))}},components:{NavigationTab:Ti.Z,FooterBlock:Ci.Z}},Hi=t(3744);const Si=(0,Hi.Z)(Li,[["render",ki],["__scopeId","data-v-aa722d4a"]]);var Ui=Si}}]);
//# sourceMappingURL=893.d4241193.js.map