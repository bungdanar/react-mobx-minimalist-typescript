import { configure } from 'mobx'
import { createContext, FC } from 'react'
import userStore, { UserStore } from '../stores/user-store'
import clientTableStore, {
  ClientTableStore,
} from '../stores/client-table-store'

configure({ enforceActions: 'observed' })

export const StoreContext = createContext<{
  userStore: UserStore
  clientTableStore: ClientTableStore
}>({ userStore, clientTableStore })

export const StoreProvider: FC = ({ children }) => {
  return (
    <StoreContext.Provider value={{ userStore, clientTableStore }}>
      {children}
    </StoreContext.Provider>
  )
}
