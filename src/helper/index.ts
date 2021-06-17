export const renderTable = <T>(
  collection: T[] | undefined,
  loading: boolean,
  renderItem: (
    item: T | undefined,
    index: number | undefined,
    collection: T[] | undefined
  ) => any,
  renderEmpty?: (collection: T[]) => any,
  renderLoading?: () => any
) => {
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
