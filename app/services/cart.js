import Service, { service } from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

export default class CartService extends Service {

  @tracked items = 0;
  @tracked itemsGroups = A([]);
  @tracked summ = 0;
  @service store;
  getAmount() {
    return this.items;
  }
  getGroups() {
    return this.itemsGroups;
  }
  add(item, amount) {

    const found = this.itemsGroups.find(s => s.id == item.id);
    !found && amount > 0
      ? this.itemsGroups.push({ id: item.id, item: item, amount })
      : (found.amount = amount);


    this.summ = this.recalculate(this.itemsGroups);
    localStorage.setItem('cart', JSON.stringify(this.itemsGroups));
  }

  /****
   *
   * get the summ in accordance with items discounts
   *
   *
   * @param itemsGroups
   * @returns {number}
   */
  recalculate(itemsGroups) {
    /****
     *
     * different discounts algorythms
     *
     * @type {number}
     */
    let n = 0;
    let ret = 0;
    itemsGroups.forEach((gr) => {
      if (gr.amount && gr.item) {
        n += gr.amount;
        if (gr.item.discount.amount && gr.amount >= gr.item.discount.min) {
          if (gr.item.discount.type === 'absolute') {
            ret += (gr.item.price - gr.item.discount.amount) * gr.amount;
          } else if (gr.item.discount.type === 'rel') {
            const pr = gr.item.price * (1 - gr.item.discount.amount);

            ret += pr * gr.amount;
          } else if (gr.item.discount.type === 'payHalfForPair') {
            ret += gr.item.price * Math.floor(gr.amount / 2);
            ret += (gr.item.price * gr.amount) % 2;
          } else {
            ret += gr.item.price * gr.amount;
          }
        } else {
          ret += gr.item.price * gr.amount;
        }
      }
    });
    this.items = n;

    return ret;
  }

  addBatch(items) {
    /***
     * TODO
     *  this.items.pushObjects(items);
     *
     *
     */
  }

  remove(item) {
    /***
     *
     * TODO
     *
     */
  }

  empty() {
    this.items.clear();
  }
}
