import React from 'react'
// import faker from 'faker'

import { TableBuilder, useTableActions } from 'acadamia-table-builder'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
// import Button from '@material-ui/core/Button'
// import 'acadamia-table-builder/dist/index.css'

// const generateDummyData = (count: number): any[] => {
//   return [...Array(count)]
//     .map(() => ({
//       firstName: faker.name.firstName(),
//       lastName: faker.name.lastName(),
//       email: faker.internet.email(),
//       phone: faker.phone.phoneNumber()
//     }))
//     .map((data, index) => ({
//       ...data,
//       name: `${data.firstName} ${data.lastName}`,
//       id: index.toString()
//     }))
// }

const App = () => {
  const { isSelected, toggle, toggleAll, listElements } =
    useTableActions<string>([])

  const data = [
    {
      firstName: 'Abigale',
      lastName: 'Von',
      email: 'Craig_Spinka@yahoo.com',
      phone: '820.662.0006',
      name: 'Abigale Von',
      id: '0'
    },
    {
      firstName: 'Dewitt',
      lastName: 'Lueilwitz',
      email: 'Kattie_Berge78@yahoo.com',
      phone: '445.921.3876 x898',
      name: 'Dewitt Lueilwitz',
      id: '1'
    },
    {
      firstName: 'Riley',
      lastName: 'Stiedemann',
      email: 'Mellie_Hand@yahoo.com',
      phone: '935-872-5636 x5278',
      name: 'Riley Stiedemann',
      id: '2'
    },
    {
      firstName: 'Robin',
      lastName: 'Sanford',
      email: 'Chloe.Cummerata@yahoo.com',
      phone: '(319) 681-0964',
      name: 'Robin Sanford',
      id: '3'
    },
    {
      firstName: 'Julien',
      lastName: 'Krajcik',
      email: 'Colleen18@gmail.com',
      phone: '1-724-654-7809',
      name: 'Julien Krajcik',
      id: '4'
    },
    {
      firstName: 'Otis',
      lastName: 'Sipes',
      email: 'Virgie93@hotmail.com',
      phone: '762.870.4096 x90744',
      name: 'Otis Sipes',
      id: '5'
    },
    {
      firstName: 'Joshuah',
      lastName: 'Treutel',
      email: 'Brianne_Wehner@yahoo.com',
      phone: '(701) 204-9132',
      name: 'Joshuah Treutel',
      id: '6'
    },
    {
      firstName: 'Oliver',
      lastName: 'Runte',
      email: 'Nash_Mosciski24@gmail.com',
      phone: '1-803-868-1134',
      name: 'Oliver Runte',
      id: '7'
    },
    {
      firstName: 'Mattie',
      lastName: 'Herman',
      email: 'Darrel_Goldner@yahoo.com',
      phone: '(538) 565-8744 x8336',
      name: 'Mattie Herman',
      id: '8'
    },
    {
      firstName: 'Sabryna',
      lastName: 'Berge',
      email: 'Taya.Macejkovic@gmail.com',
      phone: '800.809.8694',
      name: 'Sabryna Berge',
      id: '9'
    }
  ]

  return (
    <TableBuilder<{
      firstName: string
      lastName: string
      email: string
      phone: string
      name: string
      id: string
    }>
      loading={false}
      columns={[
        {
          key: 'name',
          title: 'Name',
          dataIndex: 'name'
        },
        {
          key: 'email',
          title: 'Email',
          dataIndex: 'email'
        },
        {
          key: 'phone',
          title: 'Phone',
          dataIndex: 'phone'
        }
      ]}
      data={data}
      onPageChange={() => {
        console.log('Page Change')
      }}
      count={data.length}
      isChecked={isSelected}
      selectable
      toggle={(item: any) => {
        toggle(item.id)
      }}
      selected={listElements.length}
      toggleAll={(items: any[], selected: number) => {
        toggleAll(
          items.map((item) => item.id),
          selected
        )
      }}
      page={1}
      draggable
      actions={
        <>
          <IconButton color='primary' onClick={() => console.log('ADS')}>
            <DeleteIcon />
          </IconButton>
          <IconButton color='primary' onClick={() => console.log('ADS')}>
            <DeleteIcon />
          </IconButton>
          <IconButton color='primary' onClick={() => console.log('ADS')}>
            <DeleteIcon />
          </IconButton>
        </>
      }
      // toolbar={
      //   <>
      //     <Button color='primary'>Unpublish</Button>
      //     <Button color='primary'>Publish</Button>
      //     {/* <IconButton
      //       color='primary'
      //       onClick={() =>
      //         openModal('delete', {
      //           ids: listElements
      //         })
      //       }
      //     >
      //       <DeleteIcon />
      //     </IconButton> */}
      //   </>
      // }
    />
  )
}

export default App
