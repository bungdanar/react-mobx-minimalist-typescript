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
  const { clientTableStore } = useStore()
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
      clientTableStore.handleFetchInit()
    }

    try {
      const { data } = await userApi.getAll()

      if (isMounted.current) {
        clientTableStore.handleFetchSucceed(data)
      }
    } catch (error) {
      if (isMounted.current) {
        const errMessage = generateErrMessage(error)
        clientTableStore.handleFetchFailed(errMessage)
      }
    }
  }, [clientTableStore])

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
            if (clientTableStore.loading) {
              return <div>Loading...</div>
            } else {
              if (clientTableStore.errMessage.trim() !== '') {
                return <div>{clientTableStore.errMessage}</div>
              } else {
                return (
                  <ClientSideTable
                    columns={columns}
                    data={clientTableStore.data}
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
