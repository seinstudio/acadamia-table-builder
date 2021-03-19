import MUITableCell from '@material-ui/core/TableCell'
import React from 'react'
import { TableCellHeaderProps } from '../typings'

const TableCellHeader = ({ children }: TableCellHeaderProps) => {
  return <MUITableCell>{children}</MUITableCell>
}

export default TableCellHeader
