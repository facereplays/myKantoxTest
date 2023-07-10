import Service, {service} from '@ember/service';
import {A} from '@ember/array';
import {tracked} from '@glimmer/tracking';

export default class CartService extends Service {
  @tracked itemsGroups = localStorage.getItem('cart') ?
    localStorage.getItem('cart').length > 1
      ? JSON.parse(localStorage.getItem('cart'))
      : A([]) : A([]);

  @tracked items = this.itemsGroups
    ? this.itemsGroups.filter((o) => o.amount > 0)
      ? this.itemsGroups.map((o) => o.amount).reduce((partialSum, a) => partialSum + a, 0)
      : 0
    : 0;
  @tracked summ = this.recalculate(this.itemsGroups);
  @tracked summTotal = 0;
  @service store;

  getAmount() {
    return this.items;
  }

  getGroups() {
    return this.itemsGroups;
  }

  getGroupAmount(itemId) {
    const gr = this.itemsGroups.find((o) => o.item.id == itemId);
    return gr ? gr.amount : 0;

  }

  add(item, amount) {
    let sTotal = 0;

    const found = this.itemsGroups.find((s) => s.id == item.id);
    !found && amount > 0
      ? this.itemsGroups.push({id: item.id, item: item, amount})
      : (found.amount = amount);

    this.summ = this.recalculate(this.itemsGroups);
    this.itemsGroups.forEach((g) => {
      sTotal += g.item.price * g.amount;

    });
    this.summTotal = sTotal;
    this.items = this.itemsGroups
      .map((o) => o.amount)
      .reduce((partialSum, a) => partialSum + a, 0);
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
  totalSumm() {
    return this.recalculate(this.itemsGroups);
  }

  recalculate(itemsGroups) {
    /****
     *
     * different discounts algorythms
     *
     * @type {number}
     */

    let ret = 0;
    itemsGroups.forEach((gr) => {
      ret += this.recalculateItemGroup(gr);
    });

    return ret;
  }

  recalculateItemGroupById(id) {
    return this.recalculateItemGroup(
      this.itemsGroups.find((g) => g.item.id == id)
    );
  }

  recalculateItemGroup(gr) {
    let ret = 0;
    if (gr.amount && gr.item) {
      gr.subTotal = gr.item.price * gr.amount;
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
}
