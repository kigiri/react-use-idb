import { useState, useEffect } from 'react'
import { set, get } from './idb.js'

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
