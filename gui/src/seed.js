import { browser } from "$app/environment"
import  crypto from "hypercore-crypto"
import b4a from "b4a"

const SEED = (browser && localStorage.getItem('seed')||"seedy")
//console.log(SEED)
const rootKey = crypto.keyPair(crypto.data(b4a.from(SEED)))
export default rootKey;