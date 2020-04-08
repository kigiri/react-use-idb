const isBrowser = typeof window !== 'undefined'

const dbp = new Promise((resolve, reject) => {
  if (isBrowser){
    const openreq = window.indexedDB.open('use-idb', 1)
    openreq.onerror = () => reject(openreq.error)
    openreq.onsuccess = () => resolve(openreq.result)
    openreq.onupgradeneeded = () => openreq.result.createObjectStore('idb')
  } else {
    resolve(undefined)
  }
})

export const call = async (type, method, ...args) => {
  const db = await dbp
  return new Promise((resolve, reject) => {
    if (isBrowser){
      const transaction = db.transaction('idb', type)
      const store = transaction.objectStore('idb')
      const req = store[method](...args)
      transaction.oncomplete = () => resolve(req)
      transaction.onabort = transaction.onerror = () => reject(transaction.error)
    } else {
      resolve(undefined)
    }
  })
}

export const get = async key => (await call('readonly', 'get', key)).result
export const set = (key, value) =>
  value === undefined
    ? call('readwrite', 'delete', key)
    : call('readwrite', 'put', value, key)
