import { Row, TableBodyPropGetter, TableBodyProps } from 'react-table'
import styles from './TableBody.module.css'

interface CustomTableBodyProps<D extends object> {
  getTableBodyProps: (propGetter?: TableBodyPropGetter<D>) => TableBodyProps
  page: Array<Row<D>>
  prepareRow: (row: Row<D>) => void
  children?: React.ReactNode
  getRowProps: any
}

const TableBody = <D extends object>({
  getTableBodyProps,
  page,
  prepareRow,
  children,
  getRowProps,
}: CustomTableBodyProps<D>) => {
  return (
    <tbody {...getTableBodyProps()} className={styles.tableBody}>
      {page.map((row, i) => {
        prepareRow(row)
        return (
          <tr {...row.getRowProps(getRowProps(row))}>
            {row.cells.map((cell) => {
              return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
            })}
          </tr>
        )
      })}
      {children}
    </tbody>
  )
}

export default TableBody
