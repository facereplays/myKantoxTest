import Service, { service } from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

/***
 *
 * main sevice for calculating basket total summ
 *
 */
export default class CartService extends Service {
  /***
   * retreving basket items from localstorage if exists
   *
   *
   * @type {any}
   */
  @tracked itemsGroups = localStorage.getItem('cart')
    ? localStorage.getItem('cart').length > 1
      ? JSON.parse(localStorage.getItem('cart'))
      : A([])
    : A([]);
  /****
   *
   * retriving total number of items
   *
   *
   *
   * @type {*|number}
   */
  @tracked items = this.itemsGroups
    ? this.itemsGroups.filter((o) => o.amount > 0)
      ? this.itemsGroups
          .map((o) => o.amount)
          .reduce((partialSum, a) => partialSum + a, 0)
      : 0
    : 0;

  @tracked itemsAms = this.itemsGroups
    ? this.itemsGroups.filter((o) => o.amount > 0)
      ? this.itemsGroups.map((o) => [o.item.UID, o.amount])
      : []
    : [];
  /***
   *
   * calculating initial basket summ
   *
   * @type {*| number}
   */
  @tracked summ = this.recalculate(this.itemsGroups);

  @tracked summTotal = 0;
  @service store;

  /***
   * number of items in basket
   *
   * @returns {*|number}
   */
  getAmount() {
    return this.items;
  }

  /***
   *
   * all basket groups
   * @returns {[*]}
   */
  getGroups() {
    return this.itemsGroups;
  }

  /***
   *
   * amount for particular item
   * @returns {[*]}
   */
  getGroupAmount(itemId) {
    const its =
      this && this.itemsGroups
        ? this.itemsGroups
        : localStorage.getItem('cart')
        ? localStorage.getItem('cart').length > 1
          ? JSON.parse(localStorage.getItem('cart'))
          : A([])
        : A([]);

    return its
      ? its.find((o) => o.item.UID === itemId)
        ? its.find((o) => o.item.UID === itemId).amount
        : '0'
      : '0';
  }

  /***
   * updating amount of items in basket
   *
   * @param item
   * @param amount
   */
  add(item, amount) {
    let sTotal = 0;

    const found = this.itemsGroups.find((s) => s.item.UID === item.UID);
    !found && amount > 0
      ? this.itemsGroups.push({ item: item, amount })
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
    if(document.getElementById('cartIndex'))
    {
      document.getElementById('cartIndex').className =
        'ripple rounded-md';
      setTimeout(() => {
        document.getElementById('cartIndex').className =
          'rounded-md';
      }, 1000);
    }

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
      this.itemsGroups.find((g) => g.item.UID === id)
    );
  }

  /***
   * recalculating summ in accordance with discount's algorythms
   * or returning plain multiplication if discount does not exist or not valid to amount
   *
   * @param gr
   * @returns {number}
   */
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
          ret += gr.item.price * (gr.amount % 2);
        } else {
          ret += gr.item.price * gr.amount;
        }
      } else {
        ret += gr.item.price * gr.amount;
      }
    }
    return ret;
  }
}
