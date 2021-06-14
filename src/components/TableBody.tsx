import React from 'react'
import MUITableBody, { TableBodyProps } from '@material-ui/core/TableBody'
import { SortableContainer } from 'react-sortable-hoc'

interface TableBodyType extends TableBodyProps {}

const TableBody = SortableContainer<TableBodyType>(
  ({ children }: TableBodyType) => {
    return <MUITableBody>{children}</MUITableBody>
  }
)

export default TableBody
