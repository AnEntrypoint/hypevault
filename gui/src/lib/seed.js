import crypto from "hypercore-crypto"
import b4a from "b4a"
import { browser } from '$app/environment';
const loadKey = () => {
    let rootKey;
    try {
        rootKey = { secretKey: localStorage.getItem('secretKey'), publicKey: localStorage.getItem('publicKey') }
        if (!rootKey.secretKey) throw new Error()
    } catch (e) {
        console.error({ e });
        rootKey = crypto.keyPair()
        rootKey.publicKey = buf2hex(rootKey.publicKey)
        rootKey.secretKey = buf2hex(rootKey.secretKey)
        if (browser) {
            localStorage.setItem('secretKey', rootKey.secretKey)
            localStorage.setItem('publicKey', rootKey.publicKey)
        }
        console.log('set local storage')
    }
    return rootKey
}
const rootKey = loadKey()
console.log({ rootKey })
function buf2hex(buffer) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('')
}
const setKeyFromSeed = (seed) => {
    rootKey = crypto.keyPair(crypto.data(b4a.from(seed)))
    setKey(rootKey)
}

export { rootKey, setKeyFromSeed };