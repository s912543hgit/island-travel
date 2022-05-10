"use strict";(self["webpackChunkisland_travel"]=self["webpackChunkisland_travel"]||[]).push([[582],{7229:function(e,t,l){l.d(t,{Z:function(){return O}});var a=l(6252),s=l(3577);const d={id:"delProductModal",class:"modal fade",tabindex:"-1","aria-hidden":"true",ref:"delmodal"},i={class:"modal-dialog"},n={class:"modal-content border-0"},r={class:"modal-header bg-danger text-white"},o={id:"delProductModalLabel",class:"modal-title"},u=(0,a._)("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),c={class:"modal-body"},p=(0,a.Uk)(" 是否刪除 "),m={class:"text-danger"},h=(0,a.Uk)(" 商品(刪除後將無法恢復)。 "),_={class:"modal-footer"},g=(0,a._)("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function b(e,t,l,b,w,f){return(0,a.wg)(),(0,a.iD)("div",d,[(0,a._)("div",i,[(0,a._)("div",n,[(0,a._)("div",r,[(0,a._)("h5",o,[(0,a._)("span",null,(0,s.zw)(l.item.title),1)]),u]),(0,a._)("div",c,[p,(0,a._)("strong",m,(0,s.zw)(l.item.title),1),h]),(0,a._)("div",_,[g,(0,a._)("button",{type:"button",class:"btn btn-danger",onClick:t[0]||(t[0]=t=>e.$emit("del-item"))}," 確認刪除 ")])])])],512)}var w=l(7424),f=l.n(w),v={props:{item:{}},data(){return{modal:""}},emits:["del-item"],methods:{openModal(){this.modal.show()},hideModal(){this.modal.hide()}},mounted(){this.modal=new(f())(this.$refs.delmodal)}},y=l(3744);const k=(0,y.Z)(v,[["render",b]]);var O=k},2651:function(e,t,l){l.d(t,{Z:function(){return m}});var a=l(6252),s=l(3577),d=l(9963);const i={"aria-label":"Page navigation"},n={class:"pagination"},r=["onClick"];function o(e,t,l,o,u,c){return(0,a.wg)(),(0,a.iD)("nav",i,[(0,a._)("ul",n,[(0,a._)("li",{class:(0,s.C_)(["page-item",{disabled:!l.pages.has_pre}])},[(0,a._)("a",{href:"#",class:"page-link","aria-label":"Previous",onClick:t[0]||(t[0]=(0,d.iM)((e=>c.emitPages(l.pages.current_page-1)),["prevent"]))},"上一頁")],2),((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(l.pages.total_pages,(e=>((0,a.wg)(),(0,a.iD)("li",{class:(0,s.C_)(["page-item",{active:e===l.pages.current_page}]),key:e},[(0,a._)("a",{class:"page-link",href:"#",onClick:(0,d.iM)((t=>c.emitPages(e)),["prevent"])},(0,s.zw)(e),9,r)],2)))),128)),(0,a._)("li",{class:(0,s.C_)(["page-item",{disabled:!l.pages.has_next}])},[(0,a._)("a",{class:"page-link","aria-label":"Next",href:"#",onClick:t[1]||(t[1]=(0,d.iM)((e=>c.emitPages(l.pages.current_page+1)),["prevent"]))},"下一頁")],2)])])}var u={props:["pages"],methods:{emitPages(e){this.$emit("emit-pages",e)}}},c=l(3744);const p=(0,c.Z)(u,[["render",o]]);var m=p},582:function(e,t,l){l.r(t),l.d(t,{default:function(){return _e}});var a=l(6252),s=l(3577),d=l(9963);const i={class:"container"},n={class:"table mt-4"},r=(0,a._)("thead",null,[(0,a._)("tr",null,[(0,a._)("th",null,"購買時間"),(0,a._)("th",null,"Email"),(0,a._)("th",null,"購買款項"),(0,a._)("th",null,"應付金額"),(0,a._)("th",null,"是否付款"),(0,a._)("th",null,"編輯")])],-1),o=["textContent"],u={class:"list-unstyled"},c={class:"text-right"},p={class:"form-check form-switch"},m=["id","onUpdate:modelValue","onChange"],h=["for"],_={key:0},g={key:1},b={class:"btn-group"},w=["onClick"],f=["onClick"];function v(e,t,l,v,y,k){const O=(0,a.up)("VueLoading"),D=(0,a.up)("PaginationView"),M=(0,a.up)("DelModal"),x=(0,a.up)("OrderModal");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a.Wm)(O,{active:y.isLoading},null,8,["active"]),(0,a._)("div",i,[(0,a._)("table",n,[r,(0,a._)("tbody",null,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(y.orders,((t,l)=>((0,a.wg)(),(0,a.iD)(a.HY,{key:l},[y.orders.length?((0,a.wg)(),(0,a.iD)("tr",{key:0,class:(0,s.C_)({"text-secondary":!t.is_paid})},[(0,a._)("td",null,(0,s.zw)(e.$filters.date(t.create_at)),1),(0,a._)("td",null,[t.user?((0,a.wg)(),(0,a.iD)("span",{key:0,textContent:(0,s.zw)(t.user.email)},null,8,o)):(0,a.kq)("",!0)]),(0,a._)("td",null,[(0,a._)("ul",u,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t.products,((e,t)=>((0,a.wg)(),(0,a.iD)("li",{key:t},(0,s.zw)(e.product.title)+" 數量："+(0,s.zw)(e.qty)+" "+(0,s.zw)(e.product.unit),1)))),128))])]),(0,a._)("td",c,(0,s.zw)(t.total),1),(0,a._)("td",null,[(0,a._)("div",p,[(0,a.wy)((0,a._)("input",{class:"form-check-input",type:"checkbox",id:`paidSwitch${t.id}`,"onUpdate:modelValue":e=>t.is_paid=e,onChange:e=>k.updateOrder(t)},null,40,m),[[d.e8,t.is_paid]]),(0,a._)("label",{class:"form-check-label",for:`paidSwitch${t.id}`},[t.is_paid?((0,a.wg)(),(0,a.iD)("span",_,"已付款")):((0,a.wg)(),(0,a.iD)("span",g,"未付款"))],8,h)])]),(0,a._)("td",null,[(0,a._)("div",b,[(0,a._)("button",{class:"btn btn-outline-primary btn-sm",type:"button",onClick:e=>k.openModal(t)}," 檢視 ",8,w),(0,a._)("button",{class:"btn btn-outline-danger btn-sm",type:"button",onClick:e=>k.openDelOrderModal(t)}," 刪除 ",8,f)])])],2)):(0,a.kq)("",!0)],64)))),128))])]),(0,a.Wm)(D,{pages:y.pagination,onEmitPages:k.getOrders},null,8,["pages","onEmitPages"]),(0,a.Wm)(M,{item:y.tempOrder,ref:"delModal",onDelItem:k.delOrder},null,8,["item","onDelItem"]),(0,a.Wm)(x,{ref:"orderModal",order:y.tempOrder,onUpdateOrder:k.updateOrder},null,8,["order","onUpdateOrder"])])],64)}var y=l(7229);const k={class:"modal fade",id:"productModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"ordermodal"},O={class:"modal-dialog modal-xl",role:"document"},D={class:"modal-content border-0"},M=(0,a._)("div",{class:"modal-header bg-dark text-white"},[(0,a._)("h5",{class:"modal-title",id:"exampleModalLabel"},[(0,a._)("span",null,"訂單細節")]),(0,a._)("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),x={class:"modal-body"},C={class:"row"},z={class:"col-md-4"},$=(0,a._)("h3",null,"用戶資料",-1),P={class:"table"},L={key:0},Z=(0,a._)("th",{style:{width:"100px"}},"姓名",-1),U=(0,a._)("th",null,"Email",-1),H=(0,a._)("th",null,"電話",-1),V=(0,a._)("th",null,"地址",-1),Y={class:"col-md-8"},q=(0,a._)("h3",null,"訂單細節",-1),E={class:"table"},K=(0,a._)("th",{style:{width:"100px"}},"訂單編號",-1),N=(0,a._)("th",null,"下單時間",-1),W=(0,a._)("th",null,"付款時間",-1),j={key:0},I={key:1},S=(0,a._)("th",null,"付款狀態",-1),B={key:0,class:"text-success"},A={key:1,class:"text-muted"},F=(0,a._)("th",null,"總金額",-1),G=(0,a._)("h3",null,"選購商品",-1),J={class:"table"},Q=(0,a._)("thead",null,[(0,a._)("tr")],-1),R={class:"text-end"},T={class:"d-flex justify-content-end"},X={class:"form-check"},ee={class:"form-check-label",for:"flexCheckDefault"},te={key:0},le={key:1},ae={class:"modal-footer"},se=(0,a._)("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function de(e,t,l,i,n,r){return(0,a.wg)(),(0,a.iD)("div",k,[(0,a._)("div",O,[(0,a._)("div",D,[M,(0,a._)("div",x,[(0,a._)("div",C,[(0,a._)("div",z,[$,(0,a._)("table",P,[n.tempOrder.user?((0,a.wg)(),(0,a.iD)("tbody",L,[(0,a._)("tr",null,[Z,(0,a._)("td",null,(0,s.zw)(n.tempOrder.user.name),1)]),(0,a._)("tr",null,[U,(0,a._)("td",null,(0,s.zw)(n.tempOrder.user.email),1)]),(0,a._)("tr",null,[H,(0,a._)("td",null,(0,s.zw)(n.tempOrder.user.tel),1)]),(0,a._)("tr",null,[V,(0,a._)("td",null,(0,s.zw)(n.tempOrder.user.address),1)])])):(0,a.kq)("",!0)])]),(0,a._)("div",Y,[q,(0,a._)("table",E,[(0,a._)("tbody",null,[(0,a._)("tr",null,[K,(0,a._)("td",null,(0,s.zw)(n.tempOrder.id),1)]),(0,a._)("tr",null,[N,(0,a._)("td",null,(0,s.zw)(e.$filters.date(n.tempOrder.create_at)),1)]),(0,a._)("tr",null,[W,(0,a._)("td",null,[n.tempOrder.paid_date?((0,a.wg)(),(0,a.iD)("span",j,(0,s.zw)(e.$filters.date(n.tempOrder.paid_date)),1)):((0,a.wg)(),(0,a.iD)("span",I,"時間不正確"))])]),(0,a._)("tr",null,[S,(0,a._)("td",null,[n.tempOrder.is_paid?((0,a.wg)(),(0,a.iD)("strong",B,"已付款")):((0,a.wg)(),(0,a.iD)("span",A,"尚未付款"))])]),(0,a._)("tr",null,[F,(0,a._)("td",null,(0,s.zw)(n.tempOrder.total),1)])])]),G,(0,a._)("table",J,[Q,(0,a._)("tbody",null,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(n.tempOrder.products,(e=>((0,a.wg)(),(0,a.iD)("tr",{key:e.id},[(0,a._)("th",null,(0,s.zw)(e.product.title),1),(0,a._)("td",null,(0,s.zw)(e.qty)+" / "+(0,s.zw)(e.product.unit),1),(0,a._)("td",R,(0,s.zw)(n.tempOrder.final_total),1)])))),128))])]),(0,a._)("div",T,[(0,a._)("div",X,[(0,a.wy)((0,a._)("input",{class:"form-check-input",type:"checkbox",value:"",id:"flexCheckDefault","onUpdate:modelValue":t[0]||(t[0]=e=>n.tempOrder.is_paid=e)},null,512),[[d.e8,n.tempOrder.is_paid]]),(0,a._)("label",ee,[n.tempOrder.is_paid?((0,a.wg)(),(0,a.iD)("span",te,"已付款")):((0,a.wg)(),(0,a.iD)("span",le,"未付款"))])])])])])]),(0,a._)("div",ae,[se,(0,a._)("button",{type:"button",class:"btn btn-primary",onClick:t[1]||(t[1]=t=>e.$emit("update-order",n.tempOrder))}," 修改付款狀態 ")])])])],512)}var ie=l(7424),ne=l.n(ie),re={props:{order:{type:Object,default(){return{}}},isNew:{type:Boolean,default:!1}},data(){return{modal:"",status:{},tempOrder:{},is_Paid:!1}},emits:["update-order"],methods:{openModal(){this.modal.show()},hideModal(){this.modal.hide()}},mounted(){this.modal=new(ne())(this.$refs.ordermodal)},watch:{order(){this.tempOrder=this.order}}},oe=l(3744);const ue=(0,oe.Z)(re,[["render",de]]);var ce=ue,pe=l(2651),me={data(){return{orders:{},isNew:!1,pagination:{},isLoading:!1,tempOrder:{},currentPage:1}},components:{DelModal:y.Z,PaginationView:pe.Z,OrderModal:ce},inject:["emitter"],methods:{getOrders(e=1){const t=`https://vue3-course-api.hexschool.io/v2/api/shio-vue/admin/orders/?page=${e}`;this.isLoading=!0,this.$http.get(t).then((e=>{this.orders=e.data.orders,this.pagination=e.data.pagination,this.isLoading=!1})).catch((e=>{this.isLoading=!1,this.emitter.emit("push-message",{style:"danger",title:"找不到訂單",content:e.response.data.message})}))},openModal(e){this.tempOrder={...e},this.isNew=!1;const t=this.$refs.orderModal;t.openModal()},openDelOrderModal(e){this.tempOrder={...e};const t=this.$refs.delModal;t.openModal()},updateOrder(e){this.tempOrder={...e};const t=`https://vue3-course-api.hexschool.io/v2/api/shio-vue/admin/order/${this.tempOrder.id}`,l={is_paid:this.is_paid};this.isLoading=!0;const a=this.$refs.orderModal;this.$http.put(t,{data:this.tempOrder,paid:l}).then((e=>{this.isLoading=!1,a.hideModal(),this.getOrders(this.currentPage)})).catch((e=>{this.isLoading=!1,this.emitter.emit("push-message",{style:"danger",title:"更新失敗",content:e.response.data.message})}))},delOrder(){const e=`https://vue3-course-api.hexschool.io/v2/api/shio-vue/admin/order/${this.tempOrder.id}`;this.isLoading=!0,this.$http.delete(e).then((e=>{this.emitter.emit("push-message",{style:"danger",title:"刪除訂單",content:e.data.message}),this.getOrders();const t=this.$refs.delModal;t.hideModal()})).catch((e=>{this.isLoading=!1,this.emitter.emit("push-message",{style:"danger",title:"刪除失敗",content:e.response.data.message})}))}},mounted(){this.getOrders()}};const he=(0,oe.Z)(me,[["render",v]]);var _e=he}}]);
//# sourceMappingURL=582.53bb3130.js.map