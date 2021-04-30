import React from 'react'
import { TablePropGetter, TableProps } from 'react-table'

interface TableContainerProps<D extends object> {
  getTableProps: (propGetter?: TablePropGetter<D> | undefined) => TableProps
  children: React.ReactNode
}

const TableContainer = <D extends object>({
  getTableProps,
  children,
}: TableContainerProps<D>): JSX.Element => {
  return (
    <div className="table-responsive">
      <table {...getTableProps()} className="table table-bordered table-hover">
        {children}
      </table>
    </div>
  )
}

export default TableContainer
