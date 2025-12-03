import { module, test } from 'qunit';
import { setupTest } from 'library-management/tests/helpers';

module('Unit | Route | homepage/borrowed-books', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:homepage/borrowed-books');
    assert.ok(route);
  });
});
