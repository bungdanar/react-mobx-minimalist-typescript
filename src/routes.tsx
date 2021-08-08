import { lazy, Suspense } from 'react'
import { Switch, Route, HashRouter, Redirect } from 'react-router-dom'
import Center from './components/center/Center'
import CustomLoader from './components/custom-loader/CustomLoader'

const LoginPage = lazy(() => import('./pages/login/Login'))
const HomePage = lazy(() => import('./pages/home/Home'))
const ClientTablePage = lazy(
  () => import('./pages/client-table/ClientTablePage')
)
const ServerTablePage = lazy(
  () => import('./pages/server-table/ServerTablePage')
)

const FallbackComponent = (): JSX.Element => (
  <Center>
    <CustomLoader size={50} />
  </Center>
)
const NotFoundComponent = (): JSX.Element => <Center>Page Not Found</Center>

const LoginRouteComponents = (): JSX.Element => (
  <Suspense fallback={<FallbackComponent />}>
    <HashRouter>
      <Switch>
        <Route path='/' exact render={() => <LoginPage />} />
        <Route path='*' render={() => <Redirect to='/' />} />
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
