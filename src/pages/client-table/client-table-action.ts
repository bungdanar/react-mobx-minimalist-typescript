import { User } from '../../data-types/user'
import { ActionMap } from '../../utils/action-map'

export enum ClientTableActionTypes {
  FetchDataInit = 'FETCH_DATA_INIT',
  FetchDataSucceed = 'FETCH_DATA_SUCCEED',
  FetchDataFailed = 'FETCH_DATA_FAILED',
}

type ClientTalePayloads = {
  [ClientTableActionTypes.FetchDataInit]: undefined
  [ClientTableActionTypes.FetchDataSucceed]: {
    data: User[]
  }
  [ClientTableActionTypes.FetchDataFailed]: {
    errMessage: string
  }
}

export type ClientTableActions = ActionMap<ClientTalePayloads>[keyof ActionMap<ClientTalePayloads>]
