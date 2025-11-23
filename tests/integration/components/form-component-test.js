import { module, test } from 'qunit';
import { setupRenderingTest } from 'library-management/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | form-component', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<FormComponent />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <FormComponent>
        template block text
      </FormComponent>
    `);

    assert.dom().hasText('template block text');
  });
});
