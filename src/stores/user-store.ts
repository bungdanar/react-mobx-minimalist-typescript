import { observable, action } from 'mobx'
import { User } from '../data-types/user'

export class UserStore {
  @observable
  // Initial value should be false
  isAppLoaded: boolean = true

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
