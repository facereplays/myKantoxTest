import Model, { attr, hasMany } from '@ember-data/model';

export default class DiscountModel extends Model {
  @attr('string') name;
  @attr('string') type;
  @attr('number') min;
  @attr('number') amount;
  @attr('number') id;
  @attr('string') description;
  @hasMany('product') product;
}
