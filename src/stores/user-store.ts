import { observable, action } from 'mobx'
import { User } from '../data-types/user'

export class UserStore {
  @observable
  isAppLoaded: boolean = false

  @action
  setAppLoaded = (value: boolean) => {
    this.isAppLoaded = value
  }

  @observable
  currentUser: User | null = null

  @action
  setCurrentUser = (user: User | null): void => {
    this.currentUser = user
  }
}
