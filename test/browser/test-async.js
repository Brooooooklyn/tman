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
  return new Promise((resolve, reject) => setTimeout(resolve, n))
}

tman.before(function () {
  assert.strictEqual(count++, 0)
  console.log('Start practical tests')
})

tman.after(function () {
  assert.strictEqual(count++, 24)
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
    tman.beforeEach(async function () {
      count++
      await delay(20)
    })

    tman.it('test level 3-1',  async () => {
      assert.strictEqual(count++, 7)
      await delay(100)
    })

    tman.it('test level 3-2', function () {
      assert.strictEqual(count++, 9)
    })
  })

  tman.suite('suite level 2-2', function () {
    tman.afterEach(async () => {
      count++
      await delay(20)
    })

    tman.it('test level 3-1', async function () {
      assert.strictEqual(count++, 11)
      await delay(100)
    })

    tman.it('test level 3-2', function () {
      assert.strictEqual(count++, 13)
    })

    tman.suite.skip('suite level 3-1', function () {
      tman.afterEach(async function () {
        assert.strictEqual('skip', false)
      })

      tman.it('test level 4-1', async function () {
        assert.strictEqual('skip', false)
      })

      tman.it('test level 4-2', function () {
        assert.strictEqual('skip', false)
      })
    })

    tman.suite('suite level 3-2', function () {
      tman.before(function () {
        assert.strictEqual(count++, 15)
      })

      tman.after(function () {
        assert.strictEqual(count++, 19)
      })

      tman.it('test level 4-1', async function () {
        assert.strictEqual(count++, 16)
        await delay(100)
      })

      tman.it('test level 4-2', function () {
        assert.strictEqual(count++, 17)
      })

      tman.it.skip('test level 4-3', function () {
        assert.strictEqual('skip', false)
      })

      tman.it('test level 4-4', function () {
        assert.strictEqual(count++, 18)
      })
    })
  })
})

tman.it('test level 1-1', async function () {
  assert.strictEqual(count++, 21)
  await delay(100)
})

tman.it('test level 1-2', function () {
  assert.strictEqual(count++, 22)
})

tman.it('test level 1-3', function () {
  assert.strictEqual(count++, 23)
})

tman.run()
