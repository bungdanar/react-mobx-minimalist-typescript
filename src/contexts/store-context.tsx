import { configure } from 'mobx'
import { createContext, FC } from 'react'
import userStore, { UserStore } from '../stores/user-store'
import clientTableStore, {
  ClientTableStore,
} from '../stores/client-table-store'
import serverTablePageStore, {
  ServerTablePageStore,
} from '../stores/server-table-page-store'

configure({ enforceActions: 'observed' })

export const StoreContext = createContext<{
  userStore: UserStore
  clientTableStore: ClientTableStore
  serverTablePageStore: ServerTablePageStore
}>({ userStore, clientTableStore, serverTablePageStore })

export const StoreProvider: FC = ({ children }) => {
  return (
    <StoreContext.Provider
      value={{
        userStore,
        clientTableStore,
        serverTablePageStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
