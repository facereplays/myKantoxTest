import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class ProductComponent extends Component {
  @tracked quantity = 0;
  @service cart;
  /***
   * particular product
   *
   *
   * @type {*}
   */
  @tracked item = this.args.product;

  /***
   *
   * plus one to cart
   *
   * @param e
   */
  @action
  addToCart(e) {
    e.preventDefault();
    this.quantity++;
    this.cart.add(this.item);
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
    this.quantity--;
  }

  /***
   *
   * check if cart contains oly one item
   *
   * @returns {boolean}
   */
  get one(){
   return  this.quantity == 1 ? true : false;
  }
}
