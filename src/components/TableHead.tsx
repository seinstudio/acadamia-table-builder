import React from 'react'
import MuiTableHead, {
  TableHeadProps as MuiTableHeadProps
} from '@material-ui/core/TableHead'
import MUITableRow from '@material-ui/core/TableRow'
import MUITableCell from '@material-ui/core/TableCell'
import MUICheckbox from '@material-ui/core/Checkbox'

import Typography from '@material-ui/core/Typography'

export interface TableHeadProps<T> extends MuiTableHeadProps {
  colSpan?: number
  selected?: number
  toolbar?: React.ReactNode | React.ReactNodeArray
  selectable?: boolean
  draggable?: boolean
  items?: T[]
  toggleAll?: (items: T[], selected: number) => void
  loading?: boolean
}

const TableHead = ({
  children,
  colSpan = 1,
  selected = 0,
  selectable,
  items,
  toggleAll,
  toolbar,
  loading = false,
  ...rest
}: TableHeadProps<any>) => {
  return (
    <MuiTableHead {...rest}>
      <MUITableRow selected={!!selected}>
        {!loading && selectable && items !== undefined && items.length > 0 && (
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
