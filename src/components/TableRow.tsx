import MUITableRow, { TableRowProps } from '@material-ui/core/TableRow'
import React from 'react'
import { SortableElement } from 'react-sortable-hoc'

const TableRow = SortableElement<TableRowProps>(({ children, ...props }: TableRowProps) => (
  <MUITableRow {...props}>
    {children}
  </MUITableRow>
))

export default TableRow

