import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CartComponent extends Component {
  @service cart;
  @service currency;
  @tracked price;

  @tracked items;
  get total() {
    return this.cart.getAmount();
  }
  get summ() {
    return this.cart.summ.toFixed(2);
  }

  /***
   *
   *
   * this.$().on('animationend', () => {
   *     $(this).removeClass('.sliding-anim');
   *   });
   */
}
