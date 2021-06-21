import { action, makeObservable, observable } from 'mobx'
import { User } from '../data-types/user'

export class ServerTableStore {
  constructor() {
    makeObservable(this, {
      data: observable,
      loading: observable,
      errMessage: observable,
      pageCount: observable,
      rowCount: observable,

      handleFetchInit: action,
      handleFetchSucceed: action,
      handleFetchFailed: action,
    })
  }

  data: User[] = []
  loading: boolean = false
  errMessage: string = ''
  pageCount: number = 0
  rowCount: number = 0

  handleFetchInit = () => {
    this.loading = true
    this.errMessage = ''
  }

  handleFetchSucceed = (data: User[], pageCount: number, rowCount: number) => {
    this.loading = false
    this.data = data
    this.pageCount = pageCount
    this.rowCount = rowCount
  }

  handleFetchFailed = (errMessage: string) => {
    this.loading = false
    this.errMessage = errMessage
    this.data = []
    this.pageCount = 0
    this.rowCount = 0
  }
}

export default new ServerTableStore()
