import Model, { attr, belongsTo } from '@ember-data/model';

export default class ProductGroupModel extends Model {
  @belongsTo('item') product;
  @attr('number') amount;
  @attr('number') id;
}
