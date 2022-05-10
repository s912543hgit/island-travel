"use strict";(self["webpackChunkisland_travel"]=self["webpackChunkisland_travel"]||[]).push([[983],{6983:function(t,s,e){e.r(s),e.d(s,{default:function(){return J}});var i=e(6252),a=e(3577),o=e(9963);const l=(0,i._)("div",{class:"section"},[(0,i._)("div",{class:"background-image background-image--favorite"}),(0,i._)("div",{class:"background-title"},[(0,i._)("h2",{class:"fw-bold"},"收藏清單")])],-1),r={class:"container mt-md-5 mt-3 mb-5"},n={key:0},c=(0,i._)("div",{class:"d-flex justify-content-center align-items-center mb-5"},[(0,i._)("h3",{class:"section-heading"},"收藏清單")],-1),d={class:"table favorite__table"},u=(0,i._)("thead",null,[(0,i._)("tr",null,[(0,i._)("th",{scope:"col",class:"border-0 ps-0"},"商品名稱"),(0,i._)("th",{scope:"col",class:"border-0"},"價格"),(0,i._)("th",{scope:"col",class:"border-0"},"狀態"),(0,i._)("th",{scope:"col",class:"border-0"},"移除")])],-1),m={scope:"row",class:"border-0 px-0 font-weight-normal py-4"},h=["src"],p={class:"mb-0 fw-bold ms-3 d-inline-block text-dark"},_={class:"favorite__price"},g={class:""},b={class:"border-0 align-middle"},v=["onClick","disabled"],f={class:"spinner-border spinner-border-sm",role:"status"},k=(0,i.Uk)(" 加入購物車 "),w={class:"border-0 align-middle"},y=["onClick"],L={class:"cart__list d-md-none"},C={class:"d-flex justify-content-between"},x=["onClick"],D=["src"],F={class:"cart__card__content"},U={class:"mb-0 ms-auto"},I=["onClick","disabled"],O={class:"spinner-border spinner-border-sm",role:"status"},z=(0,i.Uk)(" 加入購物車 "),N={key:1,class:"container--center"},T=(0,i._)("h3",{class:"text-center"},[(0,i.Uk)("目前還沒有收藏行程唷！"),(0,i._)("br"),(0,i.Uk)("快去逛逛吧！")],-1),$=(0,i.Uk)("開始旅程");function j(t,s,e,j,S,H){const W=(0,i.up)("VueLoading"),Y=(0,i.up)("RouterLink");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i.Wm)(W,{active:S.isLoading},null,8,["active"]),l,(0,i._)("div",r,[S.favoritesList.length?((0,i.wg)(),(0,i.iD)("div",n,[c,(0,i._)("table",d,[u,(0,i._)("tbody",null,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(S.favoritesList,(t=>((0,i.wg)(),(0,i.iD)("tr",{key:t.id,class:"border-bottom border-top"},[(0,i._)("th",m,[(0,i.Wm)(Y,{to:`/product/${t.id}`},{default:(0,i.w5)((()=>[(0,i._)("img",{class:"favorite__thumbnail",src:t.imageUrl,alt:"{{ item.title }}"},null,8,h),(0,i._)("p",p,(0,a.zw)(t.title),1)])),_:2},1032,["to"])]),(0,i._)("td",_,[(0,i._)("p",g,"NT$ "+(0,a.zw)(t.price)+" / "+(0,a.zw)(t.unit),1)]),(0,i._)("td",b,[(0,i._)("button",{class:"btn-primary btn",type:"button",onClick:s=>H.addToCart(t.id),disabled:S.isLoadingItem===t.id},[(0,i.wy)((0,i._)("span",f,null,512),[[o.F8,S.isLoadingItem===t.id]]),k],8,v)]),(0,i._)("td",w,[(0,i._)("i",{class:"bi bi-trash-fill fs-5",role:"button",onClick:s=>H.removeFavorite(t.id)},null,8,y)])])))),128))])]),(0,i._)("ul",L,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(S.favoritesList,(t=>((0,i.wg)(),(0,i.iD)("li",{class:"card cart__card",key:t.id},[(0,i._)("div",C,[(0,i._)("span",{class:"icon--close icon-close--sp cartNav__close",onClick:s=>H.removeFavorite(t.id)},null,8,x),(0,i._)("img",{class:"favorite__thumbnail",src:t.imageUrl,alt:"{{ item.title }}"},null,8,D),(0,i._)("div",F,[(0,i.Uk)((0,a.zw)(t.title)+" ",1),(0,i._)("p",U,"小計: NT$ "+(0,a.zw)(t.price),1),(0,i._)("button",{class:"btn-primary btn w-100 mt-2",type:"button",onClick:s=>H.addToCart(t.id),disabled:S.isLoadingItem===t.id},[(0,i.wy)((0,i._)("span",O,null,512),[[o.F8,S.isLoadingItem===t.id]]),z],8,I)])])])))),128))])])):((0,i.wg)(),(0,i.iD)("div",N,[T,(0,i.Wm)(Y,{to:"/products",class:"button--jump mt-5",onClick:s[0]||(s[0]=s=>t.isOpen=!t.isOpen)},{default:(0,i.w5)((()=>[$])),_:1})]))])],64)}var S=e(4902),H={data(){return{products:[],favoritesList:[],isDisabled:"",isLoading:!1,isLoadingItem:"",favorite:JSON.parse(localStorage.getItem("favorite"))||[]}},inject:["emitter"],methods:{getProducts(){const t="https://vue3-course-api.hexschool.io/v2/api/shio-vue/products/";this.isLoading=!0,this.$http.get(t).then((t=>{this.products=t.data.products,this.getFavorites(),this.isLoading=!1})).catch((t=>{this.emitter.emit("push-message",{style:"danger",title:"找不到收藏清單",content:t.response.data.message})}))},getFavorites(){this.favoritesList=this.products.filter((t=>this.favorite.indexOf(t.id)>-1))},addToCart(t,s=1){const e={product_id:t,qty:s};this.isLoading=!0,this.$http.post("https://vue3-course-api.hexschool.io/v2/api/shio-vue/cart",{data:e}).then((t=>{this.emitter.emit("push-message",{style:"success",title:"購物提示",content:t.data.message}),this.isLoading=!1,this.isDisabled="",S.Z.emit("get-cart")})).catch((t=>{this.emitter.emit("push-message",{style:"danger",title:"無法加入購物車",content:t.response.data.message})}))},removeFavorite(t){this.isLoading=!0;const s=this.favorite.indexOf(t);-1!==s&&(this.favorite.splice(s,1),localStorage.setItem("favorite",JSON.stringify(this.favorite)),this.getFavorites(),this.isLoading=!1,this.emitter.emit("push-message",{style:"success",title:"已刪除"}))}},mounted(){this.getProducts()}},W=e(3744);const Y=(0,W.Z)(H,[["render",j]]);var J=Y}}]);
//# sourceMappingURL=983.fc309978.js.map