import { module, test } from 'qunit';
import { setupTest } from 'library-management/tests/helpers';

module('Unit | Service | books', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:books');
    assert.ok(service);
  });
});
