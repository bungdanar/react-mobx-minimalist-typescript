import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import Center from './components/center/Center'
import CustomLoader from './components/custom-loader/CustomLoader'
import MainContent from './components/main-content/MainContent'
import Navbar from './components/navbar/Navbar'
import { useStore } from './hooks/use-store'
import { AppRouteComponents, LoginRouteComponents } from './routes'

const App = observer(() => {
  const { isAppLoaded, currentUser, checkCurrentUser } = useStore().userStore

  useEffect(() => {
    checkCurrentUser()
  }, [checkCurrentUser])

  if (!isAppLoaded) {
    return (
      <Center>
        <CustomLoader size={50} />
      </Center>
    )
  } else {
    let app: JSX.Element = <LoginRouteComponents />
    let navbar: JSX.Element | null = null

    if (currentUser) {
      app = <AppRouteComponents />
      navbar = <Navbar />
    }

    return (
      <>
        {navbar}
        <main>
          <MainContent>{app}</MainContent>
        </main>
      </>
    )
  }
})

export default App
