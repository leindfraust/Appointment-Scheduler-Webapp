"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[973],{6757:function(t,e,a){a.r(e),a.d(e,{default:function(){return K}});var s=a(6252),l=a(9963),c=a(2262),i=a(3577),n=a(9226),o=a(196),r=a(3907),h=a(7739),d=a.n(h),u=a(7787);const p={class:"main-doctor"},w={class:"columns"},_={class:"column is-2"},m={class:"column"},b={class:"section"},k=(0,s._)("h1",{class:"title"},"CANCELLED APPOINTMENTS",-1),v={key:0,class:"field"},D={class:"control"},x={key:1,class:"container is-widescreen is-fullhd"},g={class:"subtitle has-text-black"},y={class:"table-container"},f={class:"table is-fullwidth"},C=(0,s._)("thead",null,[(0,s._)("tr",null,[(0,s._)("th",{class:"has-text-black-ter"},"Controls"),(0,s._)("th",{class:"has-text-black-ter"},"Reference ID"),(0,s._)("th",{class:"has-text-black-ter"},"Priority No."),(0,s._)("th",{class:"has-text-black-ter"},"Hospital Appointed"),(0,s._)("th",{class:"has-text-black-ter"},"First Name"),(0,s._)("th",{class:"has-text-black-ter"},"Last Name"),(0,s._)("th",{class:"has-text-black-ter"},"Contact Number"),(0,s._)("th",{class:"has-text-black-ter"},"Birthday"),(0,s._)("th",{class:"has-text-black-ter"},"Symptoms/Comments")])],-1),N={class:"has-text-black-ter"},L={class:"has-text-black-ter"},z={class:"has-text-black-ter"},S={class:"has-text-black-ter"},A={class:"has-text-black-ter"},H={class:"has-text-black-ter"},I={class:"has-text-black-ter"},P={class:"has-text-black-ter",style:{"white-space":"pre-wrap"}},Z={key:2,class:"section"},T=(0,s._)("div",{class:"notification is-info"},[(0,s._)("h1",{class:"title is-5"},"No cancelled appointments.")],-1),E=[T];var F={__name:"DoctorCancelledAppointments",setup(t){const e=(0,r.oR)(),a=(0,c.iH)([]),h=(0,c.iH)(""),T=(0,c.iH)("");(0,s.wF)((async()=>{await o.ZP.post("/api/appointmentList/cancelledAppointments",{id:e.state.doctorID}).then((t=>a.value=t.data))}));const F=(0,s.Fl)((()=>0!==a.value.length&&d()(a.value.filter((t=>t.firstName.toLowerCase().includes(h.value.toLowerCase())||t.lastName.toLowerCase().includes(h.value.toLowerCase())||t.referenceID.toLowerCase().includes(h.value.toLowerCase()))).sort(((t,e)=>new Date(t.schedule[0].date).getTime()-new Date(e.schedule[0].date).getTime())),"schedule[0].date")));async function U(t){await o.ZP["delete"](`/api/appointmentList/${t}`).catch((t=>T.value=t)),await o.ZP.post("/api/appointmentList/cancelledAppointments",{id:e.state.doctorID}).then((t=>a.value=t.data))}return(t,e)=>((0,s.wg)(),(0,s.iD)("div",p,[(0,s._)("div",w,[(0,s._)("div",_,[(0,s.Wm)(n.Z)]),(0,s._)("div",m,[(0,s._)("section",b,[(0,s.Wm)(u.Z,{"err-msg":T.value},null,8,["err-msg"]),k,0!==a.value.length?((0,s.wg)(),(0,s.iD)("div",v,[(0,s._)("div",D,[(0,s.wy)((0,s._)("input",{class:"input",type:"text",style:{width:"50% !important"},"onUpdate:modelValue":e[0]||(e[0]=t=>h.value=t),placeholder:"Search..."},null,512),[[l.nr,h.value]])])])):(0,s.kq)("",!0),0!==Object.keys((0,c.SU)(F)).length?((0,s.wg)(),(0,s.iD)("div",x,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)((0,c.SU)(F),((a,l)=>((0,s.wg)(),(0,s.iD)("div",{class:"box",key:l},[(0,s._)("h1",g,"Schedule: "+(0,i.zw)(new Date(l).toDateString()),1),(0,s._)("div",y,[(0,s._)("table",f,[C,(0,s._)("tbody",null,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(a,(a=>((0,s.wg)(),(0,s.iD)("tr",{key:a._id},[(0,s._)("button",{class:"button is-danger is-light",onClick:e[1]||(e[1]=e=>U(t.appointment._id))},"Delete"),(0,s._)("th",N,(0,i.zw)(a.referenceID),1),(0,s._)("th",L,(0,i.zw)(a.priorityNum),1),(0,s._)("th",z,(0,i.zw)(a.hospital),1),(0,s._)("td",S,(0,i.zw)(a.firstName),1),(0,s._)("td",A,(0,i.zw)(a.lastName),1),(0,s._)("td",H,(0,i.zw)(a.contactNum),1),(0,s._)("td",I,(0,i.zw)(a.birthDay),1),(0,s._)("td",P,(0,i.zw)(a.comments),1)])))),128))])])])])))),128))])):((0,s.wg)(),(0,s.iD)("section",Z,E))])])])]))}};const U=F;var K=U}}]);
//# sourceMappingURL=973.18f50266.js.map