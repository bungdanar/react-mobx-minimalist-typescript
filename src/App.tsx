import { observer } from 'mobx-react-lite'
import MainContent from './components/main-content/MainContent'
import Navbar from './components/navbar/Navbar'
import { useStore } from './hooks/use-store'
import { AppRouteComponents, LoginRouteComponents } from './routes'

const App = observer(() => {
  const { isAppLoaded, currentUser } = useStore().userStore

  if (!isAppLoaded) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>
  }

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
})

export default App
