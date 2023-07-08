import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class ProductComponent extends Component {
  @tracked quantity = 0;
  @service cart;
  @service currency;
  /****
   *
   * calculating text for discount
   *
   *
   * @returns {*}
   */
  get discountText() {
    const pro = this.args.product;
    return this.args.product.discount.type === 'absolute'
      ? pro.discount.min.toString() +
          '  for ' +
          this.currency.symbol +
          ((pro.price - pro.discount.amount) * pro.discount.min).toString()
      : pro.discount.name;
  }
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
    this.cart.add(this.item, this.quantity);
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
    this.cart.add(this.item, this.quantity);
  }

  /***
   *
   * check if cart contains oly one item
   *
   * @returns {boolean}
   */
  get one() {
    return this.quantity == 1 ? true : false;
  }
}
