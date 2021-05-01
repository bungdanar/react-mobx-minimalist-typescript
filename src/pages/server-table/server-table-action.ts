import { User } from '../../data-types/user'
import { ActionMap } from '../../utils/action-map'

export enum ServerTableActionTypes {
  FetchDataInit = 'FETCH_DATA_INIT',
  FetchDataSucceed = 'FETCH_DATA_SUCCEED',
  FetchDataFailed = 'FETCH_DATA_FAILED',
}

type ServerTablePayloads = {
  [ServerTableActionTypes.FetchDataInit]: undefined
  [ServerTableActionTypes.FetchDataSucceed]: {
    data: User[]
    pageCount: number
    rowCount: number
  }
  [ServerTableActionTypes.FetchDataFailed]: {
    errMessage: string
  }
}

export type ServerTableActions = ActionMap<ServerTablePayloads>[keyof ActionMap<ServerTablePayloads>]
