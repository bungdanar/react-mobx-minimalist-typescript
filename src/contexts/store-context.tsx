import { configure } from 'mobx'
import { createContext, FC } from 'react'
import userStore, { UserStore } from '../stores/user-store'

configure({ enforceActions: 'observed' })

export const StoreContext = createContext<{
  userStore: UserStore
}>({ userStore })

export const StoreProvider: FC = ({ children }) => {
  return (
    <StoreContext.Provider value={{ userStore }}>
      {children}
    </StoreContext.Provider>
  )
}
