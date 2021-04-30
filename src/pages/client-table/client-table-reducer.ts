import { User } from '../../data-types/user'
import {
  ClientTableActions,
  ClientTableActionTypes,
} from './client-table-action'

type ClientTableState = {
  data: User[]
  loading: boolean
  errMessage: string
}

const clientTableState: ClientTableState = {
  data: [],
  loading: true,
  errMessage: '',
}

const clientTableReducer = (
  state: ClientTableState,
  action: ClientTableActions
): ClientTableState => {
  switch (action.type) {
    case ClientTableActionTypes.FetchDataInit: {
      return {
        ...state,
        loading: true,
        errMessage: '',
      }
    }

    case ClientTableActionTypes.FetchDataSucceed: {
      return {
        ...state,
        loading: false,
        data: [...action.payload.data],
      }
    }

    case ClientTableActionTypes.FetchDataFailed: {
      return {
        ...state,
        loading: false,
        errMessage: action.payload.errMessage,
      }
    }

    default:
      return state
  }
}

export { clientTableState, clientTableReducer }
