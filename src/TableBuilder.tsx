import * as React from 'react'
import MUITable from '@material-ui/core/Table'
import MUITableRow from '@material-ui/core/TableRow'
import MUITableCell, { TableCellProps } from '@material-ui/core/TableCell'
import MUITableFooter from '@material-ui/core/TableFooter'
import MUITablePagination from '@material-ui/core/TablePagination'
import MUICheckbox from '@material-ui/core/Checkbox'
import MUISkeleton from '@material-ui/lab/Skeleton'
// import DragIndicatorIcon from '@material-ui/icons/DragIndicator'
import TableHead, { TableHeadProps } from './components/TableHead'
import TableCellHeader from './components/TableCellHeader'
import { renderTable } from './helper'
import TableBody from './components/TableBody'
import TableRow from './components/TableRow'
import SortTableCell from './components/SortTableCell'

interface ColumnType<T> extends TableCellProps {
  title: string
  key: string
  dataIndex: string
  renderCell?: (data: T) => React.ReactNode
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
  className?: string
  columns: ColumnType<T>[]
  data?: T[]
  noDataMessage?: string
  loading?: boolean
  selectable?: boolean
  draggable?: boolean
  selectKey?: string
  isChecked?: (key: string) => boolean
  toggle?: (item: T) => void
  hasPagination?: boolean
  onRowClick?: (data: T) => void
  actions?: React.ReactNode
}

const PAGINATION_SIZES = [5, 10, 25]
const DEFAULT_PAGINATION_SIZE = 5

const TableBuilder = <T,>({
  className,
  columns,
  data,
  noDataMessage = 'No Data Available',
  loading = false,
  selectable = false,
  draggable,
  labelRowsPerPage,
  rowsPerPageOptions = PAGINATION_SIZES,
  rowsPerPage = DEFAULT_PAGINATION_SIZE,
  count = 0,
  page = 1,
  onPageChange,
  selectKey = 'id',
  isChecked,
  selected = 0,
  toggle,
  toggleAll,
  toolbar,
  hasPagination = true,
  onRowClick,
  actions
}: React.PropsWithChildren<TableBuilderProps<T>>) => {
  let noOfColumns = columns.length

  if (selectable) {
    noOfColumns += 1
  }

  if (draggable) {
    noOfColumns += 1
  }

  if (!!actions) {
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
        draggable={draggable}
      >
        {columns &&
          columns.map(({ title, key, dataIndex, ...rest }) => (
            <TableCellHeader key={dataIndex} {...rest}>
              <span>{title}</span>
            </TableCellHeader>
          ))}

        {actions && <MUITableCell />}
      </TableHead>
      <TableBody useDragHandle>
        {renderTable(
          data,
          loading,
          (rowData, index) => {
            const isSelected =
              rowData && isChecked && !!isChecked(rowData[selectKey])

            if (rowData) {
              return (
                <TableRow
                  index={index || 0}
                  selected={isSelected}
                  hover={!!rowData}
                  // key={rowData && 'id' in rowData ? rowData.id : index}
                  key={index}
                  onClick={() => {
                    if (onRowClick) onRowClick(rowData)
                  }}
                >
                  {draggable && <SortTableCell />}

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
                    columns.map(({ key, dataIndex, renderCell, ...rest }) => (
                      <MUITableCell key={dataIndex} {...rest}>
                        {renderCell
                          ? renderCell(rowData)
                          : key in rowData
                          ? rowData[key]
                          : '-'}
                      </MUITableCell>
                    ))}

                  {actions && (
                    <MUITableCell align={'right'}>{actions}</MUITableCell>
                  )}
                </TableRow>
              )
            }
            return null
          },
          () => (
            <MUITableRow>
              <MUITableCell colSpan={noOfColumns}>{noDataMessage}</MUITableCell>
            </MUITableRow>
          ),
          () => (
            <MUITableRow>
              {columns &&
                columns.map(({ dataIndex }) => (
                  <MUITableCell key={dataIndex}>
                    <MUISkeleton animation='wave' variant='text' />
                  </MUITableCell>
                ))}
            </MUITableRow>
          )
        )}
      </TableBody>

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
