import MUITableCell, {
  TableCellProps as MUITableCellProps
} from '@material-ui/core/TableCell'
import React from 'react'

export interface TableCellHeaderProps extends MUITableCellProps {
  textAlign?: 'left' | 'center' | 'right'
}

const TableCellHeader = ({ children }: TableCellHeaderProps) => {
  return <MUITableCell>{children}</MUITableCell>
}

export default TableCellHeader
