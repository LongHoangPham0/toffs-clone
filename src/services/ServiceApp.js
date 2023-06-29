import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom"
import { ServiceData } from "../config/constants"
import { baseLocale, baseService } from '../config/router'
import { lazyWithRetry } from '../Utils/LazyLoad'

// Containers
const DefaultApp = lazyWithRetry(() => import('../containers/DefaultLayout'))

const ServiceApp = () => {
  return (
    <Switch>
      <Route exact path = {`${baseLocale}${baseService}/*`} render={() => <DefaultApp />} />
      <Redirect to={`${baseLocale}/${ServiceData.all}/service`} />
    </Switch>
  )
}

export default ServiceApp

