import * as React from 'react'
import MUITable from '@material-ui/core/Table'
import MUITableBody from '@material-ui/core/TableBody'
import MUITableRow from '@material-ui/core/TableRow'
import MUITableCell, { TableCellProps } from '@material-ui/core/TableCell'
import MUITableFooter from '@material-ui/core/TableFooter'
import MUITablePagination from '@material-ui/core/TablePagination'
import MUICheckbox from '@material-ui/core/Checkbox'
import MUISkeleton from '@material-ui/lab/Skeleton'
import TableHead, { TableHeadProps } from './components/TableHead'
import TableCellHeader from './components/TableCellHeader'

interface ColumnType extends TableCellProps {
  title: string
  key: string
  dataIndex: string
}

interface PaginationType {
  labelRowsPerPage?: React.ReactNode
  rowsPerPageOptions?: Array<number | { value: number; label: string }>
  rowsPerPage?: number
  count?: number
  page?: number
  onPageChange?: (
    page: number,
    size: number,
    order: 'asc' | 'desc',
    field: string
  ) => void
}

export interface TableBuilderProps<T>
  extends TableHeadProps<T>,
    PaginationType {
  columns: ColumnType[]
  className?: string
  noDataMessage?: string
  loading?: boolean
  data?: T[]
  draggable?: boolean
  selectable?: boolean
  selectKey?: string
  isChecked?: (key: string) => boolean
  toggle?: (item: T) => void
  hasPagination?: boolean
}

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
  page = 1,
  onPageChange,
  data,
  selectKey = 'id',
  isChecked,
  selected = 0,
  toggle,
  toggleAll,
  toolbar,
  hasPagination = true
}: TableBuilderProps<any>) => {
  let noOfColumns = columns.length

  if (selectable) {
    noOfColumns += 1
  }

  if (draggable) {
    noOfColumns += 1
  }

  return (
    <MUITable className={className}>
      <TableHead
        selected={selected}
        colSpan={noOfColumns}
        selectable={selectable}
        toggleAll={toggleAll}
        items={data}
        toolbar={toolbar}
        loading={loading}
      >
        {columns &&
          columns.map(({ title, key, dataIndex, ...rest }: ColumnType) => (
            <TableCellHeader data-test={dataIndex} key={key} {...rest}>
              <span>{title}</span>
            </TableCellHeader>
          ))}
      </TableHead>
      <MUITableBody>
        {renderTable(
          data,
          loading,
          (rowData, index) => {
            const isSelected = rowData
              ? isChecked && isChecked(rowData[selectKey])
              : false
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
                  columns.map(({ key, dataIndex, ...rest }) => (
                    <MUITableCell data-test={dataIndex} key={key} {...rest}>
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
      {!loading && hasPagination && (
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
                if (onPageChange)
                  onPageChange(currentPage + 1, rowsPerPage, 'asc', '')
              }}
              onChangeRowsPerPage={(e: any) => {
                if (onPageChange)
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
