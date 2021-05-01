import { lazy, Suspense } from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'

const LoginPage = lazy(() => import('./pages/login/Login'))
const HomePage = lazy(() => import('./pages/home/Home'))
const ClientTablePage = lazy(
  () => import('./pages/client-table/ClientTablePage')
)
const ServerTablePage = lazy(
  () => import('./pages/server-table/ServerTablePage')
)

const FallbackComponent = (): JSX.Element => (
  <div style={{ textAlign: 'center' }}>Loading...</div>
)
const NotFoundComponent = (): JSX.Element => (
  <div style={{ textAlign: 'center' }}>Page Not Found</div>
)

const LoginRouteComponents = (): JSX.Element => (
  <Suspense fallback={<FallbackComponent />}>
    <HashRouter>
      <Switch>
        <Route path='/' exact render={() => <LoginPage />} />
        <Route path='*' render={() => <NotFoundComponent />} />
      </Switch>
    </HashRouter>
  </Suspense>
)

const AppRouteComponents = (): JSX.Element => (
  <Suspense fallback={<FallbackComponent />}>
    <HashRouter>
      <Switch>
        <Route path='/' exact render={() => <HomePage />} />
        <Route path='/client-table' exact render={() => <ClientTablePage />} />
        <Route path='/server-table' exact render={() => <ServerTablePage />} />
        <Route path='*' render={() => <NotFoundComponent />} />
      </Switch>
    </HashRouter>
  </Suspense>
)

export { LoginRouteComponents, AppRouteComponents }
