import { browser } from "$app/environment"
import  crypto from "hypercore-crypto"
import b4a from "b4a"

const SEED = (browser && localStorage.getItem('seed')||"seedy")
//console.log(SEED)

const rootKey = crypto.keyPair(crypto.data(b4a.from(SEED)))
if(rootKey.privateKey) rootKey.privateKey = stringify(rootKey.privateKey)
if(rootKey.scalar) rootKey.scalar = stringify(rootKey.scalar)
function buf2hex(buffer) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
    .map(x => x.toString(16).padStart(2, '0'))
    .join('')
} 

rootKey.publicKey = buf2hex(rootKey.publicKey)
rootKey.secretKey = buf2hex(rootKey.secretKey)
export default rootKey;