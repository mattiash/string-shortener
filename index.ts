export class StringShortener {
    private nextInt = 0

    // Map short ids to long
    private shortMap = new Map<string, string>()

    // Map long ids to short
    private longMap = new Map<string, string>()

    /**
     * Add an explicit mapping from short to long strings
     */
    addMapping(short: string, long: string) {
        this.nextInt = Math.max(idToInt(short) + 1, this.nextInt)
        this.shortMap.set(short, long)
        this.longMap.set(long, short)
    }

    getLong(short: string) {
        return this.shortMap.get(short)
    }

    getShort(long: string) {
        return this.longMap.get(long)
    }

    /**
     * Returns the existing short id corresponding to a long string
     * or creates a new id if none exists
     */
    shorten(long: string) {
        const existingShort = this.getShort(long)
        if (existingShort) {
            return existingShort
        } else {
            const int = this.nextInt
            this.nextInt = int + 1
            const short = intToId(int)
            this.shortMap.set(short, long)
            this.longMap.set(long, short)
            return short
        }
    }

    deleteShort(short: string) {
        const long = this.getLong(short)
        if (!long) {
            throw new Error('Tried to delete non-existing short value ' + short)
        }
        this.shortMap.delete(short)
        this.longMap.delete(long)
    }
}

const CHAR = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const BASE = CHAR.length

export function intToId(int: number) {
    let result = ''
    do {
        result = CHAR[int % BASE] + result
        int = Math.floor(int / BASE)
    } while (int > 0)

    return result
}

export function idToInt(id: string) {
    let result = 0
    for (let char of id.split('')) {
        const d = CHAR.indexOf(char)
        if (d >= 0) {
            result = result * BASE + d
        } else {
            throw new Error(`${id} is not a valid id`)
        }
    }
    return result
}
