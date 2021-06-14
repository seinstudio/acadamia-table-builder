export function renderTable<T>(
    collection: T[],
    loading: boolean,
    renderItem: (
      item: T | undefined,
      index: number | undefined,
      collection: T[]
    ) => any,
    renderEmpty?: (collection: T[]) => any,
    renderLoading?: () => any
  ) {
    if (loading) {
      return renderLoading ? renderLoading() : null
    }
    if (collection === undefined) {
      return renderItem(undefined, undefined, collection)
    }
    if (collection.length === 0) {
      return !!renderEmpty ? renderEmpty(collection) : null
    }
    return collection.map(renderItem)
  }
  