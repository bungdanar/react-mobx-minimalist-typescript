import { observable, action, makeAutoObservable } from 'mobx'
import { userApi } from '../api/user'
import { User } from '../data-types/user'

export class UserStore {
  constructor() {
    makeAutoObservable(this)
  }

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

  @observable
  timeoutTimer: NodeJS.Timer | null = null

  @action
  setTimeoutTimer = (timer: NodeJS.Timer) => {
    this.timeoutTimer = timer
  }

  login = async (payload: {
    email: string
    password: string
  }): Promise<void> => {
    try {
      const response = await userApi.login(payload)
      const user = response.data

      this.setCurrentUser(user)
      if (user.exp !== undefined) {
        this.launchAutoFrontendLogout(user.exp)
      }
    } catch (error) {
      throw error
    }
  }

  checkCurrentUser = async (): Promise<void> => {
    try {
      const { data: user } = await userApi.checkCurrentUser()

      this.setCurrentUser(user)
      if (user.exp !== undefined) {
        this.launchAutoFrontendLogout(user.exp)
      }
    } catch (error) {
      this.frontendLogout()
    } finally {
      this.setAppLoaded(true)
    }
  }

  serverLogout = async (): Promise<void> => {
    try {
      await userApi.logout()
      this.frontendLogout()
    } catch (error) {
      throw error
    }
  }

  private frontendLogout = () => {
    this.setCurrentUser(null)
    if (this.timeoutTimer) {
      clearTimeout(this.timeoutTimer)
    }
  }

  private launchAutoFrontendLogout = (expirationTime: number): void => {
    const now = Math.floor(Date.now() / 1000)
    const differ = expirationTime - now

    this.setTimeoutTimer(
      setTimeout(() => {
        alert('Session expired')
        this.frontendLogout()
      }, differ * 1000)
    )
  }
}
