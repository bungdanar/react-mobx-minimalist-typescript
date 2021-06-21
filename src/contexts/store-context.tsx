import { configure } from 'mobx'
import { createContext, FC } from 'react'
import userStore, { UserStore } from '../stores/user-store'
import clientTableStore, {
  ClientTableStore,
} from '../stores/client-table-store'
import serverTableStore, {
  ServerTableStore,
} from '../stores/server-table-store'

configure({ enforceActions: 'observed' })

export const StoreContext = createContext<{
  userStore: UserStore
  clientTableStore: ClientTableStore
  serverTableStore: ServerTableStore
}>({ userStore, clientTableStore, serverTableStore })

export const StoreProvider: FC = ({ children }) => {
  return (
    <StoreContext.Provider
      value={{ userStore, clientTableStore, serverTableStore }}
    >
      {children}
    </StoreContext.Provider>
  )
}
