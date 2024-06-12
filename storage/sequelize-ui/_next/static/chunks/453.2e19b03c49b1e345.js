"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[453],{6453:function(e,t,o){o.r(t);var d,s,a=o(8755),r=o(9054),l=o(4960);let n=(0,r.hw)(2024,3,11);(d=s||(s={})).Student="CRI968kpqcwV9mjesejsH",d.Teacher="aZ3V8Aoer084dTsbMlgSA",d.Course="B2Zq8EEjSMIvtZqn9WOpl",d.CourseSection="7t0XI-l1oFKjSVyjsqo9H",d.CourseSectionEnrollment="0qz-0pkT6qC3LVcCe7EZk",d.CourseSectionPosition="srlTjbdQmPbY_IjCbA_e5",d.Topic="AdX1Gp1a73nEju8ClooE9";let i=(0,a.o4)({id:"CRI968kpqcwV9mjesejsH",name:"student",createdAt:n,updatedAt:n,fields:[(0,a.EP)({name:"first name",type:(0,a.Km)({length:255}),required:!0}),(0,a.EP)({name:"last name",type:(0,a.Km)({length:255}),required:!0}),(0,a.EP)({name:"birthdate",type:(0,a.Qp)()})],associations:[(0,a.Lb)({alias:"course section",sourceModelId:"CRI968kpqcwV9mjesejsH",targetModelId:"7t0XI-l1oFKjSVyjsqo9H",type:(0,a.Sq)("0qz-0pkT6qC3LVcCe7EZk")})]}),c=(0,a.o4)({id:"aZ3V8Aoer084dTsbMlgSA",name:"teacher",createdAt:n,updatedAt:n,fields:[(0,a.EP)({name:"first name",type:(0,a.Km)({length:255}),required:!0}),(0,a.EP)({name:"last name",type:(0,a.Km)({length:255}),required:!0}),(0,a.EP)({name:"email",type:(0,a.Km)({length:255}),required:!0,unique:!0})],associations:[(0,a.Lb)({alias:"course section",sourceModelId:"aZ3V8Aoer084dTsbMlgSA",targetModelId:"7t0XI-l1oFKjSVyjsqo9H",type:(0,a.Sq)("srlTjbdQmPbY_IjCbA_e5")}),(0,a.Lb)({alias:"course section positions",sourceModelId:"aZ3V8Aoer084dTsbMlgSA",targetModelId:"srlTjbdQmPbY_IjCbA_e5",type:(0,a.wB)()})]}),u=(0,a.o4)({id:"B2Zq8EEjSMIvtZqn9WOpl",name:"course",createdAt:n,updatedAt:n,fields:[(0,a.EP)({name:"name",type:(0,a.Km)({length:255}),required:!0}),(0,a.EP)({name:"code",type:(0,a.Km)({length:255}),required:!0,unique:!0})],associations:[(0,a.Lb)({alias:"section",sourceModelId:"B2Zq8EEjSMIvtZqn9WOpl",targetModelId:"7t0XI-l1oFKjSVyjsqo9H",type:(0,a.wB)()}),(0,a.Lb)({alias:"topic",sourceModelId:"B2Zq8EEjSMIvtZqn9WOpl",targetModelId:"AdX1Gp1a73nEju8ClooE9",type:(0,a.d4)("course_topics")})]}),p=(0,a.o4)({id:"7t0XI-l1oFKjSVyjsqo9H",name:"course section",createdAt:n,updatedAt:n,fields:[(0,a.EP)({name:"number",type:(0,a.Km)({length:255}),required:!0}),(0,a.EP)({name:"starts at",type:(0,a.gt)(),required:!0}),(0,a.EP)({name:"ends at",type:(0,a.gt)(),required:!0})],associations:[(0,a.Lb)({sourceModelId:"7t0XI-l1oFKjSVyjsqo9H",targetModelId:"B2Zq8EEjSMIvtZqn9WOpl",type:(0,a.zj)()}),(0,a.Lb)({sourceModelId:"7t0XI-l1oFKjSVyjsqo9H",targetModelId:"CRI968kpqcwV9mjesejsH",type:(0,a.Sq)("0qz-0pkT6qC3LVcCe7EZk")}),(0,a.Lb)({sourceModelId:"7t0XI-l1oFKjSVyjsqo9H",targetModelId:"aZ3V8Aoer084dTsbMlgSA",type:(0,a.Sq)("srlTjbdQmPbY_IjCbA_e5")})]}),j=(0,a.o4)({id:"0qz-0pkT6qC3LVcCe7EZk",name:"course section enrollment",createdAt:n,updatedAt:n,fields:[],associations:[(0,a.Lb)({sourceModelId:"0qz-0pkT6qC3LVcCe7EZk",targetModelId:"7t0XI-l1oFKjSVyjsqo9H",type:(0,a.zj)()}),(0,a.Lb)({sourceModelId:"0qz-0pkT6qC3LVcCe7EZk",targetModelId:"CRI968kpqcwV9mjesejsH",type:(0,a.zj)()})]}),q=(0,a.o4)({id:"srlTjbdQmPbY_IjCbA_e5",name:"course section position",createdAt:n,updatedAt:n,fields:[],associations:[(0,a.Lb)({sourceModelId:"srlTjbdQmPbY_IjCbA_e5",targetModelId:"7t0XI-l1oFKjSVyjsqo9H",type:(0,a.zj)()}),(0,a.Lb)({sourceModelId:"srlTjbdQmPbY_IjCbA_e5",targetModelId:"aZ3V8Aoer084dTsbMlgSA",type:(0,a.zj)()})]}),m=(0,a.o4)({id:"AdX1Gp1a73nEju8ClooE9",name:"topic",createdAt:n,updatedAt:n,fields:[(0,a.EP)({name:"name",type:(0,a.Km)({length:255}),required:!0,unique:!0})],associations:[]}),I=(0,a.fK)({id:l.tP,name:"student info system",createdAt:n,updatedAt:n,models:[i,c,u,p,j,q,m]});t.default=I}}]);