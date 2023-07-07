import Route from '@ember/routing/route';
import { service } from '@ember/service';
import Cache from '@ember-data/json-api';

export default class IndexRoute extends Route {
  @service store;
}
