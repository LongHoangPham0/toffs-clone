import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter, Route, Switch, Router, Redirect } from 'react-router-dom'
import store from './storeReducer';
import history from './history';
// import './i18n'
import { StripeProvider } from 'react-stripe-elements';
import RouterProvider from './RootProvider';
import { lazyWithRetry } from './Utils/LazyLoad';

const RedirectOIDC = lazyWithRetry(() => import("./services/c4/views/Login/RedicrectOIDC/RedirectOICDComponent"))
// const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

function App() {
  return (
    <Provider store={store}>
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_TOKEN}>
        <HashRouter>
          <Router history={history}>
            <RouterProvider>
              <Switch>
                <Route exact path="/oauth/:oidc/callback" render={(RedirectOIDC)} />
              </Switch>
            </RouterProvider>
          </Router>
        </HashRouter>
      </StripeProvider>
    </Provider>
  );
}

export default App;
