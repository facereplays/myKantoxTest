import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
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
    return pro
      ? pro.discount.type === 'absolute'
        ? pro.discount.min.toString() +
          '  for ' +
          this.currency.symbol +
          ((pro.price - pro.discount.amount) * pro.discount.min).toString()
        : pro.discount.name
      : '';
  }
  /***
   * particular product
   *
   *
   * @type {*}
   */
  @tracked item = this.args.product;
  @tracked group = {
    item: this.args.product,
    amount: this.item ? this.cart.getGroupAmount(this.item.UID) : 0,
  };
}
