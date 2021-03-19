import { TableCellProps as MUITableCellProps } from '@material-ui/core/TableCell'
import { TableHeadProps as MuiTableHeadProps } from '@material-ui/core/TableHead'
export interface ColumnType {
  title: string
  key: string
  dataIndex: string
}

export interface TableHeadProps<T> extends MuiTableHeadProps {
  colSpan?: number
  selected?: number
  toolbar?: React.ReactNode | React.ReactNodeArray
  selectable?: boolean
  draggable?: boolean
  items?: T[]
  toggleAll?: (items: T[], selected: number) => void
}

export interface TableCellHeaderProps extends MUITableCellProps {
  textAlign?: 'left' | 'center' | 'right'
}

interface PaginationType {
  labelRowsPerPage?: React.ReactNode
  rowsPerPageOptions?: Array<number | { value: number; label: string }>
  rowsPerPage?: number
  count: number
  page: number
  onPageChange: (
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
  isChecked: (key: string) => boolean
  toggle?: (item: T) => void
}
