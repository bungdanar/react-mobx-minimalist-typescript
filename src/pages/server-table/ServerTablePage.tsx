import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import { Column } from 'react-table'
import { userApi } from '../../api/user'
import CustomCard from '../../components/custom-card/CustomCard'
import ServerSideTable, {
  FetchDataProps,
} from '../../components/custom-table/server-side-table'
import { User } from '../../data-types/user'
import { ResponseError } from '../../utils/handle-response-err'
import { ServerTableActionTypes } from './server-table-action'
import { serverTableReducer, serverTableState } from './server-table-reducer'

interface UserParams {
  limit: number
  offset: number
  sort: string[]
  name?: string
}

export default function ServerTablePage() {
  const [state, dispatch] = useReducer(serverTableReducer, serverTableState)
  const fetchIdRef = useRef(0)
  const isMounted = useRef(true)

  const columns: Column<User>[] = useMemo(
    () => [
      {
        Header: 'Name',
        id: 'name',
        accessor: (d) => d.name,
        disableFilters: false,
        disableSortBy: true,
      },
    ],
    []
  )

  const fetchData = useCallback(
    async <T extends object>({
      pageSize,
      pageIndex,
      filters,
      sortBy,
    }: FetchDataProps<T>) => {
      const offset = pageSize * pageIndex

      const params: UserParams = {
        limit: pageSize,
        offset: offset,
        sort: [],
      }

      for (let i = 0; i < filters.length; i++) {
        const f = filters[i]

        if (f.id === 'name') {
          params.name = f.value
        }
      }

      const fetchId = ++fetchIdRef.current

      if (isMounted.current) {
        dispatch({
          type: ServerTableActionTypes.FetchDataInit,
        })
      }

      if (fetchId === fetchIdRef.current) {
        try {
          const { data } = await userApi.getAllPaginated(params)

          if (isMounted.current) {
            dispatch({
              type: ServerTableActionTypes.FetchDataSucceed,
              payload: {
                data: data.rows,
                pageCount: Math.ceil(data.count / pageSize),
                rowCount: data.count,
              },
            })
          }
        } catch (error) {
          if (isMounted.current) {
            dispatch({
              type: ServerTableActionTypes.FetchDataFailed,
              payload: {
                errMessage: (error as ResponseError).serialize().message,
              },
            })
          }
        }
      }
    },
    [fetchIdRef]
  )

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  return (
    <div className='row justify-content-center'>
      <div className='col-sm-8'>
        <CustomCard>
          <div>User Management</div>
          <ServerSideTable
            columns={columns}
            data={state.data}
            fetchData={fetchData}
            loading={state.loading}
            pageCount={state.pageCount}
            rowCount={state.rowCount}
            errMessage={state.errMessage}
            maxSizePerPage={1}
          />
        </CustomCard>
      </div>
    </div>
  )
}
