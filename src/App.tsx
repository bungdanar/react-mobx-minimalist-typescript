import MainContent from './components/main-content/MainContent'
import Navbar from './components/navbar/Navbar'
import { AppRouteComponents } from './routes'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <MainContent>
          <AppRouteComponents />
        </MainContent>
      </main>
    </>
  )
}

export default App
