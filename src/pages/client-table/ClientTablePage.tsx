import { observer } from 'mobx-react-lite'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { Column } from 'react-table'
import { userApi } from '../../api/user'
import CustomCard from '../../components/custom-card/CustomCard'
import ClientSideTable from '../../components/custom-table/client-side-table'
import { User } from '../../data-types/user'
import { useStore } from '../../hooks/use-store'
import { generateErrMessage } from '../../utils/handle-error'

const ClientTablePage = observer(() => {
  const { clientTablePageStore } = useStore()
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
      clientTablePageStore.handleFetchInit()
    }

    try {
      const { data } = await userApi.getAll()

      if (isMounted.current) {
        clientTablePageStore.handleFetchSucceed(data)
      }
    } catch (error) {
      if (isMounted.current) {
        const errMessage = generateErrMessage(error)
        clientTablePageStore.handleFetchFailed(errMessage)
      }
    }
  }, [clientTablePageStore])

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
          {(function () {
            if (clientTablePageStore.loading) {
              return <div>Loading...</div>
            } else {
              if (clientTablePageStore.errMessage.trim() !== '') {
                return <div>{clientTablePageStore.errMessage}</div>
              } else {
                return (
                  <ClientSideTable
                    columns={columns}
                    data={clientTablePageStore.data}
                  />
                )
              }
            }
          })()}
        </CustomCard>
      </div>
    </div>
  )
})

export default ClientTablePage
