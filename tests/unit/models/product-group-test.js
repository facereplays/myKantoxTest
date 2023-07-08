import { module, test } from 'qunit';

import { setupTest } from 'super-rentals/tests/helpers';

module('Unit | Model | product group', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('product-group', {});
    assert.ok(model);
  });
});
