'use strict'
// **Github:** https://github.com/thunks/tman
//
// **License:** MIT
/* global tman */

var count = 0
var assert = {
  strictEqual: function (a, b) {
    if (a !== b) throw new Error(String(a) + ' not equal ' + String(b))
  }
}

function delay (n) {
  return function (done) {
    setTimeout(done, n)
  }
}

tman.before(function () {
  assert.strictEqual(count++, 0)
  console.log('Start practical tests')
})

tman.after(function () {
  assert.strictEqual(count++, 25)
  console.log('End practical tests')
})

tman.suite('suite level 1-1', function () {
  tman.beforeEach(function * () {
    count++
    yield delay(10)
  })

  tman.it('test level 2-1', function () {
    assert.strictEqual(count++, 2)
  })

  tman.it('test level 2-2', function () {
    assert.strictEqual(count++, 4)
  })

  tman.suite('suite level 2-1', function () {
    tman.beforeEach(function * () {
      count++
      yield delay(20)
    })

    tman.it('test level 3-1', function * () {
      assert.strictEqual(count++, 7)
      yield delay(100)
    })

    tman.it('test level 3-2', function () {
      assert.strictEqual(count++, 9)
    })
  })

  tman.suite('suite level 2-2', function () {
    tman.afterEach(function * () {
      count++
      yield delay(20)
    })

    tman.it('test level 3-1', function * () {
      assert.strictEqual(count++, 11)
      yield delay(100)
    })

    tman.it('test level 3-2', function () {
      assert.strictEqual(count++, 13)
    })

    tman.suite('suite level 3-1', function () {
      tman.afterEach(function * () {
        assert.strictEqual('skip', false)
      })

      tman.it('test level 4-1', function * () {
        assert.strictEqual('skip', 'skip')
      })

      tman.it('test level 4-2', function () {
        assert.strictEqual('skip', false)
      })
    })

    tman.suite('suite level 3-2', function () {
      tman.before(function () {
        assert.strictEqual(count++, 16)
      })

      tman.after(function () {
        assert.strictEqual(count++, 20)
      })

      tman.it('test level 4-1', function * () {
        assert.strictEqual(count++, 17)
        yield delay(100)
      })

      tman.it('test level 4-2', function () {
        assert.strictEqual(count++, 18)
      })

      tman.it('test level 4-3', function () {
        assert.strictEqual('test error', false)
      })

      tman.it('test level 4-4', function () {
        assert.strictEqual(count++, 19)
      })
    })
  })
})

tman.it('test level 1-1', function * () {
  assert.strictEqual(count++, 22)
  yield delay(100)
})

tman.it('test level 1-2', function () {
  assert.strictEqual(count++, 23)
})

tman.it('test level 1-3', function () {
  assert.strictEqual(count++, 24)
})

tman.run()
