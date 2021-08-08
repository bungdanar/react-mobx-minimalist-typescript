import { configure } from 'mobx'
import { createContext, FC } from 'react'
import userStore, { UserStore } from '../stores/user-store'
import serverTablePageStore, {
  ServerTablePageStore,
} from '../stores/server-table-page-store'
import clientTablePageStore, {
  ClientTablePageStore,
} from '../stores/client-table-page-store'

configure({ enforceActions: 'observed' })

export const StoreContext = createContext<{
  userStore: UserStore
  clientTablePageStore: ClientTablePageStore
  serverTablePageStore: ServerTablePageStore
}>({ userStore, clientTablePageStore, serverTablePageStore })

export const StoreProvider: FC = ({ children }) => {
  return (
    <StoreContext.Provider
      value={{
        userStore,
        clientTablePageStore,
        serverTablePageStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
