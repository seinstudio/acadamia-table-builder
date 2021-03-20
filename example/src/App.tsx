import React from 'react'
import faker from 'faker'

import TableBuilder, { useTableActions } from 'acadamia-table-builder'
import 'acadamia-table-builder/dist/index.css'

const generateDummyData = (count: number): any[] => {
  return [...Array(count)]
    .map(() => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber()
    }))
    .map((data, index) => ({
      ...data,
      name: `${data.firstName} ${data.lastName}`,
      id: index.toString()
    }))
}

const App = () => {
  const {
    isSelected,
    toggle,
    toggleAll,
    listElements
  } = useTableActions<string>([])

  const data = generateDummyData(20)

  console.log(data)
  return (
    <TableBuilder
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
    />
  )
}

export default App
