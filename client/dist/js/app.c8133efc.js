(function(){"use strict";var e={1919:function(e,t,n){var i=n(9963),a=n(513),o=n(6252);function r(e,t,n,i,a,r){const s=(0,o.up)("router-view");return(0,o.wg)(),(0,o.j4)(s)}var s={name:"App"},c=n(3744);const u=(0,c.Z)(s,[["render",r]]);var l=u,d=n(4239),p=n(1120),m=n(196),f=n(2346);(0,i.ri)(l).use(a.ZP,{}).use(p.Z).use(d.Z).use(f.Z,m.ZP).mount("#app")},1120:function(e,t,n){var i=n(2201),a=n(4239),o=n(196),r=n(4058);const s=()=>Promise.all([n.e(20),n.e(490),n.e(788)]).then(n.bind(n,3490)),c=()=>Promise.all([n.e(20),n.e(414)]).then(n.bind(n,2566)),u=()=>Promise.all([n.e(20),n.e(84)]).then(n.bind(n,1859)),l=()=>n.e(663).then(n.bind(n,998)),d=()=>n.e(386).then(n.bind(n,8386)),p=()=>n.e(65).then(n.bind(n,6065)),m=()=>n.e(669).then(n.bind(n,6669)),f=()=>Promise.all([n.e(234),n.e(66)]).then(n.bind(n,6694)),h=()=>n.e(742).then(n.bind(n,5742)),g=()=>n.e(947).then(n.bind(n,2947)),b=()=>Promise.all([n.e(234),n.e(973)]).then(n.bind(n,6757)),v=()=>Promise.all([n.e(234),n.e(484)]).then(n.bind(n,3823)),y=()=>n.e(336).then(n.bind(n,8336)),P=()=>n.e(571).then(n.bind(n,3571)),S=()=>n.e(128).then(n.bind(n,4128)),A=()=>n.e(677).then(n.bind(n,9677)),Z=()=>n.e(558).then(n.bind(n,1558)),O=()=>n.e(836).then(n.bind(n,2836)),q=()=>n.e(794).then(n.bind(n,1794)),k=()=>n.e(119).then(n.bind(n,4119)),w=()=>Promise.all([n.e(20),n.e(490),n.e(880)]).then(n.bind(n,2750)),E=()=>n.e(550).then(n.bind(n,4550)),M=()=>n.e(791).then(n.bind(n,7791)),D=()=>n.e(938).then(n.bind(n,3938)),U=()=>n.e(912).then(n.bind(n,7912)),C=()=>n.e(655).then(n.bind(n,5655)),I=()=>n.e(58).then(n.bind(n,58)),j=()=>n.e(124).then(n.bind(n,3124)),N=()=>n.e(957).then(n.bind(n,8957)),_=()=>n.e(955).then(n.bind(n,6955)),T=()=>n.e(36).then(n.bind(n,3036)),x=()=>n.e(567).then(n.bind(n,5567)),L=[{path:"/",component:s},{path:"/about",component:c},{path:"/terms-and-conditions",component:u},{path:"/provider",component:()=>Promise.all([n.e(20),n.e(661)]).then(n.bind(n,5512))},{path:"/manager/:user",component:C,meta:{requiresManagerAuth:!0}},{path:"/manager/signup",component:j},{path:"/manager/login",component:I},{path:"/manager/:user/profile",component:N,meta:{requiresManagerAuth:!0}},{path:"/manager/:user/security",component:_,meta:{requiresManagerAuth:!0}},{path:"/superuser",component:D,meta:{requiresSuperUserAuth:!0}},{path:"/superuser/login",component:U},{path:"/doctor/login",component:p},{path:"/doctor/signup",component:m},{path:"/doctor/:user/appointments",component:f,meta:{requiresAuth:!0}},{path:"/doctor/:user/appointments/history",component:v,meta:{requiresAuth:!0}},{path:"/doctor/:user/appointments/cancelled",component:b,meta:{requiresAuth:!0}},{path:"/doctor/:user/schedule",component:h,meta:{requiresAuth:!0}},{path:"/doctor/:user/profile",component:g,meta:{requiresAuth:!0}},{path:"/doctor/:user/security",component:y,meta:{requiresAuth:!0}},{path:"/imgUploadSuccess",component:S,meta:{requireImgUploadSuccess:!0}},{path:"/imgUploadSuccessPatient",component:A,meta:{requireImgUploadSuccess:!0}},{path:"/imgUploadSuccessDoctor",component:Z,meta:{requireImgUploadSuccess:!0}},{path:"/imgUploadSuccessManager",component:O,meta:{requireImgUploadSuccessManager:!0}},{path:"/user/signup",component:q},{path:"/user/login",component:k},{path:"/:hospital/doctors",component:l},{path:"/user/:user/",component:w,meta:{requiresAuthPatient:!0}},{path:"/user/:user/profile",component:E,name:E,meta:{requiresAuthPatient:!0}},{path:"/user/:user/security",component:M,meta:{requiresAuthPatient:!0}},{path:"/success",component:P,meta:{requireSuccessPickDoctor:!0}},{path:"/user/:user/registration",component:d,meta:{requireProcess:!0}},{path:"/contactus",component:T},{path:"/:catchAll404(.*)*",component:x}],H=(0,i.p7)({history:(0,i.PO)("/"),routes:L});H.beforeEach(((e,t,n)=>{if(e.matched.some((e=>e.meta.requireProcess)))return a.Z.state.statusAvailability?n():n("/user/:user/doctors");n()})),H.beforeEach(((e,t,n)=>{if(e.matched.some((e=>e.meta.requireImgUploadSuccess)))return!0===a.Z.state.imgSuccess?n():n("/doctor/login");n()})),H.beforeEach(((e,t,n)=>{if(e.matched.some((e=>e.meta.requireImgUploadSuccessManager)))return a.Z.state.imgSuccessManager?n():n("/manager/login");n()})),H.beforeEach(((e,t,n)=>{if(e.matched.some((e=>e.meta.requireSuccessPickDoctor)))return a.Z.state.appointed?n():n("/user/:user/registration");n()})),H.beforeEach((async(e,t,n)=>{if(e.matched.some((e=>e.meta.requiresAuth)))return await o.ZP.get("/session/doctor").then((async e=>{"undefined"!==typeof e.data.alias?(a.Z.commit("alias",e.data.alias),a.Z.commit("doctorID",e.data._id),a.Z.commit("doctorName",e.data.fullname)):(a.Z.commit("alias",null),await o.ZP["delete"]("/session/doctor"))})),a.Z.state.alias?n():n("/doctor/login");n()})),H.beforeEach((async(e,t,n)=>{if(e.matched.some((e=>e.meta.requiresAuthPatient)))return await o.ZP.get("/session/patient").then((async e=>{"undefined"!==typeof e.data.username?(a.Z.commit("patientUsername",e.data.username),a.Z.commit("patientID",e.data._id)):(a.Z.commit("patientID",null),a.Z.commit("patientUsername",""),await o.ZP["delete"]("/session/patient"),r.Z.disconnect())})),a.Z.state.patientUsername?n():n("/user/login");n()})),H.beforeEach(((e,t,n)=>{if(e.matched.some((e=>e.meta.requiresSuperUserAuth)))return a.Z.state.superUserAuth?n():n("/superuser/login");n()})),H.beforeEach((async(e,t,n)=>{if(e.matched.some((e=>e.meta.requiresManagerAuth)))return await o.ZP.get("/session/manager").then((async e=>{"undefined"!==typeof e.data.hospital?a.Z.commit("managerHospital",e.data.hospital):(a.Z.commit("managerHospital",null),await o.ZP["delete"]("/session/manager"))})),a.Z.state.managerHospital?n():n("/manager/login");n()})),H.beforeEach(((e,t,n)=>{if(e.matched.some((e=>e.meta.requireProcess)))return a.Z.state.statusAvailability?n():n("/user/:user/doctors");n()})),t["Z"]=H},4058:function(e,t,n){var i=n(9367);const a=(0,i.io)("",{autoConnect:!1});t["Z"]=a},4239:function(e,t,n){var i=n(3907),a=n(4702);const o=(0,i.MT)({plugins:[(0,a.Z)()],state:{notificationClicked:!1,checkProfileImg:!1,accountCreated:!1,userAuth:!1,superUserAuth:!1,statusAvailability:!1,alias:"",doctorDetails:[],patientUsername:"",patientID:null,doctorID:null,doctorName:null,appointed:null,specialistList:[],pickedSpecialization:null,patientDetails:[],profileImg:null,imgSuccess:!1,imgSuccessManager:!1,managerHospital:"",hospitalDetails:[],hospitalName:"",specializationList:["Allergists","Anesthesiologists","Cardiologists","Colon and Rectal Surgeons","Critical Care Medicine Specialists"," Dermatologists","Endocrinologists","Emergency Medicine Specialists","Family Physicians","Gastroenterologists","Geriatric Medicine Specialists","Hematologists","Hospice and Palliative Medicine Specialists","Infectious Disease Specialists","Internists","Medical Geneticists","Nephrologists","Neurologists","Obstetricians and Gynecologists","Oncologists","Ophthalmologists","Osteopaths","Otolaryngologists","Pathologists","Pediatricians","Physiatrists","Plastic Surgeons","Podiatrists","Preventive Medicine Specialists","Psychiatrists","Pulmonologists","Radiologists","Rheumatologists","Sleep Medicine Specialists","Sports Medicine Specialists","General Surgeons","Urologists"]},getters:{getStatusAvail:e=>e.statusAvailability,getSpecializationList:e=>e.specializationList},mutations:{checkProfileImg(e,t){e.checkProfileImg=t},notificationClicked(e,t){e.notificationClicked=t},accountCreated(e,t){e.accountCreated=t},alias(e,t){e.alias=t},doctorDetails(e,t){e.doctorDetails=t},patientUsername(e,t){e.patientUsername=t},doctorID(e,t){e.doctorID=t},doctorName(e,t){e.doctorName=t},patientID(e,t){e.patientID=t},appointed(e,t){e.appointed=t},statusTrue(e){e.statusAvailability=!0},specialistList(e,t){e.specialistList=t},pickedSpecialization(e,t){e.pickedSpecialization=t},patientDetails(e,t){e.patientDetails=t},profileImg(e,t){e.profileImg=t},imgSuccess(e,t){e.imgSuccess=t},imgSuccessManager(e,t){e.imgSuccessManager=t},userType(e,t){e.userType=t},superUserAuth(e,t){e.superUserAuth=t},managerHospital(e,t){e.managerHospital=t},hospitalDetails(e,t){e.hospitalDetails=t},hospitalName(e,t){e.hospitalName=t},statusAvailability(e,t){e.statusAvailability=t}}});t["Z"]=o}},t={};function n(i){var a=t[i];if(void 0!==a)return a.exports;var o=t[i]={id:i,loaded:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}n.m=e,function(){n.amdO={}}(),function(){var e=[];n.O=function(t,i,a,o){if(!i){var r=1/0;for(l=0;l<e.length;l++){i=e[l][0],a=e[l][1],o=e[l][2];for(var s=!0,c=0;c<i.length;c++)(!1&o||r>=o)&&Object.keys(n.O).every((function(e){return n.O[e](i[c])}))?i.splice(c--,1):(s=!1,o<r&&(r=o));if(s){e.splice(l--,1);var u=a();void 0!==u&&(t=u)}}return t}o=o||0;for(var l=e.length;l>0&&e[l-1][2]>o;l--)e[l]=e[l-1];e[l]=[i,a,o]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){var e,t=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__};n.t=function(i,a){if(1&a&&(i=this(i)),8&a)return i;if("object"===typeof i&&i){if(4&a&&i.__esModule)return i;if(16&a&&"function"===typeof i.then)return i}var o=Object.create(null);n.r(o);var r={};e=e||[null,t({}),t([]),t(t)];for(var s=2&a&&i;"object"==typeof s&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach((function(e){r[e]=function(){return i[e]}}));return r["default"]=function(){return i},n.d(o,r),o}}(),function(){n.d=function(e,t){for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,i){return n.f[i](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{4:"8d766e0d",20:"76a4f3f6",36:"40c629fa",58:"e2300add",65:"e1697a1c",66:"4c2f2279",84:"f8453c50",119:"ce9e5f3a",124:"33d1338b",128:"f38b907d",234:"cc8a113d",336:"5a5039f9",386:"bbb3373f",414:"2e92f5a6",484:"9ce0ae9b",490:"69651306",550:"c355517b",558:"82408ac9",567:"12d37c64",571:"28344603",655:"c05d8256",661:"16dafeea",663:"5fd001bd",669:"2f62553d",677:"5ac4196d",742:"75b35b60",788:"3bd53def",791:"5891e953",794:"0b38752d",836:"69066f46",848:"70257b52",856:"66b532e4",880:"40d415de",912:"f4356521",938:"7a04789c",947:"a2f7d5a8",955:"df3afee2",957:"8dcb5e8a",973:"18f50266"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{36:"8aad7a76",58:"f382e39e",65:"7b4f6818",66:"34d385c0",84:"2d3ca595",119:"77043e59",124:"b7895299",336:"7a257444",386:"0d6f9785",414:"0a9b52fd",484:"d64b59bc",550:"13b9e96d",571:"a31b4085",655:"e22268e2",661:"fe8336c1",663:"e27dcc7a",669:"4081b2b1",742:"d64b59bc",788:"da9cfc97",791:"357d5020",794:"f5392e09",848:"ad74772d",880:"da9cfc97",912:"aae888a1",947:"3a1c4191",955:"bc217323",957:"243f8eb4",973:"d64b59bc"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.hmd=function(e){return e=Object.create(e),e.children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e}}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="client:";n.l=function(i,a,o,r){if(e[i])e[i].push(a);else{var s,c;if(void 0!==o)for(var u=document.getElementsByTagName("script"),l=0;l<u.length;l++){var d=u[l];if(d.getAttribute("src")==i||d.getAttribute("data-webpack")==t+o){s=d;break}}s||(c=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+o),s.src=i),e[i]=[a];var p=function(t,n){s.onerror=s.onload=null,clearTimeout(m);var a=e[i];if(delete e[i],s.parentNode&&s.parentNode.removeChild(s),a&&a.forEach((function(e){return e(n)})),t)return t(n)},m=setTimeout(p.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=p.bind(null,s.onerror),s.onload=p.bind(null,s.onload),c&&document.head.appendChild(s)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){n.p="/"}(),function(){var e=function(e,t,n,i){var a=document.createElement("link");a.rel="stylesheet",a.type="text/css";var o=function(o){if(a.onerror=a.onload=null,"load"===o.type)n();else{var r=o&&("load"===o.type?"missing":o.type),s=o&&o.target&&o.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=r,c.request=s,a.parentNode.removeChild(a),i(c)}};return a.onerror=a.onload=o,a.href=t,document.head.appendChild(a),a},t=function(e,t){for(var n=document.getElementsByTagName("link"),i=0;i<n.length;i++){var a=n[i],o=a.getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(o===e||o===t))return a}var r=document.getElementsByTagName("style");for(i=0;i<r.length;i++){a=r[i],o=a.getAttribute("data-href");if(o===e||o===t)return a}},i=function(i){return new Promise((function(a,o){var r=n.miniCssF(i),s=n.p+r;if(t(r,s))return a();e(i,s,a,o)}))},a={143:0};n.f.miniCss=function(e,t){var n={36:1,58:1,65:1,66:1,84:1,119:1,124:1,336:1,386:1,414:1,484:1,550:1,571:1,655:1,661:1,663:1,669:1,742:1,788:1,791:1,794:1,848:1,880:1,912:1,947:1,955:1,957:1,973:1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=i(e).then((function(){a[e]=0}),(function(t){throw delete a[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,i){var a=n.o(e,t)?e[t]:void 0;if(0!==a)if(a)i.push(a[2]);else if(788!=t){var o=new Promise((function(n,i){a=e[t]=[n,i]}));i.push(a[2]=o);var r=n.p+n.u(t),s=new Error,c=function(i){if(n.o(e,t)&&(a=e[t],0!==a&&(e[t]=void 0),a)){var o=i&&("load"===i.type?"missing":i.type),r=i&&i.target&&i.target.src;s.message="Loading chunk "+t+" failed.\n("+o+": "+r+")",s.name="ChunkLoadError",s.type=o,s.request=r,a[1](s)}};n.l(r,c,"chunk-"+t,t)}else e[t]=0},n.O.j=function(t){return 0===e[t]};var t=function(t,i){var a,o,r=i[0],s=i[1],c=i[2],u=0;if(r.some((function(t){return 0!==e[t]}))){for(a in s)n.o(s,a)&&(n.m[a]=s[a]);if(c)var l=c(n)}for(t&&t(i);u<r.length;u++)o=r[u],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(l)},i=self["webpackChunkclient"]=self["webpackChunkclient"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=n.O(void 0,[998],(function(){return n(1919)}));i=n.O(i)})();
//# sourceMappingURL=app.c8133efc.js.map