import Model, { attr, hasMany } from '@ember-data/model';

export default class ProductModel extends Model {
  @attr('string') name;
  @attr('number') price;
  @attr('number') id;
  @attr('string') UID;
  @hasMany('discount',{async:false}) discount;
}
