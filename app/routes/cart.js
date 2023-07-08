import Route from '@ember/routing/route';
import { service } from "@ember/service";

export default class CartRoute extends Route {
  @service store;
  @service cart;

 async model(){
   const st = localStorage.getItem('cart');
  const ret = st ? JSON.parse(localStorage.getItem('cart')) : [];
 ret.forEach(it=>{
 if(it.amount>0)  this.cart.add(it.item,it.amount);

 });

return ret;
  }


}
