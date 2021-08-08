import { observer } from 'mobx-react-lite'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { Column } from 'react-table'
import { userApi } from '../../api/user'
import CustomCard from '../../components/custom-card/CustomCard'
import ClientSideTable from '../../components/custom-table/client-side-table'
import PageSpinner from '../../components/page-spinner/PageSpinner'
import { User } from '../../data-types/user'
import { useStore } from '../../hooks/use-store'
import { generateErrMessage } from '../../utils/handle-error'

const ClientTablePage = observer(() => {
  const {
    clientTablePageStore: { handleFetchSucceed, pageDataStore, tableDataStore },
  } = useStore()
  const isMounted = useRef(true)

  const columns: Column<User>[] = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: (d) => d.name,
        disableFilters: false,
        disableSortBy: true,
      },
    ],
    []
  )

  const handleFetchData = useCallback(async () => {
    if (isMounted.current) {
      pageDataStore.handleFetchInit()
    }

    try {
      const { data } = await userApi.getAll()

      if (isMounted.current) {
        handleFetchSucceed(data)
      }
    } catch (error) {
      if (isMounted.current) {
        const errMessage = generateErrMessage(error)
        pageDataStore.handleFetchFailed(errMessage)
      }
    }
  }, [pageDataStore, handleFetchSucceed])

  useEffect(() => {
    handleFetchData()
  }, [handleFetchData])

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
          <PageSpinner
            loading={pageDataStore.loading}
            errMessage={pageDataStore.errMessage}
          >
            <ClientSideTable columns={columns} data={tableDataStore.data} />
          </PageSpinner>
        </CustomCard>
      </div>
    </div>
  )
})

export default ClientTablePage
