import { module, test } from 'qunit';
import { setupRenderingTest } from 'library-management/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | authentication', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Authentication />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Authentication>
        template block text
      </Authentication>
    `);

    assert.dom().hasText('template block text');
  });
});
