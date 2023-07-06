import Service from '@ember/service';
import {A} from "@ember/array";

export default class CartService extends Service {
  items = A([]);

  add(item) {
    this.items.pushObject(item);
  }
  addBatch(items) {
    this.items.pushObjects(items);
  }
  remove(item) {
    this.items.removeObject(item);
  }

  empty() {
    this.items.clear();
  }






}
