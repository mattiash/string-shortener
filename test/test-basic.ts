import 'source-map-support/register'

import * as test from 'purple-tape'
import { intToId, idToInt, StringShortener } from '../index'

test('id to int mapping', (t) => {
    let ok = true
    for (let n = 0; n < 10000; n++) {
        const id = intToId(n)
        if (idToInt(id) !== n) {
            console.log(`${n} ${id} ${idToInt(id)}`)
            ok = false
        }
    }
    t.ok(ok, 'First 10000 values are correct')
})

test('StringShortener', (t) => {
    let ss = new StringShortener()
    ss.addMapping('a', 'aa')
    ss.addMapping('d', 'dd')
    t.equal(ss.shorten('t1'), 'e', 'shorten once gives next key')
    t.equal(ss.shorten('t1'), 'e', 'shorten twice gives same result')
    t.equal(ss.shorten('aa'), 'a', 'shorten addMapping long gives same result')
    t.equal(ss.getLong('e'), 't1', 'getLong')
    ss.deleteShort('e')
    t.equal(ss.shorten('t1'), 'f', 'new short after deleting old')
    t.equal(
        ss.getLong('e'),
        undefined,
        'getLong returns undefined if short does not exist'
    )
    t.equal(ss.getLong('f'), 't1', 'getLong returns new short')
    t.equal(ss.getShort('t1'), 'f', 'getShort')
    t.equal(ss.getShort('aa'), 'a', 'getShort of addMapping entry')
    t.equal(ss.getShort('bad'), undefined, 'getShort of unknown long')

    t.throws(() => ss.deleteShort('aaa'), 'throws when deleting unknown short')
    t.throws(
        () => ss.addMapping('a:1', 'bad entry'),
        'throws when adding entry with bad short'
    )
})
