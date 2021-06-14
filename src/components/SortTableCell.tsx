import makeStyles from '@material-ui/core/styles/makeStyles'
import TableCell from '@material-ui/core/TableCell'
import React from 'react'
import { SortableHandle as SortableHandleHoc } from 'react-sortable-hoc'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'

const useStyles = makeStyles(
  (theme) => ({
    columnDrag: {
      color: theme.palette.primary.main,
      textAlign: 'center',
      cursor: 'grab'
    }
  }),
  { name: 'SortableHandle' }
)

const SortTableCell = SortableHandleHoc(() => {
  const classes = useStyles({})

  return (
    <TableCell padding='checkbox' className={classes.columnDrag}>
      <DragIndicatorIcon />
    </TableCell>
  )
})

export default SortTableCell
