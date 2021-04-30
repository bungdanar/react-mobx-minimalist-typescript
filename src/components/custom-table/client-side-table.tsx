import { useMemo } from 'react'
import {
  Column,
  useFilters,
  useFlexLayout,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table'

import TableContainer from './table-container/TableContainer'
import TableHead from './table-head/TableHead'
import TableBody from './table-body/TableBody'
import TablePagination from './table-pagination/TablePagination'
import DefaultColumnFilter from './default-column-filter/DefaultColumnFilter'

interface ClientSideTableProps<T extends object = {}> {
  columns: Column<T>[]
  data: T[]
  maxSizePerPage?: number
  showPagination?: boolean
  getRowProps?: any
}

// Create a default prop getter
const defaultPropGetter = () => ({})

const ClientSideTable = <T extends object = {}>({
  columns,
  data,
  maxSizePerPage = 10,
  showPagination = true,
  getRowProps = defaultPropGetter,
}: ClientSideTableProps<T>) => {
  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      minWidth: 30,
      width: 150,
      maxWidth: 500,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    rows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    // setPageSize,
    state: {
      pageIndex,
      // pageSize
    },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0, pageSize: maxSizePerPage },
    },
    useFilters,
    useSortBy,
    usePagination,
    useFlexLayout
  )

  return (
    <div>
      <TableContainer getTableProps={getTableProps}>
        <TableHead headerGroups={headerGroups} />
        <TableBody
          getTableBodyProps={getTableBodyProps}
          page={page}
          prepareRow={prepareRow}
          getRowProps={getRowProps}
        >
          <tr>
            <td colSpan={10000}>
              Showing {page.length} of {rows.length} results
            </td>
          </tr>
        </TableBody>
      </TableContainer>
      {showPagination ? (
        <TablePagination
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
          gotoPage={gotoPage}
          nextPage={nextPage}
          pageCount={pageCount}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          previousPage={previousPage}
        />
      ) : null}
    </div>
  )
}

export default ClientSideTable
