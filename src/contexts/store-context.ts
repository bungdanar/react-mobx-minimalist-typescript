import { configure } from 'mobx'
import { createContext } from 'react'
import { UserStore } from '../stores/user-store'

configure({ enforceActions: 'observed' })

export const StoreContext = createContext({
  userStore: new UserStore(),
})
