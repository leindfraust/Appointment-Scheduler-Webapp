"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[36],{3036:function(e,l,a){a.r(l),a.d(l,{default:function(){return V}});var t=a(6252),i=a(3577),s=a(2262),o=a(9963),c=a(196);const n=e=>((0,t.dD)("data-v-14b5e600"),e=e(),(0,t.Cn)(),e),u={class:"section"},d=n((()=>(0,t._)("div",{class:"modal-background"},null,-1))),r=n((()=>(0,t._)("div",{class:"modal-content loader"},null,-1))),v=[d,r],p={class:"container box",style:{width:"33%"}},b={key:0,class:"notification is-danger"},_={key:1,class:"notification is-success"},m={key:2},k=n((()=>(0,t._)("h1",{class:"title"},"Contact Us",-1))),w={class:"dropdown is-hoverable block"},S={class:"dropdown-trigger"},U={class:"button"},y={class:"dropdown-menu"},f={class:"dropdown-content"},h={class:"field"},g={class:"control"},C=n((()=>(0,t._)("label",{class:"label"},"Email",-1))),q={class:"field"},D={class:"control"},H=n((()=>(0,t._)("label",{class:"label"},"Subject",-1))),I={class:"field"},P={class:"control"},x=n((()=>(0,t._)("label",{class:"label"},"Explain the problem",-1))),T={class:"field has-text-centered"},A={class:"control"},M=["disabled"];var z={__name:"ContactSupport",setup(e){let l=(0,s.iH)(""),a=(0,s.iH)(""),n=(0,s.iH)(""),d=(0,s.iH)(""),r=(0,s.iH)(""),z=(0,s.iH)(!1),G=(0,s.iH)(""),R=(0,s.iH)(!1);async function V(){z.value=!0,Z();try{await c.ZP.post("/api/SupportMail",{ticketID:l.value,email:r.value,ticketType:a.value,ticketTitle:n.value}),await c.ZP.post("/api/superuser/submitTicket",{ticketID:l.value,email:r.value,ticketType:a.value,ticketTitle:n.value,ticketMessage:d.value}),R.value=!0}catch(e){G.value=e}z.value=!1}function Z(){let e="",a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=a.length;for(let l=0;l<8;l++)e+=a.charAt(Math.floor(Math.random()*t));l.value=e.toUpperCase()}return(e,c)=>((0,t.wg)(),(0,t.iD)("section",u,[(0,t._)("div",{class:(0,i.C_)(["modal",{"is-active":(0,s.SU)(z)}])},v,2),(0,t._)("div",p,[(0,s.SU)(G)&&!(0,s.SU)(R)?((0,t.wg)(),(0,t.iD)("div",b,(0,i.zw)((0,s.SU)(G)),1)):(0,t.kq)("",!0),(0,s.SU)(R)?((0,t.wg)(),(0,t.iD)("div",_,"Your problem has been reported, your ticket ID is: "+(0,i.zw)((0,s.SU)(l))+". Please see your email for further instructions.",1)):((0,t.wg)(),(0,t.iD)("div",m,[k,(0,t._)("div",w,[(0,t._)("div",S,[(0,t._)("button",U,(0,i.zw)(""==(0,s.SU)(a)?"Select a Problem":(0,s.SU)(a)),1)]),(0,t._)("div",y,[(0,t._)("div",f,[(0,t._)("a",{class:"dropdown-item",onClick:c[0]||(c[0]=e=>(0,s.dq)(a)?a.value="General Inquiry":a="General Inquiry")},"General Inquiry"),(0,t._)("a",{class:"dropdown-item",onClick:c[1]||(c[1]=e=>(0,s.dq)(a)?a.value="Account Problem":a="Account Problem")},"Account Problem"),(0,t._)("a",{class:"dropdown-item",onClick:c[2]||(c[2]=e=>(0,s.dq)(a)?a.value="Report a bug":a="Report a bug")},"Report a bug")])])]),(0,t._)("div",h,[(0,t._)("div",g,[C,(0,t.wy)((0,t._)("input",{type:"email","onUpdate:modelValue":c[3]||(c[3]=e=>(0,s.dq)(r)?r.value=e:r=e),class:"input"},null,512),[[o.nr,(0,s.SU)(r)]])])]),(0,t._)("div",q,[(0,t._)("div",D,[H,(0,t.wy)((0,t._)("input",{type:"text","onUpdate:modelValue":c[4]||(c[4]=e=>(0,s.dq)(n)?n.value=e:n=e),class:"input"},null,512),[[o.nr,(0,s.SU)(n)]])])]),(0,t._)("div",I,[(0,t._)("div",P,[x,(0,t.wy)((0,t._)("textarea",{"onUpdate:modelValue":c[5]||(c[5]=e=>(0,s.dq)(d)?d.value=e:d=e),class:"textarea"},null,512),[[o.nr,(0,s.SU)(d)]])])]),(0,t._)("div",T,[(0,t._)("div",A,[(0,t._)("button",{class:"button is-primary",onClick:V,disabled:""==(0,s.SU)(a)||""==(0,s.SU)(r)||""==(0,s.SU)(n)||""==(0,s.SU)(d)},"Submit Issue",8,M)])])]))])]))}},G=a(3744);const R=(0,G.Z)(z,[["__scopeId","data-v-14b5e600"]]);var V=R}}]);
//# sourceMappingURL=36.40c629fa.js.map