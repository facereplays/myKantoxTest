import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class ProductGroupComponent extends Component {
  @tracked stat;
  @tracked trr;
  @tracked vid;
  @service currency;
  @service cart;
  @tracked item = this.args.group ? this.args.group.item : null;
  @tracked group = this.args.group;
  @tracked allItems = this.cart.itemsGroups;
  @tracked amount =
    this.args.group && this.args.group.item
      ? this.allItems.find((g) => g.item.UID === this.args.group.item.UID)
          .amount
      : 0;

  /***
   * getting updated subtoatl for particular item
   *
   *
   * @returns {*}
   */
  get getGroupAmount() {
    const ht = this.cart.itemsGroups.find(
      (g) => g.item.UID === this.args.group.item.UID
    ).amount;
    // eslint-disable-next-line ember/no-side-effects
    this.vid = ht;
    // eslint-disable-next-line ember/no-side-effects
    this.trr = (ht * this.args.group.item.price).toFixed(2);
    return this.cart.items;
  }

  get discountText() {
    return this.args.group && this.args.group.item
      ? this.args.group.item.discount.type === 'absolute'
        ? this.args.group.item.discount.min.toString() +
          '  for ' +
          this.currency.symbol +
          (
            (this.args.group.item.price -
              this.args.group.item.discount.amount) *
            this.args.group.item.discount.min
          ).toString()
        : this.args.group.item.discount.name
      : '';
  }

  get summ() {
    return this.args.group && this.args.group.item
      ? (
          this.cart.itemsGroups.find(
            (g) => g.item.UID === this.args.group.item.UID
          ).amount * this.args.group.item.price
        ).toFixed(2)
      : '';
  }

  //console.log();
}
