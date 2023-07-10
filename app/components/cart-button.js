import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CartButtonComponent extends Component {
  @service cart;
  @service currency;
  @tracked groups = this.cart.getGroups();
  @tracked group = this.args.group;
  @tracked quantity = this.group
    ? this.group.amount > 0
      ? this.group.amount
      : false
    : false;
  @tracked item = this.group.item;
  /***
   *
   * check if cart contains oly one item
   *
   * @returns {boolean}
   */
  get one() {
    return this.group.amount === 1;
  }

  /***
   *
   * plus one to cart
   *
   * @param e
   */
  @action
  addToCart(e) {
    e.preventDefault();

    this.group.amount++;
    this.quantity = this.group.amount;
    this.cart.add(this.item, this.group.amount);
  }

  /****
   *
   * minus one from cart
   *
   * @param e
   */
  @action
  removeFromCart(e) {
    e.preventDefault();
    this.group.amount--;
    this.quantity = this.group.amount > 0 ? this.group.amount : false;
    this.cart.add(this.item, this.group.amount);
  }
}
