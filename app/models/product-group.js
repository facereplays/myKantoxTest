import Model, { attr, belongsTo } from '@ember-data/model';

export default class ProductGroupModel extends Model {
  @belongsTo('item', {
    async: true,
    inverse: null
  })
  product;
  @attr('number') amount;
  @attr('number') subTotal;
  @attr('number') id;
}
