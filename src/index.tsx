import * as React from 'react'
import MUITable from '@material-ui/core/Table'
import MUITableBody from '@material-ui/core/TableBody'
import MUITableRow from '@material-ui/core/TableRow'
import MUITableCell from '@material-ui/core/TableCell'
import MUITableFooter from '@material-ui/core/TableFooter'
import MUITablePagination from '@material-ui/core/TablePagination'
import MUICheckbox from '@material-ui/core/Checkbox'
import MUISkeleton from '@material-ui/lab/Skeleton'

import { ColumnType, TableBuilderProps } from './typings'
import TableHead from './components/TableHead'
import TableCellHeader from './components/TableCellHeader'
import useTableActions from './hooks/useTableActions'

const PAGINATION_SIZES = [5, 10, 25]
const DEFAULT_PAGINATION_SIZE = 5

function renderTable<T>(
  collection: T[] | undefined,
  loading: boolean,
  renderItem: (
    item: T | undefined,
    index: number | undefined,
    collection: T[]
  ) => any,
  renderEmpty?: () => any,
  renderLoading?: () => any
) {
  if (loading) {
    return renderLoading ? renderLoading() : null
  }
  if (collection === undefined) {
    return renderEmpty ? renderEmpty() : null
  }
  if (collection.length === 0) {
    return renderEmpty ? renderEmpty() : null
  }
  return collection.map(renderItem)
}

const TableBuilder = ({
  className,
  columns,
  noDataMessage = 'No Data Available',
  selectable,
  draggable,
  loading = false,
  labelRowsPerPage,
  rowsPerPageOptions = PAGINATION_SIZES,
  rowsPerPage = DEFAULT_PAGINATION_SIZE,
  count = 0,
  page,
  onPageChange,
  data,
  selectKey = 'id',
  isChecked,
  selected = 0,
  toggle,
  toggleAll,
  toolbar
}: TableBuilderProps<any>) => {
  console.log(loading)

  let noOfColumns = columns.length

  if (selectable) {
    noOfColumns += 1
  }

  if (draggable) {
    noOfColumns += 1
  }

  console.log(data)
  return (
    <MUITable className={className}>
      <TableHead
        selected={selected}
        colSpan={noOfColumns}
        selectable={selectable}
        toggleAll={toggleAll}
        items={data}
        toolbar={toolbar}
      >
        {columns &&
          columns.map(({ title, key }: ColumnType) => (
            <TableCellHeader key={key}>
              <span>{title}</span>
            </TableCellHeader>
          ))}
      </TableHead>
      <MUITableBody>
        {renderTable(
          data,
          loading,
          (rowData, index) => {
            const isSelected = rowData ? isChecked(rowData[selectKey]) : false
            return (
              <MUITableRow
                selected={isSelected}
                hover={!!rowData}
                key={rowData && 'id' in rowData ? rowData.id : index}
              >
                {selectable && (
                  <MUITableCell padding='checkbox'>
                    <MUICheckbox
                      checked={isSelected}
                      onChange={() => {
                        if (toggle && rowData) {
                          toggle(rowData)
                        }
                      }}
                    />
                  </MUITableCell>
                )}
                {columns &&
                  columns.map(({ key, dataIndex }) => (
                    <MUITableCell data-test={dataIndex} key={key}>
                      {rowData && key in rowData ? rowData[key] : '-'}
                    </MUITableCell>
                  ))}
              </MUITableRow>
            )
          },
          () => (
            <MUITableRow>
              <MUITableCell colSpan={noOfColumns}>{noDataMessage}</MUITableCell>
            </MUITableRow>
          ),
          () => (
            <MUITableRow>
              {columns &&
                columns.map(({ key, dataIndex }) => (
                  <MUITableCell data-test={dataIndex} key={key}>
                    <MUISkeleton animation='wave' variant='text' />
                  </MUITableCell>
                ))}
            </MUITableRow>
          )
        )}
      </MUITableBody>
      {!loading && (
        <MUITableFooter>
          <MUITableRow>
            <MUITablePagination
              colSpan={noOfColumns}
              labelRowsPerPage={labelRowsPerPage}
              rowsPerPageOptions={rowsPerPageOptions}
              count={count}
              rowsPerPage={rowsPerPage}
              page={page >= 1 ? page - 1 : 0}
              onChangePage={(_: any, currentPage: number) => {
                onPageChange(currentPage + 1, rowsPerPage, 'asc', '')
              }}
              onChangeRowsPerPage={(e: any) => {
                onPageChange(
                  page,
                  parseInt(e.target.value as string),
                  'asc',
                  ''
                )
              }}
            />
          </MUITableRow>
        </MUITableFooter>
      )}
    </MUITable>
  )
}

export default TableBuilder
export { useTableActions }
