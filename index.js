import { useState, useEffect } from 'react'

const dbp = new Promise((resolve, reject) => {
  const openreq = indexedDB.open('use-idb', 1)
  openreq.onerror = () => reject(openreq.error)
  openreq.onsuccess = () => resolve(openreq.result)
  openreq.onupgradeneeded = () => openreq.result.createObjectStore('idb')
})

const call = async (type, method, ...args) => {
  const db = await dbp
  const transaction = db.transaction('idb', type)
  const store = transaction.objectStore('idb')

  return new Promise((resolve, reject) => {
    const req = store[key](...args)
    transaction.oncomplete = () => resolve(req)
    transaction.onabort = transaction.onerror = () => reject(transaction.error)
  })
}

export const get = async key => (await call('readonly', 'get', key)).result
export const set = (key, value) =>
  value === undefined
    ? call('readwrite', 'delete', key)
    : call('readwrite', 'put', value, key)

export const useIdb = (key, initialState) => {
  const [item, setItem] = useState(initialState)
  useEffect(async () => setItem(await get(key)), [key])
  return [
    item,
    value => {
      setItem(value)
      return set(key, value)
    },
  ]
}
