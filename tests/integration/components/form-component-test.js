import { module, test } from 'qunit';
import { setupRenderingTest } from 'library-management/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | form-component', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders login layout', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<FormComponent @heading="Library Login" @btn-value="Login">
      <:default>
          <div>
              Email :
              <input type="text" id="email">
          </div>
          <div>
              Password :
              <input type="password" id="password">
          </div>
      </:default>
      <:create>
          <p>Don't have an account? <LinkTo @route="create-account">Create Account</LinkTo>
          </p>
      </:create>
    </FormComponent>`);

    assert.dom('h2').hasText('Library Login');
    assert.dom('#btn').hasValue('Login');
    assert.dom('#email').exists();
    assert.dom('#password').exists();
    assert.dom('a').hasText('Create Account');
  });

  test('it renders create account layout', async function (assert) {
    await render(hbs`<FormComponent @heading="Create Account" @btn-value="Create Account">
      <:default>
          <CreateAccount />
      </:default>

      <:create>
          <p>Already have an account? <LinkTo @route="login">Sign In</LinkTo>
          </p>
      </:create>
    </FormComponent>`);

    assert.dom('h2').hasText('Create Account');
    assert.dom('#btn').hasValue('Create Account');
    assert.dom('a').hasText('Sign In');
  });
});
