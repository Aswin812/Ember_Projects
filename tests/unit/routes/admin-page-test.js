import { module, test } from 'qunit';
import { setupTest } from 'library-management/tests/helpers';

module('Unit | Route | admin-page', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:admin-page');
    assert.ok(route);
  });
});
