import MUITableCell, {
  TableCellProps as MUITableCellProps
} from '@material-ui/core/TableCell'
import React from 'react'

export interface TableCellHeaderProps extends MUITableCellProps {
  textAlign?: 'left' | 'center' | 'right'
}

const TableCellHeader = ({ children, ...rest }: TableCellHeaderProps) => {
  return <MUITableCell {...rest}>{children}</MUITableCell>
}

export default TableCellHeader
