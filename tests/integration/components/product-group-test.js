import { module, test } from 'qunit';
import { setupRenderingTest } from 'super-rentals/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | product-group', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<ProductGroup />`);

    assert.dom(this.element).hasText('Add to Cart');

    // Template block usage:
    await render(hbs`
      <ProductGroup> </ProductGroup>
    `);

    assert.dom(this.element).hasText('Add to Cart');
  });
});
