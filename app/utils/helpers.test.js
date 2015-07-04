import test from 'tape'
import {pluralize} from './helpers'

test('# helpers', t => {

  t.test('pluralize()', t => {
    t.plan(3)

    t.equal(pluralize(1, 'item'), 'item', '1 item')
    t.equal(pluralize(2, 'item'), 'items', '2 items')
    t.equal(pluralize(21, 'item'), 'items', '20 items')
  })

})
