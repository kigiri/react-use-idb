# react-use-idb (`useIdb`)

React side-effect hook that manages a single `indexDB` item.

A drop-in remplacement over `useLocalStorage`.

## Why ?

`LocalStorage` is synchronous and as such, has [performances issues](https://hacks.mozilla.org/2012/03/there-is-no-simple-solution-for-local-storage/)

`LocalStorage` is also limited, only storing strings and does not provide a default mechanisme for serializing / deserializing your data.

Instead, we can rely on `indexDB` for structural cloning.

## Usage

```jsx
import { useIdb } from 'react-use-idb'

const Demo = () => {
  const [value, setValue] = useIdb('my-key', 'foo')

  return (
    <div>
      <div>Value: {value}</div>
      <button onClick={() => setValue('bar')}>bar</button>
      <button onClick={() => setValue('baz')}>baz</button>
    </div>
  )
}
```

## Reference

```js
useIdb(key)
useIdb(key, initialValue)
```

- `key` &mdash; `indexDB` item key to manage.
- `initialValue` &mdash; initial value to set, if value in the `indexDB` item is empty.

> Inspired by [idb-keyval](https://github.com/jakearchibald/idb-keyval)
