import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class Ted extends Component {
  @service cart;
  @tracked name = this.args.name;
  @tracked results = [];
  @action
  getRepos(event) {
    let url = 'https://api.github.com/users/' + this.name + '/repos';
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then((results1) => {
        this.cart.addBatch(results1);
        this.results = results1;
      });
  }
}
