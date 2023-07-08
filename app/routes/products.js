import Route from '@ember/routing/route';
import { service } from '@ember/service';
import fetch from 'fetch';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ProductsRoute extends Route {
  @service store;
  @tracked cartShown = false;

  async model() {
    const response = await fetch(
      'https://buben-sha.herokuapp.com/api/records/product?join=discount'
    );
    const photos = await response.json();

    return photos.records;
  }
  /*
  @action
  async loading(transition, originRoute) {
    let controller = this.controllerFor('foo');
    controller.set('currentlyLoading', true);
    transition.promise.finally(function() {
      controller.set('currentlyLoading', false);
    });
  }*/
}
