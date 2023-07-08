import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class CartFullComponent extends Component {
  @service cart;
  get total() {
    return this.cart.getAmount();
  }
  get groups() {
    return this.cart.getGroups();
  }
}
