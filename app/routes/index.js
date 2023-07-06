import Route from '@ember/routing/route';
import { service } from '@ember/service';
import Cache from '@ember-data/json-api';

export default class IndexRoute extends Route {
  @service store;

  async model() {
    return this.store.findAll('rental');
  }
  async modelItem() {
    return this.store.findAll('item');
  }
}
