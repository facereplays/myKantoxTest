import Model, { attr } from '@ember-data/model';

export default class ItemModel extends Model {
  @attr title;
  @attr owner;
  @attr city;
  @attr location;
  @attr category;
  @attr image;
  @attr bedrooms;
  @attr description;

  get type() {
    return 'ShopItem';
  }
}
