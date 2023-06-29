import { Suspense, useEffect, useLayoutEffect } from "react";
import { lazyWithRetry } from "./Utils/LazyLoad";
import { whiteLabelSelector } from "./selectors/c4/whiteLabelSelector";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import _ from "lodash";
import { baseLocale } from "./config/router";
import { getWhiteLabel } from "./actions/c4/whiteLabel";
import { ServiceData } from "./config/constants";

// Containers
const ServiceApp = lazyWithRetry(() => import('./services/ServiceApp'));

// Pages
const Login = lazyWithRetry(() => import('./services/c4/views/Login/LoginComponent'))

const loading = () => <div className="loader"></div>

const Language = () => {
  const dispatch = useDispatch();
  const whiteLabel = useSelector(whiteLabelSelector)
 
  useLayoutEffect(() => {
    let domain = window.location.hostname;
    domain = domain.indexOf("localhost") === 0 ? process.env.REACT_APP_WHITELABEL_APP : domain
    dispatch(getWhiteLabel(domain))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(!_.isEmpty(whiteLabel.data)) {
      let favicon = document.querySelector("link[rel~='icon']");
      let authorHead = document.querySelector("meta[name~='author']");
      let keywork = document.querySelector("meta[name~='keyword']");
      let descriptionHead = document.querySelector("meta[name~='description']");
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.head.appendChild(favicon);
      }
      if(!authorHead) {
        authorHead = document.createElement('meta');
        authorHead.name = 'author';
        document.head.appendChild(authorHead);
      }
      if(!keywork) {
        keywork = document.createElement('meta');
        keywork.name = 'keyword';
        document.head.appendChild(keywork);
      }
      if(!descriptionHead) {
        descriptionHead = document.createElement('meta');
        descriptionHead.name = 'description';
        document.head.appendChild(descriptionHead);
      }
      document.title = whiteLabel.data?.webTitle || "";
      favicon.href = whiteLabel.data?.faviconIcon || "";
      authorHead.content = whiteLabel.data?.metaAuthor || "";
      keywork.content = whiteLabel.data?.metaKeyword || "";
      descriptionHead.content = whiteLabel.data?.metaDescription || "";
    }
  }, [whiteLabel.data])

  return (
    <Suspense fallback={loading()}>
      {
        !_.isEmpty(whiteLabel.data) && <Switch>
          <Route exact path={`${baseLocale}/login`} name="Login Page" render={() => <Login />} />
          <Route exact path={`${baseLocale}/*`} name="HomeService" render={() => <ServiceApp />} />
          <Redirect path="*" to={`/en/${ServiceData.all}/service`} />
        </Switch>
      }
    </Suspense>
  )
}

export default Language