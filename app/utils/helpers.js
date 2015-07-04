export function pluralize (count, word) {
  return count === 1 ? word : word + 's'
}

export function store (namespace, data) {
  if (data) {
    return window.localStorage.setItem(namespace, JSON.stringify(data))
  }

  var store = window.localStorage.getItem(namespace)
  return (store && JSON.parse(store)) || []
}
