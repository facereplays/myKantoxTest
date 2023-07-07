import Service from '@ember/service';
import { A } from '@ember/array';

export default class ProductsService extends Service {
  products = A([]);

  add(item) {
    this.products.pushObject(item);
  }
  addBatch(items) {
    this.products.pushObjects(items);
  }
  remove(item) {
    this.products.removeObject(item);
  }

  empty() {
    this.items.clear();
  }
}
