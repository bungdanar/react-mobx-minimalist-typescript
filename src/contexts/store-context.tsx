import { configure } from 'mobx'
import { createContext, FC } from 'react'
import { UserStore } from '../stores/user-store'

configure({ enforceActions: 'observed' })

export const StoreContext = createContext<{
  userStore: UserStore
}>({ userStore: new UserStore() })

export const StoreProvider: FC = ({ children }) => {
  return (
    <StoreContext.Provider value={{ userStore: new UserStore() }}>
      {children}
    </StoreContext.Provider>
  )
}
