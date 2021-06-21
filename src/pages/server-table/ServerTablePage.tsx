import { observer } from 'mobx-react-lite'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { Column } from 'react-table'
import { userApi } from '../../api/user'
import CustomCard from '../../components/custom-card/CustomCard'
import ServerSideTable, {
  FetchDataProps,
} from '../../components/custom-table/server-side-table'
import { CriteriaModifier } from '../../data-types/criteria-modifier'
import { User } from '../../data-types/user'
import { useStore } from '../../hooks/use-store'
import { generateErrMessage } from '../../utils/handle-error'

interface UserParams {
  limit: number
  offset: number
  sort: string[]
  name?: CriteriaModifier<string>
}

const ServerTablePage = observer(() => {
  const { serverTableStore } = useStore()

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
          params.name = {
            contains: f.value,
          }
        }
      }

      const fetchId = ++fetchIdRef.current

      if (isMounted.current) {
        serverTableStore.handleFetchInit()
      }

      if (fetchId === fetchIdRef.current) {
        try {
          const { data } = await userApi.getAllPaginated(params)

          if (isMounted.current) {
            serverTableStore.handleFetchSucceed(
              data.rows,
              Math.ceil(data.count / pageSize),
              data.count
            )
          }
        } catch (error) {
          if (isMounted.current) {
            const errMessage = generateErrMessage(error)
            serverTableStore.handleFetchFailed(errMessage)
          }
        }
      }
    },
    [fetchIdRef, serverTableStore]
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
            data={serverTableStore.data}
            fetchData={fetchData}
            loading={serverTableStore.loading}
            pageCount={serverTableStore.pageCount}
            rowCount={serverTableStore.rowCount}
            errMessage={serverTableStore.errMessage}
            maxSizePerPage={5}
          />
        </CustomCard>
      </div>
    </div>
  )
})

export default ServerTablePage
