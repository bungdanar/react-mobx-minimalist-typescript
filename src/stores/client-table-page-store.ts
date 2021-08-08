import { User } from '../data-types/user'
import { CommonAsyncPageStore } from './common-async-page-store'
import { CommonClientSideTableStore } from './common-client-side-table-store'

export class ClientTablePageStore {
  tableDataStore
  pageDataStore

  constructor() {
    this.tableDataStore = new CommonClientSideTableStore<User>()
    this.pageDataStore = new CommonAsyncPageStore()
  }

  handleFetchSucceed = (data: User[]) => {
    this.pageDataStore.handleFetchSucceed()
    this.tableDataStore.setData(data)
  }
}

export default new ClientTablePageStore()
