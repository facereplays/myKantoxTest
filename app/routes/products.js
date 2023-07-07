import Route from '@ember/routing/route';
import { service } from '@ember/service';
import fetch from 'fetch';

export default class ProductsRoute extends Route {
  @service store;

  async model() {
    const response = await fetch(
      'https://buben-sha.herokuapp.com/api/records/product'
    );
    const photos = await response.json();

    return photos.records;
  }
}
