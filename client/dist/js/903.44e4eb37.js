"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[903],{6539:function(i,e,t){t.r(e),t.d(e,{default:function(){return Ui}});var s=t(6252),a=t(3577),l=t(9963);const o=i=>((0,s.dD)("data-v-75fc6b18"),i=i(),(0,s.Cn)(),i),n={id:"background"},r=o((()=>(0,s._)("div",{class:"modal-background"},null,-1))),c=o((()=>(0,s._)("div",{class:"modal-content",style:{overflow:"hidden"}},[(0,s._)("div",{class:"loader",style:{margin:"auto"}})],-1))),d=[r,c],p=o((()=>(0,s._)("div",{class:"modal-background"},null,-1))),u={class:"modal-content",style:{overflow:"auto"}},h={class:"box"},f={class:"section has-text-centered"},g={class:"has-text-left"},m=o((()=>(0,s._)("label",{class:"label"},"Choose Preferred Date",-1))),v=o((()=>(0,s._)("div",{class:"block"},null,-1))),y=o((()=>(0,s._)("label",{class:"label"},"Choose Preferred Time ",-1))),w={class:"buttons is-centered"},_=o((()=>(0,s._)("div",{class:"block"},null,-1))),b={class:"buttons is-centered"},D=["disabled"],k=o((()=>(0,s._)("div",{class:"block is-hidden-desktop"},null,-1))),F={key:0},C={class:"columns is-mobile",style:{overflow:"auto"}},T={class:"column is-narrow"},L={class:"select is-rounded"},H=o((()=>(0,s._)("option",{value:!1},"Sort by Recommended",-1))),S=o((()=>(0,s._)("option",{value:!0},"Sort by Nearest",-1))),U=[H,S],$={class:"column is-narrow"},N={class:"select is-rounded"},P=o((()=>(0,s._)("option",{value:"",disabled:""},"City/Municipality",-1))),z=o((()=>(0,s._)("option",{value:""},"Any",-1))),M={class:"column is-narrow"},x={class:"select is-rounded"},q=(0,s.uE)('<option value="" disabled data-v-75fc6b18>Type of Facility</option><option value="" data-v-75fc6b18>Any</option><option value="Public" data-v-75fc6b18>Public Hospital</option><option value="Private" data-v-75fc6b18>Private Hospital</option><option value="Clinic" data-v-75fc6b18>Clinic</option>',5),A=[q],I={class:"column is-narrow"},O={class:"select is-rounded"},V=o((()=>(0,s._)("option",{value:"",disabled:""},"Specialist",-1))),Z=o((()=>(0,s._)("option",{value:""},"Any",-1))),Y=["value"],K={class:"column is-narrow"},W=o((()=>(0,s._)("i",{class:"has-text-link fa-sharp fa-solid fa-angle-down"},null,-1))),B={class:"column"},E={class:"is-pulled-right"},R={class:"field has-addons"},j={class:"control has-icons-left"},G=o((()=>(0,s._)("span",{class:"icon is-small is-left"},[(0,s._)("i",{class:"fa-solid fa-location-dot"})],-1))),J={id:"provinces"},Q={class:"control"},X=["disabled"],ii={class:"columns"},ei={key:0,class:"column",style:{"max-height":"100vh",overflow:"auto"}},ti={class:"container is-fluid"},si={class:"column is-5"},ai=["onClick"],li={class:"image is-3by2 is-rounded"},oi=["src"],ni={class:"column"},ri={key:0,class:"notification is-info is-light"},ci=["onClick"],di={class:"title is-4"},pi={class:"subtitle is-6"},ui=o((()=>(0,s._)("br",null,null,-1))),hi={class:"content"},fi=o((()=>(0,s._)("b",null,"Type of Facility:",-1))),gi={key:0},mi={class:"subtitle is-6"},vi=o((()=>(0,s._)("b",null,"Contacts:",-1))),yi=o((()=>(0,s._)("hr",null,null,-1))),wi={key:0,class:"column notification is-danger is-light has-text-centered"},_i={key:1,class:"column notification is-danger is-light has-text-centered"},bi={class:"column is-5"},Di=["src"];function ki(i,e,t,o,r,c){const H=(0,s.up)("NavigationTab"),S=(0,s.up)("v-date-picker"),q=(0,s.up)("FooterBlock");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s._)("div",n,[(0,s.Wm)(H),(0,s._)("div",{class:(0,a.C_)(["modal",{"is-active":r.isHospitalLoading}])},d,2),(0,s._)("div",{class:(0,a.C_)(["modal",{"is-active":r.dateTimeFilter}])},[p,(0,s._)("div",u,[(0,s._)("div",h,[(0,s._)("section",f,[(0,s._)("div",g,[(0,s._)("button",{class:"button is-info",onClick:e[0]||(e[0]=i=>(r.filterDate="",r.filterTime="",r.clearFilterDateTime=!0))},"Clear Filter")]),m,(0,s.Wm)(S,{modelValue:r.filterDate,"onUpdate:modelValue":e[1]||(e[1]=i=>r.filterDate=i),"is-expanded":""},null,8,["modelValue"]),v,y,(0,s._)("div",w,[(0,s._)("button",{class:(0,a.C_)(["button",{"is-active":"AM"==r.filterTime}]),onClick:e[2]||(e[2]=i=>r.filterTime="AM")},"AM",2),(0,s._)("button",{class:(0,a.C_)(["button",{"is-active":"PM"==r.filterTime}]),onClick:e[3]||(e[3]=i=>r.filterTime="PM")},"PM",2)]),_,(0,s._)("div",b,[(0,s._)("button",{class:"button",onClick:e[4]||(e[4]=i=>r.dateTimeFilter=!1)},"Cancel"),r.clearFilterDateTime?((0,s.wg)(),(0,s.iD)("button",{key:1,class:"button is-info",onClick:e[6]||(e[6]=i=>(c.filterSpecialistDateTime(),r.dateTimeFilter=!1,r.clearFilterDateTime=!1))},"Confirm")):((0,s.wg)(),(0,s.iD)("button",{key:0,class:"button is-info",disabled:null==r.filterTime||null==r.filterDate,onClick:e[5]||(e[5]=i=>(c.filterSpecialistDateTime(),r.dateTimeFilter=!1))},"Confirm",8,D))])])])])],2),k,""!=r.citiesOrMunicipalities?((0,s.wg)(),(0,s.iD)("div",F,[(0,s._)("div",C,[(0,s._)("div",T,[(0,s._)("div",L,[(0,s.wy)((0,s._)("select",{"onUpdate:modelValue":e[7]||(e[7]=i=>r.distanceFilter=i)},U,512),[[l.bM,r.distanceFilter]])])]),(0,s._)("div",$,[(0,s._)("div",N,[(0,s.wy)((0,s._)("select",{"onUpdate:modelValue":e[8]||(e[8]=i=>r.city=i)},[P,z,((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(r.citiesOrMunicipalities.citiesOrMunicipalities.sort(((i,e)=>i.name>e.name?1:-1)),((i,e)=>((0,s.wg)(),(0,s.iD)("option",{key:e},(0,a.zw)(i.name),1)))),128))],512),[[l.bM,r.city]])])]),(0,s._)("div",M,[(0,s._)("div",x,[(0,s.wy)((0,s._)("select",{"onUpdate:modelValue":e[9]||(e[9]=i=>r.typeFilter=i)},A,512),[[l.bM,r.typeFilter]])])]),(0,s._)("div",I,[(0,s._)("div",O,[(0,s.wy)((0,s._)("select",{"onUpdate:modelValue":e[10]||(e[10]=i=>r.filterSpecialist=i),onChange:e[11]||(e[11]=(...i)=>c.filterSpecialistDateTime&&c.filterSpecialistDateTime(...i))},[V,Z,((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(r.specializations,(i=>((0,s.wg)(),(0,s.iD)("option",{key:i,value:i},(0,a.zw)(i),9,Y)))),128))],544),[[l.bM,r.filterSpecialist]])])]),(0,s._)("div",K,[(0,s._)("button",{class:"button is-rounded",onClick:e[12]||(e[12]=i=>r.dateTimeFilter=!0)},[(0,s.Uk)((0,a.zw)(r.filterDate&&r.filterTime?`${new Date(r.filterDate).toDateString()}, ${r.filterTime}`:"Date and Time")+"  ",1),W])]),(0,s._)("div",B,[(0,s._)("div",E,[(0,s._)("div",R,[(0,s._)("div",j,[(0,s.wy)((0,s._)("input",{class:"input",type:"text","onUpdate:modelValue":e[13]||(e[13]=i=>r.province=i),style:{width:"300px"},placeholder:"What province are you located?",list:"provinces"},null,512),[[l.nr,r.province]]),G]),(0,s._)("datalist",J,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(c.geolocationIndexed,(i=>((0,s.wg)(),(0,s.iD)("option",{key:i._id},(0,a.zw)(i.province),1)))),128))]),(0,s._)("div",Q,[(0,s._)("button",{class:"button is-info is-rounded",onClick:e[14]||(e[14]=i=>c.loadProvider()),disabled:""==r.province},"Search",8,X)])])])])]),(0,s._)("div",ii,[0!==r.geoHospitalNearestUser.length?((0,s.wg)(),(0,s.iD)("div",ei,[(0,s._)("div",ti,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(c.geoHospitalNearestUserIndexed,((i,e)=>((0,s.wg)(),(0,s.iD)("div",{class:"columns has-text-left",id:"hospital",style:{"margin-bottom":"5%"},key:e},[(0,s._)("div",si,[(0,s._)("a",{onClick:e=>c.bookAppointment(i)},[(0,s._)("figure",li,[(0,s._)("img",{loading:"lazy",style:{"border-radius":"10px"},src:`https://res.cloudinary.com/leindfraust/image/upload/v${(new Date).getMonth()}${(new Date).getDate()}/assets/managers/${i.hospital}.jpg`},null,8,oi)])],8,ai)]),(0,s._)("div",ni,[i?.arrFilter>0?((0,s.wg)(),(0,s.iD)("div",ri,(0,a.zw)(i?.arrFilter)+" "+(0,a.zw)(new Date(r.filterDate)instanceof Date&&!isNaN(new Date(r.filterDate))&&null!=r.filterTime?`available ${r.filterSpecialist} on ${new Date(r.filterDate).toDateString()}, ${r.filterTime}`:`available\n                                    ${r.filterSpecialist}`),1)):(0,s.kq)("",!0),(0,s._)("a",{onClick:e=>c.bookAppointment(i)},[(0,s._)("h1",di,(0,a.zw)(i.hospital),1),(0,s._)("p",pi,(0,a.zw)(i.barangayORStreet)+", "+(0,a.zw)(i.city)+", "+(0,a.zw)(i.province),1)],8,ci),ui,(0,s._)("div",hi,[fi,(0,s.Uk)(" "+(0,a.zw)(i.type)+" ",1),"undefined"!==typeof i.details[0].contacts?((0,s.wg)(),(0,s.iD)("span",gi,[(0,s._)("p",mi,[vi,(0,s.Uk)(),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(i.details[0].contacts,((i,e)=>((0,s.wg)(),(0,s.iD)("span",{key:e},(0,a.zw)(i.contact+" "),1)))),128))])])):(0,s.kq)("",!0)])]),yi])))),128))]),0==c.geoHospitalNearestUserIndexed.length?((0,s.wg)(),(0,s.iD)("div",wi," Sorry, no Hospitals/Clinics has been found. ")):(0,s.kq)("",!0)])):r.isHospitalLoading?(0,s.kq)("",!0):((0,s.wg)(),(0,s.iD)("div",_i," Hospitals/Clinics not found, please try again or search another province. ")),(0,s._)("div",bi,[(0,s._)("iframe",{loading:"lazy",id:"geoIframe",src:`https://maps.google.com/maps?q=${r.userLatitude},${r.userLongitude}&hl=es;z=14&output=embed`},null,8,Di)])])])):(0,s.kq)("",!0)]),(0,s.Wm)(q)],64)}var Fi=t(196),Ci=t(778),Ti=t(5535),Li={name:"HospitalFinder",computed:{geolocationIndexed(){return this.geolocation.filter((i=>i.province.toLowerCase().includes(this.province.toLowerCase())))},geoHospitalNearestUserIndexed(){return this.geoHospitalNearestUser&&this.filterSpecialist||new Date(this.filterDate)instanceof Date&&!isNaN(new Date(this.filterDate))&&null!=this.filterTime?this.geoHospitalNearestUser.slice().filter((i=>i.hospital.toLowerCase().includes(this.hospital.toLowerCase()))).filter((i=>i?.arrFilter>0)).filter((i=>""==this.typeFilter?"Private"==i.type||"Public"==i.type||"Clinic"==i.type:i.type==this.typeFilter)).filter((i=>i.city.includes(this.city))).slice().sort(((i,e)=>e.arrFilter-i.arrFilter)):!!this.geoHospitalNearestUser&&this.geoHospitalNearestUser.slice().filter((i=>i.hospital.toLowerCase().includes(this.hospital.toLowerCase()))).filter((i=>""==this.typeFilter?"Private"==i.type||"Public"==i.type||"Clinic"==i.type:i.type==this.typeFilter)).filter((i=>i.city.includes(this.city))).slice().sort(((i,e)=>e.arrFilter-i.arrFilter))}},async mounted(){await Fi.ZP.get("/api/geolocation").then((i=>this.geolocation=i.data)),await this.loadProvider()},watch:{distanceFilter(i){i!=!i&&this.filterDistanceToggle()}},data(){return{city:"",isHospitalLoading:!1,checkUser:"",hospital:"",geolocation:[],typeFilter:"",citiesOrMunicipalities:[],province:this.$route.query.name,userLatitude:this.$route.query.userLat,userLongitude:this.$route.query.userLong,geoHospitalNearestUser:"",specializations:this.$store.getters.getSpecializationList,filterSpecialist:this.$route.query.symptom,filterDate:this.$route.query.date,filterTime:this.$route.query.time,clearFilterDateTime:!1,distanceFilter:!1,dateTimeFilter:!1,doctorSpecialistFilter:[],provincePrompt:!1}},methods:{async bookAppointment(i){this.$store.commit("hospitalDetails",i),await Fi.ZP.put(`/api/manager/${i._id}`,{engagements:i.engagements+1}),await this.$router.push(`/${i._id}/doctors`)},filterDistanceToggle(){this.isHospitalLoading=!0,this.geoHospitalNearestUser.sort(((i,e)=>this.distanceFilter?i.distance-e.distance:(e.engagements+Math.pow(e.ratings,2)/100)*e.distance-(i.engagements+Math.pow(i.ratings,2)/100)*i.distance)),this.isHospitalLoading=!1},async loadProvider(){this.isHospitalLoading=!0,await this.geolocation.find((i=>i.province===this.province))&&(this.$router.push({path:"/provider",query:{name:this.province,symptom:this.filterSpecialist,userLat:this.userLatitude,userLong:this.userLongitude,date:new Date(this.filterDate).toLocaleDateString(),time:this.filterTime}}),this.citiesOrMunicipalities=this.geolocation.find((i=>i.province===this.province)),await Fi.ZP.post("/api/geoFindHospitalNearestUser",{province:this.province,latitude:parseFloat(this.userLatitude),longitude:parseFloat(this.userLongitude)}).then((i=>this.geoHospitalNearestUser=i.data)),document.getElementById("background").style.background="none",(this.filterSpecialist||new Date(this.filterDate)instanceof Date&&!isNaN(new Date(this.filterDate))&&null!=this.filterTime)&&await this.filterSpecialistDateTime()),this.isHospitalLoading=!1},async filterSpecialistDateTime(){this.doctorSpecialistFilter=[],await this.$router.push({path:"/provider",query:{name:this.province,symptom:this.filterSpecialist,userLat:this.userLatitude,userLong:this.userLongitude,date:null!=this.filterDate?new Date(this.filterDate).toLocaleDateString():"",time:this.filterTime}});const i=this.geoHospitalNearestUser;for await(const e of i)this.isHospitalLoading=!0,await Fi.ZP.post("/api/doctor/filteration",{hospital:e.hospital,filterSpecialist:this.filterSpecialist,date:this.filterDate,time:this.filterTime}).then((async i=>{this.doctorSpecialistFilter.push({hospital:e.hospital,docLength:i.data.filter((i=>this.filterSpecialist?e.specializations.find((i=>i.specialist===this.filterSpecialist))&&i.hospitalOrigin.filter((i=>i===e.hospital)):i.hospitalOrigin.filter((i=>i===e.hospital)))).length}),this.isHospitalLoading=!1}));await this.geoHospitalNearestUser.forEach((i=>i["arrFilter"]=this.doctorSpecialistFilter.find((e=>i.hospital==e.hospital))?.docLength))}},components:{NavigationTab:Ti.Z,FooterBlock:Ci.Z}},Hi=t(3744);const Si=(0,Hi.Z)(Li,[["render",ki],["__scopeId","data-v-75fc6b18"]]);var Ui=Si}}]);
//# sourceMappingURL=903.44e4eb37.js.map