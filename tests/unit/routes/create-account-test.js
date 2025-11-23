import { module, test } from 'qunit';
import { setupTest } from 'library-management/tests/helpers';

module('Unit | Route | create-account', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:create-account');
    assert.ok(route);
  });
});
