import Service from '@ember/service';
import { A } from '@ember/array';
import {tracked} from "@glimmer/tracking";

export default class CartService extends Service {
 @tracked items = A([]);
  @tracked summ = 0;
  getAmount() {

  return this.items.length;
  }
  add(item) {
this.summ += Number(item.price);
    this.items.pushObject(item);

  }
  addBatch(items) {
    this.items.pushObjects(items);
  }
  remove(item) {
    this.summ -= item.price;
    this.items.removeObject(item);
  }

  empty() {
    this.items.clear();
  }
}
