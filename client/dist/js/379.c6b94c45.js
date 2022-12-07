"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[379],{7787:function(t,i,s){s.d(i,{Z:function(){return r}});var a=s(6252),e=s(2262),l=s(3577);const o={key:0,class:"notification is-danger"};var c={__name:"CatchError",props:{errMsg:null},setup(t){const i=t,s=(0,a.Fl)((()=>i.errMsg));return(t,i)=>{const c=(0,a.up)("router-link");return(0,e.SU)(s)?((0,a.wg)(),(0,a.iD)("div",o,[(0,a.Uk)("Sorry, something went wrong. "+(0,l.zw)((0,e.SU)(s).message)+", please try again later or ",1),(0,a.Wm)(c,{to:"/contactus"},{default:(0,a.w5)((()=>[(0,a.Uk)("contact us")])),_:1}),(0,a.Uk)(". ")])):(0,a.kq)("",!0)}}};const n=c;var r=n},4160:function(t,i,s){s.r(i),s.d(i,{default:function(){return vt}});var a=s(6252),e=s(3577),l=s(9963);const o=t=>((0,a.dD)("data-v-71922108"),t=t(),(0,a.Cn)(),t),c=o((()=>(0,a._)("div",{class:"modal-background"},null,-1))),n=o((()=>(0,a._)("div",{class:"modal-content",style:{overflow:"hidden"}},[(0,a._)("div",{class:"loader",style:{margin:"auto"}})],-1))),r=[c,n],p={key:0,class:"section"},d={class:"columns"},u={class:"column",id:"hospital-overview",style:{"border-right":"3px solid whitesmoke"}},h={class:"container is-fluid"},g={class:"title"},k={class:"subtitle"},D={class:"subtitle is-6"},m={class:"content"},w=o((()=>(0,a._)("b",null,"Type of Facility:",-1))),v={key:0},_={class:"subtitle is-6"},y=o((()=>(0,a._)("b",null,"Contacts:",-1))),b=o((()=>(0,a._)("br",null,null,-1))),f={class:"image is-16by9"},C=["src"],z={class:"column"},S={class:"container"},$={class:"block"},L={key:0,class:"block"},U=o((()=>(0,a._)("h1",{class:"title"},"Pick a specialist.",-1))),q={class:"subtitle"},Z={key:1,class:"columns is-multiline is-mobile"},x=["onClick"],B={key:0,class:"image is-4by3"},F=["src"],H={key:1,class:"subtitle has-text-centered"},M={key:2,class:"container"},G=o((()=>(0,a._)("i",{class:"fa-solid fa-arrow-left"},null,-1))),I={key:1},N=o((()=>(0,a._)("br",null,null,-1))),P=o((()=>(0,a._)("p",{class:"subtitle has-text-centered"},"No doctors are currently available in this specialization.",-1))),T=[N,P],W={key:2},Y=o((()=>(0,a._)("br",null,null,-1))),A=o((()=>(0,a._)("h1",{class:"title is-3"},"Choose a doctor:",-1))),K={class:"field"},E={class:"control"},j=o((()=>(0,a._)("br",null,null,-1))),O={key:3},R={key:0},V={class:"column"},J={class:"image is-square"},Q=["src"],X={class:"column is-5"},tt={class:"content"},it={key:0,class:"has-text-weight-semibold"},st={key:1,class:"has-text-weight-semibold"},at=o((()=>(0,a._)("br",null,null,-1))),et=o((()=>(0,a._)("br",null,null,-1))),lt={class:"column",style:{"margin-top":"auto"}},ot=["onClick"],ct={key:0,class:"notification"},nt=o((()=>(0,a._)("hr",null,null,-1))),rt={key:1},pt={key:0,class:"notification is-info"};function dt(t,i,s,o,c,n){const N=(0,a.up)("NavigationTab"),P=(0,a.up)("CatchError"),dt=(0,a.up)("router-link");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a.Wm)(N),(0,a._)("div",{class:(0,e.C_)(["modal",{"is-active":c.isDoctorLoading}])},r,2),0!==c.hospitalDetails.length?((0,a.wg)(),(0,a.iD)("section",p,[(0,a.Wm)(P,{"err-msg":c.errMsg},null,8,["err-msg"]),(0,a._)("div",d,[(0,a._)("div",u,[(0,a._)("div",h,[(0,a._)("h1",g,(0,e.zw)(c.hospitalDetails.hospital),1),(0,a._)("p",k,(0,e.zw)(c.hospitalDetails.barangayORStreet)+", "+(0,e.zw)(c.hospitalDetails.city)+", "+(0,e.zw)(c.hospitalDetails.province),1),(0,a._)("p",D,(0,e.zw)(c.hospitalDetails.details[0].description),1),(0,a._)("div",m,[w,(0,a.Uk)(" "+(0,e.zw)(c.hospitalDetails.type)+" ",1),"undefined"!==typeof c.hospitalDetails.details[0].contacts?((0,a.wg)(),(0,a.iD)("span",v,[(0,a._)("p",_,[y,(0,a.Uk)(),((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(c.hospitalDetails.details[0].contacts,((t,i)=>((0,a.wg)(),(0,a.iD)("span",{key:i},(0,e.zw)(t.contact+" "),1)))),128))])])):(0,a.kq)("",!0)]),b,(0,a._)("figure",f,[(0,a._)("iframe",{class:"has-ratio",src:`https://maps.google.com/maps?q=${c.hospitalDetails.location.coordinates[1]},${c.hospitalDetails.location.coordinates[0]}&hl=es;z=14&output=embed`},null,8,C)])])]),(0,a._)("div",z,[(0,a._)("div",S,[(0,a._)("div",$,[c.specializationClicked?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("div",L,[U,(0,a._)("p",q,[(0,a.Uk)(" Having trouble picking a specialist? Get appointed to a "),(0,a._)("a",{class:"has-text-link",onClick:i[0]||(i[0]=t=>n.getDoctors("General Practitioner"))},"General Practitioner"),(0,a.Uk)(". ")])])),c.specializationClicked?((0,a.wg)(),(0,a.iD)("div",M,[c.typeClinic?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("a",{key:0,class:"subtitle has-text-link",onClick:i[1]||(i[1]=t=>c.specializationClicked=!1)},[G,(0,a.Uk)(" Back")])),""==c.doctorList?((0,a.wg)(),(0,a.iD)("div",I,T)):((0,a.wg)(),(0,a.iD)("div",W,[Y,A,(0,a._)("div",K,[(0,a._)("div",E,[(0,a.wy)((0,a._)("input",{class:"input",type:"text","onUpdate:modelValue":i[2]||(i[2]=t=>c.doctorSearchBar=t),placeholder:"Search..."},null,512),[[l.nr,c.doctorSearchBar]])])])])),j,c.specializationClicked?((0,a.wg)(),(0,a.iD)("div",O,[0!==Object.keys(n.doctorSearch).length?((0,a.wg)(),(0,a.iD)("div",R,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(n.doctorSearch,(i=>((0,a.wg)(),(0,a.iD)("div",{class:"columns",key:i._id},[(0,a._)("div",V,[(0,a._)("figure",J,[(0,a._)("img",{src:`http://res.cloudinary.com/leindfraust/image/upload/v${(new Date).getMonth()}${(new Date).getDate()}/assets/doctors/${i.alias}.jpg`},null,8,Q)])]),(0,a._)("div",X,[(0,a._)("div",tt,[(0,a._)("h5",null,(0,e.zw)(i.name),1),(0,a._)("p",null,[c.pickedSpecialist?((0,a.wg)(),(0,a.iD)("span",it,(0,e.zw)(c.pickedSpecialist),1)):((0,a.wg)(),(0,a.iD)("span",st,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(i.specialist,(t=>((0,a.wg)(),(0,a.iD)("span",{key:t},[(0,a.Uk)((0,e.zw)(t)+" ",1),at])))),128))])),et])])]),(0,a._)("div",lt,[null!==t.$store.state.patientID?((0,a.wg)(),(0,a.iD)("button",{key:0,class:"button is-info is-rounded",onClick:t=>n.pickDoctor(i,c.pickedSpecialist)},"Book an Appointment",8,ot)):(0,a.kq)("",!0)])])))),128)),null==t.$store.state.patientID?((0,a.wg)(),(0,a.iD)("div",ct,[(0,a.Wm)(dt,{to:"/user/login",class:"has-text-weight-bold"},{default:(0,a.w5)((()=>[(0,a.Uk)("Login")])),_:1}),(0,a.Uk)(" or "),(0,a.Wm)(dt,{to:"/user/signup",class:"has-text-weight-bold"},{default:(0,a.w5)((()=>[(0,a.Uk)("create an account")])),_:1}),(0,a.Uk)(" to make an appointment. ")])):(0,a.kq)("",!0),nt])):((0,a.wg)(),(0,a.iD)("div",rt,[""!=c.doctorList?((0,a.wg)(),(0,a.iD)("div",pt,"No such doctor is available right now.")):(0,a.kq)("",!0)]))])):(0,a.kq)("",!0)])):((0,a.wg)(),(0,a.iD)("div",Z,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(c.specialistList,((t,i)=>((0,a.wg)(),(0,a.iD)("div",{class:"column is-6-mobile is-4-desktop",key:i},[(0,a._)("a",{onClick:i=>n.getDoctors(t.specialist)},["General Practitioner"!==t.specialist?((0,a.wg)(),(0,a.iD)("figure",B,[(0,a._)("img",{src:`https://ui-avatars.com/api/?name=${t.specialist}`},null,8,F)])):(0,a.kq)("",!0),"General Practitioner"!==t.specialist?((0,a.wg)(),(0,a.iD)("p",H,(0,e.zw)(t.specialist),1)):(0,a.kq)("",!0)],8,x)])))),128))]))])])])])])):(0,a.kq)("",!0)],64)}var ut=s(594),ht=s(4239),gt=s(4824),kt=s(7787),Dt={name:"DoctorList",components:{NavigationTab:gt.Z,CatchError:kt.Z},data(){return{errMsg:"",hospitalDetails:[],patientDetails:null,doctorList:null,specialistList:[],pickedSpecialist:null,specializationClicked:!1,doctorSearchBar:"",isDoctorLoading:!1,typeClinic:!1}},async mounted(){null!==this.$store.state.patientID&&await ut.Z.get("/session/patient").then((t=>this.patientDetails=t.data)),await ut.Z.post(`/api/manager/${this.$route.params.hospital}`).then((t=>{this.hospitalDetails=t.data,this.specialistList=t.data.specializations.sort()})),"Clinic"==this.hospitalDetails.type&&(this.typeClinic=!0,this.getDoctors(void 0)),await this.$store.state.patientFilters.filterSpecialist&&await this.getDoctors("Allergists")},computed:{doctorSearch(){return!!this.doctorList&&this.doctorList.filter((t=>t.name.toLowerCase().includes(this.doctorSearchBar.toLowerCase()))).slice().sort(((t,i)=>t.visits-i.visits)).sort(((t,i)=>this.$store.state.patientFilters.filterDate?new Date(t.schedule[0].date).getTime()-new Date(this.$store.state.patientFilters.filterDate).getTime():t-i))}},methods:{async getDoctors(t){this.doctorSearchBar="",this.isDoctorLoading=!0,this.specializationClicked=!0,this.pickedSpecialist=t,await ut.Z.post("/api/checkDoctorAvailability",{hospital:this.hospitalDetails.hospital,specialist:t}).then((t=>this.doctorList=t?t.data:[])).catch((t=>this.errMsg=t)),this.isDoctorLoading=!1,this.$store.commit("patientFilters",{})},async pickDoctor(t,i){ht.Z.commit("pickedSpecialization",i),ht.Z.commit("doctorDetails",t),ht.Z.commit("statusAvailability",!0),ht.Z.commit("hospitalName",this.hospitalDetails.hospital),null!==this.$store.state.patientID?await this.$router.push(`/user/${this.patientDetails.username}/registration`):await this.$router.push("/user/signup")}}},mt=s(3744);const wt=(0,mt.Z)(Dt,[["render",dt],["__scopeId","data-v-71922108"]]);var vt=wt}}]);
//# sourceMappingURL=379.c6b94c45.js.map