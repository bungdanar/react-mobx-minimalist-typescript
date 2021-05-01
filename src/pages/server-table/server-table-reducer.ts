import { User } from '../../data-types/user'
import {
  ServerTableActions,
  ServerTableActionTypes,
} from './server-table-action'

type ServerTableState = {
  data: User[]
  loading: boolean
  errMessage: string
  pageCount: number
  rowCount: number
}

const serverTableState: ServerTableState = {
  data: [],
  loading: false,
  errMessage: '',
  pageCount: 0,
  rowCount: 0,
}

const serverTableReducer = (
  state: ServerTableState,
  action: ServerTableActions
): ServerTableState => {
  switch (action.type) {
    case ServerTableActionTypes.FetchDataInit: {
      return {
        ...state,
        loading: true,
        errMessage: '',
      }
    }

    case ServerTableActionTypes.FetchDataSucceed: {
      return {
        ...state,
        loading: false,
        data: [...action.payload.data],
        pageCount: action.payload.pageCount,
        rowCount: action.payload.rowCount,
      }
    }

    case ServerTableActionTypes.FetchDataFailed: {
      return {
        ...state,
        loading: false,
        errMessage: action.payload.errMessage,
        data: [],
        pageCount: 0,
        rowCount: 0,
      }
    }

    default:
      return state
  }
}

export { serverTableState, serverTableReducer }
