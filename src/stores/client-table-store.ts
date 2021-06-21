import { action, makeObservable, observable } from 'mobx'
import { User } from '../data-types/user'

export class ClientTableStore {
  constructor() {
    makeObservable(this, {
      data: observable,
      loading: observable,
      errMessage: observable,

      handleFetchInit: action,
      handleFetchSucceed: action,
      handleFetchFailed: action,
    })
  }

  data: User[] = []
  loading: boolean = true
  errMessage: string = ''

  handleFetchInit = () => {
    this.loading = true
    this.errMessage = ''
  }

  handleFetchSucceed = (data: User[]) => {
    this.loading = false
    this.data = data
  }

  handleFetchFailed = (errMessage: string) => {
    this.loading = false
    this.errMessage = errMessage
  }
}

export default new ClientTableStore()
