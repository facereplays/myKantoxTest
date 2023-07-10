import Model, { attr, hasMany } from '@ember-data/model';

/***
 *
 * product item from DB
 *
 */
export default class ProductModel extends Model {
  @attr('string') name;
  @attr('number') price;
  /***
   * index unique attribute
   *
   *
   */
  @attr('string') UID;
  @hasMany('discount', { async: false }) discount;
}
