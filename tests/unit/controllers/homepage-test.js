import { module, test } from 'qunit';
import { setupTest } from 'library-management/tests/helpers';

module('Unit | Controller | homepage', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:homepage');
    assert.ok(controller);
  });
});
