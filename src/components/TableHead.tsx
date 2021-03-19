import React from 'react'
import MuiTableHead from '@material-ui/core/TableHead'
import MUITableRow from '@material-ui/core/TableRow'
import MUITableCell from '@material-ui/core/TableCell'
import MUICheckbox from '@material-ui/core/Checkbox'

import { TableHeadProps } from '../typings'
import Typography from '@material-ui/core/Typography'

const TableHead = ({
  children,
  colSpan = 1,
  selected = 0,
  selectable,
  items,
  toggleAll,
  toolbar,
  ...rest
}: TableHeadProps<any>) => {
  return (
    <MuiTableHead {...rest}>
      <MUITableRow selected={!!selected}>
        {selectable && items !== undefined && items.length > 0 && (
          <MUITableCell padding='checkbox'>
            <MUICheckbox
              indeterminate={items && items.length > selected && selected > 0}
              checked={selected !== 0}
              onChange={() => {
                if (toggleAll && items) {
                  toggleAll(items, selected)
                }
              }}
            />
          </MUITableCell>
        )}

        {selected ? (
          <MUITableCell colSpan={colSpan}>
            <div>
              {selected && <Typography>Selected {selected} items</Typography>}
              <div />
              {toolbar && <div>{toolbar}</div>}
            </div>
          </MUITableCell>
        ) : (
          children
        )}
      </MUITableRow>
    </MuiTableHead>
  )
}

export default TableHead