import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from "@ember/service";

export default class ProductGroupComponent extends Component {
  @tracked stat;
  @service currency;
  @service cart;
  @tracked item = this.args.group.item;
  @tracked group = this.args.group;
  get one(){
    return this.args.group.amount == 1 ? true : false;

  }
  get discountText() {
    const pro = this.args.group.item;
    return pro.discount.type === 'absolute'
      ? pro.discount.min.toString() +
      '  for ' +
      this.currency.symbol +
      ((pro.price - pro.discount.amount) * pro.discount.min).toString()
      : pro.discount.name;
  }
  //console.log();
}
