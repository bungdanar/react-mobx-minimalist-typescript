import { useEffect, useMemo } from 'react'
import {
  Column,
  Filters,
  SortingRule,
  useAsyncDebounce,
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
import CoverSpinner from '../cover-spinner/CoverSpinner'

export interface FetchDataProps<T extends object> {
  pageIndex: number
  pageSize: number
  filters: Filters<T>
  sortBy: SortingRule<T>[]
}

interface ServerSideTableProps<T extends object = {}> {
  columns: Column<T>[]
  data: T[]
  fetchData: (props: FetchDataProps<T>) => Promise<void>
  loading: boolean
  pageCount: number
  rowCount: number
  errMessage: string
  maxSizePerPage?: number
  initialFilters?: any[]
  getRowProps?: any
}

// Create a default prop getter
const defaultPropGetter = () => ({})

const ServerSideTable = <T extends object>({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  rowCount,
  errMessage,
  maxSizePerPage = 10,
  initialFilters = [],
  getRowProps = defaultPropGetter,
}: ServerSideTableProps<T>) => {
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
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize, filters, sortBy },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        pageIndex: 0,
        pageSize: maxSizePerPage,
        filters: initialFilters,
      },
      manualPagination: true,
      manualFilters: true,
      manualSortBy: true,
      pageCount: controlledPageCount,
    },
    useFilters,
    useSortBy,
    usePagination,
    useFlexLayout
  )

  const fetchDataDebounced = useAsyncDebounce(fetchData, 500)
  // const retryHandler = () => {
  //   fetchDataDebounced({ pageIndex, pageSize, filters, sortBy })
  // }

  useEffect(() => {
    fetchDataDebounced({ pageIndex, pageSize, filters, sortBy })
  }, [fetchDataDebounced, pageIndex, pageSize, filters, sortBy])

  return (
    <div>
      <CoverSpinner isLoading={loading} errMessage={errMessage}>
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
                Showing {page.length} of {rowCount} results
              </td>
            </tr>
          </TableBody>
        </TableContainer>
      </CoverSpinner>
      <TablePagination
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        gotoPage={gotoPage}
        nextPage={nextPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        previousPage={previousPage}
        isLoading={loading}
      />
    </div>
  )
}

export default ServerSideTable
