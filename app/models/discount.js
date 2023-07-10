import Model, { attr, hasMany } from '@ember-data/model';

/***
 *
 * Discount model created
 * attached as referencing product model
 *
 */
export default class DiscountModel extends Model {
  @attr('string') name;
  /***
   * type of discount [absolute,ler,payHalfForPair]
   * with corresponding algorythms to calculate summ
   *
   */
  @attr('string') type;
  /***
   * minimal amount of items from which the discount is valid
   *
   */
  @attr('number') min;
  /***
   * discount amount to calculate summ: initial summ * discount amount
   */
  @attr('number') amount;
  @attr('string') description;
  @hasMany('product', { async: false }) product;
}
