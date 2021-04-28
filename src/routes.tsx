import { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

const LoginPage = lazy(() => import('./pages/login/Login'))

const FallbackComponent = (): JSX.Element => (
  <div style={{ textAlign: 'center' }}>Loading...</div>
)
const NotFoundComponent = (): JSX.Element => (
  <div style={{ textAlign: 'center' }}>Page Not Found</div>
)

const AppRouteComponents = (): JSX.Element => (
  <Suspense fallback={<FallbackComponent />}>
    <Switch>
      <Route path="/" exact render={() => <LoginPage />} />
      <Route path="*" render={() => <NotFoundComponent />} />
    </Switch>
  </Suspense>
)

export { AppRouteComponents }
