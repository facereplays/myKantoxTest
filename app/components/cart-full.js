import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class CartFullComponent extends Component {
  @service cart;
  @service currency;
  get total() {
    return this.cart.getAmount();
  }
  get groups() {
    return this.cart.getGroups().filter(g=>g.amount>0);
  }
  get discount() {
return (this.cart.summTotal-this.cart.summ).toFixed(2);

  }
  get shipping() {
    /***
     *
     *
     *
     */
    return 0;
  }
  get subTotal() {

    return this.cart.summTotal.toFixed(2);
  }

}
