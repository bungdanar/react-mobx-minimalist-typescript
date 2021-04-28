import MainContent from './components/main-content/MainContent'
import { AppRouteComponents } from './routes'

function App() {
  return (
    <main>
      <MainContent>
        <AppRouteComponents />
      </MainContent>
    </main>
  )
}

export default App
