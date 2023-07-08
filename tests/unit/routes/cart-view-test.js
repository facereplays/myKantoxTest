import { module, test } from 'qunit';
import { setupTest } from 'super-rentals/tests/helpers';

module('Unit | Route | cart-view', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:cart-view');
    assert.ok(route);
  });
});
