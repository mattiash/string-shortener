# String shortener

[![Build Status](https://travis-ci.org/mattiash/string-shortener.svg?branch=master)](https://travis-ci.org/mattiash/string-shortener) [![Coverage Status](https://coveralls.io/repos/github/mattiash/string-shortener/badge.svg?branch=master)](https://coveralls.io/github/mattiash/string-shortener?branch=master)

Shorten strings and keep mapping between short and long variants.

## Usage

```typescript
import { StringShortener } from 'string-shortener'

const ss = new StringShortener()
const short = ss.shorten('long string')
ss.getLong(short) // => 'long string'
ss.getShort('long string') // => short
ss.shorten('long string') // => short
ss.getShort('another string') // => undefined
ss.deleteShort(short)
```

The short ids that the module returns

-   only contain characters [a-zA-Z0-9]
-   are unique for one StringShortener instance
-   are never reused, even if the old short has been deleted

If you need to create a new StringShortener and feed it with mappings
created by another instance,
use the `addMapping` method to recreate the mappings.

## Typescript

The module is written in typescript and comes with complete typings,
but can be used in plain javascript as well.
