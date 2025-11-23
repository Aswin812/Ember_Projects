import { module, test } from 'qunit';
import { setupTest } from 'library-management/tests/helpers';

module('Unit | Service | borrowed-books', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:borrowed-books');
    assert.ok(service);
  });
});
