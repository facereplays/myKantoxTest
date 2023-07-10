import Model, { attr, belongsTo } from '@ember-data/model';

/***
 *
 * group of same products in the basket
 *
 */
export default class ProductGroupModel extends Model {
  @belongsTo('item', {
    async: true,
    inverse: null,
  })
  product;
  @attr('number') amount;
  @attr('number') subTotal;
}
