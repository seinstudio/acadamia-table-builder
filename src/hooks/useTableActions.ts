import { useState } from 'react'

function useTableActions<T>(
  initial: T[] = [],
  compareFunc: (a: T, b: T) => boolean = (a, b) => a === b
) {
  const [listElements, setListElements] = useState(initial)

  function add(data: T) {
    setListElements([...listElements, data])
  }

  function remove(data: T) {
    setListElements(
      listElements.filter((listElement) => !compareFunc(listElement, data))
    )
  }

  function reset() {
    setListElements([])
  }

  function isSelected(data: T) {
    return !!listElements.find((listElement) => compareFunc(listElement, data))
  }

  function set(data: T[]) {
    setListElements(data)
  }

  function toggle(data: T) {
    if (isSelected(data)) {
      remove(data)
    } else {
      add(data)
    }
  }

  function toggleAll(data: T[], selected: number) {
    const allItems = data.filter((item) => !!item)
    reset()
    if (selected !== allItems.length) {
      set(allItems)
    }
  }

  return {
    add,
    remove,
    reset,
    isSelected,
    set,
    toggle,
    toggleAll,
    listElements
  }
}

export default useTableActions
