import { HashRouter } from 'react-router-dom'
import { AppRouteComponents } from './routes'

function App() {
  return (
    <HashRouter>
      <div className="container-fluid">
        <AppRouteComponents />
      </div>
    </HashRouter>
  )
}

export default App
