import { useEffect, useMemo, useReducer, useRef } from 'react'
import { Column } from 'react-table'
import { userApi } from '../../api/user'
import CustomCard from '../../components/custom-card/CustomCard'
import ClientSideTable from '../../components/custom-table/client-side-table'
import { User } from '../../data-types/user'
import { ResponseError } from '../../utils/handle-response-err'
import { ClientTableActionTypes } from './client-table-action'
import { clientTableReducer, clientTableState } from './client-table-reducer'

export default function ClientTablePage() {
  const [state, dispatch] = useReducer(clientTableReducer, clientTableState)
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

  const handleFetchData = async () => {
    if (isMounted.current) {
      dispatch({
        type: ClientTableActionTypes.FetchDataInit,
      })
    }

    try {
      const { data } = await userApi.getAll()

      if (isMounted.current) {
        dispatch({
          type: ClientTableActionTypes.FetchDataSucceed,
          payload: {
            data,
          },
        })
      }
    } catch (error) {
      if (isMounted.current) {
        dispatch({
          type: ClientTableActionTypes.FetchDataFailed,
          payload: {
            errMessage: (error as ResponseError).serialize().message,
          },
        })
      }
    }
  }

  useEffect(() => {
    handleFetchData()
  }, [])

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  return (
    <div className="row justify-content-center">
      <div className="col-sm-8">
        <CustomCard>
          <div>User Management</div>
          {(function () {
            if (state.loading) {
              return <div>Loading...</div>
            } else {
              if (state.errMessage.trim() !== '') {
                return <div>{state.errMessage}</div>
              } else {
                return <ClientSideTable columns={columns} data={state.data} />
              }
            }
          })()}
        </CustomCard>
      </div>
    </div>
  )
}
