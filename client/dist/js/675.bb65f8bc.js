"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[675],{2675:function(t,a,e){e.r(a),e.d(a,{default:function(){return f}});var i=e(6252),s=e(2262),n=e(3907),c=e(3343),l=e(8945),o=e(2201),p=e(7787);const u={key:0,class:"section is-medium"},r={key:0,class:"container"},d=(0,i._)("div",{class:"box"},[(0,i._)("h3",{class:"title is-3 has-text-success"},"You have successfuly paid your appointment. Redirecting browser in 5 seconds.")],-1),m=[d],v={key:1,class:"container"},y=(0,i._)("div",{class:"box"},[(0,i._)("h3",{class:"title is-3 has-text-danger"},"Your payment transaction has failed. Please try again, redirecting browser in 5 seconds.")],-1),h=[y],w={key:1,class:"section is-medium"},D=(0,i._)("div",{class:"container"},[(0,i._)("div",{class:"box"},[(0,i._)("h3",{class:"title is-3"},"Your payment is processing, please wait...")])],-1),g=[D];var _={__name:"PaymentStatus",setup(t){const a=(0,n.oR)(),e=(0,o.tv)(),d=(0,c.Z)("sk_test_Y6nQ7BnqHoe8Ua4Q9ytu7rb4"),y=(0,i.Fl)((()=>a.state.paymentStatus)),D=(0,s.iH)(!1),_=(0,s.iH)(""),b=(0,s.iH)();return(0,i.bv)((async()=>{D.value=!0,null!==a.state.patientID&&await l.Z.get("/session/patient").then((t=>_.value=t.data.username)),await d.source.retrieve(a.state.paymentID).then((async t=>{if(D.value=!1,"chargeable"==t.data.attributes.status)a.commit("paymentStatus","paid");else{let t,i;a.commit("paymentStatus","failed"),a.commit("appointed",!1);try{await l.Z.post("/api/appointmentList/patients",{id:a.state.patientID,ongoing:!1}).then((a=>t=a.data)),i=await a.state.doctorDetails.patients.find((t=>t.patient===a.state.patientID._id)),await i&&!t&&await l.Z.post("/api/patientDelete",{doctorID:a.state.doctorDetails._id,patientID:a.state.patientDetails._id,patientFullName:a.state.patientDetails.firstName+" "+a.state.patientDetails.lastName}),await l.Z["delete"](`/api/appointmentList/${a.state.patientDetails._id}`)}catch(e){b.value=e}a.commit("patientDetails",[])}})),setTimeout((async()=>{"paid"==y.value?(a.commit("appointed",!0),await e.push("/success")):await e.push(`/user/${_.value}/registration`)}),5e3)})),(0,i.Ah)((()=>{"paid"==y.value&&a.commit("paymentStatus","pending")})),(t,a)=>D.value?((0,i.wg)(),(0,i.iD)("section",w,g)):((0,i.wg)(),(0,i.iD)("section",u,[(0,i.Wm)(p.Z,{"err-msg":b.value},null,8,["err-msg"]),"paid"==(0,s.SU)(y)?((0,i.wg)(),(0,i.iD)("div",r,m)):((0,i.wg)(),(0,i.iD)("div",v,h))]))}};const b=_;var f=b}}]);
//# sourceMappingURL=675.bb65f8bc.js.map